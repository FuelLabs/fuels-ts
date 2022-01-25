import type { BytesLike } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';

/**
 * hash string messages with sha256
 *
 * @param msg - The string message to be hashed
 * @returns A sha256 hash of the message
 */
export function hashMessage(msg: string) {
  return sha256(Buffer.from(msg));
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
