import { ErrorCode, FuelError } from '@fuel-ts/errors';

import {
  ENCODING_VERSION_0,
  ENCODING_VERSION_1,
  NUMBER_U8_CODER_TYPE,
  NUMBER_U16_CODER_TYPE,
  NUMBER_U32_CODER_TYPE,
  NUMBER_U64_CODER_TYPE,
  POINTER_CODER_TYPE,
  RAW_SLICE_CODER_TYPE,
  BOOL_CODER_TYPE,
  B256_CODER_TYPE,
  B512_CODER_TYPE,
  BYTES_CODER_TYPE,
  STD_STRING_CODER_TYPE,
} from '../constants';
import type { ResolvedAbiType } from '../resolved-abi-type';

import type { Coder, EncodingOptions } from './abstract-coder';
import { B256Coder } from './v0/b256';
import { B512Coder } from './v0/b512';
import { BooleanCoder } from './v0/boolean';
import { ByteCoder } from './v0/byte';
import { NumberCoder } from './v0/number';
import { RawSliceCoder } from './v0/raw-slice';
import { StdStringCoder } from './v0/stdString';
import { U64Coder } from './v0/u64';
import { BooleanCoder as BooleanCoderV1 } from './v1/boolean';
import { ByteCoder as ByteCoderV1 } from './v1/byte';
import { NumberCoder as NumberCoderV1 } from './v1/number';
import { RawSliceCoder as RawSliceCoderV1 } from './v1/raw-slice';
import { StdStringCoder as StdStringCoderV1 } from './v1/std-string';

/**
 *
 * @param version
 * @returns
 */
function getVersion(version: number | undefined): number {
  if (version === ENCODING_VERSION_1) {
    return ENCODING_VERSION_1;
  }
  return ENCODING_VERSION_0;
}

/**
 *
 * @param type
 * @param options
 * @returns
 */
export function createCoder(resolvedAbiType: ResolvedAbiType, options: EncodingOptions): Coder {
  const { type } = resolvedAbiType;
  const version = getVersion(options.version);

  switch (type) {
    case NUMBER_U8_CODER_TYPE:
    case NUMBER_U16_CODER_TYPE:
    case NUMBER_U32_CODER_TYPE:
      return version ? new NumberCoderV1(type) : new NumberCoder(type, options);
    case NUMBER_U64_CODER_TYPE:
    case POINTER_CODER_TYPE:
      return new U64Coder();
    case RAW_SLICE_CODER_TYPE:
      return version ? new RawSliceCoderV1() : new RawSliceCoder();
    case BOOL_CODER_TYPE:
      return version ? new BooleanCoderV1() : new BooleanCoder(options);
    case B256_CODER_TYPE:
      return new B256Coder();
    case B512_CODER_TYPE:
      return new B512Coder();
    case BYTES_CODER_TYPE:
      return version ? new ByteCoderV1() : new ByteCoder();
    case STD_STRING_CODER_TYPE:
      return version ? new StdStringCoderV1() : new StdStringCoder();
    default:
      break;
  }

  throw new FuelError(
    ErrorCode.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(resolvedAbiType)}.`
  );
}
