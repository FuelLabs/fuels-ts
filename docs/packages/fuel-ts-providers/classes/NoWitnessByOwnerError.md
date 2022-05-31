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

[packages/providers/src/transaction-request/transaction-request.ts:80](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L80)

## Properties

### name

• **name**: `string` = `'NoWitnessByOwnerError'`

#### Overrides

Error.name

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:79](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L79)

___

### owner

• `Readonly` **owner**: `string`
