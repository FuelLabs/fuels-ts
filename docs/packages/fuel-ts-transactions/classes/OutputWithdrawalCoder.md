---
layout: default
title: OutputWithdrawalCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputWithdrawalCoder

[@fuel-ts/transactions](../index.md).OutputWithdrawalCoder

## Hierarchy

- `default`

  ↳ **`OutputWithdrawalCoder`**

## Constructors

### constructor

• **new OutputWithdrawalCoder**(`localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |

#### Overrides

Coder.constructor

#### Defined in

[transactions/src/coders/output.ts:122](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/output.ts#L122)

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

▸ **decode**(`data`, `offset`): [[`OutputWithdrawal`](../index.md#outputwithdrawal), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`OutputWithdrawal`](../index.md#outputwithdrawal), `number`]

#### Overrides

Coder.decode

#### Defined in

[transactions/src/coders/output.ts:136](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/output.ts#L136)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`OutputWithdrawal`](../index.md#outputwithdrawal) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[transactions/src/coders/output.ts:126](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/transactions/src/coders/output.ts#L126)

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
