import { hash } from '@fuel-ts/hasher';
import type { BN } from '@fuel-ts/math';
import type { TransactionBlob } from '@fuel-ts/transactions';

import type { GasCosts } from '../provider';
import { calculateMetadataGasForTxBlob } from '../utils';

import { hashTransaction } from './hash-transaction';
import type { BaseTransactionRequestLike } from './transaction-request';
import { BaseTransactionRequest, TransactionType } from './transaction-request';

export interface BlobTransactionRequestLike extends BaseTransactionRequestLike {
  /** Witness index of contract bytecode to create */
  witnessIndex?: number;
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
  witnessIndex: number;

  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex, ...rest }: BlobTransactionRequestLike) {
    super(rest);
    this.witnessIndex = witnessIndex ?? 0;
  }

  /**
   * Converts the transaction request to a `TransactionBlob`.
   *
   * @returns The transaction create object.
   */
  toTransaction(): TransactionBlob {
    const baseTransaction = this.getBaseTransaction();
    const witnessIndex = this.witnessIndex;
    return {
      type: TransactionType.Blob,
      ...baseTransaction,
      id: hash(this.witnesses[witnessIndex]),
      witnessIndex,
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

  metadataGas(gasCosts: GasCosts): BN {
    return calculateMetadataGasForTxBlob({
      gasCosts,
      txBytesSize: this.byteSize(),
    });
  }
}
