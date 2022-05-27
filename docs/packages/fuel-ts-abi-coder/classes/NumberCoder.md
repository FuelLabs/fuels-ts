---
layout: default
title: NumberCoder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: NumberCoder<TBaseType\>

[@fuel-ts/abi-coder](../index.md).NumberCoder

## Type parameters

| Name | Type |
| :------ | :------ |
| `TBaseType` | extends [`NumberCoderType`](../namespaces/internal.md#numbercodertype) = [`NumberCoderType`](../namespaces/internal.md#numbercodertype) |

## Hierarchy

- [`Coder`](Coder.md)<`number` \| `bigint`, [`ToDecodedType`](../namespaces/internal.md#todecodedtype)<`TBaseType`\>\>

  ↳ **`NumberCoder`**

## Constructors

### constructor

• **new NumberCoder**<`TBaseType`\>(`baseType`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TBaseType` | extends [`NumberCoderType`](../namespaces/internal.md#numbercodertype) = [`NumberCoderType`](../namespaces/internal.md#numbercodertype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseType` | `TBaseType` |

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

#### Defined in

[packages/abi-coder/src/coders/number.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L19)

## Properties

### baseType

• **baseType**: `TBaseType`

#### Defined in

[packages/abi-coder/src/coders/number.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L17)

___

### length

• **length**: `number`

#### Defined in

[packages/abi-coder/src/coders/number.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L16)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Coder](Coder.md).[name](Coder.md#name)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L34)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](Coder.md).[type](Coder.md#type)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L38)

## Methods

### #decodeBigInt

▸ `Private` **#decodeBigInt**(`data`, `offset`): [`bigint`, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[`bigint`, `number`]

#### Defined in

[packages/abi-coder/src/coders/number.ts:54](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L54)

___

### decode

▸ **decode**(`data`, `offset`): [[`ToDecodedType`](../namespaces/internal.md#todecodedtype)<`TBaseType`\>, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`ToDecodedType`](../namespaces/internal.md#todecodedtype)<`TBaseType`\>, `number`]

#### Overrides

[Coder](Coder.md).[decode](Coder.md#decode)

#### Defined in

[packages/abi-coder/src/coders/number.ts:61](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L61)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` \| `bigint` |

#### Returns

`Uint8Array`

#### Overrides

[Coder](Coder.md).[encode](Coder.md#encode)

#### Defined in

[packages/abi-coder/src/coders/number.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L39)

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

[Coder](Coder.md).[throwError](Coder.md#throwerror)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:46](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L46)
