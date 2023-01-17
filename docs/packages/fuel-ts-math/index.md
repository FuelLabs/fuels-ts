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

• `Const` **DEFAULT\_MIN\_PRECISION**: ``3``

#### Defined in

[packages/math/src/constants.ts:2](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/constants.ts#L2)

___

### DEFAULT\_PRECISION

• `Const` **DEFAULT\_PRECISION**: ``9``

#### Defined in

[packages/math/src/constants.ts:1](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/constants.ts#L1)

## Functions

### bn

▸ **bn**(`value?`, `base?`, `endian?`): [`BN`](classes/BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | ``null`` \| [`BNInput`](index.md#bninput) |
| `base?` | `number` \| ``"hex"`` |
| `endian?` | `Endianness` |

#### Returns

[`BN`](classes/BN.md)

#### Defined in

[packages/math/src/bn.ts:258](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L258)

___

### format

▸ **format**(`value`, `options?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`BNInput`](index.md#bninput) |
| `options?` | [`FormatConfig`](index.md#formatconfig) |

#### Returns

`string`

#### Defined in

[packages/math/src/functional.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/functional.ts#L30)

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

#### Defined in

[packages/math/src/functional.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/functional.ts#L25)

___

### max

▸ **max**(...`numbers`): [`BN`](classes/BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...numbers` | [`BigNumberish`](index.md#bignumberish)[] |

#### Returns

[`BN`](classes/BN.md)

#### Defined in

[packages/math/src/math.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/math.ts#L5)

___

### multiply

▸ **multiply**(...`numbers`): [`BN`](classes/BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...numbers` | [`BigNumberish`](index.md#bignumberish)[] |

#### Returns

[`BN`](classes/BN.md)

#### Defined in

[packages/math/src/math.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/math.ts#L9)

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

#### Defined in

[packages/math/src/functional.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/functional.ts#L20)

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

#### Defined in

[packages/math/src/decimal.ts:4](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/decimal.ts#L4)

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

#### Defined in

[packages/math/src/functional.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/functional.ts#L15)

___

### toNumber

▸ **toNumber**(`value`): `number`

Functional shortcuts

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`BNInput`](index.md#bninput) |

#### Returns

`number`

#### Defined in

[packages/math/src/functional.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/functional.ts#L10)
