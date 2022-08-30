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

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | GraphQL endpoint of the Fuel node |

#### Defined in

[packages/providers/src/provider.ts:182](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L182)

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
| `getChain` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `[key: string]`: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetChainQuery`](../namespaces/internal.md#gqlgetchainquery)\> |
| `getCoin` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `coinId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetCoinQuery`](../namespaces/internal.md#gqlgetcoinquery)\> |
| `getCoins` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `filter`: [`GqlCoinFilterInput`](../namespaces/internal.md#gqlcoinfilterinput) ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetCoinsQuery`](../namespaces/internal.md#gqlgetcoinsquery)\> |
| `getCoinsToSpend` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `maxInputs?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `owner`: `string` ; `spendQuery`: [`GqlSpendQueryElementInput`](../namespaces/internal.md#gqlspendqueryelementinput) \| [`GqlSpendQueryElementInput`](../namespaces/internal.md#gqlspendqueryelementinput)[]  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetCoinsToSpendQuery`](../namespaces/internal.md#gqlgetcoinstospendquery)\> |
| `getContract` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `contractId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetContractQuery`](../namespaces/internal.md#gqlgetcontractquery)\> |
| `getInfo` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `[key: string]`: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetInfoQuery`](../namespaces/internal.md#gqlgetinfoquery)\> |
| `getTransaction` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `transactionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionQuery`](../namespaces/internal.md#gqlgettransactionquery)\> |
| `getTransactionWithReceipts` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `transactionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionWithReceiptsQuery`](../namespaces/internal.md#gqlgettransactionwithreceiptsquery)\> |
| `getTransactions` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionsQuery`](../namespaces/internal.md#gqlgettransactionsquery)\> |
| `getTransactionsByOwner` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `owner`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionsByOwnerQuery`](../namespaces/internal.md#gqlgettransactionsbyownerquery)\> |
| `getVersion` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `[key: string]`: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetVersionQuery`](../namespaces/internal.md#gqlgetversionquery)\> |
| `reset` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `sessionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlResetMutation`](../namespaces/internal.md#gqlresetmutation)\> |
| `startSession` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `[key: string]`: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlStartSessionMutation`](../namespaces/internal.md#gqlstartsessionmutation)\> |
| `submit` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `encodedTransaction`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlSubmitMutation`](../namespaces/internal.md#gqlsubmitmutation)\> |

#### Defined in

[packages/providers/src/provider.ts:180](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L180)

___

### url

• **url**: `string`

GraphQL endpoint of the Fuel node

#### Defined in

[packages/providers/src/provider.ts:184](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L184)

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

#### Defined in

[packages/providers/src/provider.ts:526](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L526)

___

### call

▸ **call**(`transactionRequestLike`, `__namedParameters?`): `Promise`<[`CallResult`](../index.md#callresult)\>

Executes a transaction without actually submitting it to the chain

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../index.md#transactionrequestlike) |
| `__namedParameters` | [`ProviderCallParams`](../index.md#providercallparams) |

#### Returns

`Promise`<[`CallResult`](../index.md#callresult)\>

#### Defined in

[packages/providers/src/provider.ts:274](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L274)

___

### getBalance

▸ **getBalance**(`owner`, `assetId`): `Promise`<`string`\>

Returns the balance for the given owner for the given asset ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) | The address to get coins for |
| `assetId` | `BytesLike` | The asset ID of coins to get |

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/providers/src/provider.ts:490](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L490)

___

### getBalances

▸ **getBalances**(`owner`, `paginationArgs?`): `Promise`<[`CoinQuantity`](../index.md#coinquantity)[]\>

Returns balances for the given owner

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) | The address to get coins for |
| `paginationArgs?` | [`CursorPaginationArgs`](../index.md#cursorpaginationargs) | Pagination arguments |

#### Returns

`Promise`<[`CoinQuantity`](../index.md#coinquantity)[]\>

#### Defined in

[packages/providers/src/provider.ts:506](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L506)

___

### getBlock

▸ **getBlock**(`idOrHeight`): `Promise`<``null`` \| [`Block`](../index.md#block)\>

Returns block matching the given ID or type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrHeight` | `string` \| `number` | ID or height of the block |

#### Returns

`Promise`<``null`` \| [`Block`](../index.md#block)\>

#### Defined in

[packages/providers/src/provider.ts:401](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L401)

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`string`\>

Returns the current block number

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/providers/src/provider.ts:213](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L213)

___

### getBlockWithTransactions

▸ **getBlockWithTransactions**(`idOrHeight`): `Promise`<``null`` \| [`Block`](../index.md#block) & { `transactions`: [`Transaction`](../namespaces/internal.md#transaction)[]  }\>

Returns block matching the given ID or type, including transaction data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrHeight` | `string` \| `number` | ID or height of the block |

#### Returns

`Promise`<``null`` \| [`Block`](../index.md#block) & { `transactions`: [`Transaction`](../namespaces/internal.md#transaction)[]  }\>

#### Defined in

[packages/providers/src/provider.ts:432](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L432)

___

### getChain

▸ **getChain**(): `Promise`<[`ChainInfo`](../index.md#chaininfo)\>

Returns chain information

#### Returns

`Promise`<[`ChainInfo`](../index.md#chaininfo)\>

#### Defined in

[packages/providers/src/provider.ts:229](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L229)

___

### getCoins

▸ **getCoins**(`owner`, `assetId?`, `paginationArgs?`): `Promise`<[`Coin`](../index.md#coin)[]\>

Returns coins for the given owner

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) | The address to get coins for |
| `assetId?` | `BytesLike` | The asset ID of coins to get |
| `paginationArgs?` | [`CursorPaginationArgs`](../index.md#cursorpaginationargs) | Pagination arguments |

#### Returns

`Promise`<[`Coin`](../index.md#coin)[]\>

#### Defined in

[packages/providers/src/provider.ts:338](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L338)

___

### getCoinsToSpend

▸ **getCoinsToSpend**(`owner`, `quantities`, `maxInputs?`): `Promise`<[`Coin`](../index.md#coin)[]\>

Returns coins for the given owner satisfying the spend query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) | The address to get coins for |
| `quantities` | [`CoinQuantityLike`](../index.md#coinquantitylike)[] | The quantitites to get |
| `maxInputs?` | `number` | Maximum number of coins to return |

#### Returns

`Promise`<[`Coin`](../index.md#coin)[]\>

#### Defined in

[packages/providers/src/provider.ts:368](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L368)

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

[packages/providers/src/provider.ts:479](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L479)

___

### getNetwork

▸ **getNetwork**(): `Promise`<`Network`\>

Returns the network configuration of the connected Fuel node

#### Returns

`Promise`<`Network`\>

#### Defined in

[packages/providers/src/provider.ts:203](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L203)

___

### getNodeInfo

▸ **getNodeInfo**(): `Promise`<[`NodeInfo`](../index.md#nodeinfo)\>

Returns node information

#### Returns

`Promise`<[`NodeInfo`](../index.md#nodeinfo)\>

#### Defined in

[packages/providers/src/provider.ts:221](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L221)

___

### getTransaction

▸ **getTransaction**(`transactionId`): `Promise`<``null`` \| [`Transaction`](../namespaces/internal.md#transaction)\>

Get transaction with the given ID

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionId` | `string` |

#### Returns

`Promise`<``null`` \| [`Transaction`](../namespaces/internal.md#transaction)\>

#### Defined in

[packages/providers/src/provider.ts:466](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L466)

___

### getTransactionCost

▸ **getTransactionCost**(`transactionRequestLike`, `tolerance?`): `Promise`<[`TransactionCost`](../index.md#transactioncost)\>

Returns a transaction cost to enable user
to set gasLimit and also reserve balance amounts
on the the transaction.

The tolerance is add on top of the gasUsed calculated
from the node, this create a safe margin costs like
change states on transfer that don't occur on the dryRun
transaction. The default value is 0.2 or 20%

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../index.md#transactionrequestlike) | `undefined` |
| `tolerance` | `number` | `0.2` |

#### Returns

`Promise`<[`TransactionCost`](../index.md#transactioncost)\>

#### Defined in

[packages/providers/src/provider.ts:300](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L300)

___

### getVersion

▸ **getVersion**(): `Promise`<`string`\>

Returns the version of the connected Fuel node

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/providers/src/provider.ts:193](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L193)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`): `Promise`<[`TransactionResponse`](TransactionResponse.md)\>

Submits a transaction to the chain to be executed

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../index.md#transactionrequestlike) |

#### Returns

`Promise`<[`TransactionResponse`](TransactionResponse.md)\>

#### Defined in

[packages/providers/src/provider.ts:237](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L237)

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

#### Defined in

[packages/providers/src/provider.ts:580](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L580)
