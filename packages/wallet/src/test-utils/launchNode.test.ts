import { Provider } from '@fuel-ts/providers';

import { WalletUnlocked } from '../wallets';

import { launchNodeAndGetWallets } from './launchNode';

test('launchNodeAndGetWallets - empty config', async () => {
  const { stop, provider, wallets } = await launchNodeAndGetWallets();
  expect(provider).toBeInstanceOf(Provider);
  expect(wallets.length).toBe(10);
  wallets.forEach((wallet) => {
    expect(wallet).toBeInstanceOf(WalletUnlocked);
  });
  stop();
});

test('launchNodeAndGetWallets - custom walletCount', async () => {
  const { stop, wallets } = await launchNodeAndGetWallets({
    walletCount: 5,
  });
  expect(wallets.length).toBe(5);
  wallets.forEach((wallet) => {
    expect(wallet).toBeInstanceOf(WalletUnlocked);
  });
  stop();
});

describe('without a GENESIS_SECRET', () => {
  let GENESIS_SECRET: string | undefined;

  beforeAll(() => {
    GENESIS_SECRET = process.env.GENESIS_SECRET;
    delete process.env.GENESIS_SECRET;
  });

  afterAll(() => {
    process.env.GENESIS_SECRET = GENESIS_SECRET;
  });

  test('launchNodeAndGetWallets - empty config', async () => {
    const { stop, provider, wallets } = await launchNodeAndGetWallets();
    expect(provider).toBeInstanceOf(Provider);
    expect(wallets.length).toBe(10);
    wallets.forEach((wallet) => {
      expect(wallet).toBeInstanceOf(WalletUnlocked);
    });
    stop();
  });
})
