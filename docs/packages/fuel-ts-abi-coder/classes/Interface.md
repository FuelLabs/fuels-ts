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

[abi-coder/src/interface.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L32)

## Properties

### abiCoder

• `Readonly` **abiCoder**: [`AbiCoder`](AbiCoder.md)

#### Defined in

[abi-coder/src/interface.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L30)

___

### fragments

• `Readonly` **fragments**: [`Fragment`](Fragment.md)[]

#### Defined in

[abi-coder/src/interface.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L28)

___

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: [`FunctionFragment`](FunctionFragment.md)

#### Defined in

[abi-coder/src/interface.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L29)

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

[abi-coder/src/interface.ts:84](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L84)

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

[abi-coder/src/interface.ts:128](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L128)

___

### encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](FunctionFragment.md) | `undefined` |
| `values` | readonly `any`[] | `[]` |

#### Returns

`string`

#### Defined in

[abi-coder/src/interface.ts:100](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L100)

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

[abi-coder/src/interface.ts:137](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L137)

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

[abi-coder/src/interface.ts:61](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L61)

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

[abi-coder/src/interface.ts:54](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L54)
