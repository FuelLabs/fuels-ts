[**@fuel-ts/account v0.97.0**](../index.md) • **Docs**

***

# Class: MnemonicVault

## Implements

- [`Vault`](Vault.md)\&lt;[`MnemonicVaultOptions`](./MnemonicVaultOptions.md)\>

## Constructors

### new MnemonicVault()

> **new MnemonicVault**(`options`): [`MnemonicVault`](MnemonicVault.md)

#### Parameters

• **options**: [`MnemonicVaultOptions`](./MnemonicVaultOptions.md)

#### Returns

[`MnemonicVault`](MnemonicVault.md)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:24](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L24)

## Properties

### numberOfAccounts

> **numberOfAccounts**: `number` = `0`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:22](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L22)

***

### pathKey

> **pathKey**: `string` = `'{}'`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:20](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L20)

***

### rootPath

> **rootPath**: `string`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:21](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L21)

***

### type

> `readonly` `static` **type**: `"mnemonic"` = `'mnemonic'`

#### Implementation of

[`Vault`](Vault.md).[`type`](Vault.md#type)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:17](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L17)

## Methods

### addAccount()

> **addAccount**(): `object`

#### Returns

`object`

##### address

> **address**: [`AbstractAddress`](../Interfaces/AbstractAddress.md) = `wallet.address`

##### publicKey

> **publicKey**: `string` = `wallet.publicKey`

#### Implementation of

[`Vault`](Vault.md).[`addAccount`](Vault.md#addaccount)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:63](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L63)

***

### exportAccount()

> **exportAccount**(`address`): `string`

#### Parameters

• **address**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Returns

`string`

#### Implementation of

[`Vault`](Vault.md).[`exportAccount`](Vault.md#exportaccount)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:73](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L73)

***

### getAccounts()

> **getAccounts**(): `object`[]

#### Returns

`object`[]

#### Implementation of

[`Vault`](Vault.md).[`getAccounts`](Vault.md#getaccounts)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:46](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L46)

***

### getDerivePath()

> **getDerivePath**(`index`): `string`

#### Parameters

• **index**: `number`

#### Returns

`string`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:31](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L31)

***

### getWallet()

> **getWallet**(`address`): [`WalletUnlocked`](WalletUnlocked.md)

#### Parameters

• **address**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

#### Implementation of

[`Vault`](Vault.md).[`getWallet`](Vault.md#getwallet)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:91](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L91)

***

### serialize()

> **serialize**(): [`MnemonicVaultOptions`](./MnemonicVaultOptions.md)

#### Returns

[`MnemonicVaultOptions`](./MnemonicVaultOptions.md)

#### Implementation of

[`Vault`](Vault.md).[`serialize`](Vault.md#serialize)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:38](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L38)
