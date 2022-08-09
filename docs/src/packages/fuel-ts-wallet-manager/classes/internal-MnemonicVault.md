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

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L19)

## Properties

### #secret

• `Private` `Readonly` **#secret**: `string`

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L14)

___

### numberOfAccounts

• **numberOfAccounts**: `number` = `0`

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L17)

___

### rootPath

• **rootPath**: `string`

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L16)

___

### type

▪ `Static` `Readonly` **type**: ``"mnemonic"``

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L13)

## Methods

### addAccount

▸ **addAccount**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `publicKey` | `string` |

#### Implementation of

Vault.addAccount

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:51](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L51)

___

### exportAccount

▸ **exportAccount**(`address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`string`

#### Implementation of

Vault.exportAccount

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:61](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L61)

___

### getAccounts

▸ **getAccounts**(): { `address`: `string` = wallet.address; `publicKey`: `string` = wallet.publicKey }[]

#### Returns

{ `address`: `string` = wallet.address; `publicKey`: `string` = wallet.publicKey }[]

#### Implementation of

Vault.getAccounts

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L34)

___

### getWallet

▸ **getWallet**(`address`): [`Wallet`](../../fuel-ts-wallet/classes/Wallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`Wallet`](../../fuel-ts-wallet/classes/Wallet.md)

#### Implementation of

Vault.getWallet

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:76](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L76)

___

### serialize

▸ **serialize**(): [`MnemonicVaultOptions`](../interfaces/internal-MnemonicVaultOptions.md)

#### Returns

[`MnemonicVaultOptions`](../interfaces/internal-MnemonicVaultOptions.md)

#### Implementation of

Vault.serialize

#### Defined in

[packages/wallet-manager/src/vaults/mnemonic-vault.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/mnemonic-vault.ts#L26)
