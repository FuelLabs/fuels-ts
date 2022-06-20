import type { BytesLike } from '@ethersproject/bytes';
import { hexlify, arrayify, concat } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import { ZeroBytes32 } from '@fuel-ts/constants';
import { calcRoot } from '@fuel-ts/merkle';

export const getContractRoot = (bytecode: Uint8Array): string => {
  const chunkSize = 8;
  const chunks: Uint8Array[] = [];
  for (let offset = 0; offset < bytecode.length; offset += chunkSize) {
    const chunk = new Uint8Array(chunkSize);
    chunk.set(bytecode.slice(offset, offset + chunkSize));
    chunks.push(chunk);
  }
  return calcRoot(chunks.map((c) => hexlify(c)));
};

export const getContractStorageRoot = (storageSlots: [BytesLike, BytesLike][]): string => {
  const KEY_SIZE = 32;
  const VALUE_SIZE = 32;
  const chunks: Uint8Array[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of storageSlots) {
    const chunk = new Uint8Array(KEY_SIZE + VALUE_SIZE);
    chunk.set(arrayify(key));
    chunk.set(arrayify(value), KEY_SIZE);
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
