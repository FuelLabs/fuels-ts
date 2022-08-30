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

[packages/abi-coder/src/coders/struct.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L18)

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

[packages/abi-coder/src/coders/struct.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L17)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

StructCoder.type

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L35)

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

[packages/abi-coder/src/coders/struct.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L43)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputValueOf`](../namespaces/internal.md#inputvalueof)<{ `key`: `default` ; `value`: `default`  }\> |

#### Returns

`Uint8Array`

#### Inherited from

StructCoder.encode

#### Defined in

[packages/abi-coder/src/coders/struct.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L30)

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

[packages/abi-coder/src/coders/abstract-coder.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L44)
