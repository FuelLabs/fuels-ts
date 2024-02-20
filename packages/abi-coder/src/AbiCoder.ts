// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { ResolvedAbiType } from './ResolvedAbiType';
import type { DecodedValue, InputValue, Coder } from './encoding/coders/AbstractCoder';
import { ArrayCoder } from './encoding/coders/v0/ArrayCoder';
import { B256Coder } from './encoding/coders/v0/B256Coder';
import { B512Coder } from './encoding/coders/v0/B512Coder';
import { BooleanCoder } from './encoding/coders/v0/BooleanCoder';
import { ByteCoder } from './encoding/coders/v0/ByteCoder';
import { EnumCoder } from './encoding/coders/v0/EnumCoder';
import { NumberCoder } from './encoding/coders/v0/NumberCoder';
import { OptionCoder } from './encoding/coders/v0/OptionCoder';
import { RawSliceCoder } from './encoding/coders/v0/RawSliceCoder';
import { StdStringCoder } from './encoding/coders/v0/StdStringCoder';
import { StringCoder } from './encoding/coders/v0/StringCoder';
import { StructCoder } from './encoding/coders/v0/StructCoder';
import { TupleCoder } from './encoding/coders/v0/TupleCoder';
import { U64Coder } from './encoding/coders/v0/U64Coder';
import { VecCoder } from './encoding/coders/v0/VecCoder';
import { BooleanCoder as BooleanCoderV1 } from './encoding/coders/v1/BooleanCoder';
import { ByteCoder as ByteCoderV1 } from './encoding/coders/v1/ByteCoder';
import { EnumCoder as EnumCoderV1 } from './encoding/coders/v1/EnumCoder';
import { NumberCoder as NumberCoderV1 } from './encoding/coders/v1/NumberCoder';
import { RawSliceCoder as RawSliceCoderV1 } from './encoding/coders/v1/RawSliceCoder';
import { StdStringCoder as StdStringCoderV1 } from './encoding/coders/v1/StdStringCoder';
import { StringCoder as StringCoderV1 } from './encoding/coders/v1/StringCoder';
import { StructCoder as StructCoderV1 } from './encoding/coders/v1/StructCoder';
import { TupleCoder as TupleCoderV1 } from './encoding/coders/v1/TupleCoder';
import { VecCoder as VecCoderV1 } from './encoding/coders/v1/VecCoder';
import { getEncodingStrategy } from './encoding/strategies/getEncodingStrategy';
import type { JsonAbi, JsonAbiArgument } from './types/JsonAbi';
import type { TEncodingOptions } from './types/TEncodingOptions';
import {
  arrayRegEx,
  enumRegEx,
  stringRegEx,
  structRegEx,
  tupleRegEx,
  OPTION_CODER_TYPE,
  VEC_CODER_TYPE,
  BYTES_CODER_TYPE,
  STD_STRING_CODER_TYPE,
} from './utils/constants';
import { findOrThrow } from './utils/utilities';

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
