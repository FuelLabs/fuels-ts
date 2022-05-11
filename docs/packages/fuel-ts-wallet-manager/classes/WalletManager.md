---
layout: default
title: WalletManager
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: WalletManager

[@fuel-ts/wallet-manager](../index.md).WalletManager

WalletManager is a upper package to manage multiple vaults like mnemonic and privateKeys.

- VaultTypes can be add to `WalletManager.Vaults` enabling to add custom Vault types.
- Storage can be instantiate when initializing enabling custom storage types.

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

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L66)

## Properties

### #isLocked

• `Private` **#isLocked**: `boolean` = `true`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:64](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L64)

___

### #passphrase

• `Private` **#passphrase**: `string` = `''`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:63](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L63)

___

### #vaults

• `Private` **#vaults**: [`VaultsState`](../namespaces/internal.md#vaultsstate) = `[]`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L62)

___

### STORAGE\_KEY

• `Readonly` **STORAGE\_KEY**: `string` = `'WalletManager'`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:59](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L59)

___

### storage

• `Readonly` **storage**: [`StorageAbstract`](internal-StorageAbstract.md)

Storage

Persistent encrypted data. `The default storage works only on memory`.

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:57](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L57)

___

### Vaults

▪ `Static` **Vaults**: (typeof [`MnemonicVault`](internal-MnemonicVault.md) \| typeof [`PrivateKeyVault`](internal-PrivateKeyVault.md))[]

Vaults

Vaults are responsible to store secret keys and return an `Wallet` instance,
to interact with the network.

Each vault has access to its own state

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:51](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L51)

## Accessors

### isLocked

• `get` **isLocked**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:71](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L71)

## Methods

### #deserializeVaults

▸ `Private` **#deserializeVaults**(`vaults`): { `title`: `undefined` \| `string` ; `type`: `string` ; `vault`: [`MnemonicVault`](internal-MnemonicVault.md) \| [`PrivateKeyVault`](internal-PrivateKeyVault.md)  }[]

Deserialize all vaults to state

`This is only accessible from inside the class`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaults` | [`VaultsState`](../namespaces/internal.md#vaultsstate) |

#### Returns

{ `title`: `undefined` \| `string` ; `type`: `string` ; `vault`: [`MnemonicVault`](internal-MnemonicVault.md) \| [`PrivateKeyVault`](internal-PrivateKeyVault.md)  }[]

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:240](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L240)

___

### #serializeVaults

▸ `Private` **#serializeVaults**(`vaults`): { `data`: { `secret?`: `string`  } ; `title`: `undefined` \| `string` ; `type`: `string`  }[]

Serialize all vaults to store

`This is only accessible from inside the class`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaults` | [`VaultsState`](../namespaces/internal.md#vaultsstate) |

#### Returns

{ `data`: { `secret?`: `string`  } ; `title`: `undefined` \| `string` ; `type`: `string`  }[]

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:227](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L227)

___

### addAccount

▸ **addAccount**(`options?`): `Promise`<`void`\>

Add account to a selected vault or on the first vault as default.
If not vaults are adds it will return error

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.vaultIndex` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:125](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L125)

___

### addVault

▸ **addVault**(`vaultConfig`): `Promise`<`void`\>

Add Vault, the `vaultConfig.type` will look for the Vaults supported if
didn't found it will throw.

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultConfig` | [`VaultConfig`](../namespaces/internal.md#vaultconfig) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:150](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L150)

___

### exportPrivateKey

▸ **exportPrivateKey**(`address`): `string`

Export specific account privateKey

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`string`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:111](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L111)

___

### getAccounts

▸ **getAccounts**(): [`Account`](../namespaces/internal.md#account)[]

List all accounts on the Wallet Manager not vault information is revealed

#### Returns

[`Account`](../namespaces/internal.md#account)[]

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:88](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L88)

___

### getVaultClass

▸ `Private` **getVaultClass**(`type`): typeof [`MnemonicVault`](internal-MnemonicVault.md) \| typeof [`PrivateKeyVault`](internal-PrivateKeyVault.md)

Return a instantiable Class reference from `WalletManager.Vaults` supported list.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

typeof [`MnemonicVault`](internal-MnemonicVault.md) \| typeof [`PrivateKeyVault`](internal-PrivateKeyVault.md)

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:254](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L254)

___

### getVaults

▸ **getVaults**(): { `title?`: `string` ; `type`: `string`  }[]

List all vaults on the Wallet Manager, this function nto return secret's

#### Returns

{ `title?`: `string` ; `type`: `string`  }[]

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:78](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L78)

___

### getWallet

▸ **getWallet**(`address`): [`Wallet`](../../fuel-ts-wallet/classes/Wallet.md)

Create a Wallet instance for the specific account

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`Wallet`](../../fuel-ts-wallet/classes/Wallet.md)

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:99](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L99)

___

### loadState

▸ **loadState**(): `Promise`<`void`\>

Retrieve and decrypt WalletManager state from storage

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:199](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L199)

___

### lock

▸ **lock**(): `Promise`<`void`\>

Lock wallet. It removes passphrase from class instance, encrypt and hide all address and
secrets.

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:171](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L171)

___

### removeVault

▸ **removeVault**(`index`): `Promise`<`void`\>

Remove vault by index, by remove the vault you also remove all accounts
created by the vault.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:141](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L141)

___

### saveState

▸ `Private` **saveState**(): `Promise`<`void`\>

Store encrypted WalletManager state on storage

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:212](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L212)

___

### unlock

▸ **unlock**(`passphrase`): `Promise`<`void`\>

Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
Vaults with secrets are not unlocked or instantiated on this moment.

#### Parameters

| Name | Type |
| :------ | :------ |
| `passphrase` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:185](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L185)
