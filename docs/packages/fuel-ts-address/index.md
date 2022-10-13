---
layout: default
title: "@fuel-ts/address"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/address

## Namespaces

- [internal](namespaces/internal.md)

## Classes

- [Address](classes/Address.md)

## Variables

### FUEL\_BECH32\_HRP\_PREFIX

• `Const` **FUEL\_BECH32\_HRP\_PREFIX**: ``"fuel"``

#### Defined in

[packages/address/src/utils.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L19)

## Functions

### addressify

▸ **addressify**(`addressLike`): [`AbstractAddress`](classes/internal-AbstractAddress.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressLike` | [`AbstractAddress`](classes/internal-AbstractAddress.md) \| [`AbstractContract`](classes/internal-AbstractContract.md) \| [`AbstractWallet`](classes/internal-AbstractWallet.md) |

#### Returns

[`AbstractAddress`](classes/internal-AbstractAddress.md)

___

### fromBech32

▸ **fromBech32**(`address`): `Decoded`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | \`fuel${string}\` |

#### Returns

`Decoded`

___

### getBytesFromBech32

▸ **getBytesFromBech32**(`address`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | \`fuel${string}\` |

#### Returns

`Uint8Array`

___

### getRandomB256

▸ **getRandomB256**(): `string`

#### Returns

`string`

___

### isBech32

▸ **isBech32**(`address`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `BytesLike` |

#### Returns

`boolean`

___

### normalizeBech32

▸ **normalizeBech32**(`address`): [`Bech32Address`](namespaces/internal.md#bech32address)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | \`fuel${string}\` |

#### Returns

[`Bech32Address`](namespaces/internal.md#bech32address)

___

### toB256

▸ **toB256**(`address`): [`B256Address`](namespaces/internal.md#b256address)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | \`fuel${string}\` |

#### Returns

[`B256Address`](namespaces/internal.md#b256address)

___

### toBech32

▸ **toBech32**(`address`): [`Bech32Address`](namespaces/internal.md#bech32address)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`Bech32Address`](namespaces/internal.md#bech32address)
