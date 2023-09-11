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

[address.ts:30](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L30)

## Properties

### bech32Address

• `Readonly` **bech32Address**: \`fuel${string}\`

#### Defined in

[address.ts:24](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L24)

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

[address.ts:124](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L124)

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

[address.ts:47](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L47)

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

[address.ts:56](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L56)

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

[address.ts:65](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L65)

___

### toEvmAddress

▸ **toEvmAddress**(): [`EvmAddress`](/api/Interfaces/index.md#evmaddress)

Clears the first 12 bytes of the `bech32Address` property and returns it as a `EvmAddress`

#### Returns

[`EvmAddress`](/api/Interfaces/index.md#evmaddress)

The `bech32Address` property as an [`EvmAddress`](/api/Interfaces/index.md#evmaddress)

#### Defined in

[address.ts:101](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L101)

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

[address.ts:74](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L74)

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

[address.ts:92](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L92)

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

[address.ts:83](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L83)

___

### valueOf

▸ **valueOf**(): `string`

Returns the value of the `bech32Address` property

#### Returns

`string`

The value of `bech32Address` property

#### Defined in

[address.ts:114](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L114)

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

[address.ts:173](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L173)

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

[address.ts:145](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L145)

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

[address.ts:184](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L184)

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

[address.ts:214](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L214)

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

[address.ts:134](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L134)

___

### fromRandom

▸ `Static` **fromRandom**(): [`Address`](/api/Address/Address.md)

Creates an `Address` with a randomized `bech32Address` property

#### Returns

[`Address`](/api/Address/Address.md)

A new `Address` instance

#### Defined in

[address.ts:154](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L154)

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

[address.ts:164](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/address/src/address.ts#L164)
