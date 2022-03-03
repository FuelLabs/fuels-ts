---
layout: default
title: Interface
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: Interface

[@fuel-ts/abi-coder](../index.md).Interface

## Constructors

### constructor

• **new Interface**(`fragments`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fragments` | readonly [`JsonFragment`](../interfaces/JsonFragment.md)[] |

#### Defined in

[abi-coder/src/interface.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L33)

## Properties

### abiCoder

• `Readonly` **abiCoder**: [`AbiCoder`](AbiCoder.md)

#### Defined in

[abi-coder/src/interface.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L31)

___

### fragments

• `Readonly` **fragments**: [`Fragment`](Fragment.md)[]

#### Defined in

[abi-coder/src/interface.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L29)

___

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: [`FunctionFragment`](FunctionFragment.md)

#### Defined in

[abi-coder/src/interface.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L30)

## Methods

### decodeFunctionData

▸ **decodeFunctionData**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](FunctionFragment.md) |
| `data` | `BytesLike` |

#### Returns

`any`

#### Defined in

[abi-coder/src/interface.ts:85](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L85)

___

### decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](FunctionFragment.md) |
| `data` | `BytesLike` |

#### Returns

`any`

#### Defined in

[abi-coder/src/interface.ts:133](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L133)

___

### encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](FunctionFragment.md) | `undefined` |
| `values` | readonly [`Values`](../index.md#values)[] | `[]` |

#### Returns

`string`

#### Defined in

[abi-coder/src/interface.ts:101](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L101)

___

### encodeFunctionResult

▸ **encodeFunctionResult**(`functionFragment`, `values?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](FunctionFragment.md) | `undefined` |
| `values` | readonly `any`[] | `[]` |

#### Returns

`string`

#### Defined in

[abi-coder/src/interface.ts:142](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L142)

___

### getFunction

▸ **getFunction**(`nameOrSignatureOrSighash`): [`FunctionFragment`](FunctionFragment.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrSighash` | `string` |

#### Returns

[`FunctionFragment`](FunctionFragment.md)

#### Defined in

[abi-coder/src/interface.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L62)

___

### getSighash

▸ `Static` **getSighash**(`fragment`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fragment` | `string` \| [`FunctionFragment`](FunctionFragment.md) |

#### Returns

`string`

#### Defined in

[abi-coder/src/interface.ts:55](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L55)
