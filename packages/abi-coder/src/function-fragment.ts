import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { sha256 } from '@ethersproject/sha2';
import { bufferFromString } from '@fuel-ts/keystore';
import { bn } from '@fuel-ts/math';
import { versions } from '@fuel-ts/versions';

import { AbiCoder } from './abi-coder';
import type { DecodedValue, InputValue } from './coders/abstract-coder';
import type { ArrayCoder } from './coders/array';
import { TupleCoder } from './coders/tuple';
import type { U64Coder } from './coders/u64';
import { arrayRegEx, enumRegEx, OPTION_CODER_TYPE, stringRegEx, structRegEx } from './constants';
import type {
  JsonAbi,
  JsonAbiArgument,
  JsonAbiFunction,
  JsonAbiFunctionAttribute,
} from './json-abi';
import { ResolvedAbiType } from './resolved-abi-type';
import type { Uint8ArrayWithDynamicData } from './utilities';
import { isPointerType, unpackDynamicData, findOrThrow } from './utilities';

const logger = new Logger(versions.FUELS);

export class FunctionFragment<
  TAbi extends JsonAbi = JsonAbi,
  FnName extends TAbi['functions'][number]['name'] = string
> {
  readonly signature: string;
  readonly selector: string;
  readonly name: string;
  readonly jsonFn: JsonAbiFunction;
  readonly attributes: readonly JsonAbiFunctionAttribute[];
  private readonly jsonAbi: JsonAbi;

  constructor(jsonAbi: JsonAbi, name: FnName) {
    this.jsonAbi = jsonAbi;
    this.jsonFn = findOrThrow(this.jsonAbi.functions, (f) => f.name === name);
    this.name = name;
    this.signature = FunctionFragment.getSignature(this.jsonAbi, this.jsonFn);
    this.selector = FunctionFragment.getFunctionSelector(this.signature);

    this.attributes = this.jsonFn.attributes ?? [];
  }

  private static getSignature(abi: JsonAbi, fn: JsonAbiFunction): string {
    const inputsSignatures = fn.inputs.map((input) => this.getArgSignature(abi, input));
    return `${fn.name}(${inputsSignatures.join(',')})`;
  }

  private static getArgSignature(abi: JsonAbi, arg: JsonAbiArgument): string {
    const prefix = this.getArgSignaturePrefix(abi, arg);
    const content = this.getArgSignatureContent(abi, arg);

    return `${prefix}${content}`;
  }

  private static getArgSignaturePrefix(abi: JsonAbi, input: JsonAbiArgument): string {
    const abiType = findOrThrow(abi.types, (x) => x.typeId === input.type);
    const structMatch = structRegEx.test(abiType.type);
    if (structMatch) return 's';

    const arrayMatch = arrayRegEx.test(abiType.type);
    if (arrayMatch) return 'a';

    const enumMatch = enumRegEx.test(abiType.type);
    if (enumMatch) return 'e';

    return '';
  }

  private static getArgSignatureContent(abi: JsonAbi, input: JsonAbiArgument): string {
    const abiType = new ResolvedAbiType(abi, input);

    if (abiType.type === 'raw untyped ptr') {
      return 'rawptr';
    }

    const strMatch = stringRegEx.exec(abiType.type)?.groups;
    if (strMatch) {
      return `str[${strMatch.length}]`;
    }

    if (abiType.components === null) return abiType.type;

    const arrayMatch = arrayRegEx.exec(abiType.type)?.groups;

    if (arrayMatch) {
      return `[${this.getArgSignature(abi, abiType.components[0])};${arrayMatch.length}]`;
    }

    const typeArgumentsSignature = Array.isArray(input.typeArguments)
      ? `<${input.typeArguments.map((arg) => this.getArgSignature(abi, arg)).join(',')}>`
      : '';
    const componentsSignature = `(${abiType.components
      .map((arg) => this.getArgSignature(abi, arg))
      .join(',')})`;

    return `${typeArgumentsSignature}${componentsSignature}`;
  }

  private static getFunctionSelector(functionSignature: string) {
    const hashedFunctionSignature = sha256(bufferFromString(functionSignature, 'utf-8'));
    // get first 4 bytes of signature + 0x prefix. then left-pad it to 8 bytes using toHex(8)
    return bn(hashedFunctionSignature.slice(0, 10)).toHex(8);
  }

  isInputDataPointer(): boolean {
    const inputTypes = this.jsonFn.inputs.map((i) =>
      this.jsonAbi.types.find((t) => t.typeId === i.type)
    );

    return this.jsonFn.inputs.length > 1 || isPointerType(inputTypes[0]?.type || '');
  }

  encodeArguments(values: InputValue[], offset = 0): Uint8Array {
    FunctionFragment.verifyArgsAndInputsAlign(values, this.jsonFn.inputs, this.jsonAbi);

    const shallowCopyValues = values.slice();

    const nonEmptyTypes = this.jsonFn.inputs.filter(
      (x) => findOrThrow(this.jsonAbi.types, (t) => t.typeId === x.type).type !== '()'
    );

    if (Array.isArray(values) && nonEmptyTypes.length !== values.length) {
      shallowCopyValues.length = this.jsonFn.inputs.length;
      shallowCopyValues.fill(undefined as unknown as InputValue, values.length);
    }

    const coders = nonEmptyTypes.map((type) => AbiCoder.getCoder(this.jsonAbi, type));

    const coder = new TupleCoder(coders);
    const results: Uint8ArrayWithDynamicData = coder.encode(shallowCopyValues);

    return unpackDynamicData(results, offset, results.byteLength);
  }

  private static verifyArgsAndInputsAlign(
    args: InputValue[],
    inputs: readonly JsonAbiArgument[],
    abi: JsonAbi
  ) {
    if (args.length === inputs.length) return;

    const inputTypes = inputs.map((i) => findOrThrow(abi.types, (t) => t.typeId === i.type));
    const optionalInputs = inputTypes.filter(
      (x) => x.type === OPTION_CODER_TYPE || x.type === '()'
    );
    if (optionalInputs.length === inputTypes.length) return;
    if (inputTypes.length - optionalInputs.length === args.length) return;

    throw new Error('Types/values length mismatch');
  }

  decodeArguments(data: BytesLike) {
    const bytes = arrayify(data);
    const nonEmptyTypes = this.jsonFn.inputs.filter(
      (x) => findOrThrow(this.jsonAbi.types, (t) => t.typeId === x.type).type !== '()'
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
      (obj: { decoded: unknown[]; offset: number }, input, currentIndex) => {
        const coder = AbiCoder.getCoder(this.jsonAbi, input);
        if (currentIndex === 0) {
          const inputAbiType = findOrThrow(this.jsonAbi.types, (t) => t.typeId === input.type);
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
    const outputAbiType = findOrThrow(
      this.jsonAbi.types,
      (t) => t.typeId === this.jsonFn.output.type
    );
    if (outputAbiType.type === '()') return [undefined, 0];

    const bytes = arrayify(data);
    const coder = AbiCoder.getCoder(this.jsonAbi, this.jsonFn.output);

    if (outputAbiType.type === 'raw untyped slice') {
      (coder as ArrayCoder<U64Coder>).length = bytes.length / 8;
    }

    return coder.decode(bytes, 0) as [DecodedValue | undefined, number];
  }
}
