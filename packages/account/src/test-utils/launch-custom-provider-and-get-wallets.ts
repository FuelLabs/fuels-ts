import type { Provider } from '../providers';
import type { WalletUnlocked } from '../wallet';

import { type SetupTestProviderOptions, setupTestProvider } from './setup-test-provider';
import { WalletConfig } from './wallet-config';

export interface LaunchCustomProviderAndGetWalletsOptions extends SetupTestProviderOptions {
  /** Configures the wallets that should exist in the genesis block of a node. */
  walletConfig: WalletConfig;
}

export async function launchCustomProviderAndGetWallets<
  Dispose extends boolean = true,
  ReturnType = {
    wallets: WalletUnlocked[];
    provider: Provider;
  } & (Dispose extends true ? Disposable : { cleanup: () => Promise<void> }),
>(
  {
    walletConfig = new WalletConfig(),
    providerOptions,
    nodeOptions = {},
  }: Partial<LaunchCustomProviderAndGetWalletsOptions> = {},
  dispose?: Dispose
): Promise<ReturnType> {
  const wallets = walletConfig.wallets;

  const chainConfig = walletConfig.apply(nodeOptions.chainConfig);

  const { provider, cleanup } = await setupTestProvider(
    {
      providerOptions,
      nodeOptions: {
        ...nodeOptions,
        chainConfig,
        loggingEnabled: false, // Disable logging for tests.
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
          [Symbol.dispose]: cleanup,
        }
      : {
          wallets,
          provider,
          cleanup,
        }
  ) as ReturnType;
}
