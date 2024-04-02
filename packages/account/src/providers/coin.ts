import type { AbstractAddress, BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

import type { TransactionRequest } from './transaction-request';

/**
 * A Fuel coin
 */
export type Coin = {
  id: string;
  assetId: string;
  amount: BN;
  owner: AbstractAddress;
  blockCreated: BN;
  txCreatedIdx: BN;
  predicate?: BytesLike;
  predicateData?: BytesLike;
  populatePredicateData?: (tx: TransactionRequest) => unknown;
};
