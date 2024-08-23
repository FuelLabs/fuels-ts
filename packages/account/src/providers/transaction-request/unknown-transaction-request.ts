import type { BytesLike } from '@fuel-ts/interfaces';
import type { TransactionUnknown } from '@fuel-ts/transactions';

import type { BaseTransactionRequestLike } from './transaction-request';
import { BaseTransactionRequest, TransactionType } from './transaction-request';

/**
 * @hidden
 */
export interface UnknownTransactionRequestLike extends BaseTransactionRequestLike {
  bytes?: BytesLike;
}
/**
 * @hidden
 */
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
  bytes?: BytesLike;

  constructor({ bytes, ...rest }: UnknownTransactionRequestLike = {}) {
    super(rest);
    this.bytes = bytes;
  }

  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(): string {
    return '';
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
      bytes: this.bytes,
    };
  }
}
