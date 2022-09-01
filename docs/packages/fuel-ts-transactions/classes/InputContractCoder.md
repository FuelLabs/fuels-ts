---
layout: default
title: InputContractCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: InputContractCoder

[@fuel-ts/transactions](../index.md).InputContractCoder

## Hierarchy

- `default`<[`InputContract`](../index.md#inputcontract), [`InputContract`](../index.md#inputcontract)\>

  ↳ **`InputContractCoder`**

## Constructors

### constructor

• **new InputContractCoder**()

#### Overrides

Coder&lt;InputContract, InputContract\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/input.ts:122](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L122)

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

▸ **decode**(`data`, `offset`): [[`InputContract`](../index.md#inputcontract), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`InputContract`](../index.md#inputcontract), `number`]

#### Overrides

Coder.decode

#### Defined in

[packages/transactions/src/coders/input.ts:137](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L137)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputContract`](../index.md#inputcontract) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[packages/transactions/src/coders/input.ts:126](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L126)

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
