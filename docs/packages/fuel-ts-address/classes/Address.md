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

## Properties

### bech32Address

• `Readonly` **bech32Address**: \`fuel${string}\`

#### Defined in

[packages/address/src/address.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/address/src/address.ts#L18)

## Methods

### equals

▸ **equals**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`Address`](Address.md) |

#### Returns

`boolean`

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[equals](internal-AbstractAddress.md#equals)

___

### toAddress

▸ **toAddress**(): \`fuel${string}\`

#### Returns

\`fuel${string}\`

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toAddress](internal-AbstractAddress.md#toaddress)

___

### toB256

▸ **toB256**(): `string`

#### Returns

`string`

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toB256](internal-AbstractAddress.md#tob256)

___

### toBytes

▸ **toBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toBytes](internal-AbstractAddress.md#tobytes)

___

### toHexString

▸ **toHexString**(): `string`

#### Returns

`string`

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toHexString](internal-AbstractAddress.md#tohexstring)

___

### toJSON

▸ **toJSON**(): `string`

#### Returns

`string`

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toJSON](internal-AbstractAddress.md#tojson)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

[AbstractAddress](internal-AbstractAddress.md).[toString](internal-AbstractAddress.md#tostring)

___

### valueOf

▸ **valueOf**(): `string`

#### Returns

`string`

___

### fromAddressOrString

▸ `Static` **fromAddressOrString**(`address`): [`AbstractAddress`](internal-AbstractAddress.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

[`AbstractAddress`](internal-AbstractAddress.md)

___

### fromB256

▸ `Static` **fromB256**(`b256Address`): [`Address`](Address.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `b256Address` | `string` |

#### Returns

[`Address`](Address.md)

___

### fromPublicKey

▸ `Static` **fromPublicKey**(`publicKey`): [`Address`](Address.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` |

#### Returns

[`Address`](Address.md)

___

### fromRandom

▸ `Static` **fromRandom**(): [`Address`](Address.md)

#### Returns

[`Address`](Address.md)

___

### fromString

▸ `Static` **fromString**(`address`): [`Address`](Address.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`Address`](Address.md)
