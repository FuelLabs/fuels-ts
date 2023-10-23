import { BaseAssetId } from '@fuel-ts/address/configs';
import { toHex } from '@fuel-ts/math';
import { Provider } from '@fuel-ts/providers';
import { launchTestNode } from '@fuel-ts/providers/test-utils';
import type { LaunchTestNodeOptions, ChainConfig } from '@fuel-ts/providers/test-utils';
import { Signer } from '@fuel-ts/signer';
import { hexlify } from 'ethers';
import { readFile } from 'fs/promises';

import type { WalletUnlocked } from '../wallets';

import { defaultChainConfig } from './defaultChainConfig';
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
  stop: () => void;
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
  launchNodeOptions?: Partial<LaunchTestNodeOptions> & {
    chainConfigPath?: string;
  };
  walletCount?: number;
} = {}): LaunchNodeAndGetWalletsResult => {
  let config: ChainConfig;

  if (!launchNodeOptions?.chainConfigPath) {
    config = defaultChainConfig as unknown as ChainConfig;

    // If there's no genesis key, generate one and some coins to the genesis block.
    if (!process.env.GENESIS_SECRET) {
      const pk = Signer.generatePrivateKey();
      const signer = new Signer(pk);
      process.env.GENESIS_SECRET = hexlify(pk);

      config = {
        ...config,
        initial_state: {
          ...defaultChainConfig.initial_state,
          coins: [
            ...defaultChainConfig.initial_state.coins,
            {
              owner: signer.address.toHexString(),
              amount: toHex(1_000_000_000),
              asset_id: BaseAssetId,
            },
          ],
        },
      };
    }
  } else {
    config = JSON.parse(await readFile(launchNodeOptions.chainConfigPath, 'utf-8')) as ChainConfig;
  }

  const { cleanup, ip, port } = await launchTestNode({ ...launchNodeOptions, chainConfig: config });

  const provider = await Provider.create(`http://${ip}:${port}/graphql`);
  const wallets = await generateWallets(walletCount, provider);

  return { wallets, stop: cleanup, provider };
};
