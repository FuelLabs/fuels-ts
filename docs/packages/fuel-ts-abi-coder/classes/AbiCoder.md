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

[packages/abi-coder/src/abi-coder.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L30)

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

[packages/abi-coder/src/abi-coder.ts:112](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L112)

___

### encode

▸ **encode**(`types`, `values`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | readonly [`JsonAbiFragmentType`](../interfaces/JsonAbiFragmentType.md)[] |
| `values` | [`InputValue`](../index.md#inputvalue)[] |

#### Returns

`Uint8Array`

#### Defined in

[packages/abi-coder/src/abi-coder.ts:97](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L97)

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

[packages/abi-coder/src/abi-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L34)
