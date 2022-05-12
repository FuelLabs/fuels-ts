---
layout: default
title: StringCoder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: StringCoder

[@fuel-ts/abi-coder](../index.md).StringCoder

## Hierarchy

- [`Coder`](Coder.md)

  ↳ **`StringCoder`**

## Constructors

### constructor

• **new StringCoder**(`localName`, `length`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |
| `length` | `number` |

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

#### Defined in

[packages/abi-coder/src/coders/string.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/string.ts#L9)

## Properties

### length

• **length**: `number`

#### Defined in

[packages/abi-coder/src/coders/string.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/string.ts#L7)

___

### localName

• `Readonly` **localName**: `string`

#### Inherited from

[Coder](Coder.md).[localName](Coder.md#localname)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L38)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Coder](Coder.md).[name](Coder.md#name)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L30)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](Coder.md).[type](Coder.md#type)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L34)

## Methods

### decode

▸ **decode**(`data`, `offset`): [`string`, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[`string`, `number`]

#### Overrides

[Coder](Coder.md).[decode](Coder.md#decode)

#### Defined in

[packages/abi-coder/src/coders/string.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/string.ts#L21)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`Uint8Array`

#### Overrides

[Coder](Coder.md).[encode](Coder.md#encode)

#### Defined in

[packages/abi-coder/src/coders/string.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/string.ts#L14)

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

[Coder](Coder.md).[throwError](Coder.md#throwerror)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L47)
