---
layout: default
title: AbiCoder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: AbiCoder

[@fuel-ts/abi-coder](../index.md).AbiCoder

## Constructors

### constructor

• **new AbiCoder**()

#### Defined in

<<<<<<< HEAD
[packages/abi-coder/src/abi-coder.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L36)
=======
[packages/abi-coder/src/abi-coder.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L35)
>>>>>>> master

## Methods

### decode

▸ **decode**(`types`, `data`): `undefined` \| [`DecodedValue`](../index.md#decodedvalue)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | readonly [`JsonAbiFragmentType`](../interfaces/JsonAbiFragmentType.md)[] |
| `data` | `BytesLike` |

#### Returns

`undefined` \| [`DecodedValue`](../index.md#decodedvalue)[]

#### Defined in

<<<<<<< HEAD
[packages/abi-coder/src/abi-coder.ts:146](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L146)
=======
[packages/abi-coder/src/abi-coder.ts:143](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L143)
>>>>>>> master

___

### encode

▸ **encode**(`types`, `values`, `offset?`): `Uint8Array`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `types` | readonly [`JsonAbiFragmentType`](../interfaces/JsonAbiFragmentType.md)[] | `undefined` |
| `values` | [`InputValue`](../index.md#inputvalue)[] | `undefined` |
| `offset` | `number` | `0` |

#### Returns

`Uint8Array`

#### Defined in

<<<<<<< HEAD
[packages/abi-coder/src/abi-coder.ts:121](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L121)
=======
[packages/abi-coder/src/abi-coder.ts:118](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L118)
>>>>>>> master

___

### getCoder

▸ **getCoder**(`param`): [`Coder`](Coder.md)<`unknown`, `unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `param` | [`JsonAbiFragmentType`](../interfaces/JsonAbiFragmentType.md) |

#### Returns

[`Coder`](Coder.md)<`unknown`, `unknown`\>

#### Defined in

<<<<<<< HEAD
[packages/abi-coder/src/abi-coder.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L40)
=======
[packages/abi-coder/src/abi-coder.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L39)
>>>>>>> master
