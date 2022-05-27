import { sha256 } from '@ethersproject/sha2';
import { ZeroBytes32 } from '@fuel-ts/constants';
import type { Transaction } from '@fuel-ts/transactions';
import { InputType, OutputType, TransactionType, TransactionCoder } from '@fuel-ts/transactions';

export const getSignableTransaction = (transaction: Transaction): Transaction => {
  const signableTransaction = { ...transaction } as Transaction;
  switch (signableTransaction.type) {
    case TransactionType.Script: {
      signableTransaction.receiptsRoot = ZeroBytes32;
      break;
    }
    case TransactionType.Create: {
      break;
    }
    default: {
      throw new Error('Not implemented');
    }
  }

  signableTransaction.inputs = signableTransaction.inputs.map((input) => {
    if (input.type === InputType.Contract) {
      return {
        ...input,
        utxoID: {
          transactionId: ZeroBytes32,
          outputIndex: 0,
        },
        balanceRoot: ZeroBytes32,
        stateRoot: ZeroBytes32,
      };
    }
    return input;
  });

  signableTransaction.outputs = signableTransaction.outputs.map((output) => {
    switch (output.type) {
      case OutputType.Contract: {
        return {
          ...output,
          balanceRoot: ZeroBytes32,
          stateRoot: ZeroBytes32,
        };
      }
      case OutputType.Change: {
        return {
          ...output,
          amount: 0n,
        };
      }
      case OutputType.Variable: {
        return {
          ...output,
          to: ZeroBytes32,
          amount: 0n,
          assetId: ZeroBytes32,
        };
      }
      default: {
        return output;
      }
    }
  });

  return signableTransaction;
};

export const getTransactionId = (transaction: Transaction): string => {
  const signableTransaction = getSignableTransaction(transaction);

  const encodedTransaction = new TransactionCoder().encode(signableTransaction);

  return sha256(encodedTransaction);
};
