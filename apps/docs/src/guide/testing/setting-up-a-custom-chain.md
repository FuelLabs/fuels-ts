# Setting up a custom chain

The `launchNodeAndGetWallets` method lets you launch a local Fuel node with various customizations.

In the code snippet below, we provide a custom chain config file to the `launchNodeAndGetWallets` method. You can use a chain config file to customize things like the chain's consensus parameters or specify some initial states for the chain. Click here to see what a chain config file looks like: [`chainConfig.json`](https://github.com/FuelLabs/fuels-ts/blob/master/.fuel-core/configs/chainConfig.json)

<<< @/../../../packages/account/src/test-utils/launchNodeAndGetWallets.test.ts#launchNode-custom-config{ts:line-numbers}

## Customization options

As you can see in the previous code snippet, you can optionally pass in a `walletCount` and some `launchNodeOptions` to the `launchNodeAndGetWallets` method.

The `walletCount` option lets you specify how many wallets you want to generate. The default value is 10.

The `launchNodeOptions` option lets you specify some additional options for the node. The available options are:

<<< @/../../../packages/account/src/test-utils/launchNode.ts#launchNode-launchNodeOptions{ts:line-numbers}

> Note: You can see all the available fuel-core args by running `pnpm fuels core run -h`.
