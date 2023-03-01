---
layout: default
title: Address
parent: "@fuel-ts/address"
nav_order: 1

---

# Class: Address

[@fuel-ts/address](../index.md).Address

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

[packages/address/src/address.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L23)

## Properties

### bech32Address

• `Readonly` **bech32Address**: \`fuel${string}\`

#### Defined in

[packages/address/src/address.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L21)

## Methods

### equals

▸ **equals**(`other`): `boolean`

Compare this Address value to another for direct equality

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Address`](Address.md) | the other address to compare against |

#### Returns

`boolean`

true if addresses are equal

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[equals](internal-AbstractAddress.md#equals)

#### Defined in

[packages/address/src/address.ts:90](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L90)

___

### toAddress

▸ **toAddress**(): \`fuel${string}\`

#### Returns

\`fuel${string}\`

This address as a Bech32m string

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toAddress](internal-AbstractAddress.md#toaddress)

#### Defined in

[packages/address/src/address.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L36)

___

### toB256

▸ **toB256**(): `string`

#### Returns

`string`

This address as 256 bit hash string

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toB256](internal-AbstractAddress.md#tob256)

#### Defined in

[packages/address/src/address.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L43)

___

### toBytes

▸ **toBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

Returns this address as a byte array

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toBytes](internal-AbstractAddress.md#tobytes)

#### Defined in

[packages/address/src/address.ts:50](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L50)

___

### toHexString

▸ **toHexString**(): `string`

#### Returns

`string`

This address as hexed 256 bit hash string

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toHexString](internal-AbstractAddress.md#tohexstring)

#### Defined in

[packages/address/src/address.ts:57](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L57)

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

[packages/address/src/address.ts:73](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L73)

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

[packages/address/src/address.ts:65](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L65)

___

### valueOf

▸ **valueOf**(): `string`

Returns the value of this Address value

#### Returns

`string`

a string address in Bech32m Format

#### Defined in

[packages/address/src/address.ts:81](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L81)

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

[packages/address/src/address.ts:133](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L133)

___

### fromB256

▸ `Static` **fromB256**(`b256Address`): [`Address`](Address.md)

Takes a B256Address and creates an Address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `b256Address` | `string` | the b256 hash |

#### Returns

[`Address`](Address.md)

a new `Address` instance

#### Defined in

[packages/address/src/address.ts:109](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L109)

___

### fromDynamicInput

▸ `Static` **fromDynamicInput**(`address`): [`Address`](Address.md)

Takes an optional string and returns back an Address

**`Throws`**

Error
thrown if the input string is not nilsy and cannot be resolved to a valid address format

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

[`Address`](Address.md)

a new `Address` instance

#### Defined in

[packages/address/src/address.ts:145](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L145)

___

### fromPublicKey

▸ `Static` **fromPublicKey**(`publicKey`): [`Address`](Address.md)

Takes a Public Key, hashes it, and creates an Address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `string` | the wallets public key |

#### Returns

[`Address`](Address.md)

a new `Address` instance

#### Defined in

[packages/address/src/address.ts:99](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L99)

___

### fromRandom

▸ `Static` **fromRandom**(): [`Address`](Address.md)

Creates a random address within an Address

#### Returns

[`Address`](Address.md)

a new `Address` instance

#### Defined in

[packages/address/src/address.ts:117](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L117)

___

### fromString

▸ `Static` **fromString**(`address`): [`Address`](Address.md)

Takes an ambiguous string and attempts to create an Address

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`Address`](Address.md)

a new `Address` instance

#### Defined in

[packages/address/src/address.ts:125](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L125)
