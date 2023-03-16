/* eslint-disable max-classes-per-file */
import type { TransactionResultRevertReceipt } from '@fuel-ts/providers';
import {
  FAILED_ASSERT_EQ_SIGNAL,
  FAILED_ASSERT_SIGNAL,
  FAILED_REQUIRE_SIGNAL,
  FAILED_SEND_MESSAGE_SIGNAL,
  FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
} from '@fuel-ts/transactions';

export type RevertReason =
  | 'RequireFailed'
  | 'TransferToAddressFailed'
  | 'SendMessageFailed'
  | 'AssertEqFailed'
  | 'AssertFailed'
  | 'Unknown';

const REVERT_MAP: { [signal: string]: RevertReason } = {
  [FAILED_REQUIRE_SIGNAL]: 'RequireFailed',
  [FAILED_TRANSFER_TO_ADDRESS_SIGNAL]: 'TransferToAddressFailed',
  [FAILED_SEND_MESSAGE_SIGNAL]: 'SendMessageFailed',
  [FAILED_ASSERT_EQ_SIGNAL]: 'AssertEqFailed',
  [FAILED_ASSERT_SIGNAL]: 'AssertFailed',
};

const decodeRevertErrorCode = (receipt: TransactionResultRevertReceipt): RevertReason => {
  const signalHex = receipt.val.toHex();
  return REVERT_MAP[signalHex] ? REVERT_MAP[signalHex] : 'Unknown';
};

export class RevertError extends Error {
  receipt: TransactionResultRevertReceipt;

  constructor(receipt: TransactionResultRevertReceipt, reason: RevertReason) {
    super(`The script reverted with reason ${reason}`);
    this.name = 'RevertError';
    this.receipt = receipt;
  }

  toString() {
    const { id, ...r } = this.receipt;
    return `${this.name}: ${this.message}
    ${id}: ${JSON.stringify(r)}`;
  }
}

export class RequireRevertError extends RevertError {
  constructor(receipt: TransactionResultRevertReceipt, reason: RevertReason) {
    super(receipt, reason);
    this.name = 'RequireRevertError';
  }
}
export class TransferToAddressRevertError extends RevertError {
  constructor(receipt: TransactionResultRevertReceipt, reason: RevertReason) {
    super(receipt, reason);
    this.name = 'TransferToAddressRevertError';
  }
}
export class SendMessageRevertError extends RevertError {
  constructor(receipt: TransactionResultRevertReceipt, reason: RevertReason) {
    super(receipt, reason);
    this.name = 'SendMessageRevertError';
  }
}
export class AssertFailedRevertError extends RevertError {
  constructor(receipt: TransactionResultRevertReceipt, reason: RevertReason) {
    super(receipt, reason);
    this.name = 'AssertFailedRevertError';
  }
}

export const revertErrorFactory = (
  receipt: TransactionResultRevertReceipt
): RevertError | RequireRevertError | SendMessageRevertError => {
  const reason = decodeRevertErrorCode(receipt);
  switch (reason) {
    case 'RequireFailed':
      return new RequireRevertError(receipt, reason);
    case 'TransferToAddressFailed':
      return new TransferToAddressRevertError(receipt, reason);
    case 'SendMessageFailed':
      return new SendMessageRevertError(receipt, reason);
    case 'AssertFailed':
      return new AssertFailedRevertError(receipt, reason);
    default:
      return new RevertError(receipt, reason);
  }
};
