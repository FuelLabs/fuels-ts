---
layout: default
title: Contract
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: Contract

[@fuel-ts/contract](../index.md).Contract

## Hierarchy

- [`AbstractContract`](../../fuel-ts-interfaces/classes/AbstractContract.md)

  ↳ **`Contract`**

## Constructors

### constructor

• **new Contract**(`id`, `abi`, `walletOrProvider?`, `transactionId?`, `request?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` | `undefined` |
| `abi` | [`JsonAbi`](../../fuel-ts-abi-coder/index.md#jsonabi) \| [`Interface`](../../fuel-ts-abi-coder/classes/Interface.md) | `undefined` |
| `walletOrProvider` | ``null`` \| [`Wallet`](../../fuel-ts-wallet/classes/Wallet.md) \| [`Provider`](../../fuel-ts-providers/classes/Provider.md) | `null` |
| `transactionId?` | `string` | `undefined` |
| `request?` | [`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest) | `undefined` |

#### Overrides

[AbstractContract](../../fuel-ts-interfaces/classes/AbstractContract.md).[constructor](../../fuel-ts-interfaces/classes/AbstractContract.md#constructor)

#### Defined in

[packages/contract/src/contract.ts:142](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L142)

## Properties

### callStatic

• **callStatic**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[packages/contract/src/contract.ts:140](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L140)

___

### functions

• **functions**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[packages/contract/src/contract.ts:139](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L139)

___

### id

• **id**: `string`

#### Overrides

[AbstractContract](../../fuel-ts-interfaces/classes/AbstractContract.md).[id](../../fuel-ts-interfaces/classes/AbstractContract.md#id)

#### Defined in

[packages/contract/src/contract.ts:133](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L133)

___

### interface

• **interface**: [`Interface`](../../fuel-ts-abi-coder/classes/Interface.md)

#### Defined in

[packages/contract/src/contract.ts:132](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L132)

___

### provider

• **provider**: ``null`` \| [`Provider`](../../fuel-ts-providers/classes/Provider.md)

#### Defined in

[packages/contract/src/contract.ts:134](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L134)

___

### request

• `Optional` **request**: [`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest)

#### Defined in

[packages/contract/src/contract.ts:137](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L137)

___

### transaction

• `Optional` **transaction**: `string`

#### Defined in

[packages/contract/src/contract.ts:136](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L136)

___

### wallet

• **wallet**: ``null`` \| [`Wallet`](../../fuel-ts-wallet/classes/Wallet.md)

#### Defined in

[packages/contract/src/contract.ts:135](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L135)
