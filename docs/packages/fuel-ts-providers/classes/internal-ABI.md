---
layout: default
title: ABI
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: ABI

[@fuel-ts/providers](../index.md).[internal](../namespaces/internal.md).ABI

## Constructors

### constructor

• **new ABI**(`jsonAbi`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonAbi` | [`JsonFlatAbi`](../interfaces/internal-JsonFlatAbi.md) |

#### Defined in

packages/abi-coder/dist/index.d.ts:261

## Properties

### functions

• `Readonly` **functions**: readonly [`JsonFlatAbiFragmentFunction`](../interfaces/internal-JsonFlatAbiFragmentFunction.md)[]

#### Defined in

packages/abi-coder/dist/index.d.ts:259

___

### loggedTypes

• `Readonly` **loggedTypes**: readonly [`JsonFlatAbiFragmentLoggedType`](../interfaces/internal-JsonFlatAbiFragmentLoggedType.md)[]

#### Defined in

packages/abi-coder/dist/index.d.ts:260

___

### types

• `Readonly` **types**: readonly [`JsonFlatAbiFragmentType`](../interfaces/internal-JsonFlatAbiFragmentType.md)[]

#### Defined in

packages/abi-coder/dist/index.d.ts:258

## Methods

### parseInput

▸ **parseInput**(`input`, `typeArgumentsList?`): [`JsonAbiFragmentType`](../interfaces/internal-JsonAbiFragmentType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`JsonFlatAbiFragmentArgumentType`](../interfaces/internal-JsonFlatAbiFragmentArgumentType.md) |
| `typeArgumentsList?` | `Map`<`number`, [`JsonAbiFragmentType`](../interfaces/internal-JsonAbiFragmentType.md)\> |

#### Returns

[`JsonAbiFragmentType`](../interfaces/internal-JsonAbiFragmentType.md)

#### Defined in

packages/abi-coder/dist/index.d.ts:263

___

### parseLoggedType

▸ **parseLoggedType**(`loggedType`): [`JsonAbiFragmentType`](../interfaces/internal-JsonAbiFragmentType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `loggedType` | [`JsonFlatAbiFragmentLoggedType`](../interfaces/internal-JsonFlatAbiFragmentLoggedType.md) |

#### Returns

[`JsonAbiFragmentType`](../interfaces/internal-JsonAbiFragmentType.md)

#### Defined in

packages/abi-coder/dist/index.d.ts:262

___

### unflatten

▸ **unflatten**(): readonly [`JsonAbiFragment`](../interfaces/internal-JsonAbiFragment.md)[]

#### Returns

readonly [`JsonAbiFragment`](../interfaces/internal-JsonAbiFragment.md)[]

#### Defined in

packages/abi-coder/dist/index.d.ts:266

___

### unflattenLoggedTypes

▸ **unflattenLoggedTypes**(): readonly [`JsonAbiLogFragment`](../interfaces/internal-JsonAbiLogFragment.md)[]

#### Returns

readonly [`JsonAbiLogFragment`](../interfaces/internal-JsonAbiLogFragment.md)[]

#### Defined in

packages/abi-coder/dist/index.d.ts:265

___

### unflatten

▸ `Static` **unflatten**(`jsonAbi`): readonly [`JsonAbiFragment`](../interfaces/internal-JsonAbiFragment.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonAbi` | [`JsonAbi`](../namespaces/internal.md#jsonabi) |

#### Returns

readonly [`JsonAbiFragment`](../interfaces/internal-JsonAbiFragment.md)[]

#### Defined in

packages/abi-coder/dist/index.d.ts:264
