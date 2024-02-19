import type { TransactionResult } from '@fuel-ts/account';
import { ReceiptType } from '@fuel-ts/transactions';

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
