import type { BytesLike } from '@ethersproject/bytes';
import { hexlify, arrayify } from '@ethersproject/bytes';
import { calcRoot } from '@fuel-ts/merkle';

export const getContractRoot = (bytecode: BytesLike): string => {
  const chunkSize = 8;
  const chunks: Uint8Array[] = [];
  const bytes = arrayify(bytecode);

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const chunk = new Uint8Array(chunkSize);
    chunk.set(bytes.slice(offset, offset + chunkSize));
    chunks.push(chunk);
  }

  return calcRoot(chunks.map((c) => hexlify(c)));
};
