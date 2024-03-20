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

import type { GqlTransactionStatusFragmentFragment } from '../__generated__/operations';
import type { TransactionResultReceipt } from '../transaction-response';
import type { FailureStatus } from '../transaction-summary';

export const assemblePanicError = (status: FailureStatus) => {
  let errorMessage = `The transaction failed with reason: "${status.reason}".`;

  if (PANIC_REASONS.includes(status.reason)) {
    errorMessage = `${errorMessage}\n\nYou can read more about this error at:\n\n${PANIC_DOC_URL}#variant.${status.reason}`;
  }

  return errorMessage;
};

const stringify = (obj: unknown) => JSON.stringify(obj, null, 2);

export const assembleRevertError = (
  receipts: Array<TransactionResultReceipt>,
  logs: Array<unknown>
) => {
  let errorMessage = '';

  const revertReceipt = receipts.find(({ type }) => type === ReceiptType.Revert) as ReceiptRevert;

  if (revertReceipt) {
    const reasonHex = bn(revertReceipt.val).toHex();

    switch (reasonHex) {
      case FAILED_REQUIRE_SIGNAL:
        errorMessage = `The transaction reverted because of a "require" statement has thrown ${stringify(
          logs[0]
        )}.`;
        break;

      case FAILED_ASSERT_EQ_SIGNAL:
        errorMessage = `The transaction reverted because of an "assert_eq" statement comparing ${stringify(
          logs[1]
        )} and ${logs[0]}.`;
        break;

      case FAILED_ASSERT_NE_SIGNAL:
        errorMessage = `The transaction reverted because of an "assert_ne" statement comparing ${stringify(
          logs[1]
        )} and ${stringify(logs[0])}.`;
        break;

      case FAILED_ASSERT_SIGNAL:
        errorMessage = `The transaction reverted because of an "assert" statement failed to evaluate to true.`;
        break;

      case FAILED_TRANSFER_TO_ADDRESS_SIGNAL:
        errorMessage = `The transaction reverted because missing "OutputChange"(s).`;
        break;

      default:
        errorMessage = `The transaction reverted because of an unknown reason.`;
    }
  }

  return errorMessage;
};

interface IExtractTxError {
  receipts: Array<TransactionResultReceipt>;
  status?: GqlTransactionStatusFragmentFragment | null;
  logs: Array<unknown>;
}

export const extractTxError = (params: IExtractTxError) => {
  const { receipts, status, logs } = params;

  const wasPanic = receipts.some(({ type }) => type === ReceiptType.Panic);

  let err =
    status?.type === 'FailureStatus' && wasPanic
      ? assemblePanicError(status)
      : assembleRevertError(receipts, logs);

  err += `\n\nlogs: ${JSON.stringify(logs, null, 2)}`;
  err += `\n\nreceipts: ${JSON.stringify(receipts, null, 2)}`;

  return new FuelError(ErrorCode.SCRIPT_REVERTED, err);
};
