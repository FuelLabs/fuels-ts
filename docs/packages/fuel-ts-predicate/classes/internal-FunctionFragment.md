---
layout: default
title: FunctionFragment
parent: "@fuel-ts/predicate"
nav_order: 1

---

# Class: FunctionFragment

[@fuel-ts/predicate](../index.md).[internal](../namespaces/internal.md).FunctionFragment

## Hierarchy

- [`Fragment`](internal-Fragment.md)

  ↳ **`FunctionFragment`**

## Constructors

### constructor

• **new FunctionFragment**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FragmentParams`](../interfaces/internal-FragmentParams.md) |

#### Inherited from

[Fragment](internal-Fragment.md).[constructor](internal-Fragment.md#constructor)

#### Defined in

packages/abi-coder/dist/index.d.ts:195

## Properties

### attributes

• `Readonly` **attributes**: readonly [`AttributeType`](../interfaces/internal-AttributeType.md)[]

#### Inherited from

[Fragment](internal-Fragment.md).[attributes](internal-Fragment.md#attributes)

#### Defined in

packages/abi-coder/dist/index.d.ts:194

___

### inputs

• `Readonly` **inputs**: [`ParamType`](internal-ParamType.md)[]

#### Inherited from

[Fragment](internal-Fragment.md).[inputs](internal-Fragment.md#inputs)

#### Defined in

packages/abi-coder/dist/index.d.ts:192

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Fragment](internal-Fragment.md).[name](internal-Fragment.md#name)

#### Defined in

packages/abi-coder/dist/index.d.ts:191

___

### outputs

• `Readonly` **outputs**: [`ParamType`](internal-ParamType.md)[]

#### Inherited from

[Fragment](internal-Fragment.md).[outputs](internal-Fragment.md#outputs)

#### Defined in

packages/abi-coder/dist/index.d.ts:193

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Fragment](internal-Fragment.md).[type](internal-Fragment.md#type)

#### Defined in

packages/abi-coder/dist/index.d.ts:190

## Methods

### getInputsSighash

▸ **getInputsSighash**(): `string`

#### Returns

`string`

#### Overrides

[Fragment](internal-Fragment.md).[getInputsSighash](internal-Fragment.md#getinputssighash)

#### Defined in

packages/abi-coder/dist/index.d.ts:276

___

### fromObject

▸ `Static` **fromObject**(`value`): [`FunctionFragment`](internal-FunctionFragment.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`JsonAbiFragment`](../interfaces/internal-JsonAbiFragment.md) |

#### Returns

[`FunctionFragment`](internal-FunctionFragment.md)

#### Defined in

packages/abi-coder/dist/index.d.ts:275
