import { ReceiptType } from '@fuel-ts/transactions';

import type { GqlReceiptFragmentFragment } from '../__generated__/operations';
import type { TransactionResultReceipt } from '../transaction-response';
import { assembleReceiptByType } from '../utils';

import type { BurnedOrMintedAsset } from './types';

export const processGqlReceipt = (
  gqlReceipt: GqlReceiptFragmentFragment
): TransactionResultReceipt => {
  const receipt = assembleReceiptByType(gqlReceipt);

  switch (receipt.type) {
    case ReceiptType.ReturnData: {
      return {
        ...receipt,
        data: gqlReceipt.data || '0x',
      };
    }
    case ReceiptType.LogData: {
      return {
        ...receipt,
        data: gqlReceipt.data || '0x',
      };
    }
    default:
      return receipt;
  }
};

export const extractAssetIdFromBurnOrMintReceipts = (
  receipts: Array<TransactionResultReceipt>
): {
  mintedAssets: BurnedOrMintedAsset[];
  burnedAssets: BurnedOrMintedAsset[];
} => {
  const mintedAssets: BurnedOrMintedAsset[] = [];
  const burnedAssets: BurnedOrMintedAsset[] = [];

  receipts.forEach((receipt) => {
    if (receipt.type === ReceiptType.Mint) {
      mintedAssets.push({
        subId: receipt.subId,
        contractId: receipt.contractId,
        assetId: receipt.assetId,
        amount: receipt.val,
      });
    } else if (receipt.type === ReceiptType.Burn) {
      burnedAssets.push({
        subId: receipt.subId,
        contractId: receipt.contractId,
        assetId: receipt.assetId,
        amount: receipt.val,
      });
    }
  });

  return { mintedAssets, burnedAssets };
};
