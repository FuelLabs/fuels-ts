import type { BytesLike } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';

/**
 * hash string messages to with sha256
 */
export function hashMessage(data: string) {
  return sha256(Buffer.from(data));
}

/**
 * wrap sha256
 */
export function hash(data: BytesLike) {
  return sha256(data);
}
