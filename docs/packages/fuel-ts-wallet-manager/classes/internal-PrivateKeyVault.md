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

If privateKey vault is initialized with a secretKey, it creates
one account with the fallowing secret

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`PkVaultOptions`](../interfaces/internal-PkVaultOptions.md) |

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L21)

## Properties

### #privateKeys

• `Private` **#privateKeys**: `string`[] = `[]`

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L15)

___

### type

▪ `Static` `Readonly` **type**: ``"privateKey"``

#### Implementation of

[Vault](internal-Vault.md).[type](internal-Vault.md#type)

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L13)

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

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L47)

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

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:55](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L55)

___

### getAccounts

▸ **getAccounts**(): [`Account`](../namespaces/internal.md#account)[]

#### Returns

[`Account`](../namespaces/internal.md#account)[]

#### Implementation of

[Vault](internal-Vault.md).[getAccounts](internal-Vault.md#getaccounts)

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L43)

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

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L35)

___

### getWallet

▸ **getWallet**(`address`): [`WalletUnlocked`](internal-WalletUnlocked.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

[`WalletUnlocked`](internal-WalletUnlocked.md)

#### Implementation of

[Vault](internal-Vault.md).[getWallet](internal-Vault.md#getwallet)

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:67](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L67)

___

### serialize

▸ **serialize**(): [`PkVaultOptions`](../interfaces/internal-PkVaultOptions.md)

#### Returns

[`PkVaultOptions`](../interfaces/internal-PkVaultOptions.md)

#### Implementation of

[Vault](internal-Vault.md).[serialize](internal-Vault.md#serialize)

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L29)
