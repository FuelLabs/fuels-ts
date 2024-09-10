import type { swayTypeMatchers } from '../../../matchers/sway-type-matchers';

import { EmptyCoder } from './coders/empty-coder';
import { EnumCoder } from './coders/enum-coder';
import { OptionCoder } from './coders/option-coder';
import type { Coder } from './coders/types';
import { U8Coder } from './coders/u8-coder';

// Coder | undefined for proof-of-concept, it'll become only Coder later
export const coderMatcher: Record<keyof typeof swayTypeMatchers, Coder | undefined> = {
  empty: EmptyCoder,
  u8: U8Coder,
  enum: EnumCoder,
  result: EnumCoder,
  option: OptionCoder,
  string: undefined,
  bool: undefined,
  u16: undefined,
  u32: undefined,
  u64: undefined,
  u256: undefined,
  b256: undefined,
  generic: undefined,
  stdString: undefined,
  struct: undefined,
  b512: undefined,
  bytes: undefined,
  vector: undefined,
  tuple: undefined,
  array: undefined,
  assetId: undefined,
  evmAddress: undefined,
  rawUntypedPtr: undefined,
  rawUntypedSlice: undefined,
};
