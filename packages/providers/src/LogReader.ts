import { arrayify } from '@ethersproject/bytes';
import { StringCoder } from '@fuel-ts/abi-coder';
import { ReceiptType } from '@fuel-ts/transactions';

import type {
  TransactionResultLogDataReceipt,
  TransactionResultLogReceipt,
  TransactionResultReceipt,
} from './transaction-response';

type LogReceipt = TransactionResultLogReceipt | TransactionResultLogDataReceipt;
class LogReader {
  logs: LogReceipt[];

  constructor(receipts: TransactionResultReceipt[]) {
    this.logs = receipts.filter(
      ({ type }) => type === ReceiptType.Log || type === ReceiptType.LogData
    ) as LogReceipt[];
  }

  toArray(): string[] {
    return this.logs.map((log) => {
      if (log.type === ReceiptType.LogData) {
        const stringCoder = new StringCoder(Number(log.len));
        let value = stringCoder.decode(arrayify(log.data), 0)[0];
        value = value.replaceAll('\x00', '');
        return `${value}`;
      }

      return `${log.val0}`;
    });
  }

  print(): string {
    return this.toArray()
      .map((log, id) => `[log ${id}] ${log}`)
      .join('\n');
  }

  toString(): string {
    return this.print();
  }

  static debug(receipts: TransactionResultReceipt[]) {
    const logReader = new LogReader(receipts);
    // eslint-disable-next-line no-console
    console.log(logReader.print());
  }
}

export default LogReader;
