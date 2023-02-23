---
layout: default
title: ContractFactory
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: ContractFactory

[@fuel-ts/contract](../index.md).ContractFactory

## Constructors

### constructor

• **new ContractFactory**(`bytecode`, `abi`, `accountOrProvider?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `bytecode` | `BytesLike` | `undefined` |
| `abi` | [`JsonAbi`](../namespaces/internal.md#jsonabi) \| `default` | `undefined` |
| `accountOrProvider` | ``null`` \| `default` \| [`Account`](internal-Account.md) | `null` |

#### Defined in

[packages/contract/src/contract-factory.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L31)

## Properties

### account

• **account**: ``null`` \| [`Account`](internal-Account.md)

#### Defined in

[packages/contract/src/contract-factory.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L29)

___

### bytecode

• **bytecode**: `BytesLike`

#### Defined in

[packages/contract/src/contract-factory.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L26)

___

### interface

• **interface**: `default`

#### Defined in

[packages/contract/src/contract-factory.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L27)

___

### provider

• **provider**: ``null`` \| `default`

#### Defined in

[packages/contract/src/contract-factory.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L28)

## Methods

### connect

▸ **connect**(`provider`): [`ContractFactory`](ContractFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | ``null`` \| `default` |

#### Returns

[`ContractFactory`](ContractFactory.md)

#### Defined in

[packages/contract/src/contract-factory.ts:67](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L67)

___

### createTransactionRequest

▸ **createTransactionRequest**(`deployContractOptions?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContractOptions?` | [`DeployContractOptions`](../namespaces/internal.md#deploycontractoptions) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `contractId` | `string` |
| `transactionRequest` | [`CreateTransactionRequest`](internal-CreateTransactionRequest.md) |

#### Defined in

[packages/contract/src/contract-factory.ts:71](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L71)

___

### deployContract

▸ **deployContract**(`deployContractOptions?`): `Promise`<`default`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContractOptions?` | [`DeployContractOptions`](../namespaces/internal.md#deploycontractoptions) |

#### Returns

`Promise`<`default`\>

#### Defined in

[packages/contract/src/contract-factory.ts:102](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L102)
