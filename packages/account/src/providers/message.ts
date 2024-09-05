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
  predicate?: BytesLike;
  predicateData?: BytesLike;
};
// #endregion Message-shape

export type MessageCoin = {
  assetId: string;
  sender: AbstractAddress;
  recipient: AbstractAddress;
  nonce: BytesLike;
  amount: BN;
  daHeight: BN;
  predicate?: BytesLike;
  predicateData?: BytesLike;
};

export type MerkleProof = {
  proofSet: Array<string>;
  proofIndex: BN;
};

export type BlockHeader = {
  id: string;
  daHeight: BN;
  transactionsCount: number;
  transactionsRoot: string;
  height: BN;
  prevRoot: string;
  time: string;
  applicationHash: string;
  messageOutboxRoot: string;
  eventInboxRoot: string;
  consensusParametersVersion: number;
  stateTransitionBytecodeVersion: number;
  messageReceiptCount: number;
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

export const isMessageCoin = (message: Message | MessageCoin): message is MessageCoin =>
  !('data' in message);
