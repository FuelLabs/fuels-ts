---
layout: default
title: ScriptTransactionRequestLike
parent: "@fuel-ts/wallet"
nav_order: 2

---

# Interface: ScriptTransactionRequestLike

[@fuel-ts/wallet](../index.md).[internal](../namespaces/internal.md).ScriptTransactionRequestLike

## Hierarchy

- [`BaseTransactionRequestLike`](internal-BaseTransactionRequestLike.md)

  ↳ **`ScriptTransactionRequestLike`**

## Properties

### gasLimit

• `Optional` **gasLimit**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Gas limit for transaction

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[gasLimit](internal-BaseTransactionRequestLike.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:78](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L78)

___

### gasPrice

• `Optional` **gasPrice**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Gas price for transaction

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[gasPrice](internal-BaseTransactionRequestLike.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:76](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L76)

___

### inputs

• `Optional` **inputs**: [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput)[]

List of inputs

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[inputs](internal-BaseTransactionRequestLike.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:82](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L82)

___

### maturity

• `Optional` **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[maturity](internal-BaseTransactionRequestLike.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:80](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L80)

___

### outputs

• `Optional` **outputs**: [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput)[]

List of outputs

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[outputs](internal-BaseTransactionRequestLike.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:84](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L84)

___

### script

• `Optional` **script**: `BytesLike`

Script to execute

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:379](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L379)

___

### scriptData

• `Optional` **scriptData**: `BytesLike`

Script input data (parameters)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:381](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L381)

___

### witnesses

• `Optional` **witnesses**: `BytesLike`[]

List of witnesses

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[witnesses](internal-BaseTransactionRequestLike.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:86](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L86)
