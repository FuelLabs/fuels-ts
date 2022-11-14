---
layout: default
title: Mnemonic
parent: "@fuel-ts/mnemonic"
nav_order: 1

---

# Class: Mnemonic

[@fuel-ts/mnemonic](../index.md).Mnemonic

## Constructors

### constructor

• **new Mnemonic**(`wordlist?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `wordlist` | `string`[] | `english` | Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list. |

#### Defined in

[packages/mnemonic/src/mnemonic.ts:53](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L53)

## Properties

### wordlist

• **wordlist**: `string`[]

#### Defined in

[packages/mnemonic/src/mnemonic.ts:46](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L46)

## Methods

### entropyToMnemonic

▸ **entropyToMnemonic**(`entropy`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entropy` | `BytesLike` | Entropy source to the mnemonic phrase. |

#### Returns

`string`

Mnemonic phrase

#### Defined in

[packages/mnemonic/src/mnemonic.ts:73](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L73)

___

### mnemonicToEntropy

▸ **mnemonicToEntropy**(`phrase`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `phrase` | [`MnemonicPhrase`](../index.md#mnemonicphrase) | Mnemonic phrase composed by words from the provided wordlist |

#### Returns

`string`

Entropy hash

#### Defined in

[packages/mnemonic/src/mnemonic.ts:64](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L64)

___

### entropyToMnemonic

▸ `Static` **entropyToMnemonic**(`entropy`, `wordlist?`): `string`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `entropy` | `BytesLike` | `undefined` | Entropy source to the mnemonic phrase. |
| `wordlist` | `string`[] | `english` | - |

#### Returns

`string`

64-byte array contains privateKey and chainCode as described on BIP39

#### Defined in

[packages/mnemonic/src/mnemonic.ts:96](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L96)

___

### generate

▸ `Static` **generate**(`size?`, `extraEntropy?`): `string`

Create a new mnemonic using a randomly generated number as entropy.
 As defined in BIP39, the entropy must be a multiple of 32 bits, and its size must be between 128 and 256 bits.
 Therefore, the possible values for `strength` are 128, 160, 192, 224, and 256.
 If not provided, the default entropy length will be set to 256 bits.
 The return is a list of words that encodes the generated entropy.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `size` | `number` | `32` | Number of bytes used as an entropy |
| `extraEntropy` | `BytesLike` | `''` | Optional extra entropy to increase randomness |

#### Returns

`string`

A randomly generated mnemonic

#### Defined in

[packages/mnemonic/src/mnemonic.ts:190](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L190)

___

### masterKeysFromSeed

▸ `Static` **masterKeysFromSeed**(`seed`): `Uint8Array`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `string` | BIP39 seed |

#### Returns

`Uint8Array`

64-byte array contains privateKey and chainCode as described on BIP39

#### Defined in

[packages/mnemonic/src/mnemonic.ts:138](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L138)

___

### mnemonicToEntropy

▸ `Static` **mnemonicToEntropy**(`phrase`, `wordlist?`): `string`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `phrase` | [`MnemonicPhrase`](../index.md#mnemonicphrase) | `undefined` | Mnemonic phrase composed by words from the provided wordlist |
| `wordlist` | `string`[] | `english` | Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list. |

#### Returns

`string`

Mnemonic phrase

#### Defined in

[packages/mnemonic/src/mnemonic.ts:83](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L83)

___

### mnemonicToMasterKeys

▸ `Static` **mnemonicToMasterKeys**(`phrase`, `passphrase?`): `Uint8Array`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `phrase` | [`MnemonicPhrase`](../index.md#mnemonicphrase) | `undefined` | Mnemonic phrase composed by words from the provided wordlist |
| `passphrase` | `BytesLike` | `''` | Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.` |

#### Returns

`Uint8Array`

64-byte array contains privateKey and chainCode as described on BIP39

#### Defined in

[packages/mnemonic/src/mnemonic.ts:128](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L128)

___

### mnemonicToSeed

▸ `Static` **mnemonicToSeed**(`phrase`, `passphrase?`): `string`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `phrase` | [`MnemonicPhrase`](../index.md#mnemonicphrase) | `undefined` | Mnemonic phrase composed by words from the provided wordlist |
| `passphrase` | `BytesLike` | `''` | Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.` |

#### Returns

`string`

64-byte array contains privateKey and chainCode as described on BIP39

#### Defined in

[packages/mnemonic/src/mnemonic.ts:114](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L114)

___

### seedToExtendedKey

▸ `Static` **seedToExtendedKey**(`seed`, `testnet?`): `string`

Get the extendKey as defined on BIP-32 from the provided seed

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `seed` | `string` | `undefined` | BIP39 seed |
| `testnet` | `boolean` | `false` | Inform if should use testnet or mainnet prefix, default value is true (`mainnet`). |

#### Returns

`string`

BIP-32 extended private key

#### Defined in

[packages/mnemonic/src/mnemonic.ts:155](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L155)
