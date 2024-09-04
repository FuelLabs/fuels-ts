[**@fuel-ts/account v0.94.4**](../index.md) • **Docs**

***

# Class: Wallet

`Wallet` provides methods to create locked and unlocked wallet instances.

## Constructors

### new Wallet()

> **new Wallet**(): [`Wallet`](Wallet.md)

#### Returns

[`Wallet`](Wallet.md)

## Properties

### fromEncryptedJson()

> `static` **fromEncryptedJson**: (`jsonWallet`, `password`, `provider`?) => `Promise`\&lt;[`WalletUnlocked`](WalletUnlocked.md)\> = `WalletUnlocked.fromEncryptedJson`

Create a Wallet Unlocked from an encrypted JSON.

Create a Wallet Unlocked from an encrypted JSON.

#### Parameters

• **jsonWallet**: `string`

The encrypted JSON keystore.

• **password**: `string`

The password to decrypt the JSON.

• **provider?**: [`Provider`](Provider.md)

A Provider instance (optional).

#### Returns

`Promise`\&lt;[`WalletUnlocked`](WalletUnlocked.md)\>

An unlocked wallet instance.

#### Param

The encrypted JSON keystore.

#### Param

The password to decrypt the JSON.

#### Param

A Provider instance (optional).

#### Defined in

[packages/account/src/wallet/wallet.ts:79](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet/wallet.ts#L79)

***

### fromExtendedKey()

> `static` **fromExtendedKey**: (`extendedKey`, `provider`?) => [`WalletUnlocked`](WalletUnlocked.md) = `WalletUnlocked.fromExtendedKey`

Create a Wallet Unlocked from an extended key.

Create a Wallet Unlocked from an extended key.

#### Parameters

• **extendedKey**: `string`

The extended key.

• **provider?**: [`Provider`](Provider.md)

A Provider instance (optional).

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

An instance of WalletUnlocked.

#### Param

The extended key.

#### Param

A Provider instance (optional).

#### Defined in

[packages/account/src/wallet/wallet.ts:69](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet/wallet.ts#L69)

***

### fromMnemonic()

> `static` **fromMnemonic**: (`mnemonic`, `path`?, `passphrase`?, `provider`?) => [`WalletUnlocked`](WalletUnlocked.md) = `WalletUnlocked.fromMnemonic`

Create a Wallet Unlocked from a mnemonic phrase.

Create a Wallet Unlocked from a mnemonic phrase.

#### Parameters

• **mnemonic**: `string`

The mnemonic phrase.

• **path?**: `string`

The derivation path (optional).

• **passphrase?**: [`BytesLike`](../Interfaces/index.md#byteslike)

The passphrase for the mnemonic (optional).

• **provider?**: [`Provider`](Provider.md)

A Provider instance (optional).

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

An instance of WalletUnlocked.

#### Param

The mnemonic phrase.

#### Param

A Provider instance (optional).

#### Param

The derivation path (optional).

#### Param

The passphrase for the mnemonic (optional).

#### Defined in

[packages/account/src/wallet/wallet.ts:60](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet/wallet.ts#L60)

***

### fromSeed()

> `static` **fromSeed**: (`seed`, `path`?, `provider`?) => [`WalletUnlocked`](WalletUnlocked.md) = `WalletUnlocked.fromSeed`

Create a Wallet Unlocked from a seed.

Create a Wallet Unlocked from a seed.

#### Parameters

• **seed**: `string`

The seed phrase.

• **path?**: `string`

The derivation path (optional).

• **provider?**: [`Provider`](Provider.md)

A Provider instance (optional).

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

An instance of WalletUnlocked.

#### Param

The seed phrase.

#### Param

A Provider instance (optional).

#### Param

The derivation path (optional).

#### Defined in

[packages/account/src/wallet/wallet.ts:49](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet/wallet.ts#L49)

***

### generate()

> `static` **generate**: (`generateOptions`?) => [`WalletUnlocked`](WalletUnlocked.md) = `WalletUnlocked.generate`

Generate a new Wallet Unlocked with a random key pair.

Generate a new Wallet Unlocked with a random key pair.

#### Parameters

• **generateOptions?**: [`GenerateOptions`](./GenerateOptions.md)

Options to customize the generation process (optional).

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

An instance of WalletUnlocked.

#### Param

Options to customize the generation process (optional).

#### Defined in

[packages/account/src/wallet/wallet.ts:39](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet/wallet.ts#L39)

## Methods

### fromAddress()

> `static` **fromAddress**(`address`, `provider`?): [`WalletLocked`](WalletLocked.md)

Creates a locked wallet instance from an address and a provider.

#### Parameters

• **address**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address of the wallet.

• **provider?**: [`Provider`](Provider.md)

A Provider instance (optional).

#### Returns

[`WalletLocked`](WalletLocked.md)

A locked wallet instance.

#### Defined in

[packages/account/src/wallet/wallet.ts:18](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet/wallet.ts#L18)

***

### fromPrivateKey()

> `static` **fromPrivateKey**(`privateKey`, `provider`?): [`WalletUnlocked`](WalletUnlocked.md)

Creates an unlocked wallet instance from a private key and a provider.

#### Parameters

• **privateKey**: [`BytesLike`](../Interfaces/index.md#byteslike)

The private key of the wallet.

• **provider?**: [`Provider`](Provider.md)

A Provider instance (optional).

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

An unlocked wallet instance.

#### Defined in

[packages/account/src/wallet/wallet.ts:29](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/wallet/wallet.ts#L29)
