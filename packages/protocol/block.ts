import { HashZero } from '@ethersproject/constants';
import { pack as solidityPack } from '@ethersproject/solidity';
import { hexDataLength } from '@ethersproject/bytes';
import hash from './cryptography';

// The BlockHeader structure.
export interface BlockHeader {
  producer: string;
  previousBlockHash: string;
  height: number;
  blockNumber: number;
  digestRoot: string;
  digestHash: string;
  digestLength: number;
  transactionRoot: string;
  transactionHash: string;
  transactionLength: number;
}

// Serialize a blockHeader.
export function serialize(blockHeader: BlockHeader): string {
  return solidityPack(
    [
      'address',
      'bytes32',
      'uint32',
      'uint32',
      'bytes32',
      'bytes32',
      'uint16',
      'bytes32',
      'bytes32',
      'uint32',
    ],
    [
      blockHeader.producer,
      blockHeader.previousBlockHash,
      blockHeader.height,
      blockHeader.blockNumber,
      blockHeader.digestRoot,
      blockHeader.digestHash,
      blockHeader.digestLength,
      blockHeader.transactionRoot,
      blockHeader.transactionHash,
      blockHeader.transactionLength,
    ]
  );
}

// Empty block.
export const EMPTY_BLOCK_ID = HashZero;

// Compute transactions length.
export function computeTransactionsLength(transactions: string): number {
  return hexDataLength(transactions);
}

// Compute transactions hash.
export function computeTransactionsHash(transactions: string): string {
  return hash(transactions);
}

// Compute digest hash.
export function computeDigestHash(digests: Array<string>): string {
  return hash(solidityPack(['bytes32[]'], [digests]));
}

// Compute the blockId.
export function computeBlockId(blockHeader: BlockHeader): string {
  return hash(serialize(blockHeader));
}
