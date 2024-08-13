/* eslint-disable no-console */
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
  randomBytes,
  bn,
  concat,
  ScriptTransactionRequest,
} from 'fuels';

import {
  ScriptMainArgBool,
  LargeContractFactory,
  LargeContract,
  ScriptInfinite,
  ScriptWithVectorAdvanced,
  StorageTestContractFactory,
  StorageTestContract,
} from '../test/typegen';

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

  afterEach(async () => {
    console.log('After balance', (await wallet.getBalance()).toNumber());
    console.log('getGasPrice', (await provider.getLatestGasPrice()).toNumber());
    const tx = new ScriptTransactionRequest();
    const { gasPrice, gasUsed } = await wallet.getTransactionCost(tx);
    console.log('gasPrice', gasPrice.toNumber());
    console.log('gasUsed', gasUsed.toNumber());
  });

  it.concurrent.only('reverts a transaction', async () => {
    const baseAssetId = wallet.provider.getBaseAssetId();
    const scriptInstance = new ScriptInfinite(wallet);
    const callScope = scriptInstance.functions.main();
    const tx = await callScope.getTransactionRequest();
    const resources = await wallet.getResourcesToSpend([
      { amount: 95_000_000, assetId: baseAssetId },
    ]);
    tx.addResources(resources);
    // tx.maxFee = bn(95_000_000);
    tx.addWitness(concat([new Uint8Array(1), randomBytes(31)]));
    // tx.gasLimit = bn(90_000_000);
    console.log('id', tx.getTransactionId(wallet.provider.getChainId()));
    const txCost = await wallet.getTransactionCost(tx);

    tx.maxFee = txCost.maxFee;
    tx.gasLimit = txCost.gasUsed;

    await wallet.fund(tx, txCost);
    const response = await wallet.sendTransaction(tx);

    const result = await response.waitForResult();
    console.log('res', result.status);
  });

  it.concurrent(
    'reverts a transaction',
    async () => {
      const baseAssetId = provider.getBaseAssetId();
      const scriptInstance = new ScriptInfinite(wallet);
      const callScope = scriptInstance.functions.main();
      const tx = await callScope.getTransactionRequest();
      const resources = await wallet.getResourcesToSpend([
        { amount: 95_000_000, assetId: baseAssetId },
      ]);
      tx.addResources(resources);
      tx.maxFee = bn(95_000_000);
      tx.addWitness(concat([new Uint8Array(1), randomBytes(31)]));
      tx.gasLimit = bn(90_000_000);
      console.log('id', tx.getTransactionId(provider.getChainId()));
      const txCost = await wallet.getTransactionCost(tx);

      tx.maxFee = txCost.maxFee;
      tx.gasLimit = txCost.gasUsed;

      await wallet.fund(tx, txCost);
      const response = await wallet.sendTransaction(tx);

      const result = await response.waitForResult();
      console.log('res', result.status);
    },
    { repeats: 100 }
  );

  it.concurrent(
    'reverts a transaction',
    async () => {
      const baseAssetId = provider.getBaseAssetId();
      const scriptInstance = new ScriptInfinite(wallet);
      const callScope = scriptInstance.functions.main();
      const tx = await callScope.getTransactionRequest();
      const resources = await wallet.getResourcesToSpend([
        { amount: 95_000_000, assetId: baseAssetId },
      ]);
      tx.addResources(resources);
      tx.maxFee = bn(95_000_000);
      tx.addWitness(concat([new Uint8Array(1), randomBytes(31)]));
      tx.gasLimit = bn(90_000_000);
      console.log('id', tx.getTransactionId(provider.getChainId()));
      const txCost = await wallet.getTransactionCost(tx);

      tx.maxFee = txCost.maxFee;
      tx.gasLimit = txCost.gasUsed;

      await wallet.fund(tx, txCost);
      const response = await wallet.sendTransaction(tx);

      const result = await response.waitForResult();
      console.log('res', result.status);
    },
    { repeats: 100 }
  );

  it.concurrent(
    'reverts a transaction',
    async () => {
      const baseAssetId = provider.getBaseAssetId();
      const scriptInstance = new ScriptInfinite(wallet);
      const callScope = scriptInstance.functions.main();
      const tx = await callScope.getTransactionRequest();
      const resources = await wallet.getResourcesToSpend([
        { amount: 95_000_000, assetId: baseAssetId },
      ]);
      tx.addResources(resources);
      tx.maxFee = bn(95_000_000);
      tx.addWitness(concat([new Uint8Array(1), randomBytes(31)]));
      tx.gasLimit = bn(90_000_000);
      console.log('id', tx.getTransactionId(provider.getChainId()));
      const txCost = await wallet.getTransactionCost(tx);

      tx.maxFee = txCost.maxFee;
      tx.gasLimit = txCost.gasUsed;

      await wallet.fund(tx, txCost);
      const response = await wallet.sendTransaction(tx);

      const result = await response.waitForResult();
      console.log('res', result.status);
    },
    { repeats: 100 }
  );

  it('executes a complex script against a live Fuel Node', async () => {
    if (shouldSkip) {
      return;
    }
    const scores = [24, 56, 43];

    const importantDates = [
      {
        dates: [
          {
            day: 29,
            month: 12,
            year: 2020,
          },
          {
            day: 12,
            month: 8,
            year: 2019,
          },
        ],
        tag: 1,
        lag: 7,
      },
      {
        dates: [
          {
            day: 22,
            month: 10,
            year: 1980,
          },
        ],
        tag: 2,
        lag: 9,
      },
    ];

    const errors = [
      { StateError: 'Void' },
      { StateError: 'Pending' },
      { StateError: 'Completed' },
      { UserError: 'InsufficientPermissions' },
      { UserError: 'Unauthorized' },
      { UserError: 'Unauthorized' },
      { UserError: 'Unauthorized' },
      { UserError: 'Unauthorized' },
      { UserError: 'Unauthorized' },
    ];

    const vectorOfStructs = [
      {
        scores,
        important_dates: importantDates,
        errors,
      },
      {
        scores,
        important_dates: importantDates,
        errors,
      },
    ];

    const vectorScript = new ScriptWithVectorAdvanced(wallet);
    // @ts-expect-error as we are using the wrong type
    const call = vectorScript.functions.main(vectorOfStructs);

    const { waitForResult } = await call.call();
    const { value } = await waitForResult();
    console.log('value', value);
    expect(value).toBeDefined();

    // await sleep(100);

    // expect(async () => {
    //   const baseAssetId = provider.getBaseAssetId();
    //   const scriptInstance = new ScriptInfinite(wallet);
    //   const callScope = scriptInstance.functions.main();
    //   const tx = await callScope.getTransactionRequest();
    //   const resources = await wallet.getResourcesToSpend([{ amount: 100, assetId: baseAssetId }]);
    //   tx.addResources(resources);
    //   tx.maxFee = bn(1000);
    //   tx.addWitness(concat([new Uint8Array(1), randomBytes(31)]));
    //   const response = await wallet.sendTransaction(tx);
    //   const result = await response.waitForResult();
    //   console.log('res', result);
    // }).toThrow();

    // const contract = new StorageTestContractFactory(wallet);
    // const { waitForResult: waitForDeployResult } = await contract.deploy({
    //   salt: randomBytes(32),
    // });

    // const { contract: deployedContract } = await waitForDeployResult();
    // console.log('deployedContract', deployedContract.id);

    // await sleep(500);

    // const { waitForResult: waitForCallResult } = await deployedContract.functions
    //   .increment_counter(bn(1))
    //   .call();

    // const { value: callValue } = await waitForCallResult();
    // // console.log('callValue', callValue);

    // expect(callValue).toBeDefined();
  });

  it('gens a wallet', async () => {
    const newWallet = await WalletUnlocked.generate();
    console.log('wallet', newWallet.address.toB256());
    console.log(newWallet.privateKey);
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
      });

      const { contract } = await waitForResult();

      console.log('contract', contract.id);

      // await sleep(500);

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
