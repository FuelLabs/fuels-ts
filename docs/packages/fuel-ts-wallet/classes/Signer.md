---
layout: default
title: Signer
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: Signer

[@fuel-ts/wallet](../index.md).Signer

## Constructors

### constructor

• **new Signer**(`privateKey`)

Create a Signer instance from a given private key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `BytesLike` | The private key to use for signing |

#### Defined in

[wallet/src/signer.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/signer.ts#L28)

## Properties

### address

• `Readonly` **address**: `string`

#### Defined in

[wallet/src/signer.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/signer.ts#L16)

___

### privateKey

• `Readonly` **privateKey**: `string`

#### Defined in

[wallet/src/signer.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/signer.ts#L20)

___

### publicKey

• `Readonly` **publicKey**: `string`

#### Defined in

[wallet/src/signer.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/signer.ts#L18)

## Methods

### sign

▸ **sign**(`data`): `string`

Sign data using the Signer instance

Signature is a 64 byte array of the concatenated r and s values with the compressed recoveryParam byte. [Read more](FuelLabs/fuel-specs/specs/protocol/cryptographic_primitives.md#public-key-cryptography)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `BytesLike` | The data to be sign |

#### Returns

`string`

hashed signature

#### Defined in

[wallet/src/signer.ts:57](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/signer.ts#L57)

___

### generatePrivateKey

▸ `Static` **generatePrivateKey**(`entropy?`): `string` \| `Uint8Array`

Generate a random privateKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entropy?` | `BytesLike` | Adds extra entropy to generate the privateKey |

#### Returns

`string` \| `Uint8Array`

wallet - Wallet instance

#### Defined in

[wallet/src/signer.ts:112](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/signer.ts#L112)

___

### recoverAddress

▸ `Static` **recoverAddress**(`data`, `signature`): `string`

Recover the address from a signature performed with [`sign`](#sign).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `BytesLike` | Data |
| `signature` | `BytesLike` | Signature |

#### Returns

`string`

address from signature. The address is a sha256 hash from the public key.

#### Defined in

[wallet/src/signer.ts:102](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/signer.ts#L102)

___

### recoverPublicKey

▸ `Static` **recoverPublicKey**(`data`, `signature`): `any`

Recover the public key from a signature performed with [`sign`](#sign).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `BytesLike` | Data |
| `signature` | `BytesLike` | hashed signature |

#### Returns

`any`

public key from signature from the

#### Defined in

[wallet/src/signer.ts:78](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/signer.ts#L78)
