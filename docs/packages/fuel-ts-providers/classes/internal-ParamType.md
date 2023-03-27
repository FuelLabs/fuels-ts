---
layout: default
title: ParamType
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: ParamType

[@fuel-ts/providers](../index.md).[internal](../namespaces/internal.md).ParamType

## Implements

- [`ParamTypeProps`](../interfaces/internal-ParamTypeProps.md)

## Constructors

### constructor

• **new ParamType**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ParamTypeProps`](../interfaces/internal-ParamTypeProps.md) |

#### Defined in

packages/abi-coder/dist/index.d.ts:170

## Properties

### components

• `Optional` `Readonly` **components**: [`ParamType`](internal-ParamType.md)[]

#### Implementation of

[ParamTypeProps](../interfaces/internal-ParamTypeProps.md).[components](../interfaces/internal-ParamTypeProps.md#components)

#### Defined in

packages/abi-coder/dist/index.d.ts:167

___

### indexed

• `Optional` `Readonly` **indexed**: `boolean`

#### Defined in

packages/abi-coder/dist/index.d.ts:166

___

### isParamType

• `Optional` `Readonly` **isParamType**: `boolean`

#### Implementation of

[ParamTypeProps](../interfaces/internal-ParamTypeProps.md).[isParamType](../interfaces/internal-ParamTypeProps.md#isparamtype)

#### Defined in

packages/abi-coder/dist/index.d.ts:169

___

### name

• `Optional` `Readonly` **name**: `string`

#### Implementation of

[ParamTypeProps](../interfaces/internal-ParamTypeProps.md).[name](../interfaces/internal-ParamTypeProps.md#name)

#### Defined in

packages/abi-coder/dist/index.d.ts:164

___

### type

• `Readonly` **type**: `string`

#### Implementation of

[ParamTypeProps](../interfaces/internal-ParamTypeProps.md).[type](../interfaces/internal-ParamTypeProps.md#type)

#### Defined in

packages/abi-coder/dist/index.d.ts:165

___

### typeArguments

• `Optional` `Readonly` **typeArguments**: [`ParamType`](internal-ParamType.md)[]

#### Implementation of

[ParamTypeProps](../interfaces/internal-ParamTypeProps.md).[typeArguments](../interfaces/internal-ParamTypeProps.md#typearguments)

#### Defined in

packages/abi-coder/dist/index.d.ts:168

## Methods

### getSighash

▸ **getSighash**(): `string`

#### Returns

`string`

#### Defined in

packages/abi-coder/dist/index.d.ts:173

___

### getSignatureContent

▸ **getSignatureContent**(): `string`

#### Returns

`string`

#### Defined in

packages/abi-coder/dist/index.d.ts:172

___

### getSignaturePrefix

▸ **getSignaturePrefix**(): `string`

#### Returns

`string`

#### Defined in

packages/abi-coder/dist/index.d.ts:171

___

### fromObject

▸ `Static` **fromObject**(`value`): [`ParamType`](internal-ParamType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`JsonFragmentType`](../interfaces/internal-JsonFragmentType.md) \| [`ParamTypeProps`](../interfaces/internal-ParamTypeProps.md) |

#### Returns

[`ParamType`](internal-ParamType.md)

#### Defined in

packages/abi-coder/dist/index.d.ts:174

___

### isParamType

▸ `Static` **isParamType**(`value?`): value is ParamType

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | [`ParamType`](internal-ParamType.md) \| [`JsonFragmentType`](../interfaces/internal-JsonFragmentType.md) |

#### Returns

value is ParamType

#### Defined in

packages/abi-coder/dist/index.d.ts:175
