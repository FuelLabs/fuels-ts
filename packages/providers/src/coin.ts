import { GqlCoinStatus as CoinStatus } from './__generated__/operations';

/**
 * A Fuel coin
 */
export type Coin = {
  id: string;
  assetId: string;
  amount: string;
  owner: string;
  status: CoinStatus;
  maturity: string;
  blockCreated: string;
};

export { CoinStatus };
