import type { BytesLike, DataOptions } from '@ethersproject/bytes';
import { hexlify, arrayify, concat } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import { calcRoot, SparseMerkleTree } from '@fuel-ts/merkle';
import type { StorageSlot } from '@fuel-ts/transactions';

export const getContractRoot = (bytecode: BytesLike): string => {
  const chunkSize = 16 * 1024;
  const chunks: Uint8Array[] = [];
  const bytes = arrayify(bytecode);

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const chunk = new Uint8Array(chunkSize);
    chunk.set(bytes.slice(offset, offset + chunkSize));
    chunks.push(chunk);
  }

  const lastChunk = chunks[chunks.length - 1];
  const remainingBytes = bytes.length % chunkSize;
  const paddedChunkLength = remainingBytes + ((8 - (remainingBytes % 8)) % 8);
  const newChunk = lastChunk.slice(0, paddedChunkLength);
  chunks[chunks.length - 1] = newChunk;

  return calcRoot(chunks.map((c) => hexlify(c)));
};

export const getContractStorageRoot = (storageSlots: StorageSlot[]): string => {
  const tree = new SparseMerkleTree();

  storageSlots.forEach(({ key, value }) => tree.update(sha256(key), value));

  return tree.root;
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

export const includeHexPrefix = (value: string, options?: DataOptions) =>
  hexlify(value, {
    ...options,
    allowMissingPrefix: true,
  });
