---
layout: default
title: BNHelper
parent: "@fuel-ts/transactions"
nav_order: 2

---

# Interface: BNHelper

[@fuel-ts/transactions](../index.md).[internal](../namespaces/internal.md).BNHelper

## Implemented by

- [`BN`](../classes/internal-BN.md)

## Methods

### caller

▸ **caller**(`v`, `methodName`): `boolean` \| [`BN`](../classes/internal-BN.md) \| [`CompareResult`](../namespaces/internal.md#compareresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |
| `methodName` | `string` |

#### Returns

`boolean` \| [`BN`](../classes/internal-BN.md) \| [`CompareResult`](../namespaces/internal.md#compareresult)

___

### toBytes

▸ **toBytes**(`bytesPadding?`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytesPadding?` | `number` |

#### Returns

`Uint8Array`

___

### toHex

▸ **toHex**(`bytesPadding?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytesPadding?` | `number` |

#### Returns

`string`

___

### toJSON

▸ **toJSON**(): `string`

#### Returns

`string`
