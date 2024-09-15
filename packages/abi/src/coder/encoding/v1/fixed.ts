import type { BN, BNInput } from '@fuel-ts/math';
import { toNumber, toBytes, bn, toHex } from '@fuel-ts/math';
import { arrayify, toUtf8Bytes, toUtf8String } from '@fuel-ts/utils';

import { STRING_REGEX } from '../../../matchers/sway-type-matchers';
import type { Coder, GetCoderFn, GetCoderParams } from '../../abi-coder-types';

const createNumberCoder = (encodedLength: number): Coder<number> => ({
  encodedLength,
  encode: (value: number): Uint8Array => toBytes(value, encodedLength),
  decode: (data: Uint8Array): number => toNumber(data),
});

const createBigNumberCoder = (encodedLength: number): Coder<BNInput, BN> => ({
  encodedLength,
  encode: (value: BN | BNInput): Uint8Array => toBytes(value, encodedLength),
  decode: (data: Uint8Array): BN => bn(data),
});

const createHexCoder = (encodedLength: number): Coder<string> => ({
  encodedLength,
  encode: (value: string): Uint8Array => arrayify(value),
  decode: (data: Uint8Array): string => {
    let bytes = data;
    if (bn(data).isZero()) {
      bytes = new Uint8Array();
    }
    return toHex(bytes, encodedLength);
  },
});

export const u8 = createNumberCoder(1);
export const u16: Coder<number> = createNumberCoder(2);
export const u32: Coder<number> = createNumberCoder(4);
export const u64: Coder<BNInput, BN> = createBigNumberCoder(8);
export const u256: Coder<BNInput, BN> = createBigNumberCoder(32);
export const b256: Coder<string> = createHexCoder(32);
export const b512: Coder<string> = createHexCoder(64);
export const voidCoder: Coder<undefined> = {
  encodedLength: 0,
  encode: (): Uint8Array => new Uint8Array(),
  decode: (_data: Uint8Array): undefined => undefined,
};
export const bool: Coder<boolean> = {
  encodedLength: 1,
  encode: (value: boolean): Uint8Array => toBytes(value ? 1 : 0, bool.encodedLength),
  decode: (data: Uint8Array): boolean => Boolean(bn(data).toNumber()).valueOf(),
};

/**
 * `string` coder
 *
 * @param encodedLength - The length of the encoded array.
 * @returns
 */
export const string = ({ encodedLength }: { encodedLength: number }): Coder<string> => ({
  encodedLength,
  encode: (value: string): Uint8Array => toUtf8Bytes(value),
  decode: (data: Uint8Array): string => toUtf8String(data),
});

string.fromAbi = ({ type: { swayType } }: GetCoderParams, _getCoder: GetCoderFn) => {
  const match = STRING_REGEX.exec(swayType)?.groups;
  if (!match) {
    throw new Error(`Unable to parse string length for "${swayType}".`);
  }
  const encodedLength = parseInt(match.length, 10);
  return string({ encodedLength });
};
