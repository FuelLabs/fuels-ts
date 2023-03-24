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

[packages/providers/src/transaction-request/transaction-request.ts:104](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L104)

## Properties

### name

• **name**: `string` = `'NoWitnessByOwnerError'`

#### Overrides

Error.name

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:103](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L103)

___

### owner

• `Readonly` **owner**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:104](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L104)
