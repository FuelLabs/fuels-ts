import { bn } from '@fuel-ts/math';

import { Wallet } from './wallet';
import type { WalletUnlocked } from './wallets';

/*
 * @group common/e2e
 */
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

  it('getCoins()', async () => {
    const walletLocked = Wallet.fromAddress(
      '0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db'
    );
    const coins = await walletLocked.getCoins();
    const assetA = coins.find((c) => c.assetId === assets[0]);
    expect(assetA?.amount.gt(1)).toBeTruthy();
    const assetB = coins.find((c) => c.assetId === assets[1]);
    expect(assetB?.amount.gt(1)).toBeTruthy();
    const assetC = coins.find((c) => c.assetId === assets[2]);
    expect(assetC?.amount.gt(1)).toBeTruthy();
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
    const balances = await walletLocked.getBalances();
    expect(balances.length).toBeGreaterThanOrEqual(1);
  });
});
