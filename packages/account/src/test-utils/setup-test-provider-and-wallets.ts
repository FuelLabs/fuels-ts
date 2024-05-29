import { defaultSnapshotConfigs, type SnapshotConfigs } from '@fuel-ts/utils';
import { mergeDeepRight } from 'ramda';
import type { PartialDeep } from 'type-fest';

import type { ProviderOptions } from '../providers';
import { Provider } from '../providers';
import type { WalletUnlocked } from '../wallet';

import { AssetId } from './asset-id';
import type { LaunchNodeOptions } from './launchNode';
import { launchNode } from './launchNode';
import type { WalletsConfigOptions } from './wallet-config';
import { WalletsConfig } from './wallet-config';

export interface LaunchCustomProviderAndGetWalletsOptions {
  /** Configures the wallets that should exist in the genesis block of the `fuel-core` node. */
  walletsConfig?: Partial<WalletsConfigOptions>;
  /** Options for configuring the provider. */
  providerOptions?: Partial<ProviderOptions>;
  /** Options for configuring the test node. */
  nodeOptions?: Partial<
    Omit<LaunchNodeOptions, 'snapshotConfig'> & {
      snapshotConfig: PartialDeep<SnapshotConfigs>;
    }
  >;
}

const defaultWalletConfigOptions: WalletsConfigOptions = {
  count: 2,
  assets: [AssetId.A, AssetId.B],
  coinsPerAsset: 1,
  amountPerCoin: 10_000_000_000,
  messages: [],
};

export interface SetupTestProviderAndWalletsReturn extends Disposable {
  wallets: WalletUnlocked[];
  provider: Provider;
  cleanup: () => void;
}

/**
 * Launches a test node and creates wallets for testing.
 * If initialized with the `using` keyword, the node will be killed when it goes out of scope.
 * If initialized with `const`, manual disposal of the node must be done via the `cleanup` function.
 *
 * @param options - Options for configuring the wallets, provider, and test node.
 * @returns The wallets, provider and cleanup function that kills the node.
 *
 */
export async function setupTestProviderAndWallets({
  walletsConfig: walletsConfigOptions = {},
  providerOptions,
  nodeOptions = {},
}: Partial<LaunchCustomProviderAndGetWalletsOptions> = {}): Promise<SetupTestProviderAndWalletsReturn> {
  // @ts-expect-error this is a polyfill (see https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management)
  Symbol.dispose ??= Symbol('Symbol.dispose');
  const walletsConfig = new WalletsConfig(
    nodeOptions.snapshotConfig?.chainConfig?.consensus_parameters?.V1?.base_asset_id ??
      defaultSnapshotConfigs.chainConfig.consensus_parameters.V1.base_asset_id,
    {
      ...defaultWalletConfigOptions,
      ...walletsConfigOptions,
    }
  );

  const { cleanup, url } = await launchNode({
    loggingEnabled: false,
    ...nodeOptions,
    snapshotConfig: mergeDeepRight(
      defaultSnapshotConfigs,
      walletsConfig.apply(nodeOptions?.snapshotConfig)
    ),
    port: '0',
  });

  let provider: Provider;

  try {
    provider = await Provider.create(url, providerOptions);
  } catch (err) {
    cleanup();
    throw err;
  }

  const wallets = walletsConfig.wallets;
  wallets.forEach((wallet) => {
    wallet.connect(provider);
  });

  return {
    provider,
    wallets,
    cleanup,
    [Symbol.dispose]: cleanup,
  };
}
