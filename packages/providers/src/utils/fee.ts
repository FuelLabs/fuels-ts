import type { BN } from '@fuel-ts/math';
import { bn, multiply } from '@fuel-ts/math';
import { ReceiptType } from '@fuel-ts/transactions';
import { GAS_PRICE_FACTOR } from '@fuel-ts/transactions/configs';

import type {
  TransactionResultReceipt,
  TransactionResultScriptResultReceipt,
} from '../transaction-response';

export const calculatePriceWithFactor = (gasUsed: BN, gasPrice: BN, priceFactor: BN): BN =>
  bn(Math.ceil(gasUsed.toNumber() / priceFactor.toNumber()) * gasPrice.toNumber());

export const getGasUsedFromReceipts = (receipts: Array<TransactionResultReceipt>): BN => {
  const scriptResult = receipts.filter(
    (receipt) => receipt.type === ReceiptType.ScriptResult
  ) as TransactionResultScriptResultReceipt[];

  const gasUsed = scriptResult.reduce((prev, receipt) => prev.add(receipt.gasUsed), bn(0));

  return gasUsed;
};

export const calculateTransactionFee = ({
  receipts,
  gasPrice,
  margin,
}: {
  receipts: TransactionResultReceipt[];
  gasPrice: BN;
  margin?: number;
}) => {
  const gasUsed = multiply(getGasUsedFromReceipts(receipts), margin || 1);
  const fee = calculatePriceWithFactor(gasUsed, gasPrice, GAS_PRICE_FACTOR);

  return {
    gasUsed,
    fee,
  };
};
