import { ReceiptType } from '@fuel-ts/transactions';

import type { TransactionReceiptJson } from '../provider';
import type { TransactionResultReceipt } from '../transaction-response';
import { deserializeReceipt } from '../utils/serialization';

import type { BurnedAsset, MintedAsset } from './types';

/** @deprecated Use `deserializeReceipt` instead. */
export const processGqlReceipt = (gqlReceipt: TransactionReceiptJson): TransactionResultReceipt =>
  deserializeReceipt(gqlReceipt);

export const extractMintedAssetsFromReceipts = (
  receipts: Array<TransactionResultReceipt>
): MintedAsset[] => {
  const mintedAssets: MintedAsset[] = [];

  receipts.forEach((receipt) => {
    if (receipt.type === ReceiptType.Mint) {
      mintedAssets.push({
        subId: receipt.subId,
        contractId: receipt.contractId,
        assetId: receipt.assetId,
        amount: receipt.val,
      });
    }
  });

  return mintedAssets;
};

export const extractBurnedAssetsFromReceipts = (
  receipts: Array<TransactionResultReceipt>
): BurnedAsset[] => {
  const burnedAssets: BurnedAsset[] = [];

  receipts.forEach((receipt) => {
    if (receipt.type === ReceiptType.Burn) {
      burnedAssets.push({
        subId: receipt.subId,
        contractId: receipt.contractId,
        assetId: receipt.assetId,
        amount: receipt.val,
      });
    }
  });

  return burnedAssets;
};
