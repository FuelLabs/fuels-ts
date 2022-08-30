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

[packages/transactions/src/coders/output.ts:218](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L218)

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

[packages/transactions/src/coders/output.ts:232](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L232)

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

[packages/transactions/src/coders/output.ts:222](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L222)

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
