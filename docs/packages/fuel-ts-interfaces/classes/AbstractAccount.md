---
layout: default
title: AbstractAccount
parent: "@fuel-ts/interfaces"
nav_order: 1

---

# Class: AbstractAccount

[@fuel-ts/interfaces](../index.md).AbstractAccount

## Constructors

### constructor

• **new AbstractAccount**()

## Properties

### address

• `Abstract` **address**: [`AbstractAddress`](AbstractAddress.md)

#### Defined in

[packages/interfaces/src/index.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L25)

___

### provider

• `Abstract` **provider**: `unknown`

#### Defined in

[packages/interfaces/src/index.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L26)

## Methods

### getResourcesToSpend

▸ `Abstract` **getResourcesToSpend**(`quantities`, `options?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `quantities` | `any`[] |
| `options?` | `any` |

#### Returns

`any`

#### Defined in

[packages/interfaces/src/index.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L27)

___

### sendTransaction

▸ `Abstract` **sendTransaction**(`transactionRequest`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | `any` |

#### Returns

`any`

#### Defined in

[packages/interfaces/src/index.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L28)

___

### simulateTransaction

▸ `Abstract` **simulateTransaction**(`transactionRequest`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | `any` |

#### Returns

`any`

#### Defined in

[packages/interfaces/src/index.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L29)
