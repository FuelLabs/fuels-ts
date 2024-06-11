/* eslint-disable no-console */
import {
  DEVNET_NETWORK_URL,
  TESTNET_NETWORK_URL,
  Provider,
  TransactionType,
  WalletUnlocked,
} from 'fuels';

import { getScript } from './utils';

enum Networks {
  DEVNET = 'devnet',
  TESTNET = 'testnet',
}

type ConfiguredNetwork = {
  networkUrl: string;
  privateKey?: string;
  faucetUrl: string;
  transactions?: {
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
    transactions: {
      [TransactionType.Mint]: '0x03299946676ddc0044a52a675dd201d3173886c998a7301262141334b6d5a29e',
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
    transactions: undefined,
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
      console.log('Skipping live Fuel Node test');
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

    const scriptInstance = getScript<[boolean], boolean>('script-main-arg-bool', wallet);

    let output: boolean = false;
    try {
      const callScope = scriptInstance.functions.main(true);

      const { value } = await callScope.call();

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
  });

  it.each([
    ['Mint', TransactionType.Mint],
    ['Upgrade', TransactionType.Upgrade],
    ['Upload', TransactionType.Upload],
  ])('can query and decode a %s transaction', async (_, type) => {
    if (shouldSkip) {
      return;
    }

    const { transactions } = configuredNetworks[selectedNetwork];
    if (undefined === transactions) {
      console.log(`Skipping ${type} transaction test for ${selectedNetwork} network`);
      return;
    }

    const txId = transactions[type as keyof ConfiguredNetwork['transactions']];
    const transaction = await provider.getTransaction(txId);
    expect(transaction?.type).toBe(type);
  });
});
