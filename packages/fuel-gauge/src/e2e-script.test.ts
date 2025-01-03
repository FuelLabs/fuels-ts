/* eslint-disable no-console */
import { DEVNET_NETWORK_URL, TESTNET_NETWORK_URL } from '@internal/utils';
import { WalletUnlocked, Provider, TransactionType, CHAIN_IDS, rawAssets, assets, bn } from 'fuels';

import { ScriptMainArgBool } from '../test/typegen';

enum Networks {
  DEVNET = 'devnet',
  TESTNET = 'testnet',
}

type ConfiguredNetwork = {
  networkUrl: string;
  privateKey?: string;
  faucetUrl: string;
  txIds?: {
    [TransactionType.Mint]: string;
    [TransactionType.Upgrade]: string;
    [TransactionType.Upload]: string;
  };
};

const configuredNetworks = {
  [Networks.DEVNET]: {
    networkUrl: DEVNET_NETWORK_URL,
    privateKey: process.env.DEVNET_WALLET_PVT_KEY,
    faucetUrl: `https://faucet-devnet.fuel.network/`,
    txIds: {
      [TransactionType.Upgrade]:
        '0xe2c03044fe708e9b112027881baf9f892e6b64a630a629998922c1cab918c094',
      [TransactionType.Upload]:
        '0x94bc2a189b8211796c8fe5b9c6b67624fe97d2007e104bf1b30739944f43bd73',
    },
  } as ConfiguredNetwork,
  [Networks.TESTNET]: {
    networkUrl: TESTNET_NETWORK_URL,
    privateKey: process.env.TESTNET_WALLET_PVT_KEY,
    faucetUrl: `https://faucet-testnet.fuel.network/`,
    txIds: {
      [TransactionType.Upgrade]:
        '0xd64e3f7589bc1c6dcf1e419f4a3a8fc21d3694abf98f151000f34682d1cacdce',
      [TransactionType.Upload]:
        '0x996eec87a702ac978663fe67dbde7ab94d31f32b1860fbfc527d4b5447b3446c',
    },
  } as ConfiguredNetwork,
};

const selectedNetworks: Networks[] = [Networks.DEVNET, Networks.TESTNET];

/**
 * @group node
 * @group e2e
 */
describe.each(selectedNetworks)('Live Script Test', (selectedNetwork) => {
  let provider: Provider;
  let wallet: WalletUnlocked;
  let shouldSkip: boolean;

  beforeAll(async () => {
    const { networkUrl, privateKey } = configuredNetworks[selectedNetwork];
    if (!privateKey) {
      console.log(`Skipping live Fuel Node test - ${networkUrl}`);
      shouldSkip = true;
      return;
    }

    provider = await Provider.create(networkUrl);
    wallet = new WalletUnlocked(privateKey, provider);
  });

  it('can use script against live Fuel Node', async () => {
    if (shouldSkip) {
      return;
    }

    const scriptInstance = new ScriptMainArgBool(wallet);

    let output: boolean = false;
    try {
      const callScope = scriptInstance.functions.main(true);

      const { waitForResult } = await callScope.call();
      const { value } = await waitForResult();

      output = value;
    } catch (e) {
      const address = wallet.address.toB256();

      console.error((e as Error).message);
      console.warn(`
        not enough coins to fit the target?
        - add assets: ${configuredNetworks[selectedNetwork].faucetUrl}
        - B256 address: ${address}
      `);
    }

    expect(output).toBe(true);
  }, 15_000);

  it.each([
    ['Upgrade', TransactionType.Upgrade],
    ['Upload', TransactionType.Upload],
  ])(
    'can query and decode a %s transaction',
    async (_, type) => {
      if (shouldSkip) {
        return;
      }

      const { txIds } = configuredNetworks[selectedNetwork];
      if (undefined === txIds) {
        console.log(`Skipping ${type} transaction test for ${selectedNetwork} network`);
        return;
      }

      const txId = txIds[type as keyof ConfiguredNetwork['txIds']];
      const transaction = await provider.getTransaction(txId);
      expect(transaction?.type).toBe(type);
    },
    15_000
  );

  describe('optimized graphql queries', () => {
    it('should get the balance of the wallet', { timeout: 15_000 }, async () => {
      if (shouldSkip) {
        return;
      }

      const balance = await provider.getBalance(wallet.address, provider.getBaseAssetId());
      expect(bn(balance).gt(0));
    });

    it('should get the chain and node info', { timeout: 15_000 }, async () => {
      if (shouldSkip) {
        return;
      }

      const chainInfo = await provider.fetchChainAndNodeInfo();
      expect(chainInfo).toBeDefined();
    });

    it('should get latest block height', { timeout: 15_000 }, async () => {
      if (shouldSkip) {
        return;
      }

      const blockNumber = await provider.getBlockNumber();
      expect(bn(blockNumber).gt(0));
    });

    it('should get the latest block', { timeout: 15_000 }, async () => {
      if (shouldSkip) {
        return;
      }

      const block = await provider.getBlock('latest');
      expect(block).toBeDefined();
    });

    it('should get block with transactions', { timeout: 15_000 }, async () => {
      if (shouldSkip) {
        return;
      }

      const block = await provider.getBlockWithTransactions('latest');
      expect(block).toBeDefined();
    });
  });

  it(`should have correct assets`, () => {
    if (shouldSkip) {
      return;
    }

    const expectedRawBaseAsset = [
      {
        name: 'Ethereum',
        symbol: 'ETH',
        icon: 'eth.svg',
        networks: [
          {
            type: 'ethereum',
            chainId: CHAIN_IDS.eth.sepolia,
            decimals: 18,
          },
          {
            type: 'ethereum',
            chainId: CHAIN_IDS.eth.foundry,
            decimals: 18,
          },
          {
            type: 'ethereum',
            chainId: CHAIN_IDS.eth.mainnet,
            decimals: 18,
          },
          {
            type: 'fuel',
            chainId: CHAIN_IDS.fuel.devnet,
            decimals: 9,
            assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
          },
          {
            type: 'fuel',
            chainId: CHAIN_IDS.fuel.testnet,
            decimals: 9,
            assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
          },
          {
            type: 'fuel',
            chainId: CHAIN_IDS.fuel.mainnet,
            decimals: 9,
            assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
          },
        ],
      },
    ];

    const expectedBaseAsset = [
      {
        ...expectedRawBaseAsset[0],
        icon: 'https://cdn.fuel.network/assets/eth.svg',
      },
    ];

    const totalAssets = 27;

    expect(CHAIN_IDS.fuel[selectedNetwork]).toEqual(provider.getChainId());

    // Ensure contains base asset
    expect(rawAssets).containSubset(expectedRawBaseAsset);
    expect(assets).containSubset(expectedBaseAsset);

    expect(rawAssets.length).toEqual(totalAssets);
    expect(assets.length).toEqual(totalAssets);
  }, 15_000);
});
