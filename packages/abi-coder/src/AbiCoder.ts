import { ResolvedAbiType } from './ResolvedAbiType';
import type { DecodedValue, InputValue, Coder } from './encoding/coders/AbstractCoder';
import { getCoderForEncoding } from './encoding/strategies/getCoderForEncoding';
import type { EncodingOptions } from './types/EncodingOptions';
import type { JsonAbiOld, JsonAbiArgument } from './types/JsonAbi';

export abstract class AbiCoder {
  static getCoder(
    abi: JsonAbiOld,
    argument: JsonAbiArgument,
    options: EncodingOptions = {
      padToWordSize: false,
    }
  ): Coder {
    const resolvedAbiType = new ResolvedAbiType(abi, argument);
    return getCoderForEncoding(options.encoding)(resolvedAbiType, options);
  }

  static encode(
    abi: JsonAbiOld,
    argument: JsonAbiArgument,
    value: InputValue,
    options?: EncodingOptions
  ) {
    return this.getCoder(abi, argument, options).encode(value);
  }

  static decode(
    abi: JsonAbiOld,
    argument: JsonAbiArgument,
    data: Uint8Array,
    offset: number,
    options?: EncodingOptions
  ): [DecodedValue | undefined, number] {
    return this.getCoder(abi, argument, options).decode(data, offset) as [
      DecodedValue | undefined,
      number,
    ];
  }
}
