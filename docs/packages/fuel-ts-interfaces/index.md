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

[packages/interfaces/src/index.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L16)

___

### ContractId

Ƭ **ContractId**: `string`

#### Defined in

[packages/interfaces/src/index.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L6)

___

### ContractIdLike

Ƭ **ContractIdLike**: [`ContractId`](index.md#contractid) \| `BytesLike` \| [`AbstractContract`](classes/AbstractContract.md)

#### Defined in

[packages/interfaces/src/index.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L25)

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

[packages/interfaces/src/index.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L18)

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

[packages/interfaces/src/index.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L27)
