---
layout: default
title: Provider
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: Provider

[@fuel-ts/providers](../index.md).Provider

## Constructors

### constructor

• **new Provider**(`url`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

## Properties

### operations

• **operations**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dryRun` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `encodedTransaction`: `string` ; `utxoValidation?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`boolean`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlDryRunMutation`](../namespaces/internal.md#gqldryrunmutation)\> |
| `endSession` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `sessionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlEndSessionMutation`](../namespaces/internal.md#gqlendsessionmutation)\> |
| `execute` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `op`: `string` ; `sessionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlExecuteMutation`](../namespaces/internal.md#gqlexecutemutation)\> |
| `getBalance` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `assetId`: `string` ; `owner`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetBalanceQuery`](../namespaces/internal.md#gqlgetbalancequery)\> |
| `getBalances` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `filter`: [`GqlBalanceFilterInput`](../namespaces/internal.md#gqlbalancefilterinput) ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetBalancesQuery`](../namespaces/internal.md#gqlgetbalancesquery)\> |
| `getBlock` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `blockHeight?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `blockId?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetBlockQuery`](../namespaces/internal.md#gqlgetblockquery)\> |
| `getBlockWithTransactions` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `blockHeight?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `blockId?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetBlockWithTransactionsQuery`](../namespaces/internal.md#gqlgetblockwithtransactionsquery)\> |
| `getBlocks` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetBlocksQuery`](../namespaces/internal.md#gqlgetblocksquery)\> |
| `getChain` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ [key: string]: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetChainQuery`](../namespaces/internal.md#gqlgetchainquery)\> |
| `getCoin` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `coinId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetCoinQuery`](../namespaces/internal.md#gqlgetcoinquery)\> |
| `getCoins` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `filter`: [`GqlCoinFilterInput`](../namespaces/internal.md#gqlcoinfilterinput) ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetCoinsQuery`](../namespaces/internal.md#gqlgetcoinsquery)\> |
| `getCoinsToSpend` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `excludedIds?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string` \| `string`[]\> ; `maxInputs?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `owner`: `string` ; `spendQuery`: [`GqlSpendQueryElementInput`](../namespaces/internal.md#gqlspendqueryelementinput) \| [`GqlSpendQueryElementInput`](../namespaces/internal.md#gqlspendqueryelementinput)[]  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetCoinsToSpendQuery`](../namespaces/internal.md#gqlgetcoinstospendquery)\> |
| `getContract` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `contractId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetContractQuery`](../namespaces/internal.md#gqlgetcontractquery)\> |
| `getInfo` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ [key: string]: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetInfoQuery`](../namespaces/internal.md#gqlgetinfoquery)\> |
| `getMessages` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `owner`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetMessagesQuery`](../namespaces/internal.md#gqlgetmessagesquery)\> |
| `getTransaction` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `transactionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionQuery`](../namespaces/internal.md#gqlgettransactionquery)\> |
| `getTransactionWithReceipts` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `transactionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionWithReceiptsQuery`](../namespaces/internal.md#gqlgettransactionwithreceiptsquery)\> |
| `getTransactions` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionsQuery`](../namespaces/internal.md#gqlgettransactionsquery)\> |
| `getTransactionsByOwner` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `owner`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionsByOwnerQuery`](../namespaces/internal.md#gqlgettransactionsbyownerquery)\> |
| `getVersion` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ [key: string]: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetVersionQuery`](../namespaces/internal.md#gqlgetversionquery)\> |
| `reset` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `sessionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlResetMutation`](../namespaces/internal.md#gqlresetmutation)\> |
| `startSession` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ [key: string]: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlStartSessionMutation`](../namespaces/internal.md#gqlstartsessionmutation)\> |
| `submit` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `encodedTransaction`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlSubmitMutation`](../namespaces/internal.md#gqlsubmitmutation)\> |

#### Defined in

[packages/providers/src/provider.ts:178](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L178)

___

### url

• **url**: `string`

#### Defined in

[packages/providers/src/provider.ts:182](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L182)

## Methods

### buildSpendPredicate

▸ **buildSpendPredicate**(`predicate`, `amountToSpend`, `receiverAddress`, `predicateData?`, `assetId?`, `predicateOptions?`, `walletAddress?`): `Promise`<[`ScriptTransactionRequest`](ScriptTransactionRequest.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `predicate` | [`AbstractPredicate`](internal-AbstractPredicate.md) | `undefined` |
| `amountToSpend` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` |
| `receiverAddress` | [`AbstractAddress`](internal-AbstractAddress.md) | `undefined` |
| `predicateData?` | [`InputValue`](../namespaces/internal.md#inputvalue)[] | `undefined` |
| `assetId` | `BytesLike` | `NativeAssetId` |
| `predicateOptions?` | [`BuildPredicateOptions`](../index.md#buildpredicateoptions) | `undefined` |
| `walletAddress?` | [`AbstractAddress`](internal-AbstractAddress.md) | `undefined` |

#### Returns

`Promise`<[`ScriptTransactionRequest`](ScriptTransactionRequest.md)\>

___

### call

▸ **call**(`transactionRequestLike`, `__namedParameters?`): `Promise`<[`CallResult`](../index.md#callresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../index.md#transactionrequestlike) |
| `__namedParameters` | [`ProviderCallParams`](../index.md#providercallparams) |

#### Returns

`Promise`<[`CallResult`](../index.md#callresult)\>

___

### getBalance

▸ **getBalance**(`owner`, `assetId`): `Promise`<[`BN`](internal-BN.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) |
| `assetId` | `BytesLike` |

#### Returns

`Promise`<[`BN`](internal-BN.md)\>

___

### getBalances

▸ **getBalances**(`owner`, `paginationArgs?`): `Promise`<[`CoinQuantity`](../index.md#coinquantity)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) |
| `paginationArgs?` | [`CursorPaginationArgs`](../index.md#cursorpaginationargs) |

#### Returns

`Promise`<[`CoinQuantity`](../index.md#coinquantity)[]\>

___

### getBlock

▸ **getBlock**(`idOrHeight`): `Promise`<``null`` \| [`Block`](../index.md#block)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `idOrHeight` | `string` \| `number` |

#### Returns

`Promise`<``null`` \| [`Block`](../index.md#block)\>

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<[`BN`](internal-BN.md)\>

#### Returns

`Promise`<[`BN`](internal-BN.md)\>

___

### getBlockWithTransactions

▸ **getBlockWithTransactions**(`idOrHeight`): `Promise`<``null`` \| [`Block`](../index.md#block) & { `transactions`: [`Transaction`](../namespaces/internal.md#transaction)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `idOrHeight` | `string` \| `number` |

#### Returns

`Promise`<``null`` \| [`Block`](../index.md#block) & { `transactions`: [`Transaction`](../namespaces/internal.md#transaction)[]  }\>

___

### getChain

▸ **getChain**(): `Promise`<[`ChainInfo`](../index.md#chaininfo)\>

#### Returns

`Promise`<[`ChainInfo`](../index.md#chaininfo)\>

___

### getCoins

▸ **getCoins**(`owner`, `assetId?`, `paginationArgs?`): `Promise`<[`Coin`](../index.md#coin)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) |
| `assetId?` | `BytesLike` |
| `paginationArgs?` | [`CursorPaginationArgs`](../index.md#cursorpaginationargs) |

#### Returns

`Promise`<[`Coin`](../index.md#coin)[]\>

___

### getCoinsToSpend

▸ **getCoinsToSpend**(`owner`, `quantities`, `maxInputs?`, `excludedIds?`): `Promise`<[`Coin`](../index.md#coin)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) |
| `quantities` | [`CoinQuantityLike`](../index.md#coinquantitylike)[] |
| `maxInputs?` | `number` |
| `excludedIds?` | `BytesLike`[] |

#### Returns

`Promise`<[`Coin`](../index.md#coin)[]\>

___

### getContract

▸ **getContract**(`contractId`): `Promise`<``null`` \| [`ContractResult`](../index.md#contractresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractId` | `string` |

#### Returns

`Promise`<``null`` \| [`ContractResult`](../index.md#contractresult)\>

___

### getMessages

▸ **getMessages**(`address`, `paginationArgs?`): `Promise`<[`Message`](../index.md#message)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) |
| `paginationArgs?` | [`CursorPaginationArgs`](../index.md#cursorpaginationargs) |

#### Returns

`Promise`<[`Message`](../index.md#message)[]\>

___

### getNetwork

▸ **getNetwork**(): `Promise`<`Network`\>

#### Returns

`Promise`<`Network`\>

___

### getNodeInfo

▸ **getNodeInfo**(): `Promise`<[`NodeInfo`](../index.md#nodeinfo)\>

#### Returns

`Promise`<[`NodeInfo`](../index.md#nodeinfo)\>

___

### getTransaction

▸ **getTransaction**(`transactionId`): `Promise`<``null`` \| [`Transaction`](../namespaces/internal.md#transaction)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionId` | `string` |

#### Returns

`Promise`<``null`` \| [`Transaction`](../namespaces/internal.md#transaction)\>

___

### getTransactionCost

▸ **getTransactionCost**(`transactionRequestLike`, `tolerance?`): `Promise`<[`TransactionCost`](../index.md#transactioncost)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../index.md#transactionrequestlike) | `undefined` |
| `tolerance` | `number` | `0.2` |

#### Returns

`Promise`<[`TransactionCost`](../index.md#transactioncost)\>

___

### getVersion

▸ **getVersion**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`): `Promise`<[`TransactionResponse`](TransactionResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../index.md#transactionrequestlike) |

#### Returns

`Promise`<[`TransactionResponse`](TransactionResponse.md)\>

___

### submitSpendPredicate

▸ **submitSpendPredicate**(`predicate`, `amountToSpend`, `receiverAddress`, `predicateData?`, `assetId?`, `options?`, `walletAddress?`): `Promise`<[`TransactionResult`](../index.md#transactionresult)<``"success"``\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `predicate` | [`AbstractPredicate`](internal-AbstractPredicate.md) | `undefined` |
| `amountToSpend` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` |
| `receiverAddress` | [`AbstractAddress`](internal-AbstractAddress.md) | `undefined` |
| `predicateData?` | [`InputValue`](../namespaces/internal.md#inputvalue)[] | `undefined` |
| `assetId` | `BytesLike` | `NativeAssetId` |
| `options?` | [`BuildPredicateOptions`](../index.md#buildpredicateoptions) | `undefined` |
| `walletAddress?` | [`AbstractAddress`](internal-AbstractAddress.md) | `undefined` |

#### Returns

`Promise`<[`TransactionResult`](../index.md#transactionresult)<``"success"``\>\>
