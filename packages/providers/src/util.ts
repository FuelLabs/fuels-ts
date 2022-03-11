import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import { ZeroBytes32 } from '@fuel-ts/constants';
import type { Transaction } from '@fuel-ts/transactions';
import { InputType, OutputType, TransactionType, TransactionCoder } from '@fuel-ts/transactions';

export const getCoinUtxoId = (transactionId: BytesLike, outputIndex: BigNumberish): string => {
  const coinUtxoId = sha256(
    concat([arrayify(transactionId), Uint8Array.from([BigNumber.from(outputIndex).toNumber()])])
  );
  return coinUtxoId;
};

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
          outputIndex: BigNumber.from(0),
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
          amount: BigNumber.from(0),
        };
      }
      case OutputType.Variable: {
        return {
          ...output,
          to: ZeroBytes32,
          amount: BigNumber.from(0),
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

  const encodedTransaction = new TransactionCoder('signableTransaction').encode(
    signableTransaction
  );

  return sha256(encodedTransaction);
};
