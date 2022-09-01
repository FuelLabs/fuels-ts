/**
 * From: https://github.dev/ethers-io/ethers.js/blob/9ca3dc557de8d1556096ea4140316e7f7711a0f3/packages/math/src.ts/convert.ts
 */

import type { BNInput } from './bn';
import { bn } from './bn';

// Shortcut to bn(value).toNumber
export function toNumber(value: BNInput): number {
  return bn(value).toNumber();
}

// Shortcut to bn(value).toHex
export function toHex(value: BNInput, bytesPadding?: number): string {
  return bn(value).toHex(bytesPadding);
}

// Shortcut to bn(value).toBytes
export function toBytes(value: BNInput, bytesPadding?: number): Uint8Array {
  return bn(value).toBytes(bytesPadding);
}
