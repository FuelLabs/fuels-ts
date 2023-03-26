---
layout: default
title: Address
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: Address

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).Address

## Hierarchy

- [`AbstractAddress`](internal-AbstractAddress.md)

  ↳ **`Address`**

## Constructors

### constructor

• **new Address**(`address`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | \`fuel${string}\` |

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[constructor](internal-AbstractAddress.md#constructor)

#### Defined in

packages/address/dist/index.d.ts:46

## Properties

### bech32Address

• `Readonly` **bech32Address**: \`fuel${string}\`

#### Defined in

packages/address/dist/index.d.ts:45

## Methods

### equals

▸ **equals**(`other`): `boolean`

Compare this Address value to another for direct equality

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Address`](internal-Address.md) | the other address to compare against |

#### Returns

`boolean`

true if addresses are equal

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[equals](internal-AbstractAddress.md#equals)

#### Defined in

packages/address/dist/index.d.ts:83

___

### toAddress

▸ **toAddress**(): \`fuel${string}\`

#### Returns

\`fuel${string}\`

This address as a Bech32m string

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toAddress](internal-AbstractAddress.md#toaddress)

#### Defined in

packages/address/dist/index.d.ts:50

___

### toB256

▸ **toB256**(): `string`

#### Returns

`string`

This address as 256 bit hash string

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toB256](internal-AbstractAddress.md#tob256)

#### Defined in

packages/address/dist/index.d.ts:54

___

### toBytes

▸ **toBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

Returns this address as a byte array

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toBytes](internal-AbstractAddress.md#tobytes)

#### Defined in

packages/address/dist/index.d.ts:58

___

### toHexString

▸ **toHexString**(): `string`

#### Returns

`string`

This address as hexed 256 bit hash string

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toHexString](internal-AbstractAddress.md#tohexstring)

#### Defined in

packages/address/dist/index.d.ts:62

___

### toJSON

▸ **toJSON**(): `string`

Parses this Address value

#### Returns

`string`

a string address in Bech32m Format

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toJSON](internal-AbstractAddress.md#tojson)

#### Defined in

packages/address/dist/index.d.ts:72

___

### toString

▸ **toString**(): `string`

Prints this Address value

#### Returns

`string`

a string address in Bech32m Format

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toString](internal-AbstractAddress.md#tostring)

#### Defined in

packages/address/dist/index.d.ts:67

___

### valueOf

▸ **valueOf**(): `string`

Returns the value of this Address value

#### Returns

`string`

a string address in Bech32m Format

#### Defined in

packages/address/dist/index.d.ts:77

___

### fromAddressOrString

▸ `Static` **fromAddressOrString**(`address`): [`AbstractAddress`](internal-AbstractAddress.md)

Takes an ambiguous string or address and creates an address

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

[`AbstractAddress`](internal-AbstractAddress.md)

a new `Address` instance

#### Defined in

packages/address/dist/index.d.ts:110

___

### fromB256

▸ `Static` **fromB256**(`b256Address`): [`Address`](internal-Address.md)

Takes a B256Address and creates an Address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `b256Address` | `string` | the b256 hash |

#### Returns

[`Address`](internal-Address.md)

a new `Address` instance

#### Defined in

packages/address/dist/index.d.ts:95

___

### fromDynamicInput

▸ `Static` **fromDynamicInput**(`address`): [`Address`](internal-Address.md)

Takes an optional string and returns back an Address

**`Throws`**

Error
thrown if the input string is not nilsy and cannot be resolved to a valid address format

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

[`Address`](internal-Address.md)

a new `Address` instance

#### Defined in

packages/address/dist/index.d.ts:119

___

### fromPublicKey

▸ `Static` **fromPublicKey**(`publicKey`): [`Address`](internal-Address.md)

Takes a Public Key, hashes it, and creates an Address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `string` | the wallets public key |

#### Returns

[`Address`](internal-Address.md)

a new `Address` instance

#### Defined in

packages/address/dist/index.d.ts:89

___

### fromRandom

▸ `Static` **fromRandom**(): [`Address`](internal-Address.md)

Creates a random address within an Address

#### Returns

[`Address`](internal-Address.md)

a new `Address` instance

#### Defined in

packages/address/dist/index.d.ts:100

___

### fromString

▸ `Static` **fromString**(`address`): [`Address`](internal-Address.md)

Takes an ambiguous string and attempts to create an Address

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`Address`](internal-Address.md)

a new `Address` instance

#### Defined in

packages/address/dist/index.d.ts:105
