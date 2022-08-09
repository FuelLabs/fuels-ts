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

• `Optional` **bytePrice**: `BigNumberish`

Price per transaction byte

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[bytePrice](internal-BaseTransactionRequestLike.md#byteprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:54](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L54)

___

### bytecodeWitnessIndex

• `Optional` **bytecodeWitnessIndex**: `number`

Witness index of contract bytecode to create

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:402](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L402)

___

### gasLimit

• `Optional` **gasLimit**: `BigNumberish`

Gas limit for transaction

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[gasLimit](internal-BaseTransactionRequestLike.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:52](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L52)

___

### gasPrice

• `Optional` **gasPrice**: `BigNumberish`

Gas price for transaction

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[gasPrice](internal-BaseTransactionRequestLike.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:50](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L50)

___

### inputs

• `Optional` **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[]

List of inputs

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[inputs](internal-BaseTransactionRequestLike.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:58](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L58)

___

### maturity

• `Optional` **maturity**: `BigNumberish`

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[maturity](internal-BaseTransactionRequestLike.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:56](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L56)

___

### outputs

• `Optional` **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[]

List of outputs

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[outputs](internal-BaseTransactionRequestLike.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:60](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L60)

___

### salt

• `Optional` **salt**: `BytesLike`

Salt

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:404](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L404)

___

### staticContracts

• `Optional` **staticContracts**: `BytesLike`[]

List of static contracts

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:406](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L406)

___

### storageSlots

• `Optional` **storageSlots**: [`TransactionRequestStorageSlot`](../namespaces/internal.md#transactionrequeststorageslot)[]

List of storage slots to initialize

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:408](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L408)

___

### witnesses

• `Optional` **witnesses**: `BytesLike`[]

List of witnesses

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[witnesses](internal-BaseTransactionRequestLike.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L62)
