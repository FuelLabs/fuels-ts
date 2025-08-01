import type { JsonAbi } from '@fuel-ts/abi-coder';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import type { Receipt, ReceiptCall } from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';

import { LogDecoder } from './LogDecoder';
import type { TransactionResultReceipt } from './transaction-response';

const getMainProgramId = (abi: JsonAbi, receipts: Receipt[]) => {
  if (abi.programType === 'contract') {
    const firstCallReceipt = receipts.find(
      (r) => r.type === ReceiptType.Call && r.id === ZeroBytes32
    ) as ReceiptCall | undefined;

    if (firstCallReceipt) {
      return firstCallReceipt.to;
    }
  }
  return ZeroBytes32;
};

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
  const mainProgramId = getMainProgramId(mainAbi, receipts);
  const logDecoder = new LogDecoder({
    [mainProgramId]: mainAbi,
    ...externalAbis,
  });

  const logs = logDecoder.decodeLogs<T>(receipts);
  return logs
    .filter((log) => log.isDecoded)
    .map((log) => log.data as T);
}
