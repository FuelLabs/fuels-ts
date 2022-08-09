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

[packages/wallet-manager/src/vaults/privatekey-vault.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L19)

## Properties

### #privateKeys

• `Private` **#privateKeys**: `string`[] = `[]`

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L13)

___

### type

▪ `Static` `Readonly` **type**: ``"privateKey"``

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L11)

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

[packages/wallet-manager/src/vaults/privatekey-vault.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L45)

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

[packages/wallet-manager/src/vaults/privatekey-vault.ts:53](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L53)

___

### getAccounts

▸ **getAccounts**(): [`Account`](../namespaces/internal.md#account)[]

#### Returns

[`Account`](../namespaces/internal.md#account)[]

#### Implementation of

Vault.getAccounts

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L41)

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
| `address` | `string` |
| `publicKey` | `string` |

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L33)

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

[packages/wallet-manager/src/vaults/privatekey-vault.ts:63](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L63)

___

### serialize

▸ **serialize**(): [`PkVaultOptions`](../interfaces/internal-PkVaultOptions.md)

#### Returns

[`PkVaultOptions`](../interfaces/internal-PkVaultOptions.md)

#### Implementation of

Vault.serialize

#### Defined in

[packages/wallet-manager/src/vaults/privatekey-vault.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/vaults/privatekey-vault.ts#L27)
