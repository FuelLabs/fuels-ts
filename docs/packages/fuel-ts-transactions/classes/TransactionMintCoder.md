---
layout: default
title: TransactionMintCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: TransactionMintCoder

[@fuel-ts/transactions](../index.md).TransactionMintCoder

## Hierarchy

- [`Coder`](internal-Coder.md)<[`TransactionMint`](../index.md#transactionmint), [`TransactionMint`](../index.md#transactionmint)\>

  ↳ **`TransactionMintCoder`**

## Constructors

### constructor

• **new TransactionMintCoder**()

#### Overrides

[Coder](internal-Coder.md).[constructor](internal-Coder.md#constructor)

#### Defined in

[packages/transactions/src/coders/transaction.ts:311](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L311)

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

▸ **decode**(`data`, `offset`): [[`TransactionMint`](../index.md#transactionmint), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`TransactionMint`](../index.md#transactionmint), `number`]

#### Overrides

[Coder](internal-Coder.md).[decode](internal-Coder.md#decode)

#### Defined in

[packages/transactions/src/coders/transaction.ts:325](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L325)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TransactionMint`](../index.md#transactionmint) |

#### Returns

`Uint8Array`

#### Overrides

[Coder](internal-Coder.md).[encode](internal-Coder.md#encode)

#### Defined in

[packages/transactions/src/coders/transaction.ts:315](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L315)

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
