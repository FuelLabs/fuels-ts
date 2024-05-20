/* eslint-disable @typescript-eslint/no-unused-vars */
import exp from 'constants';
import { AssetId, TestMessage, launchTestNode } from 'fuels/test-utils';
import { join } from 'path';

import { CounterAbi__factory as TestContract__factory } from '../../../test/typegen/contracts';
import bytecode from '../../../test/typegen/contracts/CounterAbi.hex';

/**
 * @group node
 */
describe('launching a test node', () => {
  test(`instantiating test nodes - automatic cleanup`, async () => {
    // #region automatic-cleanup
    // #import { launchTestNode };

    using launched = await launchTestNode();
    // #endregion automatic-cleanup
  });

  test('instantiating test nodes - manual cleanup', async () => {
    // #region manual-cleanup
    // #import { launchTestNode };

    const launched = await launchTestNode();
    launched.cleanup();
    // #endregion manual-cleanup
  });
  test('simple contract deployment', async () => {
    // #region deploy-contract
    // #import { launchTestNode };

    // #context import { TestContract__factory } from 'path/to/typegen/output';
    // #context import bytecode from 'path/to/typegen/output/TestContract.hex.ts';

    using launched = await launchTestNode({
      deployContracts: [
        {
          deployer: TestContract__factory,
          bytecode,
        },
      ],
    });

    const {
      contracts: [contract],
      provider,
      wallets,
    } = launched;

    const response = await contract.functions.get_count().call();
    // #endregion deploy-contract
    expect(response.value.toNumber()).toBe(0);
    expect(provider).toBeDefined();
    expect(wallets).toBeDefined();
  });

  test('multiple contracts and wallets', async () => {
    // #region multiple-contracts-and-wallets
    // #import { launchTestNode, AssetId, TestMessage };

    // #context import { TestContract__factory } from 'path/to/typegen/output';
    // #context import bytecode from 'path/to/typegen/output/TestContract.hex.ts';

    const assets = AssetId.random(2);
    const message = new TestMessage({ amount: 1000 });

    using launched = await launchTestNode({
      walletConfig: {
        count: 4,
        assets,
        coinsPerAsset: 2,
        amountPerCoin: 1_000_000,
        messages: [message],
      },
      deployContracts: [
        {
          deployer: TestContract__factory,
          bytecode,
          walletIndex: 3,
          options: { storageSlots: [] },
        },
      ],
    });

    const {
      contracts: [contract],
      wallets: [wallet1, wallet2, wallet3, wallet4],
    } = launched;
    // #endregion multiple-contracts-and-wallets

    expect(contract).toBeDefined();
    expect(wallet1).toBeDefined();
    expect(wallet2).toBeDefined();
    expect(wallet3).toBeDefined();
    expect(wallet4).toBeDefined();
  });

  test('configuring custom fuel-core args', async () => {
    // #region custom-fuel-core-args
    process.env.DEFAULT_FUEL_CORE_ARGS = `--tx-max-depth 20`;

    using launched = await launchTestNode();
    // #endregion custom-fuel-core-args

    const { provider } = launched;

    expect(provider.getNode().maxDepth.toNumber()).toEqual(20);
    process.env.DEFAULT_FUEL_CORE_ARGS = '';
  });

  test('configuring a base chain config', async () => {
    const snapshotDirPath = join(__dirname, '../../../../../', '.fuel-core', 'configs');

    // #region custom-chain-config
    process.env.DEFAULT_CHAIN_SNAPSHOT_DIR = snapshotDirPath;

    using launched = await launchTestNode();
    // #endregion custom-chain-config

    const { provider } = launched;

    const { name } = await provider.fetchChain();

    expect(name).toEqual('local_testnet');
  });

  test('customizing node options', async () => {
    // #region custom-node-options
    // #import { launchTestNode, AssetId };
    const [baseAssetId] = AssetId.random();

    using launched = await launchTestNode({
      nodeOptions: {
        snapshotConfig: {
          chainConfig: {
            consensus_parameters: {
              V1: {
                base_asset_id: baseAssetId.value,
              },
            },
          },
        },
      },
    });
    // #endregion custom-node-options
  });

  test('using assetId', async () => {
    // #region asset-ids
    // #import { launchTestNode, AssetId };
    const assets = AssetId.random();

    using launched = await launchTestNode({
      walletConfig: {
        assets,
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const coins = await wallet.getCoins(assets[0].value);
    // #endregion asset-ids
    expect(coins[0].assetId).toEqual(assets[0].value);
  });

  test('generating test messages', async () => {
    // #region test-messages
    // #import { launchTestNode, TestMessage };

    const testMessage = new TestMessage({ amount: 1000 });

    using launched = await launchTestNode({
      walletConfig: {
        messages: [testMessage],
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const [message] = await wallet.getMessages();
    // message.nonce === testMessage.nonce
    // #endregion test-messages

    expect(message.nonce).toEqual(testMessage.nonce);
  });
});
