import type { Provider } from '@fuel-ts/providers';
import { setupTestProvider } from '@fuel-ts/providers/test-utils';
import type { SetupTestProviderOptions } from '@fuel-ts/providers/test-utils';

import type { WalletUnlocked } from '../wallets';

import { WalletConfig } from './wallet-config';

interface ChainConfigCoin {
  owner: string;
  asset_id: string;
  amount: string;
}
export interface ChainConfig {
  coins: ChainConfigCoin[];
}

export interface LaunchCustomProviderAndGetWalletsOptions extends SetupTestProviderOptions {
  walletConfig: WalletConfig;
}

export async function launchCustomProviderAndGetWallets<
  Dispose extends boolean = true,
  ReturnType = {
    wallets: WalletUnlocked[];
    provider: Provider;
  } & (Dispose extends true ? AsyncDisposable : { cleanup: () => Promise<void> }),
>(
  {
    walletConfig = new WalletConfig(),
    providerOptions,
    nodeOptions,
  }: Partial<LaunchCustomProviderAndGetWalletsOptions> = {},
  dispose?: Dispose
): Promise<ReturnType> {
  const { wallets, coins } = walletConfig;

  const chainConfig = {
    ...nodeOptions?.chainConfig,
    initial_state: {
      ...nodeOptions?.chainConfig?.initial_state,
      coins: coins.concat(nodeOptions?.chainConfig?.initial_state?.coins || []),
    },
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

  wallets.forEach((wallet) => {
    wallet.connect(provider);
  });

  return (
    dispose ?? true
      ? {
          wallets,
          provider,
          [Symbol.asyncDispose]: cleanup,
        }
      : {
          wallets,
          provider,
          cleanup,
        }
  ) as ReturnType;
}
