import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { sha256 } from '@ethersproject/sha2';
import { bufferFromString } from '@fuel-ts/keystore';
import { bn } from '@fuel-ts/math';
import { versions } from '@fuel-ts/versions';

import AbiCoder from '../abi-coder';
import type { DecodedValue, InputValue } from '../coders/abstract-coder';
import { arrayRegEx, enumRegEx, stringRegEx, structRegEx } from '../constants';
import type {
  JsonFlatAbi,
  JsonFlatAbiFragmentArgumentType,
  JsonFlatAbiFragmentFunction,
} from '../json-abi';
import { isPointerType } from '../json-abi';

const logger = new Logger(versions.FUELS);

/**
 * Parses a function signature and returns the function selector.
 * ref: https://specs.fuel.network/master/protocol/abi/fn_selector_encoding.html
 * @param functionSignature - the signature to be parsed. e.g.: 'sum(u64,u8,bool)'
 */
export function parseFunctionSelector(functionSignature: string) {
  // hash the function signature
  const hashedFunctionSignature = sha256(bufferFromString(functionSignature, 'utf-8'));
  // get first 4 bytes of signature + 0x prefix. then left-pad it to 8 bytes using toHex(8)
  return bn(hashedFunctionSignature.slice(0, 10)).toHex(8);
}

export default class FunctionFragment<
  TAbi extends JsonFlatAbi = JsonFlatAbi,
  FnName extends TAbi['functions'][number]['name'] = string
> {
  readonly signature: string;
  readonly selector: string;
  readonly name: string;
  readonly jsonFn: JsonFlatAbiFragmentFunction;

  private readonly jsonAbi: JsonFlatAbi;

  constructor(abi: JsonFlatAbi, name: FnName) {
    this.jsonAbi = abi;
    this.jsonFn = abi.functions.find((f) => f.name === name)!;
    this.name = name;
    this.signature = FunctionFragment.getSignature(abi, this.jsonFn);
    this.selector = FunctionFragment.getFunctionSelector(this.signature);
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

    const strMatch = stringRegEx.exec(abiType.type)?.groups;
    if (strMatch) {
      return `str[${strMatch.length}]`;
    }

    let components = abiType.components;

    if (components === null) return abiType.type;

    if (input.typeArguments !== null) {
      components = AbiCoder.resolveGenericArgs(
        abiType.components!,
        abiType.typeParameters?.reduce((obj, typeParameter, typeParameterIndex) => {
          const o: Record<number, JsonFlatAbiFragmentArgumentType> = { ...obj };
          o[typeParameter] = input.typeArguments![typeParameterIndex];
          return o;
        }, {})
      );
    }

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

  encodeArguments(args: InputValue[], offset = 0): Uint8Array {
    const res = this.jsonFn.inputs.map((v, i) => AbiCoder.encode(this.jsonAbi, v, args[i]));
    return concat(res);
  }

  decodeArguments(data: BytesLike) {
    const bytes = arrayify(data);
    const nonEmptyTypes = this.jsonFn.inputs.filter((x) => x.name !== '()');

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

    // if (nonEmptyTypes[0] && nonEmptyTypes[0].type === 'raw untyped slice') {
    //   (coders[0] as ArrayCoder<U64Coder>).length = bytes.length / 8;
    // }

    const result = this.jsonFn.inputs.reduce(
      (obj: { decoded: any[]; offset: number }, input) => {
        const [decodedValue, decodedValueByteSize] = AbiCoder.decode(
          this.jsonAbi,
          input,
          bytes,
          obj.offset
          // bytes.subarray(obj.offset)
        );

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

    return AbiCoder.decode(this.jsonAbi, this.jsonFn.output, arrayify(data), 0);
  }
}
