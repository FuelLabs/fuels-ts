---
layout: default
title: OutputCoinCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputCoinCoder

[@fuel-ts/transactions](../index.md).OutputCoinCoder

## Hierarchy

- `default`

  ↳ **`OutputCoinCoder`**

## Constructors

### constructor

• **new OutputCoinCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/output.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L26)

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

▸ **decode**(`data`, `offset`): [[`OutputCoin`](../index.md#outputcoin), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`OutputCoin`](../index.md#outputcoin), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/output.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L40)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`OutputCoin`](../index.md#outputcoin) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/output.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L30)

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
