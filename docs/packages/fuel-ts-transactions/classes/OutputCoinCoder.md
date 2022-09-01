---
layout: default
title: OutputCoinCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputCoinCoder

[@fuel-ts/transactions](../index.md).OutputCoinCoder

## Hierarchy

- `default`<[`OutputCoin`](../index.md#outputcoin), [`OutputCoin`](../index.md#outputcoin)\>

  ↳ **`OutputCoinCoder`**

## Constructors

### constructor

• **new OutputCoinCoder**()

#### Overrides

Coder&lt;OutputCoin, OutputCoin\&gt;.constructor

#### Defined in

[packages/transactions/src/coders/output.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L25)

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

▸ **decode**(`data`, `offset`): [[`OutputCoin`](../index.md#outputcoin), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`OutputCoin`](../index.md#outputcoin), `number`]

#### Overrides

Coder.decode

#### Defined in

[packages/transactions/src/coders/output.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L39)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`OutputCoin`](../index.md#outputcoin) |

#### Returns

`Uint8Array`

#### Overrides

Coder.encode

#### Defined in

[packages/transactions/src/coders/output.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L29)

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
