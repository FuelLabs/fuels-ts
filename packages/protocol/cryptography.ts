import { sha256 } from '@ethersproject/sha2';
import { BytesLike } from '@ethersproject/bytes';

// The primary hash function for Fuel.
export default function hash(data: BytesLike): string {
  return sha256(data);
}
