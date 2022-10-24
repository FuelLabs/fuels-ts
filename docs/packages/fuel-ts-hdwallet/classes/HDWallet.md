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

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`HDWalletConfig`](../namespaces/internal.md#hdwalletconfig) |

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

## Methods

### deriveIndex

▸ **deriveIndex**(`index`): [`HDWallet`](HDWallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

[`HDWallet`](HDWallet.md)

___

### derivePath

▸ **derivePath**(`path`): [`HDWallet`](HDWallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

[`HDWallet`](HDWallet.md)

___

### toExtendedKey

▸ **toExtendedKey**(`isPublic?`, `testnet?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `isPublic` | `boolean` | `false` |
| `testnet` | `boolean` | `false` |

#### Returns

`string`

___

### fromExtendedKey

▸ `Static` **fromExtendedKey**(`extendedKey`): [`HDWallet`](HDWallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `extendedKey` | `string` |

#### Returns

[`HDWallet`](HDWallet.md)

___

### fromSeed

▸ `Static` **fromSeed**(`seed`): [`HDWallet`](HDWallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `string` |

#### Returns

[`HDWallet`](HDWallet.md)
