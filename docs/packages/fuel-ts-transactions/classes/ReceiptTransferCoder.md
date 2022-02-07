---
layout: default
title: ReceiptTransferCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: ReceiptTransferCoder

[@fuel-ts/transactions](../index.md).ReceiptTransferCoder

## Hierarchy

- `default`

  ↳ **`ReceiptTransferCoder`**

## Constructors

### constructor

• **new ReceiptTransferCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/receipt.ts:499](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/receipt.ts#L499)

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

▸ **decode**(`data`, `offset`): [[`ReceiptTransfer`](../index.md#receipttransfer), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`ReceiptTransfer`](../index.md#receipttransfer), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/receipt.ts:516](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/receipt.ts#L516)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ReceiptTransfer`](../index.md#receipttransfer) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/receipt.ts:503](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/receipt.ts#L503)

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
