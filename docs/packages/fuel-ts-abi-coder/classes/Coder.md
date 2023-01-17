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

  ↳ [`B512Coder`](B512Coder.md)

  ↳ [`BooleanCoder`](BooleanCoder.md)

  ↳ [`ByteCoder`](ByteCoder.md)

  ↳ [`EnumCoder`](EnumCoder.md)

  ↳ [`NumberCoder`](NumberCoder.md)

  ↳ [`StringCoder`](StringCoder.md)

  ↳ [`StructCoder`](StructCoder.md)

  ↳ [`TupleCoder`](TupleCoder.md)

  ↳ [`U64Coder`](U64Coder.md)

  ↳ [`VecCoder`](VecCoder.md)

## Constructors

### constructor

• **new Coder**<`TInput`, `TDecoded`\>(`name`, `type`, `encodedLength`)

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
| `encodedLength` | `number` |

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L43)

## Properties

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L40)

___

### name

• `Readonly` **name**: `string`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L38)

___

### offset

• `Optional` **offset**: `number`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L41)

___

### type

• `Readonly` **type**: `string`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L39)

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

[packages/abi-coder/src/coders/abstract-coder.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L62)

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

[packages/abi-coder/src/coders/abstract-coder.ts:60](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L60)

___

### setOffset

▸ **setOffset**(`offset`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `number` |

#### Returns

`void`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:56](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L56)

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

[packages/abi-coder/src/coders/abstract-coder.ts:49](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L49)
