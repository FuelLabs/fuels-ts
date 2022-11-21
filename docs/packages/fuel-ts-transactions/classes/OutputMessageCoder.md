---
layout: default
title: OutputMessageCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputMessageCoder

[@fuel-ts/transactions](../index.md).OutputMessageCoder

## Hierarchy

- `default`<[`OutputMessage`](../index.md#outputmessage), [`OutputMessage`](../index.md#outputmessage)\>

  ↳ **`OutputMessageCoder`**

## Constructors

### constructor

• **new OutputMessageCoder**()

#### Overrides

Coder&lt;OutputMessage, OutputMessage\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/output.ts:120](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L120)

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

▸ **decode**(`data`, `offset`): [[`OutputMessage`](../index.md#outputmessage), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`OutputMessage`](../index.md#outputmessage), `number`]

#### Overrides

Coder.decode

#### Defined in

[packages/transactions/src/coders/output.ts:133](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L133)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`OutputMessage`](../index.md#outputmessage) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[packages/transactions/src/coders/output.ts:124](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L124)

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

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:52](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L52)

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

[packages/abi-coder/src/coders/abstract-coder.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L45)
