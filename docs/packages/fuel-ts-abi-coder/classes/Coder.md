---
layout: default
title: Coder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: Coder

[@fuel-ts/abi-coder](../index.md).Coder

## Hierarchy

- **`Coder`**

  ↳ [`ArrayCoder`](ArrayCoder.md)

  ↳ [`B256Coder`](B256Coder.md)

  ↳ [`BooleanCoder`](BooleanCoder.md)

  ↳ [`ByteCoder`](ByteCoder.md)

  ↳ [`NumberCoder`](NumberCoder.md)

  ↳ [`StringCoder`](StringCoder.md)

  ↳ [`TupleCoder`](TupleCoder.md)

## Constructors

### constructor

• **new Coder**(`name`, `type`, `localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `type` | `string` |
| `localName` | `string` |

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L40)

## Properties

### localName

• `Readonly` **localName**: `string`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L38)

___

### name

• `Readonly` **name**: `string`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L30)

___

### type

• `Readonly` **type**: `string`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L34)

## Methods

### decode

▸ `Abstract` **decode**(`data`, `offset`, `length?`): [[`DecodedValue`](../index.md#decodedvalue), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |
| `length?` | `number` |

#### Returns

[[`DecodedValue`](../index.md#decodedvalue), `number`]

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:53](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L53)

___

### encode

▸ `Abstract` **encode**(`value`, `length?`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Values`](../index.md#values) |
| `length?` | `number` |

#### Returns

`Uint8Array`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:51](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L51)

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

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L47)
