---
layout: default
title: FunctionFragment
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: FunctionFragment

[@fuel-ts/abi-coder](../index.md).FunctionFragment

## Hierarchy

- [`Fragment`](Fragment.md)

  ↳ **`FunctionFragment`**

## Constructors

### constructor

• **new FunctionFragment**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FragmentParams`](../interfaces/internal-FragmentParams.md) |

#### Inherited from

[Fragment](Fragment.md).[constructor](Fragment.md#constructor)

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L23)

## Properties

### attributes

• `Readonly` **attributes**: readonly [`AttributeType`](../interfaces/internal-AttributeType.md)[] = `[]`

#### Inherited from

[Fragment](Fragment.md).[attributes](Fragment.md#attributes)

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L21)

___

### inputs

• `Readonly` **inputs**: [`ParamType`](internal-ParamType.md)[] = `[]`

#### Inherited from

[Fragment](Fragment.md).[inputs](Fragment.md#inputs)

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L19)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Fragment](Fragment.md).[name](Fragment.md#name)

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L18)

___

### outputs

• `Readonly` **outputs**: [`ParamType`](internal-ParamType.md)[] = `[]`

#### Inherited from

[Fragment](Fragment.md).[outputs](Fragment.md#outputs)

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L20)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Fragment](Fragment.md).[type](Fragment.md#type)

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L17)

## Methods

### getInputsSighash

▸ **getInputsSighash**(): `string`

#### Returns

`string`

#### Overrides

[Fragment](Fragment.md).[getInputsSighash](Fragment.md#getinputssighash)

#### Defined in

[packages/abi-coder/src/fragments/function-fragment.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/function-fragment.ts#L24)

___

### fromObject

▸ `Static` **fromObject**(`value`): [`FunctionFragment`](FunctionFragment.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`JsonAbiFragment`](../interfaces/JsonAbiFragment.md) |

#### Returns

[`FunctionFragment`](FunctionFragment.md)

#### Defined in

[packages/abi-coder/src/fragments/function-fragment.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/function-fragment.ts#L9)
