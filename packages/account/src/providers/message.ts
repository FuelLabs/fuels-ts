import type { AbstractAddress, BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

import type { GqlMessageState } from './__generated__/operations';

// #region Message-shape
/**
 * A Fuel message
 */
export type Message = {
  messageId: BytesLike;
  sender: AbstractAddress;
  recipient: AbstractAddress;
  nonce: BytesLike;
  amount: BN;
  data: BytesLike;
  daHeight: BN;
};
// #endregion Message-shape

export type MessageCoin = {
  assetId: string;
  sender: AbstractAddress;
  recipient: AbstractAddress;
  nonce: BytesLike;
  amount: BN;
  daHeight: BN;
};

export type MerkleProof = {
  proofSet: Array<string>;
  proofIndex: BN;
};

export type BlockHeader = {
  id: string;
  daHeight: BN;
  transactionsCount: BN;
  transactionsRoot: string;
  height: BN;
  prevRoot: string;
  time: string;
  applicationHash: string;
  messageReceiptRoot: string;
  messageReceiptCount: BN;
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

/**
 * Message Status
 */
export type MessageStatus = {
  state: GqlMessageState;
};
