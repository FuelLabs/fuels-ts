import type { BN, BNInput } from '@fuel-ts/math';
import { toNumber, toBytes, bn, toHex } from '@fuel-ts/math';
import { arrayify } from '@fuel-ts/utils';

import type { Coder } from '../../abi-coder-types';

const createNumberCoder = (encodedLength: number, type: string): Coder<number> => ({
  type,
  encodedLength: () => encodedLength,
  encode: (value: number): Uint8Array => toBytes(value, encodedLength),
  decode: (data: Uint8Array): number => toNumber(data),
});

const createBigNumberCoder = (encodedLength: number, type: string): Coder<BNInput, BN> => ({
  type,
  encodedLength: () => encodedLength,
  encode: (value: BN | BNInput): Uint8Array => toBytes(value, encodedLength),
  decode: (data: Uint8Array): BN => bn(data),
});

const createHexCoder = (encodedLength: number, type: string): Coder<string> => ({
  type,
  encodedLength: () => encodedLength,
  encode: (value: string): Uint8Array => arrayify(value),
  decode: (data: Uint8Array): string => {
    let bytes = data;
    if (bn(data).isZero()) {
      bytes = new Uint8Array();
    }
    return toHex(bytes, encodedLength);
  },
});

export const u8 = createNumberCoder(1, 'u8');
export const u16: Coder<number> = createNumberCoder(2, 'u16');
export const u32: Coder<number> = createNumberCoder(4, 'u32');
export const u64: Coder<BNInput, BN> = createBigNumberCoder(8, 'u64');
export const u256: Coder<BNInput, BN> = createBigNumberCoder(32, 'u256');
export const b256: Coder<string> = createHexCoder(32, 'b256');
export const b512: Coder<string> = createHexCoder(64, 'b512');
export const voidCoder: Coder<undefined> = {
  type: 'void',
  encodedLength: () => 0,
  encode: (): Uint8Array => new Uint8Array(),
  decode: (_data: Uint8Array): undefined => undefined,
};
export const bool: Coder<boolean> = {
  type: 'bool',
  encodedLength: u8.encodedLength,
  encode: (value: boolean): Uint8Array => u8.encode(value ? 1 : 0),
  decode: (data: Uint8Array): boolean => Boolean(u8.decode(data)).valueOf(),
};
