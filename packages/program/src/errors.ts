import type { TransactionResult } from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/transactions';

import { RevertErrorCodes } from './revert/revert-error-codes';
import { getDocs } from './utils';

const bigintReplacer = (key: unknown, value: unknown) =>
  typeof value === 'bigint' ? value.toString() : value;

export class ScriptResultDecoderError extends Error {
  logs: unknown[];
  constructor(result: TransactionResult<'failure'>, message: string, logs: Array<unknown>) {
    const revertCodes = new RevertErrorCodes(result.receipts);
    const docLink = JSON.stringify(getDocs(result.status), null, 2);
    const logsText = logs.length ? `Logs:\n${JSON.stringify(logs, null, 2)}` : null;
    const receiptsText = `Receipts:\n${JSON.stringify(
      result.receipts.map(({ type, ...r }) => ({ type: ReceiptType[type], ...r })),
      bigintReplacer,
      2
    )}`;
    const finalMessage = `${message}\n\n${docLink}\n\n${
      logsText ? `${logsText}\n\n` : ''
    }${receiptsText}`;

    if (revertCodes.hasReverts()) {
      revertCodes.throwError(finalMessage);
    }

    super(finalMessage);
    this.logs = logs;
  }
}
