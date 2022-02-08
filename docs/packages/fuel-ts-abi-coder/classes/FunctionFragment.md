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

[abi-coder/src/fragments/fragment.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L29)

## Properties

### inputs

• `Readonly` **inputs**: `ParamType`[] = `[]`

#### Inherited from

[Fragment](Fragment.md).[inputs](Fragment.md#inputs)

#### Defined in

[abi-coder/src/fragments/fragment.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L26)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Fragment](Fragment.md).[name](Fragment.md#name)

#### Defined in

[abi-coder/src/fragments/fragment.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L25)

___

### outputs

• `Readonly` **outputs**: `ParamType`[] = `[]`

#### Inherited from

[Fragment](Fragment.md).[outputs](Fragment.md#outputs)

#### Defined in

[abi-coder/src/fragments/fragment.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L27)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Fragment](Fragment.md).[type](Fragment.md#type)

#### Defined in

[abi-coder/src/fragments/fragment.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L24)

## Methods

### format

▸ **format**(): `string`

#### Returns

`string`

#### Overrides

[Fragment](Fragment.md).[format](Fragment.md#format)

#### Defined in

[abi-coder/src/fragments/function-fragment.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/function-fragment.ts#L30)

___

### fromObject

▸ `Static` **fromObject**(`value`): [`FunctionFragment`](FunctionFragment.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`JsonFragment`](../interfaces/JsonFragment.md) |

#### Returns

[`FunctionFragment`](FunctionFragment.md)

#### Defined in

[abi-coder/src/fragments/function-fragment.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/function-fragment.ts#L18)
