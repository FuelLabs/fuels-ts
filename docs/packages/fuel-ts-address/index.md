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

#### Defined in

[packages/address/src/utils.ts:78](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L78)

___

### fromBech32

▸ **fromBech32**(`address`): `Decoded`

Decodes a Bech32 address string into Decoded

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | \`fuel${string}\` |

#### Returns

`Decoded`

#### Defined in

[packages/address/src/utils.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L24)

___

### getBytesFromBech32

▸ **getBytesFromBech32**(`address`): `Uint8Array`

Takes a Bech32 address and returns the byte data

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | \`fuel${string}\` |

#### Returns

`Uint8Array`

#### Defined in

[packages/address/src/utils.ts:52](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L52)

___

### getRandomB256

▸ **getRandomB256**(): `string`

#### Returns

`string`

#### Defined in

[packages/address/src/utils.ts:90](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L90)

___

### isBech32

▸ **isBech32**(`address`): `boolean`

Determines if a given string is Bech32 format

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `BytesLike` |

#### Returns

`boolean`

#### Defined in

[packages/address/src/utils.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L41)

___

### normalizeBech32

▸ **normalizeBech32**(`address`): [`Bech32Address`](namespaces/internal.md#bech32address)

Takes a Bech32 address and returns a normalized (i.e. lower case) representation of it.

The input is validated along the way, which makes this significantly safer than
using `address.toLowerCase()`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | \`fuel${string}\` |

#### Returns

[`Bech32Address`](namespaces/internal.md#bech32address)

#### Defined in

[packages/address/src/utils.ts:73](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L73)

___

### toB256

▸ **toB256**(`address`): [`B256Address`](namespaces/internal.md#b256address)

Converts a Bech32 address string into B256

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | \`fuel${string}\` |

#### Returns

[`B256Address`](namespaces/internal.md#b256address)

#### Defined in

[packages/address/src/utils.ts:59](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L59)

___

### toBech32

▸ **toBech32**(`address`): [`Bech32Address`](namespaces/internal.md#bech32address)

Converts a B256 address string into Bech32

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`Bech32Address`](namespaces/internal.md#bech32address)

#### Defined in

[packages/address/src/utils.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L31)
