[**@fuel-ts/contract v0.95.0**](../index.md) • **Docs**

***

# Class: ContractFactory

`ContractFactory` provides utilities for deploying and configuring contracts.

## Constructors

### new ContractFactory()

> **new ContractFactory**(`bytecode`, `abi`, `accountOrProvider`): [`ContractFactory`](ContractFactory.md)

Create a ContractFactory instance.

#### Parameters

• **bytecode**: [`BytesLike`](../Interfaces/index.md#byteslike)

The bytecode of the contract.

• **abi**: `Interface` \| `JsonAbi`

The contract's ABI (Application Binary Interface).

• **accountOrProvider**: `null` \| [`Provider`](../Account/Provider.md) \| [`Account`](../Account/Account.md) = `null`

An account or provider to be associated with the factory.

#### Returns

[`ContractFactory`](ContractFactory.md)

#### Defined in

[packages/contract/src/contract-factory.ts:73](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/contract-factory.ts#L73)

## Properties

### account

> **account**: `null` \| [`Account`](../Account/Account.md)

#### Defined in

[packages/contract/src/contract-factory.ts:64](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/contract-factory.ts#L64)

***

### bytecode

> **bytecode**: [`BytesLike`](../Interfaces/index.md#byteslike)

#### Defined in

[packages/contract/src/contract-factory.ts:61](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/contract-factory.ts#L61)

***

### interface

> **interface**: `Interface`

#### Defined in

[packages/contract/src/contract-factory.ts:62](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/contract-factory.ts#L62)

***

### provider

> **provider**: `null` \| [`Provider`](../Account/Provider.md)

#### Defined in

[packages/contract/src/contract-factory.ts:63](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/contract-factory.ts#L63)

## Methods

### connect()

> **connect**(`provider`): [`ContractFactory`](ContractFactory.md)

Connect the factory to a provider.

#### Parameters

• **provider**: [`Provider`](../Account/Provider.md)

The provider to be associated with the factory.

#### Returns

[`ContractFactory`](ContractFactory.md)

A new ContractFactory instance.

#### Defined in

[packages/contract/src/contract-factory.ts:115](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/contract-factory.ts#L115)

***

### createTransactionRequest()

> **createTransactionRequest**(`deployOptions`?): `object`

Create a transaction request to deploy a contract with the specified options.

#### Parameters

• **deployOptions?**: `object` & `CreateTransactionRequestLike` & `object`

Options for deploying the contract.

#### Returns

`object`

The CreateTransactionRequest object for deploying the contract.

##### contractId

> **contractId**: `string`

##### transactionRequest

> **transactionRequest**: [`CreateTransactionRequest`](../Account/CreateTransactionRequest.md)

#### Defined in

[packages/contract/src/contract-factory.ts:125](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/contract-factory.ts#L125)

***

### deploy()

> **deploy**\&lt;`TContract`\>(`deployOptions`): `Promise`\&lt;[`DeployContractResult`](../index.md#deploycontractresulttcontract)\&lt;`TContract`\>\>

Deploy a contract of any length with the specified options.

#### Type Parameters

• **TContract** *extends* [`Contract`](../Program/Contract.md) = [`Contract`](../Program/Contract.md)

#### Parameters

• **deployOptions**: [`DeployContractOptions`](../index.md#deploycontractoptions) = `{}`

Options for deploying the contract.

#### Returns

`Promise`\&lt;[`DeployContractResult`](../index.md#deploycontractresulttcontract)\&lt;`TContract`\>\>

A promise that resolves to the deployed contract instance.

#### Defined in

[packages/contract/src/contract-factory.ts:200](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/contract-factory.ts#L200)

***

### deployAsBlobTx()

> **deployAsBlobTx**\&lt;`TContract`\>(`deployOptions`): `Promise`\&lt;[`DeployContractResult`](../index.md#deploycontractresulttcontract)\&lt;`TContract`\>\>

Chunks and deploys a contract via a loader contract. Suitable for deploying contracts larger than the max contract size.

#### Type Parameters

• **TContract** *extends* [`Contract`](../Program/Contract.md) = [`Contract`](../Program/Contract.md)

#### Parameters

• **deployOptions**: [`DeployContractOptions`](../index.md#deploycontractoptions) = `...`

Options for deploying the contract.

#### Returns

`Promise`\&lt;[`DeployContractResult`](../index.md#deploycontractresulttcontract)\&lt;`TContract`\>\>

A promise that resolves to the deployed contract instance.

#### Defined in

[packages/contract/src/contract-factory.ts:256](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/contract-factory.ts#L256)

***

### deployAsBlobTxForScript()

> **deployAsBlobTxForScript**(): `Promise`\&lt;`object`\>

#### Returns

`Promise`\&lt;`object`\>

##### blobId

> **blobId**: `string`

##### waitForResult()

> **waitForResult**: () => `Promise`\&lt;`object`\>

###### Returns

`Promise`\&lt;`object`\>

###### configurableOffsetDiff

> **configurableOffsetDiff**: `number`

###### loaderBytecode

> **loaderBytecode**: `string`

#### Defined in

[packages/contract/src/contract-factory.ts:380](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/contract-factory.ts#L380)

***

### deployAsCreateTx()

> **deployAsCreateTx**\&lt;`TContract`\>(`deployOptions`): `Promise`\&lt;[`DeployContractResult`](../index.md#deploycontractresulttcontract)\&lt;`TContract`\>\>

Deploy a contract with the specified options.

#### Type Parameters

• **TContract** *extends* [`Contract`](../Program/Contract.md) = [`Contract`](../Program/Contract.md)

#### Parameters

• **deployOptions**: [`DeployContractOptions`](../index.md#deploycontractoptions) = `{}`

Options for deploying the contract.

#### Returns

`Promise`\&lt;[`DeployContractResult`](../index.md#deploycontractresulttcontract)\&lt;`TContract`\>\>

A promise that resolves to the deployed contract instance.

#### Defined in

[packages/contract/src/contract-factory.ts:218](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/contract-factory.ts#L218)

***

### setConfigurableConstants()

> **setConfigurableConstants**(`configurableConstants`): `void`

Set configurable constants of the contract with the specified values.

#### Parameters

• **configurableConstants**

An object containing configurable names and their values.

#### Returns

`void`

#### Defined in

[packages/contract/src/contract-factory.ts:467](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/contract/src/contract-factory.ts#L467)