import { BaseAssetId } from '@fuel-ts/address/configs';
import { Provider } from '@fuel-ts/providers';
import type { LaunchNodeOptions } from '@fuel-ts/utils/test-utils';
import { launchNode } from '@fuel-ts/utils/test-utils';

import type { WalletUnlocked } from '../wallets';

import { generateTestWallet } from './generateTestWallet';

const generateWallets = async (count: number, provider: Provider) => {
  const wallets: WalletUnlocked[] = [];
  for (let i = 0; i < count; i += 1) {
    const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);
    wallets.push(wallet);
  }
  return wallets;
};

export type LaunchNodeAndGetWalletsResult = Promise<{
  wallets: WalletUnlocked[];
  stop: () => Promise<void>;
  provider: Provider;
}>;

/**
 * Launches a fuel-core node and returns a provider, 10 wallets, and a cleanup function to stop the node.
 * @param launchNodeOptions - options to launch the fuel-core node with.
 * @param walletCount - the number of wallets to generate. (optional, defaults to 10)
 * */
export const launchNodeAndGetWallets = async ({
  launchNodeOptions,
  walletCount = 10,
}: {
  launchNodeOptions?: Partial<LaunchNodeOptions>;
  walletCount?: number;
} = {}): LaunchNodeAndGetWalletsResult => {
  const defaultNodeOptions: LaunchNodeOptions = {
    chainConfigPath: launchNodeOptions?.chainConfigPath,
    consensusKey: launchNodeOptions?.consensusKey,
  };

  const { cleanup, ip, port } = await launchNode({ ...defaultNodeOptions, ...launchNodeOptions });

  const provider = await Provider.create(`http://${ip}:${port}/graphql`);
  const wallets = await generateWallets(walletCount, provider);

  return { wallets, stop: cleanup, provider };
};
