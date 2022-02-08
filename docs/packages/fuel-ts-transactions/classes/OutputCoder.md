---
layout: default
title: OutputCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputCoder

[@fuel-ts/transactions](../index.md).OutputCoder

## Hierarchy

- `default`

  ↳ **`OutputCoder`**

## Constructors

### constructor

• **new OutputCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/output.ts:301](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L301)

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

▸ **decode**(`data`, `offset`): [[`Output`](../index.md#output), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`Output`](../index.md#output), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/output.ts:342](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L342)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Output`](../index.md#output) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/output.ts:305](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L305)

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
