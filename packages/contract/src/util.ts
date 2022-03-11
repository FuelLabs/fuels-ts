import type { BytesLike } from '@ethersproject/bytes';
import { hexlify, arrayify, concat } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import { calcRoot } from '@fuel-ts/merkle';

const getContractRoot = (bytecode: Uint8Array): string => {
  const chunkSize = 8;
  const chunks: Uint8Array[] = [];
  for (let offset = 0; offset < bytecode.length; offset += chunkSize) {
    const chunk = new Uint8Array(chunkSize);
    chunk.set(bytecode.slice(offset, offset + chunkSize));
    chunks.push(chunk);
  }
  return calcRoot(chunks.map((c) => hexlify(c)));
};

export const getContractStorageRoot = (storageSlots: [Uint8Array, Uint8Array][]): string => {
  const chunkSize = 8;
  const chunks: Uint8Array[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of storageSlots) {
    const chunk = new Uint8Array(chunkSize);
    chunk.set(key);
    chunk.set(value, 32);
    chunks.push(chunk);
  }
  return calcRoot(chunks.map((c) => hexlify(c)));
};

export const getContractId = (
  bytecode: BytesLike,
  salt: BytesLike,
  stateRoot: BytesLike
): string => {
  const root = getContractRoot(arrayify(bytecode));
  const contractId = sha256(concat(['0x4655454C', salt, root, stateRoot]));
  return contractId;
};
