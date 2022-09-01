---
layout: default
title: StorageSlotCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: StorageSlotCoder

[@fuel-ts/transactions](../index.md).StorageSlotCoder

## Hierarchy

- `default`<{ `key`: `B256Coder` ; `value`: `B256Coder`  }\>

  ↳ **`StorageSlotCoder`**

## Constructors

### constructor

• **new StorageSlotCoder**()

#### Overrides

StructCoder&lt;{
  key: B256Coder;
  value: B256Coder;
}\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/storage-slot.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/storage-slot.ts#L14)

## Properties

### coders

• **coders**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `default` |
| `value` | `default` |

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

▸ **decode**(`data`, `offset`): [[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof)<{ `key`: `default` ; `value`: `default`  }\>, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`DecodedValueOf`](../namespaces/internal.md#decodedvalueof)<{ `key`: `default` ; `value`: `default`  }\>, `number`]

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
| `value` | [`InputValueOf`](../namespaces/internal.md#inputvalueof)<{ `key`: `default` ; `value`: `default`  }\> |

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
