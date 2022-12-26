---
layout: default
title: MnemonicVault
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: MnemonicVault

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).MnemonicVault

## Implements

- [`Vault`](Vault.md)<[`MnemonicVaultOptions`](../interfaces/internal-MnemonicVaultOptions.md)\>

## Constructors

### constructor

• **new MnemonicVault**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`MnemonicVaultOptions`](../interfaces/internal-MnemonicVaultOptions.md) |

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L22)

## Properties

### #secret

• `Private` `Readonly` **#secret**: `string`

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L16)

___

### numberOfAccounts

• **numberOfAccounts**: `number` = `0`

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L20)

___

### pathKey

• **pathKey**: `string` = `'{}'`

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L18)

___

### rootPath

• **rootPath**: `string`

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L19)

___

### type

▪ `Static` `Readonly` **type**: ``"mnemonic"``

#### Implementation of

[Vault](Vault.md).[type](Vault.md#type)

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L15)

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

[Vault](Vault.md).[addAccount](Vault.md#addaccount)

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:61](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L61)

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

[Vault](Vault.md).[exportAccount](Vault.md#exportaccount)

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:71](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L71)

___

### getAccounts

▸ **getAccounts**(): { `address`: [`AbstractAddress`](internal-AbstractAddress.md) = wallet.address; `publicKey`: `string` = wallet.publicKey }[]

#### Returns

{ `address`: [`AbstractAddress`](internal-AbstractAddress.md) = wallet.address; `publicKey`: `string` = wallet.publicKey }[]

#### Implementation of

[Vault](Vault.md).[getAccounts](Vault.md#getaccounts)

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L44)

___

### getDerivePath

▸ **getDerivePath**(`index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`string`

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L29)

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

[Vault](Vault.md).[getWallet](Vault.md#getwallet)

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:86](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L86)

___

### serialize

▸ **serialize**(): [`MnemonicVaultOptions`](../interfaces/internal-MnemonicVaultOptions.md)

#### Returns

[`MnemonicVaultOptions`](../interfaces/internal-MnemonicVaultOptions.md)

#### Implementation of

[Vault](Vault.md).[serialize](Vault.md#serialize)

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L36)
