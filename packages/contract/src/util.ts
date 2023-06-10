import type { BytesLike, DataOptions } from '@ethersproject/bytes';
import { hexlify, arrayify, concat } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import { calcRoot, SparseMerkleTree } from '@fuel-ts/merkle';
import type { StorageSlot } from '@fuel-ts/transactions';

export const getContractRoot = (bytecode: BytesLike): string => {
  const chunkSize = 8;
  const chunks: Uint8Array[] = [];
  const bytes = arrayify(bytecode);

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const chunk = new Uint8Array(chunkSize);
    chunk.set(bytes.slice(offset, offset + chunkSize));
    chunks.push(chunk);
  }

  const totalBytes = chunks.reduce((sum, chunk) => chunk.byteLength + sum, 0);
  const lastChunk = chunks[chunks.length - 1];
  const isDivisibleBy16 = totalBytes % 16 === 0;
  const remainingBytes = chunkSize - lastChunk.length;
  if (!isDivisibleBy16) {
    const nearestMultiple = Math.ceil(remainingBytes / 8) * 8;
    const paddedChunkLength = lastChunk.length + nearestMultiple;
    const paddedChunk = new Uint8Array(paddedChunkLength).fill(0);
    paddedChunk.set(lastChunk, 0);
    chunks[chunks.length - 1] = paddedChunk;
  }

  return calcRoot(chunks.map((c) => hexlify(c)));
};

export const getContractStorageRoot = (storageSlots: StorageSlot[]): string => {
  const tree = new SparseMerkleTree();

  storageSlots.forEach(({ key, value }) => tree.update(key, value));

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
