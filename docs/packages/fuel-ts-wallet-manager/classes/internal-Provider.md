---
layout: default
title: Provider
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: Provider

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).Provider

A provider for connecting to a Fuel node

## Constructors

### constructor

• **new Provider**(`url`, `options?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | GraphQL endpoint of the Fuel node |
| `options?` | [`ProviderOptions`](../namespaces/internal.md#provideroptions) | - |

#### Defined in

packages/providers/dist/index.d.ts:1211

## Properties

### createOperations

• `Private` **createOperations**: `any`

Create GraphQL client and set operations

#### Defined in

packages/providers/dist/index.d.ts:1217

___

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
| `getContractBalance` | (`variables`: [`Exact`](../namespaces/internal.md#exact)<{ `asset`: `string` ; `contract`: `string`  }\>, `requestHeaders?`: `HeadersInit`) => `Promise`<[`GqlGetContractBalanceQuery`](../namespaces/internal.md#gqlgetcontractbalancequery)\> |
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

packages/providers/dist/index.d.ts:1210

___

### options

• **options**: [`ProviderOptions`](../namespaces/internal.md#provideroptions)

#### Defined in

packages/providers/dist/index.d.ts:1209

___

### url

• **url**: `string`

GraphQL endpoint of the Fuel node

#### Defined in

packages/providers/dist/index.d.ts:1208

## Methods

### addMissingVariables

▸ **addMissingVariables**(`transactionRequest`): `Promise`<`void`\>

Will dryRun a transaction and check for missing VariableOutputs

If there are missing VariableOutputs
`addVariableOutputs` is called on the transaction.
This process is done at most 10 times

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](../namespaces/internal.md#transactionrequest) |

#### Returns

`Promise`<`void`\>

#### Defined in

packages/providers/dist/index.d.ts:1261

___

### call

▸ **call**(`transactionRequestLike`, `__namedParameters?`): `Promise`<[`CallResult`](../namespaces/internal.md#callresult)\>

Executes a transaction without actually submitting it to the chain
If the transaction is missing VariableOuputs
the transaction will be mutate and VariableOuputs will be added

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike) |
| `__namedParameters?` | [`ProviderCallParams`](../namespaces/internal.md#providercallparams) |

#### Returns

`Promise`<[`CallResult`](../namespaces/internal.md#callresult)\>

#### Defined in

packages/providers/dist/index.d.ts:1253

___

### connect

▸ **connect**(`url`): `void`

Connect provider to a different Fuel node url

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`void`

#### Defined in

packages/providers/dist/index.d.ts:1221

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

packages/providers/dist/index.d.ts:1335

___

### getBalances

▸ **getBalances**(`owner`, `paginationArgs?`): `Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

Returns balances for the given owner

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) | The address to get coins for |
| `paginationArgs?` | [`CursorPaginationArgs`](../namespaces/internal.md#cursorpaginationargs) | Pagination arguments |

#### Returns

`Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

#### Defined in

packages/providers/dist/index.d.ts:1343

___

### getBlock

▸ **getBlock**(`idOrHeight`): `Promise`<``null`` \| [`Block`](../namespaces/internal.md#block)\>

Returns block matching the given ID or type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrHeight` | `string` \| `number` | ID or height of the block |

#### Returns

`Promise`<``null`` \| [`Block`](../namespaces/internal.md#block)\>

#### Defined in

packages/providers/dist/index.d.ts:1303

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<[`BN`](internal-BN.md)\>

Returns the current block number

#### Returns

`Promise`<[`BN`](internal-BN.md)\>

#### Defined in

packages/providers/dist/index.d.ts:1233

___

### getBlockWithTransactions

▸ **getBlockWithTransactions**(`idOrHeight`): `Promise`<``null`` \| [`Block`](../namespaces/internal.md#block) & { `transactions`: `Partial`<`Omit`<[`TransactionScript`](../namespaces/internal.md#transactionscript), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionMint`](../namespaces/internal.md#transactionmint), ``"type"``\>\> & { `type`: [`TransactionType`](../enums/internal-TransactionType.md)  }[]  }\>

Returns block matching the given ID or type, including transaction data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrHeight` | `string` \| `number` | ID or height of the block |

#### Returns

`Promise`<``null`` \| [`Block`](../namespaces/internal.md#block) & { `transactions`: `Partial`<`Omit`<[`TransactionScript`](../namespaces/internal.md#transactionscript), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionMint`](../namespaces/internal.md#transactionmint), ``"type"``\>\> & { `type`: [`TransactionType`](../enums/internal-TransactionType.md)  }[]  }\>

#### Defined in

packages/providers/dist/index.d.ts:1309

___

### getChain

▸ **getChain**(): `Promise`<[`ChainInfo`](../namespaces/internal.md#chaininfo)\>

Returns chain information

#### Returns

`Promise`<[`ChainInfo`](../namespaces/internal.md#chaininfo)\>

#### Defined in

packages/providers/dist/index.d.ts:1241

___

### getCoins

▸ **getCoins**(`owner`, `assetId?`, `paginationArgs?`): `Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

Returns coins for the given owner

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) | The address to get coins for |
| `assetId?` | `BytesLike` | The asset ID of coins to get |
| `paginationArgs?` | [`CursorPaginationArgs`](../namespaces/internal.md#cursorpaginationargs) | Pagination arguments |

#### Returns

`Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

#### Defined in

packages/providers/dist/index.d.ts:1283

___

### getContract

▸ **getContract**(`contractId`): `Promise`<``null`` \| [`ContractResult`](../namespaces/internal.md#contractresult)\>

Get deployed contract with the given ID

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractId` | `string` |

#### Returns

`Promise`<``null`` \| [`ContractResult`](../namespaces/internal.md#contractresult)\>

contract bytecode and contract id

#### Defined in

packages/providers/dist/index.d.ts:1323

___

### getContractBalance

▸ **getContractBalance**(`contractId`, `assetId`): `Promise`<[`BN`](internal-BN.md)\>

Returns the balance for the given contract for the given asset ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | [`AbstractAddress`](internal-AbstractAddress.md) | The contract ID to get the balance for |
| `assetId` | `BytesLike` | The asset ID of coins to get |

#### Returns

`Promise`<[`BN`](internal-BN.md)\>

#### Defined in

packages/providers/dist/index.d.ts:1327

___

### getMessageProof

▸ **getMessageProof**(`transactionId`, `messageId`): `Promise`<``null`` \| [`MessageProof`](../namespaces/internal.md#messageproof)\>

Returns Message Proof for given transaction id and the message id from MessageOut receipt

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The transaction to get message from |
| `messageId` | `string` | The message id from MessageOut receipt |

#### Returns

`Promise`<``null`` \| [`MessageProof`](../namespaces/internal.md#messageproof)\>

#### Defined in

packages/providers/dist/index.d.ts:1359

___

### getMessages

▸ **getMessages**(`address`, `paginationArgs?`): `Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

Returns message for the given address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) | The address to get message from |
| `paginationArgs?` | [`CursorPaginationArgs`](../namespaces/internal.md#cursorpaginationargs) | Pagination arguments |

#### Returns

`Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

#### Defined in

packages/providers/dist/index.d.ts:1351

___

### getNetwork

▸ **getNetwork**(): `Promise`<`Network`\>

Returns the network configuration of the connected Fuel node

#### Returns

`Promise`<`Network`\>

#### Defined in

packages/providers/dist/index.d.ts:1229

___

### getNodeInfo

▸ **getNodeInfo**(): `Promise`<[`NodeInfo`](../namespaces/internal.md#nodeinfo)\>

Returns node information

#### Returns

`Promise`<[`NodeInfo`](../namespaces/internal.md#nodeinfo)\>

#### Defined in

packages/providers/dist/index.d.ts:1237

___

### getResourcesToSpend

▸ **getResourcesToSpend**(`owner`, `quantities`, `excludedIds?`): `Promise`<[`Resource`](../namespaces/internal.md#resource)[]\>

Returns resources for the given owner satisfying the spend query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](internal-AbstractAddress.md) | The address to get coins for |
| `quantities` | [`CoinQuantityLike`](../namespaces/internal.md#coinquantitylike)[] | The quantities to get |
| `excludedIds?` | [`ExcludeResourcesOption`](../namespaces/internal.md#excluderesourcesoption) | IDs of excluded resources from the selection. |

#### Returns

`Promise`<[`Resource`](../namespaces/internal.md#resource)[]\>

#### Defined in

packages/providers/dist/index.d.ts:1293

___

### getTransaction

▸ **getTransaction**<`TTransactionType`\>(`transactionId`): `Promise`<``null`` \| [`Transaction`](../namespaces/internal.md#transaction)<`TTransactionType`\>\>

Get transaction with the given ID

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionId` | `string` |

#### Returns

`Promise`<``null`` \| [`Transaction`](../namespaces/internal.md#transaction)<`TTransactionType`\>\>

#### Defined in

packages/providers/dist/index.d.ts:1317

___

### getTransactionCost

▸ **getTransactionCost**(`transactionRequestLike`, `tolerance?`): `Promise`<[`TransactionCost`](../namespaces/internal.md#transactioncost)\>

Returns a transaction cost to enable user
to set gasLimit and also reserve balance amounts
on the the transaction.

The tolerance is add on top of the gasUsed calculated
from the node, this create a safe margin costs like
change states on transfer that don't occur on the dryRun
transaction. The default value is 0.2 or 20%

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike) |
| `tolerance?` | `number` |

#### Returns

`Promise`<[`TransactionCost`](../namespaces/internal.md#transactioncost)\>

#### Defined in

packages/providers/dist/index.d.ts:1279

___

### getVersion

▸ **getVersion**(): `Promise`<`string`\>

Returns the version of the connected Fuel node

#### Returns

`Promise`<`string`\>

#### Defined in

packages/providers/dist/index.d.ts:1225

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`): `Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

Submits a transaction to the chain to be executed
If the transaction is missing VariableOuputs
the transaction will be mutate and VariableOuputs will be added

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike) |

#### Returns

`Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

#### Defined in

packages/providers/dist/index.d.ts:1247

___

### simulate

▸ **simulate**(`transactionRequestLike`): `Promise`<[`CallResult`](../namespaces/internal.md#callresult)\>

Executes a signed transaction without applying the states changes
on the chain.
If the transaction is missing VariableOuputs
the transaction will be mutate and VariableOuputs will be added

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike) |

#### Returns

`Promise`<[`CallResult`](../namespaces/internal.md#callresult)\>

#### Defined in

packages/providers/dist/index.d.ts:1268
