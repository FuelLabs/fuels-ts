import type { Address } from '@fuel-ts/address';
import type { BN } from '@fuel-ts/math';
import type { BytesLike } from '@fuel-ts/utils';

/**
 * A Fuel coin
 */
export type Coin = {
  id: string;
  assetId: string;
  amount: BN;
  owner: Address;
  blockCreated: BN;
  txCreatedIdx: BN;
  predicate?: BytesLike;
  predicateData?: BytesLike;
};
