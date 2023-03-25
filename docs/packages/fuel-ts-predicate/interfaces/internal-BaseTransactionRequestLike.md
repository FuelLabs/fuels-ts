---
layout: default
title: BaseTransactionRequestLike
parent: "@fuel-ts/predicate"
nav_order: 2

---

# Interface: BaseTransactionRequestLike

[@fuel-ts/predicate](../index.md).[internal](../namespaces/internal.md).BaseTransactionRequestLike

## Hierarchy

- **`BaseTransactionRequestLike`**

  ↳ [`ScriptTransactionRequestLike`](internal-ScriptTransactionRequestLike.md)

  ↳ [`CreateTransactionRequestLike`](internal-CreateTransactionRequestLike.md)

## Implemented by

- [`BaseTransactionRequest`](../classes/internal-BaseTransactionRequest.md)

## Properties

### gasLimit

• `Optional` **gasLimit**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Gas limit for transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:78](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L78)

___

### gasPrice

• `Optional` **gasPrice**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Gas price for transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:76](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L76)

___

### inputs

• `Optional` **inputs**: [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput)[]

List of inputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:82](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L82)

___

### maturity

• `Optional` **maturity**: `number`

Block until which tx cannot be included

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:80](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L80)

___

### outputs

• `Optional` **outputs**: [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput)[]

List of outputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:84](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L84)

___

### witnesses

• `Optional` **witnesses**: `BytesLike`[]

List of witnesses

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:86](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L86)
