---
layout: default
title: BaseTransactionRequestLike
parent: "@fuel-ts/contract"
nav_order: 2

---

# Interface: BaseTransactionRequestLike

[@fuel-ts/contract](../index.md).[internal](../namespaces/internal.md).BaseTransactionRequestLike

## Hierarchy

- **`BaseTransactionRequestLike`**

  ↳ [`CreateTransactionRequestLike`](internal-CreateTransactionRequestLike.md)

  ↳ [`ScriptTransactionRequestLike`](internal-ScriptTransactionRequestLike.md)

## Implemented by

- [`BaseTransactionRequest`](../classes/internal-BaseTransactionRequest.md)

## Properties

### gasLimit

• `Optional` **gasLimit**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Gas limit for transaction

#### Defined in

packages/providers/dist/index.d.ts:895

___

### gasPrice

• `Optional` **gasPrice**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Gas price for transaction

#### Defined in

packages/providers/dist/index.d.ts:893

___

### inputs

• `Optional` **inputs**: [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput)[]

List of inputs

#### Defined in

packages/providers/dist/index.d.ts:899

___

### maturity

• `Optional` **maturity**: `number`

Block until which tx cannot be included

#### Defined in

packages/providers/dist/index.d.ts:897

___

### outputs

• `Optional` **outputs**: [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput)[]

List of outputs

#### Defined in

packages/providers/dist/index.d.ts:901

___

### witnesses

• `Optional` **witnesses**: `BytesLike`[]

List of witnesses

#### Defined in

packages/providers/dist/index.d.ts:903
