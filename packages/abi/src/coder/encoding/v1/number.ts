import type { BN, BNInput } from '@fuel-ts/math';
import { toNumber, toBytes, bn } from '@fuel-ts/math';

import type { Coder } from '../encoding.types';

export const u8: Coder<number> = {
  length: 1,
  encode: (value: number): Uint8Array => toBytes(value, u8.length),
  decode: (data: Uint8Array): number => toNumber(data),
};

export const u16: Coder<number> = {
  length: 2,
  encode: (value: number): Uint8Array => toBytes(value, u16.length),
  decode: (data: Uint8Array): number => toNumber(data),
};

export const u32: Coder<number> = {
  length: 4,
  encode: (value: number): Uint8Array => toBytes(value, u32.length),
  decode: (data: Uint8Array): number => toNumber(data),
};

export const u64: Coder<BNInput, BN> = {
  length: 8,
  encode: (value: BN | BNInput): Uint8Array => toBytes(value, u64.length),
  decode: (data: Uint8Array): BN => bn(data),
};

export const u256: Coder<BNInput, BN> = {
  length: 32,
  encode: (value: BNInput): Uint8Array => toBytes(value, u256.length),
  decode: (data: Uint8Array): BN => bn(data),
};
