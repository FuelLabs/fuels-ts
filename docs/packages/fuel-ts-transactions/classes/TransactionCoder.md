---
layout: default
title: TransactionCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: TransactionCoder

[@fuel-ts/transactions](../index.md).TransactionCoder

## Hierarchy

- [`Coder`](internal-Coder.md)<[`Transaction`](../index.md#transaction), [`Transaction`](../index.md#transaction)\>

  ↳ **`TransactionCoder`**

## Constructors

### constructor

• **new TransactionCoder**()

#### Overrides

[Coder](internal-Coder.md).[constructor](internal-Coder.md#constructor)

#### Defined in

[packages/transactions/src/coders/transaction.ts:357](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L357)

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

▸ **decode**(`data`, `offset`): [`Partial`<`Omit`<[`TransactionScript`](../index.md#transactionscript), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionCreate`](../index.md#transactioncreate), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionMint`](../index.md#transactionmint), ``"type"``\>\> & { `type`: [`TransactionType`](../enums/TransactionType.md)  }, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[`Partial`<`Omit`<[`TransactionScript`](../index.md#transactionscript), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionCreate`](../index.md#transactioncreate), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionMint`](../index.md#transactionmint), ``"type"``\>\> & { `type`: [`TransactionType`](../enums/TransactionType.md)  }, `number`]

#### Overrides

[Coder](internal-Coder.md).[decode](internal-Coder.md#decode)

#### Defined in

[packages/transactions/src/coders/transaction.ts:390](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L390)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Partial`<`Omit`<[`TransactionScript`](../index.md#transactionscript), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionCreate`](../index.md#transactioncreate), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionMint`](../index.md#transactionmint), ``"type"``\>\> & { `type`: [`TransactionType`](../enums/TransactionType.md)  } |

#### Returns

`Uint8Array`

#### Overrides

[Coder](internal-Coder.md).[encode](internal-Coder.md#encode)

#### Defined in

[packages/transactions/src/coders/transaction.ts:361](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L361)

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
