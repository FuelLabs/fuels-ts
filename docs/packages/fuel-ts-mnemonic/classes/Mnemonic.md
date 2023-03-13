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

[packages/mnemonic/src/mnemonic.ts:54](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L54)

## Properties

### wordlist

• **wordlist**: `string`[]

#### Defined in

[packages/mnemonic/src/mnemonic.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L47)

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

[packages/mnemonic/src/mnemonic.ts:74](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L74)

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

[packages/mnemonic/src/mnemonic.ts:65](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L65)

___

### binarySearch

▸ `Static` **binarySearch**(`target`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/mnemonic/src/mnemonic.ts:158](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L158)

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

[packages/mnemonic/src/mnemonic.ts:97](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L97)

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

[packages/mnemonic/src/mnemonic.ts:231](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L231)

___

### isMnemonicValid

▸ `Static` **isMnemonicValid**(`phrase`): `boolean`

Validates if given mnemonic is  valid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `phrase` | `string` | Mnemonic phrase composed by words from the provided wordlist |

#### Returns

`boolean`

true if phrase is a valid mnemonic

#### Defined in

[packages/mnemonic/src/mnemonic.ts:139](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L139)

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

[packages/mnemonic/src/mnemonic.ts:179](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L179)

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

[packages/mnemonic/src/mnemonic.ts:84](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L84)

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

[packages/mnemonic/src/mnemonic.ts:129](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L129)

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

[packages/mnemonic/src/mnemonic.ts:115](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L115)

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

[packages/mnemonic/src/mnemonic.ts:196](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L196)
