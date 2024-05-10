import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import { InputType, TransactionType } from '@fuel-ts/transactions';

import type { ExcludeResourcesOption } from '../resource';

import { CreateTransactionRequest } from './create-transaction-request';
import type { TransactionRequestInput } from './input';
import { ScriptTransactionRequest } from './script-transaction-request';
import type { TransactionRequest, TransactionRequestLike } from './types';

/** @hidden */
export const transactionRequestify = (
  obj: TransactionRequestLike,
): TransactionRequest => {
  if (
    obj instanceof ScriptTransactionRequest ||
    obj instanceof CreateTransactionRequest
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
    default: {
      throw new FuelError(
        ErrorCode.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${type}.`,
      );
    }
  }
};

export const cacheTxInputsFromOwner = (
  inputs: TransactionRequestInput[],
  owner: AbstractAddress,
): ExcludeResourcesOption =>
  inputs.reduce(
    (acc, input) => {
      if (input.type === InputType.Coin && input.owner === owner.toB256()) {
        acc.utxos.push(input.id);
      }

      if (
        input.type === InputType.Message &&
        input.recipient === owner.toB256()
      ) {
        acc.messages.push(input.nonce);
      }

      return acc;
    },
    {
      utxos: [],
      messages: [],
    } as Required<ExcludeResourcesOption>,
  );
