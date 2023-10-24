# Setting up a custom chain

THe `launchNodeAndGetWallets` method lets you launch a local Fuel node with various customizations.

In the code snippet below, we are providing a custom chain config file to the `launchNodeAndGetWallets` method. You can use a chain config file to customize things like the consensus parameters of the chain or to specify some initial states for the chain. Click here to see what a chain config file looks like: [chainConfig.json](https://github.com/FuelLabs/fuels-ts/blob/master/.fuel-core/configs/chainConfig.json)

<<< @/../../../packages/wallet/src/test-utils/launchNode.test.ts#launchNode-custom-config{ts:line-numbers}
