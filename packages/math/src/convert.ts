/**
 * From: https://github.dev/ethers-io/ethers.js/blob/9ca3dc557de8d1556096ea4140316e7f7711a0f3/packages/math/src.ts/convert.ts
 */

import type { BN } from './bn';
import { bn } from './bn';
import type { BigNumberish } from './types';

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

export function toArray(
  _value: BigNumberish | BN | Uint8Array,
  _bytesPadding?: number
): Uint8Array {
  const bytesLength = _bytesPadding != null ? _bytesPadding * 2 : _bytesPadding;

  const value = bn(_value);
  if (value.isNeg()) {
    throw new Error('cannot convert negative value to hex');
  }

  // return Uint8Array.from(value.toArray(undefined, _bytesPadding));
  return Uint8Array.from(value.toArray(undefined, bytesLength));
}
