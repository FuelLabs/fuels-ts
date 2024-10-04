import { ReceiptType } from '@fuel-ts/transactions';

import type { GqlReceiptFragment } from '../__generated__/operations';
import type { TransactionResultReceipt } from '../transaction-response';
import { assembleReceiptByType } from '../utils';

import type { BurnedAsset, MintedAsset } from './types';

export const processGqlReceipt = (gqlReceipt: GqlReceiptFragment): TransactionResultReceipt =>
  assembleReceiptByType(gqlReceipt);

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
