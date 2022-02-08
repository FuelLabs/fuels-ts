---
layout: default
title: OutputContractCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputContractCoder

[@fuel-ts/transactions](../index.md).OutputContractCoder

## Hierarchy

- `default`

  ↳ **`OutputContractCoder`**

## Constructors

### constructor

• **new OutputContractCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/output.ts:74](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L74)

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

▸ **decode**(`data`, `offset`): [[`OutputContract`](../index.md#outputcontract), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`OutputContract`](../index.md#outputcontract), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/output.ts:88](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L88)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`OutputContract`](../index.md#outputcontract) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/output.ts:78](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L78)

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
