# Class: Address

[@fuel-ts/address](/api/Address/index.md).Address

`Address` provides a type safe wrapper for converting between different address formats
ands comparing them for equality.

## Hierarchy

- [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

  ↳ **`Address`**

## Constructors

### constructor

• **new Address**(`address`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | \`fuel${string}\` | A Bech32 address |

#### Overrides

[AbstractAddress](/api/Interfaces/AbstractAddress.md).[constructor](/api/Interfaces/AbstractAddress.md#constructor)

#### Defined in

[address.ts:33](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L33)

## Properties

### bech32Address

• `Readonly` **bech32Address**: \`fuel${string}\`

#### Defined in

[address.ts:27](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L27)

## Methods

### equals

▸ **equals**(`other`): `boolean`

Compares this the `bech32Address` property to another for direct equality

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`Address`](/api/Address/Address.md) | Another address to compare against |

#### Returns

`boolean`

The equality of the comparison

#### Overrides

[AbstractAddress](/api/Interfaces/AbstractAddress.md).[equals](/api/Interfaces/AbstractAddress.md#equals)

#### Defined in

[address.ts:125](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L125)

___

### toAddress

▸ **toAddress**(): \`fuel${string}\`

Returns the `bech32Address` property

#### Returns

\`fuel${string}\`

The `bech32Address` property

#### Overrides

[AbstractAddress](/api/Interfaces/AbstractAddress.md).[toAddress](/api/Interfaces/AbstractAddress.md#toaddress)

#### Defined in

[address.ts:48](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L48)

___

### toB256

▸ **toB256**(): `string`

Converts and returns the `bech32Address` property to a 256 bit hash string

#### Returns

`string`

The `bech32Address` property as a 256 bit hash string

#### Overrides

[AbstractAddress](/api/Interfaces/AbstractAddress.md).[toB256](/api/Interfaces/AbstractAddress.md#tob256)

#### Defined in

[address.ts:57](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L57)

___

### toBytes

▸ **toBytes**(): `Uint8Array`

Converts and returns the `bech32Address` property to a byte array

#### Returns

`Uint8Array`

The `bech32Address` property as a byte array

#### Overrides

[AbstractAddress](/api/Interfaces/AbstractAddress.md).[toBytes](/api/Interfaces/AbstractAddress.md#tobytes)

#### Defined in

[address.ts:66](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L66)

___

### toEvmAddress

▸ **toEvmAddress**(): [`EvmAddress`](/api/Interfaces/index.md#evmaddress)

Clears the first 12 bytes of the `bech32Address` property and returns it as a `EvmAddress`

#### Returns

[`EvmAddress`](/api/Interfaces/index.md#evmaddress)

The `bech32Address` property as an [`EvmAddress`](/api/Interfaces/index.md#evmaddress)

#### Defined in

[address.ts:102](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L102)

___

### toHexString

▸ **toHexString**(): `string`

Converts

#### Returns

`string`

The `bech32Address` property as a 256 bit hash string

#### Overrides

[AbstractAddress](/api/Interfaces/AbstractAddress.md).[toHexString](/api/Interfaces/AbstractAddress.md#tohexstring)

#### Defined in

[address.ts:75](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L75)

___

### toJSON

▸ **toJSON**(): `string`

Converts and returns the `bech32Address` property as a string

#### Returns

`string`

The `bech32Address` property as a string

#### Overrides

[AbstractAddress](/api/Interfaces/AbstractAddress.md).[toJSON](/api/Interfaces/AbstractAddress.md#tojson)

#### Defined in

[address.ts:93](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L93)

___

### toString

▸ **toString**(): `string`

Converts and returns the `bech32Address` property as a string

#### Returns

`string`

The `bech32Address` property as a string

#### Overrides

[AbstractAddress](/api/Interfaces/AbstractAddress.md).[toString](/api/Interfaces/AbstractAddress.md#tostring)

#### Defined in

[address.ts:84](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L84)

___

### valueOf

▸ **valueOf**(): `string`

Returns the value of the `bech32Address` property

#### Returns

`string`

The value of `bech32Address` property

#### Defined in

[address.ts:115](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L115)

___

### fromAddressOrString

▸ `Static` **fromAddressOrString**(`address`): [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

Takes an ambiguous string or address and creates an `Address`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Returns

[`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

a new `Address` instance

#### Defined in

[address.ts:174](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L174)

___

### fromB256

▸ `Static` **fromB256**(`b256Address`): [`Address`](/api/Address/Address.md)

Takes a B256 Address and creates an `Address`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `b256Address` | `string` | A b256 hash |

#### Returns

[`Address`](/api/Address/Address.md)

A new `Address` instance

#### Defined in

[address.ts:146](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L146)

___

### fromDynamicInput

▸ `Static` **fromDynamicInput**(`address`): [`Address`](/api/Address/Address.md)

Takes a dynamic string or `AbstractAddress` and creates an `Address`

**`Throws`**

Error - Unknown address if the format is not recognised

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Returns

[`Address`](/api/Address/Address.md)

A new `Address` instance

#### Defined in

[address.ts:185](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L185)

___

### fromEvmAddress

▸ `Static` **fromEvmAddress**(`evmAddress`): [`Address`](/api/Address/Address.md)

Takes an `EvmAddress` and returns back an `Address`

#### Parameters

| Name | Type |
| :------ | :------ |
| `evmAddress` | [`EvmAddress`](/api/Interfaces/index.md#evmaddress) |

#### Returns

[`Address`](/api/Address/Address.md)

A new `Address` instance

#### Defined in

[address.ts:212](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L212)

___

### fromPublicKey

▸ `Static` **fromPublicKey**(`publicKey`): [`Address`](/api/Address/Address.md)

Takes a Public Key, hashes it, and creates an `Address`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `string` | A wallets public key |

#### Returns

[`Address`](/api/Address/Address.md)

A new `Address` instance

#### Defined in

[address.ts:135](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L135)

___

### fromRandom

▸ `Static` **fromRandom**(): [`Address`](/api/Address/Address.md)

Creates an `Address` with a randomized `bech32Address` property

#### Returns

[`Address`](/api/Address/Address.md)

A new `Address` instance

#### Defined in

[address.ts:155](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L155)

___

### fromString

▸ `Static` **fromString**(`address`): [`Address`](/api/Address/Address.md)

Takes an ambiguous string and attempts to create an `Address`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | An ambiguous string |

#### Returns

[`Address`](/api/Address/Address.md)

A new `Address` instance

#### Defined in

[address.ts:165](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/address/src/address.ts#L165)
