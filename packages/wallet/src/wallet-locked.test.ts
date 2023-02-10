import { bn } from '@fuel-ts/math';

import { Wallet } from './wallet';
import type { WalletUnlocked } from './wallets';

describe('WalletLocked', () => {
  let wallet: WalletUnlocked;
  const assets = [
    '0x0101010101010101010101010101010101010101010101010101010101010101',
    '0x0202020202020202020202020202020202020202020202020202020202020202',
    '0x0000000000000000000000000000000000000000000000000000000000000000',
  ];

  beforeAll(() => {
    wallet = Wallet.generate();
  });

  it('Create wallet using a address', async () => {
    const walletLocked = Wallet.fromAddress(wallet.address);

    expect(walletLocked.address).toEqual(wallet.address);
  });

  it('should properly get all wallet coins', async () => {
    const walletLocked = Wallet.fromAddress(
      '0xd3ab9ddb6a4988bc13e9bde01400f12955e021cea921737f0f55eb25d1bee1ff'
    );

    // all 5 coins
    const { coins, pageInfo } = await walletLocked.getCoins();

    expect(coins.length).toBe(5);
    expect(pageInfo.hasNextPage).toBeFalsy();
    expect(pageInfo.hasPreviousPage).toBeFalsy();

    // first 2 coins
    let res = await walletLocked.getCoins({
      pageArgs: {
        first: 2,
      },
    });

    expect(res.coins.length).toBe(2);
    expect(res.pageInfo.hasNextPage).toBeTruthy();
    expect(res.pageInfo.hasPreviousPage).toBeFalsy();
    expect(res.pageInfo.startCursor).toEqual(coins[0].id);
    expect(res.pageInfo.endCursor).toEqual(coins[1].id);

    // last 3 coins
    res = await walletLocked.getCoins({
      pageArgs: {
        first: 10,
        after: res.pageInfo.endCursor,
      },
    });

    expect(res.pageInfo.hasNextPage).toBeFalsy();
    expect(res.pageInfo.hasPreviousPage).toBeTruthy();
    expect(res.pageInfo.startCursor).toEqual(coins[2].id);
    expect(res.pageInfo.endCursor).toEqual(coins[4].id);

    // 3th and 4h coins moving backwards
    res = await walletLocked.getCoins({
      pageArgs: {
        last: 2,
        before: res.pageInfo.endCursor,
      },
    });

    expect(res.pageInfo.hasNextPage).toBeTruthy();
    expect(res.pageInfo.hasPreviousPage).toBeTruthy();
    expect(res.pageInfo.startCursor).toEqual(coins[2].id);
    expect(res.pageInfo.endCursor).toEqual(coins[3].id);

    // first 2 coins moving backwards
    res = await walletLocked.getCoins({
      pageArgs: {
        last: 10,
        before: res.pageInfo.startCursor,
      },
    });

    expect(res.pageInfo.hasNextPage).toBeFalsy();
    expect(res.pageInfo.hasPreviousPage).toBeTruthy();
    expect(res.pageInfo.startCursor).toEqual(coins[0].id);
    expect(res.pageInfo.endCursor).toEqual(coins[1].id);
  });

  it('getResourcesToSpend()', async () => {
    // #region typedoc:Message-getResourcesToSpend
    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
    const resourcesToSpend = await walletLocked.getResourcesToSpend([
      {
        amount: bn(2),
        assetId: '0x0101010101010101010101010101010101010101010101010101010101010101',
      },
    ]);
    expect(resourcesToSpend[0].amount.gt(2)).toBeTruthy();
    // #endregion
  });

  it('getMessages()', async () => {
    const walletLocked = Wallet.fromAddress(
      '0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba'
    );
    const messages = await walletLocked.getMessages();
    expect(messages.length).toEqual(1);
  });

  it('getBalance()', async () => {
    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
    const balanceA = await walletLocked.getBalance(assets[0]);
    const balanceB = await walletLocked.getBalance(assets[1]);
    expect(balanceA.gte(1)).toBeTruthy();
    expect(balanceB.gte(1)).toBeTruthy();
  });

  it('getBalances()', async () => {
    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
    const { balances } = await walletLocked.getBalances();
    expect(balances.length).toBeGreaterThanOrEqual(1);
  });
});
