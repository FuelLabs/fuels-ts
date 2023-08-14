import type { BytesLike } from '@ethersproject/bytes';
import { concat, hexlify, arrayify } from '@ethersproject/bytes';
import { hash, uint64ToBytesBE } from '@fuel-ts/hasher';
import { calcRoot } from '@fuel-ts/merkle';
import { chunkAndPadBytes } from '@fuel-ts/utils';

/**
 * @hidden
 *
 * Calculates the predicate root for a given bytecode and chain ID.
 *
 * @param bytecode - The bytecode represented as a BytesLike object.
 * @param chainId - The ID of the chain associated with the bytecode.
 * @returns The predicate root as a string.
 */
export const getPredicateRoot = (bytecode: BytesLike, chainId: number): string => {
  const chunkSize = 16 * 1024;
  const bytes = arrayify(bytecode);
  const chunks = chunkAndPadBytes(bytes, chunkSize);
  const chainIdBytes = uint64ToBytesBE(chainId);
  const codeRoot = calcRoot(chunks.map((c) => hexlify(c)));

  const predicateRoot = hash(concat(['0x4655454C', chainIdBytes, codeRoot]));
  return predicateRoot;
};
