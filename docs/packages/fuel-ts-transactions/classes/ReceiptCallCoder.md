---
layout: default
title: ReceiptCallCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: ReceiptCallCoder

[@fuel-ts/transactions](../index.md).ReceiptCallCoder

## Hierarchy

- `default`

  ↳ **`ReceiptCallCoder`**

## Constructors

### constructor

• **new ReceiptCallCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/receipt.ts:43](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/receipt.ts#L43)

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

▸ **decode**(`data`, `offset`): [[`ReceiptCall`](../index.md#receiptcall), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`ReceiptCall`](../index.md#receiptcall), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/receipt.ts:63](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/receipt.ts#L63)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ReceiptCall`](../index.md#receiptcall) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/receipt.ts:47](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/receipt.ts#L47)

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
