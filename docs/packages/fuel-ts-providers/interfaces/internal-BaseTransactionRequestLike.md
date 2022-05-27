---
layout: default
title: BaseTransactionRequestLike
parent: "@fuel-ts/providers"
nav_order: 2

---

# Interface: BaseTransactionRequestLike

[@fuel-ts/providers](../index.md).[internal](../namespaces/internal.md).BaseTransactionRequestLike

## Hierarchy

- **`BaseTransactionRequestLike`**

  ↳ [`ScriptTransactionRequestLike`](ScriptTransactionRequestLike.md)

  ↳ [`CreateTransactionRequestLike`](CreateTransactionRequestLike.md)

## Implemented by

- [`BaseTransactionRequest`](../classes/internal-BaseTransactionRequest.md)

## Properties

### bytePrice

• `Optional` **bytePrice**: `BigNumberish`

Price per transaction byte

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:54](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L54)

___

### gasLimit

• `Optional` **gasLimit**: `BigNumberish`

Gas limit for transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:52](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L52)

___

### gasPrice

• `Optional` **gasPrice**: `BigNumberish`

Gas price for transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:50](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L50)

___

### inputs

• `Optional` **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[]

List of inputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:58](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L58)

___

### maturity

• `Optional` **maturity**: `BigNumberish`

Block until which tx cannot be included

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:56](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L56)

___

### outputs

• `Optional` **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[]

List of outputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:60](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L60)

___

### witnesses

• `Optional` **witnesses**: `BytesLike`[]

List of witnesses

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L62)
