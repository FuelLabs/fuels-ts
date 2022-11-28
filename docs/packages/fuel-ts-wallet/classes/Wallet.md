---
layout: default
title: Wallet
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: Wallet

[@fuel-ts/wallet](../index.md).Wallet

## Constructors

### constructor

• **new Wallet**()

## Properties

### fromExtendedKey

▪ `Static` **fromExtendedKey**: (`extendedKey`: `string`) => [`WalletUnlocked`](WalletUnlocked.md) = `WalletUnlocked.fromExtendedKey`

#### Type declaration

▸ (`extendedKey`): [`WalletUnlocked`](WalletUnlocked.md)

Create Wallet Unlocked from extended key

##### Parameters

| Name | Type |
| :------ | :------ |
| `extendedKey` | `string` |

##### Returns

[`WalletUnlocked`](WalletUnlocked.md)

#### Defined in

[packages/wallet/src/wallet.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L23)

___

### fromMnemonic

▪ `Static` **fromMnemonic**: (`mnemonic`: `string`, `path?`: `string`, `passphrase?`: `BytesLike`) => [`WalletUnlocked`](WalletUnlocked.md) = `WalletUnlocked.fromMnemonic`

#### Type declaration

▸ (`mnemonic`, `path?`, `passphrase?`): [`WalletUnlocked`](WalletUnlocked.md)

Create Wallet Unlocked from mnemonic phrase

##### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `path?` | `string` |
| `passphrase?` | `BytesLike` |

##### Returns

[`WalletUnlocked`](WalletUnlocked.md)

#### Defined in

[packages/wallet/src/wallet.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L22)

___

### fromSeed

▪ `Static` **fromSeed**: (`seed`: `string`, `path?`: `string`) => [`WalletUnlocked`](WalletUnlocked.md) = `WalletUnlocked.fromSeed`

#### Type declaration

▸ (`seed`, `path?`): [`WalletUnlocked`](WalletUnlocked.md)

Create Wallet Unlocked from a seed

##### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `string` |
| `path?` | `string` |

##### Returns

[`WalletUnlocked`](WalletUnlocked.md)

#### Defined in

[packages/wallet/src/wallet.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L21)

___

### generate

▪ `Static` **generate**: (`generateOptions?`: [`GenerateOptions`](../interfaces/internal-GenerateOptions.md)) => [`WalletUnlocked`](WalletUnlocked.md) = `WalletUnlocked.generate`

#### Type declaration

▸ (`generateOptions?`): [`WalletUnlocked`](WalletUnlocked.md)

Generate a new Wallet Unlocked with a random keyPair

##### Parameters

| Name | Type |
| :------ | :------ |
| `generateOptions?` | [`GenerateOptions`](../interfaces/internal-GenerateOptions.md) |

##### Returns

[`WalletUnlocked`](WalletUnlocked.md)

wallet - Wallet instance

#### Defined in

[packages/wallet/src/wallet.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L20)

## Methods

### fromAddress

▸ `Static` **fromAddress**(`address`, `provider?`): [`WalletLocked`](WalletLocked.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](internal-AbstractAddress.md) | `undefined` |
| `provider` | `string` \| `default` | `FUEL_NETWORK_URL` |

#### Returns

[`WalletLocked`](WalletLocked.md)

#### Defined in

[packages/wallet/src/wallet.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L9)

___

### fromPrivateKey

▸ `Static` **fromPrivateKey**(`privateKey`, `provider?`): [`WalletUnlocked`](WalletUnlocked.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `privateKey` | `BytesLike` | `undefined` |
| `provider` | `string` \| `default` | `FUEL_NETWORK_URL` |

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

#### Defined in

[packages/wallet/src/wallet.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L16)
