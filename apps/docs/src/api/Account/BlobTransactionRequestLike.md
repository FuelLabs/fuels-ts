[**@fuel-ts/account v0.94.5**](../index.md) • **Docs**

***

# Interface: BlobTransactionRequestLike

## Extends

- `BaseTransactionRequestLike`

## Properties

### blobId

> **blobId**: `string`

Blob ID

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:14](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L14)

***

### inputs?

> `optional` **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[]

List of inputs

#### Inherited from

`BaseTransactionRequestLike.inputs`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:80](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/providers/transaction-request/transaction-request.ts#L80)

***

### maturity?

> `optional` **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

`BaseTransactionRequestLike.maturity`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:74](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/providers/transaction-request/transaction-request.ts#L74)

***

### maxFee?

> `optional` **maxFee**: `BigNumberish`

The maximum fee payable by this transaction using BASE_ASSET.

#### Inherited from

`BaseTransactionRequestLike.maxFee`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:76](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/providers/transaction-request/transaction-request.ts#L76)

***

### outputs?

> `optional` **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[]

List of outputs

#### Inherited from

`BaseTransactionRequestLike.outputs`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:82](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/providers/transaction-request/transaction-request.ts#L82)

***

### tip?

> `optional` **tip**: `BigNumberish`

Gas price for transaction

#### Inherited from

`BaseTransactionRequestLike.tip`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:72](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/providers/transaction-request/transaction-request.ts#L72)

***

### witnessIndex?

> `optional` **witnessIndex**: `number`

Witness index of contract bytecode to create

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:16](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L16)

***

### witnessLimit?

> `optional` **witnessLimit**: `BigNumberish`

The maximum amount of witness data allowed for the transaction

#### Inherited from

`BaseTransactionRequestLike.witnessLimit`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:78](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/providers/transaction-request/transaction-request.ts#L78)

***

### witnesses?

> `optional` **witnesses**: [`BytesLike`](../Interfaces/index.md#byteslike)[]

List of witnesses

#### Inherited from

`BaseTransactionRequestLike.witnesses`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:84](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/providers/transaction-request/transaction-request.ts#L84)
