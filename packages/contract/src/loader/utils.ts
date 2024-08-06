import { WORD_SIZE } from '@fuel-ts/abi-coder';
import { concat } from '@fuel-ts/utils';

import type { ContractChunk } from './types';

export const getContractChunks = (bytecode: Uint8Array, chunkSize: number): ContractChunk[] => {
  const chunks: ContractChunk[] = [];

  for (let offset = 0, index = 0; offset < bytecode.length; offset += chunkSize, index++) {
    const chunk = bytecode.slice(offset, offset + chunkSize);

    // Align chunks by word size
    if (chunk.length % WORD_SIZE !== 0) {
      const paddedChunk = concat([chunk, new Uint8Array(chunkSize - chunk.length)]);
      chunks.push({ id: index, size: paddedChunk.length, bytecode: paddedChunk });
      // eslint-disable-next-line no-continue
      continue;
    }
    chunks.push({ id: index, size: chunk.length, bytecode: chunk });
  }

  return chunks;
};
