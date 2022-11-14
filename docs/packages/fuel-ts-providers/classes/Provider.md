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

[packages/providers/src/provider.ts:186](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L186)

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
| `getContract` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `contractId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetContractQuery`](../namespaces/internal.md#gqlgetcontractquery)\> |
| `getInfo` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `[key: string]`: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetInfoQuery`](../namespaces/internal.md#gqlgetinfoquery)\> |
| `getMessageProof` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `messageId`: `any` ; `transactionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetMessageProofQuery`](../namespaces/internal.md#gqlgetmessageproofquery)\> |
| `getMessages` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `owner`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetMessagesQuery`](../namespaces/internal.md#gqlgetmessagesquery)\> |
| `getResourcesToSpend` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `excludedIds?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<[`GqlExcludeInput`](../namespaces/internal.md#gqlexcludeinput)\> ; `owner`: `string` ; `queryPerAsset`: [`GqlSpendQueryElementInput`](../namespaces/internal.md#gqlspendqueryelementinput) \| [`GqlSpendQueryElementInput`](../namespaces/internal.md#gqlspendqueryelementinput)[]  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetResourcesToSpendQuery`](../namespaces/internal.md#gqlgetresourcestospendquery)\> |
| `getTransaction` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `transactionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionQuery`](../namespaces/internal.md#gqlgettransactionquery)\> |
| `getTransactionWithReceipts` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `transactionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionWithReceiptsQuery`](../namespaces/internal.md#gqlgettransactionwithreceiptsquery)\> |
| `getTransactions` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\>  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionsQuery`](../namespaces/internal.md#gqlgettransactionsquery)\> |
| `getTransactionsByOwner` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `after?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `before?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`string`\> ; `first?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `last?`: [`InputMaybe`](../namespaces/internal.md#inputmaybe)<`number`\> ; `owner`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetTransactionsByOwnerQuery`](../namespaces/internal.md#gqlgettransactionsbyownerquery)\> |
| `getVersion` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `[key: string]`: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetVersionQuery`](../namespaces/internal.md#gqlgetversionquery)\> |
| `reset` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `sessionId`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlResetMutation`](../namespaces/internal.md#gqlresetmutation)\> |
| `startSession` | (`variables?`: [`Exact`](../namespaces/internal.md#exact)<{ `[key: string]`: `never`;  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlStartSessionMutation`](../namespaces/internal.md#gqlstartsessionmutation)\> |
| `submit` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `encodedTransaction`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlSubmitMutation`](../namespaces/internal.md#gqlsubmitmutation)\> |

#### Defined in

[packages/providers/src/provider.ts:184](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L184)

___

### url

• **url**: `string`

GraphQL endpoint of the Fuel node

#### Defined in

[packages/providers/src/provider.ts:188](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L188)

## Methods

### addMissingVariableOutputs

▸ **addMissingVariableOutputs**(`transactionRequest`, `tries?`): `Promise`<`void`\>

Will dryRun a transaction and check for missing VariableOutputs

If there are missing VariableOutputs
`addVariableOutputs` is called on the transaction.
This process is done at most 10 times

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](../index.md#transactionrequest) | `undefined` |
| `tries` | `number` | `0` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/providers/src/provider.ts:302](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L302)

___

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

[packages/providers/src/provider.ts:664](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L664)

___

### call

▸ **call**(`transactionRequestLike`, `__namedParameters?`): `Promise`<[`CallResult`](../index.md#callresult)\>

Executes a transaction without actually submitting it to the chain
If the transaction is missing VariableOuputs
the transaction will be mutate and VariableOuputs will be added

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../index.md#transactionrequestlike) |
| `__namedParameters` | [`ProviderCallParams`](../index.md#providercallparams) |

#### Returns

`Promise`<[`CallResult`](../index.md#callresult)\>

#### Defined in

[packages/providers/src/provider.ts:277](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L277)

___

### getBalance

▸ **getBalance**(`owner`, `assetId`): `Promise`<[`BN`](internal-BN.md)\>

Returns the balance for the given owner for the given asset ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) | The address to get coins for |
| `assetId` | `BytesLike` | The asset ID of coins to get |

#### Returns

`Promise`<[`BN`](internal-BN.md)\>

#### Defined in

[packages/providers/src/provider.ts:558](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L558)

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

[packages/providers/src/provider.ts:574](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L574)

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

[packages/providers/src/provider.ts:471](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L471)

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<[`BN`](internal-BN.md)\>

Returns the current block number

#### Returns

`Promise`<[`BN`](internal-BN.md)\>

#### Defined in

[packages/providers/src/provider.ts:217](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L217)

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

[packages/providers/src/provider.ts:501](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L501)

___

### getChain

▸ **getChain**(): `Promise`<[`ChainInfo`](../index.md#chaininfo)\>

Returns chain information

#### Returns

`Promise`<[`ChainInfo`](../index.md#chaininfo)\>

#### Defined in

[packages/providers/src/provider.ts:233](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L233)

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

[packages/providers/src/provider.ts:385](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L385)

___

### getCoinsToSpend

▸ **getCoinsToSpend**(`owner`, `quantities`, `excludedIds?`): `Promise`<[`Coin`](../index.md#coin)[]\>

Returns coins for the given owner satisfying the spend query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) | The address to get coins for |
| `quantities` | [`CoinQuantityLike`](../index.md#coinquantitylike)[] | The quantities to get |
| `excludedIds?` | `BytesLike`[] | IDs of coins to exclude |

#### Returns

`Promise`<[`Coin`](../index.md#coin)[]\>

#### Defined in

[packages/providers/src/provider.ts:445](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L445)

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

[packages/providers/src/provider.ts:547](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L547)

___

### getMessageProof

▸ **getMessageProof**(`transactionId`, `messageId`): `Promise`<``null`` \| [`MessageProof`](../index.md#messageproof)\>

Returns Message Proof for given transaction id and the message id from MessageOut receipt

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The transaction to get message from |
| `messageId` | `string` | The message id from MessageOut receipt |

#### Returns

`Promise`<``null`` \| [`MessageProof`](../index.md#messageproof)\>

#### Defined in

[packages/providers/src/provider.ts:625](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L625)

___

### getMessages

▸ **getMessages**(`address`, `paginationArgs?`): `Promise`<[`Message`](../index.md#message)[]\>

Returns message for the given address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) | The address to get message from |
| `paginationArgs?` | [`CursorPaginationArgs`](../index.md#cursorpaginationargs) | Pagination arguments |

#### Returns

`Promise`<[`Message`](../index.md#message)[]\>

#### Defined in

[packages/providers/src/provider.ts:597](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L597)

___

### getNetwork

▸ **getNetwork**(): `Promise`<`Network`\>

Returns the network configuration of the connected Fuel node

#### Returns

`Promise`<`Network`\>

#### Defined in

[packages/providers/src/provider.ts:207](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L207)

___

### getNodeInfo

▸ **getNodeInfo**(): `Promise`<[`NodeInfo`](../index.md#nodeinfo)\>

Returns node information

#### Returns

`Promise`<[`NodeInfo`](../index.md#nodeinfo)\>

#### Defined in

[packages/providers/src/provider.ts:225](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L225)

___

### getResourcesToSpend

▸ **getResourcesToSpend**(`owner`, `quantities`, `excludedIds?`): `Promise`<({ `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`CoinStatus`](../enums/CoinStatus.md) ; `utxoId`: `string`  } \| { `__typename`: ``"Message"`` ; `amount`: `string` ; `daHeight`: `string` ; `data`: `string` ; `fuelBlockSpend?`: ``null`` \| `string` ; `nonce`: `string` ; `recipient`: `string` ; `sender`: `string`  })[][]\>

Returns resources for the given owner satisfying the spend query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) | The address to get coins for |
| `quantities` | [`CoinQuantityLike`](../index.md#coinquantitylike)[] | The quantities to get |
| `excludedIds?` | [`ExcludeResourcesOption`](../index.md#excluderesourcesoption) | IDs of excluded resources from the selection. |

#### Returns

`Promise`<({ `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`CoinStatus`](../enums/CoinStatus.md) ; `utxoId`: `string`  } \| { `__typename`: ``"Message"`` ; `amount`: `string` ; `daHeight`: `string` ; `data`: `string` ; `fuelBlockSpend?`: ``null`` \| `string` ; `nonce`: `string` ; `recipient`: `string` ; `sender`: `string`  })[][]\>

#### Defined in

[packages/providers/src/provider.ts:415](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L415)

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

[packages/providers/src/provider.ts:534](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L534)

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

[packages/providers/src/provider.ts:354](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L354)

___

### getVersion

▸ **getVersion**(): `Promise`<`string`\>

Returns the version of the connected Fuel node

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/providers/src/provider.ts:197](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L197)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`): `Promise`<[`TransactionResponse`](TransactionResponse.md)\>

Submits a transaction to the chain to be executed
If the transaction is missing VariableOuputs
the transaction will be mutate and VariableOuputs will be added

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../index.md#transactionrequestlike) |

#### Returns

`Promise`<[`TransactionResponse`](TransactionResponse.md)\>

#### Defined in

[packages/providers/src/provider.ts:243](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L243)

___

### simulate

▸ **simulate**(`transactionRequestLike`): `Promise`<[`CallResult`](../index.md#callresult)\>

Executes a signed transaction without applying the states changes
on the chain.
If the transaction is missing VariableOuputs
the transaction will be mutate and VariableOuputs will be added

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../index.md#transactionrequestlike) |

#### Returns

`Promise`<[`CallResult`](../index.md#callresult)\>

#### Defined in

[packages/providers/src/provider.ts:330](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L330)

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

[packages/providers/src/provider.ts:718](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L718)
