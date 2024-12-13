import { arrayCoder } from './array';
import { enumCoder } from './enum';
import { factories } from './factories';
import { voidCoder, u16, u32, u8, u64, u256, b256, b512, bool } from './fixed';
import { bytes, rawSlice, stdString, str, vector } from './heap';
import { option } from './option';
import { string } from './string';
import { struct } from './struct';
import { tuple } from './tuple';

export const v1 = {
  u8,
  u16,
  u32,
  u64,
  u256,
  b256,
  b512,
  bool,
  void: voidCoder,
  bytes,
  rawSlice,
  str,
  stdString,
  array: Object.assign(arrayCoder, { factory: factories.array }),
  tuple: Object.assign(tuple, { factory: factories.tuple }),
  struct: Object.assign(struct, { factory: factories.struct }),
  enum: Object.assign(enumCoder, { factory: factories.enum }),
  vector: Object.assign(vector, { factory: factories.vector }),
  string: Object.assign(string, { factory: factories.string }),
  option: Object.assign(option, { factory: factories.option }),
} as const;
