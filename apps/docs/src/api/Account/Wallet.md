# Class: Wallet

[@fuel-ts/account](/api/Account/index.md).Wallet

`Wallet` provides methods to create locked and unlocked wallet instances.

## Constructors

### constructor

• **new Wallet**(): [`Wallet`](/api/Account/Wallet.md)

#### Returns

[`Wallet`](/api/Account/Wallet.md)

## Properties

### fromEncryptedJson

▪ `Static` **fromEncryptedJson**: (`jsonWallet`: `string`, `password`: `string`, `provider?`: [`Provider`](/api/Account/Provider.md)) => `Promise`&lt;[`WalletUnlocked`](/api/Account/WalletUnlocked.md)\> = `WalletUnlocked.fromEncryptedJson`

#### Type declaration

▸ (`jsonWallet`, `password`, `provider?`): `Promise`&lt;[`WalletUnlocked`](/api/Account/WalletUnlocked.md)\>

Create a Wallet Unlocked from an encrypted JSON.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonWallet` | `string` | The encrypted JSON keystore. |
| `password` | `string` | The password to decrypt the JSON. |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

##### Returns

`Promise`&lt;[`WalletUnlocked`](/api/Account/WalletUnlocked.md)\>

An unlocked wallet instance.

#### Defined in

[packages/account/src/wallet/wallet.ts:80](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/wallet/wallet.ts#L80)

___

### fromExtendedKey

▪ `Static` **fromExtendedKey**: (`extendedKey`: `string`, `provider?`: [`Provider`](/api/Account/Provider.md)) => [`WalletUnlocked`](/api/Account/WalletUnlocked.md) = `WalletUnlocked.fromExtendedKey`

#### Type declaration

▸ (`extendedKey`, `provider?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

Create a Wallet Unlocked from an extended key.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `extendedKey` | `string` | The extended key. |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

##### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[packages/account/src/wallet/wallet.ts:70](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/wallet/wallet.ts#L70)

___

### fromMnemonic

▪ `Static` **fromMnemonic**: (`mnemonic`: `string`, `path?`: `string`, `passphrase?`: `BytesLike`, `provider?`: [`Provider`](/api/Account/Provider.md)) => [`WalletUnlocked`](/api/Account/WalletUnlocked.md) = `WalletUnlocked.fromMnemonic`

#### Type declaration

▸ (`mnemonic`, `path?`, `passphrase?`, `provider?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

Create a Wallet Unlocked from a mnemonic phrase.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonic` | `string` | The mnemonic phrase. |
| `path?` | `string` | The derivation path (optional). |
| `passphrase?` | `BytesLike` | The passphrase for the mnemonic (optional). |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

##### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[packages/account/src/wallet/wallet.ts:61](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/wallet/wallet.ts#L61)

___

### fromSeed

▪ `Static` **fromSeed**: (`seed`: `string`, `path?`: `string`, `provider?`: [`Provider`](/api/Account/Provider.md)) => [`WalletUnlocked`](/api/Account/WalletUnlocked.md) = `WalletUnlocked.fromSeed`

#### Type declaration

▸ (`seed`, `path?`, `provider?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

Create a Wallet Unlocked from a seed.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `string` | The seed phrase. |
| `path?` | `string` | The derivation path (optional). |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

##### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[packages/account/src/wallet/wallet.ts:50](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/wallet/wallet.ts#L50)

___

### generate

▪ `Static` **generate**: (`generateOptions?`: [`GenerateOptions`](/api/Account/GenerateOptions.md)) => [`WalletUnlocked`](/api/Account/WalletUnlocked.md) = `WalletUnlocked.generate`

#### Type declaration

▸ (`generateOptions?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

Generate a new Wallet Unlocked with a random key pair.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `generateOptions?` | [`GenerateOptions`](/api/Account/GenerateOptions.md) | Options to customize the generation process (optional). |

##### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[packages/account/src/wallet/wallet.ts:40](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/wallet/wallet.ts#L40)

## Methods

### fromAddress

▸ **fromAddress**(`address`, `provider?`): [`WalletLocked`](/api/Account/WalletLocked.md)

Creates a locked wallet instance from an address and a provider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the wallet. |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

#### Returns

[`WalletLocked`](/api/Account/WalletLocked.md)

A locked wallet instance.

#### Defined in

[packages/account/src/wallet/wallet.ts:19](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/wallet/wallet.ts#L19)

___

### fromPrivateKey

▸ **fromPrivateKey**(`privateKey`, `provider?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

Creates an unlocked wallet instance from a private key and a provider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `BytesLike` | The private key of the wallet. |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

#### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[packages/account/src/wallet/wallet.ts:30](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/wallet/wallet.ts#L30)
