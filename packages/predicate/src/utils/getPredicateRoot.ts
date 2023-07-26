import type { BytesLike } from '@ethersproject/bytes';
import { concat, hexlify, arrayify } from '@ethersproject/bytes';
import { hash, uint64ToBytesBE } from '@fuel-ts/hasher';
import { calcRoot } from '@fuel-ts/merkle';
import { chunkAndPadBytes } from '@fuel-ts/utils';

export const getPredicateRoot = (bytecode: BytesLike, chainId: number): string => {
  const chunkSize = 16 * 1024;
  const bytes = arrayify(bytecode);
  const chunks = chunkAndPadBytes(bytes, chunkSize);
  const chainIdBytes = uint64ToBytesBE(chainId);
  const codeRoot = calcRoot(chunks.map((c) => hexlify(c)));

  const predicateRoot = hash(concat(['0x4655454C', chainIdBytes, codeRoot]));
  return predicateRoot;
};
