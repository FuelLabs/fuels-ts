---
layout: default
title: OutputCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputCoder

[@fuel-ts/transactions](../index.md).OutputCoder

## Hierarchy

- `default`<[`Output`](../index.md#output), [`Output`](../index.md#output)\>

  ↳ **`OutputCoder`**

## Constructors

### constructor

• **new OutputCoder**()

#### Overrides

Coder&lt;Output, Output\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/output.ts:308](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L308)

## Properties

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

Coder.encodedLength

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L34)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

Coder.name

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L32)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

Coder.type

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L33)

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

[packages/transactions/src/coders/output.ts:349](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L349)

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

[packages/transactions/src/coders/output.ts:312](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L312)

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

[packages/abi-coder/src/coders/abstract-coder.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L42)
