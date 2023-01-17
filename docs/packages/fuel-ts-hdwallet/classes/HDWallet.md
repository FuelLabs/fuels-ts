---
layout: default
title: HDWallet
parent: "@fuel-ts/hdwallet"
nav_order: 1

---

# Class: HDWallet

[@fuel-ts/hdwallet](../index.md).HDWallet

## Constructors

### constructor

• **new HDWallet**(`config`)

HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`HDWalletConfig`](../namespaces/internal.md#hdwalletconfig) | Wallet configurations |

#### Defined in

[packages/hdwallet/src/hdwallet.ts:78](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L78)

## Properties

### chainCode

• **chainCode**: `BytesLike`

#### Defined in

[packages/hdwallet/src/hdwallet.ts:71](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L71)

___

### depth

• **depth**: `number` = `0`

#### Defined in

[packages/hdwallet/src/hdwallet.ts:65](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L65)

___

### fingerprint

• **fingerprint**: `string`

#### Defined in

[packages/hdwallet/src/hdwallet.ts:67](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L67)

___

### index

• **index**: `number` = `0`

#### Defined in

[packages/hdwallet/src/hdwallet.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L66)

___

### parentFingerprint

• **parentFingerprint**: `string`

#### Defined in

[packages/hdwallet/src/hdwallet.ts:68](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L68)

___

### privateKey

• `Optional` **privateKey**: `string`

#### Defined in

[packages/hdwallet/src/hdwallet.ts:69](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L69)

___

### publicKey

• **publicKey**: `string`

#### Defined in

[packages/hdwallet/src/hdwallet.ts:70](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L70)

## Accessors

### extendedKey

• `get` **extendedKey**(): `string`

#### Returns

`string`

#### Defined in

[packages/hdwallet/src/hdwallet.ts:99](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L99)

## Methods

### deriveIndex

▸ **deriveIndex**(`index`): [`HDWallet`](HDWallet.md)

Derive the current HDWallet instance navigating only on the index.
`Ex.: m/44'/0 -> Ex.: m/44'/1 -> m/44'/2`. [Learn more](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index of the child HDWallet. |

#### Returns

[`HDWallet`](HDWallet.md)

A new instance of HDWallet on the derived index

#### Defined in

[packages/hdwallet/src/hdwallet.ts:110](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L110)

___

### derivePath

▸ **derivePath**(`path`): [`HDWallet`](HDWallet.md)

Derive the current HDWallet instance to the path. [Learn more](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The string representation of the child HDWallet. `Ex.: m/44'/0'/0'/0/0` |

#### Returns

[`HDWallet`](HDWallet.md)

A new instance of HDWallet on the derived path

#### Defined in

[packages/hdwallet/src/hdwallet.ts:166](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L166)

___

### toExtendedKey

▸ **toExtendedKey**(`isPublic?`, `testnet?`): `string`

Get the extendKey as defined on BIP-32 from the provided seed

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `isPublic` | `boolean` | `false` | enable to export public extendedKey, it not required when HDWallet didn't have the privateKey. |
| `testnet` | `boolean` | `false` | Inform if should use testnet or mainnet prefix, default value is true (`mainnet`). |

#### Returns

`string`

BIP-32 extended private key

#### Defined in

[packages/hdwallet/src/hdwallet.ts:179](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L179)

___

### fromExtendedKey

▸ `Static` **fromExtendedKey**(`extendedKey`): [`HDWallet`](HDWallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `extendedKey` | `string` |

#### Returns

[`HDWallet`](HDWallet.md)

#### Defined in

[packages/hdwallet/src/hdwallet.ts:212](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L212)

___

### fromSeed

▸ `Static` **fromSeed**(`seed`): [`HDWallet`](HDWallet.md)

Create HDWallet instance from seed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `string` | Seed |

#### Returns

[`HDWallet`](HDWallet.md)

A new instance of HDWallet

#### Defined in

[packages/hdwallet/src/hdwallet.ts:203](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hdwallet/src/hdwallet.ts#L203)
