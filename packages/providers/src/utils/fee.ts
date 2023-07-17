import type { BN } from '@fuel-ts/math';
import { bn, multiply } from '@fuel-ts/math';
import type { Witness } from '@fuel-ts/transactions';
import { ReceiptType, TransactionType } from '@fuel-ts/transactions';
import { GAS_PER_BYTE, GAS_PRICE_FACTOR } from '@fuel-ts/transactions/configs';

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

function getGasUsedContractCreated({
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

export const calculateTransactionFee = ({
  receipts,
  gasPrice,
  gasPriceFactor,
  gasPerByte,
  transactionBytes,
  transactionType,
  transactionWitnesses,
  margin,
}: ICalculateTransactionFee) => {
  let gasUsed;
  let fee;

  const isTypeCreate = transactionType === TransactionType.Create;

  if (isTypeCreate) {
    gasUsed = getGasUsedContractCreated({
      gasPerByte: gasPerByte || GAS_PER_BYTE,
      gasPriceFactor: gasPriceFactor || GAS_PRICE_FACTOR,
      transactionBytes,
      transactionWitnesses,
    });

    fee = gasUsed.mul(gasPrice);
  } else {
    gasUsed = multiply(getGasUsedFromReceipts(receipts), margin || 1);
    fee = calculatePriceWithFactor(gasUsed, gasPrice, gasPriceFactor || GAS_PRICE_FACTOR);
  }

  return {
    fee,
    gasUsed,
  };
};
