---
layout: default
title: AbiCoder
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: AbiCoder

[@fuel-ts/contract](../index.md).[internal](../namespaces/internal.md).AbiCoder

## Constructors

### constructor

• **new AbiCoder**()

#### Defined in

packages/abi-coder/dist/index.d.ts:280

## Methods

### decode

▸ **decode**(`types`, `data`): `undefined` \| [`DecodedValue`](../namespaces/internal.md#decodedvalue)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | readonly [`JsonAbiFragmentType`](../interfaces/internal-JsonAbiFragmentType.md)[] |
| `data` | `BytesLike` |

#### Returns

`undefined` \| [`DecodedValue`](../namespaces/internal.md#decodedvalue)[]

#### Defined in

packages/abi-coder/dist/index.d.ts:283

___

### encode

▸ **encode**(`types`, `values`, `offset?`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | readonly [`JsonAbiFragmentType`](../interfaces/internal-JsonAbiFragmentType.md)[] |
| `values` | [`InputValue`](../namespaces/internal.md#inputvalue)<`void`\>[] |
| `offset?` | `number` |

#### Returns

`Uint8Array`

#### Defined in

packages/abi-coder/dist/index.d.ts:282

___

### getCoder

▸ **getCoder**(`param`): [`Coder`](internal-Coder.md)<`unknown`, `unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `param` | [`JsonAbiFragmentType`](../interfaces/internal-JsonAbiFragmentType.md) |

#### Returns

[`Coder`](internal-Coder.md)<`unknown`, `unknown`\>

#### Defined in

packages/abi-coder/dist/index.d.ts:281
