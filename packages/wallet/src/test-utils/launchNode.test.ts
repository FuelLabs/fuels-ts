import { Provider } from '@fuel-ts/providers';

import { WalletUnlocked } from '../wallets';

import { launchNodeAndGetWallets } from './launchNode';

test('launchNodeAndGetWallets', async () => {
  const { stop, provider, wallets } = await launchNodeAndGetWallets({
    walletCount: 10,
    launchNodeOptions: {
      useSystemFuelCore: false,
    },
  });
  expect(provider).toBeInstanceOf(Provider);
  console.log(provider.url);
  expect(wallets.length).toBe(10);
  wallets.forEach((wallet) => {
    expect(wallet).toBeInstanceOf(WalletUnlocked);
  });
  stop();
});
