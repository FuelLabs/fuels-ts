[**@fuel-ts/account v0.94.2**](../index.md) • **Docs**

***

# Class: TransactionResponse

Represents a response for a transaction.

## Constructors

### new TransactionResponse()

> **new TransactionResponse**(`tx`, `provider`, `abis`?): [`TransactionResponse`](TransactionResponse.md)

Constructor for `TransactionResponse`.

#### Parameters

• **tx**: `string` \| [`TransactionRequest`](../index.md#transactionrequest)

The transaction ID or TransactionRequest.

• **provider**: [`Provider`](Provider.md)

The provider.

• **abis?**: [`JsonAbisFromAllCalls`](../index.md#jsonabisfromallcalls)

#### Returns

[`TransactionResponse`](TransactionResponse.md)

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:144](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-response/transaction-response.ts#L144)

## Properties

### abis?

> `optional` **abis**: [`JsonAbisFromAllCalls`](../index.md#jsonabisfromallcalls)

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:136](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-response/transaction-response.ts#L136)

***

### gasUsed

> **gasUsed**: `BN`

Gas used on the transaction

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:131](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-response/transaction-response.ts#L131)

***

### id

> **id**: `string`

Transaction ID

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:127](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-response/transaction-response.ts#L127)

***

### provider

> **provider**: [`Provider`](Provider.md)

Current provider

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:129](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-response/transaction-response.ts#L129)

## Methods

### assembleResult()

> **assembleResult**\&lt;`TTransactionType`\>(`contractsAbiMap`?): `Promise`\&lt;`TransactionResult`\&lt;`TTransactionType`\>\>

Assembles the result of a transaction by retrieving the transaction summary,
decoding logs (if available), and handling transaction failure.

This method can be used to obtain the result of a transaction that has just
been submitted or one that has already been processed.

#### Type Parameters

• **TTransactionType** = `void`

The type of the transaction.

#### Parameters

• **contractsAbiMap?**: [`AbiMap`](../index.md#abimap)

The map of contract ABIs.

#### Returns

`Promise`\&lt;`TransactionResult`\&lt;`TTransactionType`\>\>

- The assembled transaction result.

#### Throws

If the transaction status is a failure.

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:353](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-response/transaction-response.ts#L353)

***

### decodeTransaction()

> **decodeTransaction**\&lt;`TTransactionType`\>(`transactionWithReceipts`): `Transaction`\&lt;`TTransactionType`\>

Decode the raw payload of the transaction.

#### Type Parameters

• **TTransactionType** = `void`

#### Parameters

• **transactionWithReceipts**

The transaction with receipts object.

• **transactionWithReceipts.id**: `string`

• **transactionWithReceipts.rawPayload**: `string`

• **transactionWithReceipts.status?**: `null` \| `object` \| `object` \| `object` \| `object`

#### Returns

`Transaction`\&lt;`TTransactionType`\>

The decoded transaction.

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:272](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-response/transaction-response.ts#L272)

***

### fetch()

> **fetch**(): `Promise`\&lt;`object`\>

Fetch the transaction with receipts from the provider.

#### Returns

`Promise`\&lt;`object`\>

Transaction with receipts query result.

##### id

> **id**: `string`

##### rawPayload

> **rawPayload**: `string`

##### status?

> `optional` **status**: `null` \| `object` \| `object` \| `object` \| `object`

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:241](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-response/transaction-response.ts#L241)

***

### getTransactionSummary()

> **getTransactionSummary**\&lt;`TTransactionType`\>(`contractsAbiMap`?): `Promise`\&lt;[`TransactionSummary`](../index.md#transactionsummaryttransactiontype)\&lt;`TTransactionType`\>\>

Retrieves the TransactionSummary. If the `gqlTransaction` is not set, it will
fetch it from the provider

#### Type Parameters

• **TTransactionType** = `void`

#### Parameters

• **contractsAbiMap?**: [`AbiMap`](../index.md#abimap)

The contracts ABI map.

#### Returns

`Promise`\&lt;[`TransactionSummary`](../index.md#transactionsummaryttransactiontype)\&lt;`TTransactionType`\>\>

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:286](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-response/transaction-response.ts#L286)

***

### wait()

> **wait**\&lt;`TTransactionType`\>(`contractsAbiMap`?): `Promise`\&lt;`TransactionResult`\&lt;`TTransactionType`\>\>

Waits for transaction to complete and returns the result.

#### Type Parameters

• **TTransactionType** = `void`

#### Parameters

• **contractsAbiMap?**: [`AbiMap`](../index.md#abimap)

The contracts ABI map.

#### Returns

`Promise`\&lt;`TransactionResult`\&lt;`TTransactionType`\>\>

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:407](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-response/transaction-response.ts#L407)

***

### waitForResult()

> **waitForResult**\&lt;`TTransactionType`\>(`contractsAbiMap`?): `Promise`\&lt;`TransactionResult`\&lt;`TTransactionType`\>\>

Waits for transaction to complete and returns the result.

#### Type Parameters

• **TTransactionType** = `void`

#### Parameters

• **contractsAbiMap?**: [`AbiMap`](../index.md#abimap)

#### Returns

`Promise`\&lt;`TransactionResult`\&lt;`TTransactionType`\>\>

The completed transaction result

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:395](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-response/transaction-response.ts#L395)

***

### create()

> `static` **create**(`id`, `provider`, `abis`?): `Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

Async constructor for `TransactionResponse`. This method can be used to create
an instance of `TransactionResponse` and wait for the transaction to be fetched
from the chain, ensuring that the `gqlTransaction` property is set.

#### Parameters

• **id**: `string`

The transaction ID.

• **provider**: [`Provider`](Provider.md)

The provider.

• **abis?**: [`JsonAbisFromAllCalls`](../index.md#jsonabisfromallcalls)

#### Returns

`Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:160](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/account/src/providers/transaction-response/transaction-response.ts#L160)
