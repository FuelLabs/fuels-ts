# Setting up test wallets

You'll often want to create one or more test wallets when testing your contracts. Here's how to do it.

## Create a single wallet

<<< @/../../docs-snippets/src/guide/wallets/access.test.ts#wallets{ts:line-numbers}

## Setting up multiple test wallets

You can set up multiple test wallets using the `launchTestNode` utility via the `walletsConfigs` option.

To understand the different configurations, check out the [walletsConfig](../testing//test-node-options.md#walletsconfig) in the test node options guide.

<<< @/../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#multiple-wallets{ts:line-numbers}
