import { swayTypeMatcherEntries, type swayTypeMatchers } from '../matchers/sway-type-matchers';

import { EmptyTyper } from './typers/empty-typer';
import { EnumTyper } from './typers/enum-typer';
import { OptionTyper } from './typers/option-typer';
import { ResultTyper } from './typers/result-typer';
import type { Typer } from './typers/types';
import { U8Typer } from './typers/u8-typer';

export const typerMatcher: Record<keyof typeof swayTypeMatchers, Typer | undefined> = {
  empty: EmptyTyper,
  u8: U8Typer,
  enum: EnumTyper,
  result: ResultTyper,
  option: OptionTyper,
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

export function getTyper(type: string) {
  for (const [key, matcher] of swayTypeMatcherEntries) {
    if (matcher(type)) {
      return typerMatcher[key as keyof typeof typerMatcher];
    }
  }

  throw new Error("couldn't find the coder");
}
