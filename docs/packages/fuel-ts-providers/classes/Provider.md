---
layout: default
title: Provider
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: Provider

[@fuel-ts/providers](../index.md).Provider

A provider for connecting to a Fuel node

## Constructors

### constructor

• **new Provider**(`url`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Defined in

[providers/src/provider.ts:153](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L153)

## Properties

### operations

• **operations**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dryRun` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `encodedTransaction`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlDryRunMutation`](../namespaces/internal.md#gqldryrunmutation)\> |
| `endSession` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `sessionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlEndSessionMutation`](../namespaces/internal.md#gqlendsessionmutation)\> |
| `execute` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `op`: `string` ; `sessionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlExecuteMutation`](../namespaces/internal.md#gqlexecutemutation)\> |
| `getBlock` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `blockHeight?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `blockId?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetBlockQuery`](../namespaces/internal.md#gqlgetblockquery)\> |
| `getBlockWithTransactions` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `blockHeight?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `blockId?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetBlockWithTransactionsQuery`](../namespaces/internal.md#gqlgetblockwithtransactionsquery)\> |
| `getBlocks` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetBlocksQuery`](../namespaces/internal.md#gqlgetblocksquery)\> |
| `getChain` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ [key: string]: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetChainQuery`](../namespaces/internal.md#gqlgetchainquery)\> |
| `getCoin` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `coinId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetCoinQuery`](../namespaces/internal.md#gqlgetcoinquery)\> |
| `getCoins` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `filter`: [`GqlCoinFilterInput`](../namespaces/internal.md#gqlcoinfilterinput) ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetCoinsQuery`](../namespaces/internal.md#gqlgetcoinsquery)\> |
| `getCoinsToSpend` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `maxInputs?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `owner`: `string` ; `spendQuery`: [`GqlSpendQueryElementInput`](../namespaces/internal.md#gqlspendqueryelementinput) \| [`GqlSpendQueryElementInput`](../namespaces/internal.md#gqlspendqueryelementinput)[]  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetCoinsToSpendQuery`](../namespaces/internal.md#gqlgetcoinstospendquery)\> |
| `getTransaction` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `transactionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionQuery`](../namespaces/internal.md#gqlgettransactionquery)\> |
| `getTransactionWithReceipts` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `transactionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionWithReceiptsQuery`](../namespaces/internal.md#gqlgettransactionwithreceiptsquery)\> |
| `getTransactions` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionsQuery`](../namespaces/internal.md#gqlgettransactionsquery)\> |
| `getTransactionsByOwner` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `owner`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionsByOwnerQuery`](../namespaces/internal.md#gqlgettransactionsbyownerquery)\> |
| `getVersion` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ [key: string]: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetVersionQuery`](../namespaces/internal.md#gqlgetversionquery)\> |
| `reset` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `sessionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlResetMutation`](../namespaces/internal.md#gqlresetmutation)\> |
| `startSession` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ [key: string]: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlStartSessionMutation`](../namespaces/internal.md#gqlstartsessionmutation)\> |
| `submit` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `encodedTransaction`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlSubmitMutation`](../namespaces/internal.md#gqlsubmitmutation)\> |

#### Defined in

[providers/src/provider.ts:151](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L151)

___

### url

• **url**: `string`

## Methods

### call

▸ **call**(`transactionRequest`): `Promise`<[`CallResult`](../index.md#callresult)\>

Executes a transaction without actually submitting it to the chain

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](../index.md#transactionrequest) |

#### Returns

`Promise`<[`CallResult`](../index.md#callresult)\>

#### Defined in

[providers/src/provider.ts:233](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L233)

___

### getBlock

▸ **getBlock**(`idOrHeight`): `Promise`<``null`` \| [`Block`](../index.md#block)\>

Returns block matching the given ID or type

#### Parameters

| Name | Type |
| :------ | :------ |
| `idOrHeight` | `string` \| `number` |

#### Returns

`Promise`<``null`` \| [`Block`](../index.md#block)\>

#### Defined in

[providers/src/provider.ts:444](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L444)

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`BigNumber`\>

Returns the current block number

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[providers/src/provider.ts:182](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L182)

___

### getBlockWithTransactions

▸ **getBlockWithTransactions**(`idOrHeight`): `Promise`<``null`` \| [`Block`](../index.md#block) & { `transactions`: [`Transaction`](../../fuel-ts-transactions/index.md#transaction)[]  }\>

Returns block matching the given ID or type, including transaction data

#### Parameters

| Name | Type |
| :------ | :------ |
| `idOrHeight` | `string` \| `number` |

#### Returns

`Promise`<``null`` \| [`Block`](../index.md#block) & { `transactions`: [`Transaction`](../../fuel-ts-transactions/index.md#transaction)[]  }\>

#### Defined in

[providers/src/provider.ts:475](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L475)

___

### getCoins

▸ **getCoins**(`owner`, `assetId?`, `paginationArgs?`): `Promise`<[`Coin`](../index.md#coin)[]\>

Returns coins for the given owner

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `BytesLike` |
| `assetId?` | `BytesLike` |
| `paginationArgs?` | [`CursorPaginationArgs`](../index.md#cursorpaginationargs) |

#### Returns

`Promise`<[`Coin`](../index.md#coin)[]\>

#### Defined in

[providers/src/provider.ts:247](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L247)

___

### getCoinsToSpend

▸ **getCoinsToSpend**(`owner`, `spendQuery`, `maxInputs?`): `Promise`<[`Coin`](../index.md#coin)[]\>

Returns coins for the given owner satisfying the spend query

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `string` |
| `spendQuery` | { `amount`: `BigNumber` ; `assetId`: `string`  }[] |
| `maxInputs?` | `number` |

#### Returns

`Promise`<[`Coin`](../index.md#coin)[]\>

#### Defined in

[providers/src/provider.ts:277](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L277)

___

### getNetwork

▸ **getNetwork**(): `Promise`<`Network`\>

Returns the network configuration of the connected Fuel node

#### Returns

`Promise`<`Network`\>

#### Defined in

[providers/src/provider.ts:172](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L172)

___

### getTransaction

▸ **getTransaction**(`transactionId`): `Promise`<``null`` \| [`Transaction`](../../fuel-ts-transactions/index.md#transaction)\>

Get transaction with the given ID

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionId` | `string` |

#### Returns

`Promise`<``null`` \| [`Transaction`](../../fuel-ts-transactions/index.md#transaction)\>

#### Defined in

[providers/src/provider.ts:509](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L509)

___

### getVersion

▸ **getVersion**(): `Promise`<`string`\>

Returns the version of the connected Fuel node

#### Returns

`Promise`<`string`\>

#### Defined in

[providers/src/provider.ts:164](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L164)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequest`): `Promise`<[`TransactionResponse`](../index.md#transactionresponse)\>

Submits a transaction to the chain to be executed

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](../index.md#transactionrequest) |

#### Returns

`Promise`<[`TransactionResponse`](../index.md#transactionresponse)\>

#### Defined in

[providers/src/provider.ts:190](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L190)

___

### submitContract

▸ **submitContract**(`bytecode`, `salt?`): `Promise`<{ `contractId`: `string` ; `request`: [`TransactionRequest`](../index.md#transactionrequest) ; `transactionId`: `string`  }\>

Submits a Create transaction to the chain for contract deployment

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `bytecode` | `BytesLike` | `undefined` |
| `salt` | `BytesLike` | `'0x0000000000000000000000000000000000000000000000000000000000000000'` |

#### Returns

`Promise`<{ `contractId`: `string` ; `request`: [`TransactionRequest`](../index.md#transactionrequest) ; `transactionId`: `string`  }\>

#### Defined in

[providers/src/provider.ts:310](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L310)

___

### submitContractCall

▸ **submitContractCall**(`contractId`, `data`): `Promise`<{ `id`: `string` ; `request`: [`TransactionRequest`](../index.md#transactionrequest) ; `wait`: () => `Promise`<[`TransactionResult`](../index.md#transactionresult) & { `data`: `Uint8Array`  }\>  }\>

Submits a Script transaction to the chain for contract execution

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractId` | `string` |
| `data` | `BytesLike` |

#### Returns

`Promise`<{ `id`: `string` ; `request`: [`TransactionRequest`](../index.md#transactionrequest) ; `wait`: () => `Promise`<[`TransactionResult`](../index.md#transactionresult) & { `data`: `Uint8Array`  }\>  }\>

#### Defined in

[providers/src/provider.ts:350](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L350)
