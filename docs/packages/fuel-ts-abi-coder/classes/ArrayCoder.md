---
layout: default
title: ArrayCoder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: ArrayCoder

[@fuel-ts/abi-coder](../index.md).ArrayCoder

## Hierarchy

- [`Coder`](Coder.md)

  ↳ **`ArrayCoder`**

## Constructors

### constructor

• **new ArrayCoder**(`coder`, `length`, `localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `coder` | [`Coder`](Coder.md) |
| `length` | `number` |
| `localName` | `string` |

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

#### Defined in

[abi-coder/src/coders/array.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L12)

## Properties

### coder

• **coder**: [`Coder`](Coder.md)

#### Defined in

[abi-coder/src/coders/array.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L8)

___

### length

• **length**: `number`

#### Defined in

[abi-coder/src/coders/array.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L10)

___

### localName

• `Readonly` **localName**: `string`

#### Inherited from

[Coder](Coder.md).[localName](Coder.md#localname)

#### Defined in

[abi-coder/src/coders/abstract-coder.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L36)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Coder](Coder.md).[name](Coder.md#name)

#### Defined in

[abi-coder/src/coders/abstract-coder.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L28)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](Coder.md).[type](Coder.md#type)

#### Defined in

[abi-coder/src/coders/abstract-coder.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L32)

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`DecodedValue`](../index.md#decodedvalue), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`DecodedValue`](../index.md#decodedvalue), `number`]

#### Overrides

[Coder](Coder.md).[decode](Coder.md#decode)

#### Defined in

[abi-coder/src/coders/array.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L36)

___

### encode

▸ **encode**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| [`Values`](../index.md#values)[] |

#### Returns

`any`

#### Overrides

[Coder](Coder.md).[encode](Coder.md#encode)

#### Defined in

[abi-coder/src/coders/array.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L20)

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

[abi-coder/src/coders/abstract-coder.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L45)
