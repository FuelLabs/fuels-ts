/* eslint-disable @typescript-eslint/no-explicit-any */
import { getEnv } from '@fuel-ts/constants';
import type { TransactionResult, TransactionResultRevertReceipt } from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/transactions';

import { getDocs } from './utils';

const { ZeroBytes32 } = getEnv();

const bigintReplacer = (key: unknown, value: unknown) =>
  typeof value === 'bigint' ? value.toString() : value;

const printLineWithId = (id: string, line: string) =>
  `${id === ZeroBytes32 ? 'script' : id}: ${line}`;

export class ScriptResultDecoderError extends Error {
  logs: any[];
  constructor(result: TransactionResult<'failure'>, message: string, logs: Array<any>) {
    const docLink = JSON.stringify(getDocs(result.status), null, 2);
    const revertReceipts = result.receipts.filter(
      (r) => r.type === ReceiptType.Revert
    ) as TransactionResultRevertReceipt[];
    const revertsText = revertReceipts.length
      ? `Reverts:\n${revertReceipts
          .map(({ id, ...r }) =>
            printLineWithId(id, `${r.val} ${JSON.stringify(r, bigintReplacer)}`)
          )
          .join('\n')}`
      : null;
    const logsText = logs.length ? `Logs:\n${JSON.stringify(logs, null, 2)}` : null;
    const receiptsText = `Receipts:\n${JSON.stringify(
      result.receipts.map(({ type, ...r }) => ({ type: ReceiptType[type], ...r })),
      bigintReplacer,
      2
    )}`;
    super(
      `${message}\n\n${docLink}\n\n${revertsText ? `${revertsText}\n\n` : ''}${
        logsText ? `${logsText}\n\n` : ''
      }${receiptsText}`
    );
    this.logs = logs;
  }
}
