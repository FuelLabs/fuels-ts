---
layout: default
title: PrivateKeyVault
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: PrivateKeyVault

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).PrivateKeyVault

## Implements

- [`Vault`](internal-Vault.md)<[`PkVaultOptions`](../interfaces/internal-PkVaultOptions.md)\>

## Constructors

### constructor

• **new PrivateKeyVault**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`PkVaultOptions`](../interfaces/internal-PkVaultOptions.md) |

## Properties

### #privateKeys

• `Private` **#privateKeys**: `string`[] = `[]`

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L14)

___

### type

▪ `Static` `Readonly` **type**: ``"privateKey"``

#### Implementation of

[Vault](internal-Vault.md).[type](internal-Vault.md#type)

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L12)

## Methods

### addAccount

▸ **addAccount**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) |
| `publicKey` | `string` |

#### Implementation of

[Vault](internal-Vault.md).[addAccount](internal-Vault.md#addaccount)

___

### exportAccount

▸ **exportAccount**(`address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

`string`

#### Implementation of

[Vault](internal-Vault.md).[exportAccount](internal-Vault.md#exportaccount)

___

### getAccounts

▸ **getAccounts**(): [`Account`](../namespaces/internal.md#account)[]

#### Returns

[`Account`](../namespaces/internal.md#account)[]

#### Implementation of

[Vault](internal-Vault.md).[getAccounts](internal-Vault.md#getaccounts)

___

### getPublicAccount

▸ **getPublicAccount**(`privateKey`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) |
| `publicKey` | `string` |

___

### getWallet

▸ **getWallet**(`address`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

`default`

#### Implementation of

[Vault](internal-Vault.md).[getWallet](internal-Vault.md#getwallet)

___

### serialize

▸ **serialize**(): [`PkVaultOptions`](../interfaces/internal-PkVaultOptions.md)

#### Returns

[`PkVaultOptions`](../interfaces/internal-PkVaultOptions.md)

#### Implementation of

[Vault](internal-Vault.md).[serialize](internal-Vault.md#serialize)
