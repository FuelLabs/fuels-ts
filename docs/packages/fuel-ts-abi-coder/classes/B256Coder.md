---
layout: default
title: B256Coder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: B256Coder

[@fuel-ts/abi-coder](../index.md).B256Coder

## Hierarchy

- [`Coder`](Coder.md)

  ↳ **`B256Coder`**

## Constructors

### constructor

• **new B256Coder**(`localName`, `type`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |
| `type` | `string` |

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

#### Defined in

[abi-coder/src/coders/b256.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/b256.ts#L9)

## Properties

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

• **type**: `string`

#### Overrides

[Coder](Coder.md).[type](Coder.md#type)

#### Defined in

[abi-coder/src/coders/b256.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/b256.ts#L7)

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

[abi-coder/src/coders/b256.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/b256.ts#L28)

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

[abi-coder/src/coders/b256.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/b256.ts#L14)

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
