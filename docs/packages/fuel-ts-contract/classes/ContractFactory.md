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

[contract/src/contract-factory.ts:17](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract-factory.ts#L17)

## Properties

### bytecode

• **bytecode**: `BytesLike`

#### Defined in

[contract/src/contract-factory.ts:13](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract-factory.ts#L13)

___

### interface

• **interface**: `default`

#### Defined in

[contract/src/contract-factory.ts:14](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract-factory.ts#L14)

___

### provider

• **provider**: ``null`` \| `default`

#### Defined in

[contract/src/contract-factory.ts:15](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract-factory.ts#L15)

## Accessors

### genBytes32

• `get` **genBytes32**(): `string`

#### Returns

`string`

#### Defined in

[contract/src/contract-factory.ts:36](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract-factory.ts#L36)

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

[contract/src/contract-factory.ts:40](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract-factory.ts#L40)

___

### deployContract

▸ **deployContract**(): `Promise`<[`Contract`](Contract.md)\>

#### Returns

`Promise`<[`Contract`](Contract.md)\>

#### Defined in

[contract/src/contract-factory.ts:44](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract-factory.ts#L44)
