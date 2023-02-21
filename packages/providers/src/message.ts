import type { BytesLike } from '@ethersproject/bytes';
import type { AccountAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

import { GqlMessageStatus as MessageStatus } from './__generated__/operations';

// #region typedoc:Message-shape
/**
 * A Fuel message
 */
export type Message = {
  sender: AccountAddress;
  recipient: AccountAddress;
  nonce: BN;
  amount: BN;
  data: BytesLike;
  status: MessageStatus;
  daHeight: BN;
};
// #endregion

/**
 * Message Proof
 */
export type MessageProof = {
  proofSet: Array<string>;
  proofIndex: BN;
  sender: AccountAddress;
  recipient: AccountAddress;
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

export { MessageStatus };
