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

• **new ContractFactory**(`bytecode`, `abi`, `walletOrProvider?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `bytecode` | `BytesLike` | `undefined` |
| `abi` | [`JsonAbi`](../namespaces/internal.md#jsonabi) \| `default` | `undefined` |
| `walletOrProvider` | ``null`` \| `default` \| [`BaseWalletLocked`](internal-BaseWalletLocked.md) | `null` |

#### Defined in

[packages/contract/src/contracts/contract-factory.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L32)

## Properties

### bytecode

• **bytecode**: `BytesLike`

#### Defined in

[packages/contract/src/contracts/contract-factory.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L27)

___

### interface

• **interface**: `default`

#### Defined in

[packages/contract/src/contracts/contract-factory.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L28)

___

### provider

• **provider**: ``null`` \| `default`

#### Defined in

[packages/contract/src/contracts/contract-factory.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L29)

___

### wallet

• **wallet**: ``null`` \| [`BaseWalletLocked`](internal-BaseWalletLocked.md)

#### Defined in

[packages/contract/src/contracts/contract-factory.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L30)

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

[packages/contract/src/contracts/contract-factory.ts:68](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L68)

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

[packages/contract/src/contracts/contract-factory.ts:72](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L72)

___

### deployContract

▸ **deployContract**(`deployContractOptions?`): `Promise`<[`Contract`](Contract.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployContractOptions?` | [`DeployContractOptions`](../namespaces/internal.md#deploycontractoptions) |

#### Returns

`Promise`<[`Contract`](Contract.md)\>

#### Defined in

[packages/contract/src/contracts/contract-factory.ts:103](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L103)
