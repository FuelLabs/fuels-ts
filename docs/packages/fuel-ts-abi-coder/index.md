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

- [AbiCoder](classes/AbiCoder.md)
- [ArrayCoder](classes/ArrayCoder.md)
- [B256Coder](classes/B256Coder.md)
- [BooleanCoder](classes/BooleanCoder.md)
- [ByteCoder](classes/ByteCoder.md)
- [Coder](classes/Coder.md)
- [Fragment](classes/Fragment.md)
- [FunctionFragment](classes/FunctionFragment.md)
- [Interface](classes/Interface.md)
- [NumberCoder](classes/NumberCoder.md)
- [StringCoder](classes/StringCoder.md)
- [TupleCoder](classes/TupleCoder.md)

## Interfaces

- [JsonAbiFragment](interfaces/JsonAbiFragment.md)
- [JsonAbiFragmentType](interfaces/JsonAbiFragmentType.md)

## Type aliases

### DecodedValue

Ƭ **DecodedValue**: `string` \| `number` \| `boolean` \| `BN` \| [`DecodedValue`](index.md#decodedvalue)[] \| { `[key: string]`: [`DecodedValue`](index.md#decodedvalue);  } \| `Record`<`string`, `string` \| `number` \| `boolean` \| `BN`\>

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L18)

___

### JsonAbi

Ƭ **JsonAbi**: `ReadonlyArray`<[`JsonAbiFragment`](interfaces/JsonAbiFragment.md)\>

A JSON ABI object

#### Defined in

[packages/abi-coder/src/json-abi.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L28)

___

### Values

Ƭ **Values**: `string` \| `boolean` \| `BN` \| `number` \| `BytesLike` \| `BigInt` \| [`Values`](index.md#values)[] \| { `[key: string]`: [`Values`](index.md#values);  } \| `Record`<`string`, `string` \| `boolean` \| `BN` \| `number` \| `BytesLike` \| `BigInt`\>

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L7)

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

[packages/abi-coder/src/coders/utilities.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/utilities.ts#L34)

___

### getBytes

▸ **getBytes**(`value`): `Uint8Array`

Convert value to a Byte Array

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `BigNumberish` |

#### Returns

`Uint8Array`

#### Defined in

[packages/abi-coder/src/coders/utilities.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/utilities.ts#L12)

___

### pad

▸ **pad**(`bytes`, `wordSize`): `Uint8Array`

Pad a bytes array depending on word size

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytes` | `Uint8Array` |
| `wordSize` | `number` |

#### Returns

`Uint8Array`

#### Defined in

[packages/abi-coder/src/coders/utilities.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/utilities.ts#L19)
