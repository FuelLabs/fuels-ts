# Class: ContractFactory

[@fuel-ts/contract](/api/Contract/index.md).ContractFactory

`ContractFactory` provides utilities for deploying and configuring contracts.

## Constructors

### constructor

• **new ContractFactory**(`bytecode`, `abi`, `accountOrProvider?`): [`ContractFactory`](/api/Contract/ContractFactory.md)

Create a ContractFactory instance.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bytecode` | `BytesLike` | `undefined` | The bytecode of the contract. |
| `abi` | `JsonAbi` \| `Interface`&lt;`JsonAbi`\> | `undefined` | The contract's ABI (Application Binary Interface). |
| `accountOrProvider` | ``null`` \| [`Provider`](/api/Account/Provider.md) \| [`Account`](/api/Account/Account.md) | `null` | An account or provider to be associated with the factory. |

#### Returns

[`ContractFactory`](/api/Contract/ContractFactory.md)

#### Defined in

[contract-factory.ts:39](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/contract/src/contract-factory.ts#L39)

## Properties

### account

• **account**: ``null`` \| [`Account`](/api/Account/Account.md)

#### Defined in

[contract-factory.ts:30](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/contract/src/contract-factory.ts#L30)

___

### bytecode

• **bytecode**: `BytesLike`

#### Defined in

[contract-factory.ts:27](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/contract/src/contract-factory.ts#L27)

___

### interface

• **interface**: `Interface`&lt;`JsonAbi`\>

#### Defined in

[contract-factory.ts:28](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/contract/src/contract-factory.ts#L28)

___

### provider

• **provider**: ``null`` \| [`Provider`](/api/Account/Provider.md)

#### Defined in

[contract-factory.ts:29](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/contract/src/contract-factory.ts#L29)

## Methods

### connect

▸ **connect**(`provider`): [`ContractFactory`](/api/Contract/ContractFactory.md)

Connect the factory to a provider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `provider` | [`Provider`](/api/Account/Provider.md) | The provider to be associated with the factory. |

#### Returns

[`ContractFactory`](/api/Contract/ContractFactory.md)

A new ContractFactory instance.

#### Defined in

[contract-factory.ts:81](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/contract/src/contract-factory.ts#L81)

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
| `transactionRequest` | [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md) |

#### Defined in

[contract-factory.ts:91](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/contract/src/contract-factory.ts#L91)

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

[contract-factory.ts:134](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/contract/src/contract-factory.ts#L134)

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

[contract-factory.ts:166](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/contract/src/contract-factory.ts#L166)
