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

| Name | Type | Default value |
| :------ | :------ | :------ |
| `wordlist` | `string`[] | `english` |

## Properties

### wordlist

• **wordlist**: `string`[]

#### Defined in

[packages/mnemonic/src/mnemonic.ts:46](https://github.com/FuelLabs/fuels-ts/blob/master/packages/mnemonic/src/mnemonic.ts#L46)

## Methods

### entropyToMnemonic

▸ **entropyToMnemonic**(`entropy`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entropy` | `BytesLike` |

#### Returns

`string`

___

### mnemonicToEntropy

▸ **mnemonicToEntropy**(`phrase`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phrase` | [`MnemonicPhrase`](../index.md#mnemonicphrase) |

#### Returns

`string`

___

### entropyToMnemonic

▸ `Static` **entropyToMnemonic**(`entropy`, `wordlist?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `entropy` | `BytesLike` | `undefined` |
| `wordlist` | `string`[] | `english` |

#### Returns

`string`

___

### generate

▸ `Static` **generate**(`size?`, `extraEntropy?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `size` | `number` | `32` |
| `extraEntropy` | `BytesLike` | `''` |

#### Returns

`string`

___

### masterKeysFromSeed

▸ `Static` **masterKeysFromSeed**(`seed`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `string` |

#### Returns

`Uint8Array`

___

### mnemonicToEntropy

▸ `Static` **mnemonicToEntropy**(`phrase`, `wordlist?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `phrase` | [`MnemonicPhrase`](../index.md#mnemonicphrase) | `undefined` |
| `wordlist` | `string`[] | `english` |

#### Returns

`string`

___

### mnemonicToMasterKeys

▸ `Static` **mnemonicToMasterKeys**(`phrase`, `passphrase?`): `Uint8Array`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `phrase` | [`MnemonicPhrase`](../index.md#mnemonicphrase) | `undefined` |
| `passphrase` | `BytesLike` | `''` |

#### Returns

`Uint8Array`

___

### mnemonicToSeed

▸ `Static` **mnemonicToSeed**(`phrase`, `passphrase?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `phrase` | [`MnemonicPhrase`](../index.md#mnemonicphrase) | `undefined` |
| `passphrase` | `BytesLike` | `''` |

#### Returns

`string`

___

### seedToExtendedKey

▸ `Static` **seedToExtendedKey**(`seed`, `testnet?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `seed` | `string` | `undefined` |
| `testnet` | `boolean` | `false` |

#### Returns

`string`
