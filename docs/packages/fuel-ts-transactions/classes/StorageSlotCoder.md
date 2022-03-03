---
layout: default
title: StorageSlotCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: StorageSlotCoder

[@fuel-ts/transactions](../index.md).StorageSlotCoder

## Hierarchy

- `default`

  ↳ **`StorageSlotCoder`**

## Constructors

### constructor

• **new StorageSlotCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/storage-slot.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/storage-slot.ts#L12)

## Properties

### localName

• `Readonly` **localName**: `string`

#### Inherited from

Coder.localName

#### Defined in

abi-coder/dist/coders/abstract-coder.d.ts:12

___

### name

• `Readonly` **name**: `string`

#### Inherited from

Coder.name

#### Defined in

abi-coder/dist/coders/abstract-coder.d.ts:10

___

### type

• `Readonly` **type**: `string`

#### Inherited from

Coder.type

#### Defined in

abi-coder/dist/coders/abstract-coder.d.ts:11

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`StorageSlot`](../index.md#storageslot), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`StorageSlot`](../index.md#storageslot), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/storage-slot.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/storage-slot.ts#L25)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`StorageSlot`](../index.md#storageslot) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/storage-slot.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/storage-slot.ts#L16)

___

### throwError

▸ **throwError**(`message`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `value` | `unknown` |

#### Returns

`void`

#### Inherited from

Coder.throwError

#### Defined in

abi-coder/dist/coders/abstract-coder.d.ts:14
