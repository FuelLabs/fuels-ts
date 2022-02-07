---
layout: default
title: ReceiptTransferOutCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: ReceiptTransferOutCoder

[@fuel-ts/transactions](../index.md).ReceiptTransferOutCoder

## Hierarchy

- `default`

  ↳ **`ReceiptTransferOutCoder`**

## Constructors

### constructor

• **new ReceiptTransferOutCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/receipt.ts:565](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/receipt.ts#L565)

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

▸ **decode**(`data`, `offset`): [[`ReceiptTransferOut`](../index.md#receipttransferout), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`ReceiptTransferOut`](../index.md#receipttransferout), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/receipt.ts:582](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/receipt.ts#L582)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ReceiptTransferOut`](../index.md#receipttransferout) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/receipt.ts:569](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/receipt.ts#L569)

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
