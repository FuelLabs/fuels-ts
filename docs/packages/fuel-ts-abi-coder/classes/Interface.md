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

[packages/abi-coder/src/interface.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L36)

## Properties

### abiCoder

• `Readonly` **abiCoder**: [`AbiCoder`](AbiCoder.md)

#### Defined in

[packages/abi-coder/src/interface.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L34)

___

### fragments

• `Readonly` **fragments**: [`Fragment`](Fragment.md)[]

#### Defined in

[packages/abi-coder/src/interface.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L32)

___

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: [`FunctionFragment`](FunctionFragment.md)

#### Defined in

[packages/abi-coder/src/interface.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L33)

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

[packages/abi-coder/src/interface.ts:90](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L90)

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

[packages/abi-coder/src/interface.ts:130](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L130)

___

### encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](FunctionFragment.md) |
| `values` | [`InputValue`](../index.md#inputvalue)[] |

#### Returns

`Uint8Array`

#### Defined in

[packages/abi-coder/src/interface.ts:106](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L106)

___

### encodeFunctionResult

▸ **encodeFunctionResult**(`functionFragment`, `values`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](FunctionFragment.md) |
| `values` | [`InputValue`](../index.md#inputvalue)[] |

#### Returns

`Uint8Array`

#### Defined in

[packages/abi-coder/src/interface.ts:139](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L139)

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

[packages/abi-coder/src/interface.ts:67](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L67)

___

### getSighash

▸ `Static` **getSighash**(`fragment`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fragment` | `string` \| [`FunctionFragment`](FunctionFragment.md) |

#### Returns

`Uint8Array`

#### Defined in

[packages/abi-coder/src/interface.ts:58](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L58)
