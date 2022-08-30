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

[packages/transactions/src/coders/output.ts:309](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L309)

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

[packages/transactions/src/coders/output.ts:350](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L350)

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

[packages/transactions/src/coders/output.ts:313](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L313)

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
