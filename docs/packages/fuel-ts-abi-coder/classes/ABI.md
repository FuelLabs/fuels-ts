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

#### Defined in

[packages/abi-coder/src/json-abi.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L62)

## Properties

### functions

• `Readonly` **functions**: readonly [`JsonFlatAbiFragmentFunction`](../interfaces/JsonFlatAbiFragmentFunction.md)[]

#### Defined in

[packages/abi-coder/src/json-abi.ts:60](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L60)

___

### types

• `Readonly` **types**: readonly [`JsonFlatAbiFragmentType`](../interfaces/JsonFlatAbiFragmentType.md)[]

#### Defined in

[packages/abi-coder/src/json-abi.ts:59](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L59)

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

#### Defined in

[packages/abi-coder/src/json-abi.ts:67](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L67)

___

### unflatten

▸ **unflatten**(): readonly [`JsonAbiFragment`](../interfaces/JsonAbiFragment.md)[]

#### Returns

readonly [`JsonAbiFragment`](../interfaces/JsonAbiFragment.md)[]

#### Defined in

[packages/abi-coder/src/json-abi.ts:121](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L121)

___

### unflatten

▸ `Static` **unflatten**(`jsonAbi`): readonly [`JsonAbiFragment`](../interfaces/JsonAbiFragment.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonAbi` | [`JsonAbi`](../index.md#jsonabi) |

#### Returns

readonly [`JsonAbiFragment`](../interfaces/JsonAbiFragment.md)[]

#### Defined in

[packages/abi-coder/src/json-abi.ts:113](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L113)
