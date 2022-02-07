---
layout: default
title: TransactionCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: TransactionCoder

[@fuel-ts/transactions](../index.md).TransactionCoder

## Hierarchy

- `default`

  ↳ **`TransactionCoder`**

## Constructors

### constructor

• **new TransactionCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/transaction.ts:325](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/transaction.ts#L325)

## Properties

### localName

• `Readonly` **localName**: `string`

#### Inherited from

Coder.localName

#### Defined in

abi-coder/dist/coders/abstract-coder.d.ts:12

___

### name

• `Readonly` **name**: `string`

#### Inherited from

Coder.name

#### Defined in

abi-coder/dist/coders/abstract-coder.d.ts:10

___

### type

• `Readonly` **type**: `string`

#### Inherited from

Coder.type

#### Defined in

abi-coder/dist/coders/abstract-coder.d.ts:11

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`Transaction`](../index.md#transaction), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`Transaction`](../index.md#transaction), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/transaction.ts:350](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/transaction.ts#L350)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Transaction`](../index.md#transaction) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/transaction.ts:329](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/transaction.ts#L329)

___

### throwError

▸ **throwError**(`message`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `value` | `unknown` |

#### Returns

`void`

#### Inherited from

Coder.throwError

#### Defined in

abi-coder/dist/coders/abstract-coder.d.ts:14
