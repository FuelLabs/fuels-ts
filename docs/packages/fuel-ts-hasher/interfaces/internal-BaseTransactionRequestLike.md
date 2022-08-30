---
layout: default
title: BaseTransactionRequestLike
parent: "@fuel-ts/hasher"
nav_order: 2

---

# Interface: BaseTransactionRequestLike

[@fuel-ts/hasher](../index.md).[internal](../namespaces/internal.md).BaseTransactionRequestLike

## Hierarchy

- **`BaseTransactionRequestLike`**

  ↳ [`ScriptTransactionRequestLike`](internal-ScriptTransactionRequestLike.md)

  ↳ [`CreateTransactionRequestLike`](internal-CreateTransactionRequestLike.md)

## Properties

### bytePrice

• `Optional` **bytePrice**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Price per transaction byte

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:67](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L67)

___

### gasLimit

• `Optional` **gasLimit**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Gas limit for transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:65](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L65)

___

### gasPrice

• `Optional` **gasPrice**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Gas price for transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:63](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L63)

___

### inputs

• `Optional` **inputs**: [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput)[]

List of inputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:71](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L71)

___

### maturity

• `Optional` **maturity**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Block until which tx cannot be included

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:69](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L69)

___

### outputs

• `Optional` **outputs**: [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput)[]

List of outputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:73](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L73)

___

### witnesses

• `Optional` **witnesses**: `BytesLike`[]

List of witnesses

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:75](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L75)
