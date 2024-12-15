import { createMatcher } from '../../../../matchers/sway-type-matchers';

import { optionTyper, enumTyper, resultTyper } from './enums';
import { tupleTyper, arrayTyper, vectorTyper } from './iterators';
import {
  boolTyper,
  u8Typer,
  u16Typer,
  u32Typer,
  u64Typer,
  u256Typer,
  b256Typer,
  stringTyper,
  evmAddressTyper,
  genericTyper,
  b512Typer,
  bytesTyper,
  rawSliceTyper,
  stdStringTyper,
  strTyper,
  voidTyper,
} from './simple';
import { structTyper } from './struct';
import type { Typer } from './types';

export const typerMatcher = createMatcher<Typer>({
  bool: boolTyper,
  u8: u8Typer,
  u16: u16Typer,
  u32: u32Typer,
  u64: u64Typer,
  u256: u256Typer,
  b256: b256Typer,
  b512: b512Typer,
  tuple: tupleTyper,
  array: arrayTyper,
  struct: structTyper,
  generic: genericTyper,
  string: stringTyper,
  vector: vectorTyper,
  option: optionTyper,
  bytes: bytesTyper,
  str: strTyper,
  rawUntypedSlice: rawSliceTyper,
  stdString: stdStringTyper,
  enum: enumTyper,
  result: resultTyper,
  void: voidTyper,
  assetId: structTyper,
  evmAddress: evmAddressTyper,
});
