import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { TransactionType } from '@fuel-ts/transactions';

import { CreateTransactionRequest } from './create-transaction-request';
import { ScriptTransactionRequest } from './script-transaction-request';
import type { TransactionRequestLike, TransactionRequest } from './types';

/**
 * @hidden
 *
 * @throws {@link "@fuel-ts/errors".ErrorCode.INVALID_TRANSACTION_TYPE}
 * When the transaction type is not one of: {@link TransactionType.Script} or {@link TransactionType.Create}.
 */
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
      throw new FuelError(ErrorCode.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${type}.`);
    }
  }
};
