[**@fuel-ts/contract v0.94.4**](../index.md) • **Docs**

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

[packages/contract/src/contract-factory.ts:68](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/contract/src/contract-factory.ts#L68)

## Properties

### account

> **account**: `null` \| [`Account`](../Account/Account.md)

#### Defined in

[packages/contract/src/contract-factory.ts:59](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/contract/src/contract-factory.ts#L59)

***

### bytecode

> **bytecode**: [`BytesLike`](../Interfaces/index.md#byteslike)

#### Defined in

[packages/contract/src/contract-factory.ts:56](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/contract/src/contract-factory.ts#L56)

***

### interface

> **interface**: `Interface`

#### Defined in

[packages/contract/src/contract-factory.ts:57](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/contract/src/contract-factory.ts#L57)

***

### provider

> **provider**: `null` \| [`Provider`](../Account/Provider.md)

#### Defined in

[packages/contract/src/contract-factory.ts:58](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/contract/src/contract-factory.ts#L58)

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

[packages/contract/src/contract-factory.ts:110](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/contract/src/contract-factory.ts#L110)

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

[packages/contract/src/contract-factory.ts:120](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/contract/src/contract-factory.ts#L120)

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

[packages/contract/src/contract-factory.ts:195](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/contract/src/contract-factory.ts#L195)

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

[packages/contract/src/contract-factory.ts:251](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/contract/src/contract-factory.ts#L251)

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

[packages/contract/src/contract-factory.ts:213](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/contract/src/contract-factory.ts#L213)

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

[packages/contract/src/contract-factory.ts:381](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/contract/src/contract-factory.ts#L381)
