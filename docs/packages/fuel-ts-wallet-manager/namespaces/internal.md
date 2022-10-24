---
layout: default
title: internal
parent: "@fuel-ts/wallet-manager"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/wallet-manager](../index.md).internal

## Classes

- [AbstractAddress](../classes/internal-AbstractAddress.md)
- [MnemonicVault](../classes/internal-MnemonicVault.md)
- [PrivateKeyVault](../classes/internal-PrivateKeyVault.md)
- [StorageAbstract](../classes/internal-StorageAbstract.md)
- [Vault](../classes/internal-Vault.md)

## Interfaces

- [MnemonicVaultOptions](../interfaces/internal-MnemonicVaultOptions.md)
- [PkVaultOptions](../interfaces/internal-PkVaultOptions.md)

## Type Aliases

### Account

Ƭ **Account**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](../classes/internal-AbstractAddress.md) |
| `publicKey` | `string` |
| `vaultId?` | `number` |

#### Defined in

[packages/wallet-manager/src/types.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L5)

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

[packages/wallet-manager/src/types.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L15)

___

### VaultsState

Ƭ **VaultsState**: { `data?`: [`VaultConfig`](internal.md#vaultconfig) ; `title?`: `string` ; `type`: `string` ; `vault`: [`Vault`](../classes/internal-Vault.md)  }[]

#### Defined in

[packages/wallet-manager/src/types.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L21)

___

### WalletManagerOptions

Ƭ **WalletManagerOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `storage` | [`StorageAbstract`](../classes/internal-StorageAbstract.md) |

#### Defined in

[packages/wallet-manager/src/types.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L11)
