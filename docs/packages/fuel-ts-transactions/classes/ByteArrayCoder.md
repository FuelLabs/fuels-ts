---
layout: default
title: ByteArrayCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: ByteArrayCoder

[@fuel-ts/transactions](../index.md).ByteArrayCoder

## Hierarchy

- `default`<`BytesLike`, `string`\>

  ↳ **`ByteArrayCoder`**

## Constructors

### constructor

• **new ByteArrayCoder**(`length`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `length` | `number` |

#### Overrides

Coder&lt;BytesLike, string\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/byte-array.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/byte-array.ts#L9)

## Properties

### #paddingLength

• `Private` **#paddingLength**: `number`

#### Defined in

[packages/transactions/src/coders/byte-array.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/byte-array.ts#L7)

___

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

Coder.encodedLength

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L40)

___

### length

• **length**: `number`

#### Defined in

[packages/transactions/src/coders/byte-array.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/byte-array.ts#L6)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

Coder.name

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L38)

___

### offset

• `Optional` **offset**: `number`

#### Inherited from

Coder.offset

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L41)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

Coder.type

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L39)

## Methods

### decode

▸ **decode**(`data`, `offset`): [`string`, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[`string`, `number`]

#### Overrides

Coder.decode

#### Defined in

[packages/transactions/src/coders/byte-array.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/byte-array.ts#L38)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `BytesLike` |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[packages/transactions/src/coders/byte-array.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/byte-array.ts#L25)

___

### setOffset

▸ **setOffset**(`offset`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `number` |

#### Returns

`void`

#### Inherited from

Coder.setOffset

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:56](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L56)

___

### throwError

▸ **throwError**(`message`, `value`): `never`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `value` | `unknown` |

#### Returns

`never`

#### Inherited from

Coder.throwError

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:49](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L49)
