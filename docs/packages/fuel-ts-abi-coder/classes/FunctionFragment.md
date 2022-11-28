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

[packages/abi-coder/src/fragments/fragment.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L16)

## Properties

### inputs

• `Readonly` **inputs**: [`ParamType`](internal-ParamType.md)[] = `[]`

#### Inherited from

[Fragment](Fragment.md).[inputs](Fragment.md#inputs)

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L13)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Fragment](Fragment.md).[name](Fragment.md#name)

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L12)

___

### outputs

• `Readonly` **outputs**: [`ParamType`](internal-ParamType.md)[] = `[]`

#### Inherited from

[Fragment](Fragment.md).[outputs](Fragment.md#outputs)

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L14)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Fragment](Fragment.md).[type](Fragment.md#type)

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L11)

## Methods

### getInputsSighash

▸ **getInputsSighash**(): `string`

#### Returns

`string`

#### Overrides

[Fragment](Fragment.md).[getInputsSighash](Fragment.md#getinputssighash)

#### Defined in

[packages/abi-coder/src/fragments/function-fragment.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/function-fragment.ts#L23)

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
