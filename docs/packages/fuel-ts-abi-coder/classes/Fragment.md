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

[packages/abi-coder/src/fragments/fragment.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L16)

## Properties

### inputs

• `Readonly` **inputs**: [`ParamType`](internal-ParamType.md)[] = `[]`

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L13)

___

### name

• `Readonly` **name**: `string`

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L12)

___

### outputs

• `Readonly` **outputs**: [`ParamType`](internal-ParamType.md)[] = `[]`

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L14)

___

### type

• `Readonly` **type**: `string`

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L11)

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

[packages/abi-coder/src/fragments/fragment.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L23)
