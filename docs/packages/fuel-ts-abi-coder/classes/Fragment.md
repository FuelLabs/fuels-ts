---
layout: default
title: Fragment
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: Fragment

[@fuel-ts/abi-coder](../index.md).Fragment

## Hierarchy

- **`Fragment`**

  ↳ [`FunctionFragment`](FunctionFragment.md)

## Constructors

### constructor

• **new Fragment**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`FragmentParams`](../interfaces/internal-FragmentParams.md) |

#### Defined in

[abi-coder/src/fragments/fragment.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L31)

## Properties

### inputs

• `Readonly` **inputs**: `ParamType`[] = `[]`

#### Defined in

[abi-coder/src/fragments/fragment.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L28)

___

### name

• `Readonly` **name**: `string`

#### Defined in

[abi-coder/src/fragments/fragment.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L26)

___

### outputs

• `Readonly` **outputs**: `ParamType`[] = `[]`

#### Defined in

[abi-coder/src/fragments/fragment.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L29)

___

### strictInputs

• `Readonly` **strictInputs**: `boolean`

#### Defined in

[abi-coder/src/fragments/fragment.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L27)

___

### type

• `Readonly` **type**: `string`

#### Defined in

[abi-coder/src/fragments/fragment.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L25)

## Methods

### format

▸ `Abstract` **format**(`format?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `format?` | `string` |

#### Returns

`string`

#### Defined in

[abi-coder/src/fragments/fragment.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L39)
