# Interface: LaunchTestNodeOptions&lt;TContractConfigs\>

[@fuel-ts/contract](/api/Contract/index.md).[test-utils](/api/Contract/test-utils-index.md).LaunchTestNodeOptions

## Type parameters

| Name | Type |
| :------ | :------ |
| `TContractConfigs` | extends [`DeployContractConfig`](/api/Contract/DeployContractConfig.md)[] |

## Hierarchy

- `LaunchCustomProviderAndGetWalletsOptions`

  ↳ **`LaunchTestNodeOptions`**

## Properties

### contractsConfigs

• **contractsConfigs**: `TContractConfigs`

Pass in either the path to the contract's root directory to deploy the contract or use `DeployContractConfig` for more control.

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:39](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/test-utils/launch-test-node.ts#L39)

___

### launchNodeServerPort

• `Optional` **launchNodeServerPort**: `string`

#### Inherited from

LaunchCustomProviderAndGetWalletsOptions.launchNodeServerPort

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:17

___

### nodeOptions

• `Optional` **nodeOptions**: `Partial`&lt;`Omit`&lt;`LaunchNodeOptions`, ``"snapshotConfig"``\> & { `snapshotConfig`: `PartialObjectDeep`&lt;[`SnapshotConfigs`](/api/Utils/SnapshotConfigs.md), {}\>  }\>

Options for configuring the test node.

#### Inherited from

LaunchCustomProviderAndGetWalletsOptions.nodeOptions

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:14

___

### providerOptions

• `Optional` **providerOptions**: `Partial`&lt;[`ProviderOptions`](/api/Account/index.md#provideroptions)\>

Options for configuring the provider.

#### Inherited from

LaunchCustomProviderAndGetWalletsOptions.providerOptions

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:12

___

### walletsConfig

• `Optional` **walletsConfig**: `Partial`&lt;`WalletsConfigOptions`\>

Configures the wallets that should exist in the genesis block of the `fuel-core` node.

#### Inherited from

LaunchCustomProviderAndGetWalletsOptions.walletsConfig

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:10
