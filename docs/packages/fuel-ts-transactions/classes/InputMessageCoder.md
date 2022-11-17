---
layout: default
title: InputMessageCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: InputMessageCoder

[@fuel-ts/transactions](../index.md).InputMessageCoder

## Hierarchy

- `default`<[`InputMessage`](../index.md#inputmessage), [`InputMessage`](../index.md#inputmessage)\>

  ↳ **`InputMessageCoder`**

## Constructors

### constructor

• **new InputMessageCoder**()

#### Overrides

Coder&lt;InputMessage, InputMessage\&gt;.constructor

## Properties

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

Coder.encodedLength

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L36)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

Coder.name

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L34)

___

### offset

• `Optional` **offset**: `number`

#### Inherited from

Coder.offset

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L37)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

Coder.type

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L35)

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

Coder.decode

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

Coder.encode

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

Coder.setOffset

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

___

### decodeData

▸ `Static` **decodeData**(`messageData`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageData` | `number`[] |

#### Returns

`number`[]

___

### getMessageId

▸ `Static` **getMessageId**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputMessage`](../index.md#inputmessage) |

#### Returns

`string`
