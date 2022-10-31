import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import { ReceiptType } from '@fuel-ts/transactions';

import type { TransactionResultReceipt } from './transaction-response';

// TODO: create a fuel-ts/bytes package
// This custom arrayify enables to parse a object from Uint8Array
// stringify back to a Uint8Array by setting the missing length field
export const arraifyFromUint8Array = (bytes: BytesLike): Uint8Array => {
  if (bytes.length == null && typeof bytes === 'object') {
    const length = Object.keys(bytes).length;
    return arrayify({
      ...bytes,
      length,
    });
  }
  return arrayify(bytes);
};

export const calculatePriceWithFactor = (gasUsed: BN, gasPrice: BN, priceFactor: BN): BN =>
  bn(Math.ceil(gasUsed.toNumber() / priceFactor.toNumber()) * gasPrice.toNumber());

export const getGasUsedFromReceipts = (receipts: Array<TransactionResultReceipt>): BN => {
  const scriptResult = receipts.find((receipt) => receipt.type === ReceiptType.ScriptResult);

  if (scriptResult && scriptResult.type === ReceiptType.ScriptResult) {
    return scriptResult.gasUsed;
  }

  return bn(0);
};

export function sleep(time: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}
