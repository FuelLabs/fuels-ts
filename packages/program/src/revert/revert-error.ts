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
  reason: RevertReason;

  receipt: TransactionResultRevertReceipt;

  constructor(receipt: TransactionResultRevertReceipt, message: string) {
    const reason = decodeRevertErrorCode(receipt);
    super(`The script reverted with reason: ${reason}
Additional Context: 
${message}
    `);
    this.name = 'RevertError';
    this.reason = reason;
    this.receipt = receipt;
  }

  toString() {
    const { id, ...r } = this.receipt;
    return `${this.name}: ${this.message}
    ${id}: ${JSON.stringify(r)}`;
  }
}

export class RequireRevertError extends RevertError {
  requireError: string;

  constructor(receipt: TransactionResultRevertReceipt, message: string) {
    super(receipt, message);
    this.requireError = 'TBD';
  }
}

export const revertErrorFactory = (
  receipt: TransactionResultRevertReceipt,
  message: string
): RevertError | RequireRevertError => {
  const reason = decodeRevertErrorCode(receipt);
  if (reason === 'RequireFailed') {
    return new RequireRevertError(receipt, message);
  }

  return new RevertError(receipt, message);
};
