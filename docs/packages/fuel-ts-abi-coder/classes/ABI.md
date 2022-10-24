---
layout: default
title: ABI
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: ABI

[@fuel-ts/abi-coder](../index.md).ABI

## Constructors

### constructor

• **new ABI**(`jsonAbi`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonAbi` | [`JsonFlatAbi`](../interfaces/JsonFlatAbi.md) |

## Properties

### functions

• `Readonly` **functions**: readonly [`JsonFlatAbiFragmentFunction`](../interfaces/JsonFlatAbiFragmentFunction.md)[]

#### Defined in

[packages/abi-coder/src/json-abi.ts:75](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L75)

___

### loggedTypes

• `Readonly` **loggedTypes**: readonly [`JsonFlatAbiFragmentLoggedType`](../interfaces/JsonFlatAbiFragmentLoggedType.md)[]

#### Defined in

[packages/abi-coder/src/json-abi.ts:76](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L76)

___

### types

• `Readonly` **types**: readonly [`JsonFlatAbiFragmentType`](../interfaces/JsonFlatAbiFragmentType.md)[]

#### Defined in

[packages/abi-coder/src/json-abi.ts:74](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L74)

## Methods

### parseInput

▸ **parseInput**(`input`, `typeArgumentsList?`): [`JsonAbiFragmentType`](../interfaces/JsonAbiFragmentType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`JsonFlatAbiFragmentArgumentType`](../interfaces/JsonFlatAbiFragmentArgumentType.md) |
| `typeArgumentsList` | `Map`<`number`, [`JsonAbiFragmentType`](../interfaces/JsonAbiFragmentType.md)\> |

#### Returns

[`JsonAbiFragmentType`](../interfaces/JsonAbiFragmentType.md)

___

### parseLoggedType

▸ **parseLoggedType**(`loggedType`): [`JsonAbiFragmentType`](../interfaces/JsonAbiFragmentType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `loggedType` | [`JsonFlatAbiFragmentLoggedType`](../interfaces/JsonFlatAbiFragmentLoggedType.md) |

#### Returns

[`JsonAbiFragmentType`](../interfaces/JsonAbiFragmentType.md)

___

### unflatten

▸ **unflatten**(): readonly [`JsonAbiFragment`](../interfaces/JsonAbiFragment.md)[]

#### Returns

readonly [`JsonAbiFragment`](../interfaces/JsonAbiFragment.md)[]

___

### unflattenLoggedTypes

▸ **unflattenLoggedTypes**(): readonly [`JsonAbiLogFragment`](../interfaces/JsonAbiLogFragment.md)[]

#### Returns

readonly [`JsonAbiLogFragment`](../interfaces/JsonAbiLogFragment.md)[]

___

### unflatten

▸ `Static` **unflatten**(`jsonAbi`): readonly [`JsonAbiFragment`](../interfaces/JsonAbiFragment.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonAbi` | [`JsonAbi`](../index.md#jsonabi) |

#### Returns

readonly [`JsonAbiFragment`](../interfaces/JsonAbiFragment.md)[]
