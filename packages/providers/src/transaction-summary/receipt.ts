import { ReceiptType } from '@fuel-ts/transactions';

import type { GqlReceiptFragmentFragment } from '../__generated__/operations';
import type { TransactionResultReceipt } from '../transaction-response';
import { assembleReceiptByType } from '../utils';

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
