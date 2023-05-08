import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

/**
 * A Fuel coin
 */
export type Coin = {
  id: string;
  assetId: string;
  amount: BN;
  owner: AbstractAddress;
  maturity: number;
  blockCreated: BN;
  txCreatedIdx: BN;
};
