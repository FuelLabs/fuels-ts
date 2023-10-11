import { BaseAssetId } from '@fuel-ts/address/configs';
import { toHex } from '@fuel-ts/math';
import type { Provider, ProviderOptions } from '@fuel-ts/providers';

import type { LaunchNodeOptions } from '../test-utils';
import { WalletUnlocked } from '../wallets';

import { defaultChainConfig } from './defaultChainConfig';
import { setupTestProvider } from './setup-test-provider';

interface ChainConfigCoin {
  owner: string;
  asset_id: string;
  amount: string;
}
interface ChainConfig {
  coins: ChainConfigCoin[];
}

export class WalletConfig {
  public coins: ChainConfig['coins'];
  public wallets: WalletUnlocked[];

  /**
   *
   */
  constructor(numWallets: number, coinsPerAsset: number, amountPerCoin: number) {
    const wallets: WalletUnlocked[] = [];
    for (let index = 0; index < numWallets; index++) {
      // @ts-expect-error will be updated later
      wallets.push(WalletUnlocked.generate({ provider: null }));
    }

    this.wallets = wallets;

    this.coins = WalletConfig.createAssets(wallets, coinsPerAsset, amountPerCoin);
  }

  public static default() {
    return new WalletConfig(1, 1, 10000);
  }

  static createAssets(wallets: WalletUnlocked[], coinsPerAsset: number, amountPerCoin: number) {
    const coins: ChainConfig['coins'] = [];

    wallets
      .map((wallet) => wallet.address.toHexString())
      .forEach((walletAddress) => {
        for (let index = 0; index < coinsPerAsset; index++) {
          coins.push({
            amount: toHex(amountPerCoin),
            asset_id: index === 0 ? BaseAssetId : '',
            owner: walletAddress,
          });
        }
      });

    return coins;
  }
}

interface Options {
  walletConfig: WalletConfig;
  providerOptions: ProviderOptions;
  nodeOptions: Omit<LaunchNodeOptions, 'chainConfigPath' | 'chainConfig'>;
}

export async function launchCustomProviderAndGetWallets({
  walletConfig = WalletConfig.default(),
  providerOptions,
  nodeOptions,
}: Partial<Options> = {}): Promise<{ wallets: WalletUnlocked[]; provider: Provider } & Disposable> {
  const { wallets, coins } = walletConfig;

  const chainConfig = structuredClone(defaultChainConfig);

  chainConfig.initial_state = {
    ...chainConfig.initial_state,
    coins,
  };

  const { provider, cleanup } = await setupTestProvider(
    {
      providerOptions,
      nodeOptions: {
        ...nodeOptions,
        chainConfig,
      },
    },
    false
  );

  for (const wallet of wallets) {
    wallet.provider = provider;
  }

  return {
    wallets,
    provider,
    [Symbol.dispose]: () => cleanup(),
  };
}
