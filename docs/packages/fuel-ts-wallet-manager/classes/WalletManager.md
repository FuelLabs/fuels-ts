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
| `options?` | [`WalletManagerOptions`](../index.md#walletmanageroptions) |

#### Overrides

EventEmitter.constructor

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:68](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L68)

## Properties

### #isLocked

• `Private` **#isLocked**: `boolean` = `true`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L66)

___

### #passphrase

• `Private` **#passphrase**: `string` = `''`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:65](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L65)

___

### #vaults

• `Private` **#vaults**: [`VaultsState`](../index.md#vaultsstate) = `[]`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:64](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L64)

___

### STORAGE\_KEY

• `Readonly` **STORAGE\_KEY**: `string` = `'WalletManager'`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:61](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L61)

___

### storage

• `Readonly` **storage**: [`StorageAbstract`](StorageAbstract.md)

Storage

Persistent encrypted data. `The default storage works only on memory`.

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:59](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L59)

___

### Vaults

▪ `Static` **Vaults**: (typeof [`MnemonicVault`](internal-MnemonicVault.md) \| typeof [`PrivateKeyVault`](internal-PrivateKeyVault.md))[]

Vaults

Vaults are responsible to store secret keys and return an `Wallet` instance,
to interact with the network.

Each vault has access to its own state

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:53](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L53)

## Accessors

### isLocked

• `get` **isLocked**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:73](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L73)

## Methods

### #deserializeVaults

▸ `Private` **#deserializeVaults**(`vaults`): { `title`: `undefined` \| `string` ; `type`: `string` ; `vault`: [`MnemonicVault`](internal-MnemonicVault.md) \| [`PrivateKeyVault`](internal-PrivateKeyVault.md)  }[]

Deserialize all vaults to state

`This is only accessible from inside the class`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaults` | [`VaultsState`](../index.md#vaultsstate) |

#### Returns

{ `title`: `undefined` \| `string` ; `type`: `string` ; `vault`: [`MnemonicVault`](internal-MnemonicVault.md) \| [`PrivateKeyVault`](internal-PrivateKeyVault.md)  }[]

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:274](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L274)

___

### #serializeVaults

▸ `Private` **#serializeVaults**(`vaults`): { `data`: { `secret?`: `string`  } ; `title`: `undefined` \| `string` ; `type`: `string`  }[]

Serialize all vaults to store

`This is only accessible from inside the class`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaults` | [`VaultsState`](../index.md#vaultsstate) |

#### Returns

{ `data`: { `secret?`: `string`  } ; `title`: `undefined` \| `string` ; `type`: `string`  }[]

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:261](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L261)

___

### addAccount

▸ **addAccount**(`options?`): `Promise`<[`Account`](../index.md#account)\>

Add account to a selected vault or on the first vault as default.
If not vaults are adds it will return error

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.vaultId` | `number` |

#### Returns

`Promise`<[`Account`](../index.md#account)\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:138](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L138)

___

### addVault

▸ **addVault**(`vaultConfig`): `Promise`<`void`\>

Add Vault, the `vaultConfig.type` will look for the Vaults supported if
didn't found it will throw.

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultConfig` | [`VaultConfig`](../index.md#vaultconfig) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:165](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L165)

___

### exportPrivateKey

▸ **exportPrivateKey**(`address`): `string`

Export specific account privateKey

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

`string`

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:124](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L124)

___

### exportVault

▸ **exportVault**<`T`\>(`vaultId`): `ReturnType`<`T`[``"serialize"``]\>

Return the vault serialized object containing all the privateKeys,
the format of the return depends on the Vault type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Vault`](Vault.md)<{ `secret?`: `string`  }, `T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultId` | `number` |

#### Returns

`ReturnType`<`T`[``"serialize"``]\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:81](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L81)

___

### getAccounts

▸ **getAccounts**(): [`Account`](../index.md#account)[]

List all accounts on the Wallet Manager not vault information is revealed

#### Returns

[`Account`](../index.md#account)[]

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:102](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L102)

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

[packages/wallet-manager/src/wallet-manager.ts:288](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L288)

___

### getVaults

▸ **getVaults**(): { `title?`: `string` ; `type`: `string` ; `vaultId`: `number`  }[]

List all vaults on the Wallet Manager, this function not return secret's

#### Returns

{ `title?`: `string` ; `type`: `string` ; `vaultId`: `number`  }[]

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:91](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L91)

___

### getWallet

▸ **getWallet**(`address`): [`WalletUnlocked`](internal-WalletUnlocked.md)

Create a Wallet instance for the specific account

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

[`WalletUnlocked`](internal-WalletUnlocked.md)

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:112](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L112)

___

### loadState

▸ **loadState**(): `Promise`<`void`\>

Retrieve and decrypt WalletManager state from storage

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:233](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L233)

___

### lock

▸ **lock**(): `Promise`<`void`\>

Lock wallet. It removes passphrase from class instance, encrypt and hide all address and
secrets.

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:186](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L186)

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

[packages/wallet-manager/src/wallet-manager.ts:156](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L156)

___

### saveState

▸ `Private` **saveState**(): `Promise`<`void`\>

Store encrypted WalletManager state on storage

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:246](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L246)

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

[packages/wallet-manager/src/wallet-manager.ts:200](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L200)

___

### updatePassphrase

▸ **updatePassphrase**(`oldpass`, `newpass`): `Promise`<`void`\>

Update WalletManager encryption passphrase

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldpass` | `string` |
| `newpass` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/wallet-manager.ts:214](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/wallet-manager.ts#L214)
