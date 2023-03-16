import type { TransactionResult } from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/transactions';

import { RevertErrorCodes } from './revert/revert-error-codes';
import { getDocs } from './utils';

const bigintReplacer = (key: unknown, value: unknown) =>
  typeof value === 'bigint' ? value.toString() : value;

export class ScriptResultDecoderError extends Error {
  logs: unknown[];
  constructor(result: TransactionResult<'failure'>, message: string, logs: Array<unknown>) {
    const docLink = JSON.stringify(getDocs(result.status), null, 2);
    const logsText = logs.length ? `Logs:\n${JSON.stringify(logs, null, 2)}` : null;
    const receiptsText = `Receipts:\n${JSON.stringify(
      result.receipts.map(({ type, ...r }) => ({ type: ReceiptType[type], ...r })),
      bigintReplacer,
      2
    )}`;
    super(`${message}\n\n${docLink}\n\n${logsText ? `${logsText}\n\n` : ''}${receiptsText}`);
    this.logs = logs;

    new RevertErrorCodes(result.receipts).assert(this);
  }
}
