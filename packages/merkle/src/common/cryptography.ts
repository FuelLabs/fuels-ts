import type { BytesLike } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';

/**
 * The primary hash function for Fuel
 * SHA-256
 */
export function hash(data: BytesLike): string {
  return sha256(data);
}
