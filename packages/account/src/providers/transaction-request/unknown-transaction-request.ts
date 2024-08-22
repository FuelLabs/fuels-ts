import type { BytesLike } from '@fuel-ts/interfaces';
import type { TransactionUnknown } from '@fuel-ts/transactions';

import { hashTransaction } from './hash-transaction';
import type { BaseTransactionRequestLike } from './transaction-request';
import { BaseTransactionRequest, TransactionType } from './transaction-request';

/**
 * @hidden
 */
export interface UnknownTransactionRequestLike extends BaseTransactionRequestLike {
  data?: BytesLike;
}

export class UnknownTransactionRequest extends BaseTransactionRequest {
  static from(obj: UnknownTransactionRequestLike) {
    if (obj instanceof this) {
      return obj;
    }
    return new this(obj);
  }

  /** Type of the transaction */
  type = TransactionType.Unknown as const;

  /** Data of the transaction */
  data?: BytesLike;

  constructor({ data, ...rest }: UnknownTransactionRequestLike = {}) {
    super(rest);
    this.data = data;
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
   * Converts the transaction request to a `TransactionBlob`.
   *
   * @returns The transaction create object.
   */
  toTransaction(): TransactionUnknown {
    return {
      ...this.getBaseTransaction(),
      type: TransactionType.Unknown,
      data: this.data,
    };
  }
}
