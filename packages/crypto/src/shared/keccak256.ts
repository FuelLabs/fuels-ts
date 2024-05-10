import { keccak_256 } from '@noble/hashes/sha3';

export const keccak256 = (data: Uint8Array): Uint8Array => keccak_256(data);
