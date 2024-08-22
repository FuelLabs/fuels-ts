# Class: MnemonicVault

[@fuel-ts/account](/api/Account/index.md).MnemonicVault

## Implements

- [`Vault`](/api/Account/Vault.md)&lt;[`MnemonicVaultOptions`](/api/Account/MnemonicVaultOptions.md)\>

## Constructors

### constructor

• **new MnemonicVault**(`options`): [`MnemonicVault`](/api/Account/MnemonicVault.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`MnemonicVaultOptions`](/api/Account/MnemonicVaultOptions.md) |

#### Returns

[`MnemonicVault`](/api/Account/MnemonicVault.md)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:24](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L24)

## Properties

### #secret

• `Private` `Readonly` **#secret**: `string`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:18](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L18)

___

### numberOfAccounts

• **numberOfAccounts**: `number` = `0`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:22](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L22)

___

### pathKey

• **pathKey**: `string` = `'{}'`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:20](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L20)

___

### rootPath

• **rootPath**: `string`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:21](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L21)

___

### type

▪ `Static` `Readonly` **type**: ``"mnemonic"``

#### Implementation of

[Vault](/api/Account/Vault.md).[type](/api/Account/Vault.md#type)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:17](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L17)

## Methods

### addAccount

▸ **addAccount**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |
| `publicKey` | `string` |

#### Implementation of

[Vault](/api/Account/Vault.md).[addAccount](/api/Account/Vault.md#addaccount)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:63](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L63)

___

### exportAccount

▸ **exportAccount**(`address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Returns

`string`

#### Implementation of

[Vault](/api/Account/Vault.md).[exportAccount](/api/Account/Vault.md#exportaccount)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:73](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L73)

___

### getAccounts

▸ **getAccounts**(): { `address`: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) = wallet.address; `publicKey`: `string` = wallet.publicKey }[]

#### Returns

{ `address`: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) = wallet.address; `publicKey`: `string` = wallet.publicKey }[]

#### Implementation of

[Vault](/api/Account/Vault.md).[getAccounts](/api/Account/Vault.md#getaccounts)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:46](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L46)

___

### getDerivePath

▸ **getDerivePath**(`index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`string`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:31](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L31)

___

### getWallet

▸ **getWallet**(`address`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

#### Implementation of

[Vault](/api/Account/Vault.md).[getWallet](/api/Account/Vault.md#getwallet)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:91](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L91)

___

### serialize

▸ **serialize**(): [`MnemonicVaultOptions`](/api/Account/MnemonicVaultOptions.md)

#### Returns

[`MnemonicVaultOptions`](/api/Account/MnemonicVaultOptions.md)

#### Implementation of

[Vault](/api/Account/Vault.md).[serialize](/api/Account/Vault.md#serialize)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:38](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L38)
