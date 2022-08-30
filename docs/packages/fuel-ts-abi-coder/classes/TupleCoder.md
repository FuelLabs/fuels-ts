---
layout: default
title: TupleCoder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: TupleCoder<TCoders\>

[@fuel-ts/abi-coder](../index.md).TupleCoder

## Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends [`Coder`](Coder.md)[] |

## Hierarchy

- [`Coder`](Coder.md)<[`InputValueOf`](../namespaces/internal.md#inputvalueof-3)<`TCoders`\>, [`DecodedValueOf`](../namespaces/internal.md#decodedvalueof-3)<`TCoders`\>\>

  ↳ **`TupleCoder`**

## Constructors

### constructor

• **new TupleCoder**<`TCoders`\>(`coders`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends [`Coder`](Coder.md)<`unknown`, `unknown`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `coders` | `TCoders` |

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

#### Defined in

[packages/abi-coder/src/coders/tuple.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/tuple.ts#L19)

## Properties

### coders

• **coders**: `TCoders`

#### Defined in

[packages/abi-coder/src/coders/tuple.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/tuple.ts#L17)

___

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

[Coder](Coder.md).[encodedLength](Coder.md#encodedlength)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L36)

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

[packages/abi-coder/src/coders/abstract-coder.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L35)

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof-3)<`TCoders`\>, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof-3)<`TCoders`\>, `number`]

#### Overrides

[Coder](Coder.md).[decode](Coder.md#decode)

#### Defined in

[packages/abi-coder/src/coders/tuple.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/tuple.ts#L33)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputValueOf`](../namespaces/internal.md#inputvalueof-3)<`TCoders`\> |

#### Returns

`Uint8Array`

#### Overrides

[Coder](Coder.md).[encode](Coder.md#encode)

#### Defined in

[packages/abi-coder/src/coders/tuple.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/tuple.ts#L25)

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
