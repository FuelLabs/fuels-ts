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

[packages/contract/src/contract.ts:169](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L169)

## Properties

### dryRun

• **dryRun**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[packages/contract/src/contract.ts:163](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L163)

___

### dryRunResult

• **dryRunResult**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[packages/contract/src/contract.ts:164](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L164)

___

### id

• **id**: `string`

#### Overrides

[AbstractContract](../../fuel-ts-interfaces/classes/AbstractContract.md).[id](../../fuel-ts-interfaces/classes/AbstractContract.md#id)

#### Defined in

[packages/contract/src/contract.ts:157](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L157)

___

### interface

• **interface**: [`Interface`](../../fuel-ts-abi-coder/classes/Interface.md)

#### Defined in

[packages/contract/src/contract.ts:156](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L156)

___

### prepareCall

• **prepareCall**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[packages/contract/src/contract.ts:167](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L167)

___

### provider

• **provider**: ``null`` \| [`Provider`](../../fuel-ts-providers/classes/Provider.md)

#### Defined in

[packages/contract/src/contract.ts:158](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L158)

___

### request

• `Optional` **request**: [`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest)

#### Defined in

[packages/contract/src/contract.ts:161](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L161)

___

### submit

• **submit**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[packages/contract/src/contract.ts:165](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L165)

___

### submitResult

• **submitResult**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[packages/contract/src/contract.ts:166](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L166)

___

### transaction

• `Optional` **transaction**: `string`

#### Defined in

[packages/contract/src/contract.ts:160](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L160)

___

### wallet

• **wallet**: ``null`` \| [`Wallet`](../../fuel-ts-wallet/classes/Wallet.md)

#### Defined in

[packages/contract/src/contract.ts:159](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L159)
