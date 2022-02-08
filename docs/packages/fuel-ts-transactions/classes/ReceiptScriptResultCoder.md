---
layout: default
title: ReceiptScriptResultCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: ReceiptScriptResultCoder

[@fuel-ts/transactions](../index.md).ReceiptScriptResultCoder

## Hierarchy

- `default`

  ↳ **`ReceiptScriptResultCoder`**

## Constructors

### constructor

• **new ReceiptScriptResultCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/receipt.ts:623](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L623)

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

▸ **decode**(`data`, `offset`): [[`ReceiptScriptResult`](../index.md#receiptscriptresult), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`ReceiptScriptResult`](../index.md#receiptscriptresult), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/receipt.ts:636](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L636)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ReceiptScriptResult`](../index.md#receiptscriptresult) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/receipt.ts:627](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L627)

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
