import { createMatcher } from '../../matchers/sway-type-matchers';

import type { SupportedCodersV1 } from './v1/v1.types';

export type SupportedCoders = SupportedCodersV1;
export type SupportedCoder = SupportedCoders[keyof SupportedCoders];

export const createCoderMatcher = (coders: SupportedCoders) =>
  createMatcher<SupportedCoder | undefined>({
    u8: coders.u8,
    u16: coders.u16,
    u32: coders.u32,
    u64: coders.u64,
    rawUntypedPtr: coders.u64,
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
    bytes: coders.byte,
    stdString: coders.stdString,
    str: coders.str,
    enum: coders.enum,
    option: coders.enum, // @TODO Add option coder

    // Unmatchable
    generic: {
      type: 'generic',
      encodedLength: () => 0,
      encode: () => new Uint8Array(),
      decode: () => undefined,
    },
    assetId: coders.struct,
    evmAddress: coders.struct,
    result: coders.enum,
  });
