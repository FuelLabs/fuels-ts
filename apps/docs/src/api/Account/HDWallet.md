[**@fuel-ts/account v0.94.8**](../index.md) • **Docs**

***

# Class: HDWallet

## Constructors

### new HDWallet()

> **new HDWallet**(`config`): [`HDWallet`](HDWallet.md)

HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets

#### Parameters

• **config**: `HDWalletConfig`

Wallet configurations

#### Returns

[`HDWallet`](HDWallet.md)

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:80](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L80)

## Properties

### chainCode

> **chainCode**: [`BytesLike`](../Interfaces/index.md#byteslike)

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:73](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L73)

***

### depth

> **depth**: `number` = `0`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:67](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L67)

***

### fingerprint

> **fingerprint**: `string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:69](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L69)

***

### index

> **index**: `number` = `0`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:68](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L68)

***

### parentFingerprint

> **parentFingerprint**: `string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:70](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L70)

***

### privateKey?

> `optional` **privateKey**: `string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:71](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L71)

***

### publicKey

> **publicKey**: `string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:72](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L72)

## Accessors

### extendedKey

> `get` **extendedKey**(): `string`

#### Returns

`string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:104](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L104)

## Methods

### deriveIndex()

> **deriveIndex**(`index`): [`HDWallet`](HDWallet.md)

Derive the current HDWallet instance navigating only on the index.
`Ex.: m/44'/0 -> Ex.: m/44'/1 -> m/44'/2`. [Learn more](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

#### Parameters

• **index**: `number`

Index of the child HDWallet.

#### Returns

[`HDWallet`](HDWallet.md)

A new instance of HDWallet on the derived index

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:115](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L115)

***

### derivePath()

> **derivePath**(`path`): [`HDWallet`](HDWallet.md)

Derive the current HDWallet instance to the path. [Learn more](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

#### Parameters

• **path**: `string`

The string representation of the child HDWallet. `Ex.: m/4./0`

#### Returns

[`HDWallet`](HDWallet.md)

A new instance of HDWallet on the derived path

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:174](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L174)

***

### toExtendedKey()

> **toExtendedKey**(`isPublic`, `testnet`): `string`

Get the extendKey as defined on BIP-32 from the provided seed

#### Parameters

• **isPublic**: `boolean` = `false`

enable to export public extendedKey, it not required when HDWallet didn't have the privateKey.

• **testnet**: `boolean` = `false`

Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).

#### Returns

`string`

BIP-32 extended private key

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:187](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L187)

***

### fromExtendedKey()

> `static` **fromExtendedKey**(`extendedKey`): [`HDWallet`](HDWallet.md)

#### Parameters

• **extendedKey**: `string`

#### Returns

[`HDWallet`](HDWallet.md)

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:223](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L223)

***

### fromSeed()

> `static` **fromSeed**(`seed`): [`HDWallet`](HDWallet.md)

Create HDWallet instance from seed

#### Parameters

• **seed**: `string`

Seed

#### Returns

[`HDWallet`](HDWallet.md)

A new instance of HDWallet

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:214](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/hdwallet/hdwallet.ts#L214)
