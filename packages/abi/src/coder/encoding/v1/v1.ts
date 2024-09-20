import { arrayCoder } from './array';
import { enumCoder } from './enum';
import { voidCoder, u16, u32, u8, u64, u256, b256, b512, bool, string } from './fixed';
import { byte, rawSlice, stdString, strSlice, vector } from './heap';
import { struct } from './struct';
import { tuple } from './tuple';
import type { SupportedCodersV1 } from './v1.types';

export const v1: SupportedCodersV1 = {
  void: voidCoder,
  u8,
  u16,
  u32,
  u64,
  u256,
  bool,
  b256,
  b512,
  string,
  array: arrayCoder,
  enum: enumCoder,
  struct,
  tuple,
  byte,
  rawSlice,
  strSlice,
  stdString,
  vector,
};
