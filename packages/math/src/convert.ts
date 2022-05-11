/* eslint-disable no-restricted-syntax */
/**
 * From: https://github.dev/ethers-io/ethers.js/blob/9ca3dc557de8d1556096ea4140316e7f7711a0f3/packages/math/src.ts/convert.ts
 */

import type { BigNumberish } from './types';

// IEEE 754 support 53-bits of mantissa
const maxValue = 0x1fffffffffffff;

const nibbles = '0123456789abcdef';

// Converts a value to a BigInt, including big endian data
export function toBigInt(_value: BigNumberish | Uint8Array): bigint {
  if (_value instanceof Uint8Array) {
    let result = '0x0';
    for (const v of _value) {
      result += nibbles[v >> 4];
      result += nibbles[v & 0x0f];
    }
    return BigInt(result);
  }
  return BigInt(_value);
}

export function toNumber(_value: BigNumberish | Uint8Array): number {
  const value = toBigInt(_value);
  if (value < -maxValue || value > maxValue) {
    throw new Error(`Value out of range: ${_value}`);
  }
  return Number(value);
}

// Converts value to hex, optionally padding on the left to width bytes
export function toHex(_value: BigNumberish, width?: number): string {
  const value = BigInt(_value);
  if (value < 0) {
    throw new Error('cannot convert negative value to hex');
  }

  let result = value.toString(16);

  if (width == null) {
    // Ensure the value is of even length
    if (result.length % 2) {
      result = `0${result}`;
    }
  } else {
    if (width * 2 < result.length) {
      throw new Error(`value ${value} exceeds width ${width}`);
    }

    // Pad the value to the required width
    while (result.length < width * 2) {
      result = `0${result}`;
    }
  }

  return `0x${result}`;
}

export function toArray(_value: BigNumberish): Uint8Array {
  const value = BigInt(_value);
  if (value < 0) {
    throw new Error('cannot convert negative value to hex');
  }

  if (value === 0n) {
    return new Uint8Array([]);
  }

  let hex = value.toString(16);
  if (hex.length % 2) {
    hex = `0${hex}`;
  }

  const result = new Uint8Array(hex.length / 2);
  for (let i = 0; i < result.length; i += 1) {
    const offset = i * 2;
    result[i] = parseInt(hex.substring(offset, offset + 2), 16);
  }

  return result;
}
