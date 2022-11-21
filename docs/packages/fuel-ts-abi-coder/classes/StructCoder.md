---
layout: default
title: StructCoder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: StructCoder<TCoders\>

[@fuel-ts/abi-coder](../index.md).StructCoder

## Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, [`Coder`](Coder.md)\> |

## Hierarchy

- [`Coder`](Coder.md)<[`InputValueOf`](../namespaces/internal.md#inputvalueof-2)<`TCoders`\>, [`DecodedValueOf`](../namespaces/internal.md#decodedvalueof-2)<`TCoders`\>\>

  ↳ **`StructCoder`**

## Constructors

### constructor

• **new StructCoder**<`TCoders`\>(`name`, `coders`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, [`Coder`](Coder.md)<`unknown`, `unknown`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `coders` | `TCoders` |

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

#### Defined in

[packages/abi-coder/src/coders/struct.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L21)

## Properties

### coders

• **coders**: `TCoders`

#### Defined in

[packages/abi-coder/src/coders/struct.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L19)

___

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

[Coder](Coder.md).[encodedLength](Coder.md#encodedlength)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L36)

___

### name

• **name**: `string`

#### Overrides

[Coder](Coder.md).[name](Coder.md#name)

#### Defined in

[packages/abi-coder/src/coders/struct.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L18)

___

### offset

• `Optional` **offset**: `number`

#### Inherited from

[Coder](Coder.md).[offset](Coder.md#offset)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L37)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](Coder.md).[type](Coder.md#type)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L35)

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof-2)<`TCoders`\>, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof-2)<`TCoders`\>, `number`]

#### Overrides

[Coder](Coder.md).[decode](Coder.md#decode)

#### Defined in

[packages/abi-coder/src/coders/struct.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L45)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputValueOf`](../namespaces/internal.md#inputvalueof-2)<`TCoders`\> |

#### Returns

`Uint8Array`

#### Overrides

[Coder](Coder.md).[encode](Coder.md#encode)

#### Defined in

[packages/abi-coder/src/coders/struct.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L31)

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

[Coder](Coder.md).[setOffset](Coder.md#setoffset)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:52](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L52)

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

[packages/abi-coder/src/coders/abstract-coder.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L45)
