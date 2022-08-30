---
layout: default
title: CreateTransactionRequestLike
parent: "@fuel-ts/providers"
nav_order: 2

---

# Interface: CreateTransactionRequestLike

[@fuel-ts/providers](../index.md).CreateTransactionRequestLike

## Hierarchy

- [`BaseTransactionRequestLike`](internal-BaseTransactionRequestLike.md)

  ↳ **`CreateTransactionRequestLike`**

## Properties

### bytePrice

• `Optional` **bytePrice**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Price per transaction byte

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[bytePrice](internal-BaseTransactionRequestLike.md#byteprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:67](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L67)

___

### bytecodeWitnessIndex

• `Optional` **bytecodeWitnessIndex**: `number`

Witness index of contract bytecode to create

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:450](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L450)

___

### gasLimit

• `Optional` **gasLimit**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Gas limit for transaction

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[gasLimit](internal-BaseTransactionRequestLike.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:65](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L65)

___

### gasPrice

• `Optional` **gasPrice**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Gas price for transaction

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[gasPrice](internal-BaseTransactionRequestLike.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:63](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L63)

___

### inputs

• `Optional` **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[]

List of inputs

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[inputs](internal-BaseTransactionRequestLike.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:71](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L71)

___

### maturity

• `Optional` **maturity**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[maturity](internal-BaseTransactionRequestLike.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:69](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L69)

___

### outputs

• `Optional` **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[]

List of outputs

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[outputs](internal-BaseTransactionRequestLike.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:73](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L73)

___

### salt

• `Optional` **salt**: `BytesLike`

Salt

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:452](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L452)

___

### staticContracts

• `Optional` **staticContracts**: `BytesLike`[]

List of static contracts

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:454](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L454)

___

### storageSlots

• `Optional` **storageSlots**: [`TransactionRequestStorageSlot`](../namespaces/internal.md#transactionrequeststorageslot)[]

List of storage slots to initialize

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:456](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L456)

___

### witnesses

• `Optional` **witnesses**: `BytesLike`[]

List of witnesses

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[witnesses](internal-BaseTransactionRequestLike.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:75](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L75)
