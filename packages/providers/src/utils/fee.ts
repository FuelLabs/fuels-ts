import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { Witness } from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';

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
export interface CalculateTxChargeableBytesParams {
  transactionBytes: Uint8Array;
  transactionWitnesses?: Witness[];
}

/** @hidden */
export const calculateTxChargeableBytes = (params: CalculateTxChargeableBytesParams): BN => {
  const { transactionWitnesses } = params;

  const txChargeableBytes = bn(transactionWitnesses?.[0]?.offset || 0);

  return txChargeableBytes;
};

export interface CalculateTransactionFeeParams {
  gasUsed: BN;
  gasPrice: BN;
  gasLimit: BN;
  gasPerByte: BN;
  gasPriceFactor: BN;
  chargeableBytes: BN;
}

/** @hidden */
export const calculateTransactionFee = ({
  gasPrice,
  gasLimit,
  gasPerByte,
  gasPriceFactor,
  chargeableBytes,
}: CalculateTransactionFeeParams) => {
  const bytesGas = chargeableBytes.mul(gasPerByte.toNumber());

  // TODO: Consider gas used by predicated
  const minGas = bytesGas.add(0); // add gas used per predicates
  const maxGas = bytesGas.add(gasLimit);

  const minGasToPay = bn(Math.ceil(minGas.mul(gasPrice).toNumber() / gasPriceFactor.toNumber()));
  const maxGasToPay = bn(Math.ceil(maxGas.mul(gasPrice).toNumber() / gasPriceFactor.toNumber()));

  return {
    fee: minGasToPay,
    minGasToPay,
    maxGasToPay,
  };
};
