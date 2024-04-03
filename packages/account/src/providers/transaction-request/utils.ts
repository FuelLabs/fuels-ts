import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { TransactionType, InputType } from '@fuel-ts/transactions';

import type { ExcludeResourcesOption } from '../resource';

import { CreateTransactionRequest } from './create-transaction-request';
import type { TransactionRequestInput } from './input';
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
      throw new FuelError(ErrorCode.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${type}.`);
    }
  }
};

export const cacheTxInputsFromOwner = (
  inputs: TransactionRequestInput[],
  owner: string
): ExcludeResourcesOption =>
  inputs.reduce(
    (acc, input) => {
      if (input.type === InputType.Coin && input.owner === owner) {
        acc.utxos.push(input.id);
      }

      if (input.type === InputType.Message && input.recipient === owner) {
        acc.messages.push(input.nonce);
      }

      return acc;
    },
    {
      utxos: [],
      messages: [],
    } as Required<ExcludeResourcesOption>
  );
