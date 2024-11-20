import type { BN } from '@fuel-ts/math';
import type { TransactionBlob } from '@fuel-ts/transactions';
import { clone } from 'ramda';

import type { GasCosts } from '../provider';
import { calculateMetadataGasForTxBlob } from '../utils';

import { hashTransaction } from './hash-transaction';
import type { BaseTransactionRequestLike } from './transaction-request';
import { BaseTransactionRequest, TransactionType } from './transaction-request';

export interface BlobTransactionRequestLike extends BaseTransactionRequestLike {
  /** Blob ID */
  blobId: string;
  /** Witness index of the bytecode to create */
  witnessIndex?: number;
}

export class BlobTransactionRequest extends BaseTransactionRequest {
  static from(obj: BlobTransactionRequestLike) {
    return new this(clone(obj));
  }

  /** Type of the transaction */
  type = TransactionType.Blob as const;
  /** Blob ID */
  blobId: string;
  /** Witness index of the bytecode to create */
  witnessIndex: number;

  /**
   * Creates an instance `BlobTransactionRequest`.
   *
   * @param blobTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex, blobId, ...rest }: BlobTransactionRequestLike) {
    super(rest);
    this.blobId = blobId;
    this.witnessIndex = witnessIndex ?? 0;
  }

  /**
   * Converts the transaction request to a `TransactionBlob`.
   *
   * @returns The transaction create object.
   */
  toTransaction(): TransactionBlob {
    const baseTransaction = this.getBaseTransaction();
    const { witnessIndex, blobId } = this;
    return {
      type: TransactionType.Blob,
      ...baseTransaction,
      blobId,
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

  /**
   * Calculates the metadata gas cost for a blob transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   * @returns metadata gas cost for the blob transaction.
   */
  override metadataGas(gasCosts: GasCosts): BN {
    return calculateMetadataGasForTxBlob({
      gasCosts,
      txBytesSize: this.byteSize(),
      witnessBytesSize: this.witnesses[this.witnessIndex].length,
    });
  }
}
