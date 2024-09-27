[**@fuel-ts/contract v0.94.8**](../index.md) • **Docs**

***

# Interface: LaunchTestNodeOptions\&lt;TContractConfigs\>

## Extends

- `LaunchCustomProviderAndGetWalletsOptions`

## Type Parameters

• **TContractConfigs** *extends* [`DeployContractConfig`](DeployContractConfig.md)[]

## Properties

### contractsConfigs

> **contractsConfigs**: `TContractConfigs`

Pass in either the path to the contract's root directory to deploy the contract or use `DeployContractConfig` for more control.

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:39](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/contract/src/test-utils/launch-test-node.ts#L39)

***

### launchNodeServerPort?

> `optional` **launchNodeServerPort**: `string`

#### Inherited from

`LaunchCustomProviderAndGetWalletsOptions.launchNodeServerPort`

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:17

***

### nodeOptions?

> `optional` **nodeOptions**: `Partial`\&lt;`Omit`\&lt;`LaunchNodeOptions`, `"snapshotConfig"`\> & `object`\>

Options for configuring the test node.

#### Inherited from

`LaunchCustomProviderAndGetWalletsOptions.nodeOptions`

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:14

***

### providerOptions?

> `optional` **providerOptions**: `Partial`\&lt;[`ProviderOptions`](../Account/index.md#provideroptions)\>

Options for configuring the provider.

#### Inherited from

`LaunchCustomProviderAndGetWalletsOptions.providerOptions`

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:12

***

### walletsConfig?

> `optional` **walletsConfig**: `Partial`\&lt;`WalletsConfigOptions`\>

Configures the wallets that should exist in the genesis block of the `fuel-core` node.

#### Inherited from

`LaunchCustomProviderAndGetWalletsOptions.walletsConfig`

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:10
