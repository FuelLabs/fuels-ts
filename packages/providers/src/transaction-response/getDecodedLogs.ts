import type { Interface } from '@fuel-ts/abi-coder';
import { U64Coder } from '@fuel-ts/abi-coder';
import { ReceiptType } from '@fuel-ts/transactions';

import type { TransactionResultReceipt } from './transaction-response';

export function getDecodedLogs<T = unknown>(
  receipts: Array<TransactionResultReceipt>,
  abiInterface: Interface
): T[] {
  return receipts.reduce((logs, r) => {
    if (r.type === ReceiptType.LogData) {
      // @ts-expect-error DecodedValue[] and the input type for concat are slightly incompatible
      return logs.concat(...abiInterface.decodeLog(r.data, r.val1.toNumber(), r.id));
    }

    if (r.type === ReceiptType.Log) {
      return logs.concat(
        ...abiInterface.decodeLog(new U64Coder().encode(r.val0), r.val1.toNumber(), r.id)
      );
    }

    return logs;
  }, []);
}
