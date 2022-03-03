---
layout: default
title: TransactionScriptCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: TransactionScriptCoder

[@fuel-ts/transactions](../index.md).TransactionScriptCoder

## Hierarchy

- `default`

  ↳ **`TransactionScriptCoder`**

## Constructors

### constructor

• **new TransactionScriptCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/transaction.ts:57](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L57)

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

▸ **decode**(`data`, `offset`): [[`TransactionScript`](../index.md#transactionscript), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`TransactionScript`](../index.md#transactionscript), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/transaction.ts:97](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L97)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TransactionScript`](../index.md#transactionscript) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/transaction.ts:61](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L61)

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
