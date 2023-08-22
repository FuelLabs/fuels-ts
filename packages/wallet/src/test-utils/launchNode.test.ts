import { Provider } from '@fuel-ts/providers';

import { WalletUnlocked } from '../wallets';

import { launchNodeAndGetWallets } from './launchNode';

/**
 * This test is skipped because it requires fuel-core to be installed.
 * TODO: Figure out a way to run this test using pnpm fuels-core in CI.
 */
test('launchNodeAndGetWallets', async () => {
  const { stop, provider, wallets } = await launchNodeAndGetWallets({
    walletCount: 10,
  });
  expect(provider).toBeInstanceOf(Provider);
  expect(wallets.length).toBe(10);
  wallets.forEach((wallet) => {
    expect(wallet).toBeInstanceOf(WalletUnlocked);
  });
  stop();
});
