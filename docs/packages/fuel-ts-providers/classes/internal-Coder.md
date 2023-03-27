---
layout: default
title: Coder
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: Coder<TInput, TDecoded\>

[@fuel-ts/providers](../index.md).[internal](../namespaces/internal.md).Coder

## Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | `unknown` |
| `TDecoded` | `unknown` |

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

packages/abi-coder/dist/index.d.ts:44

## Properties

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Defined in

packages/abi-coder/dist/index.d.ts:42

___

### name

• `Readonly` **name**: `string`

#### Defined in

packages/abi-coder/dist/index.d.ts:40

___

### offset

• `Optional` **offset**: `number`

#### Defined in

packages/abi-coder/dist/index.d.ts:43

___

### type

• `Readonly` **type**: `string`

#### Defined in

packages/abi-coder/dist/index.d.ts:41

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

packages/abi-coder/dist/index.d.ts:48

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

packages/abi-coder/dist/index.d.ts:47

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

packages/abi-coder/dist/index.d.ts:46

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

packages/abi-coder/dist/index.d.ts:45
