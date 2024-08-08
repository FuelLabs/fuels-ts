import { WORD_SIZE } from '@fuel-ts/abi-coder';
import { concat } from '@fuel-ts/utils';

export const getContractChunks = (bytecode: Uint8Array, chunkSize: number) => {
  const chunks = [];

  for (let offset = 0, index = 0; offset < bytecode.length; offset += chunkSize, index++) {
    let chunk = bytecode.slice(offset, offset + chunkSize);
    let length = chunk.length;

    // Align chunks by word size
    if (length % WORD_SIZE !== 0) {
      chunk = concat([chunk, new Uint8Array(chunkSize - chunk.length)]);
      length = chunk.length;
    }

    chunks.push({ id: index, size: length, bytecode: chunk });
  }

  return chunks;
};
