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
| `abi` | [`Interface`](internal-Interface.md) \| [`JsonAbi`](../namespaces/internal.md#jsonabi) | `undefined` |
| `accountOrProvider` | ``null`` \| [`Provider`](internal-Provider.md) \| [`Account`](internal-Account.md) | `null` |

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

• **interface**: [`Interface`](internal-Interface.md)

#### Defined in

[packages/contract/src/contract-factory.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L27)

___

### provider

• **provider**: ``null`` \| [`Provider`](internal-Provider.md)

#### Defined in

[packages/contract/src/contract-factory.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L28)

## Methods

### connect

▸ **connect**(`provider`): [`ContractFactory`](ContractFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | ``null`` \| [`Provider`](internal-Provider.md) |

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

▸ **deployContract**(`deployContractOptions?`): `Promise`<[`Contract`](internal-Contract.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContractOptions?` | [`DeployContractOptions`](../namespaces/internal.md#deploycontractoptions) |

#### Returns

`Promise`<[`Contract`](internal-Contract.md)\>

#### Defined in

[packages/contract/src/contract-factory.ts:102](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L102)
