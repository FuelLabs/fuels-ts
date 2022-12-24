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

[packages/address/src/utils.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L20)

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

[packages/address/src/utils.ts:93](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L93)

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

[packages/address/src/utils.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L25)

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

[packages/address/src/utils.ts:67](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L67)

___

### getRandomB256

▸ **getRandomB256**(): `string`

#### Returns

`string`

#### Defined in

[packages/address/src/utils.ts:105](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L105)

___

### isB256

▸ **isB256**(`address`): `boolean`

Determines if a given string is B256 format

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/address/src/utils.ts:53](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L53)

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

[packages/address/src/utils.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L42)

___

### isPublicKey

▸ **isPublicKey**(`address`): `boolean`

Determines if a given string is in Public Key format (512 bits)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/address/src/utils.ts:60](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L60)

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

[packages/address/src/utils.ts:88](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L88)

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

[packages/address/src/utils.ts:74](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L74)

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

[packages/address/src/utils.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/utils.ts#L32)
