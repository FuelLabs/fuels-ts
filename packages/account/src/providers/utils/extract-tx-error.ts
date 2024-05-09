import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import type { ReceiptRevert } from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';
import {
  FAILED_REQUIRE_SIGNAL,
  FAILED_ASSERT_EQ_SIGNAL,
  FAILED_ASSERT_NE_SIGNAL,
  FAILED_ASSERT_SIGNAL,
  FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  PANIC_REASONS,
  PANIC_DOC_URL,
} from '@fuel-ts/transactions/configs';

import type { GqlTransactionStatusFragment } from '../__generated__/operations';
import type { TransactionResultReceipt } from '../transaction-response';
import type { FailureStatus } from '../transaction-summary';

/**
 * Assembles an error message for a panic status.
 * @param status - The transaction failure status.
 * @returns The error message.
 */
export const assemblePanicError = (status: FailureStatus) => {
  let errorMessage = `The transaction reverted with reason: "${status.reason}".`;
  const reason = status.reason;

  if (PANIC_REASONS.includes(status.reason)) {
    errorMessage = `${errorMessage}\n\nYou can read more about this error at:\n\n${PANIC_DOC_URL}#variant.${status.reason}`;
  }

  return { errorMessage, reason };
};

/** @hidden */
const stringify = (obj: unknown) => JSON.stringify(obj, null, 2);

/**
 * Assembles an error message for a revert status.
 * @param receipts - The transaction result processed receipts.
 * @param logs - The transaction decoded logs.
 * @returns The error message.
 */
export const assembleRevertError = (
  receipts: Array<TransactionResultReceipt>,
  logs: Array<unknown>
) => {
  let errorMessage = 'The transaction reverted with an unknown reason.';

  const revertReceipt = receipts.find(({ type }) => type === ReceiptType.Revert) as ReceiptRevert;
  let reason = '';

  if (revertReceipt) {
    const reasonHex = bn(revertReceipt.val).toHex();

    switch (reasonHex) {
      case FAILED_REQUIRE_SIGNAL: {
        reason = 'require';
        errorMessage = `The transaction reverted because a "require" statement has thrown ${
          logs.length ? stringify(logs[0]) : 'an error.'
        }.`;
        break;
      }

      case FAILED_ASSERT_EQ_SIGNAL: {
        const sufix =
          logs.length >= 2 ? ` comparing ${stringify(logs[1])} and ${stringify(logs[0])}.` : '.';

        reason = 'assert_eq';
        errorMessage = `The transaction reverted because of an "assert_eq" statement${sufix}`;
        break;
      }

      case FAILED_ASSERT_NE_SIGNAL: {
        const sufix =
          logs.length >= 2 ? ` comparing ${stringify(logs[1])} and ${stringify(logs[0])}.` : '.';

        reason = 'assert_ne';
        errorMessage = `The transaction reverted because of an "assert_ne" statement${sufix}`;
        break;
      }

      case FAILED_ASSERT_SIGNAL:
        reason = 'assert';
        errorMessage = `The transaction reverted because an "assert" statement failed to evaluate to true.`;
        break;

      case FAILED_TRANSFER_TO_ADDRESS_SIGNAL:
        reason = 'MissingOutputChange';
        errorMessage = `The transaction reverted because it's missing an "OutputChange".`;
        break;

      default:
        reason = 'unknown';
        errorMessage = `The transaction reverted with an unknown reason: ${revertReceipt.val}`;
    }
  }

  return { errorMessage, reason };
};

interface IExtractTxError {
  receipts: Array<TransactionResultReceipt>;
  status?: GqlTransactionStatusFragment | null;
  logs: Array<unknown>;
}

/**
 * Extracts the transaction error and returns a FuelError object.
 * @param IExtractTxError - The parameters for extracting the error.
 * @returns The FuelError object.
 */
export const extractTxError = (params: IExtractTxError): FuelError => {
  const { receipts, status, logs } = params;

  const isPanic = receipts.some(({ type }) => type === ReceiptType.Panic);
  const isRevert = receipts.some(({ type }) => type === ReceiptType.Revert);

  const { errorMessage, reason } =
    status?.type === 'FailureStatus' && isPanic
      ? assemblePanicError(status)
      : assembleRevertError(receipts, logs);

  const metadata = {
    logs,
    receipts,
    panic: isPanic,
    revert: isRevert,
    reason,
  };

  return new FuelError(ErrorCode.SCRIPT_REVERTED, errorMessage, metadata);
};
