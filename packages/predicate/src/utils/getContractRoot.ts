import type { BytesLike } from '@ethersproject/bytes';
import { concat, hexlify, arrayify } from '@ethersproject/bytes';
import { hash, uint64ToBytesBE } from '@fuel-ts/hasher';
import { calcRoot } from '@fuel-ts/merkle';

export const getContractRoot = (bytecode: BytesLike, chainId: number): string => {
  const chunkSize = 8; // 16 KiB
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

  const chainIdBytes = uint64ToBytesBE(chainId);
  const codeRoot = calcRoot(chunks.map((c) => hexlify(c)));

  const contractRoot = hash(concat(['0x4655454C', chainIdBytes, codeRoot]));
  return contractRoot;
};
