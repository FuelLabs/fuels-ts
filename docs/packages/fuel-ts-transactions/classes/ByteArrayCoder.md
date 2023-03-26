---
layout: default
title: ByteArrayCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: ByteArrayCoder

[@fuel-ts/transactions](../index.md).ByteArrayCoder

## Hierarchy

- [`Coder`](internal-Coder.md)<`BytesLike`, `string`\>

  ↳ **`ByteArrayCoder`**

## Constructors

### constructor

• **new ByteArrayCoder**(`length`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `length` | `number` |

#### Overrides

[Coder](internal-Coder.md).[constructor](internal-Coder.md#constructor)

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

[Coder](internal-Coder.md).[encodedLength](internal-Coder.md#encodedlength)

#### Defined in

packages/abi-coder/dist/index.d.ts:42

___

### length

• **length**: `number`

#### Defined in

[packages/transactions/src/coders/byte-array.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/byte-array.ts#L6)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Coder](internal-Coder.md).[name](internal-Coder.md#name)

#### Defined in

packages/abi-coder/dist/index.d.ts:40

___

### offset

• `Optional` **offset**: `number`

#### Inherited from

[Coder](internal-Coder.md).[offset](internal-Coder.md#offset)

#### Defined in

packages/abi-coder/dist/index.d.ts:43

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](internal-Coder.md).[type](internal-Coder.md#type)

#### Defined in

packages/abi-coder/dist/index.d.ts:41

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

[Coder](internal-Coder.md).[decode](internal-Coder.md#decode)

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

[Coder](internal-Coder.md).[encode](internal-Coder.md#encode)

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

[Coder](internal-Coder.md).[setOffset](internal-Coder.md#setoffset)

#### Defined in

packages/abi-coder/dist/index.d.ts:46

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

[Coder](internal-Coder.md).[throwError](internal-Coder.md#throwerror)

#### Defined in

packages/abi-coder/dist/index.d.ts:45
