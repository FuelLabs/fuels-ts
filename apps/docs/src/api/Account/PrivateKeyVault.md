[**@fuel-ts/account v0.94.4**](../index.md) • **Docs**

***

# Class: PrivateKeyVault

## Implements

- [`Vault`](Vault.md)\&lt;[`PkVaultOptions`](./PkVaultOptions.md)\>

## Constructors

### new PrivateKeyVault()

> **new PrivateKeyVault**(`options`): [`PrivateKeyVault`](PrivateKeyVault.md)

If privateKey vault is initialized with a secretKey, it creates
one account with the fallowing secret

#### Parameters

• **options**: [`PkVaultOptions`](./PkVaultOptions.md) = `{}`

#### Returns

[`PrivateKeyVault`](PrivateKeyVault.md)

#### Defined in

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:23](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L23)

## Properties

### type

> `readonly` `static` **type**: `"privateKey"` = `'privateKey'`

#### Implementation of

[`Vault`](Vault.md).[`type`](Vault.md#type)

#### Defined in

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:15](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L15)

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

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:49](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L49)

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

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:57](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L57)

***

### getAccounts()

> **getAccounts**(): [`WalletManagerAccount`](../index.md#walletmanageraccount)[]

#### Returns

[`WalletManagerAccount`](../index.md#walletmanageraccount)[]

#### Implementation of

[`Vault`](Vault.md).[`getAccounts`](Vault.md#getaccounts)

#### Defined in

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:45](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L45)

***

### getPublicAccount()

> **getPublicAccount**(`privateKey`): `object`

#### Parameters

• **privateKey**: `string`

#### Returns

`object`

##### address

> **address**: [`AbstractAddress`](../Interfaces/AbstractAddress.md) = `wallet.address`

##### publicKey

> **publicKey**: `string` = `wallet.publicKey`

#### Defined in

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:37](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L37)

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

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:73](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L73)

***

### serialize()

> **serialize**(): [`PkVaultOptions`](./PkVaultOptions.md)

#### Returns

[`PkVaultOptions`](./PkVaultOptions.md)

#### Implementation of

[`Vault`](Vault.md).[`serialize`](Vault.md#serialize)

#### Defined in

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:31](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L31)
