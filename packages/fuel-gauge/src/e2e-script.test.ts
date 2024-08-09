/* eslint-disable no-console */
import { randomBytes } from 'crypto';
import {
  DEVNET_NETWORK_URL,
  TESTNET_NETWORK_URL,
  Provider,
  TransactionType,
  WalletUnlocked,
  CHAIN_IDS,
  rawAssets,
  assets,
  ContractFactory,
  hexlify,
  sleep,
} from 'fuels';

import { ScriptMainArgBool, LargeContractFactory, LargeContract } from '../test/typegen';

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

const selectedNetworks: Networks[] = [Networks.DEVNET];

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

  it('can deploy a large contract to a live Fuel Node', async () => {
    if (shouldSkip) {
      return;
    }

    let output: number = 0;
    try {
      const factory = new ContractFactory(LargeContractFactory.bytecode, LargeContract.abi, wallet);
      const { waitForResult } = await factory.deployContractAsBlobs({
        salt: hexlify(randomBytes(32)),
        chunkSizeOverride: Math.random(),
      });

      const { contract } = await waitForResult();

      await sleep(5000);

      const { waitForResult: waitForCallResult } = await contract.functions.something().call();
      const { value } = await waitForCallResult();

      output = value.toNumber();
    } catch (e) {
      console.error((e as Error).message);
    }

    expect(output).toBe(1001);
  }, 60_000);

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
      const address = wallet.address.toAddress();

      console.error((e as Error).message);
      console.warn(`
        not enough coins to fit the target?
        - add assets: ${configuredNetworks[selectedNetwork].faucetUrl}
        - bech32 address: ${address}
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

  it(`should have correct assets`, () => {
    if (shouldSkip) {
      return;
    }

    const expected = [
      {
        name: 'Ethereum',
        symbol: 'ETH',
        icon: expect.stringContaining('eth.svg'),
        networks: expect.arrayContaining([
          {
            type: 'fuel',
            decimals: 9,
            chainId: provider.getChainId(),
            assetId: provider.getBaseAssetId(),
          },
        ]),
      },
    ];

    expect(CHAIN_IDS.fuel[selectedNetwork]).toEqual(provider.getChainId());
    expect(rawAssets).toEqual(expected);
    expect(assets).toEqual(expected);
  }, 15_000);
});
