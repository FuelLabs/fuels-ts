# Class: Wallet

[@fuel-ts/wallet](/api/Wallet/index.md).Wallet

`Wallet` provides methods to create locked and unlocked wallet instances.

## Constructors

### constructor

• **new Wallet**(): [`Wallet`](/api/Wallet/Wallet.md)

#### Returns

[`Wallet`](/api/Wallet/Wallet.md)

## Properties

### fromEncryptedJson

▪ `Static` **fromEncryptedJson**: (`jsonWallet`: `string`, `password`: `string`, `provider`: [`Provider`](/api/Providers/Provider.md)) => `Promise`&lt;[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)\> = `WalletUnlocked.fromEncryptedJson`

#### Type declaration

▸ (`jsonWallet`, `password`, `provider`): `Promise`&lt;[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `jsonWallet` | `string` |
| `password` | `string` |
| `provider` | [`Provider`](/api/Providers/Provider.md) |

##### Returns

`Promise`&lt;[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)\>

#### Defined in

[wallet.ts:70](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/wallet/src/wallet.ts#L70)

___

### fromExtendedKey

▪ `Static` **fromExtendedKey**: (`extendedKey`: `string`, `provider`: [`Provider`](/api/Providers/Provider.md)) => [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md) = `WalletUnlocked.fromExtendedKey`

#### Type declaration

▸ (`extendedKey`, `provider`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Create a Wallet Unlocked from an extended key.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `extendedKey` | `string` | The extended key. |
| `provider` | [`Provider`](/api/Providers/Provider.md) | A Provider instance (optional). |

##### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[wallet.ts:69](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/wallet/src/wallet.ts#L69)

___

### fromMnemonic

▪ `Static` **fromMnemonic**: (`mnemonic`: `string`, `provider`: [`Provider`](/api/Providers/Provider.md), `path?`: `string`, `passphrase?`: `BytesLike`) => [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md) = `WalletUnlocked.fromMnemonic`

#### Type declaration

▸ (`mnemonic`, `provider`, `path?`, `passphrase?`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Create a Wallet Unlocked from a mnemonic phrase.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonic` | `string` | The mnemonic phrase. |
| `provider` | [`Provider`](/api/Providers/Provider.md) | A Provider instance (optional). |
| `path?` | `string` | The derivation path (optional). |
| `passphrase?` | `BytesLike` | The passphrase for the mnemonic (optional). |

##### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[wallet.ts:60](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/wallet/src/wallet.ts#L60)

___

### fromSeed

▪ `Static` **fromSeed**: (`seed`: `string`, `provider`: [`Provider`](/api/Providers/Provider.md), `path?`: `string`) => [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md) = `WalletUnlocked.fromSeed`

#### Type declaration

▸ (`seed`, `provider`, `path?`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Create a Wallet Unlocked from a seed.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `string` | The seed phrase. |
| `provider` | [`Provider`](/api/Providers/Provider.md) | A Provider instance (optional). |
| `path?` | `string` | The derivation path (optional). |

##### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[wallet.ts:49](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/wallet/src/wallet.ts#L49)

___

### generate

▪ `Static` **generate**: (`generateOptions`: `GenerateOptions`) => [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md) = `WalletUnlocked.generate`

#### Type declaration

▸ (`generateOptions`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Generate a new Wallet Unlocked with a random key pair.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `generateOptions` | `GenerateOptions` | Options to customize the generation process (optional). |

##### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[wallet.ts:39](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/wallet/src/wallet.ts#L39)

## Methods

### fromAddress

▸ **fromAddress**(`address`, `provider`): [`WalletLocked`](/api/Wallet/WalletLocked.md)

Creates a locked wallet instance from an address and a provider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the wallet. |
| `provider` | [`Provider`](/api/Providers/Provider.md) | A Provider instance. |

#### Returns

[`WalletLocked`](/api/Wallet/WalletLocked.md)

A locked wallet instance.

#### Defined in

[wallet.ts:18](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/wallet/src/wallet.ts#L18)

___

### fromPrivateKey

▸ **fromPrivateKey**(`privateKey`, `provider`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Creates an unlocked wallet instance from a private key and a provider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `BytesLike` | The private key of the wallet. |
| `provider` | [`Provider`](/api/Providers/Provider.md) | A Provider instance. |

#### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[wallet.ts:29](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/wallet/src/wallet.ts#L29)
