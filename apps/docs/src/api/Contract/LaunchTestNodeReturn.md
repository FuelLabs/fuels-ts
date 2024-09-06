[**@fuel-ts/contract v0.94.5**](../index.md) • **Docs**

***

# Interface: LaunchTestNodeReturn\&lt;TFactories\>

## Extends

- `SetupTestProviderAndWalletsReturn`

## Type Parameters

• **TFactories** *extends* [`DeployContractConfig`](DeployContractConfig.md)[]

## Properties

### cleanup()

> **cleanup**: () => `void`

#### Returns

`void`

#### Inherited from

`SetupTestProviderAndWalletsReturn.cleanup`

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:22

***

### contracts

> **contracts**: [`TContracts`](../index.md#tcontractst)\&lt;`TFactories`\>

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:48](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/contract/src/test-utils/launch-test-node.ts#L48)

***

### provider

> **provider**: [`Provider`](../Account/Provider.md)

#### Inherited from

`SetupTestProviderAndWalletsReturn.provider`

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:21

***

### wallets

> **wallets**: [`WalletUnlocked`](../Account/WalletUnlocked.md)[]

#### Inherited from

`SetupTestProviderAndWalletsReturn.wallets`

#### Defined in

packages/account/dist/test-utils/setup-test-provider-and-wallets.d.ts:20

## Methods

### \[dispose\]()

#### \[dispose\](undefined)

> **\[dispose\]**(): `void`

##### Returns

`void`

##### Inherited from

`SetupTestProviderAndWalletsReturn.[dispose]`

##### Defined in

node\_modules/.pnpm/typescript@5.4.5/node\_modules/typescript/lib/lib.esnext.disposable.d.ts:34

#### \[dispose\](undefined)

> **\[dispose\]**(): `void`

##### Returns

`void`

##### Inherited from

`SetupTestProviderAndWalletsReturn.[dispose]`

##### Defined in

node\_modules/.pnpm/@types+node@22.2.0/node\_modules/@types/node/globals.d.ts:118
