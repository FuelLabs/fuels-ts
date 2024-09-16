import type { arrayCoder } from './array';
import type { voidCoder, u16, u32, u8, u64, u256, b256, b512, bool, string } from './fixed';
import type { tupleCoder } from './tuple';
import type { vecCoder } from './vec';

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
  tuple: typeof tupleCoder;
  vector: typeof vecCoder;
}

export type CoderTypeV1 = SupportedCodersV1[keyof SupportedCodersV1];
