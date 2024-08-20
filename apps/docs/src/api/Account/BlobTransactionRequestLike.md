# Interface: BlobTransactionRequestLike

[@fuel-ts/account](/api/Account/index.md).BlobTransactionRequestLike

## Hierarchy

- `BaseTransactionRequestLike`

  ↳ **`BlobTransactionRequestLike`**

## Properties

### blobId

• **blobId**: `string`

Blob ID

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:13](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L13)

___

### inputs

• `Optional` **inputs**: [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[]

List of inputs

#### Inherited from

BaseTransactionRequestLike.inputs

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:79](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L79)

___

### maturity

• `Optional` **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

BaseTransactionRequestLike.maturity

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:73](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L73)

___

### maxFee

• `Optional` **maxFee**: `BigNumberish`

The maximum fee payable by this transaction using BASE_ASSET.

#### Inherited from

BaseTransactionRequestLike.maxFee

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:75](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L75)

___

### outputs

• `Optional` **outputs**: [`TransactionRequestOutput`](/api/Account/index.md#transactionrequestoutput)[]

List of outputs

#### Inherited from

BaseTransactionRequestLike.outputs

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:81](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L81)

___

### tip

• `Optional` **tip**: `BigNumberish`

Gas price for transaction

#### Inherited from

BaseTransactionRequestLike.tip

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:71](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L71)

___

### witnessIndex

• `Optional` **witnessIndex**: `number`

Witness index of contract bytecode to create

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:15](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L15)

___

### witnessLimit

• `Optional` **witnessLimit**: `BigNumberish`

The maximum amount of witness data allowed for the transaction

#### Inherited from

BaseTransactionRequestLike.witnessLimit

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:77](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L77)

___

### witnesses

• `Optional` **witnesses**: [`BytesLike`](/api/Interfaces/index.md#byteslike)[]

List of witnesses

#### Inherited from

BaseTransactionRequestLike.witnesses

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:83](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L83)
