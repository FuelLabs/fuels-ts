import { bufferFromString } from '@fuel-ts/crypto';
import type { BytesLike } from '@fuel-ts/interfaces';
import { sha256 } from 'ethers';

/**
 * hash string messages with sha256
 *
 * @param msg - The string message to be hashed
 * @returns A sha256 hash of the message
 */
export function hashMessage(msg: string) {
  return sha256(bufferFromString(msg, 'utf-8'));
}

/**
 * Convert a uint64 number to a big-endian byte array
 */
export function uint64ToBytesBE(value: number): Uint8Array {
  const bigIntValue = BigInt(value);
  const buffer = new ArrayBuffer(8);
  const dataView = new DataView(buffer);
  dataView.setBigUint64(0, bigIntValue, false); // write the uint64 value in big-endian order
  return new Uint8Array(dataView.buffer);
}

/**
 * wrap sha256
 *
 * @param data - The data to be hash
 * @returns A sha256 hash of the data
 */
export function hash(data: BytesLike) {
  return sha256(data);
}
