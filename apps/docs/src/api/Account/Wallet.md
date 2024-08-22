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

Create a Wallet Unlocked from an encrypted JSON.

#### Type declaration

▸ (`jsonWallet`, `password`, `provider?`): `Promise`&lt;[`WalletUnlocked`](/api/Account/WalletUnlocked.md)\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonWallet` | `string` | The encrypted JSON keystore. |
| `password` | `string` | The password to decrypt the JSON. |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

##### Returns

`Promise`&lt;[`WalletUnlocked`](/api/Account/WalletUnlocked.md)\>

#### Defined in

[packages/account/src/wallet/wallet.ts:79](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet/wallet.ts#L79)

___

### fromExtendedKey

▪ `Static` **fromExtendedKey**: (`extendedKey`: `string`, `provider?`: [`Provider`](/api/Account/Provider.md)) => [`WalletUnlocked`](/api/Account/WalletUnlocked.md) = `WalletUnlocked.fromExtendedKey`

Create a Wallet Unlocked from an extended key.

#### Type declaration

▸ (`extendedKey`, `provider?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `extendedKey` | `string` | The extended key. |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

##### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

#### Defined in

[packages/account/src/wallet/wallet.ts:69](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet/wallet.ts#L69)

___

### fromMnemonic

▪ `Static` **fromMnemonic**: (`mnemonic`: `string`, `path?`: `string`, `passphrase?`: [`BytesLike`](/api/Interfaces/index.md#byteslike), `provider?`: [`Provider`](/api/Account/Provider.md)) => [`WalletUnlocked`](/api/Account/WalletUnlocked.md) = `WalletUnlocked.fromMnemonic`

Create a Wallet Unlocked from a mnemonic phrase.

#### Type declaration

▸ (`mnemonic`, `path?`, `passphrase?`, `provider?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonic` | `string` | The mnemonic phrase. |
| `path?` | `string` | The derivation path (optional). |
| `passphrase?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The passphrase for the mnemonic (optional). |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

##### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

#### Defined in

[packages/account/src/wallet/wallet.ts:60](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet/wallet.ts#L60)

___

### fromSeed

▪ `Static` **fromSeed**: (`seed`: `string`, `path?`: `string`, `provider?`: [`Provider`](/api/Account/Provider.md)) => [`WalletUnlocked`](/api/Account/WalletUnlocked.md) = `WalletUnlocked.fromSeed`

Create a Wallet Unlocked from a seed.

#### Type declaration

▸ (`seed`, `path?`, `provider?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `string` | The seed phrase. |
| `path?` | `string` | The derivation path (optional). |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

##### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

#### Defined in

[packages/account/src/wallet/wallet.ts:49](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet/wallet.ts#L49)

___

### generate

▪ `Static` **generate**: (`generateOptions?`: [`GenerateOptions`](/api/Account/GenerateOptions.md)) => [`WalletUnlocked`](/api/Account/WalletUnlocked.md) = `WalletUnlocked.generate`

Generate a new Wallet Unlocked with a random key pair.

#### Type declaration

▸ (`generateOptions?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `generateOptions?` | [`GenerateOptions`](/api/Account/GenerateOptions.md) | Options to customize the generation process (optional). |

##### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

#### Defined in

[packages/account/src/wallet/wallet.ts:39](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet/wallet.ts#L39)

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

[packages/account/src/wallet/wallet.ts:18](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet/wallet.ts#L18)

___

### fromPrivateKey

▸ **fromPrivateKey**(`privateKey`, `provider?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

Creates an unlocked wallet instance from a private key and a provider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The private key of the wallet. |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

#### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[packages/account/src/wallet/wallet.ts:29](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet/wallet.ts#L29)
