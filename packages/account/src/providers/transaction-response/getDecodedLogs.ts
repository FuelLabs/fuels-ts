import type { AbiSpecification } from '@fuel-ts/abi';
import { AbiCoder, AbiEncoding } from '@fuel-ts/abi';
import { ReceiptType } from '@fuel-ts/transactions';

import type { TransactionResultReceipt } from './transaction-response';

/** @hidden */
export function getDecodedLogs<T = unknown>(
  receipts: Array<TransactionResultReceipt>,
  mainAbi: AbiSpecification,
  externalAbis: Record<string, AbiSpecification> = {}
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
      const interfaceToUse = AbiCoder.fromAbi(externalAbis[receipt.id] || mainAbi);

      const data =
        receipt.type === ReceiptType.Log
          ? AbiEncoding.v1.coders.u64.encode(receipt.val0)
          : receipt.data;

      const log = interfaceToUse.getLog(receipt.val1.toString());
      const decodedLog = log.decode(data) as T;
      logs.push(decodedLog);
    }

    return logs;
  }, []);
}
