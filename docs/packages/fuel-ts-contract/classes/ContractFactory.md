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
| `walletOrProvider` | ``null`` \| `default` \| `default` | `null` |

#### Defined in

[packages/contract/src/contracts/contract-factory.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L30)

## Properties

### bytecode

• **bytecode**: `BytesLike`

#### Defined in

[packages/contract/src/contracts/contract-factory.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L25)

___

### interface

• **interface**: `default`

#### Defined in

[packages/contract/src/contracts/contract-factory.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L26)

___

### provider

• **provider**: ``null`` \| `default`

#### Defined in

[packages/contract/src/contracts/contract-factory.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L27)

___

### wallet

• **wallet**: ``null`` \| `default`

#### Defined in

[packages/contract/src/contracts/contract-factory.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L28)

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

[packages/contract/src/contracts/contract-factory.ts:55](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L55)

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

[packages/contract/src/contracts/contract-factory.ts:59](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L59)
