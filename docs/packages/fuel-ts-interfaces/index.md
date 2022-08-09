---
layout: default
title: "@fuel-ts/interfaces"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/interfaces

## Classes

- [AbstractContract](classes/AbstractContract.md)
- [AbstractScript](classes/AbstractScript.md)
- [AbstractWallet](classes/AbstractWallet.md)

## Type aliases

### Address

Ƭ **Address**: `string`

#### Defined in

[packages/interfaces/src/index.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L5)

___

### AddressLike

Ƭ **AddressLike**: [`Address`](index.md#address) \| `BytesLike` \| [`AbstractWallet`](classes/AbstractWallet.md)

#### Defined in

[packages/interfaces/src/index.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L21)

___

### ContractId

Ƭ **ContractId**: `string`

#### Defined in

[packages/interfaces/src/index.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L6)

___

### ContractIdLike

Ƭ **ContractIdLike**: [`ContractId`](index.md#contractid) \| `BytesLike` \| [`AbstractContract`](classes/AbstractContract.md)

#### Defined in

[packages/interfaces/src/index.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L30)

## Functions

### addressify

▸ **addressify**(`addressLike`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressLike` | [`AddressLike`](index.md#addresslike) |

#### Returns

`string`

#### Defined in

[packages/interfaces/src/index.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L23)

___

### contractIdify

▸ **contractIdify**(`contractIdLike`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractIdLike` | [`ContractIdLike`](index.md#contractidlike) |

#### Returns

`string`

#### Defined in

[packages/interfaces/src/index.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L32)
