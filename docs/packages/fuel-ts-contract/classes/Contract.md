---
layout: default
title: Contract
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: Contract

[@fuel-ts/contract](../index.md).Contract

## Constructors

### constructor

• **new Contract**(`id`, `abi`, `signerOrProvider?`, `transactionId?`, `request?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `abi` | readonly [`JsonFragment`](../../fuel-ts-abi-coder/interfaces/JsonFragment.md)[] \| `default` | `undefined` |
| `signerOrProvider` | ``null`` \| `default` | `null` |
| `transactionId?` | `string` | `undefined` |
| `request?` | [`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest) | `undefined` |

#### Defined in

[contract/src/contract.ts:52](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract.ts#L52)

## Properties

### functions

• **functions**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[contract/src/contract.ts:50](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract.ts#L50)

___

### id

• **id**: `string`

#### Defined in

[contract/src/contract.ts:45](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract.ts#L45)

___

### interface

• **interface**: `default`

#### Defined in

[contract/src/contract.ts:44](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract.ts#L44)

___

### provider

• **provider**: ``null`` \| `default`

#### Defined in

[contract/src/contract.ts:46](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract.ts#L46)

___

### request

• `Optional` **request**: [`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest)

#### Defined in

[contract/src/contract.ts:48](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract.ts#L48)

___

### transaction

• `Optional` **transaction**: `string`

#### Defined in

[contract/src/contract.ts:47](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/contract/src/contract.ts#L47)
