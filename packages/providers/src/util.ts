import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { hexlify, arrayify, concat } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import { calcRoot } from '@fuel-ts/merkle';
import type { Transaction } from '@fuel-ts/transactions';
import { InputType, OutputType, TransactionType, TransactionCoder } from '@fuel-ts/transactions';
import { createHash } from 'crypto';

const getContractRoot = (bytecode: Uint8Array): string => {
  const chunkSize = 8;
  const chunks: Uint8Array[] = [];
  for (let offset = 0; offset < bytecode.length; offset += chunkSize) {
    const chunk = new Uint8Array(chunkSize);
    chunk.set(bytecode.slice(offset, offset + chunkSize));
    chunks.push(chunk);
  }
  return calcRoot(chunks.map((c) => hexlify(c)));
};

export const getContractId = (bytecode: BytesLike, salt: string): string => {
  const root = getContractRoot(arrayify(bytecode));
  const contractId = sha256(concat([arrayify('0x4655454C'), arrayify(salt), root]));
  return contractId;
};

export const getCoinUtxoId = (transactionId: BytesLike, outputIndex: BigNumberish): string => {
  const hasher = createHash('sha256');
  hasher.update(arrayify(transactionId));
  hasher.update(Uint8Array.from([BigNumber.from(outputIndex).toNumber()]));
  return hexlify(hasher.digest());
};

export const getSignableTransaction = (transaction: Transaction): Transaction => {
  const signableTransaction = { ...transaction } as Transaction;
  switch (signableTransaction.type) {
    case TransactionType.Script: {
      signableTransaction.receiptsRoot =
        '0x00000000000000000000000000000000000000000000000000000000';
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
        utxoID: '0x00000000000000000000000000000000000000000000000000000000',
        balanceRoot: '0x00000000000000000000000000000000000000000000000000000000',
        stateRoot: '0x00000000000000000000000000000000000000000000000000000000',
      };
    }
    return input;
  });

  signableTransaction.outputs = signableTransaction.outputs.map((output) => {
    switch (output.type) {
      case OutputType.Contract: {
        return {
          ...output,
          balanceRoot: '0x00000000000000000000000000000000000000000000000000000000',
          stateRoot: '0x00000000000000000000000000000000000000000000000000000000',
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
          to: '0x00000000000000000000000000000000000000000000000000000000',
          amount: BigNumber.from(0),
          color: '0x00000000000000000000000000000000000000000000000000000000',
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
