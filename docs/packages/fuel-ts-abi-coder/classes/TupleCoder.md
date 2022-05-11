---
layout: default
title: TupleCoder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: TupleCoder

[@fuel-ts/abi-coder](../index.md).TupleCoder

## Hierarchy

- [`Coder`](Coder.md)

  ↳ **`TupleCoder`**

## Constructors

### constructor

• **new TupleCoder**(`coders`, `localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `coders` | [`Coder`](Coder.md)[] |
| `localName` | `string` |

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

#### Defined in

[packages/abi-coder/src/coders/tuple.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/tuple.ts#L9)

## Properties

### coders

• **coders**: [`Coder`](Coder.md)[]

#### Defined in

[packages/abi-coder/src/coders/tuple.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/tuple.ts#L7)

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

▸ **decode**(`data`, `offset`): [[`DecodedValue`](../index.md#decodedvalue)[], `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`DecodedValue`](../index.md#decodedvalue)[], `number`]

#### Overrides

[Coder](Coder.md).[decode](Coder.md#decode)

#### Defined in

[packages/abi-coder/src/coders/tuple.ts:55](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/tuple.ts#L55)

___

### encode

▸ **encode**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Values`](../index.md#values)[] \| `Record`<`string`, `any`\> |

#### Returns

`any`

#### Overrides

[Coder](Coder.md).[encode](Coder.md#encode)

#### Defined in

[packages/abi-coder/src/coders/tuple.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/tuple.ts#L16)

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
