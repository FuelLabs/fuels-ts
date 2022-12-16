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

[packages/abi-coder/src/interface.ts:46](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L46)

## Properties

### abi

• `Readonly` **abi**: ``null`` \| [`ABI`](ABI.md)

#### Defined in

[packages/abi-coder/src/interface.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L42)

___

### abiCoder

• `Readonly` **abiCoder**: [`AbiCoder`](AbiCoder.md)

#### Defined in

[packages/abi-coder/src/interface.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L41)

___

### fragments

• `Readonly` **fragments**: [`Fragment`](Fragment.md)[]

#### Defined in

[packages/abi-coder/src/interface.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L39)

___

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: [`FunctionFragment`](FunctionFragment.md)

#### Defined in

[packages/abi-coder/src/interface.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L40)

___

### loggedTypes

• `Readonly` **loggedTypes**: readonly [`JsonAbiLogFragment`](../interfaces/JsonAbiLogFragment.md)[]

#### Defined in

[packages/abi-coder/src/interface.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L44)

___

### types

• `Readonly` **types**: readonly [`JsonFlatAbiFragmentType`](../interfaces/JsonFlatAbiFragmentType.md)[]

#### Defined in

[packages/abi-coder/src/interface.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L43)

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

[packages/abi-coder/src/interface.ts:105](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L105)

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

[packages/abi-coder/src/interface.ts:146](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L146)

___

### decodeLog

▸ **decodeLog**(`data`, `logId`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BytesLike` |
| `logId` | `number` |

#### Returns

`any`

#### Defined in

[packages/abi-coder/src/interface.ts:155](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L155)

___

### encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`, `offset?`): `Uint8Array`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](FunctionFragment.md) | `undefined` |
| `values` | [`InputValue`](../index.md#inputvalue)<`void`\>[] | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`Uint8Array`

#### Defined in

[packages/abi-coder/src/interface.ts:121](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L121)

___

### encodeFunctionResult

▸ **encodeFunctionResult**(`functionFragment`, `values`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](FunctionFragment.md) |
| `values` | [`InputValue`](../index.md#inputvalue)<`void`\>[] |

#### Returns

`Uint8Array`

#### Defined in

[packages/abi-coder/src/interface.ts:163](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L163)

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

[packages/abi-coder/src/interface.ts:82](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L82)

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

[packages/abi-coder/src/interface.ts:73](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/interface.ts#L73)
