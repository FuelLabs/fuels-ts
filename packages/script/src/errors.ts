import { ZeroBytes32 } from '@fuel-ts/constants';
import type {
  TransactionResult,
  TransactionResultLogDataReceipt,
  TransactionResultLogReceipt,
  TransactionResultRevertReceipt,
} from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/transactions';

import { getDocs } from './utils';

const bigintReplacer = (key: unknown, value: unknown) =>
  typeof value === 'bigint' ? value.toString() : value;

const printLineWithId = (id: string, line: string) =>
  `${id === ZeroBytes32 ? 'script' : id}: ${line}`;

export class ScriptResultDecoderError extends Error {
  constructor(result: TransactionResult<'failure'>, message: string) {
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
    const logReceipts = result.receipts.filter(
      (r) => r.type === ReceiptType.Log || r.type === ReceiptType.LogData
    ) as Array<TransactionResultLogReceipt | TransactionResultLogDataReceipt>;
    const logsText = logReceipts.length
      ? `Logs:\n${logReceipts
          .map(({ type, id, ...r }) =>
            printLineWithId(
              id,
              `${
                type === ReceiptType.LogData ? (r as TransactionResultLogDataReceipt).data : r.val0
              }`
            )
          )
          .join('\n')}`
      : null;
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
  }
}
