# Class: HDWallet

[@fuel-ts/account](/api/Account/index.md).HDWallet

## Constructors

### constructor

• **new HDWallet**(`config`): [`HDWallet`](/api/Account/HDWallet.md)

HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `HDWalletConfig` | Wallet configurations |

#### Returns

[`HDWallet`](/api/Account/HDWallet.md)

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:80](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L80)

## Properties

### chainCode

• **chainCode**: [`BytesLike`](/api/Interfaces/index.md#byteslike)

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:73](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L73)

___

### depth

• **depth**: `number` = `0`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:67](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L67)

___

### fingerprint

• **fingerprint**: `string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:69](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L69)

___

### index

• **index**: `number` = `0`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:68](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L68)

___

### parentFingerprint

• **parentFingerprint**: `string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:70](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L70)

___

### privateKey

• `Optional` **privateKey**: `string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:71](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L71)

___

### publicKey

• **publicKey**: `string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:72](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L72)

## Accessors

### extendedKey

• `get` **extendedKey**(): `string`

#### Returns

`string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:104](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L104)

## Methods

### deriveIndex

▸ **deriveIndex**(`index`): [`HDWallet`](/api/Account/HDWallet.md)

Derive the current HDWallet instance navigating only on the index.
`Ex.: m/44'/0 -> Ex.: m/44'/1 -> m/44'/2`. [Learn more](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index of the child HDWallet. |

#### Returns

[`HDWallet`](/api/Account/HDWallet.md)

A new instance of HDWallet on the derived index

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:115](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L115)

___

### derivePath

▸ **derivePath**(`path`): [`HDWallet`](/api/Account/HDWallet.md)

Derive the current HDWallet instance to the path. [Learn more](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The string representation of the child HDWallet. `Ex.: m/44'/0'/0'/0/0` |

#### Returns

[`HDWallet`](/api/Account/HDWallet.md)

A new instance of HDWallet on the derived path

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:174](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L174)

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

[packages/account/src/hdwallet/hdwallet.ts:187](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L187)

___

### fromExtendedKey

▸ **fromExtendedKey**(`extendedKey`): [`HDWallet`](/api/Account/HDWallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `extendedKey` | `string` |

#### Returns

[`HDWallet`](/api/Account/HDWallet.md)

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:223](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L223)

___

### fromSeed

▸ **fromSeed**(`seed`): [`HDWallet`](/api/Account/HDWallet.md)

Create HDWallet instance from seed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `string` | Seed |

#### Returns

[`HDWallet`](/api/Account/HDWallet.md)

A new instance of HDWallet

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:214](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/hdwallet/hdwallet.ts#L214)
