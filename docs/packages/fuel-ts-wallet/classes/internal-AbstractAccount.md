---
layout: default
title: AbstractAccount
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: AbstractAccount

[@fuel-ts/wallet](../index.md).[internal](../namespaces/internal.md).AbstractAccount

## Hierarchy

- **`AbstractAccount`**

  ↳ [`Account`](Account.md)

## Constructors

### constructor

• **new AbstractAccount**()

## Properties

### address

• `Abstract` **address**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Defined in

packages/interfaces/dist/index.d.ts:17

___

### provider

• `Abstract` **provider**: `unknown`

#### Defined in

packages/interfaces/dist/index.d.ts:18

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

packages/interfaces/dist/index.d.ts:19

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

packages/interfaces/dist/index.d.ts:20

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

packages/interfaces/dist/index.d.ts:21
