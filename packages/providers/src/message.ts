import type { BytesLike } from '@ethersproject/bytes';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

// #region typedoc:Message-shape
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
  fuelBlockSpend: BN;
};
// #endregion

/**
 * Message Proof
 */
export type MessageProof = {
  proofSet: Array<string>;
  proofIndex: BN;
  sender: AbstractAddress;
  recipient: AbstractAddress;
  nonce: string;
  amount: BN;
  data: string;
  signature: string;
  header: {
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
};
