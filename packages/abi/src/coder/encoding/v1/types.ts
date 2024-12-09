import type { arrayCoder } from './array';
import type { enumCoder } from './enum';
import type { voidCoder, u16, u32, u8, u64, u256, b256, b512, bool } from './fixed';
import type { bytes, rawSlice, stdString, str, vector } from './heap';
import type { option } from './option';
import type { string } from './string';
import type { struct } from './struct';
import type { tuple } from './tuple';

export interface SupportedCodersV1 {
  void: typeof voidCoder;
  u8: typeof u8;
  u16: typeof u16;
  u32: typeof u32;
  u64: typeof u64;
  u256: typeof u256;
  bool: typeof bool;
  b256: typeof b256;
  b512: typeof b512;
  string: typeof string;
  array: typeof arrayCoder;
  enum: typeof enumCoder;
  option: typeof option;
  struct: typeof struct;
  tuple: typeof tuple;
  bytes: typeof bytes;
  rawSlice: typeof rawSlice;
  stdString: typeof stdString;
  str: typeof str;
  vector: typeof vector;
}

export type CoderTypeV1 = SupportedCodersV1[keyof SupportedCodersV1];
