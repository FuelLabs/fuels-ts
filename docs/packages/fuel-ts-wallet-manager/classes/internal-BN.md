---
layout: default
title: BN
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: BN

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).BN

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
| `value?` | ``null`` \| [`BNInput`](../namespaces/internal.md#bninput) |
| `base?` | `number` \| ``"hex"`` |
| `endian?` | `Endianness` |

#### Overrides

BnJs.constructor

#### Defined in

packages/math/dist/index.d.ts:51

## Methods

### abs

▸ **abs**(): [`BN`](internal-BN.md)

#### Returns

[`BN`](internal-BN.md)

#### Implementation of

BNOverrides.abs

#### Overrides

BnJs.abs

#### Defined in

packages/math/dist/index.d.ts:74

___

### add

▸ **add**(`v`): [`BN`](internal-BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |

#### Returns

[`BN`](internal-BN.md)

#### Implementation of

BNInputOverrides.add

#### Overrides

BnJs.add

#### Defined in

packages/math/dist/index.d.ts:59

___

### caller

▸ **caller**(`v`, `methodName`): `boolean` \| [`BN`](internal-BN.md) \| [`CompareResult`](../namespaces/internal.md#compareresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |
| `methodName` | keyof [`BNInputOverrides`](../interfaces/internal-BNInputOverrides.md) |

#### Returns

`boolean` \| [`BN`](internal-BN.md) \| [`CompareResult`](../namespaces/internal.md#compareresult)

#### Implementation of

[BNHelper](../interfaces/internal-BNHelper.md).[caller](../interfaces/internal-BNHelper.md#caller)

#### Defined in

packages/math/dist/index.d.ts:77

___

### clone

▸ **clone**(): [`BN`](internal-BN.md)

#### Returns

[`BN`](internal-BN.md)

#### Overrides

BnJs.clone

#### Defined in

packages/math/dist/index.d.ts:78

___

### cmp

▸ **cmp**(`v`): [`CompareResult`](../namespaces/internal.md#compareresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |

#### Returns

[`CompareResult`](../namespaces/internal.md#compareresult)

#### Implementation of

BNInputOverrides.cmp

#### Overrides

BnJs.cmp

#### Defined in

packages/math/dist/index.d.ts:71

___

### div

▸ **div**(`v`): [`BN`](internal-BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |

#### Returns

[`BN`](internal-BN.md)

#### Implementation of

BNInputOverrides.div

#### Overrides

BnJs.div

#### Defined in

packages/math/dist/index.d.ts:62

___

### divRound

▸ **divRound**(`v`): [`BN`](internal-BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |

#### Returns

[`BN`](internal-BN.md)

#### Implementation of

BNInputOverrides.divRound

#### Overrides

BnJs.divRound

#### Defined in

packages/math/dist/index.d.ts:65

___

### divmod

▸ **divmod**(`num`, `mode?`, `positive?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | [`BNInput`](../namespaces/internal.md#bninput) |
| `mode?` | `string` |
| `positive?` | `boolean` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `div` | [`BN`](internal-BN.md) |
| `mod` | [`BN`](internal-BN.md) |

#### Implementation of

BNHiddenTypes.divmod

#### Overrides

BnJs.divmod

#### Defined in

packages/math/dist/index.d.ts:85

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
| `a` | [`BN`](internal-BN.md) |
| `b` | [`BN`](internal-BN.md) |
| `gcd` | [`BN`](internal-BN.md) |

#### Overrides

BnJs.egcd

#### Defined in

packages/math/dist/index.d.ts:80

___

### eq

▸ **eq**(`v`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |

#### Returns

`boolean`

#### Implementation of

BNInputOverrides.eq

#### Overrides

BnJs.eq

#### Defined in

packages/math/dist/index.d.ts:70

___

### format

▸ **format**(`options?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`FormatConfig`](../namespaces/internal.md#formatconfig) |

#### Returns

`string`

#### Defined in

packages/math/dist/index.d.ts:57

___

### formatUnits

▸ **formatUnits**(`units?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `units?` | `number` |

#### Returns

`string`

#### Defined in

packages/math/dist/index.d.ts:58

___

### fromTwos

▸ **fromTwos**(`width`): [`BN`](internal-BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |

#### Returns

[`BN`](internal-BN.md)

#### Implementation of

BNOverrides.fromTwos

#### Overrides

BnJs.fromTwos

#### Defined in

packages/math/dist/index.d.ts:76

___

### gt

▸ **gt**(`v`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |

#### Returns

`boolean`

#### Implementation of

BNInputOverrides.gt

#### Overrides

BnJs.gt

#### Defined in

packages/math/dist/index.d.ts:68

___

### gte

▸ **gte**(`v`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |

#### Returns

`boolean`

#### Implementation of

BNInputOverrides.gte

#### Overrides

BnJs.gte

#### Defined in

packages/math/dist/index.d.ts:69

___

### lt

▸ **lt**(`v`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |

#### Returns

`boolean`

#### Implementation of

BNInputOverrides.lt

#### Overrides

BnJs.lt

#### Defined in

packages/math/dist/index.d.ts:66

___

### lte

▸ **lte**(`v`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |

#### Returns

`boolean`

#### Implementation of

BNInputOverrides.lte

#### Overrides

BnJs.lte

#### Defined in

packages/math/dist/index.d.ts:67

___

### mod

▸ **mod**(`v`): [`BN`](internal-BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |

#### Returns

[`BN`](internal-BN.md)

#### Implementation of

BNInputOverrides.mod

#### Overrides

BnJs.mod

#### Defined in

packages/math/dist/index.d.ts:64

___

### mul

▸ **mul**(`v`): [`BN`](internal-BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |

#### Returns

[`BN`](internal-BN.md)

#### Implementation of

BNInputOverrides.mul

#### Overrides

BnJs.mul

#### Defined in

packages/math/dist/index.d.ts:63

___

### mulTo

▸ **mulTo**(`num`, `out`): [`BN`](internal-BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | [`BN`](internal-BN.md) |
| `out` | [`BN`](internal-BN.md) |

#### Returns

[`BN`](internal-BN.md)

#### Implementation of

BNHiddenTypes.mulTo

#### Defined in

packages/math/dist/index.d.ts:79

___

### neg

▸ **neg**(): [`BN`](internal-BN.md)

#### Returns

[`BN`](internal-BN.md)

#### Implementation of

BNOverrides.neg

#### Overrides

BnJs.neg

#### Defined in

packages/math/dist/index.d.ts:73

___

### pow

▸ **pow**(`v`): [`BN`](internal-BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |

#### Returns

[`BN`](internal-BN.md)

#### Implementation of

BNInputOverrides.pow

#### Overrides

BnJs.pow

#### Defined in

packages/math/dist/index.d.ts:60

___

### sqr

▸ **sqr**(): [`BN`](internal-BN.md)

#### Returns

[`BN`](internal-BN.md)

#### Implementation of

BNOverrides.sqr

#### Overrides

BnJs.sqr

#### Defined in

packages/math/dist/index.d.ts:72

___

### sub

▸ **sub**(`v`): [`BN`](internal-BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`BNInput`](../namespaces/internal.md#bninput) |

#### Returns

[`BN`](internal-BN.md)

#### Implementation of

BNInputOverrides.sub

#### Overrides

BnJs.sub

#### Defined in

packages/math/dist/index.d.ts:61

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

packages/math/dist/index.d.ts:54

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

packages/math/dist/index.d.ts:53

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

packages/math/dist/index.d.ts:55

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

packages/math/dist/index.d.ts:52

___

### toTwos

▸ **toTwos**(`width`): [`BN`](internal-BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |

#### Returns

[`BN`](internal-BN.md)

#### Implementation of

BNOverrides.toTwos

#### Overrides

BnJs.toTwos

#### Defined in

packages/math/dist/index.d.ts:75

___

### valueOf

▸ **valueOf**(): `string`

#### Returns

`string`

#### Defined in

packages/math/dist/index.d.ts:56
