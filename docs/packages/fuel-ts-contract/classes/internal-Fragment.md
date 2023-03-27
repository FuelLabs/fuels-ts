---
layout: default
title: Fragment
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: Fragment

[@fuel-ts/contract](../index.md).[internal](../namespaces/internal.md).Fragment

## Hierarchy

- **`Fragment`**

  ↳ [`FunctionFragment`](internal-FunctionFragment.md)

## Constructors

### constructor

• **new Fragment**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FragmentParams`](../interfaces/internal-FragmentParams.md) |

#### Defined in

packages/abi-coder/dist/index.d.ts:195

## Properties

### attributes

• `Readonly` **attributes**: readonly [`AttributeType`](../interfaces/internal-AttributeType.md)[]

#### Defined in

packages/abi-coder/dist/index.d.ts:194

___

### inputs

• `Readonly` **inputs**: [`ParamType`](internal-ParamType.md)[]

#### Defined in

packages/abi-coder/dist/index.d.ts:192

___

### name

• `Readonly` **name**: `string`

#### Defined in

packages/abi-coder/dist/index.d.ts:191

___

### outputs

• `Readonly` **outputs**: [`ParamType`](internal-ParamType.md)[]

#### Defined in

packages/abi-coder/dist/index.d.ts:193

___

### type

• `Readonly` **type**: `string`

#### Defined in

packages/abi-coder/dist/index.d.ts:190

## Methods

### getInputsSighash

▸ `Abstract` **getInputsSighash**(`format?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `format?` | `string` |

#### Returns

`string`

#### Defined in

packages/abi-coder/dist/index.d.ts:196
