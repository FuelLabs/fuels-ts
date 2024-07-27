import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { TransactionType } from '@fuel-ts/transactions';

import { CreateTransactionRequest } from './create-transaction-request';
import { ScriptTransactionRequest } from './script-transaction-request';
import type { TransactionRequestLike, TransactionRequest } from './types';

/** @hidden */
export const transactionRequestify = (obj: TransactionRequestLike): TransactionRequest => {
  if (obj instanceof ScriptTransactionRequest || obj instanceof CreateTransactionRequest) {
    return obj;
  }

  const { type } = obj;

  switch (obj.type) {
    case TransactionType.Script: {
      return ScriptTransactionRequest.from(obj);
    }
    case TransactionType.Create: {
      return CreateTransactionRequest.from(obj);
    }
    default: {
      throw new FuelError(
        ErrorCode.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${type}.`
      );
    }
  }
};
