[**@fuel-ts/account v0.94.6**](../index.md) • **Docs**

***

# Class: Mnemonic

## Constructors

### new Mnemonic()

> **new Mnemonic**(`wordlist`): [`Mnemonic`](Mnemonic.md)

#### Parameters

• **wordlist**: `string`[] = `english`

Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.

#### Returns

[`Mnemonic`](Mnemonic.md)

Mnemonic instance

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:58](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/mnemonic/mnemonic.ts#L58)

## Properties

### wordlist

> **wordlist**: `string`[]

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:51](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/mnemonic/mnemonic.ts#L51)

## Methods

### entropyToMnemonic()

> **entropyToMnemonic**(`entropy`): `string`

#### Parameters

• **entropy**: [`BytesLike`](../Interfaces/index.md#byteslike)

Entropy source to the mnemonic phrase.

#### Returns

`string`

Mnemonic phrase

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:78](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/mnemonic/mnemonic.ts#L78)

***

### mnemonicToEntropy()

> **mnemonicToEntropy**(`phrase`): `string`

#### Parameters

• **phrase**: [`MnemonicPhrase`](../index.md#mnemonicphrase)

Mnemonic phrase composed by words from the provided wordlist

#### Returns

`string`

Entropy hash

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:69](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/mnemonic/mnemonic.ts#L69)

***

### binarySearch()

> `static` **binarySearch**(`target`): `boolean`

#### Parameters

• **target**: `string`

#### Returns

`boolean`

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:162](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/mnemonic/mnemonic.ts#L162)

***

### entropyToMnemonic()

> `static` **entropyToMnemonic**(`entropy`, `wordlist`): `string`

#### Parameters

• **entropy**: [`BytesLike`](../Interfaces/index.md#byteslike)

Entropy source to the mnemonic phrase.

• **wordlist**: `string`[] = `english`

#### Returns

`string`

64-byte array contains privateKey and chainCode as described on BIP39

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:101](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/mnemonic/mnemonic.ts#L101)

***

### generate()

> `static` **generate**(`size`, `extraEntropy`): `string`

Create a new mnemonic using a randomly generated number as entropy.
 As defined in BIP39, the entropy must be a multiple of 32 bits, and its size must be between 128 and 256 bits.
 Therefore, the possible values for `strength` are 128, 160, 192, 224, and 256.
 If not provided, the default entropy length will be set to 256 bits.
 The return is a list of words that encodes the generated entropy.

#### Parameters

• **size**: `number` = `32`

Number of bytes used as an entropy

• **extraEntropy**: [`BytesLike`](../Interfaces/index.md#byteslike) = `''`

Optional extra entropy to increase randomness

#### Returns

`string`

A randomly generated mnemonic

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:243](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/mnemonic/mnemonic.ts#L243)

***

### isMnemonicValid()

> `static` **isMnemonicValid**(`phrase`): `boolean`

Validates if given mnemonic is  valid

#### Parameters

• **phrase**: `string`

Mnemonic phrase composed by words from the provided wordlist

#### Returns

`boolean`

true if phrase is a valid mnemonic

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:141](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/mnemonic/mnemonic.ts#L141)

***

### masterKeysFromSeed()

> `static` **masterKeysFromSeed**(`seed`): `Uint8Array`

#### Parameters

• **seed**: `string`

BIP39 seed

#### Returns

`Uint8Array`

64-byte array contains privateKey and chainCode as described on BIP39

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:188](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/mnemonic/mnemonic.ts#L188)

***

### mnemonicToEntropy()

> `static` **mnemonicToEntropy**(`phrase`, `wordlist`): `string`

#### Parameters

• **phrase**: [`MnemonicPhrase`](../index.md#mnemonicphrase)

Mnemonic phrase composed by words from the provided wordlist

• **wordlist**: `string`[] = `english`

Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.

#### Returns

`string`

Mnemonic phrase

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:88](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/mnemonic/mnemonic.ts#L88)

***

### mnemonicToMasterKeys()

> `static` **mnemonicToMasterKeys**(`phrase`, `passphrase`): `Uint8Array`

#### Parameters

• **phrase**: [`MnemonicPhrase`](../index.md#mnemonicphrase)

Mnemonic phrase composed by words from the provided wordlist

• **passphrase**: [`BytesLike`](../Interfaces/index.md#byteslike) = `''`

Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`

#### Returns

`Uint8Array`

64-byte array contains privateKey and chainCode as described on BIP39

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:131](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/mnemonic/mnemonic.ts#L131)

***

### mnemonicToSeed()

> `static` **mnemonicToSeed**(`phrase`, `passphrase`): `string`

#### Parameters

• **phrase**: [`MnemonicPhrase`](../index.md#mnemonicphrase)

Mnemonic phrase composed by words from the provided wordlist

• **passphrase**: [`BytesLike`](../Interfaces/index.md#byteslike) = `''`

Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`

#### Returns

`string`

64-byte array contains privateKey and chainCode as described on BIP39

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:117](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/mnemonic/mnemonic.ts#L117)

***

### seedToExtendedKey()

> `static` **seedToExtendedKey**(`seed`, `testnet`): `string`

Get the extendKey as defined on BIP-32 from the provided seed

#### Parameters

• **seed**: `string`

BIP39 seed

• **testnet**: `boolean` = `false`

Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).

#### Returns

`string`

BIP-32 extended private key

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:208](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/account/src/mnemonic/mnemonic.ts#L208)
