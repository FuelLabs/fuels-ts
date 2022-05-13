import { GqlCoinStatus as CoinStatus } from './__generated__/operations';

/**
 * A Fuel coin
 */
export type Coin = {
  id: string;
  assetId: string;
  amount: bigint;
  owner: string;
  status: CoinStatus;
  maturity: bigint;
  blockCreated: bigint;
};

export { CoinStatus };
