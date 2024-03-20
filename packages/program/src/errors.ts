import type { TransactionResultReceipt, TransactionResult, FailureStatus } from '@fuel-ts/account';
import type { GqlTransactionStatusFragmentFragment } from '@fuel-ts/account/dist/providers/__generated__/operations';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import type { ReceiptRevert } from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';
import {
  FAILED_REQUIRE_SIGNAL,
  FAILED_ASSERT_EQ_SIGNAL,
  FAILED_ASSERT_SIGNAL,
  FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  FAILED_ASSERT_NE_SIGNAL,
} from '@fuel-ts/transactions/configs';

import { PANIC_DOC_URL, PANIC_REASONS } from './configs';
import { RevertErrorCodes } from './revert/revert-error-codes';
import { getDocs } from './utils';

const bigintReplacer = (key: unknown, value: unknown) =>
  typeof value === 'bigint' ? value.toString() : value;

/**
 * @hidden
 */
export class ScriptResultDecoderError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logs: any[];
  constructor(result: TransactionResult, message: string, logs: Array<unknown>) {
    let docLink = '';

    if (result?.gqlTransaction?.status) {
      docLink = `${JSON.stringify(getDocs(result.gqlTransaction.status), null, 2)}\n\n`;
    }

    const logsText = logs.length ? `Logs:\n${JSON.stringify(logs, null, 2)}\n\n` : '';

    const receiptsText = `Receipts:\n${JSON.stringify(
      result.receipts.map(({ type, ...r }) => ({ type: ReceiptType[type], ...r })),
      bigintReplacer,
      2
    )}`;

    super(`${message}\n\n${docLink}${logsText}${receiptsText}`);
    this.logs = logs;

    new RevertErrorCodes(result.receipts).assert(this);
  }
}

export const assemblePanicError = (status: FailureStatus) => {
  let errorMessage = `The transaction failed with reason: "${status.reason}".`;
  if (PANIC_REASONS.includes(status.reason)) {
    errorMessage = `${errorMessage}\n\n`.concat(
      `You can read more about this error at:\n\n`.concat(
        `${PANIC_DOC_URL}#variant.${status.reason}`
      )
    );
  }

  return errorMessage;
};

export const assembleRevertError = (
  receipts: Array<TransactionResultReceipt>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logs: Array<any>
) => {
  let errorMessage = '';

  const revertReceipt = receipts.find(({ type }) => type === ReceiptType.Revert) as ReceiptRevert;

  if (revertReceipt) {
    const reasonHex = bn(revertReceipt.val).toHex();

    switch (reasonHex) {
      case FAILED_REQUIRE_SIGNAL:
        errorMessage = `The transaction reverted because of a "require" statement has thrown "${logs[0]}".`;
        break;

      case FAILED_ASSERT_EQ_SIGNAL:
        errorMessage = `The transaction reverted because of an "assert_eq" statement comparing "${logs[1]}" and "${logs[0]}".`;
        break;

      case FAILED_ASSERT_NE_SIGNAL:
        errorMessage = `The transaction reverted because of an "assert_ne" statement comparing "${logs[1]}" and "${logs[0]}."`;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logs: Array<any>;
}

export const extractTxError = (params: IExtractTxError) => {
  const { receipts, status, logs } = params;

  const wasPanic = receipts.some(({ type }) => type === ReceiptType.Panic);

  let err: string;

  if (status?.type === 'FailureStatus' && wasPanic) {
    err = assemblePanicError(status);
  } else {
    err = assembleRevertError(receipts, logs);
  }

  err = err.concat(`\n\nlogs: ${JSON.stringify(logs, null, 2)}`);
  err = err.concat(`\n\nreceipts: ${JSON.stringify(receipts, null, 2)}`);

  return new FuelError(ErrorCode.SCRIPT_REVERTED, err);
};
