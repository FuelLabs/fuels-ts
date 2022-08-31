---
layout: default
title: OutputVariableCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputVariableCoder

[@fuel-ts/transactions](../index.md).OutputVariableCoder

## Hierarchy

- `default`<[`OutputVariable`](../index.md#outputvariable), [`OutputVariable`](../index.md#outputvariable)\>

  ↳ **`OutputVariableCoder`**

## Constructors

### constructor

• **new OutputVariableCoder**()

#### Overrides

Coder&lt;OutputVariable, OutputVariable\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/output.ts:217](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L217)

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

▸ **decode**(`data`, `offset`): [[`OutputVariable`](../index.md#outputvariable), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`OutputVariable`](../index.md#outputvariable), `number`]

#### Overrides

Coder.decode

#### Defined in

[packages/transactions/src/coders/output.ts:231](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L231)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`OutputVariable`](../index.md#outputvariable) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[packages/transactions/src/coders/output.ts:221](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L221)

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
