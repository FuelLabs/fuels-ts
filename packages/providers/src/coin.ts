import type { BigNumber } from '@ethersproject/bignumber';

import { GqlCoinStatus as CoinStatus } from './__generated__/operations';

/**
 * A Fuel coin
 */
export type Coin = {
  id: string;
  assetId: string;
  amount: BigNumber;
  owner: string;
  status: CoinStatus;
  maturity: BigNumber;
  blockCreated: BigNumber;
};

export { CoinStatus };
