---
layout: default
title: ReceiptReturnDataCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: ReceiptReturnDataCoder

[@fuel-ts/transactions](../index.md).ReceiptReturnDataCoder

## Hierarchy

- `default`

  ↳ **`ReceiptReturnDataCoder`**

## Constructors

### constructor

• **new ReceiptReturnDataCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/receipt.ts:175](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/receipt.ts#L175)

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

▸ **decode**(`data`, `offset`): [[`ReceiptReturnData`](../index.md#receiptreturndata), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`ReceiptReturnData`](../index.md#receiptreturndata), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/receipt.ts:192](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/receipt.ts#L192)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ReceiptReturnData`](../index.md#receiptreturndata) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/receipt.ts:179](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/receipt.ts#L179)

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
