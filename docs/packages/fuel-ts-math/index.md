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

Ƭ **BigNumberish**: `string` \| `number` \| `BN`

#### Defined in

[packages/math/src/types.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L3)

## Functions

### bn

▸ **bn**(`value`, `base?`, `endian?`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` \| `BN` \| `Uint8Array` \| `Buffer` \| `number`[] |
| `base?` | `number` \| ``"hex"`` |
| `endian?` | `Endianness` |

#### Returns

`BN`

#### Defined in

[packages/math/src/bn.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L5)

___

### max

▸ **max**(...`numbers`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...numbers` | (`string` \| `number`)[] |

#### Returns

`string`

#### Defined in

[packages/math/src/math.ts:4](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/math.ts#L4)

___

### multiply

▸ **multiply**(...`numbers`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...numbers` | (`string` \| `number`)[] |

#### Returns

`string`

#### Defined in

[packages/math/src/math.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/math.ts#L10)

___

### toArray

▸ **toArray**(`_value`, `bytesPadding?`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_value` | `Uint8Array` \| [`BigNumberish`](index.md#bignumberish) |
| `bytesPadding?` | `number` |

#### Returns

`Uint8Array`

#### Defined in

[packages/math/src/convert.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/convert.ts#L31)

___

### toHex

▸ **toHex**(`_value`, `_bytesPadding?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_value` | `Uint8Array` \| [`BigNumberish`](index.md#bignumberish) |
| `_bytesPadding?` | `number` |

#### Returns

`string`

#### Defined in

[packages/math/src/convert.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/convert.ts#L17)

___

### toNumber

▸ **toNumber**(`_value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_value` | `Uint8Array` \| [`BigNumberish`](index.md#bignumberish) |

#### Returns

`number`

#### Defined in

[packages/math/src/convert.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/convert.ts#L10)
