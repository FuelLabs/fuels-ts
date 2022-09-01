---
layout: default
title: ArrayCoder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: ArrayCoder<TCoder\>

[@fuel-ts/abi-coder](../index.md).ArrayCoder

## Type parameters

| Name | Type |
| :------ | :------ |
| `TCoder` | extends [`Coder`](Coder.md) |

## Hierarchy

- [`Coder`](Coder.md)<[`InputValueOf`](../namespaces/internal.md#inputvalueof)<`TCoder`\>, [`DecodedValueOf`](../namespaces/internal.md#decodedvalueof)<`TCoder`\>\>

  ↳ **`ArrayCoder`**

## Constructors

### constructor

• **new ArrayCoder**<`TCoder`\>(`coder`, `length`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoder` | extends [`Coder`](Coder.md)<`unknown`, `unknown`, `TCoder`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `coder` | `TCoder` |
| `length` | `number` |

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

#### Defined in

[packages/abi-coder/src/coders/array.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L16)

## Properties

### coder

• **coder**: `TCoder`

#### Defined in

[packages/abi-coder/src/coders/array.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L13)

___

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

[Coder](Coder.md).[encodedLength](Coder.md#encodedlength)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L34)

___

### length

• **length**: `number`

#### Defined in

[packages/abi-coder/src/coders/array.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L14)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Coder](Coder.md).[name](Coder.md#name)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L32)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](Coder.md).[type](Coder.md#type)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L33)

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof)<`TCoder`\>, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof)<`TCoder`\>, `number`]

#### Overrides

[Coder](Coder.md).[decode](Coder.md#decode)

#### Defined in

[packages/abi-coder/src/coders/array.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L34)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputValueOf`](../namespaces/internal.md#inputvalueof)<`TCoder`\> |

#### Returns

`Uint8Array`

#### Overrides

[Coder](Coder.md).[encode](Coder.md#encode)

#### Defined in

[packages/abi-coder/src/coders/array.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L22)

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

[packages/abi-coder/src/coders/abstract-coder.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L42)
