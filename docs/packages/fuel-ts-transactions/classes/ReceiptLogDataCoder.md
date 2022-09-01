---
layout: default
title: ReceiptLogDataCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: ReceiptLogDataCoder

[@fuel-ts/transactions](../index.md).ReceiptLogDataCoder

## Hierarchy

- `default`<[`ReceiptLogData`](../index.md#receiptlogdata), [`ReceiptLogData`](../index.md#receiptlogdata)\>

  ↳ **`ReceiptLogDataCoder`**

## Constructors

### constructor

• **new ReceiptLogDataCoder**()

#### Overrides

Coder&lt;ReceiptLogData, ReceiptLogData\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/receipt.ts:424](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L424)

## Properties

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

Coder.encodedLength

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L34)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

Coder.name

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L32)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

Coder.type

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L33)

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`ReceiptLogData`](../index.md#receiptlogdata), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`ReceiptLogData`](../index.md#receiptlogdata), `number`]

#### Overrides

Coder.decode

#### Defined in

[packages/transactions/src/coders/receipt.ts:443](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L443)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ReceiptLogData`](../index.md#receiptlogdata) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[packages/transactions/src/coders/receipt.ts:428](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L428)

___

### throwError

▸ **throwError**(`message`, `value`): `never`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `value` | `unknown` |

#### Returns

`never`

#### Inherited from

Coder.throwError

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L42)
