import type { JsonAbi } from '@fuel-ts/abi-coder';
import { Interface, BigNumberCoder } from '@fuel-ts/abi-coder';
import { ReceiptType } from '@fuel-ts/transactions';

import type { TransactionResultReceipt } from './transaction-response';

/** @hidden */
export function getDecodedLogs<T = unknown>(
  receipts: Array<TransactionResultReceipt>,
  mainAbiInterface: JsonAbi,
  externalAbis: Record<string, JsonAbi> = {}
): T[] {
  return receipts.reduce((logs: T[], receipt) => {
    if (receipt.type === ReceiptType.LogData || receipt.type === ReceiptType.Log) {
      const interfaceToUse = externalAbis[receipt.id]
        ? new Interface(externalAbis[receipt.id])
        : new Interface(mainAbiInterface);

      const data =
        receipt.type === ReceiptType.Log
          ? new BigNumberCoder('u64').encode(receipt.val0)
          : receipt.data;

      const [decodedLog] = interfaceToUse.decodeLog(data, receipt.val1.toNumber());
      logs.push(decodedLog);
    }

    return logs;
  }, []);
}
