import { BaseAssetId } from '@fuel-ts/address/configs';
import { safeExec } from '@fuel-ts/errors/test-utils';
import { toHex, toNumber } from '@fuel-ts/math';
import { Provider } from '@fuel-ts/providers';
import { Signer } from '@fuel-ts/signer';
import { WalletUnlocked } from '../wallets';

import { AssetId } from './asset-id';
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

    expect(error).toMatchObject({
      code: 'ECONNREFUSED',
    });
  });

  it('default: two wallets, three assets (BaseAssetId, AssetId.A, AssetId.B), one coin, 1_000_000_00 amount', async () => {
    await using providerAndWallets = await launchCustomProviderAndGetWallets();
    const { wallets } = providerAndWallets;

    expect(wallets.length).toBe(2);
    const [wallet1, wallet2] = wallets;
    const coins1 = await wallet1.getCoins();
    const coins2 = await wallet2.getCoins();

    expect(coins1.length).toBe(3);
    expect(coins1.map((x) => (x.amount, x.assetId))).toEqual(
      coins2.map((x) => (x.amount, x.assetId))
    );

    const baseAssetIdCoin = coins1.find((x) => x.assetId === AssetId.BaseAssetId.value)!;

    expect(baseAssetIdCoin.assetId).toBe(BaseAssetId);
    expect(baseAssetIdCoin.amount.toNumber()).toBe(10_000_000_000);

    const assetACoin = coins1.find((x) => x.assetId === AssetId.A.value)!;
    expect(assetACoin.amount.toNumber()).toBe(10_000_000_000);

    const assetBCoin = coins1.find((x) => x.assetId === AssetId.B.value)!;
    expect(assetBCoin.amount.toNumber()).toBe(10_000_000_000);
  });

  it('can be given custom wallet and asset id', async () => {
    // @ts-expect-error will be updated in launchCustomProviderAndGetWallets
    const wallet = WalletUnlocked.generate({ provider: null });
    const assetId = AssetId.random();
    await using providerAndWallets = await launchCustomProviderAndGetWallets({
      walletConfig: new WalletConfig({ wallets: [wallet], assets: [assetId] }),
    });

    const { wallets } = providerAndWallets;

    expect(wallets.length).toBe(1);
    expect(wallets[0]).toBe(wallet);

    const coins = await wallet.getCoins();
    expect(coins.length).toBe(2);

    expect(coins.find((x) => x.assetId === AssetId.BaseAssetId.value)).not.toBeUndefined();
    expect(coins.find((x) => x.assetId === assetId.value)).not.toBeUndefined();
  });

  it('can return multiple wallets with multiple assets, coins and amounts', async () => {
    const numWallets = 3;
    const numOfAssets = 5;
    const coinsPerAsset = 10;
    const amountPerCoin = 15;

    await using providerAndWallets = await launchCustomProviderAndGetWallets({
      walletConfig: new WalletConfig({
        wallets: numWallets,
        assets: numOfAssets,
        coinsPerAsset,
        amountPerCoin,
      }),
    });
    const { wallets } = providerAndWallets;

    expect(wallets.length).toBe(numWallets);

    const promises = wallets.map(async (wallet) => {
      const coins = await wallet.getCoins();
      expect(coins.length).toBe(numOfAssets * coinsPerAsset);

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

  test("gives control to add additional custom coins/messages to the genesis block without overriding walletConfig's settings", async () => {
    const pk = Signer.generatePrivateKey();
    const signer = new Signer(pk);
    const address = signer.address.toHexString();

    const coin = { owner: address, amount: toHex(100, 8), asset_id: BaseAssetId };
    const message = {
      sender: '0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f',
      recipient: address,
      nonce: '0x0101010101010101010101010101010101010101010101010101010101010101',
      amount: toHex(200, 8),
      data: '02',
      da_height: '0x00',
    };

    await using providerAndWallets = await launchCustomProviderAndGetWallets({
      nodeOptions: {
        chainConfig: {
          initial_state: {
            coins: [coin],
            messages: [message],
          },
        },
      },
    });
    const { wallets, provider } = providerAndWallets;

    const customWallet = new WalletUnlocked(pk, provider);
    const [customWalletCoin] = await customWallet.getCoins();
    const [customWalletMessage] = await customWallet.getMessages();

    expect(customWalletCoin.amount.toHex(8)).toEqual(coin.amount);
    expect(customWalletCoin.owner.toB256()).toEqual(coin.owner);
    expect(customWalletCoin.assetId).toEqual(coin.asset_id);

    expect(customWalletMessage.amount.toHex(8)).toEqual(message.amount);
    expect(customWalletMessage.recipient.toB256()).toEqual(message.recipient);
    expect(customWalletMessage.sender.toB256()).toEqual(message.sender);
    expect(toNumber(customWalletMessage.daHeight)).toEqual(toNumber(message.da_height));
    expect(customWalletMessage.data.toString()).toEqual(toNumber(message.data).toString());
    expect(customWalletMessage.nonce).toEqual(message.nonce);

    const [wallet] = wallets;
    expect(wallets.length).toBe(2);

    const coins = await wallet.getCoins();
    expect(coins.length).toBe(3);
    const messages = await wallet.getMessages();
    expect(messages.length).toBe(0);
  });
});
