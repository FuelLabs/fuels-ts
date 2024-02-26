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

[packages/account/src/mnemonic/mnemonic.ts:64](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/mnemonic/mnemonic.ts#L64)

## Properties

### wordlist

• **wordlist**: `string`[]

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:57](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/mnemonic/mnemonic.ts#L57)

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

[packages/account/src/mnemonic/mnemonic.ts:84](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/mnemonic/mnemonic.ts#L84)

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

[packages/account/src/mnemonic/mnemonic.ts:75](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/mnemonic/mnemonic.ts#L75)

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

[packages/account/src/mnemonic/mnemonic.ts:168](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/mnemonic/mnemonic.ts#L168)

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

[packages/account/src/mnemonic/mnemonic.ts:107](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/mnemonic/mnemonic.ts#L107)

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

[packages/account/src/mnemonic/mnemonic.ts:249](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/mnemonic/mnemonic.ts#L249)

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

[packages/account/src/mnemonic/mnemonic.ts:147](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/mnemonic/mnemonic.ts#L147)

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

[packages/account/src/mnemonic/mnemonic.ts:194](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/mnemonic/mnemonic.ts#L194)

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

[packages/account/src/mnemonic/mnemonic.ts:94](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/mnemonic/mnemonic.ts#L94)

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

[packages/account/src/mnemonic/mnemonic.ts:137](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/mnemonic/mnemonic.ts#L137)

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

[packages/account/src/mnemonic/mnemonic.ts:123](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/mnemonic/mnemonic.ts#L123)

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

[packages/account/src/mnemonic/mnemonic.ts:214](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/mnemonic/mnemonic.ts#L214)
