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

[packages/abi-coder/src/fragments/fragment.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L23)

## Properties

### attributes

• `Readonly` **attributes**: readonly [`AttributeType`](../interfaces/internal-AttributeType.md)[] = `[]`

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L21)

___

### inputs

• `Readonly` **inputs**: [`ParamType`](internal-ParamType.md)[] = `[]`

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L19)

___

### name

• `Readonly` **name**: `string`

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L18)

___

### outputs

• `Readonly` **outputs**: [`ParamType`](internal-ParamType.md)[] = `[]`

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L20)

___

### type

• `Readonly` **type**: `string`

#### Defined in

[packages/abi-coder/src/fragments/fragment.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L17)

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

[packages/abi-coder/src/fragments/fragment.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/fragment.ts#L31)
