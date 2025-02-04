import { Provider } from 'fuels';
import type { CursorPaginationArgs, PageInfo } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_ADDRESS } from '../../../env';

// #region pagination-args
const paginationArgsExample: CursorPaginationArgs = {
  after: 'cursor',
  first: 10,
  before: 'cursor',
  last: 10,
};
// #endregion pagination-args
console.log('paginationArgsExample', paginationArgsExample);

// #region pagination-page-info
const pageInfoExample: PageInfo = {
  endCursor: 'cursor',
  hasNextPage: true,
  startCursor: 'cursor',
  hasPreviousPage: true,
};
// #endregion pagination-page-info
console.log('pageInfoExample', pageInfoExample);

// #region pagination-next-page
const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

let paginationArgs: CursorPaginationArgs = {
  first: 10, // It will return only the first 10 coins
};

const { coins, pageInfo } = await provider.getCoins(
  WALLET_ADDRESS,
  baseAssetId,
  paginationArgs
);

if (pageInfo.hasNextPage) {
  paginationArgs = {
    after: pageInfo.endCursor,
    first: 10,
  };
  // The coins array will include the next 10 coins after the last one in the previous array
  await provider.getCoins(WALLET_ADDRESS, baseAssetId, paginationArgs);
}
// #endregion pagination-next-page

// #region pagination-previous-page
if (pageInfo.hasPreviousPage) {
  paginationArgs = {
    before: pageInfo.startCursor,
    last: 10,
  };

  // It will includes the previous 10 coins before the first one in the previous array
  await provider.getCoins(WALLET_ADDRESS, baseAssetId, paginationArgs);
}
// #endregion pagination-previous-page

console.log('coins', coins);
console.log('pageInfo', pageInfo);

// #region pagination-forward-pagination
const paginationArgsForward: CursorPaginationArgs = {
  after: 'cursor',
  first: 10,
};
// #endregion pagination-forward-pagination
console.log('paginationArgsForward', paginationArgsForward);

// #region pagination-backward-pagination
const paginationArgsBackwards: CursorPaginationArgs = {
  before: 'cursor',
  last: 10,
};
// #endregion pagination-backward-pagination
console.log('paginationArgsBackwards', paginationArgsBackwards);

// #region pagination-default-args
// It will return the first 100 coins for a given wallet
await provider.getCoins(WALLET_ADDRESS);
// #endregion pagination-default-args
