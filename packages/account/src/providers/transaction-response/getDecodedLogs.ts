import type { JsonAbi } from '@fuel-ts/abi-coder';
import { Interface, BigNumberCoder } from '@fuel-ts/abi-coder';
import { ReceiptType } from '@fuel-ts/transactions';

import type { TransactionResultReceipt } from './transaction-response';

/** @hidden */
export function getDecodedLogs<T = unknown>(
  receipts: Array<TransactionResultReceipt>,
  mainAbi: JsonAbi,
  externalAbis: Record<string, JsonAbi> = {}
): T[] {
  /**
   * This helper decodes logs from transaction receipts.
   * It loops through all receipts and decodes two types of logs:
   * - ReceiptType.LogData
   * - ReceiptType.Log
   *
   * The "mainAbi" parameter represents the ABI of the main contract used to create the transaction
   * or the ABI from a script used within a "BaseInvocationScope" context.
   * The "externalAbis" parameter is a record of contract ABIs that are also part of the transaction.
   * These ABIs were added using `contract.addContracts` or through a multicall with `contract.multiCall`.
   *
   * @param receipts - The array of transaction result receipts.
   * @param mainAbi - The ABI of the script or main contract.
   * @param externalAbis - The record of external contract ABIs.
   * @returns An array of decoded logs from Sway projects.
   */
  return receipts.reduce((logs: T[], receipt) => {
    if (receipt.type === ReceiptType.LogData || receipt.type === ReceiptType.Log) {
      const interfaceToUse = new Interface(externalAbis[receipt.id] || mainAbi);

      const data =
        receipt.type === ReceiptType.Log
          ? new BigNumberCoder('u64').encode(receipt.ra)
          : receipt.data;

      const [decodedLog] = interfaceToUse.decodeLog(data, receipt.rb.toString());
      logs.push(decodedLog);
    }

    return logs;
  }, []);
}
