import { ReceiptType } from '@fuel-ts/transactions';

import type { GqlReceiptFragmentFragment } from '../__generated__/operations';
import type {
  TransactionResultMintReceipt,
  TransactionResultReceipt,
} from '../transaction-response';
import { assembleReceiptByType } from '../utils';

import type { MintedAssets } from './types';

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

export const extractAssetIdFromMintReceipts = (
  receipts: Array<TransactionResultReceipt>
): Array<MintedAssets> => {
  const mintedAssets: MintedAssets[] = [];

  receipts.forEach((receipt) => {
    if (receipt.type === ReceiptType.Mint) {
      mintedAssets.push({
        subId: (<TransactionResultMintReceipt>receipt).subId, // not sure if this field can be useful here
        contractId: (<TransactionResultMintReceipt>receipt).contractId, // not sure if this field can be useful here
        assetId: (<TransactionResultMintReceipt>receipt).assetId,
        amount: (<TransactionResultMintReceipt>receipt).val,
      });
    }
  });

  return mintedAssets;
};
