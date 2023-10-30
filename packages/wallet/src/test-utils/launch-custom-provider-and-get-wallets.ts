import type { Provider } from '@fuel-ts/providers';
import { setupTestProvider } from '@fuel-ts/providers/test-utils';
import type { ChainConfig, SetupTestProviderOptions } from '@fuel-ts/providers/test-utils';

import type { WalletUnlocked } from '../wallets';

import { WalletConfig } from './wallet-config';

export interface LaunchCustomProviderAndGetWalletsOptions extends SetupTestProviderOptions {
  /** Configures the wallets that should exist in the genesis block of a the test node. */
  walletConfig: WalletConfig;
}

export async function launchCustomProviderAndGetWallets<
  Dispose extends boolean = true,
  ReturnType = {
    wallets: WalletUnlocked[];
    provider: Provider;
  } & (Dispose extends true
    ? AsyncDisposable
    : {
        cleanup: () => Promise<void>;
        deployedChainConfig: ChainConfig;
      }),
>(
  {
    walletConfig = new WalletConfig(),
    providerOptions = {},
    nodeOptions = {},
  }: Partial<LaunchCustomProviderAndGetWalletsOptions> = {},
  dispose?: Dispose
): Promise<ReturnType> {
  const { wallets } = walletConfig;

  const customChainConfig = walletConfig.apply(nodeOptions.chainConfig);

  const { provider, cleanup, chainConfig } = await setupTestProvider(
    {
      providerOptions,
      nodeOptions: {
        ...nodeOptions,
        chainConfig: customChainConfig,
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
          deployedChainConfig: chainConfig,
        }
  ) as ReturnType;
}
