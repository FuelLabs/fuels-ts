---
layout: default
title: "@fuel-ts/wallet-manager"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/wallet-manager

## Namespaces

- [internal](namespaces/internal.md)

## Classes

- [StorageAbstract](classes/StorageAbstract.md)
- [Vault](classes/Vault.md)
- [WalletManager](classes/WalletManager.md)

## Interfaces

- [WalletManagerState](interfaces/WalletManagerState.md)

## Type Aliases

### Account

Ƭ **Account**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](classes/internal-AbstractAddress.md) |
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

Ƭ **VaultsState**: { `data?`: [`VaultConfig`](index.md#vaultconfig) ; `title?`: `string` ; `type`: `string` ; `vault`: [`Vault`](classes/Vault.md)  }[]

#### Defined in

[packages/wallet-manager/src/types.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L21)

___

### WalletManagerOptions

Ƭ **WalletManagerOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `storage` | [`StorageAbstract`](classes/StorageAbstract.md) |

#### Defined in

[packages/wallet-manager/src/types.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L11)
