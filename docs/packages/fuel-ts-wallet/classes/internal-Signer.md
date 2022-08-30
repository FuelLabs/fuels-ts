---
layout: default
title: Signer
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: Signer

[@fuel-ts/wallet](../index.md).[internal](../namespaces/internal.md).Signer

## Constructors

### constructor

• **new Signer**(`privateKey`)

Create a Signer instance from a given private key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `BytesLike` | The private key to use for signing |

#### Defined in

[packages/signer/src/signer.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/signer/src/signer.ts#L31)

## Properties

### address

• `Readonly` **address**: `default`

#### Defined in

[packages/signer/src/signer.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/signer/src/signer.ts#L17)

___

### compressedPublicKey

• `Readonly` **compressedPublicKey**: `string`

#### Defined in

[packages/signer/src/signer.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/signer/src/signer.ts#L21)

___

### privateKey

• `Readonly` **privateKey**: `string`

#### Defined in

[packages/signer/src/signer.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/signer/src/signer.ts#L23)

___

### publicKey

• `Readonly` **publicKey**: `string`

#### Defined in

[packages/signer/src/signer.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/signer/src/signer.ts#L19)

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

[packages/signer/src/signer.ts:80](https://github.com/FuelLabs/fuels-ts/blob/master/packages/signer/src/signer.ts#L80)

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

[packages/signer/src/signer.ts:60](https://github.com/FuelLabs/fuels-ts/blob/master/packages/signer/src/signer.ts#L60)

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

[packages/signer/src/signer.ts:139](https://github.com/FuelLabs/fuels-ts/blob/master/packages/signer/src/signer.ts#L139)

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

[packages/signer/src/signer.ts:129](https://github.com/FuelLabs/fuels-ts/blob/master/packages/signer/src/signer.ts#L129)

___

### recoverAddress

▸ `Static` **recoverAddress**(`data`, `signature`): `default`

Recover the address from a signature performed with [`sign`](#sign).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `BytesLike` | Data |
| `signature` | `BytesLike` | Signature |

#### Returns

`default`

Address from signature

#### Defined in

[packages/signer/src/signer.ts:119](https://github.com/FuelLabs/fuels-ts/blob/master/packages/signer/src/signer.ts#L119)

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

[packages/signer/src/signer.ts:95](https://github.com/FuelLabs/fuels-ts/blob/master/packages/signer/src/signer.ts#L95)
