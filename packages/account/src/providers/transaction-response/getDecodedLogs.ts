import type { Interface } from '@fuel-ts/abi-coder';
import { BigNumberCoder } from '@fuel-ts/abi-coder';
import { ReceiptType } from '@fuel-ts/transactions';

import type { TransactionResultReceipt } from './transaction-response';

/** @hidden */
export function getDecodedLogs<T = unknown>(
  receipts: Array<TransactionResultReceipt>,
  abiInterface: Interface
): T[] {
  return receipts.reduce((logs: T[], r) => {
    if (r.type === ReceiptType.LogData) {
      logs.push(abiInterface.decodeLog(r.data, r.val1.toNumber(), r.id)[0]);
    }

    if (r.type === ReceiptType.Log) {
      logs.push(
        abiInterface.decodeLog(new BigNumberCoder('u64').encode(r.val0), r.val1.toNumber(), r.id)[0]
      );
    }

    return logs;
  }, []);
}
