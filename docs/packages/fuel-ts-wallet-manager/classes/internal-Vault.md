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

## Properties

### type

▪ `Static` `Readonly` **type**: `string`

#### Defined in

[packages/wallet-manager/src/types.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L33)

## Methods

### addAccount

▸ **addAccount**(): [`Account`](../namespaces/internal.md#account)

#### Returns

[`Account`](../namespaces/internal.md#account)

___

### exportAccount

▸ **exportAccount**(`address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

`string`

___

### getAccounts

▸ **getAccounts**(): [`Account`](../namespaces/internal.md#account)[]

#### Returns

[`Account`](../namespaces/internal.md#account)[]

___

### getWallet

▸ **getWallet**(`address`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

`default`

___

### serialize

▸ **serialize**(): `TOptions` & { `secret?`: `string`  }

#### Returns

`TOptions` & { `secret?`: `string`  }
