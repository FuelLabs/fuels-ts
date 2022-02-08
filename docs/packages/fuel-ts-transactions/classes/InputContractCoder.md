---
layout: default
title: InputContractCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: InputContractCoder

[@fuel-ts/transactions](../index.md).InputContractCoder

## Hierarchy

- `default`

  ↳ **`InputContractCoder`**

## Constructors

### constructor

• **new InputContractCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/input.ts:125](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L125)

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

▸ **decode**(`data`, `offset`): [[`InputContract`](../index.md#inputcontract), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`InputContract`](../index.md#inputcontract), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/input.ts:140](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L140)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputContract`](../index.md#inputcontract) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/input.ts:129](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L129)

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
