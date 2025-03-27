import type { JsonAbi } from '@fuel-ts/abi-coder';
import { Interface, BigNumberCoder } from '@fuel-ts/abi-coder';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { ReceiptType } from '@fuel-ts/transactions';

import type {
  TransactionResultCallReceipt,
  TransactionResultReceipt,
} from './transaction-response';

export interface DecodedLogs<T = unknown> {
  logs: T[];
  logsByContract: Record<string, T[]>;
}

/**
 * @hidden
 */
export function getAllDecodedLogs<T = unknown>(opts: {
  receipts: Array<TransactionResultReceipt>;
  mainAbi: JsonAbi;
  externalAbis?: Record<string, JsonAbi>;
}): DecodedLogs<T> {
  const { receipts, mainAbi, externalAbis = {} } = opts;

  /**
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
   */
  let mainContract = '';
  if (mainAbi.programType === 'contract') {
    const firstCallReceipt = receipts.find(
      (r) => r.type === ReceiptType.Call && r.id === ZeroBytes32
    ) as TransactionResultCallReceipt;

    mainContract = firstCallReceipt.to;
  }

  return receipts.reduce(
    ({ logs, logsByContract }, receipt) => {
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

          const [decodedLog] = interfaceToUse.decodeLog(data, receipt.rb.toString());
          logs.push(decodedLog);
          // eslint-disable-next-line no-param-reassign
          logsByContract[receipt.id] = [...(logsByContract[receipt.id] || []), decodedLog];
        }
      }

      return { logs, logsByContract };
    },
    { logs: [], logsByContract: {} } as DecodedLogs<T>
  );
}
