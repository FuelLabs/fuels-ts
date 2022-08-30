---
layout: default
title: EnumCoder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: EnumCoder<TCoders\>

[@fuel-ts/abi-coder](../index.md).EnumCoder

## Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, [`Coder`](Coder.md)\> |

## Hierarchy

- [`Coder`](Coder.md)<[`InputValueOf`](../namespaces/internal.md#inputvalueof-1)<`TCoders`\>, [`DecodedValueOf`](../namespaces/internal.md#decodedvalueof-1)<`TCoders`\>\>

  ↳ **`EnumCoder`**

## Constructors

### constructor

• **new EnumCoder**<`TCoders`\>(`name`, `coders`)

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

[packages/abi-coder/src/coders/enum.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/enum.ts#L25)

## Properties

### #caseIndexCoder

• `Private` **#caseIndexCoder**: `default`

#### Defined in

[packages/abi-coder/src/coders/enum.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/enum.ts#L22)

___

### #encodedValueSize

• `Private` **#encodedValueSize**: `number`

#### Defined in

[packages/abi-coder/src/coders/enum.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/enum.ts#L23)

___

### coders

• **coders**: `TCoders`

#### Defined in

[packages/abi-coder/src/coders/enum.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/enum.ts#L21)

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

[packages/abi-coder/src/coders/enum.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/enum.ts#L20)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](Coder.md).[type](Coder.md#type)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L35)

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof-1)<`TCoders`\>, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof-1)<`TCoders`\>, `number`]

#### Overrides

[Coder](Coder.md).[decode](Coder.md#decode)

#### Defined in

[packages/abi-coder/src/coders/enum.ts:54](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/enum.ts#L54)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputValueOf`](../namespaces/internal.md#inputvalueof-1)<`TCoders`\> |

#### Returns

`Uint8Array`

#### Overrides

[Coder](Coder.md).[encode](Coder.md#encode)

#### Defined in

[packages/abi-coder/src/coders/enum.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/enum.ts#L38)

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

[packages/abi-coder/src/coders/abstract-coder.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L44)
