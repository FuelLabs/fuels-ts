import { keccak256 as keccak } from 'ethereum-cryptography/keccak';

export const keccak256 = (data: Uint8Array): Uint8Array => keccak(data);
