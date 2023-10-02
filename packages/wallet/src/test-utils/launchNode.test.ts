import { Provider } from '@fuel-ts/providers';

import { WalletUnlocked } from '../wallets';

import { launchNodeAndGetWallets } from './launchNode';

/**
 * @group browser
 * @group node
 */
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
