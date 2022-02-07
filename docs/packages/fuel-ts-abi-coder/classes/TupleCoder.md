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

[abi-coder/src/coders/tuple.ts:9](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/coders/tuple.ts#L9)

## Properties

### coders

• **coders**: [`Coder`](Coder.md)[]

#### Defined in

[abi-coder/src/coders/tuple.ts:7](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/coders/tuple.ts#L7)

___

### localName

• `Readonly` **localName**: `string`

#### Inherited from

[Coder](Coder.md).[localName](Coder.md#localname)

#### Defined in

[abi-coder/src/coders/abstract-coder.ts:36](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/coders/abstract-coder.ts#L36)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Coder](Coder.md).[name](Coder.md#name)

#### Defined in

[abi-coder/src/coders/abstract-coder.ts:28](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/coders/abstract-coder.ts#L28)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](Coder.md).[type](Coder.md#type)

#### Defined in

[abi-coder/src/coders/abstract-coder.ts:32](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/coders/abstract-coder.ts#L32)

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

[abi-coder/src/coders/tuple.ts:55](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/coders/tuple.ts#L55)

___

### encode

▸ **encode**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Values`](../index.md#values)[] \| { [name: string]: `any`;  } |

#### Returns

`any`

#### Overrides

[Coder](Coder.md).[encode](Coder.md#encode)

#### Defined in

[abi-coder/src/coders/tuple.ts:16](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/coders/tuple.ts#L16)

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

[abi-coder/src/coders/abstract-coder.ts:45](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/coders/abstract-coder.ts#L45)
