import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { TransactionType } from '@fuel-ts/transactions';

import { BlobTransactionRequest } from './blob-transaction-request';
import { CreateTransactionRequest } from './create-transaction-request';
import { ScriptTransactionRequest } from './script-transaction-request';
import type { TransactionRequestLike, TransactionRequest } from './types';

/** @hidden */
export const transactionRequestify = (obj: TransactionRequestLike): TransactionRequest => {
  if (
    obj instanceof ScriptTransactionRequest ||
    obj instanceof CreateTransactionRequest ||
    obj instanceof BlobTransactionRequest
  ) {
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
    case TransactionType.Blob: {
      return BlobTransactionRequest.from(obj);
    }
    default: {
      throw new FuelError(
        ErrorCode.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${type}.`
      );
    }
  }
};

/** @hidden */
export const isTransactionTypeScript = (
  request: TransactionRequestLike
): request is ScriptTransactionRequest => request.type === TransactionType.Script;

/** @hidden */
export const isTransactionTypeCreate = (
  request: TransactionRequestLike
): request is CreateTransactionRequest => request.type === TransactionType.Create;

/** @hidden */
export const isTransactionTypeBlob = (
  request: TransactionRequestLike
): request is BlobTransactionRequest => request.type === TransactionType.Blob;
