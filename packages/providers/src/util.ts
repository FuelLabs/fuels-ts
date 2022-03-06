import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { hexlify, arrayify, concat } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import { calcRoot } from '@fuel-ts/merkle';
import type { Transaction } from '@fuel-ts/transactions';
import { InputType, OutputType, TransactionType, TransactionCoder } from '@fuel-ts/transactions';

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

export const getContractStorageRoot = (storageSlots: [Uint8Array, Uint8Array][]): string => {
  const chunkSize = 8;
  const chunks: Uint8Array[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of storageSlots) {
    const chunk = new Uint8Array(chunkSize);
    chunk.set(key);
    chunk.set(value, 32);
    chunks.push(chunk);
  }
  return calcRoot(chunks.map((c) => hexlify(c)));
};

export const getContractId = (
  bytecode: BytesLike,
  salt: BytesLike,
  stateRoot: BytesLike
): string => {
  const root = getContractRoot(arrayify(bytecode));
  const contractId = sha256(concat(['0x4655454C', salt, root, stateRoot]));
  return contractId;
};

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
        utxoID: {
          transactionId: '0x00000000000000000000000000000000000000000000000000000000',
          outputIndex: BigNumber.from(0),
        },
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
