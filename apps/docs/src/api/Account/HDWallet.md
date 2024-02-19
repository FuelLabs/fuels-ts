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

[packages/account/src/hdwallet/hdwallet.ts:89](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L89)

## Properties

### chainCode

• **chainCode**: `BytesLike`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:82](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L82)

___

### depth

• **depth**: `number` = `0`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:76](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L76)

___

### fingerprint

• **fingerprint**: `string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:78](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L78)

___

### index

• **index**: `number` = `0`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:77](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L77)

___

### parentFingerprint

• **parentFingerprint**: `string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:79](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L79)

___

### privateKey

• `Optional` **privateKey**: `string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:80](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L80)

___

### publicKey

• **publicKey**: `string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:81](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L81)

## Accessors

### extendedKey

• `get` **extendedKey**(): `string`

#### Returns

`string`

#### Defined in

[packages/account/src/hdwallet/hdwallet.ts:113](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L113)

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

[packages/account/src/hdwallet/hdwallet.ts:124](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L124)

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

[packages/account/src/hdwallet/hdwallet.ts:183](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L183)

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

[packages/account/src/hdwallet/hdwallet.ts:196](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L196)

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

[packages/account/src/hdwallet/hdwallet.ts:234](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L234)

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

[packages/account/src/hdwallet/hdwallet.ts:225](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/hdwallet/hdwallet.ts#L225)
