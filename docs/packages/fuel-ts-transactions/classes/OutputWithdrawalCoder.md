---
layout: default
title: OutputWithdrawalCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputWithdrawalCoder

[@fuel-ts/transactions](../index.md).OutputWithdrawalCoder

## Hierarchy

- `default`<[`OutputWithdrawal`](../index.md#outputwithdrawal), [`OutputWithdrawal`](../index.md#outputwithdrawal)\>

  ↳ **`OutputWithdrawalCoder`**

## Constructors

### constructor

• **new OutputWithdrawalCoder**()

#### Overrides

Coder&lt;OutputWithdrawal, OutputWithdrawal\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/output.ts:122](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L122)

## Properties

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

Coder.encodedLength

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L36)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

Coder.name

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L34)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

Coder.type

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L35)

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

[packages/transactions/src/coders/output.ts:136](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L136)

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

[packages/transactions/src/coders/output.ts:126](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L126)

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

Coder.throwError

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L44)
