# Class: Signer

[@fuel-ts/account](/api/Account/index.md).Signer

## Constructors

### constructor

• **new Signer**(`privateKey`): [`Signer`](/api/Account/Signer.md)

Create a Signer instance from a given private key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The private key to use for signing |

#### Returns

[`Signer`](/api/Account/Signer.md)

A new Signer instance

#### Defined in

[packages/account/src/signer/signer.ts:24](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/signer/signer.ts#L24)

## Properties

### address

• `Readonly` **address**: [`Address`](/api/Address/Address.md)

#### Defined in

[packages/account/src/signer/signer.ts:10](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/signer/signer.ts#L10)

___

### compressedPublicKey

• `Readonly` **compressedPublicKey**: `string`

#### Defined in

[packages/account/src/signer/signer.ts:14](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/signer/signer.ts#L14)

___

### privateKey

• `Readonly` **privateKey**: `string`

#### Defined in

[packages/account/src/signer/signer.ts:16](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/signer/signer.ts#L16)

___

### publicKey

• `Readonly` **publicKey**: `string`

#### Defined in

[packages/account/src/signer/signer.ts:12](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/signer/signer.ts#L12)

## Methods

### addPoint

▸ **addPoint**(`point`): `string`

Add point on the current elliptic curve

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Point to add on the curve |

#### Returns

`string`

compressed point on the curve

#### Defined in

[packages/account/src/signer/signer.ts:72](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/signer/signer.ts#L72)

___

### extendPublicKey

▸ **extendPublicKey**(`publicKey`): `string`

Extended publicKey from a compact publicKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Compact publicKey |

#### Returns

`string`

extended publicKey

#### Defined in

[packages/account/src/signer/signer.ts:130](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/signer/signer.ts#L130)

___

### generatePrivateKey

▸ **generatePrivateKey**(`entropy?`): `string` \| `Uint8Array`

Generate a random privateKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entropy?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Adds extra entropy to generate the privateKey |

#### Returns

`string` \| `Uint8Array`

random 32-byte hashed

#### Defined in

[packages/account/src/signer/signer.ts:120](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/signer/signer.ts#L120)

___

### recoverAddress

▸ **recoverAddress**(`data`, `signature`): [`Address`](/api/Address/Address.md)

Recover the address from a signature performed with [`sign`](#sign).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Data |
| `signature` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Signature |

#### Returns

[`Address`](/api/Address/Address.md)

Address from signature

#### Defined in

[packages/account/src/signer/signer.ts:110](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/signer/signer.ts#L110)

___

### recoverPublicKey

▸ **recoverPublicKey**(`data`, `signature`): `string`

Recover the public key from a signature performed with [`sign`](#sign).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Data |
| `signature` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | hashed signature |

#### Returns

`string`

public key from signature from the

#### Defined in

[packages/account/src/signer/signer.ts:86](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/signer/signer.ts#L86)
