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

• **new StringCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

#### Defined in

[abi-coder/src/coders/string.ts:7](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/coders/string.ts#L7)

## Properties

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

▸ **decode**(`data`, `offset`, `length`): [`string`, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |
| `length` | `number` |

#### Returns

[`string`, `number`]

#### Overrides

[Coder](Coder.md).[decode](Coder.md#decode)

#### Defined in

[abi-coder/src/coders/string.ts:18](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/coders/string.ts#L18)

___

### encode

▸ **encode**(`value`, `length`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `length` | `number` |

#### Returns

`Uint8Array`

#### Overrides

[Coder](Coder.md).[encode](Coder.md#encode)

#### Defined in

[abi-coder/src/coders/string.ts:11](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/coders/string.ts#L11)

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
