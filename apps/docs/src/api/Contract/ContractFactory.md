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
| `bytecode` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `undefined` | The bytecode of the contract. |
| `abi` | `JsonAbi` \| `Interface`&lt;`JsonAbi`\> | `undefined` | The contract's ABI (Application Binary Interface). |
| `accountOrProvider` | ``null`` \| [`Provider`](/api/Account/Provider.md) \| [`Account`](/api/Account/Account.md) | `null` | An account or provider to be associated with the factory. |

#### Returns

[`ContractFactory`](/api/Contract/ContractFactory.md)

#### Defined in

[contract-factory.ts:60](https://github.com/FuelLabs/fuels-ts/blob/b2e1be607ab99b238da6db64c8e1c10470e15f39/packages/contract/src/contract-factory.ts#L60)

## Properties

### account

• **account**: ``null`` \| [`Account`](/api/Account/Account.md)

#### Defined in

[contract-factory.ts:51](https://github.com/FuelLabs/fuels-ts/blob/b2e1be607ab99b238da6db64c8e1c10470e15f39/packages/contract/src/contract-factory.ts#L51)

___

### bytecode

• **bytecode**: [`BytesLike`](/api/Interfaces/index.md#byteslike)

#### Defined in

[contract-factory.ts:48](https://github.com/FuelLabs/fuels-ts/blob/b2e1be607ab99b238da6db64c8e1c10470e15f39/packages/contract/src/contract-factory.ts#L48)

___

### interface

• **interface**: `Interface`&lt;`JsonAbi`\>

#### Defined in

[contract-factory.ts:49](https://github.com/FuelLabs/fuels-ts/blob/b2e1be607ab99b238da6db64c8e1c10470e15f39/packages/contract/src/contract-factory.ts#L49)

___

### provider

• **provider**: ``null`` \| [`Provider`](/api/Account/Provider.md)

#### Defined in

[contract-factory.ts:50](https://github.com/FuelLabs/fuels-ts/blob/b2e1be607ab99b238da6db64c8e1c10470e15f39/packages/contract/src/contract-factory.ts#L50)

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

[contract-factory.ts:102](https://github.com/FuelLabs/fuels-ts/blob/b2e1be607ab99b238da6db64c8e1c10470e15f39/packages/contract/src/contract-factory.ts#L102)

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

[contract-factory.ts:112](https://github.com/FuelLabs/fuels-ts/blob/b2e1be607ab99b238da6db64c8e1c10470e15f39/packages/contract/src/contract-factory.ts#L112)

___

### deployContract

▸ **deployContract**&lt;`TContract`\>(`deployContractOptions?`): `Promise`&lt;[`DeployContractResult`](/api/Contract/index.md#deploycontractresult)&lt;`TContract`\>\>

Deploy a contract with the specified options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TContract` | extends [`Contract`](/api/Program/Contract.md) = [`Contract`](/api/Program/Contract.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deployContractOptions` | [`DeployContractOptions`](/api/Contract/index.md#deploycontractoptions) | Options for deploying the contract. |

#### Returns

`Promise`&lt;[`DeployContractResult`](/api/Contract/index.md#deploycontractresult)&lt;`TContract`\>\>

A promise that resolves to the deployed contract instance.

#### Defined in

[contract-factory.ts:154](https://github.com/FuelLabs/fuels-ts/blob/b2e1be607ab99b238da6db64c8e1c10470e15f39/packages/contract/src/contract-factory.ts#L154)

___

### getAccount

▸ **getAccount**(): [`Account`](/api/Account/Account.md)

#### Returns

[`Account`](/api/Account/Account.md)

#### Defined in

[contract-factory.ts:216](https://github.com/FuelLabs/fuels-ts/blob/b2e1be607ab99b238da6db64c8e1c10470e15f39/packages/contract/src/contract-factory.ts#L216)

___

### prepareDeploy

▸ **prepareDeploy**(`deployContractOptions`): `Promise`&lt;{ `contractId`: `string` ; `transactionRequest`: [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContractOptions` | [`DeployContractOptions`](/api/Contract/index.md#deploycontractoptions) |

#### Returns

`Promise`&lt;{ `contractId`: `string` ; `transactionRequest`: [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)  }\>

#### Defined in

[contract-factory.ts:223](https://github.com/FuelLabs/fuels-ts/blob/b2e1be607ab99b238da6db64c8e1c10470e15f39/packages/contract/src/contract-factory.ts#L223)

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

[contract-factory.ts:185](https://github.com/FuelLabs/fuels-ts/blob/b2e1be607ab99b238da6db64c8e1c10470e15f39/packages/contract/src/contract-factory.ts#L185)
