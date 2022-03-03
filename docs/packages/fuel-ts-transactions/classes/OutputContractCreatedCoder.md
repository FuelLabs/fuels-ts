---
layout: default
title: OutputContractCreatedCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputContractCreatedCoder

[@fuel-ts/transactions](../index.md).OutputContractCreatedCoder

## Hierarchy

- `default`

  ↳ **`OutputContractCreatedCoder`**

## Constructors

### constructor

• **new OutputContractCreatedCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/output.ts:264](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L264)

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

▸ **decode**(`data`, `offset`): [[`OutputContractCreated`](../index.md#outputcontractcreated), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`OutputContractCreated`](../index.md#outputcontractcreated), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/output.ts:277](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L277)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`OutputContractCreated`](../index.md#outputcontractcreated) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/output.ts:268](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L268)

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
