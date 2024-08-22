import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { TransactionType, type BaseTransactionType } from '@fuel-ts/transactions';

import { BlobTransactionRequest } from './blob-transaction-request';
import { CreateTransactionRequest } from './create-transaction-request';
import { ScriptTransactionRequest } from './script-transaction-request';
import type { TransactionRequestLike, TransactionRequest } from './types';
import { UnknownTransactionRequest } from './unknown-transaction-request';

/** @hidden */
const isBaseTransaction = (obj: TransactionRequestLike): boolean => {
  const baseTransactionKeys: Array<keyof BaseTransactionType> = [
    'type',
    'witnesses',
    'witnessesCount',
    'outputs',
    'inputs',
    'policies',
    'policyTypes',
    'inputsCount',
    'outputsCount',
  ];

  return baseTransactionKeys.every((prop) => prop in obj);
};

/** @hidden */
export const transactionRequestify = (obj: TransactionRequestLike): TransactionRequest => {
  if (
    obj instanceof ScriptTransactionRequest ||
    obj instanceof CreateTransactionRequest ||
    obj instanceof BlobTransactionRequest
  ) {
    return obj;
  }

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
      if (isBaseTransaction(obj)) {
        // eslint-disable-next-line no-console
        console.warn(
          'This transaction type is not supported in this SDK version, it will be ignored, if you believe this is an error, please upgrade your SDK'
        );
        return UnknownTransactionRequest.from({
          ...obj,
        });
      }

      throw new FuelError(
        ErrorCode.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${obj.type}`
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

/** @hidden */
export const isTransactionTypeUnknown = (
  request: TransactionRequestLike
): request is UnknownTransactionRequest => request.type === TransactionType.Unknown;
