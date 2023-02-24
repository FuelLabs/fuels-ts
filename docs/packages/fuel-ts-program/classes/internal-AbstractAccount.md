---
layout: default
title: AbstractAccount
parent: "@fuel-ts/program"
nav_order: 1

---

# Class: AbstractAccount

[@fuel-ts/program](../index.md).[internal](../namespaces/internal.md).AbstractAccount

## Hierarchy

- **`AbstractAccount`**

  ↳ [`Account`](internal-Account.md)

## Constructors

### constructor

• **new AbstractAccount**()

## Properties

### address

• `Abstract` **address**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Defined in

[packages/interfaces/src/index.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L26)

___

### provider

• `Abstract` **provider**: `unknown`

#### Defined in

[packages/interfaces/src/index.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L27)

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

[packages/interfaces/src/index.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L28)

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

[packages/interfaces/src/index.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L29)

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

[packages/interfaces/src/index.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L30)
