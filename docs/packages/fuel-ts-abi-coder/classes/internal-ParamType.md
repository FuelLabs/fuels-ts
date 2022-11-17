---
layout: default
title: ParamType
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: ParamType

[@fuel-ts/abi-coder](../index.md).[internal](../namespaces/internal.md).ParamType

## Implements

- [`ParamTypeProps`](../interfaces/internal-ParamTypeProps.md)

## Constructors

### constructor

• **new ParamType**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ParamTypeProps`](../interfaces/internal-ParamTypeProps.md) |

## Properties

### components

• `Optional` `Readonly` **components**: [`ParamType`](internal-ParamType.md)[]

#### Implementation of

[ParamTypeProps](../interfaces/internal-ParamTypeProps.md).[components](../interfaces/internal-ParamTypeProps.md#components)

#### Defined in

[packages/abi-coder/src/fragments/param-type.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/param-type.ts#L43)

___

### indexed

• `Optional` `Readonly` **indexed**: `boolean`

#### Defined in

[packages/abi-coder/src/fragments/param-type.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/param-type.ts#L42)

___

### isParamType

• `Optional` `Readonly` **isParamType**: `boolean`

#### Implementation of

[ParamTypeProps](../interfaces/internal-ParamTypeProps.md).[isParamType](../interfaces/internal-ParamTypeProps.md#isparamtype)

#### Defined in

[packages/abi-coder/src/fragments/param-type.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/param-type.ts#L45)

___

### name

• `Optional` `Readonly` **name**: `string`

#### Implementation of

[ParamTypeProps](../interfaces/internal-ParamTypeProps.md).[name](../interfaces/internal-ParamTypeProps.md#name)

#### Defined in

[packages/abi-coder/src/fragments/param-type.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/param-type.ts#L40)

___

### type

• `Readonly` **type**: `string`

#### Implementation of

[ParamTypeProps](../interfaces/internal-ParamTypeProps.md).[type](../interfaces/internal-ParamTypeProps.md#type)

#### Defined in

[packages/abi-coder/src/fragments/param-type.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/param-type.ts#L41)

___

### typeArguments

• `Optional` `Readonly` **typeArguments**: [`ParamType`](internal-ParamType.md)[]

#### Implementation of

[ParamTypeProps](../interfaces/internal-ParamTypeProps.md).[typeArguments](../interfaces/internal-ParamTypeProps.md#typearguments)

#### Defined in

[packages/abi-coder/src/fragments/param-type.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/fragments/param-type.ts#L44)

## Methods

### getSighash

▸ **getSighash**(): `string`

#### Returns

`string`

___

### getSignatureContent

▸ **getSignatureContent**(): `string`

#### Returns

`string`

___

### getSignaturePrefix

▸ **getSignaturePrefix**(): `string`

#### Returns

`string`

___

### fromObject

▸ `Static` **fromObject**(`value`): [`ParamType`](internal-ParamType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`JsonFragmentType`](../interfaces/internal-JsonFragmentType.md) \| [`ParamTypeProps`](../interfaces/internal-ParamTypeProps.md) |

#### Returns

[`ParamType`](internal-ParamType.md)

___

### isParamType

▸ `Static` **isParamType**(`value?`): value is ParamType

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | [`JsonFragmentType`](../interfaces/internal-JsonFragmentType.md) \| [`ParamType`](internal-ParamType.md) |

#### Returns

value is ParamType
