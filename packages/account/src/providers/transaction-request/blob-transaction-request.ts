import { hash } from '@fuel-ts/hasher';
import type { TransactionBlob } from '@fuel-ts/transactions';

import { hashTransaction } from './hash-transaction';
import type { BaseTransactionRequestLike } from './transaction-request';
import { BaseTransactionRequest, TransactionType } from './transaction-request';

export interface BlobTransactionRequestLike extends BaseTransactionRequestLike {
  /** Witness index of contract bytecode to create */
  bytecodeWitnessIndex?: number;
}

export class BlobTransactionRequest extends BaseTransactionRequest {
  static from(obj: BlobTransactionRequestLike) {
    if (obj instanceof this) {
      return obj;
    }
    return new this(obj);
  }

  /** Type of the transaction */
  type = TransactionType.Blob as const;
  /** Witness index of contract bytecode to create */
  bytecodeWitnessIndex: number;

  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex, ...rest }: BlobTransactionRequestLike) {
    super(rest);
    this.bytecodeWitnessIndex = bytecodeWitnessIndex ?? 0;
  }

  /**
   * Converts the transaction request to a `TransactionBlob`.
   *
   * @returns The transaction create object.
   */
  toTransaction(): TransactionBlob {
    const baseTransaction = this.getBaseTransaction();
    const bytecodeWitnessIndex = this.bytecodeWitnessIndex;
    return {
      type: TransactionType.Blob,
      ...baseTransaction,
      blobId: hash(this.witnesses[bytecodeWitnessIndex]),
      bytecodeWitnessIndex,
    };
  }

  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(chainId: number): string {
    return hashTransaction(this, chainId);
  }
}
