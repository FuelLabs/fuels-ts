import { arrayify, type BytesLike, hexlify } from '@fuel-ts/utils';
import { sha256 as sha256AsBytes } from '@noble/hashes/sha256';

/**
 * Performs SHA256 hash on the input.
 *
 * @param data - The data to be hashed
 * @returns A sha256 hash of the data in hex format
 */
export function sha256(data: BytesLike): string {
  return hexlify(sha256AsBytes(arrayify(data)));
}

/**
 * Performs SHA256 hash on the input.
 *
 * @param data - The data to be hash
 * @returns A sha256 hash of the data
 *
 * @deprecated use `sha256` instead
 */
export function hash(data: BytesLike): string {
  return sha256(data);
}
