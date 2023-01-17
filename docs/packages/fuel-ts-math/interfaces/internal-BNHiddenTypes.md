---
layout: default
title: BNHiddenTypes
parent: "@fuel-ts/math"
nav_order: 2

---

# Interface: BNHiddenTypes

[@fuel-ts/math](../index.md).[internal](../namespaces/internal.md).BNHiddenTypes

## Implemented by

- [`BN`](../classes/BN.md)

## Properties

### divmod

• **divmod**: (`num`: [`BNInput`](../index.md#bninput), `mode?`: `string`, `positive?`: `boolean`) => { `div`: [`BN`](../classes/BN.md) ; `mod`: [`BN`](../classes/BN.md)  }

#### Type declaration

▸ (`num`, `mode?`, `positive?`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `num` | [`BNInput`](../index.md#bninput) |
| `mode?` | `string` |
| `positive?` | `boolean` |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `div` | [`BN`](../classes/BN.md) |
| `mod` | [`BN`](../classes/BN.md) |

#### Defined in

[packages/math/src/bn.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L39)

___

### mulTo

• **mulTo**: (`num`: [`BN`](../classes/BN.md), `out`: [`BN`](../classes/BN.md)) => [`BN`](../classes/BN.md)

#### Type declaration

▸ (`num`, `out`): [`BN`](../classes/BN.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `num` | [`BN`](../classes/BN.md) |
| `out` | [`BN`](../classes/BN.md) |

##### Returns

[`BN`](../classes/BN.md)

#### Defined in

[packages/math/src/bn.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L38)
