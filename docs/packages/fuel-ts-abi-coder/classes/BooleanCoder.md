---
layout: default
title: BooleanCoder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: BooleanCoder

[@fuel-ts/abi-coder](../index.md).BooleanCoder

## Hierarchy

- [`Coder`](Coder.md)<`boolean`, `boolean`\>

  ↳ **`BooleanCoder`**

## Constructors

### constructor

• **new BooleanCoder**()

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

#### Defined in

[packages/abi-coder/src/coders/boolean.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/boolean.ts#L7)

## Properties

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

[Coder](Coder.md).[encodedLength](Coder.md#encodedlength)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L34)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Coder](Coder.md).[name](Coder.md#name)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L32)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](Coder.md).[type](Coder.md#type)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L33)

## Methods

### decode

▸ **decode**(`data`, `offset`): [`boolean`, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[`boolean`, `number`]

#### Overrides

[Coder](Coder.md).[decode](Coder.md#decode)

#### Defined in

[packages/abi-coder/src/coders/boolean.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/boolean.ts#L26)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`Uint8Array`

#### Overrides

[Coder](Coder.md).[encode](Coder.md#encode)

#### Defined in

[packages/abi-coder/src/coders/boolean.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/boolean.ts#L11)

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

[Coder](Coder.md).[throwError](Coder.md#throwerror)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L42)
