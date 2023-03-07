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

[packages/abi-coder/src/json-abi.ts:85](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L85)

## Properties

### functions

• `Readonly` **functions**: readonly [`JsonFlatAbiFragmentFunction`](../interfaces/JsonFlatAbiFragmentFunction.md)[]

#### Defined in

[packages/abi-coder/src/json-abi.ts:82](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L82)

___

### loggedTypes

• `Readonly` **loggedTypes**: readonly [`JsonFlatAbiFragmentLoggedType`](../interfaces/JsonFlatAbiFragmentLoggedType.md)[]

#### Defined in

[packages/abi-coder/src/json-abi.ts:83](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L83)

___

### types

• `Readonly` **types**: readonly [`JsonFlatAbiFragmentType`](../interfaces/JsonFlatAbiFragmentType.md)[]

#### Defined in

[packages/abi-coder/src/json-abi.ts:81](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L81)

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

[packages/abi-coder/src/json-abi.ts:95](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L95)

___

### parseLoggedType

▸ **parseLoggedType**(`loggedType`): [`JsonAbiFragmentType`](../interfaces/JsonAbiFragmentType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `loggedType` | [`JsonFlatAbiFragmentLoggedType`](../interfaces/JsonFlatAbiFragmentLoggedType.md) |

#### Returns

[`JsonAbiFragmentType`](../interfaces/JsonAbiFragmentType.md)

#### Defined in

[packages/abi-coder/src/json-abi.ts:91](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L91)

___

### unflatten

▸ **unflatten**(): readonly [`JsonAbiFragment`](../interfaces/JsonAbiFragment.md)[]

#### Returns

readonly [`JsonAbiFragment`](../interfaces/JsonAbiFragment.md)[]

#### Defined in

[packages/abi-coder/src/json-abi.ts:157](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L157)

___

### unflattenLoggedTypes

▸ **unflattenLoggedTypes**(): readonly [`JsonAbiLogFragment`](../interfaces/JsonAbiLogFragment.md)[]

#### Returns

readonly [`JsonAbiLogFragment`](../interfaces/JsonAbiLogFragment.md)[]

#### Defined in

[packages/abi-coder/src/json-abi.ts:150](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L150)

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

[packages/abi-coder/src/json-abi.ts:141](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L141)
