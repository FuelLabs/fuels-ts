---
layout: default
title: Interface
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: Interface

[@fuel-ts/providers](../index.md).[internal](../namespaces/internal.md).Interface

## Constructors

### constructor

• **new Interface**(`jsonAbi`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonAbi` | [`JsonAbi`](../namespaces/internal.md#jsonabi) |

#### Defined in

packages/abi-coder/dist/index.d.ts:296

## Properties

### abi

• `Readonly` **abi**: ``null`` \| [`ABI`](internal-ABI.md)

#### Defined in

packages/abi-coder/dist/index.d.ts:292

___

### abiCoder

• `Readonly` **abiCoder**: [`AbiCoder`](internal-AbiCoder.md)

#### Defined in

packages/abi-coder/dist/index.d.ts:291

___

### externalLoggedTypes

• `Private` **externalLoggedTypes**: `any`

#### Defined in

packages/abi-coder/dist/index.d.ts:295

___

### fragments

• `Readonly` **fragments**: [`Fragment`](internal-Fragment.md)[]

#### Defined in

packages/abi-coder/dist/index.d.ts:287

___

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: [`FunctionFragment`](internal-FunctionFragment.md)

#### Defined in

packages/abi-coder/dist/index.d.ts:288

___

### loggedTypes

• `Readonly` **loggedTypes**: readonly [`JsonAbiLogFragment`](../interfaces/internal-JsonAbiLogFragment.md)[]

#### Defined in

packages/abi-coder/dist/index.d.ts:294

___

### types

• `Readonly` **types**: readonly [`JsonFlatAbiFragmentType`](../interfaces/internal-JsonFlatAbiFragmentType.md)[]

#### Defined in

packages/abi-coder/dist/index.d.ts:293

## Methods

### decodeFunctionData

▸ **decodeFunctionData**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](internal-FunctionFragment.md) |
| `data` | `BytesLike` |

#### Returns

`any`

#### Defined in

packages/abi-coder/dist/index.d.ts:299

___

### decodeFunctionResult

▸ **decodeFunctionResult**(`functionFragment`, `data`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](internal-FunctionFragment.md) |
| `data` | `BytesLike` |

#### Returns

`any`

#### Defined in

packages/abi-coder/dist/index.d.ts:301

___

### decodeLog

▸ **decodeLog**(`data`, `logId`, `receiptId`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BytesLike` |
| `logId` | `number` |
| `receiptId` | `string` |

#### Returns

`any`

#### Defined in

packages/abi-coder/dist/index.d.ts:302

___

### encodeFunctionData

▸ **encodeFunctionData**(`functionFragment`, `values`, `offset?`, `isMainArgs?`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](internal-FunctionFragment.md) |
| `values` | [`InputValue`](../namespaces/internal.md#inputvalue)<`void`\>[] |
| `offset?` | `number` |
| `isMainArgs?` | `boolean` |

#### Returns

`Uint8Array`

#### Defined in

packages/abi-coder/dist/index.d.ts:300

___

### encodeFunctionResult

▸ **encodeFunctionResult**(`functionFragment`, `values`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionFragment` | `string` \| [`FunctionFragment`](internal-FunctionFragment.md) |
| `values` | [`InputValue`](../namespaces/internal.md#inputvalue)<`void`\>[] |

#### Returns

`Uint8Array`

#### Defined in

packages/abi-coder/dist/index.d.ts:303

___

### getFunction

▸ **getFunction**(`nameOrSignatureOrSighash`): [`FunctionFragment`](internal-FunctionFragment.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nameOrSignatureOrSighash` | `string` |

#### Returns

[`FunctionFragment`](internal-FunctionFragment.md)

#### Defined in

packages/abi-coder/dist/index.d.ts:298

___

### updateExternalLoggedTypes

▸ **updateExternalLoggedTypes**(`id`, `loggedTypes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `loggedTypes` | [`JsonAbiLogFragment`](../interfaces/internal-JsonAbiLogFragment.md)[] |

#### Returns

`void`

#### Defined in

packages/abi-coder/dist/index.d.ts:304

___

### getSighash

▸ `Static` **getSighash**(`fragment`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fragment` | `string` \| [`FunctionFragment`](internal-FunctionFragment.md) |

#### Returns

`Uint8Array`

#### Defined in

packages/abi-coder/dist/index.d.ts:297
