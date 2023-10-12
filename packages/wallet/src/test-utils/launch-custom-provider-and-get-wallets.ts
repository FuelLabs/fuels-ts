import type { Provider } from '@fuel-ts/providers';
import { setupTestProvider } from '@fuel-ts/providers/test-utils';
import type { SetupTestProviderOptions } from '@fuel-ts/providers/test-utils';

import type { WalletUnlocked } from '../wallets';

import { defaultChainConfig } from './defaultChainConfig';
import { WalletConfig } from './wallet-config';

interface ChainConfigCoin {
  owner: string;
  asset_id: string;
  amount: string;
}
export interface ChainConfig {
  coins: ChainConfigCoin[];
}

interface Options extends SetupTestProviderOptions {
  walletConfig: WalletConfig;
}

export async function launchCustomProviderAndGetWallets<
  Dispose extends boolean = true,
  R = {
    wallets: WalletUnlocked[];
    provider: Provider;
  },
  ReturnType = Dispose extends true ? R & AsyncDisposable : R & { cleanup: () => Promise<void> },
>(
  { walletConfig = WalletConfig.default(), providerOptions, nodeOptions }: Partial<Options> = {},
  runCleanup?: Dispose
): Promise<ReturnType> {
  const { wallets, coins } = walletConfig;

  const chainConfig = structuredClone(defaultChainConfig);

  chainConfig.initial_state = {
    ...chainConfig.initial_state,
    coins,
    messages: [],
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
    // eslint-disable-next-line no-param-reassign
    wallet.provider = provider;
  });

  const dispose = runCleanup ?? true;

  // @ts-expect-error whaa
  return dispose
    ? {
        wallets,
        provider,
        [Symbol.asyncDispose]: cleanup,
      }
    : {
        wallets,
        provider,
        cleanup,
      };
}
