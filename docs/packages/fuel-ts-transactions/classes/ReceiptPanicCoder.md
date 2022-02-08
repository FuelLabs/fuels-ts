---
layout: default
title: ReceiptPanicCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: ReceiptPanicCoder

[@fuel-ts/transactions](../index.md).ReceiptPanicCoder

## Hierarchy

- `default`

  ↳ **`ReceiptPanicCoder`**

## Constructors

### constructor

• **new ReceiptPanicCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/receipt.ts:237](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L237)

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

▸ **decode**(`data`, `offset`): [[`ReceiptPanic`](../index.md#receiptpanic), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`ReceiptPanic`](../index.md#receiptpanic), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/receipt.ts:252](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L252)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ReceiptPanic`](../index.md#receiptpanic) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/receipt.ts:241](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L241)

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
