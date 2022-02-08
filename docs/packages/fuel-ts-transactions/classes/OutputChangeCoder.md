---
layout: default
title: OutputChangeCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputChangeCoder

[@fuel-ts/transactions](../index.md).OutputChangeCoder

## Hierarchy

- `default`

  ↳ **`OutputChangeCoder`**

## Constructors

### constructor

• **new OutputChangeCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/output.ts:170](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L170)

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

▸ **decode**(`data`, `offset`): [[`OutputChange`](../index.md#outputchange), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`OutputChange`](../index.md#outputchange), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/output.ts:184](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L184)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`OutputChange`](../index.md#outputchange) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/output.ts:174](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L174)

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
