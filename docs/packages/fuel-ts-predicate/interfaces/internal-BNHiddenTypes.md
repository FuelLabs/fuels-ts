---
layout: default
title: BNHiddenTypes
parent: "@fuel-ts/predicate"
nav_order: 2

---

# Interface: BNHiddenTypes

[@fuel-ts/predicate](../index.md).[internal](../namespaces/internal.md).BNHiddenTypes

## Implemented by

- [`BN`](../classes/internal-BN.md)

## Properties

### divmod

• **divmod**: (`num`: [`BNInput`](../namespaces/internal.md#bninput), `mode?`: `string`, `positive?`: `boolean`) => { `div`: [`BN`](../classes/internal-BN.md) ; `mod`: [`BN`](../classes/internal-BN.md)  }

#### Type declaration

▸ (`num`, `mode?`, `positive?`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `num` | [`BNInput`](../namespaces/internal.md#bninput) |
| `mode?` | `string` |
| `positive?` | `boolean` |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `div` | [`BN`](../classes/internal-BN.md) |
| `mod` | [`BN`](../classes/internal-BN.md) |

#### Defined in

[packages/math/src/bn.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L39)

___

### mulTo

• **mulTo**: (`num`: [`BN`](../classes/internal-BN.md), `out`: [`BN`](../classes/internal-BN.md)) => [`BN`](../classes/internal-BN.md)

#### Type declaration

▸ (`num`, `out`): [`BN`](../classes/internal-BN.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `num` | [`BN`](../classes/internal-BN.md) |
| `out` | [`BN`](../classes/internal-BN.md) |

##### Returns

[`BN`](../classes/internal-BN.md)

#### Defined in

[packages/math/src/bn.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L38)
