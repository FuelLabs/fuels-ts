---
layout: default
title: ChangeOutputCollisionError
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: ChangeOutputCollisionError

[@fuel-ts/providers](../index.md).ChangeOutputCollisionError

## Hierarchy

- `Error`

  ↳ **`ChangeOutputCollisionError`**

## Constructors

### constructor

• **new ChangeOutputCollisionError**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

Error.constructor

#### Defined in

node_modules/.pnpm/typescript@4.7.4/node_modules/typescript/lib/lib.es5.d.ts:1034

## Properties

### message

• **message**: `string` = `'A ChangeOutput with the same "assetId" already exists for a different "to" address'`

#### Overrides

Error.message

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:80](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L80)

___

### name

• **name**: `string` = `'ChangeOutputCollisionError'`

#### Overrides

Error.name

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:79](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L79)
