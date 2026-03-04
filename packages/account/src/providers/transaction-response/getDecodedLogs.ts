import type { JsonAbi } from '@fuel-ts/abi-coder';
import { Interface, BigNumberCoder } from '@fuel-ts/abi-coder';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { ReceiptType } from '@fuel-ts/transactions';

import type {
  TransactionResultCallReceipt,
  TransactionResultReceipt,
} from './transaction-response';

/**
 * @hidden
 *
 * This helper decodes logs from transaction receipts.
 * It loops through all receipts and decodes two types of logs:
 * - ReceiptType.LogData
 * - ReceiptType.Log
 *
 * The "mainAbi" parameter represents the ABI of the main contract used to create the transaction
 * or the ABI from a script used within a "BaseInvocationScope" context.
 * The "externalAbis" parameter is a record of contract ABIs that are also part of the transaction.
 * These ABIs were added using `contract.addContracts` or through a multi-call with `contract.multiCall`.
 *
 * @param receipts - The array of transaction result receipts.
 * @param mainAbi - The ABI of the script or main contract.
 * @param externalAbis - The record of external contract ABIs.
 * @returns An array of decoded logs from Sway projects.
 *
 * @deprecated Use `getAllDecodedLogs` instead.
 */
export function getDecodedLogs<T = unknown>(
  receipts: Array<TransactionResultReceipt>,
  mainAbi: JsonAbi,
  externalAbis: Record<string, JsonAbi> = {}
): T[] {
  let mainContract = '';
  if (mainAbi.programType === 'contract') {
    const firstCallReceipt = receipts.find(
      (r) => r.type === ReceiptType.Call && r.id === ZeroBytes32
    ) as TransactionResultCallReceipt;

    mainContract = firstCallReceipt.to;
  }

  return receipts.reduce((logs: T[], receipt) => {
    if (receipt.type === ReceiptType.LogData || receipt.type === ReceiptType.Log) {
      const isLogFromMainAbi = receipt.id === ZeroBytes32 || mainContract === receipt.id;
      const isDecodable = isLogFromMainAbi || externalAbis[receipt.id];

      if (isDecodable) {
        const interfaceToUse = isLogFromMainAbi
          ? new Interface(mainAbi)
          : new Interface(externalAbis[receipt.id]);

        const data =
          receipt.type === ReceiptType.Log
            ? new BigNumberCoder('u64').encode(receipt.ra)
            : receipt.data;

        let logEntry: unknown;

        try {
          [logEntry] = interfaceToUse.decodeLog(data, receipt.rb.toString());
        } catch (error) {
          logEntry = { __decoded: false, data, logId: receipt.rb.toString() };
        }

        logs.push(logEntry as T);
      }
    }

    return logs;
  }, []);
}
