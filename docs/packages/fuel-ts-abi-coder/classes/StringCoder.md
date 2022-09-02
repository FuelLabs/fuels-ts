---
layout: default
title: StringCoder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: StringCoder<TLength\>

[@fuel-ts/abi-coder](../index.md).StringCoder

## Type parameters

| Name | Type |
| :------ | :------ |
| `TLength` | extends `number` = `number` |

## Hierarchy

- [`Coder`](Coder.md)<`string`, `string`\>

  ↳ **`StringCoder`**

## Constructors

### constructor

• **new StringCoder**<`TLength`\>(`length`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TLength` | extends `number` = `number` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `length` | `TLength` |

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

#### Defined in

[packages/abi-coder/src/coders/string.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/string.ts#L10)

## Properties

### #paddingLength

• `Private` **#paddingLength**: `number`

#### Defined in

[packages/abi-coder/src/coders/string.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/string.ts#L8)

___

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

[Coder](Coder.md).[encodedLength](Coder.md#encodedlength)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L34)

___

### length

• **length**: `TLength`

#### Defined in

[packages/abi-coder/src/coders/string.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/string.ts#L7)

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

[packages/abi-coder/src/coders/string.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/string.ts#L24)

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

[packages/abi-coder/src/coders/string.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/string.ts#L18)

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
