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

## Interfaces

- [JsonAbiFragment](interfaces/JsonAbiFragment.md)
- [JsonAbiFragmentType](interfaces/JsonAbiFragmentType.md)
- [JsonFlatAbi](interfaces/JsonFlatAbi.md)
- [JsonFlatAbiFragmentArgumentType](interfaces/JsonFlatAbiFragmentArgumentType.md)
- [JsonFlatAbiFragmentFunction](interfaces/JsonFlatAbiFragmentFunction.md)
- [JsonFlatAbiFragmentType](interfaces/JsonFlatAbiFragmentType.md)

## Type Aliases

### DecodedValue

Ƭ **DecodedValue**: [`Primitive`](namespaces/internal.md#primitive) \| [`DecodedValue`](index.md#decodedvalue)[] \| { `[key: string]`: [`DecodedValue`](index.md#decodedvalue);  } \| `Record`<`string`, [`Primitive`](namespaces/internal.md#primitive)\>

The type of value you can get from `Coder.decode`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L23)

___

### InputValue

Ƭ **InputValue**: [`Primitive`](namespaces/internal.md#primitive) \| `BN` \| `BytesLike` \| [`InputValue`](index.md#inputvalue)[] \| { `[key: string]`: [`InputValue`](index.md#inputvalue);  } \| `Record`<`string`, [`Primitive`](namespaces/internal.md#primitive) \| `BytesLike`\>

The type of value you can provide to `Coder.encode`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L12)

___

### JsonAbi

Ƭ **JsonAbi**: `ReadonlyArray`<[`JsonAbiFragment`](interfaces/JsonAbiFragment.md)\> \| [`JsonFlatAbi`](interfaces/JsonFlatAbi.md)

A JSON ABI object

#### Defined in

[packages/abi-coder/src/json-abi.ts:56](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L56)

___

### TypesOfCoder

Ƭ **TypesOfCoder**<`TCoder`\>: `TCoder` extends [`Coder`](classes/Coder.md)<infer TInput, infer TDecoded\> ? { `Decoded`: `TDecoded` ; `Input`: `TInput`  } : `never`

#### Type parameters

| Name |
| :------ |
| `TCoder` |

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L29)

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

[packages/abi-coder/src/utilities.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/utilities.ts#L3)

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

[packages/abi-coder/src/json-abi.ts:135](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L135)
