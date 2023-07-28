import { arrayify } from '@ethersproject/bytes';
import type { BN } from '@fuel-ts/math';
import { ReceiptType, ReceiptCoder } from '@fuel-ts/transactions';

import type { GqlReceiptFragmentFragment, GqlTransaction } from '../__generated__/operations';

import type { TransactionResultReceipt } from './transaction-response';

export const processGqlReceipt = (
  gqlReceipt: GqlReceiptFragmentFragment
): TransactionResultReceipt => {
  const receipt = new ReceiptCoder().decode(arrayify(gqlReceipt.rawPayload), 0)[0];

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

export interface IParseGqlTransaction {
  gqlTransaction: GqlTransaction;
  gasPerByte: BN;
  gasPriceFactor: BN;
}
