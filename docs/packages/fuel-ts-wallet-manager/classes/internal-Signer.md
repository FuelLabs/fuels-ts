---
layout: default
title: Signer
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: Signer

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).Signer

## Constructors

### constructor

• **new Signer**(`privateKey`)

Create a Signer instance from a given private key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `BytesLike` | The private key to use for signing |

#### Defined in

packages/signer/dist/index.d.ts:20

## Properties

### address

• `Readonly` **address**: [`Address`](internal-Address.md)

#### Defined in

packages/signer/dist/index.d.ts:10

___

### compressedPublicKey

• `Readonly` **compressedPublicKey**: `string`

#### Defined in

packages/signer/dist/index.d.ts:12

___

### privateKey

• `Readonly` **privateKey**: `string`

#### Defined in

packages/signer/dist/index.d.ts:13

___

### publicKey

• `Readonly` **publicKey**: `string`

#### Defined in

packages/signer/dist/index.d.ts:11

## Methods

### addPoint

▸ **addPoint**(`point`): `string`

Add point on the current elliptic curve

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | `BytesLike` | Point to add on the curve |

#### Returns

`string`

compressed point on the curve

#### Defined in

packages/signer/dist/index.d.ts:36

___

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

packages/signer/dist/index.d.ts:29

___

### extendPublicKey

▸ `Static` **extendPublicKey**(`publicKey`): `string`

Extended publicKey from a compact publicKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `BytesLike` | Compact publicKey |

#### Returns

`string`

extended publicKey

#### Defined in

packages/signer/dist/index.d.ts:66

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

random 32-byte hashed

#### Defined in

packages/signer/dist/index.d.ts:59

___

### recoverAddress

▸ `Static` **recoverAddress**(`data`, `signature`): [`Address`](internal-Address.md)

Recover the address from a signature performed with [`sign`](#sign).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `BytesLike` | Data |
| `signature` | `BytesLike` | Signature |

#### Returns

[`Address`](internal-Address.md)

Address from signature

#### Defined in

packages/signer/dist/index.d.ts:52

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

packages/signer/dist/index.d.ts:44
