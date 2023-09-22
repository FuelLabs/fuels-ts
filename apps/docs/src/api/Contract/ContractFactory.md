# Class: ContractFactory

[@fuel-ts/contract](/api/Contract/index.md).ContractFactory

`ContractFactory` provides utilities for deploying and configuring contracts.

## Constructors

### constructor

• **new ContractFactory**(`bytecode`, `abi`, `accountOrProvider?`)

Create a ContractFactory instance.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bytecode` | `BytesLike` | `undefined` | The bytecode of the contract. |
| `abi` | `JsonAbi` \| `Interface`&lt;`JsonAbi`\> | `undefined` | The contract's ABI (Application Binary Interface). |
| `accountOrProvider` | ``null`` \| [`Provider`](/api/Providers/Provider.md) \| [`Account`](/api/Wallet/Account.md) | `null` | An account or provider to be associated with the factory. |

#### Defined in

[contract-factory.ts:42](https://github.com/FuelLabs/fuels-ts/blob/4803e6df/packages/contract/src/contract-factory.ts#L42)

## Properties

### account

• **account**: ``null`` \| [`Account`](/api/Wallet/Account.md)

#### Defined in

[contract-factory.ts:33](https://github.com/FuelLabs/fuels-ts/blob/4803e6df/packages/contract/src/contract-factory.ts#L33)

___

### bytecode

• **bytecode**: `BytesLike`

#### Defined in

[contract-factory.ts:30](https://github.com/FuelLabs/fuels-ts/blob/4803e6df/packages/contract/src/contract-factory.ts#L30)

___

### interface

• **interface**: `Interface`&lt;`JsonAbi`\>

#### Defined in

[contract-factory.ts:31](https://github.com/FuelLabs/fuels-ts/blob/4803e6df/packages/contract/src/contract-factory.ts#L31)

___

### provider

• **provider**: ``null`` \| [`Provider`](/api/Providers/Provider.md)

#### Defined in

[contract-factory.ts:32](https://github.com/FuelLabs/fuels-ts/blob/4803e6df/packages/contract/src/contract-factory.ts#L32)

## Methods

### connect

▸ **connect**(`provider`): [`ContractFactory`](/api/Contract/ContractFactory.md)

Connect the factory to a provider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `provider` | ``null`` \| [`Provider`](/api/Providers/Provider.md) | The provider to be associated with the factory. |

#### Returns

[`ContractFactory`](/api/Contract/ContractFactory.md)

A new ContractFactory instance.

#### Defined in

[contract-factory.ts:84](https://github.com/FuelLabs/fuels-ts/blob/4803e6df/packages/contract/src/contract-factory.ts#L84)

___

### createTransactionRequest

▸ **createTransactionRequest**(`deployContractOptions?`): `Object`

Create a transaction request to deploy a contract with the specified options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deployContractOptions?` | [`DeployContractOptions`](/api/Contract/index.md#deploycontractoptions) | Options for deploying the contract. |

#### Returns

`Object`

The CreateTransactionRequest object for deploying the contract.

| Name | Type |
| :------ | :------ |
| `contractId` | `string` |
| `transactionRequest` | [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md) |

#### Defined in

[contract-factory.ts:94](https://github.com/FuelLabs/fuels-ts/blob/4803e6df/packages/contract/src/contract-factory.ts#L94)

___

### deployContract

▸ **deployContract**(`deployContractOptions?`): `Promise`&lt;[`Contract`](/api/Program/Contract.md)\>

Deploy a contract with the specified options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deployContractOptions` | [`DeployContractOptions`](/api/Contract/index.md#deploycontractoptions) | Options for deploying the contract. |

#### Returns

`Promise`&lt;[`Contract`](/api/Program/Contract.md)\>

A promise that resolves to the deployed contract instance.

#### Defined in

[contract-factory.ts:131](https://github.com/FuelLabs/fuels-ts/blob/4803e6df/packages/contract/src/contract-factory.ts#L131)

___

### setConfigurableConstants

▸ **setConfigurableConstants**(`configurableConstants`): `void`

Set configurable constants of the contract with the specified values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configurableConstants` | `Object` | An object containing configurable names and their values. |

#### Returns

`void`

#### Defined in

[contract-factory.ts:155](https://github.com/FuelLabs/fuels-ts/blob/4803e6df/packages/contract/src/contract-factory.ts#L155)
