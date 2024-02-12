// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI

import { ResolvedAbiType } from './ResolvedAbiType';
import type {
  DecodedValue,
  InputValue,
  Coder,
  EncodingOptions,
} from './encoding/coders/AbstractCoder';
import { getEncodingStrategy } from './encoding/strategies/utils/getEncodingStrategy';
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
  static getCoder(abi: JsonAbi, argument: JsonAbiArgument, options?: EncodingOptions): Coder {
    const resolvedAbiType = new ResolvedAbiType(abi, argument);
    return getEncodingStrategy(options?.encoding).getCoder(resolvedAbiType, options);
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
