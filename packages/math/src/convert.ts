/**
 * From: https://github.dev/ethers-io/ethers.js/blob/9ca3dc557de8d1556096ea4140316e7f7711a0f3/packages/math/src.ts/convert.ts
 */

import type { BN } from './bn';
import { bn } from './bn';
import type { BigNumberish } from './types';

// const nibbles = '0123456789abcdef';
// Converts a value to a BigInt, including big endian data
// export function toBigInt(_value: BigNumberish | Uint8Array): bigint {
//   if (_value instanceof Uint8Array) {
//     let result = '0x0';
//     for (const v of _value) {
//       result += nibbles[v >> 4];
//       result += nibbles[v & 0x0f];
//     }
//     return BigInt(result);
//   }
//   return BigInt(_value);
// }

// Shortcut to bn(value).toNumber()
export function toNumber(_value: BigNumberish | Uint8Array | BN): number {
  const value = bn(_value);

  return value.toNumber();
}

// Converts value to hex, optionally padding on the left to fill bytes
export function toHex(_value: BigNumberish | Uint8Array | BN, _bytesPadding?: number): string {
  const bytes = _bytesPadding || 0;
  const bytesLength = bytes * 2;
  const value = bn(_value);
  if (value.isNeg()) {
    throw new Error('cannot convert negative value to hex');
  }
  if (_bytesPadding && value.byteLength() > _bytesPadding) {
    throw new Error(`value ${value} exceeds bytes ${_bytesPadding}`);
  }

  return `0x${value.toString(16, bytesLength)}`;
}

export function toArray(_value: BigNumberish | BN | Uint8Array, length?: number): Uint8Array {
  const value = bn(_value);
  if (value.isNeg()) {
    throw new Error('cannot convert negative value to hex');
  }
  // if (value.isZero()) {
  //   return new Uint8Array([]);
  // }

  return Uint8Array.from(value.toArray(undefined, length));
}
