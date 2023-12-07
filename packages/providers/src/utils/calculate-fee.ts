import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import { ReceiptType } from '@fuel-ts/transactions';

import type {
  TransactionResultReceipt,
  TransactionResultScriptResultReceipt,
} from '../transaction-response';

/** @hidden */
export const calculatePriceWithFactor = (gas: BN, gasPrice: BN, priceFactor: BN): BN =>
  bn(Math.ceil(gas.mul(gasPrice).toNumber() / priceFactor.toNumber()));

/** @hidden */
export const getGasUsedFromReceipts = (receipts: Array<TransactionResultReceipt>): BN => {
  const scriptResult = receipts.filter(
    (receipt) => receipt.type === ReceiptType.ScriptResult
  ) as TransactionResultScriptResultReceipt[];

  const gasUsed = scriptResult.reduce((prev, receipt) => prev.add(receipt.gasUsed), bn(0));

  return gasUsed;
};
