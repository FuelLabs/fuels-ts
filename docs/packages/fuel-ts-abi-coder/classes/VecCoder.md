---
layout: default
title: VecCoder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: VecCoder<TCoder\>

[@fuel-ts/abi-coder](../index.md).VecCoder

## Type parameters

| Name | Type |
| :------ | :------ |
| `TCoder` | extends [`Coder`](Coder.md) |

## Hierarchy

- [`Coder`](Coder.md)<[`InputValueOf`](../namespaces/internal.md#inputvalueof)<`TCoder`\>, [`DecodedValueOf`](../namespaces/internal.md#decodedvalueof)<`TCoder`\>\>

  ↳ **`VecCoder`**

## Constructors

### constructor

• **new VecCoder**<`TCoder`\>(`coder`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoder` | extends [`Coder`](Coder.md)<`unknown`, `unknown`, `TCoder`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `coder` | `TCoder` |

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

## Properties

### coder

• **coder**: `TCoder`

#### Defined in

[packages/abi-coder/src/coders/vec.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/vec.ts#L18)

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

___

### getEncodedVectorData

▸ **getEncodedVectorData**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputValueOf`](../namespaces/internal.md#inputvalueof)<`TCoder`\> |

#### Returns

`Uint8Array`

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

___

### getBaseOffset

▸ `Static` **getBaseOffset**(): `number`

#### Returns

`number`
