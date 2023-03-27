---
layout: default
title: UtxoIdCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: UtxoIdCoder

[@fuel-ts/transactions](../index.md).UtxoIdCoder

## Hierarchy

- [`StructCoder`](internal-StructCoder.md)<{ `outputIndex`: [`NumberCoder`](internal-NumberCoder.md) ; `transactionId`: [`B256Coder`](internal-B256Coder.md)  }\>

  ↳ **`UtxoIdCoder`**

## Constructors

### constructor

• **new UtxoIdCoder**()

#### Overrides

[StructCoder](internal-StructCoder.md).[constructor](internal-StructCoder.md#constructor)

#### Defined in

[packages/transactions/src/coders/utxo-id.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/utxo-id.ts#L14)

## Properties

### coders

• **coders**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `outputIndex` | [`NumberCoder`](internal-NumberCoder.md) |
| `transactionId` | [`B256Coder`](internal-B256Coder.md) |

#### Inherited from

[StructCoder](internal-StructCoder.md).[coders](internal-StructCoder.md#coders)

#### Defined in

packages/abi-coder/dist/index.d.ts:110

___

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

[StructCoder](internal-StructCoder.md).[encodedLength](internal-StructCoder.md#encodedlength)

#### Defined in

packages/abi-coder/dist/index.d.ts:42

___

### name

• **name**: `string`

#### Inherited from

[StructCoder](internal-StructCoder.md).[name](internal-StructCoder.md#name)

#### Defined in

packages/abi-coder/dist/index.d.ts:109

___

### offset

• `Optional` **offset**: `number`

#### Inherited from

[StructCoder](internal-StructCoder.md).[offset](internal-StructCoder.md#offset)

#### Defined in

packages/abi-coder/dist/index.d.ts:43

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[StructCoder](internal-StructCoder.md).[type](internal-StructCoder.md#type)

#### Defined in

packages/abi-coder/dist/index.d.ts:41

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`DecodedValueOf$2`](../namespaces/internal.md#decodedvalueof$2)<{ `outputIndex`: [`NumberCoder`](internal-NumberCoder.md) ; `transactionId`: [`B256Coder`](internal-B256Coder.md)  }\>, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`DecodedValueOf$2`](../namespaces/internal.md#decodedvalueof$2)<{ `outputIndex`: [`NumberCoder`](internal-NumberCoder.md) ; `transactionId`: [`B256Coder`](internal-B256Coder.md)  }\>, `number`]

#### Inherited from

[StructCoder](internal-StructCoder.md).[decode](internal-StructCoder.md#decode)

#### Defined in

packages/abi-coder/dist/index.d.ts:113

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputValueOf$2`](../namespaces/internal.md#inputvalueof$2)<{ `outputIndex`: [`NumberCoder`](internal-NumberCoder.md) ; `transactionId`: [`B256Coder`](internal-B256Coder.md)  }\> |

#### Returns

`Uint8Array`

#### Inherited from

[StructCoder](internal-StructCoder.md).[encode](internal-StructCoder.md#encode)

#### Defined in

packages/abi-coder/dist/index.d.ts:112

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

[StructCoder](internal-StructCoder.md).[setOffset](internal-StructCoder.md#setoffset)

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

[StructCoder](internal-StructCoder.md).[throwError](internal-StructCoder.md#throwerror)

#### Defined in

packages/abi-coder/dist/index.d.ts:45
