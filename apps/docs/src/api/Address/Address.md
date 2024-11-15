[**@fuel-ts/address v0.97.0**](../index.md) • **Docs**

***

# Class: Address

`Address` provides a type safe wrapper for converting between different address formats
ands comparing them for equality.

## Extends

- [`AbstractAddress`](../Interfaces/AbstractAddress.md)

## Constructors

### new Address()

> **new Address**(`address`): [`Address`](Address.md)

#### Parameters

• **address**: \`fuel$\{string\}\`

A Bech32 address

#### Returns

[`Address`](Address.md)

#### Overrides

[`AbstractAddress`](../Interfaces/AbstractAddress.md).[`constructor`](../Interfaces/AbstractAddress.md#constructors)

#### Defined in

[address.ts:39](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L39)

## Properties

### bech32Address

> `readonly` **bech32Address**: \`fuel$\{string\}\`

#### Defined in

[address.ts:33](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L33)

## Methods

### equals()

> **equals**(`other`): `boolean`

Compares this the `bech32Address` property to another for direct equality

#### Parameters

• **other**: [`Address`](Address.md)

Another address to compare against

#### Returns

`boolean`

The equality of the comparison

#### Overrides

[`AbstractAddress`](../Interfaces/AbstractAddress.md).[`equals`](../Interfaces/AbstractAddress.md#equals)

#### Defined in

[address.ts:154](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L154)

***

### toAddress()

> **toAddress**(): \`fuel$\{string\}\`

Returns the `bech32Address` property

#### Returns

\`fuel$\{string\}\`

The `bech32Address` property

#### Overrides

[`AbstractAddress`](../Interfaces/AbstractAddress.md).[`toAddress`](../Interfaces/AbstractAddress.md#toaddress)

#### Defined in

[address.ts:66](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L66)

***

### toAssetId()

> **toAssetId**(): [`AssetId`](../Interfaces/index.md#assetid)

Wraps the `bech32Address` property and returns as an `AssetId`.

#### Returns

[`AssetId`](../Interfaces/index.md#assetid)

The `bech32Address` property as an [`AssetId`](../Interfaces/index.md#assetid)

#### Defined in

[address.ts:133](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L133)

***

### toB256()

> **toB256**(): `string`

Converts and returns the `bech32Address` property to a 256 bit hash string

#### Returns

`string`

The `bech32Address` property as a 256 bit hash string

#### Overrides

[`AbstractAddress`](../Interfaces/AbstractAddress.md).[`toB256`](../Interfaces/AbstractAddress.md#tob256)

#### Defined in

[address.ts:75](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L75)

***

### toBytes()

> **toBytes**(): `Uint8Array`

Converts and returns the `bech32Address` property to a byte array

#### Returns

`Uint8Array`

The `bech32Address` property as a byte array

#### Overrides

[`AbstractAddress`](../Interfaces/AbstractAddress.md).[`toBytes`](../Interfaces/AbstractAddress.md#tobytes)

#### Defined in

[address.ts:84](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L84)

***

### toChecksum()

> **toChecksum**(): `string`

Takes an B256 Address and returns back an checksum address.
The implementation follows the ERC-55 https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md.

#### Returns

`string`

A new `ChecksumAddress` instance

#### Defined in

[address.ts:57](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L57)

***

### toEvmAddress()

> **toEvmAddress**(): [`EvmAddress`](../Interfaces/index.md#evmaddress)

Clears the first 12 bytes of the `bech32Address` property and returns it as a `EvmAddress`

#### Returns

[`EvmAddress`](../Interfaces/index.md#evmaddress)

The `bech32Address` property as an [`EvmAddress`](../Interfaces/index.md#evmaddress)

#### Defined in

[address.ts:120](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L120)

***

### toHexString()

> **toHexString**(): `string`

Converts

#### Returns

`string`

The `bech32Address` property as a 256 bit hash string

#### Overrides

[`AbstractAddress`](../Interfaces/AbstractAddress.md).[`toHexString`](../Interfaces/AbstractAddress.md#tohexstring)

#### Defined in

[address.ts:93](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L93)

***

### toJSON()

> **toJSON**(): `string`

Converts and returns the `bech32Address` property as a string

#### Returns

`string`

The `bech32Address` property as a string

#### Overrides

[`AbstractAddress`](../Interfaces/AbstractAddress.md).[`toJSON`](../Interfaces/AbstractAddress.md#tojson)

#### Defined in

[address.ts:111](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L111)

***

### toString()

> **toString**(): `string`

returns the address `checksum` as a string

#### Returns

`string`

The `bech32Address` property as a string

#### Overrides

[`AbstractAddress`](../Interfaces/AbstractAddress.md).[`toString`](../Interfaces/AbstractAddress.md#tostring)

#### Defined in

[address.ts:102](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L102)

***

### valueOf()

> **valueOf**(): `string`

returns the address `checksum` as a string

#### Returns

`string`

The value of `bech32Address` property

#### Defined in

[address.ts:144](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L144)

***

### fromAddressOrString()

> `static` **fromAddressOrString**(`address`): [`AbstractAddress`](../Interfaces/AbstractAddress.md)

Takes an ambiguous string or address and creates an `Address`

#### Parameters

• **address**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Returns

[`AbstractAddress`](../Interfaces/AbstractAddress.md)

a new `Address` instance

#### Defined in

[address.ts:214](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L214)

***

### fromB256()

> `static` **fromB256**(`b256Address`): [`Address`](Address.md)

Takes a B256 Address and creates an `Address`

#### Parameters

• **b256Address**: `string`

A b256 hash

#### Returns

[`Address`](Address.md)

A new `Address` instance

#### Defined in

[address.ts:179](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L179)

***

### fromDynamicInput()

> `static` **fromDynamicInput**(`address`): [`Address`](Address.md)

Takes a dynamic string or `AbstractAddress` and creates an `Address`

#### Parameters

• **address**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Returns

[`Address`](Address.md)

A new `Address` instance

#### Throws

Error - Unknown address if the format is not recognised

#### Defined in

[address.ts:225](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L225)

***

### fromEvmAddress()

> `static` **fromEvmAddress**(`evmAddress`): [`Address`](Address.md)

Takes an Evm Address and returns back an `Address`

#### Parameters

• **evmAddress**: `string`

#### Returns

[`Address`](Address.md)

A new `Address` instance

#### Defined in

[address.ts:259](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L259)

***

### fromPublicKey()

> `static` **fromPublicKey**(`publicKey`): [`Address`](Address.md)

Takes a Public Key, hashes it, and creates an `Address`

#### Parameters

• **publicKey**: `string`

A wallets public key

#### Returns

[`Address`](Address.md)

A new `Address` instance

#### Defined in

[address.ts:164](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L164)

***

### fromRandom()

> `static` **fromRandom**(): [`Address`](Address.md)

Creates an `Address` with a randomized `bech32Address` property

#### Returns

[`Address`](Address.md)

A new `Address` instance

#### Defined in

[address.ts:195](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L195)

***

### fromString()

> `static` **fromString**(`address`): [`Address`](Address.md)

Takes an ambiguous string and attempts to create an `Address`

#### Parameters

• **address**: `string`

An ambiguous string

#### Returns

[`Address`](Address.md)

A new `Address` instance

#### Defined in

[address.ts:205](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L205)

***

### isChecksumValid()

> `static` **isChecksumValid**(`address`): `boolean`

Takes an ChecksumAddress and validates if it is a valid checksum address.

#### Parameters

• **address**: `string`

#### Returns

`boolean`

A `boolean` instance indicating if the address is valid.

#### Defined in

[address.ts:277](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/address/src/address.ts#L277)
