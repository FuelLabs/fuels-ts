---
layout: default
title: CreateTransactionRequestLike
parent: "@fuel-ts/contract"
nav_order: 2

---

# Interface: CreateTransactionRequestLike

[@fuel-ts/contract](../index.md).[internal](../namespaces/internal.md).CreateTransactionRequestLike

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

[packages/providers/src/transaction-request/transaction-request.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L66)

___

### bytecodeWitnessIndex

• `Optional` **bytecodeWitnessIndex**: `number`

Witness index of contract bytecode to create

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:449](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L449)

___

### gasLimit

• `Optional` **gasLimit**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Gas limit for transaction

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[gasLimit](internal-BaseTransactionRequestLike.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:64](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L64)

___

### gasPrice

• `Optional` **gasPrice**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Gas price for transaction

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[gasPrice](internal-BaseTransactionRequestLike.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L62)

___

### inputs

• `Optional` **inputs**: [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput)[]

List of inputs

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[inputs](internal-BaseTransactionRequestLike.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:70](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L70)

___

### maturity

• `Optional` **maturity**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[maturity](internal-BaseTransactionRequestLike.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:68](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L68)

___

### outputs

• `Optional` **outputs**: [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput)[]

List of outputs

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[outputs](internal-BaseTransactionRequestLike.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:72](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L72)

___

### salt

• `Optional` **salt**: `BytesLike`

Salt

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:451](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L451)

___

### staticContracts

• `Optional` **staticContracts**: `BytesLike`[]

List of static contracts

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:453](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L453)

___

### storageSlots

• `Optional` **storageSlots**: [`TransactionRequestStorageSlot`](../namespaces/internal.md#transactionrequeststorageslot)[]

List of storage slots to initialize

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:455](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L455)

___

### witnesses

• `Optional` **witnesses**: `BytesLike`[]

List of witnesses

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[witnesses](internal-BaseTransactionRequestLike.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:74](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L74)
