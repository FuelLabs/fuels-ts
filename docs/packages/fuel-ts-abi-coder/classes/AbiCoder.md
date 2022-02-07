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

[abi-coder/src/abi-coder.ts:20](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/abi-coder.ts#L20)

## Methods

### decode

▸ **decode**(`types`, `data`): [`DecodedValue`](../index.md#decodedvalue)

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | readonly (`string` \| `ParamType`)[] |
| `data` | `BytesLike` |

#### Returns

[`DecodedValue`](../index.md#decodedvalue)

#### Defined in

[abi-coder/src/abi-coder.ts:67](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/abi-coder.ts#L67)

___

### encode

▸ **encode**(`types`, `values`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | readonly (`string` \| `ParamType`)[] |
| `values` | readonly [`Values`](../index.md#values)[] |

#### Returns

`string`

#### Defined in

[abi-coder/src/abi-coder.ts:54](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/abi-coder.ts#L54)

___

### getCoder

▸ **getCoder**(`param`): [`Coder`](Coder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `param` | `ParamType` |

#### Returns

[`Coder`](Coder.md)

#### Defined in

[abi-coder/src/abi-coder.ts:24](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/abi-coder/src/abi-coder.ts#L24)
