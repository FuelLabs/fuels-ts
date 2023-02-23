---
layout: default
title: NoWitnessByOwnerError
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: NoWitnessByOwnerError

[@fuel-ts/providers](../index.md).NoWitnessByOwnerError

## Hierarchy

- `Error`

  ↳ **`NoWitnessByOwnerError`**

## Constructors

### constructor

• **new NoWitnessByOwnerError**(`owner`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) |

#### Overrides

Error.constructor

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:109](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L109)

## Properties

### name

• **name**: `string` = `'NoWitnessByOwnerError'`

#### Overrides

Error.name

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:108](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L108)

___

### owner

• `Readonly` **owner**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:109](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L109)
