---
layout: default
title: ScriptTransactionRequestLike
parent: "@fuel-ts/providers"
nav_order: 2

---

# Interface: ScriptTransactionRequestLike

[@fuel-ts/providers](../index.md).ScriptTransactionRequestLike

## Hierarchy

- [`BaseTransactionRequestLike`](internal-BaseTransactionRequestLike.md)

  ↳ **`ScriptTransactionRequestLike`**

## Properties

### gasLimit

• `Optional` **gasLimit**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[gasLimit](internal-BaseTransactionRequestLike.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L66)

___

### gasPrice

• `Optional` **gasPrice**: [`BigNumberish`](../namespaces/internal.md#bignumberish)

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[gasPrice](internal-BaseTransactionRequestLike.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:64](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L64)

___

### inputs

• `Optional` **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[]

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[inputs](internal-BaseTransactionRequestLike.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:70](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L70)

___

### maturity

• `Optional` **maturity**: `number`

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[maturity](internal-BaseTransactionRequestLike.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:68](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L68)

___

### outputs

• `Optional` **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[outputs](internal-BaseTransactionRequestLike.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:72](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L72)

___

### script

• `Optional` **script**: `BytesLike`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:361](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L361)

___

### scriptData

• `Optional` **scriptData**: `BytesLike`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:363](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L363)

___

### witnesses

• `Optional` **witnesses**: `BytesLike`[]

#### Inherited from

[BaseTransactionRequestLike](internal-BaseTransactionRequestLike.md).[witnesses](internal-BaseTransactionRequestLike.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:74](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L74)
