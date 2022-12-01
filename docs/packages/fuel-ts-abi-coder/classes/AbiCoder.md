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

[packages/abi-coder/src/abi-coder.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L36)

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

[packages/abi-coder/src/abi-coder.ts:158](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L158)

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

[packages/abi-coder/src/abi-coder.ts:121](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L121)

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

[packages/abi-coder/src/abi-coder.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/abi-coder.ts#L40)
