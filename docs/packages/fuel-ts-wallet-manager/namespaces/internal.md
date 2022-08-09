---
layout: default
title: internal
parent: "@fuel-ts/wallet-manager"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/wallet-manager](../index.md).internal

## Classes

- [MnemonicVault](../classes/internal-MnemonicVault.md)
- [PrivateKeyVault](../classes/internal-PrivateKeyVault.md)
- [StorageAbstract](../classes/internal-StorageAbstract.md)
- [Vault](../classes/internal-Vault.md)

## Interfaces

- [MnemonicVaultOptions](../interfaces/internal-MnemonicVaultOptions.md)
- [PkVaultOptions](../interfaces/internal-PkVaultOptions.md)

## Type aliases

### Account

Ƭ **Account**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `publicKey` | `string` |

#### Defined in

[packages/wallet-manager/src/types.ts:4](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L4)

___

### VaultConfig

Ƭ **VaultConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `secret?` | `string` |
| `title?` | `string` |
| `type` | `string` |

#### Defined in

[packages/wallet-manager/src/types.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L13)

___

### VaultsState

Ƭ **VaultsState**: { `data?`: [`VaultConfig`](internal.md#vaultconfig) ; `title?`: `string` ; `type`: `string` ; `vault`: [`Vault`](../classes/internal-Vault.md)  }[]

#### Defined in

[packages/wallet-manager/src/types.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L19)

___

### WalletManagerOptions

Ƭ **WalletManagerOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `storage` | [`StorageAbstract`](../classes/internal-StorageAbstract.md) |

#### Defined in

[packages/wallet-manager/src/types.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L9)
