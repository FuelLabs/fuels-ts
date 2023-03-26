---
layout: default
title: InputMessageCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: InputMessageCoder

[@fuel-ts/transactions](../index.md).InputMessageCoder

## Hierarchy

- [`Coder`](internal-Coder.md)<[`InputMessage`](../index.md#inputmessage), [`InputMessage`](../index.md#inputmessage)\>

  ↳ **`InputMessageCoder`**

## Constructors

### constructor

• **new InputMessageCoder**()

#### Overrides

[Coder](internal-Coder.md).[constructor](internal-Coder.md#constructor)

#### Defined in

[packages/transactions/src/coders/input.ts:234](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L234)

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

▸ **decode**(`data`, `offset`): [[`InputMessage`](../index.md#inputmessage), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`InputMessage`](../index.md#inputmessage), `number`]

#### Overrides

[Coder](internal-Coder.md).[decode](internal-Coder.md#decode)

#### Defined in

[packages/transactions/src/coders/input.ts:277](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L277)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputMessage`](../index.md#inputmessage) |

#### Returns

`Uint8Array`

#### Overrides

[Coder](internal-Coder.md).[encode](internal-Coder.md#encode)

#### Defined in

[packages/transactions/src/coders/input.ts:249](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L249)

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

___

### decodeData

▸ `Static` **decodeData**(`messageData`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageData` | `BytesLike` |

#### Returns

`Uint8Array`

#### Defined in

[packages/transactions/src/coders/input.ts:269](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L269)

___

### getMessageId

▸ `Static` **getMessageId**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputMessage`](../index.md#inputmessage) |

#### Returns

`string`

#### Defined in

[packages/transactions/src/coders/input.ts:238](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L238)
