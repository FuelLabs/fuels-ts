---
layout: default
title: OutputChangeCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputChangeCoder

[@fuel-ts/transactions](../index.md).OutputChangeCoder

## Hierarchy

- `default`<[`OutputChange`](../index.md#outputchange), [`OutputChange`](../index.md#outputchange)\>

  ↳ **`OutputChangeCoder`**

## Constructors

### constructor

• **new OutputChangeCoder**()

#### Overrides

Coder&lt;OutputChange, OutputChange\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/output.ts:164](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L164)

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

▸ **decode**(`data`, `offset`): [[`OutputChange`](../index.md#outputchange), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`OutputChange`](../index.md#outputchange), `number`]

#### Overrides

Coder.decode

#### Defined in

[packages/transactions/src/coders/output.ts:178](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L178)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`OutputChange`](../index.md#outputchange) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[packages/transactions/src/coders/output.ts:168](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L168)

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
