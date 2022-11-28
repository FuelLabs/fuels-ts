---
layout: default
title: BN
parent: "@fuel-ts/math"
nav_order: 1

---

# Class: BN

[@fuel-ts/math](../index.md).BN

## Hierarchy

- `BN`

  ↳ **`BN`**

## Implements

- [`BNInputOverrides`](../interfaces/internal-BNInputOverrides.md)
- [`BNHiddenTypes`](../interfaces/internal-BNHiddenTypes.md)
- [`BNHelper`](../interfaces/internal-BNHelper.md)
- [`BNOverrides`](../interfaces/internal-BNOverrides.md)

## Constructors

### constructor

• **new BN**(`value?`, `base?`, `endian?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | ``null`` \| [`BNInput`](../index.md#bninput) |
| `base?` | `number` \| ``"hex"`` |
| `endian?` | `Endianness` |

#### Overrides

BnJs.constructor

#### Defined in

[packages/math/src/bn.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L44)

## Methods

### abs

▸ **abs**(): [`BN`](BN.md)

#### Returns

[`BN`](BN.md)

#### Implementation of

BNOverrides.abs

#### Overrides

BnJs.abs

#### Defined in

[packages/math/src/bn.ts:198](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L198)

___

### add

▸ **add**(`v`): [`BN`](BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |

#### Returns

[`BN`](BN.md)

#### Implementation of

BNInputOverrides.add

#### Overrides

BnJs.add

#### Defined in

[packages/math/src/bn.ts:136](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L136)

___

### caller

▸ **caller**(`v`, `methodName`): `boolean` \| [`BN`](BN.md) \| [`CompareResult`](../namespaces/internal.md#compareresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |
| `methodName` | keyof [`BNInputOverrides`](../interfaces/internal-BNInputOverrides.md) |

#### Returns

`boolean` \| [`BN`](BN.md) \| [`CompareResult`](../namespaces/internal.md#compareresult)

#### Implementation of

[BNHelper](../interfaces/internal-BNHelper.md).[caller](../interfaces/internal-BNHelper.md#caller)

#### Defined in

[packages/math/src/bn.ts:212](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L212)

___

### clone

▸ **clone**(): [`BN`](BN.md)

#### Returns

[`BN`](BN.md)

#### Overrides

BnJs.clone

#### Defined in

[packages/math/src/bn.ts:226](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L226)

___

### cmp

▸ **cmp**(`v`): [`CompareResult`](../namespaces/internal.md#compareresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |

#### Returns

[`CompareResult`](../namespaces/internal.md#compareresult)

#### Implementation of

BNInputOverrides.cmp

#### Overrides

BnJs.cmp

#### Defined in

[packages/math/src/bn.ts:184](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L184)

___

### div

▸ **div**(`v`): [`BN`](BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |

#### Returns

[`BN`](BN.md)

#### Implementation of

BNInputOverrides.div

#### Overrides

BnJs.div

#### Defined in

[packages/math/src/bn.ts:148](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L148)

___

### divRound

▸ **divRound**(`v`): [`BN`](BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |

#### Returns

[`BN`](BN.md)

#### Implementation of

BNInputOverrides.divRound

#### Overrides

BnJs.divRound

#### Defined in

[packages/math/src/bn.ts:160](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L160)

___

### divmod

▸ **divmod**(`num`, `mode?`, `positive?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | [`BNInput`](../index.md#bninput) |
| `mode?` | `string` |
| `positive?` | `boolean` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `div` | [`BN`](BN.md) |
| `mod` | [`BN`](BN.md) |

#### Implementation of

BNHiddenTypes.divmod

#### Overrides

BnJs.divmod

#### Defined in

[packages/math/src/bn.ts:246](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L246)

___

### egcd

▸ **egcd**(`p`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `BN` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `a` | [`BN`](BN.md) |
| `b` | [`BN`](BN.md) |
| `gcd` | [`BN`](BN.md) |

#### Overrides

BnJs.egcd

#### Defined in

[packages/math/src/bn.ts:236](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L236)

___

### eq

▸ **eq**(`v`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |

#### Returns

`boolean`

#### Implementation of

BNInputOverrides.eq

#### Overrides

BnJs.eq

#### Defined in

[packages/math/src/bn.ts:180](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L180)

___

### format

▸ **format**(`options?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`FormatConfig`](../index.md#formatconfig) |

#### Returns

`string`

#### Defined in

[packages/math/src/bn.ts:98](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L98)

___

### formatUnits

▸ **formatUnits**(`units?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `units` | `number` | `DECIMAL_UNITS` |

#### Returns

`string`

#### Defined in

[packages/math/src/bn.ts:122](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L122)

___

### fromTwos

▸ **fromTwos**(`width`): [`BN`](BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |

#### Returns

[`BN`](BN.md)

#### Implementation of

BNOverrides.fromTwos

#### Overrides

BnJs.fromTwos

#### Defined in

[packages/math/src/bn.ts:206](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L206)

___

### gt

▸ **gt**(`v`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |

#### Returns

`boolean`

#### Implementation of

BNInputOverrides.gt

#### Overrides

BnJs.gt

#### Defined in

[packages/math/src/bn.ts:172](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L172)

___

### gte

▸ **gte**(`v`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |

#### Returns

`boolean`

#### Implementation of

BNInputOverrides.gte

#### Overrides

BnJs.gte

#### Defined in

[packages/math/src/bn.ts:176](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L176)

___

### lt

▸ **lt**(`v`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |

#### Returns

`boolean`

#### Implementation of

BNInputOverrides.lt

#### Overrides

BnJs.lt

#### Defined in

[packages/math/src/bn.ts:164](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L164)

___

### lte

▸ **lte**(`v`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |

#### Returns

`boolean`

#### Implementation of

BNInputOverrides.lte

#### Overrides

BnJs.lte

#### Defined in

[packages/math/src/bn.ts:168](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L168)

___

### mod

▸ **mod**(`v`): [`BN`](BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |

#### Returns

[`BN`](BN.md)

#### Implementation of

BNInputOverrides.mod

#### Overrides

BnJs.mod

#### Defined in

[packages/math/src/bn.ts:156](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L156)

___

### mul

▸ **mul**(`v`): [`BN`](BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |

#### Returns

[`BN`](BN.md)

#### Implementation of

BNInputOverrides.mul

#### Overrides

BnJs.mul

#### Defined in

[packages/math/src/bn.ts:152](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L152)

___

### mulTo

▸ **mulTo**(`num`, `out`): [`BN`](BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | [`BN`](BN.md) |
| `out` | [`BN`](BN.md) |

#### Returns

[`BN`](BN.md)

#### Implementation of

BNHiddenTypes.mulTo

#### Defined in

[packages/math/src/bn.ts:230](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L230)

___

### neg

▸ **neg**(): [`BN`](BN.md)

#### Returns

[`BN`](BN.md)

#### Implementation of

BNOverrides.neg

#### Overrides

BnJs.neg

#### Defined in

[packages/math/src/bn.ts:194](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L194)

___

### pow

▸ **pow**(`v`): [`BN`](BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |

#### Returns

[`BN`](BN.md)

#### Implementation of

BNInputOverrides.pow

#### Overrides

BnJs.pow

#### Defined in

[packages/math/src/bn.ts:140](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L140)

___

### sqr

▸ **sqr**(): [`BN`](BN.md)

#### Returns

[`BN`](BN.md)

#### Implementation of

BNOverrides.sqr

#### Overrides

BnJs.sqr

#### Defined in

[packages/math/src/bn.ts:190](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L190)

___

### sub

▸ **sub**(`v`): [`BN`](BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../index.md#bninput) |

#### Returns

[`BN`](BN.md)

#### Implementation of

BNInputOverrides.sub

#### Overrides

BnJs.sub

#### Defined in

[packages/math/src/bn.ts:144](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L144)

___

### toBytes

▸ **toBytes**(`bytesPadding?`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytesPadding?` | `number` |

#### Returns

`Uint8Array`

#### Implementation of

BNHelper.toBytes

#### Defined in

[packages/math/src/bn.ts:82](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L82)

___

### toHex

▸ **toHex**(`bytesPadding?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytesPadding?` | `number` |

#### Returns

`string`

#### Implementation of

BNHelper.toHex

#### Defined in

[packages/math/src/bn.ts:68](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L68)

___

### toJSON

▸ **toJSON**(): `string`

#### Returns

`string`

#### Implementation of

BNHelper.toJSON

#### Overrides

BnJs.toJSON

#### Defined in

[packages/math/src/bn.ts:90](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L90)

___

### toString

▸ **toString**(`base?`, `length?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `base?` | `number` \| ``"hex"`` |
| `length?` | `number` |

#### Returns

`string`

#### Overrides

BnJs.toString

#### Defined in

[packages/math/src/bn.ts:60](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L60)

___

### toTwos

▸ **toTwos**(`width`): [`BN`](BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |

#### Returns

[`BN`](BN.md)

#### Implementation of

BNOverrides.toTwos

#### Overrides

BnJs.toTwos

#### Defined in

[packages/math/src/bn.ts:202](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L202)

___

### valueOf

▸ **valueOf**(): `string`

#### Returns

`string`

#### Defined in

[packages/math/src/bn.ts:94](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L94)
