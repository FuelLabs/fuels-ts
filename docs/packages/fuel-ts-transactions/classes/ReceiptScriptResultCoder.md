---
layout: default
title: ReceiptScriptResultCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: ReceiptScriptResultCoder

[@fuel-ts/transactions](../index.md).ReceiptScriptResultCoder

## Hierarchy

- `default`<[`ReceiptScriptResult`](../index.md#receiptscriptresult), [`ReceiptScriptResult`](../index.md#receiptscriptresult)\>

  ↳ **`ReceiptScriptResultCoder`**

## Constructors

### constructor

• **new ReceiptScriptResultCoder**()

#### Overrides

Coder&lt;ReceiptScriptResult, ReceiptScriptResult\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/receipt.ts:622](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L622)

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

[packages/transactions/src/coders/receipt.ts:635](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L635)

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

[packages/transactions/src/coders/receipt.ts:626](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L626)

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
