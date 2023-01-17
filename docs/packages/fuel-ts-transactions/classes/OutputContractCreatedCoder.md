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

[packages/transactions/src/coders/output.ts:261](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L261)

## Properties

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

Coder.encodedLength

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L40)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

Coder.name

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L38)

___

### offset

• `Optional` **offset**: `number`

#### Inherited from

Coder.offset

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L41)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

Coder.type

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L39)

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

[packages/transactions/src/coders/output.ts:274](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L274)

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

[packages/transactions/src/coders/output.ts:265](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L265)

___

### setOffset

▸ **setOffset**(`offset`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `number` |

#### Returns

`void`

#### Inherited from

Coder.setOffset

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:56](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L56)

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

[packages/abi-coder/src/coders/abstract-coder.ts:49](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L49)
