[**@fuel-ts/account v0.94.7**](../index.md) • **Docs**

***

# Class: Signer

## Constructors

### new Signer()

> **new Signer**(`privateKey`): [`Signer`](Signer.md)

Create a Signer instance from a given private key

#### Parameters

• **privateKey**: [`BytesLike`](../Interfaces/index.md#byteslike)

The private key to use for signing

#### Returns

[`Signer`](Signer.md)

A new Signer instance

#### Defined in

[packages/account/src/signer/signer.ts:24](https://github.com/FuelLabs/fuels-ts/blob/8420c2fcbdf57cb5242e933369ca6c4c5f9d66c9/packages/account/src/signer/signer.ts#L24)

## Properties

### address

> `readonly` **address**: [`Address`](../Address/Address.md)

#### Defined in

[packages/account/src/signer/signer.ts:10](https://github.com/FuelLabs/fuels-ts/blob/8420c2fcbdf57cb5242e933369ca6c4c5f9d66c9/packages/account/src/signer/signer.ts#L10)

***

### compressedPublicKey

> `readonly` **compressedPublicKey**: `string`

#### Defined in

[packages/account/src/signer/signer.ts:14](https://github.com/FuelLabs/fuels-ts/blob/8420c2fcbdf57cb5242e933369ca6c4c5f9d66c9/packages/account/src/signer/signer.ts#L14)

***

### privateKey

> `readonly` **privateKey**: `string`

#### Defined in

[packages/account/src/signer/signer.ts:16](https://github.com/FuelLabs/fuels-ts/blob/8420c2fcbdf57cb5242e933369ca6c4c5f9d66c9/packages/account/src/signer/signer.ts#L16)

***

### publicKey

> `readonly` **publicKey**: `string`

#### Defined in

[packages/account/src/signer/signer.ts:12](https://github.com/FuelLabs/fuels-ts/blob/8420c2fcbdf57cb5242e933369ca6c4c5f9d66c9/packages/account/src/signer/signer.ts#L12)

## Methods

### addPoint()

> **addPoint**(`point`): `string`

Add point on the current elliptic curve

#### Parameters

• **point**: [`BytesLike`](../Interfaces/index.md#byteslike)

Point to add on the curve

#### Returns

`string`

compressed point on the curve

#### Defined in

[packages/account/src/signer/signer.ts:72](https://github.com/FuelLabs/fuels-ts/blob/8420c2fcbdf57cb5242e933369ca6c4c5f9d66c9/packages/account/src/signer/signer.ts#L72)

***

### extendPublicKey()

> `static` **extendPublicKey**(`publicKey`): `string`

Extended publicKey from a compact publicKey

#### Parameters

• **publicKey**: [`BytesLike`](../Interfaces/index.md#byteslike)

Compact publicKey

#### Returns

`string`

extended publicKey

#### Defined in

[packages/account/src/signer/signer.ts:130](https://github.com/FuelLabs/fuels-ts/blob/8420c2fcbdf57cb5242e933369ca6c4c5f9d66c9/packages/account/src/signer/signer.ts#L130)

***

### generatePrivateKey()

> `static` **generatePrivateKey**(`entropy`?): `string` \| `Uint8Array`

Generate a random privateKey

#### Parameters

• **entropy?**: [`BytesLike`](../Interfaces/index.md#byteslike)

Adds extra entropy to generate the privateKey

#### Returns

`string` \| `Uint8Array`

random 32-byte hashed

#### Defined in

[packages/account/src/signer/signer.ts:120](https://github.com/FuelLabs/fuels-ts/blob/8420c2fcbdf57cb5242e933369ca6c4c5f9d66c9/packages/account/src/signer/signer.ts#L120)

***

### recoverAddress()

> `static` **recoverAddress**(`data`, `signature`): [`Address`](../Address/Address.md)

Recover the address from a signature performed with [`sign`](#sign).

#### Parameters

• **data**: [`BytesLike`](../Interfaces/index.md#byteslike)

Data

• **signature**: [`BytesLike`](../Interfaces/index.md#byteslike)

Signature

#### Returns

[`Address`](../Address/Address.md)

Address from signature

#### Defined in

[packages/account/src/signer/signer.ts:110](https://github.com/FuelLabs/fuels-ts/blob/8420c2fcbdf57cb5242e933369ca6c4c5f9d66c9/packages/account/src/signer/signer.ts#L110)

***

### recoverPublicKey()

> `static` **recoverPublicKey**(`data`, `signature`): `string`

Recover the public key from a signature performed with [`sign`](#sign).

#### Parameters

• **data**: [`BytesLike`](../Interfaces/index.md#byteslike)

Data

• **signature**: [`BytesLike`](../Interfaces/index.md#byteslike)

hashed signature

#### Returns

`string`

public key from signature from the

#### Defined in

[packages/account/src/signer/signer.ts:86](https://github.com/FuelLabs/fuels-ts/blob/8420c2fcbdf57cb5242e933369ca6c4c5f9d66c9/packages/account/src/signer/signer.ts#L86)
