---
layout: default
title: ReceiptTransferCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: ReceiptTransferCoder

[@fuel-ts/transactions](../index.md).ReceiptTransferCoder

## Hierarchy

- [`Coder`](internal-Coder.md)<[`ReceiptTransfer`](../index.md#receipttransfer), [`ReceiptTransfer`](../index.md#receipttransfer)\>

  ↳ **`ReceiptTransferCoder`**

## Constructors

### constructor

• **new ReceiptTransferCoder**()

#### Overrides

[Coder](internal-Coder.md).[constructor](internal-Coder.md#constructor)

#### Defined in

[packages/transactions/src/coders/receipt.ts:508](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L508)

## Properties

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

[Coder](internal-Coder.md).[encodedLength](internal-Coder.md#encodedlength)

#### Defined in

packages/abi-coder/dist/index.d.ts:42

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Coder](internal-Coder.md).[name](internal-Coder.md#name)

#### Defined in

packages/abi-coder/dist/index.d.ts:40

___

### offset

• `Optional` **offset**: `number`

#### Inherited from

[Coder](internal-Coder.md).[offset](internal-Coder.md#offset)

#### Defined in

packages/abi-coder/dist/index.d.ts:43

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](internal-Coder.md).[type](internal-Coder.md#type)

#### Defined in

packages/abi-coder/dist/index.d.ts:41

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

[Coder](internal-Coder.md).[decode](internal-Coder.md#decode)

#### Defined in

[packages/transactions/src/coders/receipt.ts:525](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L525)

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

[Coder](internal-Coder.md).[encode](internal-Coder.md#encode)

#### Defined in

[packages/transactions/src/coders/receipt.ts:512](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L512)

___

### setOffset

▸ **setOffset**(`offset`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `number` |

#### Returns

`void`

#### Inherited from

[Coder](internal-Coder.md).[setOffset](internal-Coder.md#setoffset)

#### Defined in

packages/abi-coder/dist/index.d.ts:46

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

[Coder](internal-Coder.md).[throwError](internal-Coder.md#throwerror)

#### Defined in

packages/abi-coder/dist/index.d.ts:45
