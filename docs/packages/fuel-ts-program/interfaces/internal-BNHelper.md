---
layout: default
title: BNHelper
parent: "@fuel-ts/program"
nav_order: 2

---

# Interface: BNHelper

[@fuel-ts/program](../index.md).[internal](../namespaces/internal.md).BNHelper

## Implemented by

- [`BN`](../classes/internal-BN.md)

## Properties

### toBytes

• **toBytes**: (`bytesPadding?`: `number`) => `Uint8Array`

#### Type declaration

▸ (`bytesPadding?`): `Uint8Array`

##### Parameters

| Name | Type |
| :------ | :------ |
| `bytesPadding?` | `number` |

##### Returns

`Uint8Array`

#### Defined in

packages/math/dist/index.d.ts:17

___

### toHex

• **toHex**: (`bytesPadding?`: `number`) => `string`

#### Type declaration

▸ (`bytesPadding?`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `bytesPadding?` | `number` |

##### Returns

`string`

#### Defined in

packages/math/dist/index.d.ts:16

___

### toJSON

• **toJSON**: () => `string`

#### Type declaration

▸ (): `string`

##### Returns

`string`

#### Defined in

packages/math/dist/index.d.ts:18

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

#### Defined in

packages/math/dist/index.d.ts:15
