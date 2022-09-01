---
layout: default
title: Vault
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: Vault<TOptions\>

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).Vault

## Type parameters

| Name | Type |
| :------ | :------ |
| `TOptions` | `unknown` |

## Implemented by

- [`MnemonicVault`](internal-MnemonicVault.md)
- [`PrivateKeyVault`](internal-PrivateKeyVault.md)

## Constructors

### constructor

• **new Vault**<`TOptions`\>(`options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TOptions` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `TOptions` & { `secret?`: `string`  } |

#### Defined in

[packages/wallet-manager/src/types.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L37)

## Properties

### type

▪ `Static` `Readonly` **type**: `string`

#### Defined in

[packages/wallet-manager/src/types.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L32)

## Methods

### addAccount

▸ **addAccount**(): [`Account`](../namespaces/internal.md#account)

#### Returns

[`Account`](../namespaces/internal.md#account)

#### Defined in

[packages/wallet-manager/src/types.ts:49](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L49)

___

### exportAccount

▸ **exportAccount**(`address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

`string`

#### Defined in

[packages/wallet-manager/src/types.ts:54](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L54)

___

### getAccounts

▸ **getAccounts**(): [`Account`](../namespaces/internal.md#account)[]

#### Returns

[`Account`](../namespaces/internal.md#account)[]

#### Defined in

[packages/wallet-manager/src/types.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L45)

___

### getWallet

▸ **getWallet**(`address`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

`default`

#### Defined in

[packages/wallet-manager/src/types.ts:59](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L59)

___

### serialize

▸ **serialize**(): `TOptions` & { `secret?`: `string`  }

#### Returns

`TOptions` & { `secret?`: `string`  }

#### Defined in

[packages/wallet-manager/src/types.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L41)
