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

[packages/providers/src/provider.ts:126](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L126)

## Properties

### operations

• **operations**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dryRun` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `encodedTransaction`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlDryRunMutation`](../namespaces/internal.md#gqldryrunmutation)\> |
| `endSession` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `sessionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlEndSessionMutation`](../namespaces/internal.md#gqlendsessionmutation)\> |
| `execute` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `op`: `string` ; `sessionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlExecuteMutation`](../namespaces/internal.md#gqlexecutemutation)\> |
| `getBalance` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `assetId`: `string` ; `owner`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetBalanceQuery`](../namespaces/internal.md#gqlgetbalancequery)\> |
| `getBalances` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `filter`: [`GqlBalanceFilterInput`](../namespaces/internal.md#gqlbalancefilterinput) ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetBalancesQuery`](../namespaces/internal.md#gqlgetbalancesquery)\> |
| `getBlock` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `blockHeight?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `blockId?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetBlockQuery`](../namespaces/internal.md#gqlgetblockquery)\> |
| `getBlockWithTransactions` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `blockHeight?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `blockId?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetBlockWithTransactionsQuery`](../namespaces/internal.md#gqlgetblockwithtransactionsquery)\> |
| `getBlocks` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetBlocksQuery`](../namespaces/internal.md#gqlgetblocksquery)\> |
| `getChain` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `[key: string]`: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetChainQuery`](../namespaces/internal.md#gqlgetchainquery)\> |
| `getCoin` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `coinId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetCoinQuery`](../namespaces/internal.md#gqlgetcoinquery)\> |
| `getCoins` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `filter`: [`GqlCoinFilterInput`](../namespaces/internal.md#gqlcoinfilterinput) ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetCoinsQuery`](../namespaces/internal.md#gqlgetcoinsquery)\> |
| `getCoinsToSpend` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `maxInputs?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `owner`: `string` ; `spendQuery`: [`GqlSpendQueryElementInput`](../namespaces/internal.md#gqlspendqueryelementinput) \| [`GqlSpendQueryElementInput`](../namespaces/internal.md#gqlspendqueryelementinput)[]  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetCoinsToSpendQuery`](../namespaces/internal.md#gqlgetcoinstospendquery)\> |
| `getContract` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `contractId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetContractQuery`](../namespaces/internal.md#gqlgetcontractquery)\> |
| `getTransaction` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `transactionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionQuery`](../namespaces/internal.md#gqlgettransactionquery)\> |
| `getTransactionWithReceipts` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `transactionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionWithReceiptsQuery`](../namespaces/internal.md#gqlgettransactionwithreceiptsquery)\> |
| `getTransactions` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionsQuery`](../namespaces/internal.md#gqlgettransactionsquery)\> |
| `getTransactionsByOwner` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `owner`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionsByOwnerQuery`](../namespaces/internal.md#gqlgettransactionsbyownerquery)\> |
| `getVersion` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `[key: string]`: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetVersionQuery`](../namespaces/internal.md#gqlgetversionquery)\> |
| `reset` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `sessionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlResetMutation`](../namespaces/internal.md#gqlresetmutation)\> |
| `startSession` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `[key: string]`: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlStartSessionMutation`](../namespaces/internal.md#gqlstartsessionmutation)\> |
| `submit` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `encodedTransaction`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlSubmitMutation`](../namespaces/internal.md#gqlsubmitmutation)\> |

#### Defined in

[packages/providers/src/provider.ts:124](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L124)

___

### url

• **url**: `string`

## Methods

### call

▸ **call**(`transactionRequestLike`): `Promise`<[`CallResult`](../index.md#callresult)\>

Executes a transaction without actually submitting it to the chain

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../index.md#transactionrequestlike) |

#### Returns

`Promise`<[`CallResult`](../index.md#callresult)\>

#### Defined in

[packages/providers/src/provider.ts:207](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L207)

___

### getBalance

▸ **getBalance**(`owner`, `assetId`): `Promise`<`BigNumber`\>

Returns the balance for the given owner for the given asset ID

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `BytesLike` |
| `assetId` | `BytesLike` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[packages/providers/src/provider.ts:372](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L372)

___

### getBalances

▸ **getBalances**(`owner`, `paginationArgs?`): `Promise`<[`CoinQuantity`](../index.md#coinquantity)[]\>

Returns balances for the given owner

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `BytesLike` |
| `paginationArgs?` | [`CursorPaginationArgs`](../index.md#cursorpaginationargs) |

#### Returns

`Promise`<[`CoinQuantity`](../index.md#coinquantity)[]\>

#### Defined in

[packages/providers/src/provider.ts:388](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L388)

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

[packages/providers/src/provider.ts:283](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L283)

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`BigNumber`\>

Returns the current block number

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[packages/providers/src/provider.ts:155](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L155)

___

### getBlockWithTransactions

▸ **getBlockWithTransactions**(`idOrHeight`): `Promise`<``null`` \| [`Block`](../index.md#block) & { `transactions`: `Transaction`[]  }\>

Returns block matching the given ID or type, including transaction data

#### Parameters

| Name | Type |
| :------ | :------ |
| `idOrHeight` | `string` \| `number` |

#### Returns

`Promise`<``null`` \| [`Block`](../index.md#block) & { `transactions`: `Transaction`[]  }\>

#### Defined in

[packages/providers/src/provider.ts:314](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L314)

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

[packages/providers/src/provider.ts:220](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L220)

___

### getCoinsToSpend

▸ **getCoinsToSpend**(`owner`, `quantities`, `maxInputs?`): `Promise`<[`Coin`](../index.md#coin)[]\>

Returns coins for the given owner satisfying the spend query

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `BytesLike` |
| `quantities` | [`CoinQuantityLike`](../index.md#coinquantitylike)[] |
| `maxInputs?` | `number` |

#### Returns

`Promise`<[`Coin`](../index.md#coin)[]\>

#### Defined in

[packages/providers/src/provider.ts:250](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L250)

___

### getContract

▸ **getContract**(`contractId`): `Promise`<``null`` \| [`ContractResult`](../index.md#contractresult)\>

Get deployed contract with the given ID

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractId` | `string` |

#### Returns

`Promise`<``null`` \| [`ContractResult`](../index.md#contractresult)\>

contract bytecode and contract id

#### Defined in

[packages/providers/src/provider.ts:361](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L361)

___

### getNetwork

▸ **getNetwork**(): `Promise`<`Network`\>

Returns the network configuration of the connected Fuel node

#### Returns

`Promise`<`Network`\>

#### Defined in

[packages/providers/src/provider.ts:145](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L145)

___

### getTransaction

▸ **getTransaction**(`transactionId`): `Promise`<``null`` \| `Transaction`\>

Get transaction with the given ID

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionId` | `string` |

#### Returns

`Promise`<``null`` \| `Transaction`\>

#### Defined in

[packages/providers/src/provider.ts:348](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L348)

___

### getVersion

▸ **getVersion**(): `Promise`<`string`\>

Returns the version of the connected Fuel node

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/providers/src/provider.ts:137](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L137)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`): `Promise`<[`TransactionResponse`](../index.md#transactionresponse)\>

Submits a transaction to the chain to be executed

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../index.md#transactionrequestlike) |

#### Returns

`Promise`<[`TransactionResponse`](../index.md#transactionresponse)\>

#### Defined in

[packages/providers/src/provider.ts:163](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L163)
