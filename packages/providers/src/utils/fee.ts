import type { BN } from '@fuel-ts/math';
import { bn, multiply } from '@fuel-ts/math';
import type { Witness } from '@fuel-ts/transactions';
import { ReceiptType, TransactionType } from '@fuel-ts/transactions';
import { GAS_PER_BYTE } from '@fuel-ts/transactions/configs';

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

/**
 * @hidden
 */
export interface CalculateTransactionFeeForScriptParams {
  receipts: TransactionResultReceipt[];
  gasPrice: BN;
  gasPriceFactor: BN;
  margin?: number;
}

/** @hidden */
export const calculateTransactionFeeForScript = (
  params: CalculateTransactionFeeForScriptParams
) => {
  const { gasPrice, receipts, gasPriceFactor, margin = 1 } = params;

  const gasUsed = multiply(getGasUsedFromReceipts(receipts), margin);
  const fee = calculatePriceWithFactor(gasUsed, gasPrice, gasPriceFactor);

  return {
    fee,
    gasUsed,
  };
};

/** @hidden */
export interface CalculateTransactionFeeForContractCreatedParams {
  gasPrice: BN;
  transactionBytes: Uint8Array;
  transactionWitnesses: Witness[];
  gasPriceFactor: BN;
  gasPerByte?: BN;
}

/** @hidden */
export const calculateTransactionFeeForContractCreated = (
  params: CalculateTransactionFeeForContractCreatedParams
) => {
  const {
    gasPrice,
    transactionBytes,
    transactionWitnesses,
    gasPerByte = GAS_PER_BYTE,
    gasPriceFactor,
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

export interface CalculateTransactionFeeParams {
  receipts: TransactionResultReceipt[];
  gasPrice: BN;
  margin?: number;
  transactionBytes: Uint8Array;
  transactionWitnesses: Witness[];
  transactionType: TransactionType;
  gasPriceFactor: BN;
  gasPerByte?: BN;
}

/** @hidden */
export const calculateTransactionFee = ({
  receipts,
  gasPrice,
  gasPriceFactor,
  gasPerByte,
  transactionBytes,
  transactionType,
  transactionWitnesses,
  margin,
}: CalculateTransactionFeeParams) => {
  const isTypeCreate = transactionType === TransactionType.Create;

  if (isTypeCreate) {
    return calculateTransactionFeeForContractCreated({
      gasPerByte: gasPerByte || GAS_PER_BYTE,
      gasPriceFactor,
      transactionBytes,
      transactionWitnesses,
      gasPrice,
    });
  }

  return calculateTransactionFeeForScript({
    gasPrice,
    receipts,
    gasPriceFactor,
    margin: margin || 1,
  });
};
