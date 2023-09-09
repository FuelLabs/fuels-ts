# Class: Wallet

[@fuel-ts/wallet](/api/Wallet/index.md).Wallet

`Wallet` provides methods to create locked and unlocked wallet instances.

## Constructors

### constructor

• **new Wallet**()

## Properties

### fromEncryptedJson

▪ `Static` **fromEncryptedJson**: (`jsonWallet`: `string`, `password`: `string`) => `Promise`&lt;[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)\> = `WalletUnlocked.fromEncryptedJson`

#### Type declaration

▸ (`jsonWallet`, `password`): `Promise`&lt;[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `jsonWallet` | `string` |
| `password` | `string` |

##### Returns

`Promise`&lt;[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)\>

#### Defined in

[wallet.ts:74](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/wallet.ts#L74)

___

### fromExtendedKey

▪ `Static` **fromExtendedKey**: (`extendedKey`: `string`, `provider?`: [`Provider`](/api/Providers/Provider.md)) => [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md) = `WalletUnlocked.fromExtendedKey`

#### Type declaration

▸ (`extendedKey`, `provider?`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Create a Wallet Unlocked from an extended key.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `extendedKey` | `string` | The extended key. |
| `provider?` | [`Provider`](/api/Providers/Provider.md) | The provider URL or a Provider instance (optional). |

##### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[wallet.ts:73](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/wallet.ts#L73)

___

### fromMnemonic

▪ `Static` **fromMnemonic**: (`mnemonic`: `string`, `path?`: `string`, `passphrase?`: `BytesLike`, `provider?`: [`Provider`](/api/Providers/Provider.md)) => [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md) = `WalletUnlocked.fromMnemonic`

#### Type declaration

▸ (`mnemonic`, `path?`, `passphrase?`, `provider?`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Create a Wallet Unlocked from a mnemonic phrase.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonic` | `string` | The mnemonic phrase. |
| `path?` | `string` | The derivation path (optional). |
| `passphrase?` | `BytesLike` | The passphrase for the mnemonic (optional). |
| `provider?` | [`Provider`](/api/Providers/Provider.md) | The provider URL or a Provider instance (optional). |

##### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[wallet.ts:64](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/wallet.ts#L64)

___

### fromSeed

▪ `Static` **fromSeed**: (`seed`: `string`, `path?`: `string`, `provider?`: [`Provider`](/api/Providers/Provider.md)) => [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md) = `WalletUnlocked.fromSeed`

#### Type declaration

▸ (`seed`, `path?`, `provider?`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Create a Wallet Unlocked from a seed.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `string` | The seed phrase. |
| `path?` | `string` | The derivation path (optional). |
| `provider?` | [`Provider`](/api/Providers/Provider.md) | The provider URL or a Provider instance (optional). |

##### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[wallet.ts:53](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/wallet.ts#L53)

___

### generate

▪ `Static` **generate**: (`generateOptions?`: `GenerateOptions`) => [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md) = `WalletUnlocked.generate`

#### Type declaration

▸ (`generateOptions?`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Generate a new Wallet Unlocked with a random key pair.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `generateOptions?` | `GenerateOptions` | Options to customize the generation process (optional). |

##### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[wallet.ts:43](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/wallet.ts#L43)

## Methods

### fromAddress

▸ `Static` **fromAddress**(`address`, `provider?`): [`WalletLocked`](/api/Wallet/WalletLocked.md)

Creates a locked wallet instance from an address and a provider.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the wallet. |
| `provider` | `string` \| [`Provider`](/api/Providers/Provider.md) | `FUEL_NETWORK_URL` | The provider URL or a Provider instance. |

#### Returns

[`WalletLocked`](/api/Wallet/WalletLocked.md)

A locked wallet instance.

#### Defined in

[wallet.ts:19](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/wallet.ts#L19)

___

### fromPrivateKey

▸ `Static` **fromPrivateKey**(`privateKey`, `provider?`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Creates an unlocked wallet instance from a private key and a provider.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `privateKey` | `BytesLike` | `undefined` | The private key of the wallet. |
| `provider` | `string` \| [`Provider`](/api/Providers/Provider.md) | `FUEL_NETWORK_URL` | The provider URL or a Provider instance. |

#### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[wallet.ts:33](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/wallet.ts#L33)
