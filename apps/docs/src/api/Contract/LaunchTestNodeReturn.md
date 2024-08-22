# Interface: LaunchTestNodeReturn&lt;TFactories\>

[@fuel-ts/contract](/api/Contract/index.md).[test-utils](/api/Contract/test-utils-index.md).LaunchTestNodeReturn

## Type parameters

| Name | Type |
| :------ | :------ |
| `TFactories` | extends [`DeployContractConfig`](/api/Contract/DeployContractConfig.md)[] |

## Hierarchy

- `SetupTestProviderAndWalletsReturn`

  ↳ **`LaunchTestNodeReturn`**

## Properties

### cleanup

• **cleanup**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

SetupTestProviderAndWalletsReturn.cleanup

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:22

___

### contracts

• **contracts**: [`TContracts`](/api/Contract/test-utils-index.md#tcontracts)&lt;`TFactories`\>

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:48](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/contract/src/test-utils/launch-test-node.ts#L48)

___

### provider

• **provider**: [`Provider`](/api/Account/Provider.md)

#### Inherited from

SetupTestProviderAndWalletsReturn.provider

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:21

___

### wallets

• **wallets**: [`WalletUnlocked`](/api/Account/WalletUnlocked.md)[]

#### Inherited from

SetupTestProviderAndWalletsReturn.wallets

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:20

## Methods

### [dispose]

▸ **[dispose]**(): `void`

#### Returns

`void`

#### Inherited from

SetupTestProviderAndWalletsReturn.[dispose]

#### Defined in

node_modules/.pnpm/typescript@5.4.5/node_modules/typescript/lib/lib.esnext.disposable.d.ts:34

▸ **[dispose]**(): `void`

#### Returns

`void`

#### Inherited from

SetupTestProviderAndWalletsReturn.[dispose]

#### Defined in

node_modules/.pnpm/@types+node@22.2.0/node_modules/@types/node/globals.d.ts:118
