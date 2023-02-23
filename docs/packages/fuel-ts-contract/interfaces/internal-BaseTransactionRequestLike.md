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

[packages/providers/src/transaction-request/transaction-request.ts:83](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L83)

___

### gasPrice

• `Optional` **gasPrice**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Gas price for transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:81](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L81)

___

### inputs

• `Optional` **inputs**: [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput)[]

List of inputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:87](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L87)

___

### maturity

• `Optional` **maturity**: `number`

Block until which tx cannot be included

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:85](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L85)

___

### outputs

• `Optional` **outputs**: [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput)[]

List of outputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:89](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L89)

___

### witnesses

• `Optional` **witnesses**: `BytesLike`[]

List of witnesses

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:91](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L91)
