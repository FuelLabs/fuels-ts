import type { GqlPageInfo } from '@fuel-ts/account/dist/providers/__generated__/operations';
import type { CursorPaginationArgs } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
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
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [myWallet],
    } = launched;

    // #region pagination-3

    let paginationArgs: CursorPaginationArgs = {
      first: 10, // It will return only the first 10 coins
    };

    const { coins, pageInfo } = await provider.getCoins(
      myWallet.address,
      provider.getBaseAssetId(),
      paginationArgs
    );

    if (pageInfo.hasNextPage) {
      paginationArgs = {
        after: pageInfo.endCursor,
        first: 10,
      };
      // The coins array will include the next 10 coins after the last one in the previous array
      await provider.getCoins(myWallet.address, provider.getBaseAssetId(), paginationArgs);
    }
    // #endregion pagination-3

    // #region pagination-4
    if (pageInfo.hasPreviousPage) {
      paginationArgs = {
        before: pageInfo.startCursor,
        last: 10,
      };

      // It will includes the previous 10 coins before the first one in the previous array
      await provider.getCoins(myWallet.address, provider.getBaseAssetId(), paginationArgs);
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
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [myWallet],
    } = launched;
    // #region pagination-7

    // It will return the first 100 coins of the base asset
    const { coins, pageInfo } = await provider.getCoins(myWallet.address);
    // #endregion pagination-7

    expect(coins).toBeDefined();
    expect(pageInfo).toBeDefined();
  });
});
