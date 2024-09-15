import { createMatcher } from '../../../matchers/sway-type-matchers';
import type { Coder, GetCoderFn, GetCoderParams } from '../../abi-coder-types';

import { arrayCoder } from './array';
import { voidCoder, u16, u32, u8, u64, u256, b256, b512, bool, string } from './fixed';
import { tupleCoder } from './tuple';
import type { CoderTypeV1, SupportedCodersV1 } from './types';

const coders: SupportedCodersV1 = {
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
  tuple: tupleCoder,
};

const match = createMatcher<CoderTypeV1 | undefined>({
  u8: coders.u8,
  u16: coders.u16,
  u32: coders.u32,
  u64: coders.u64,
  rawUntypedPtr: coders.u64,
  u256: coders.u256,
  rawUntypedSlice: coders.u256,
  b256: coders.b256,
  b512: coders.b512,
  bool: coders.bool,
  void: coders.void,

  string,
  array: coders.array,
  tuple: coders.tuple,
  bytes: undefined,
  stdString: undefined,
  // str
  // raw slice
  vector: undefined,
  struct: undefined,
  enum: undefined,
  option: undefined,

  // Unmatchable
  generic: undefined,
  assetId: undefined,
  evmAddress: undefined,
  result: undefined,
});

const getCoder: GetCoderFn = (opts: GetCoderParams): Coder => {
  const coder = match(opts.type);
  if (!coder) {
    throw new Error(`Unsupported coder type "${opts.type}" for element "${opts.name}"`);
  }

  if (typeof coder === 'object') {
    return coder as Coder;
  }

  if (typeof coder === 'function') {
    return coder.fromAbi(opts, getCoder) as Coder;
  }

  return coder;
};

export const v1 = {
  coders,
  match,
  getCoder,
};
