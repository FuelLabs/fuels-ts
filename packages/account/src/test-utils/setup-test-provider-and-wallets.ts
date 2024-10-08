import { defaultSnapshotConfigs, type SnapshotConfigs } from '@fuel-ts/utils';
import { DEVNET_NETWORK_URL, TESTNET_NETWORK_URL } from '@internal/utils';
import { mergeDeepRight } from 'ramda';
import type { PartialDeep } from 'type-fest';

import type { ProviderOptions } from '../providers';
import { Provider } from '../providers';
import { Wallet, type WalletUnlocked } from '../wallet';

import type { LaunchNodeOptions } from './launchNode';
import { launchNode } from './launchNode';
import { TestAssetId } from './test-asset-id';
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
  launchNodeServerPort?: string;
}

const defaultWalletConfigOptions: WalletsConfigOptions = {
  count: 2,
  assets: [TestAssetId.A, TestAssetId.B],
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
  launchNodeServerPort = process.env.LAUNCH_NODE_SERVER_PORT || undefined,
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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const provider = await Provider.create(process.env.TESTING_NETWORK_URL!);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const wallet = Wallet.fromPrivateKey(process.env.TESTING_NETWORK_PVT_KEY!, provider);

  // console.log('Address', wallet.address.toB256());
  // console.log('Base asset id', provider.getBaseAssetId());
  // console.log(
  //   (await wallet.getBalances()).balances.map((b) => ({
  //     amount: b.amount.toString(),
  //     assetId: b.assetId,
  //   }))
  // );

  const wallets = [wallet, wallet, wallet, wallet, wallet];
  const cleanup = () => {};

  return {
    provider,
    wallets,
    cleanup,
    [Symbol.dispose]: cleanup,
  };
}
