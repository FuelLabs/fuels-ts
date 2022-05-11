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

• **new Interface**(`jsonAbi`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonAbi` | [`JsonAbi`](../index.md#jsonabi) |

#### Defined in

[packages/abi-coder/src/interface.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L35)

## Properties

### abiCoder

• `Readonly` **abiCoder**: [`AbiCoder`](AbiCoder.md)

#### Defined in

[packages/abi-coder/src/interface.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L33)

___

### fragments

• `Readonly` **fragments**: [`Fragment`](Fragment.md)[]

#### Defined in

[packages/abi-coder/src/interface.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L31)

___

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: [`FunctionFragment`](FunctionFragment.md)

#### Defined in

[packages/abi-coder/src/interface.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L32)

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

[packages/abi-coder/src/interface.ts:87](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L87)

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

[packages/abi-coder/src/interface.ts:127](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L127)

___

### encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](FunctionFragment.md) |
| `values` | [`Values`](../index.md#values)[] \| `Record`<`string`, `any`\> |

#### Returns

`string`

#### Defined in

[packages/abi-coder/src/interface.ts:103](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L103)

___

### encodeFunctionResult

▸ **encodeFunctionResult**(`functionFragment`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](FunctionFragment.md) |
| `values` | [`Values`](../index.md#values)[] \| `Record`<`string`, `any`\> |

#### Returns

`string`

#### Defined in

[packages/abi-coder/src/interface.ts:136](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L136)

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

[packages/abi-coder/src/interface.ts:64](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L64)

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

[packages/abi-coder/src/interface.ts:57](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L57)
