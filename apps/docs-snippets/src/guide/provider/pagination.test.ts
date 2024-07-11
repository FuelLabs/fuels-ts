import type { GqlPageInfo } from '@fuel-ts/account/dist/providers/__generated__/operations';
import type { CursorPaginationArgs } from 'fuels';
import { FUEL_NETWORK_URL, Provider, Wallet } from 'fuels';

/**
 * @group node
 */
describe('querying the chain', () => {
  it('pagination snippet test 1', () => {
    // #region pagination-1
    const paginationArgs: CursorPaginationArgs = {
      after: 'cursor',
      first: 10,
      before: 'cursor',
      last: 10,
    };
    // #endregion pagination-1

    // #region pagination-2
    const pageInfo: GqlPageInfo = {
      endCursor: 'cursor',
      hasNextPage: true,
      startCursor: 'cursor',
      hasPreviousPage: true,
    };
    // #endregion pagination-2

    expect(paginationArgs).toBeDefined();
    expect(pageInfo).toBeDefined();
  });

  it('pagination snippet test 2', async () => {
    // #region pagination-3
    // #import { Provider, CursorPaginationArgs, FUEL_NETWORK_URL, Wallet };

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const baseAssetId = provider.getBaseAssetId();
    const myWallet = Wallet.generate({ provider });

    let paginationArgs: CursorPaginationArgs = {
      first: 10, // It will return only the first 10 coins
    };

    const { coins, pageInfo } = await provider.getCoins(
      myWallet.address,
      baseAssetId,
      paginationArgs
    );

    if (pageInfo.hasNextPage) {
      paginationArgs = {
        after: pageInfo.endCursor,
        first: 10,
      };
      // The coins array will include the next 10 coins after the last one in the previous array
      await provider.getCoins(myWallet.address, baseAssetId, paginationArgs);
    }
    // #endregion pagination-3

    // #region pagination-4
    if (pageInfo.hasPreviousPage) {
      paginationArgs = {
        before: pageInfo.startCursor,
        last: 10,
      };

      // It will includes the previous 10 coins before the first one in the previous array
      await provider.getCoins(myWallet.address, baseAssetId, paginationArgs);
    }
    // #endregion pagination-4

    expect(paginationArgs).toBeDefined();
    expect(coins).toBeDefined();
    expect(pageInfo).toBeDefined();
  });

  it('pagination snippet test 3', () => {
    // #region pagination-5
    const paginationArgs = { after: 'cursor', first: 10 };
    // #endregion pagination-5

    expect(paginationArgs).toBeDefined();
  });
  it('pagination snippet test 4', () => {
    // #region pagination-6
    const paginationArgs = { before: 'cursor', last: 10 };
    // #endregion pagination-6

    expect(paginationArgs).toBeDefined();
  });

  it('pagination snippet test 5', async () => {
    // #region pagination-7
    // #import { Provider, FUEL_NETWORK_URL, Wallet };

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const myWallet = Wallet.generate({ provider });

    // It will return the first 100 coins of the base asset
    const { coins, pageInfo } = await provider.getCoins(myWallet.address);
    // #endregion pagination-7

    expect(coins).toBeDefined();
    expect(pageInfo).toBeDefined();
  });
});
