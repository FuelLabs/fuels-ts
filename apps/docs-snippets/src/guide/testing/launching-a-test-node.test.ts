/* eslint-disable @typescript-eslint/no-unused-vars */
import { WalletUnlocked } from 'fuels';
import { TestAssetId, TestMessage, launchTestNode } from 'fuels/test-utils';
import { join } from 'path';

import { Counter, CounterFactory } from '../../../test/typegen/contracts';

/**
 * @group node
 */
describe('launching a test node', () => {
  test(`instantiating test nodes - automatic cleanup`, async () => {
    // #region automatic-cleanup
    // #import { launchTestNode };

    using launched = await launchTestNode();

    /*
      The method `launched.cleanup()` will be automatically
      called when the variable `launched` goes out of block scope.
    */

    // #endregion automatic-cleanup
  });

  test('instantiating test nodes - manual cleanup', async () => {
    // #region manual-cleanup
    // #import { launchTestNode };

    const launched = await launchTestNode();

    /*
     * Do your things, run your tests, and then call
    `launched.cleanup()` to dispose of everything.
    */

    launched.cleanup();
    // #endregion manual-cleanup
  });

  test('options', async () => {
    // #region options
    // #import { launchTestNode };

    using launched = await launchTestNode(/* options */);
    // #endregion options
  });

  test('simple contract deployment', async () => {
    // #region basic-example
    // #import { launchTestNode };

    // #context import { CounterFactory } from 'path/to/typegen/output';

    using launched = await launchTestNode({
      contractsConfigs: [{ factory: CounterFactory }],
    });

    const {
      contracts: [contract],
      provider,
      wallets,
    } = launched;

    const { waitForResult } = await contract.functions.get_count().call();
    const response = await waitForResult();
    // #endregion basic-example
    expect(response.value.toNumber()).toBe(0);
    expect(provider).toBeDefined();
    expect(wallets).toBeDefined();
  });

  test('multiple contracts and wallets', async () => {
    // #region advanced-example
    // #import { launchTestNode, TestAssetId, TestMessage };

    // #context import { CounterFactory } from 'path/to/typegen/output';

    const assets = TestAssetId.random(2);
    const message = new TestMessage({ amount: 1000 });

    using launched = await launchTestNode({
      walletsConfig: {
        count: 4,
        assets,
        coinsPerAsset: 2,
        amountPerCoin: 1_000_000,
        messages: [message],
      },
      contractsConfigs: [
        {
          factory: CounterFactory,
          walletIndex: 3,
          options: { storageSlots: [] },
        },
      ],
    });

    const {
      contracts: [contract],
      wallets: [wallet1, wallet2, wallet3, wallet4],
    } = launched;
    // #endregion advanced-example

    expect(contract).toBeDefined();
    expect(wallet1).toBeDefined();
    expect(wallet2).toBeDefined();
    expect(wallet3).toBeDefined();
    expect(wallet4).toBeDefined();
  });

  test('configuring custom fuel-core args', async () => {
    // #region custom-fuel-core-args
    // #import { launchTestNode };

    process.env.DEFAULT_FUEL_CORE_ARGS = `--tx-max-depth 20`;

    // `nodeOptions.args` will override the above values if provided.

    using launched = await launchTestNode();
    // #endregion custom-fuel-core-args

    const { provider } = launched;

    expect(provider.getNode().maxDepth.toNumber()).toEqual(20);
    process.env.DEFAULT_FUEL_CORE_ARGS = '';
  });

  test('configuring a base chain config', async () => {
    const snapshotDirPath = join(__dirname, '../../../../../', '.fuel-core', 'configs');

    // #region custom-chain-config
    // #import { launchTestNode };

    process.env.DEFAULT_CHAIN_SNAPSHOT_DIR = snapshotDirPath;

    using launched = await launchTestNode();
    // #endregion custom-chain-config

    const { provider } = launched;

    const { name } = await provider.fetchChain();

    expect(name).toEqual('local_testnet');
  });

  test('customizing node options', async () => {
    // #region custom-node-options
    // #import { launchTestNode, TestAssetId };

    const [baseAssetId] = TestAssetId.random();

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

  test('using TestAssetId', async () => {
    // #region asset-ids
    // #import { launchTestNode, TestAssetId };

    const assets = TestAssetId.random();

    using launched = await launchTestNode({
      walletsConfig: {
        assets,
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const { coins } = await wallet.getCoins(assets[0].value);
    // #endregion asset-ids
    expect(coins[0].assetId).toEqual(assets[0].value);
  });

  test('generating test messages', async () => {
    // #region test-messages
    // #import { launchTestNode, TestMessage };

    const testMessage = new TestMessage({ amount: 1000 });

    using launched = await launchTestNode({
      walletsConfig: {
        messages: [testMessage],
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const {
      messages: [message],
    } = await wallet.getMessages();
    // message.nonce === testMessage.nonce
    // #endregion test-messages

    expect(message.nonce).toEqual(testMessage.nonce);
  });

  test('generating test messages directly on chain', async () => {
    // #region test-messages-chain
    // #import { launchTestNode, TestMessage, WalletUnlocked };

    const recipient = WalletUnlocked.generate();
    const testMessage = new TestMessage({
      amount: 1000,
      recipient: recipient.address,
    });

    using launched = await launchTestNode({
      nodeOptions: {
        snapshotConfig: {
          stateConfig: {
            messages: [testMessage.toChainMessage()],
          },
        },
      },
    });

    const { provider } = launched;

    recipient.provider = provider;

    const {
      messages: [message],
    } = await recipient.getMessages();
    // message.nonce === testMessage.nonce
    // #endregion test-messages-chain

    expect(message.nonce).toEqual(testMessage.nonce);
  });
});
