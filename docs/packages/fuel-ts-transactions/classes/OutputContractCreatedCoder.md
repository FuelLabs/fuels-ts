---
layout: default
title: OutputContractCreatedCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputContractCreatedCoder

[@fuel-ts/transactions](../index.md).OutputContractCreatedCoder

## Hierarchy

- `default`<[`OutputContractCreated`](../index.md#outputcontractcreated), [`OutputContractCreated`](../index.md#outputcontractcreated)\>

  ↳ **`OutputContractCreatedCoder`**

## Constructors

### constructor

• **new OutputContractCreatedCoder**()

#### Overrides

Coder&lt;
  OutputContractCreated,
  OutputContractCreated
\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/output.ts:266](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L266)

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

[packages/transactions/src/coders/output.ts:279](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L279)

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

[packages/transactions/src/coders/output.ts:270](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L270)

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
