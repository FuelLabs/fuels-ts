---
layout: default
title: InputCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: InputCoder

[@fuel-ts/transactions](../index.md).InputCoder

## Hierarchy

- `default`<[`Input`](../index.md#input), [`Input`](../index.md#input)\>

  ↳ **`InputCoder`**

## Constructors

### constructor

• **new InputCoder**()

#### Overrides

Coder&lt;Input, Input\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/input.ts:167](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L167)

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

### type

• `Readonly` **type**: `string`

#### Inherited from

Coder.type

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L35)

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`Input`](../index.md#input), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`Input`](../index.md#input), `number`]

#### Overrides

Coder.decode

#### Defined in

[packages/transactions/src/coders/input.ts:192](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L192)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Input`](../index.md#input) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[packages/transactions/src/coders/input.ts:171](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L171)

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

[packages/abi-coder/src/coders/abstract-coder.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L44)
