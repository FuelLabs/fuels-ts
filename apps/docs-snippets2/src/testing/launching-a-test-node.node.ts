/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/first */
import { WalletUnlocked, Provider } from 'fuels';
import { launchTestNode, TestAssetId, TestMessage } from 'fuels/test-utils';
import { join } from 'path';

// #region automatic-cleanup
using launched = await launchTestNode();

/*
 * The method `launched.cleanup()` will be automatically
 * called when the variable `launched` goes out of block scope.
 */

// #endregion automatic-cleanup

// #region manual-cleanup

const launchedTestNode = await launchTestNode();

/*
      Do your things, run your tests, and then call
      `launchedTestNode.cleanup()` to dispose of everything.
    */

launchedTestNode.cleanup();
// #endregion manual-cleanup

// #region options

const customLaunchTestNode = await launchTestNode(/* options */);
// #endregion options

customLaunchTestNode.cleanup();
// #region basic-example
import { CounterFactory } from '../typegend/contracts/CounterFactory';

using launchedContractNode = await launchTestNode({
  contractsConfigs: [{ factory: CounterFactory }],
});

const {
  contracts: [contract],
  provider,
  wallets,
} = launchedContractNode;

const { waitForResult } = await contract.functions.get_count().call();
const response = await waitForResult();

console.assert(response.value.toNumber() === 0, 'Counter is not initialized');
console.assert(provider instanceof Provider, 'Provider is not instance of Provider');
console.assert(wallets.length === 4, 'Wallets length is not 4');
// #endregion basic-example

// #region advanced-example
const assets = TestAssetId.random(2);
const message = new TestMessage({ amount: 1000 });

using counterContractNode = await launchTestNode({
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
  contracts: [counterContract],
  wallets: [wallet1, wallet2, wallet3, wallet4],
} = counterContractNode;

console.assert(
  counterContract instanceof CounterFactory,
  'CounterFactory is not instance of CounterFactory'
);
console.assert(wallet1 instanceof WalletUnlocked, 'Wallet1 is not instance of WalletUnlocked');
console.assert(wallet2 instanceof WalletUnlocked, 'Wallet2 is not instance of WalletUnlocked');
console.assert(wallet3 instanceof WalletUnlocked, 'Wallet3 is not instance of WalletUnlocked');
console.assert(wallet4 instanceof WalletUnlocked, 'Wallet4 is not instance of WalletUnlocked');

// #endregion advanced-example

// #region custom-fuel-core-args
process.env.DEFAULT_FUEL_CORE_ARGS = `--tx-max-depth 20`;

// `nodeOptions.args` will override the above values if provided.

const nodeWithCustomArgs = await launchTestNode();
const { provider: providerWithCustomArgs } = nodeWithCustomArgs;

console.assert(providerWithCustomArgs.getNode().maxDepth.toNumber() === 20, 'Max depth is not 20');
process.env.DEFAULT_FUEL_CORE_ARGS = '';
// #endregion custom-fuel-core-args

nodeWithCustomArgs.cleanup();

const mySnapshotDirPath = join(__dirname, '../../../../', '.fuel-core', 'configs');

// #region custom-chain-config
process.env.DEFAULT_CHAIN_SNAPSHOT_DIR = mySnapshotDirPath;

const launchedWithCustomChainConfig = await launchTestNode();

const { provider: providerWithCustomChainConfig } = launchedWithCustomChainConfig;

const { name } = await providerWithCustomChainConfig.fetchChain();

console.assert(name === 'custom-chain-config', 'Chain name is not custom-chain-config');
// #endregion custom-chain-config

launchedWithCustomChainConfig.cleanup();
// #region custom-node-options

const [baseAssetId] = TestAssetId.random();

const nodeWithCustomBaseAssetId = await launchTestNode({
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

nodeWithCustomBaseAssetId.cleanup();

// #region asset-ids

const randomAssetIds = TestAssetId.random();

const nodeWithCustomAssetIds = await launchTestNode({
  walletsConfig: {
    assets: randomAssetIds,
  },
});

const {
  wallets: [walletWithCustomAssetIds],
} = nodeWithCustomAssetIds;

const { coins } = await walletWithCustomAssetIds.getCoins(randomAssetIds[0].value);
console.assert(
  coins[0].assetId === randomAssetIds[0].value,
  'Asset id is not randomAssetIds[0].value'
);
// #endregion asset-ids

nodeWithCustomAssetIds.cleanup();

// #region test-messages

const testMessage = new TestMessage({ amount: 1000 });

const nodeWithTestMessages = await launchTestNode({
  walletsConfig: {
    messages: [testMessage],
  },
});

const {
  wallets: [walletWithTestMessages],
} = nodeWithTestMessages;

const {
  messages: [messageWithTestMessages],
} = await walletWithTestMessages.getMessages();

console.assert(
  messageWithTestMessages.nonce === testMessage.nonce,
  'Nonce is not testMessage.nonce'
);
// #endregion test-messages

nodeWithTestMessages.cleanup();

// #region test-messages-chain
const recipient = WalletUnlocked.generate();
const testMessageOnChain = new TestMessage({
  amount: 1000,
  recipient: recipient.address,
});

using launchedWithTestMessagesOnChain = await launchTestNode({
  nodeOptions: {
    snapshotConfig: {
      stateConfig: {
        messages: [testMessageOnChain.toChainMessage()],
      },
    },
  },
});

const { provider: providerWithTestMessagesOnChain } = launchedWithTestMessagesOnChain;

recipient.provider = providerWithTestMessagesOnChain;

const {
  messages: [messageOnChain],
} = await recipient.getMessages();
// message.nonce === testMessage.nonce
console.assert(
  messageOnChain.nonce === testMessageOnChain.nonce,
  'Nonce is not testMessageOnChain.nonce'
);
// #endregion test-messages-chain
