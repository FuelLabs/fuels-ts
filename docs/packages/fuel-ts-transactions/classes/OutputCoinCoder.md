---
layout: default
title: OutputCoinCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: OutputCoinCoder

[@fuel-ts/transactions](../index.md).OutputCoinCoder

## Hierarchy

- [`Coder`](internal-Coder.md)<[`OutputCoin`](../index.md#outputcoin), [`OutputCoin`](../index.md#outputcoin)\>

  ↳ **`OutputCoinCoder`**

## Constructors

### constructor

• **new OutputCoinCoder**()

#### Overrides

[Coder](internal-Coder.md).[constructor](internal-Coder.md#constructor)

#### Defined in

[packages/transactions/src/coders/output.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L26)

## Properties

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

[Coder](internal-Coder.md).[encodedLength](internal-Coder.md#encodedlength)

#### Defined in

packages/abi-coder/dist/index.d.ts:42

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Coder](internal-Coder.md).[name](internal-Coder.md#name)

#### Defined in

packages/abi-coder/dist/index.d.ts:40

___

### offset

• `Optional` **offset**: `number`

#### Inherited from

[Coder](internal-Coder.md).[offset](internal-Coder.md#offset)

#### Defined in

packages/abi-coder/dist/index.d.ts:43

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](internal-Coder.md).[type](internal-Coder.md#type)

#### Defined in

packages/abi-coder/dist/index.d.ts:41

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

[Coder](internal-Coder.md).[decode](internal-Coder.md#decode)

#### Defined in

[packages/transactions/src/coders/output.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L40)

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

[Coder](internal-Coder.md).[encode](internal-Coder.md#encode)

#### Defined in

[packages/transactions/src/coders/output.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L30)

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

[Coder](internal-Coder.md).[setOffset](internal-Coder.md#setoffset)

#### Defined in

packages/abi-coder/dist/index.d.ts:46

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

[Coder](internal-Coder.md).[throwError](internal-Coder.md#throwerror)

#### Defined in

packages/abi-coder/dist/index.d.ts:45
