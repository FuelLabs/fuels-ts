---
layout: default
title: Coder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: Coder<TInput, TDecoded\>

[@fuel-ts/abi-coder](../index.md).Coder

## Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | `unknown` |
| `TDecoded` | `unknown` |

## Hierarchy

- **`Coder`**

  ↳ [`ArrayCoder`](ArrayCoder.md)

  ↳ [`B256Coder`](B256Coder.md)

  ↳ [`BooleanCoder`](BooleanCoder.md)

  ↳ [`ByteCoder`](ByteCoder.md)

  ↳ [`EnumCoder`](EnumCoder.md)

  ↳ [`NumberCoder`](NumberCoder.md)

  ↳ [`StringCoder`](StringCoder.md)

  ↳ [`StructCoder`](StructCoder.md)

  ↳ [`TupleCoder`](TupleCoder.md)

## Constructors

### constructor

• **new Coder**<`TInput`, `TDecoded`\>(`name`, `type`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | `unknown` |
| `TDecoded` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `type` | `string` |

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L40)

## Properties

### name

• `Readonly` **name**: `string`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L34)

___

### type

• `Readonly` **type**: `string`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L38)

## Methods

### decode

▸ `Abstract` **decode**(`data`, `offset`, `length?`): [`TDecoded`, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |
| `length?` | `number` |

#### Returns

[`TDecoded`, `number`]

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:55](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L55)

___

### encode

▸ `Abstract` **encode**(`value`, `length?`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `TInput` |
| `length?` | `number` |

#### Returns

`Uint8Array`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:53](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L53)

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

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:46](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L46)
