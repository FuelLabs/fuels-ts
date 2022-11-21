---
layout: default
title: OutputContractCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputContractCoder

[@fuel-ts/transactions](../index.md).OutputContractCoder

## Hierarchy

- `default`<[`OutputContract`](../index.md#outputcontract), [`OutputContract`](../index.md#outputcontract)\>

  ↳ **`OutputContractCoder`**

## Constructors

### constructor

• **new OutputContractCoder**()

#### Overrides

Coder&lt;OutputContract, OutputContract\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/output.ts:74](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L74)

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

### offset

• `Optional` **offset**: `number`

#### Inherited from

Coder.offset

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L37)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

Coder.type

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L35)

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`OutputContract`](../index.md#outputcontract), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`OutputContract`](../index.md#outputcontract), `number`]

#### Overrides

Coder.decode

#### Defined in

[packages/transactions/src/coders/output.ts:88](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L88)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`OutputContract`](../index.md#outputcontract) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[packages/transactions/src/coders/output.ts:78](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L78)

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

[packages/abi-coder/src/coders/abstract-coder.ts:52](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L52)

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

[packages/abi-coder/src/coders/abstract-coder.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L45)
