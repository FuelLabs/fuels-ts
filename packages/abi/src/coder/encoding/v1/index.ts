import { createMatcher } from '../../../matchers/sway-type-matchers';
import type { SupportedCoder } from '../encoding-types';

import { arrayCoder } from './array';
import { enumCoder } from './enum';
import { factories } from './factories';
import { voidCoder, u16, u32, u8, u64, u256, b256, b512, bool } from './fixed';
import { bytes, rawSlice, stdString, str, vector } from './heap';
import { option } from './option';
import { string } from './string';
import { struct } from './struct';
import { tuple } from './tuple';

export const coders = {
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

export const matcher = createMatcher<SupportedCoder | undefined>({
  u8: coders.u8,
  u16: coders.u16,
  u32: coders.u32,
  u64: coders.u64,
  u256: coders.u256,
  rawUntypedSlice: coders.rawSlice,
  b256: coders.b256,
  b512: coders.b512,
  bool: coders.bool,
  void: coders.void,

  string: coders.string,
  array: coders.array,
  tuple: coders.tuple,
  vector: coders.vector,
  struct: coders.struct,
  bytes: coders.bytes,
  stdString: coders.stdString,
  str: coders.str,
  enum: coders.enum,
  option: coders.option,

  assetId: coders.struct,
  evmAddress: coders.struct,
  result: coders.enum,

  // Unmatchable
  generic: undefined,
});
