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

• **new ContractFactory**(`bytecode`, `abi`, `signerOrProvider?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `bytecode` | `BytesLike` | `undefined` |
| `abi` | readonly [`JsonFragment`](../../fuel-ts-abi-coder/interfaces/JsonFragment.md)[] \| `default` | `undefined` |
| `signerOrProvider` | ``null`` \| `default` | `null` |

#### Defined in

[contract/src/contract-factory.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L18)

## Properties

### bytecode

• **bytecode**: `BytesLike`

#### Defined in

[contract/src/contract-factory.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L14)

___

### interface

• **interface**: `default`

#### Defined in

[contract/src/contract-factory.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L15)

___

### provider

• **provider**: ``null`` \| `default`

#### Defined in

[contract/src/contract-factory.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L16)

## Accessors

### genBytes32

• `get` **genBytes32**(): `string`

#### Returns

`string`

#### Defined in

[contract/src/contract-factory.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L37)

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

[contract/src/contract-factory.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L41)

___

### deployContract

▸ **deployContract**(): `Promise`<[`Contract`](Contract.md)\>

#### Returns

`Promise`<[`Contract`](Contract.md)\>

#### Defined in

[contract/src/contract-factory.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L45)
