import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { sha256 } from '@ethersproject/sha2';
import { bufferFromString } from '@fuel-ts/keystore';
import { bn } from '@fuel-ts/math';
import { versions } from '@fuel-ts/versions';

import AbiCoder from '../abi-coder';
import type { DecodedValue, InputValue } from '../coders/abstract-coder';
import type ArrayCoder from '../coders/array';
import TupleCoder from '../coders/tuple';
import type U64Coder from '../coders/u64';
import { arrayRegEx, enumRegEx, OPTION_CODER_TYPE, stringRegEx, structRegEx } from '../constants';
import type {
  JsonFlatAbi,
  JsonFlatAbiFragmentArgumentType,
  JsonFlatAbiFragmentFunction,
  JsonAbiFunctionAttributeType,
} from '../json-abi';
import { isPointerType } from '../json-abi';
import { getVectorAdjustments } from '../utilities';

const logger = new Logger(versions.FUELS);

export default class FunctionFragment<
  TAbi extends JsonFlatAbi = JsonFlatAbi,
  FnName extends TAbi['functions'][number]['name'] = string
> {
  readonly signature: string;
  readonly selector: string;
  readonly name: string;
  readonly jsonFn: JsonFlatAbiFragmentFunction;
  readonly attributes: readonly JsonAbiFunctionAttributeType[];

  private readonly jsonAbi: JsonFlatAbi;
  constructor(abi: JsonFlatAbi, name: FnName) {
    this.jsonAbi = abi;
    this.jsonFn = abi.functions.find((f) => f.name === name)!;
    this.name = name;
    this.signature = FunctionFragment.getSignature(abi, this.jsonFn);
    this.selector = FunctionFragment.getFunctionSelector(this.signature);

    this.attributes = this.jsonFn.attributes ?? [];
  }

  private static getFunctionSelector(functionSignature: string) {
    const hashedFunctionSignature = sha256(bufferFromString(functionSignature, 'utf-8'));
    // get first 4 bytes of signature + 0x prefix. then left-pad it to 8 bytes using toHex(8)
    return bn(hashedFunctionSignature.slice(0, 10)).toHex(8);
  }

  private static getSignature(abi: JsonFlatAbi, fn: JsonFlatAbiFragmentFunction): string {
    const inputsSignatures = fn.inputs.map((input) => this.getArgSignature(abi, input));
    return `${fn.name}(${inputsSignatures.join(',')})`;
  }

  private static getArgSignature(abi: JsonFlatAbi, arg: JsonFlatAbiFragmentArgumentType): string {
    const prefix = this.getArgSignaturePrefix(abi, arg);
    const content = this.getArgSignatureContent(abi, arg);

    return `${prefix}${content}`;
  }

  private static getArgSignaturePrefix(
    abi: JsonFlatAbi,
    input: JsonFlatAbiFragmentArgumentType
  ): string {
    const abiType = abi.types.find((x) => x.typeId === input.type)!;
    const structMatch = structRegEx.test(abiType.type);
    if (structMatch) return 's';

    const arrayMatch = arrayRegEx.test(abiType.type);
    if (arrayMatch) return 'a';

    const enumMatch = enumRegEx.test(abiType.type);
    if (enumMatch) return 'e';

    return '';
  }

  private static getArgSignatureContent(
    abi: JsonFlatAbi,
    input: JsonFlatAbiFragmentArgumentType
  ): string {
    const abiType = abi.types.find((x) => x.typeId === input.type)!;

    if (abiType.type === 'raw untyped ptr') {
      return 'rawptr';
    }

    const strMatch = stringRegEx.exec(abiType.type)?.groups;
    if (strMatch) {
      return `str[${strMatch.length}]`;
    }

    let components = abiType.components;

    if (components === null) return abiType.type;

    components = AbiCoder.resolveGenericComponents(abi, input);

    const arrayMatch = arrayRegEx.exec(abiType.type)?.groups;

    if (arrayMatch) {
      return `[${this.getArgSignature(abi, components[0])};${arrayMatch.length}]`;
    }

    const typeArgumentsSignature = Array.isArray(input.typeArguments)
      ? `<${input.typeArguments!.map((arg) => this.getArgSignature(abi, arg)).join(',')}>`
      : '';
    const componentsSignature = `(${components
      .map((arg) => this.getArgSignature(abi, arg))
      .join(',')})`;

    return `${typeArgumentsSignature}${componentsSignature}`;
  }

  isInputDataPointer(): boolean {
    const inputTypes = this.jsonFn.inputs.map((i) =>
      this.jsonAbi.types.find((t) => t.typeId === i.type)
    );
    return this.jsonFn.inputs.length > 1 || isPointerType(inputTypes[0]?.type || '');
  }

  encodeArguments(values: InputValue[], offset = 0): Uint8Array {
    if (!FunctionFragment.argsAndInputsAlign(values, this.jsonFn.inputs, this.jsonAbi)) {
      throw new Error('Types/values length mismatch');
    }

    const shallowCopyValues = values.slice();

    const nonEmptyTypes = this.jsonFn.inputs.filter(
      (x) => this.jsonAbi.types.find((t) => t.typeId === x.type)!.type !== '()'
    );

    if (Array.isArray(values) && nonEmptyTypes.length !== values.length) {
      shallowCopyValues.length = this.jsonFn.inputs.length;
      shallowCopyValues.fill(undefined as unknown as InputValue, values.length);
    }

    const coders = nonEmptyTypes.map((input) => AbiCoder.getCoder(this.jsonAbi, input));
    const vectorData = getVectorAdjustments(coders, shallowCopyValues, offset);

    const coder = new TupleCoder(coders);
    const results = coder.encode(shallowCopyValues);

    return concat([results, concat(vectorData)]);
  }

  private static argsAndInputsAlign(
    args: InputValue[],
    inputs: readonly JsonFlatAbiFragmentArgumentType[],
    abi: JsonFlatAbi
  ) {
    if (args.length === inputs.length) return true;

    const inputTypes = inputs.map((i) => abi.types.find((t) => t.typeId === i.type)!);
    const optionalInputs = inputTypes.filter(
      (x) => x.type === OPTION_CODER_TYPE || x.type === '()'
    );
    if (optionalInputs.length === inputTypes.length) return true;

    return inputTypes.length - optionalInputs.length === args.length;
  }

  decodeArguments(data: BytesLike) {
    const bytes = arrayify(data);
    const nonEmptyTypes = this.jsonFn.inputs.filter(
      (x) => this.jsonAbi.types.find((t) => t.typeId === x.type)!.type !== '()'
    );

    if (nonEmptyTypes.length === 0) {
      // The VM is current return 0x0000000000000000, but we should treat it as undefined / void
      if (bytes.length === 0) return undefined;

      logger.throwError(
        'Types/values length mismatch during decode',
        Logger.errors.INVALID_ARGUMENT,
        {
          count: {
            types: this.jsonFn.inputs.length,
            nonEmptyTypes: nonEmptyTypes.length,
            values: bytes.length,
          },
          value: {
            args: this.jsonFn.inputs,
            nonEmptyTypes,
            values: bytes,
          },
        }
      );
    }

    const result = nonEmptyTypes.reduce(
      (obj: { decoded: any[]; offset: number }, input, currentIndex) => {
        const coder = AbiCoder.getCoder(this.jsonAbi, input);
        if (currentIndex === 0) {
          const inputAbiType = this.jsonAbi.types.find((t) => t.typeId === input.type)!;
          if (inputAbiType.type === 'raw untyped slice') {
            (coder as ArrayCoder<U64Coder>).length = bytes.length / 8;
          }
        }
        const [decodedValue, decodedValueByteSize] = coder.decode(bytes, obj.offset);

        return {
          decoded: [...obj.decoded, decodedValue],
          offset: obj.offset + decodedValueByteSize,
        };
      },
      { decoded: [], offset: 0 }
    );

    return result.decoded;
  }

  decodeOutput(data: BytesLike): [DecodedValue | undefined, number] {
    const outputAbiType = this.jsonAbi.types.find((t) => t.typeId === this.jsonFn.output.type)!;
    if (outputAbiType.type === '()') return [undefined, 0];

    const bytes = arrayify(data);
    const coder = AbiCoder.getCoder(this.jsonAbi, this.jsonFn.output);

    if (outputAbiType.type === 'raw untyped slice') {
      (coder as ArrayCoder<U64Coder>).length = bytes.length / 8;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return coder.decode(bytes, 0);
  }
}
