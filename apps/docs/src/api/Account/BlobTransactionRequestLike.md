[**@fuel-ts/account v0.94.2**](../index.md) • **Docs**

***

# Interface: BlobTransactionRequestLike

## Extends

- `BaseTransactionRequestLike`

## Properties

### blobId

> **blobId**: `string`

Blob ID

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:13](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L13)

***

### inputs?

> `optional` **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[]

List of inputs

#### Inherited from

`BaseTransactionRequestLike.inputs`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:79](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-request/transaction-request.ts#L79)

***

### maturity?

> `optional` **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

`BaseTransactionRequestLike.maturity`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:73](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-request/transaction-request.ts#L73)

***

### maxFee?

> `optional` **maxFee**: `BigNumberish`

The maximum fee payable by this transaction using BASE_ASSET.

#### Inherited from

`BaseTransactionRequestLike.maxFee`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:75](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-request/transaction-request.ts#L75)

***

### outputs?

> `optional` **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[]

List of outputs

#### Inherited from

`BaseTransactionRequestLike.outputs`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:81](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-request/transaction-request.ts#L81)

***

### tip?

> `optional` **tip**: `BigNumberish`

Gas price for transaction

#### Inherited from

`BaseTransactionRequestLike.tip`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:71](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-request/transaction-request.ts#L71)

***

### witnessIndex?

> `optional` **witnessIndex**: `number`

Witness index of contract bytecode to create

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:15](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L15)

***

### witnessLimit?

> `optional` **witnessLimit**: `BigNumberish`

The maximum amount of witness data allowed for the transaction

#### Inherited from

`BaseTransactionRequestLike.witnessLimit`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:77](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-request/transaction-request.ts#L77)

***

### witnesses?

> `optional` **witnesses**: [`BytesLike`](../Interfaces/index.md#byteslike)[]

List of witnesses

#### Inherited from

`BaseTransactionRequestLike.witnesses`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:83](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-request/transaction-request.ts#L83)
