---
layout: default
title: UtxoIdCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: UtxoIdCoder

[@fuel-ts/transactions](../index.md).UtxoIdCoder

## Hierarchy

- `default`<{ `outputIndex`: `NumberCoder`<``"u8"``\> ; `transactionId`: `B256Coder`  }\>

  ↳ **`UtxoIdCoder`**

## Constructors

### constructor

• **new UtxoIdCoder**()

#### Overrides

StructCoder&lt;{
  transactionId: B256Coder;
  outputIndex: NumberCoder&lt;&#x27;u8&#x27;\&gt;;
}\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/utxo-id.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/utxo-id.ts#L14)

## Properties

### coders

• **coders**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `outputIndex` | `default`<``"u8"``\> |
| `transactionId` | `default` |

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

[packages/abi-coder/src/coders/abstract-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L34)

___

### name

• **name**: `string`

#### Inherited from

StructCoder.name

#### Defined in

[packages/abi-coder/src/coders/struct.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L18)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

StructCoder.type

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L33)

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof)<{ `outputIndex`: `default`<``"u8"``\> ; `transactionId`: `default`  }\>, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof)<{ `outputIndex`: `default`<``"u8"``\> ; `transactionId`: `default`  }\>, `number`]

#### Inherited from

StructCoder.decode

#### Defined in

[packages/abi-coder/src/coders/struct.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L41)

___

### encode

▸ **encode**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputValueOf`](../namespaces/internal.md#inputvalueof)<{ `outputIndex`: `default`<``"u8"``\> ; `transactionId`: `default`  }\> |

#### Returns

`any`

#### Inherited from

StructCoder.encode

#### Defined in

[packages/abi-coder/src/coders/struct.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L31)

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

[packages/abi-coder/src/coders/abstract-coder.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L42)
