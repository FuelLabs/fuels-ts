# Proxy Contracts

Automatic deployment of proxy contracts can be enabled in `Forc.toml`.

We recommend that you use [fuels deploy](https://docs.fuel.network/docs/fuels-ts/fuels-cli/commands/#fuels-deploy) to deploy and upgrade your contract using a proxy as it will take care of everything for you. However, if you want to deploy a proxy contract manually, you can follow the guide below.

## Manually Deploying and Upgrading by Proxy

As mentioned above, we recommend using [fuels deploy](https://docs.fuel.network/docs/fuels-ts/fuels-cli/commands/#fuels-deploy) to deploy and upgrade your contract as everything is handled under the hood. But the below guide will detail this process should you want to implement it yourself.

We recommend using the [SRC14 compliant owned proxy contract](https://github.com/FuelLabs/sway-standard-implementations/tree/174f5ed9c79c23a6aaf5db906fe27ecdb29c22eb/src14/owned_proxy/contract/out/release) as the underlying proxy and that is the one we will use in this guide, as is the one used by [fuels deploy](https://docs.fuel.network/docs/fuels-ts/fuels-cli/commands/#fuels-deploy).

The overall process is as follows:

1. Deploy your contract
1. Deploy the proxy contract
1. Set the target of the proxy contract to your deployed contract
1. Make calls to the contract via the proxy contract ID
1. Upgrade the contract by deploying a new version of the contract and updating the target of the proxy contract

> **Note**: When new storage slots are added to the contract, they must be initialized in the proxy contract before they can be read from. This can be done by first writing to the new storage slot in the proxy contract. Failure to do so will result in the transaction being reverted.

For example, lets imagine we want to deploy the following counter contract:

<<< @/../../docs/sway/counter/src/main.sw#proxy-1{rs:line-numbers}

Let's deploy and interact with it by proxy. First let's setup the environment and deploy the counter contract:

<<< @./snippets/proxy-contracts.ts#proxy-2{ts:line-numbers}

Now let's deploy the [SRC14 compliant proxy contract](https://github.com/FuelLabs/sway-standard-implementations/tree/174f5ed9c79c23a6aaf5db906fe27ecdb29c22eb/src14/owned_proxy/contract/out/release) and initialize it by setting its target to the counter target ID.

<<< @./snippets/proxy-contracts.ts#proxy-3{ts:line-numbers}

Finally, we can call our counter contract using the contract ID of the proxy.

<<< @./snippets/proxy-contracts.ts#proxy-4{ts:line-numbers}

Now let's make some changes to our initial counter contract by adding an additional storage slot to track the number of increments and a new get method that retrieves its value:

<<< @/../../docs/sway/counter-v2/src/main.sw#proxy-5{rs:line-numbers}

We can deploy it and update the target of the proxy like so:

<<< @./snippets/proxy-contracts.ts#proxy-6{ts:line-numbers}

Then, we can instantiate our upgraded contract via the same proxy contract ID:

<<< @./snippets/proxy-contracts.ts#proxy-7{ts:line-numbers}

For more info, please check these docs:

- [Proxy Contracts](https://docs.fuel.network/docs/forc/plugins/forc_client/#proxy-contracts)
- [Sway Libs / Upgradability Library](https://docs.fuel.network/docs/sway-libs/upgradability/#upgradability-library)
- [Sway Standards / SRC-14 - Simple Upgradable Proxies](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/#src-14-simple-upgradeable-proxies)
