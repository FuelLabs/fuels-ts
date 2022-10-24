---
layout: default
title: WalletManager
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: WalletManager

[@fuel-ts/wallet-manager](../index.md).WalletManager

## Hierarchy

- `EventEmitter`

  ↳ **`WalletManager`**

## Constructors

### constructor

• **new WalletManager**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`WalletManagerOptions`](../namespaces/internal.md#walletmanageroptions) |

#### Overrides

EventEmitter.constructor

## Properties

### #isLocked

• `Private` **#isLocked**: `boolean` = `true`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:65](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L65)

___

### #passphrase

• `Private` **#passphrase**: `string` = `''`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:64](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L64)

___

### #vaults

• `Private` **#vaults**: [`VaultsState`](../namespaces/internal.md#vaultsstate) = `[]`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:63](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L63)

___

### STORAGE\_KEY

• `Readonly` **STORAGE\_KEY**: `string` = `'WalletManager'`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:60](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L60)

___

### storage

• `Readonly` **storage**: [`StorageAbstract`](internal-StorageAbstract.md)

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:58](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L58)

___

### Vaults

▪ `Static` **Vaults**: (typeof [`MnemonicVault`](internal-MnemonicVault.md) \| typeof [`PrivateKeyVault`](internal-PrivateKeyVault.md))[]

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:52](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L52)

## Accessors

### isLocked

• `get` **isLocked**(): `boolean`

#### Returns

`boolean`

## Methods

### #deserializeVaults

▸ `Private` **#deserializeVaults**(`vaults`): { `title`: `undefined` \| `string` ; `type`: `string` ; `vault`: [`MnemonicVault`](internal-MnemonicVault.md) \| [`PrivateKeyVault`](internal-PrivateKeyVault.md)  }[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaults` | [`VaultsState`](../namespaces/internal.md#vaultsstate) |

#### Returns

{ `title`: `undefined` \| `string` ; `type`: `string` ; `vault`: [`MnemonicVault`](internal-MnemonicVault.md) \| [`PrivateKeyVault`](internal-PrivateKeyVault.md)  }[]

___

### #serializeVaults

▸ `Private` **#serializeVaults**(`vaults`): { `data`: { `secret?`: `string`  } ; `title`: `undefined` \| `string` ; `type`: `string`  }[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaults` | [`VaultsState`](../namespaces/internal.md#vaultsstate) |

#### Returns

{ `data`: { `secret?`: `string`  } ; `title`: `undefined` \| `string` ; `type`: `string`  }[]

___

### addAccount

▸ **addAccount**(`options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.vaultId` | `number` |

#### Returns

`Promise`<`void`\>

___

### addVault

▸ **addVault**(`vaultConfig`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultConfig` | [`VaultConfig`](../namespaces/internal.md#vaultconfig) |

#### Returns

`Promise`<`void`\>

___

### exportPrivateKey

▸ **exportPrivateKey**(`address`): `string`

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

### getVaultClass

▸ `Private` **getVaultClass**(`type`): typeof [`MnemonicVault`](internal-MnemonicVault.md) \| typeof [`PrivateKeyVault`](internal-PrivateKeyVault.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

typeof [`MnemonicVault`](internal-MnemonicVault.md) \| typeof [`PrivateKeyVault`](internal-PrivateKeyVault.md)

___

### getVaults

▸ **getVaults**(): { `title?`: `string` ; `type`: `string` ; `vaultId`: `number`  }[]

#### Returns

{ `title?`: `string` ; `type`: `string` ; `vaultId`: `number`  }[]

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

### loadState

▸ **loadState**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### lock

▸ **lock**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### removeVault

▸ **removeVault**(`index`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`Promise`<`void`\>

___

### saveState

▸ `Private` **saveState**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### unlock

▸ **unlock**(`passphrase`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `passphrase` | `string` |

#### Returns

`Promise`<`void`\>
