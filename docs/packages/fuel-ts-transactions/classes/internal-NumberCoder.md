---
layout: default
title: NumberCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: NumberCoder

[@fuel-ts/transactions](../index.md).[internal](../namespaces/internal.md).NumberCoder

## Hierarchy

- [`Coder`](internal-Coder.md)<`number`, `number`\>

  ↳ **`NumberCoder`**

## Constructors

### constructor

• **new NumberCoder**(`baseType`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseType` | [`NumberCoderType`](../namespaces/internal.md#numbercodertype) |

#### Overrides

[Coder](internal-Coder.md).[constructor](internal-Coder.md#constructor)

#### Defined in

packages/abi-coder/dist/index.d.ts:89

## Properties

### baseType

• **baseType**: [`NumberCoderType`](../namespaces/internal.md#numbercodertype)

#### Defined in

packages/abi-coder/dist/index.d.ts:88

___

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

[Coder](internal-Coder.md).[encodedLength](internal-Coder.md#encodedlength)

#### Defined in

packages/abi-coder/dist/index.d.ts:42

___

### length

• **length**: `number`

#### Defined in

packages/abi-coder/dist/index.d.ts:87

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Coder](internal-Coder.md).[name](internal-Coder.md#name)

#### Defined in

packages/abi-coder/dist/index.d.ts:40

___

### offset

• `Optional` **offset**: `number`

#### Inherited from

[Coder](internal-Coder.md).[offset](internal-Coder.md#offset)

#### Defined in

packages/abi-coder/dist/index.d.ts:43

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](internal-Coder.md).[type](internal-Coder.md#type)

#### Defined in

packages/abi-coder/dist/index.d.ts:41

## Methods

### decode

▸ **decode**(`data`, `offset`): [`number`, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[`number`, `number`]

#### Overrides

[Coder](internal-Coder.md).[decode](internal-Coder.md#decode)

#### Defined in

packages/abi-coder/dist/index.d.ts:91

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` |

#### Returns

`Uint8Array`

#### Overrides

[Coder](internal-Coder.md).[encode](internal-Coder.md#encode)

#### Defined in

packages/abi-coder/dist/index.d.ts:90

___

### setOffset

▸ **setOffset**(`offset`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `number` |

#### Returns

`void`

#### Inherited from

[Coder](internal-Coder.md).[setOffset](internal-Coder.md#setoffset)

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

#### Inherited from

[Coder](internal-Coder.md).[throwError](internal-Coder.md#throwerror)

#### Defined in

packages/abi-coder/dist/index.d.ts:45
