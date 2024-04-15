# Class: Mnemonic

[@fuel-ts/account](/api/Account/index.md).Mnemonic

## Constructors

### constructor

• **new Mnemonic**(`wordlist?`): [`Mnemonic`](/api/Account/Mnemonic.md)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `wordlist` | `string`[] | `english` | Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list. |

#### Returns

[`Mnemonic`](/api/Account/Mnemonic.md)

Mnemonic instance

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:65](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L65)

## Properties

### wordlist

• **wordlist**: `string`[]

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:58](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L58)

## Methods

### entropyToMnemonic

▸ **entropyToMnemonic**(`entropy`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entropy` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Entropy source to the mnemonic phrase. |

#### Returns

`string`

Mnemonic phrase

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:85](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L85)

___

### mnemonicToEntropy

▸ **mnemonicToEntropy**(`phrase`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `phrase` | [`MnemonicPhrase`](/api/Account/index.md#mnemonicphrase) | Mnemonic phrase composed by words from the provided wordlist |

#### Returns

`string`

Entropy hash

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:76](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L76)

___

### binarySearch

▸ **binarySearch**(`target`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:169](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L169)

___

### entropyToMnemonic

▸ **entropyToMnemonic**(`entropy`, `wordlist?`): `string`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `entropy` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `undefined` | Entropy source to the mnemonic phrase. |
| `wordlist` | `string`[] | `english` | - |

#### Returns

`string`

64-byte array contains privateKey and chainCode as described on BIP39

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:108](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L108)

___

### generate

▸ **generate**(`size?`, `extraEntropy?`): `string`

Create a new mnemonic using a randomly generated number as entropy.
 As defined in BIP39, the entropy must be a multiple of 32 bits, and its size must be between 128 and 256 bits.
 Therefore, the possible values for `strength` are 128, 160, 192, 224, and 256.
 If not provided, the default entropy length will be set to 256 bits.
 The return is a list of words that encodes the generated entropy.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `size` | `number` | `32` | Number of bytes used as an entropy |
| `extraEntropy` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `''` | Optional extra entropy to increase randomness |

#### Returns

`string`

A randomly generated mnemonic

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:250](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L250)

___

### isMnemonicValid

▸ **isMnemonicValid**(`phrase`): `boolean`

Validates if given mnemonic is  valid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `phrase` | `string` | Mnemonic phrase composed by words from the provided wordlist |

#### Returns

`boolean`

true if phrase is a valid mnemonic

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:148](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L148)

___

### masterKeysFromSeed

▸ **masterKeysFromSeed**(`seed`): `Uint8Array`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `string` | BIP39 seed |

#### Returns

`Uint8Array`

64-byte array contains privateKey and chainCode as described on BIP39

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:195](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L195)

___

### mnemonicToEntropy

▸ **mnemonicToEntropy**(`phrase`, `wordlist?`): `string`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `phrase` | [`MnemonicPhrase`](/api/Account/index.md#mnemonicphrase) | `undefined` | Mnemonic phrase composed by words from the provided wordlist |
| `wordlist` | `string`[] | `english` | Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list. |

#### Returns

`string`

Mnemonic phrase

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:95](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L95)

___

### mnemonicToMasterKeys

▸ **mnemonicToMasterKeys**(`phrase`, `passphrase?`): `Uint8Array`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `phrase` | [`MnemonicPhrase`](/api/Account/index.md#mnemonicphrase) | `undefined` | Mnemonic phrase composed by words from the provided wordlist |
| `passphrase` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `''` | Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.` |

#### Returns

`Uint8Array`

64-byte array contains privateKey and chainCode as described on BIP39

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:138](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L138)

___

### mnemonicToSeed

▸ **mnemonicToSeed**(`phrase`, `passphrase?`): `string`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `phrase` | [`MnemonicPhrase`](/api/Account/index.md#mnemonicphrase) | `undefined` | Mnemonic phrase composed by words from the provided wordlist |
| `passphrase` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `''` | Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.` |

#### Returns

`string`

64-byte array contains privateKey and chainCode as described on BIP39

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:124](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L124)

___

### seedToExtendedKey

▸ **seedToExtendedKey**(`seed`, `testnet?`): `string`

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

[packages/account/src/mnemonic/mnemonic.ts:215](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L215)
