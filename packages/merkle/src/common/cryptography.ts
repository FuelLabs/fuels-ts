import type { BytesLike } from 'ethers';
import { sha256 } from 'ethers';

/**
 * The primary hash function for Fuel
 * SHA-256
 */
export function hash(data: BytesLike): string {
  return sha256(data);
}
