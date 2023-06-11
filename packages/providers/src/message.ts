import type { BytesLike } from '@ethersproject/bytes';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

// #region Message-shape
/**
 * A Fuel message
 */
export type Message = {
  sender: AbstractAddress;
  recipient: AbstractAddress;
  nonce: BN;
  amount: BN;
  data: BytesLike;
  daHeight: BN;
};
// #endregion Message-shape

export type MerkleProof = {
  proofSet: Array<string>;
  proofIndex: BN;
};

export type BlockHeader = {
  id: string;
  daHeight: BN;
  transactionsCount: BN;
  outputMessagesCount: BN;
  transactionsRoot: string;
  outputMessagesRoot: string;
  height: BN;
  prevRoot: string;
  time: string;
  applicationHash: string;
};

/**
 * Message Proof
 */
export type MessageProof = {
  messageProof: MerkleProof;
  blockProof: MerkleProof;
  messageBlockHeader: BlockHeader;
  commitBlockHeader: BlockHeader;
  sender: AbstractAddress;
  recipient: AbstractAddress;
  nonce: string;
  amount: BN;
  data: string;
};
