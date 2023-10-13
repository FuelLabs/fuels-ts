import { BaseAssetId } from '@fuel-ts/address/configs';
import { safeExec } from '@fuel-ts/errors/test-utils';
import { Provider } from '@fuel-ts/providers';

import { launchCustomProviderAndGetWallets } from './launch-custom-provider-and-get-wallets';
import { WalletConfig } from './wallet-config';

describe('launchCustomProviderAndGetWallets', () => {
  it('kills the node after going out of scope', async () => {
    let url = '';

    {
      await using providerAndWallets = await launchCustomProviderAndGetWallets();
      const { provider } = providerAndWallets;
      url = provider.url;
      await provider.getBlockNumber();
    }

    const { error } = await safeExec(async () => {
      const p = await Provider.create(url);
      await p.getBlockNumber();
    });

    const expectedError = {
      message: 'fetch failed',
    };

    expect(error).toMatchObject(expectedError);
  });

  it('default: two wallets, one asset (BaseAssetId), one coin, 1_000_000_00 amount', async () => {
    await using providerAndWallets = await launchCustomProviderAndGetWallets();
    const { wallets } = providerAndWallets;

    expect(wallets.length).toBe(2);

    const promises = wallets.map(async (wallet) => {
      const coins = await wallet.getCoins();
      expect(coins.length).toBe(1);

      const coin = coins[0];

      expect(coin.assetId).toBe(BaseAssetId);
      expect(coin.amount.toNumber()).toBe(1_000_000_00);
    });

    await Promise.all(promises);
  });

  it('can return multiple wallets with multiple assets, coins and amounts', async () => {
    const numOfWallets = 3;
    const numberOfAssets = 5;
    const coinsPerAsset = 10;
    const amountPerCoin = 15;

    await using providerAndWallets = await launchCustomProviderAndGetWallets({
      walletConfig: new WalletConfig(numOfWallets, numberOfAssets, coinsPerAsset, amountPerCoin),
    });
    const { wallets } = providerAndWallets;

    expect(wallets.length).toBe(numOfWallets);

    const promises = wallets.map(async (wallet) => {
      const coins = await wallet.getCoins();
      expect(coins.length).toBe(numberOfAssets * coinsPerAsset);

      coins.forEach((coin, index) => {
        if (index < coinsPerAsset) expect(coin.assetId).toBe(BaseAssetId);
        else {
          expect(coin.assetId).not.toBe(BaseAssetId);
          expect(coin.assetId).not.toBeFalsy();
        }
        expect(coin.amount.toNumber()).toBe(amountPerCoin);
      });
    });

    await Promise.all(promises);
  });
});
