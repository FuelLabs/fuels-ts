// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
import { ResolvedAbiType } from './ResolvedAbiType';
import type { DecodedValue, InputValue, Coder } from './encoding/coders/AbstractCoder';
import { getEncodingStrategy } from './encoding/strategies/getEncodingStrategy';
import type { JsonAbi, JsonAbiArgument } from './types/JsonAbi';
import type { TEncodingOptions } from './types/TEncodingOptions';

export abstract class AbiCoder {
  static getCoder(
    abi: JsonAbi,
    argument: JsonAbiArgument,
    options: TEncodingOptions = {
      isSmallBytes: false,
    }
  ): Coder {
    const resolvedAbiType = new ResolvedAbiType(abi, argument);
    return getEncodingStrategy(options.encoding).getCoder(resolvedAbiType, options);
  }

  static encode(
    abi: JsonAbi,
    argument: JsonAbiArgument,
    value: InputValue,
    options?: TEncodingOptions
  ) {
    return this.getCoder(abi, argument, options).encode(value);
  }

  static decode(
    abi: JsonAbi,
    argument: JsonAbiArgument,
    data: Uint8Array,
    offset: number,
    options?: TEncodingOptions
  ): [DecodedValue | undefined, number] {
    return this.getCoder(abi, argument, options).decode(data, offset) as [
      DecodedValue | undefined,
      number,
    ];
  }
}
