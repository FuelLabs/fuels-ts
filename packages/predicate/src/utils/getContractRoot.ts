import type { BytesLike } from '@ethersproject/bytes';
import { concat, hexlify, arrayify } from '@ethersproject/bytes';
import { hash, uint64ToBytesBE } from '@fuel-ts/hasher';
import { calcRoot } from '@fuel-ts/merkle';

export const getContractRoot = (bytecode: BytesLike, chainId: number): string => {
  const chunkSize = 16 * 1024;
  const chunks: Uint8Array[] = [];
  const bytes = arrayify(bytecode);

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const chunk = new Uint8Array(chunkSize);
    chunk.set(bytes.slice(offset, offset + chunkSize));
    chunks.push(chunk);
  }

  const chainIdBytes = uint64ToBytesBE(chainId);
  const lastChunk = chunks[chunks.length - 1];
  const remainingBytes = bytes.length % chunkSize;
  const paddedChunkLength = remainingBytes + ((8 - (remainingBytes % 8)) % 8);
  const newChunk = lastChunk.slice(0, paddedChunkLength);
  chunks[chunks.length - 1] = newChunk;
  const codeRoot = calcRoot(chunks.map((c) => hexlify(c)));

  const contractRoot = hash(concat(['0x4655454C', chainIdBytes, codeRoot]));
  return contractRoot;
};
