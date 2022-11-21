---
layout: default
title: TxPointerCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: TxPointerCoder

[@fuel-ts/transactions](../index.md).TxPointerCoder

## Hierarchy

- `default`<{ `blockHeight`: `NumberCoder` ; `txIndex`: `NumberCoder`  }\>

  ↳ **`TxPointerCoder`**

## Constructors

### constructor

• **new TxPointerCoder**()

#### Overrides

StructCoder&lt;{
  blockHeight: NumberCoder;
  txIndex: NumberCoder;
}\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/tx-pointer.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/tx-pointer.ts#L15)

## Properties

### coders

• **coders**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blockHeight` | `default` |
| `txIndex` | `default` |

#### Inherited from

StructCoder.coders

#### Defined in

[packages/abi-coder/src/coders/struct.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L19)

___

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

StructCoder.encodedLength

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L36)

___

### name

• **name**: `string`

#### Inherited from

StructCoder.name

#### Defined in

[packages/abi-coder/src/coders/struct.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L18)

___

### offset

• `Optional` **offset**: `number`

#### Inherited from

StructCoder.offset

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L37)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

StructCoder.type

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L35)

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof)<{ `blockHeight`: `default` ; `txIndex`: `default`  }\>, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof)<{ `blockHeight`: `default` ; `txIndex`: `default`  }\>, `number`]

#### Inherited from

StructCoder.decode

#### Defined in

[packages/abi-coder/src/coders/struct.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L45)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputValueOf`](../namespaces/internal.md#inputvalueof)<{ `blockHeight`: `default` ; `txIndex`: `default`  }\> |

#### Returns

`Uint8Array`

#### Inherited from

StructCoder.encode

#### Defined in

[packages/abi-coder/src/coders/struct.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L31)

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

StructCoder.setOffset

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:52](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L52)

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

StructCoder.throwError

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L45)
