import type {
  BOOL_TYPE,
  U256_TYPE,
  U32_TYPE,
  U64_TYPE,
  U8_TYPE,
  U16_TYPE,
  B256_TYPE,
  VOID_TYPE,
  B512_TYPE,
  ENCODING_TYPES,
} from './encoding-constants';
import type { voidCoder, u16, u32, u8, u64, u256, b256, b512, bool } from './v1/fixed';

/**
 * A type of coder.
 *
 * Supported types: 'u8' | 'u16' | 'u32' | 'u64' | 'u256' | 'bool' | 'b256' | 'b512' | 'void'
 * @see {@link ENCODING_TYPES} for a list of all supported types
 */
export type CoderType = (typeof ENCODING_TYPES)[number];

/**
 * All the supported coders, across all versions.
 */
export type SupportedCoders = SupportedCodersV1;

/**
 * A supported coder.
 */
export type SupportedCoder = SupportedCoders[keyof SupportedCoders];

/**
 * Supported coders for version 1.
 */
export interface SupportedCodersV1 {
  [U8_TYPE]: typeof u8;
  [U16_TYPE]: typeof u16;
  [U32_TYPE]: typeof u32;
  [U64_TYPE]: typeof u64;
  [U256_TYPE]: typeof u256;
  [BOOL_TYPE]: typeof bool;
  [B256_TYPE]: typeof b256;
  [B512_TYPE]: typeof b512;
  [VOID_TYPE]: typeof voidCoder;
}
