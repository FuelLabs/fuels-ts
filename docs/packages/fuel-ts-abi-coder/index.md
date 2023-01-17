---
layout: default
title: "@fuel-ts/abi-coder"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/abi-coder

## Namespaces

- [internal](namespaces/internal.md)

## Classes

- [ABI](classes/ABI.md)
- [AbiCoder](classes/AbiCoder.md)
- [ArrayCoder](classes/ArrayCoder.md)
- [B256Coder](classes/B256Coder.md)
- [B512Coder](classes/B512Coder.md)
- [BooleanCoder](classes/BooleanCoder.md)
- [ByteCoder](classes/ByteCoder.md)
- [Coder](classes/Coder.md)
- [EnumCoder](classes/EnumCoder.md)
- [Fragment](classes/Fragment.md)
- [FunctionFragment](classes/FunctionFragment.md)
- [Interface](classes/Interface.md)
- [NumberCoder](classes/NumberCoder.md)
- [StringCoder](classes/StringCoder.md)
- [StructCoder](classes/StructCoder.md)
- [TupleCoder](classes/TupleCoder.md)
- [U64Coder](classes/U64Coder.md)
- [VecCoder](classes/VecCoder.md)

## Interfaces

- [JsonAbiFragment](interfaces/JsonAbiFragment.md)
- [JsonAbiFragmentType](interfaces/JsonAbiFragmentType.md)
- [JsonAbiLogFragment](interfaces/JsonAbiLogFragment.md)
- [JsonFlatAbi](interfaces/JsonFlatAbi.md)
- [JsonFlatAbiFragmentArgumentType](interfaces/JsonFlatAbiFragmentArgumentType.md)
- [JsonFlatAbiFragmentFunction](interfaces/JsonFlatAbiFragmentFunction.md)
- [JsonFlatAbiFragmentLoggedType](interfaces/JsonFlatAbiFragmentLoggedType.md)
- [JsonFlatAbiFragmentType](interfaces/JsonFlatAbiFragmentType.md)

## Type Aliases

### DecodedValue

Ƭ **DecodedValue**: [`Primitive`](namespaces/internal.md#primitive) \| [`DecodedValue`](index.md#decodedvalue)[] \| { `[key: string]`: [`DecodedValue`](index.md#decodedvalue);  } \| `Record`<`string`, [`Primitive`](namespaces/internal.md#primitive)\>

The type of value you can get from `Coder.decode`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L27)

___

### InputValue

Ƭ **InputValue**<`T`\>: [`Primitive`](namespaces/internal.md#primitive) \| [`BN`](classes/internal-BN.md) \| [`Option`](namespaces/internal.md#option)<`T`\> \| `BytesLike` \| [`InputValue`](index.md#inputvalue)[] \| { `[key: string]`: [`InputValue`](index.md#inputvalue);  } \| `Record`<`string`, [`Primitive`](namespaces/internal.md#primitive) \| `BytesLike`\>

The type of value you can provide to `Coder.encode`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `void` |

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L15)

___

### JsonAbi

Ƭ **JsonAbi**: `ReadonlyArray`<[`JsonAbiFragment`](interfaces/JsonAbiFragment.md)\> \| [`JsonFlatAbi`](interfaces/JsonFlatAbi.md)

A JSON ABI object

#### Defined in

[packages/abi-coder/src/json-abi.ts:71](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L71)

___

### TypesOfCoder

Ƭ **TypesOfCoder**<`TCoder`\>: `TCoder` extends [`Coder`](classes/Coder.md)<infer TInput, infer TDecoded\> ? { `Decoded`: `TDecoded` ; `Input`: `TInput`  } : `never`

#### Type parameters

| Name |
| :------ |
| `TCoder` |

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L33)

## Variables

### ASSET\_ID\_LEN

• `Const` **ASSET\_ID\_LEN**: ``32``

#### Defined in

[packages/abi-coder/src/constants.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L13)

___

### BYTES\_32

• `Const` **BYTES\_32**: ``32``

#### Defined in

[packages/abi-coder/src/constants.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L11)

___

### CONTRACT\_ID\_LEN

• `Const` **CONTRACT\_ID\_LEN**: ``32``

#### Defined in

[packages/abi-coder/src/constants.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L14)

___

### MAX\_INPUTS

• `Const` **MAX\_INPUTS**: ``255``

#### Defined in

[packages/abi-coder/src/constants.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L12)

___

### OPTION\_CODER\_TYPE

• `Const` **OPTION\_CODER\_TYPE**: ``"enum Option"``

#### Defined in

[packages/abi-coder/src/constants.ts:1](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L1)

___

### TRANSACTION\_SCRIPT\_FIXED\_SIZE

• `Const` **TRANSACTION\_SCRIPT\_FIXED\_SIZE**: `number`

#### Defined in

[packages/abi-coder/src/constants.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L24)

___

### VEC\_CODER\_TYPE

• `Const` **VEC\_CODER\_TYPE**: ``"struct Vec"``

#### Defined in

[packages/abi-coder/src/constants.ts:2](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L2)

___

### VM\_TX\_MEMORY

• `Const` **VM\_TX\_MEMORY**: `number`

#### Defined in

[packages/abi-coder/src/constants.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L17)

___

### WORD\_SIZE

• `Const` **WORD\_SIZE**: ``8``

#### Defined in

[packages/abi-coder/src/constants.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L10)

___

### arrayRegEx

• `Const` **arrayRegEx**: `RegExp`

#### Defined in

[packages/abi-coder/src/constants.ts:4](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L4)

___

### enumRegEx

• `Const` **enumRegEx**: `RegExp`

#### Defined in

[packages/abi-coder/src/constants.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L6)

___

### genericRegEx

• `Const` **genericRegEx**: `RegExp`

#### Defined in

[packages/abi-coder/src/constants.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L8)

___

### stringRegEx

• `Const` **stringRegEx**: `RegExp`

#### Defined in

[packages/abi-coder/src/constants.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L3)

___

### structRegEx

• `Const` **structRegEx**: `RegExp`

#### Defined in

[packages/abi-coder/src/constants.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L5)

___

### tupleRegEx

• `Const` **tupleRegEx**: `RegExp`

#### Defined in

[packages/abi-coder/src/constants.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/constants.ts#L7)

## Functions

### filterEmptyParams

▸ **filterEmptyParams**<`T`\>(`types`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | `T` |

#### Returns

`T`

#### Defined in

[packages/abi-coder/src/utilities.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/utilities.ts#L7)

___

### getVectorAdjustments

▸ **getVectorAdjustments**(`coders`, `values`, `offset?`): `Uint8Array`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `coders` | [`Coder`](classes/Coder.md)<`unknown`, `unknown`\>[] | `undefined` |
| `values` | [`InputValue`](index.md#inputvalue)<`void`\>[] | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`Uint8Array`[]

#### Defined in

[packages/abi-coder/src/utilities.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/utilities.ts#L18)

___

### hasOptionTypes

▸ **hasOptionTypes**<`T`\>(`types`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | `T` |

#### Returns

`T`

#### Defined in

[packages/abi-coder/src/utilities.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/utilities.ts#L12)

___

### isFlatJsonAbi

▸ **isFlatJsonAbi**(`jsonAbi`): jsonAbi is JsonFlatAbi

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonAbi` | [`JsonAbi`](index.md#jsonabi) |

#### Returns

jsonAbi is JsonFlatAbi

#### Defined in

[packages/abi-coder/src/json-abi.ts:67](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L67)

___

### isReferenceType

▸ **isReferenceType**(`type`): `boolean`

Checks if a given type is a reference type
See: https://github.com/FuelLabs/sway/issues/1368

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/abi-coder/src/json-abi.ts:164](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L164)
