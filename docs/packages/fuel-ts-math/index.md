---
layout: default
title: "@fuel-ts/math"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/math

## Namespaces

- [bn](namespaces/bn.md)
- [internal](namespaces/internal.md)

## Classes

- [BN](classes/BN.md)

## Type Aliases

### BNInput

Ƭ **BNInput**: `number` \| `string` \| `number`[] \| `Uint8Array` \| `Buffer` \| `BnJs`

#### Defined in

[packages/math/src/bn.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L8)

___

### BigNumberish

Ƭ **BigNumberish**: `string` \| `number` \| [`BN`](classes/BN.md)

#### Defined in

[packages/math/src/types.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L3)

___

### FormatConfig

Ƭ **FormatConfig**: { `units?`: `number`  } & [`ToFixedConfig`](index.md#tofixedconfig)

#### Defined in

[packages/math/src/types.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L8)

___

### ToFixedConfig

Ƭ **ToFixedConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `minPrecision?` | `number` |
| `precision?` | `number` |

#### Defined in

[packages/math/src/types.ts:4](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L4)

## Variables

### DECIMAL\_UNITS

• `Const` **DECIMAL\_UNITS**: ``9``

#### Defined in

[packages/math/src/constants.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/constants.ts#L3)

___

### DEFAULT\_MIN\_PRECISION

• `Const` **DEFAULT\_MIN\_PRECISION**: ``1``

#### Defined in

[packages/math/src/constants.ts:2](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/constants.ts#L2)

___

### DEFAULT\_PRECISION

• `Const` **DEFAULT\_PRECISION**: ``3``

#### Defined in

[packages/math/src/constants.ts:1](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/constants.ts#L1)

___

### bn

• `Const` **bn**: `Object`

#### Call signature

▸ (`value?`, `base?`, `endian?`): [`BN`](classes/BN.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | ``null`` \| [`BNInput`](index.md#bninput) |
| `base?` | `number` \| ``"hex"`` |
| `endian?` | `Endianness` |

##### Returns

[`BN`](classes/BN.md)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `parseUnits` | (`value`: `string`, `units`: `number`) => [`BN`](classes/BN.md) |

#### Defined in

[packages/math/src/bn.ts:258](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L258)

[packages/math/src/bn.ts:261](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L261)

## Functions

### format

▸ **format**(`value`, `options?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`BNInput`](index.md#bninput) |
| `options?` | [`FormatConfig`](index.md#formatconfig) |

#### Returns

`string`

___

### formatUnits

▸ **formatUnits**(`value`, `units?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`BNInput`](index.md#bninput) |
| `units?` | `number` |

#### Returns

`string`

___

### max

▸ **max**(...`numbers`): [`BN`](classes/BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...numbers` | [`BigNumberish`](index.md#bignumberish)[] |

#### Returns

[`BN`](classes/BN.md)

___

### multiply

▸ **multiply**(...`numbers`): [`BN`](classes/BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...numbers` | [`BigNumberish`](index.md#bignumberish)[] |

#### Returns

[`BN`](classes/BN.md)

___

### toBytes

▸ **toBytes**(`value`, `bytesPadding?`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`BNInput`](index.md#bninput) |
| `bytesPadding?` | `number` |

#### Returns

`Uint8Array`

___

### toFixed

▸ **toFixed**(`value?`, `options?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `string` \| `number` |
| `options?` | [`ToFixedConfig`](index.md#tofixedconfig) |

#### Returns

`string`

___

### toHex

▸ **toHex**(`value`, `bytesPadding?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`BNInput`](index.md#bninput) |
| `bytesPadding?` | `number` |

#### Returns

`string`

___

### toNumber

▸ **toNumber**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`BNInput`](index.md#bninput) |

#### Returns

`number`
