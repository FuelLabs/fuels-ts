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

[packages/providers/src/transaction-request/transaction-request.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L45)

___

### gasLimit

• `Optional` **gasLimit**: `BigNumberish`

Gas limit for transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L43)

___

### gasPrice

• `Optional` **gasPrice**: `BigNumberish`

Gas price for transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L41)

___

### inputs

• `Optional` **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[]

List of inputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:49](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L49)

___

### maturity

• `Optional` **maturity**: `BigNumberish`

Block until which tx cannot be included

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L47)

___

### outputs

• `Optional` **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[]

List of outputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:51](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L51)

___

### witnesses

• `Optional` **witnesses**: `BytesLike`[]

List of witnesses

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:53](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L53)
