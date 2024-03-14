/* eslint-disable max-classes-per-file */
import type { TransactionResultRevertReceipt } from '@fuel-ts/account';
import {
  FAILED_ASSERT_EQ_SIGNAL,
  FAILED_ASSERT_SIGNAL,
  FAILED_REQUIRE_SIGNAL,
  FAILED_SEND_MESSAGE_SIGNAL,
  FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  FAILED_UNKNOWN_SIGNAL,
} from '@fuel-ts/transactions/configs';

/**
 * Represents the possible reasons for a revert.
 */
export type RevertReason =
  | 'RequireFailed'
  | 'TransferToAddressFailed'
  | 'SendMessageFailed'
  | 'AssertEqFailed'
  | 'AssertFailed'
  | 'Unknown';

/**
 * A mapping of hex codes to their corresponding revert reasons.
 */
const REVERT_MAP: { [signal: string]: RevertReason } = {
  [FAILED_REQUIRE_SIGNAL]: 'RequireFailed',
  [FAILED_TRANSFER_TO_ADDRESS_SIGNAL]: 'TransferToAddressFailed',
  [FAILED_SEND_MESSAGE_SIGNAL]: 'SendMessageFailed',
  [FAILED_ASSERT_EQ_SIGNAL]: 'AssertEqFailed',
  [FAILED_ASSERT_SIGNAL]: 'AssertFailed',
  [FAILED_UNKNOWN_SIGNAL]: 'Unknown',
};

/**
 * Decode the revert error code from the given receipt.
 *
 * @param receipt - The transaction revert receipt.
 * @returns The revert reason, or undefined if not found.
 */
const decodeRevertErrorCode = (
  receipt: TransactionResultRevertReceipt
): RevertReason | undefined => {
  const signalHex = receipt.val.toHex();
  return REVERT_MAP[signalHex] ? REVERT_MAP[signalHex] : undefined;
};

/**
 * @hidden
 *
 * An error class for revert errors.
 */
export class RevertError extends Error {
  /**
   * The receipt associated with the revert error.
   */
  receipt: TransactionResultRevertReceipt;

  /**
   * Creates a new instance of RevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(receipt: TransactionResultRevertReceipt, reason: RevertReason, logs: Array<unknown>) {
    super(
      `The script reverted with reason ${reason}. (Reason: "${RevertError.extractErrorReasonFromLogs(
        logs
      )}")`
    );
    this.name = 'RevertError';
    this.receipt = receipt;
  }

  static extractErrorReasonFromLogs(logs: Array<unknown>) {
    return logs.filter((l) => typeof l === 'string');
  }

  /**
   * Returns a string representation of the RevertError.
   *
   * @returns The string representation of the error.
   */
  toString() {
    const { id, ...r } = this.receipt;
    return `${this.name}: ${this.message}
    ${id}: ${JSON.stringify(r)}`;
  }
}

/**
 * @hidden
 *
 * An error class for Require revert errors.
 */
export class RequireRevertError extends RevertError {
  /**
   * Creates a new instance of RequireRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(receipt: TransactionResultRevertReceipt, reason: RevertReason, logs: Array<unknown>) {
    super(receipt, reason, logs);
    this.name = 'RequireRevertError';
  }
}

/**
 * @hidden
 *
 * An error class for TransferToAddress revert errors.
 */
export class TransferToAddressRevertError extends RevertError {
  /**
   * Creates a new instance of TransferToAddressRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(receipt: TransactionResultRevertReceipt, reason: RevertReason, logs: Array<unknown>) {
    super(receipt, reason, logs);
    this.name = 'TransferToAddressRevertError';
  }
}

/**
 * @hidden
 *
 * An error class for SendMessage revert errors.
 */
export class SendMessageRevertError extends RevertError {
  /**
   * Creates a new instance of SendMessageRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(receipt: TransactionResultRevertReceipt, reason: RevertReason, logs: Array<unknown>) {
    super(receipt, reason, logs);
    this.name = 'SendMessageRevertError';
  }
}

/**
 * @hidden
 *
 * An error class for AssertFailed revert errors.
 */
export class AssertFailedRevertError extends RevertError {
  /**
   * Creates a new instance of AssertFailedRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(receipt: TransactionResultRevertReceipt, reason: RevertReason, logs: Array<unknown>) {
    super(receipt, reason, logs);
    this.name = 'AssertFailedRevertError';
  }
}

/**
 * @hidden
 *
 * Factory function to create the appropriate RevertError instance based on the given receipt.
 *
 * @param receipt - The transaction revert receipt.
 * @returns The RevertError instance, or undefined if the revert reason is not recognized.
 */
export const revertErrorFactory = (
  receipt: TransactionResultRevertReceipt,
  logs: Array<unknown>
): RevertError | undefined => {
  const reason = decodeRevertErrorCode(receipt);
  if (!reason) {
    return undefined;
  }

  switch (reason) {
    case 'RequireFailed':
      return new RequireRevertError(receipt, reason, logs);
    case 'TransferToAddressFailed':
      return new TransferToAddressRevertError(receipt, reason, logs);
    case 'SendMessageFailed':
      return new SendMessageRevertError(receipt, reason, logs);
    case 'AssertFailed':
      return new AssertFailedRevertError(receipt, reason, logs);
    default:
      return new RevertError(receipt, reason, logs);
  }
};
