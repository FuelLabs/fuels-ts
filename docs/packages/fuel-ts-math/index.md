---
layout: default
title: "@fuel-ts/math"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/math

## Type Aliases

### BigNumberish

Ƭ **BigNumberish**: `string` \| `number` \| `bigint`

#### Defined in

[packages/math/src/types.ts:1](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L1)

## Functions

### max

▸ **max**(...`numbers`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...numbers` | `bigint`[] |

#### Returns

`bigint`

#### Defined in

[packages/math/src/math.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/math.ts#L3)

___

### multiply

▸ **multiply**(...`numbers`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...numbers` | (`number` \| `bigint`)[] |

#### Returns

`bigint`

#### Defined in

[packages/math/src/math.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/math.ts#L7)

___

### toArray

▸ **toArray**(`_value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_value` | [`BigNumberish`](index.md#bignumberish) |

#### Returns

`Uint8Array`

#### Defined in

[packages/math/src/convert.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/convert.ts#L62)

___

### toBigInt

▸ **toBigInt**(`_value`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_value` | [`BigNumberish`](index.md#bignumberish) \| `Uint8Array` |

#### Returns

`bigint`

#### Defined in

[packages/math/src/convert.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/convert.ts#L14)

___

### toHex

▸ **toHex**(`_value`, `width?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_value` | [`BigNumberish`](index.md#bignumberish) |
| `width?` | `number` |

#### Returns

`string`

#### Defined in

[packages/math/src/convert.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/convert.ts#L35)

___

### toNumber

▸ **toNumber**(`_value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_value` | [`BigNumberish`](index.md#bignumberish) \| `Uint8Array` |

#### Returns

`number`

#### Defined in

[packages/math/src/convert.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/convert.ts#L26)
