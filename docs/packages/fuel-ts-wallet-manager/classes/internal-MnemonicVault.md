---
layout: default
title: MnemonicVault
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: MnemonicVault

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).MnemonicVault

## Implements

- [`Vault`](internal-Vault.md)<[`MnemonicVaultOptions`](../interfaces/internal-MnemonicVaultOptions.md)\>

## Constructors

### constructor

• **new MnemonicVault**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`MnemonicVaultOptions`](../interfaces/internal-MnemonicVaultOptions.md) |

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L20)

## Properties

### #secret

• `Private` `Readonly` **#secret**: `string`

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L15)

___

### numberOfAccounts

• **numberOfAccounts**: `number` = `0`

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L18)

___

### rootPath

• **rootPath**: `string`

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L17)

___

### type

▪ `Static` `Readonly` **type**: ``"mnemonic"``

#### Implementation of

[Vault](internal-Vault.md).[type](internal-Vault.md#type)

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L14)

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

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:52](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L52)

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

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L62)

___

### getAccounts

▸ **getAccounts**(): { `address`: [`AbstractAddress`](internal-AbstractAddress.md) = wallet.address; `publicKey`: `string` = wallet.publicKey }[]

#### Returns

{ `address`: [`AbstractAddress`](internal-AbstractAddress.md) = wallet.address; `publicKey`: `string` = wallet.publicKey }[]

#### Implementation of

[Vault](internal-Vault.md).[getAccounts](internal-Vault.md#getaccounts)

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L35)

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

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:77](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L77)

___

### serialize

▸ **serialize**(): [`MnemonicVaultOptions`](../interfaces/internal-MnemonicVaultOptions.md)

#### Returns

[`MnemonicVaultOptions`](../interfaces/internal-MnemonicVaultOptions.md)

#### Implementation of

[Vault](internal-Vault.md).[serialize](internal-Vault.md#serialize)

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L27)
