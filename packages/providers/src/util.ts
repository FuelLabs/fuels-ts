/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-loop-func */
import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { hexlify, arrayify, concat } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
// import { calcRoot } from '@fuel-ts/merkle';
import type { Transaction } from '@fuel-ts/transactions';
import { InputType, OutputType, TransactionType, TransactionCoder } from '@fuel-ts/transactions';
import { createHash } from 'crypto';

function ephemeralMerkleRoot(leaves: Uint8Array[]): string {
  let width = (() => {
    let i = 2;
    while (i < leaves.length) {
      i *= 2;
    }
    return i;
  })();
  let len = leaves.length;

  if (width <= 2) {
    throw new Error('Not yet implemented');
  }

  width /= 2;
  len /= 2.0;

  let current = new Array(width).fill(0).map(() => new Uint8Array(32).fill(0));

  const c = leaves[Symbol.iterator]();

  current.forEach((_, i) => {
    const hasher = createHash('sha256');

    try {
      hasher.update(c.next().value);
      hasher.update(c.next().value);
    } catch {
      //
    }

    current[i] = Uint8Array.from(hasher.digest());
  });

  let next = [...current].map((v) => Uint8Array.from(v));

  while (width > 1) {
    [current, next] = [next, current];

    const c = current.slice(0, Math.ceil(len))[Symbol.iterator]();

    width /= 2;
    len /= 2.0;

    next.slice(0, width).forEach((_, i) => {
      const hasher = createHash('sha256');

      try {
        hasher.update(c.next().value);
        hasher.update(c.next().value);
      } catch {
        //
      }

      next[i] = Uint8Array.from(hasher.digest());
    });
  }

  return hexlify(next[0]);
}

const getContractRoot = (bytecode: Uint8Array): string => {
  const chunkSize = 8;
  const chunks: Uint8Array[] = [];
  for (let offset = 0; offset < bytecode.length; offset += chunkSize) {
    const chunk = new Uint8Array(chunkSize);
    chunk.set(bytecode.slice(offset, offset + chunkSize));
    chunks.push(chunk);
  }
  // TODO: Use `calcRoot()` when fuel-vm starts using it
  // return calcRoot(chunks.map((c) => hexlify(c)));
  return ephemeralMerkleRoot(chunks);
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
  const signableTransaction = { ...transaction, data: { ...transaction.data } } as Transaction;
  switch (signableTransaction.type) {
    case TransactionType.Script: {
      signableTransaction.data.receiptsRoot =
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

  signableTransaction.data.inputs = signableTransaction.data.inputs.map((input) => {
    if (input.type === InputType.Contract) {
      return {
        ...input,
        data: {
          ...input.data,
          utxoID: '0x00000000000000000000000000000000000000000000000000000000',
          balanceRoot: '0x00000000000000000000000000000000000000000000000000000000',
          stateRoot: '0x00000000000000000000000000000000000000000000000000000000',
        },
      };
    }
    return input;
  });

  signableTransaction.data.outputs = signableTransaction.data.outputs.map((output) => {
    switch (output.type) {
      case OutputType.Contract: {
        return {
          ...output,
          data: {
            ...output.data,
            balanceRoot: '0x00000000000000000000000000000000000000000000000000000000',
            stateRoot: '0x00000000000000000000000000000000000000000000000000000000',
          },
        };
      }
      case OutputType.Change: {
        return {
          ...output,
          data: {
            ...output.data,
            amount: BigNumber.from(0),
          },
        };
      }
      case OutputType.Variable: {
        return {
          ...output,
          data: {
            ...output.data,
            to: '0x00000000000000000000000000000000000000000000000000000000',
            amount: BigNumber.from(0),
            color: '0x00000000000000000000000000000000000000000000000000000000',
          },
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
