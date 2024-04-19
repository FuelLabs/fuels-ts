import { ResolvedAbiType } from './ResolvedAbiType';
import type { DecodedValue, InputValue, Coder } from './encoding/coders/AbstractCoder';
import { getCoderForEncoding } from './encoding/strategies/getCoderForEncoding';
import type { EncodingOptions } from './types/EncodingOptions';
import type { JsonAbi, JsonAbiArgument } from './types/JsonAbi';
import { DEFAULT_ENCODING_VERSION } from './utils/constants';

export abstract class AbiCoder {
  static getCoder(
    abi: JsonAbi,
    argument: JsonAbiArgument,
    options: EncodingOptions = {
      encoding: DEFAULT_ENCODING_VERSION,
      isSmallBytes: false,
    }
  ): Coder {
    const resolvedAbiType = new ResolvedAbiType(abi, argument);
    return getCoderForEncoding(options.encoding)(resolvedAbiType, options);
  }

  static encode(
    abi: JsonAbi,
    argument: JsonAbiArgument,
    value: InputValue,
    options?: EncodingOptions
  ) {
    return this.getCoder(abi, argument, options).encode(value);
  }

  static decode(
    abi: JsonAbi,
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
