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
| `owner` | `string` |

#### Overrides

Error.constructor

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:71](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L71)

## Properties

### name

• **name**: `string` = `'NoWitnessByOwnerError'`

#### Overrides

Error.name

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:70](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L70)

___

### owner

• `Readonly` **owner**: `string`
