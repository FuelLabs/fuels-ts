import type { BN } from '@fuel-ts/math';
import { bn, multiply } from '@fuel-ts/math';
import type { Witness, TransactionType } from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';
import { GAS_PER_BYTE, GAS_PRICE_FACTOR } from '@fuel-ts/transactions/configs';

import type {
  TransactionResultReceipt,
  TransactionResultScriptResultReceipt,
} from '../transaction-response';

/** @hidden */
export const calculatePriceWithFactor = (gasUsed: BN, gasPrice: BN, priceFactor: BN): BN =>
  bn(Math.ceil(gasUsed.toNumber() / priceFactor.toNumber()) * gasPrice.toNumber());

/** @hidden */
export const getGasUsedFromReceipts = (receipts: Array<TransactionResultReceipt>): BN => {
  const scriptResult = receipts.filter(
    (receipt) => receipt.type === ReceiptType.ScriptResult
  ) as TransactionResultScriptResultReceipt[];

  const gasUsed = scriptResult.reduce((prev, receipt) => prev.add(receipt.gasUsed), bn(0));

  return gasUsed;
};

/** @hidden */
export function getGasUsedForContractCreated({
  transactionBytes,
  gasPerByte,
  gasPriceFactor,
  transactionWitnesses,
}: {
  transactionBytes: Uint8Array;
  gasPerByte: BN;
  gasPriceFactor: BN;
  transactionWitnesses: Witness[];
}) {
  const witnessSize = transactionWitnesses?.reduce((total, w) => total + w.dataLength, 0) || 0;

  const txChargeableBytes = bn(transactionBytes.length - witnessSize);

  const gasUsed = bn(
    Math.ceil(
      (txChargeableBytes.toNumber() * bn(gasPerByte).toNumber()) / bn(gasPriceFactor).toNumber()
    )
  );

  return gasUsed;
}

/**
 * @hidden
 */
export interface ICalculateTransactionFee {
  receipts: TransactionResultReceipt[];
  gasPrice: BN;
  transactionBytes: Uint8Array;
  transactionType: TransactionType;
  transactionWitnesses: Witness[];
  gasPriceFactor?: BN;
  gasPerByte?: BN;
  margin?: number;
}

/** @hidden */
export const calculateTransactionFee = ({
  receipts,
  gasPrice,
  gasPriceFactor,
  margin,
}: ICalculateTransactionFee) => {
  const gasUsed = multiply(getGasUsedFromReceipts(receipts), margin || 1);
  const fee = calculatePriceWithFactor(gasUsed, gasPrice, gasPriceFactor || GAS_PRICE_FACTOR);

  return {
    fee,
    gasUsed,
  };
};

export interface ICalculateTransactionFeeForContractCreated {
  gasPrice: BN;
  transactionBytes: Uint8Array;
  transactionWitnesses: Witness[];
  gasPriceFactor?: BN;
  gasPerByte?: BN;
}

export const calculateTransactionFeeForContractCreated = (
  params: ICalculateTransactionFeeForContractCreated
) => {
  const {
    gasPrice,
    transactionBytes,
    transactionWitnesses,
    gasPerByte = GAS_PER_BYTE,
    gasPriceFactor = GAS_PRICE_FACTOR,
  } = params;

  const witnessSize = transactionWitnesses?.reduce((total, w) => total + w.dataLength, 0) || 0;

  const txChargeableBytes = bn(transactionBytes.length - witnessSize);

  const gasUsed = bn(
    Math.ceil(
      (txChargeableBytes.toNumber() * bn(gasPerByte).toNumber()) / bn(gasPriceFactor).toNumber()
    )
  );

  const fee = gasUsed.mul(gasPrice);

  return {
    fee,
    gasUsed,
  };
};
