// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI

import { ResolvedAbiType } from './ResolvedAbiType';
import type { InputValue, DecodedValue, ICoder } from './encoding/types/ICoder';
import type { TEncodingOptions } from './encoding/types/TEncodingOptions';
import { getEncodingStrategy } from './encoding/versioning/utils/getEncodingStrategy';
import type { JsonAbi, JsonAbiArgument } from './types/JsonAbi';

export abstract class AbiCoder {
  /**
   * Retrieves a coder for a given argument for a range of encoding specifications
   * and configurations.
   *
   * @param abi - the programs ABI.
   * @param argument - the ABI argument to code.
   * @param options - options to utilize during encoding.
   * @returns an appropriate coder for the argument.
   */
  static getCoder(abi: JsonAbi, argument: JsonAbiArgument, options?: TEncodingOptions): ICoder {
    const resolvedAbiType = new ResolvedAbiType(abi, argument);
    return getEncodingStrategy(options?.encoding).getCoder(resolvedAbiType, options);
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
