---
layout: default
title: Signer
parent: "@fuel-ts/signer"
nav_order: 1

---

# Class: Signer

[@fuel-ts/signer](../index.md).Signer

## Constructors

### constructor

• **new Signer**(`privateKey`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `BytesLike` |

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `point` | `BytesLike` |

#### Returns

`string`

___

### sign

▸ **sign**(`data`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BytesLike` |

#### Returns

`string`

___

### extendPublicKey

▸ `Static` **extendPublicKey**(`publicKey`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `BytesLike` |

#### Returns

`string`

___

### generatePrivateKey

▸ `Static` **generatePrivateKey**(`entropy?`): `string` \| `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entropy?` | `BytesLike` |

#### Returns

`string` \| `Uint8Array`

___

### recoverAddress

▸ `Static` **recoverAddress**(`data`, `signature`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BytesLike` |
| `signature` | `BytesLike` |

#### Returns

`default`

___

### recoverPublicKey

▸ `Static` **recoverPublicKey**(`data`, `signature`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BytesLike` |
| `signature` | `BytesLike` |

#### Returns

`any`
