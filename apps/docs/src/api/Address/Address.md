[**@fuel-ts/address v0.94.2**](../index.md) • **Docs**

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

[address.ts:33](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L33)

## Properties

### bech32Address

> `readonly` **bech32Address**: \`fuel$\{string\}\`

#### Defined in

[address.ts:27](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L27)

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

[address.ts:138](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L138)

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

[address.ts:50](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L50)

***

### toAssetId()

> **toAssetId**(): [`AssetId`](../Interfaces/index.md#assetid)

Wraps the `bech32Address` property and returns as an `AssetId`.

#### Returns

[`AssetId`](../Interfaces/index.md#assetid)

The `bech32Address` property as an [`AssetId`](../Interfaces/index.md#assetid)

#### Defined in

[address.ts:117](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L117)

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

[address.ts:59](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L59)

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

[address.ts:68](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L68)

***

### toEvmAddress()

> **toEvmAddress**(): [`EvmAddress`](../Interfaces/index.md#evmaddress)

Clears the first 12 bytes of the `bech32Address` property and returns it as a `EvmAddress`

#### Returns

[`EvmAddress`](../Interfaces/index.md#evmaddress)

The `bech32Address` property as an [`EvmAddress`](../Interfaces/index.md#evmaddress)

#### Defined in

[address.ts:104](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L104)

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

[address.ts:77](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L77)

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

[address.ts:95](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L95)

***

### toString()

> **toString**(): `string`

Converts and returns the `bech32Address` property as a string

#### Returns

`string`

The `bech32Address` property as a string

#### Overrides

[`AbstractAddress`](../Interfaces/AbstractAddress.md).[`toString`](../Interfaces/AbstractAddress.md#tostring)

#### Defined in

[address.ts:86](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L86)

***

### valueOf()

> **valueOf**(): `string`

Returns the value of the `bech32Address` property

#### Returns

`string`

The value of `bech32Address` property

#### Defined in

[address.ts:128](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L128)

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

[address.ts:198](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L198)

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

[address.ts:163](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L163)

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

[address.ts:209](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L209)

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

[address.ts:243](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L243)

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

[address.ts:148](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L148)

***

### fromRandom()

> `static` **fromRandom**(): [`Address`](Address.md)

Creates an `Address` with a randomized `bech32Address` property

#### Returns

[`Address`](Address.md)

A new `Address` instance

#### Defined in

[address.ts:179](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L179)

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

[address.ts:189](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/address/src/address.ts#L189)
