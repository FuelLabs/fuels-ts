# Class: Provider

[@fuel-ts/account](/api/Account/index.md).Provider

A provider for connecting to a node

## Properties

### cache

• `Optional` **cache**: `MemoryCache`

#### Defined in

[packages/account/src/providers/provider.ts:305](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L305)

___

### operations

• **operations**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dryRun` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string` ; `utxoValidation?`: `InputMaybe`&lt;`boolean`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlDryRunMutation`\> |
| `estimatePredicates` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlEstimatePredicatesQuery`\> |
| `getBalance` | (`variables`: `Exact`&lt;{ `assetId`: `string` ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBalanceQuery`\> |
| `getBalances` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `filter`: `GqlBalanceFilterInput` ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBalancesQuery`\> |
| `getBlock` | (`variables?`: `Exact`&lt;{ `blockId?`: `InputMaybe`&lt;`string`\> ; `height?`: `any`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlockQuery`\> |
| `getBlockWithTransactions` | (`variables?`: `Exact`&lt;{ `blockHeight?`: `any` ; `blockId?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlockWithTransactionsQuery`\> |
| `getBlocks` | (`variables?`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlocksQuery`\> |
| `getChain` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetChainQuery`\> |
| `getCoin` | (`variables`: `Exact`&lt;{ `coinId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinQuery`\> |
| `getCoins` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `filter`: `GqlCoinFilterInput` ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinsQuery`\> |
| `getCoinsToSpend` | (`variables`: `Exact`&lt;{ `excludedIds?`: `InputMaybe`&lt;`GqlExcludeInput`\> ; `owner`: `string` ; `queryPerAsset`: `GqlSpendQueryElementInput` \| `GqlSpendQueryElementInput`[]  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinsToSpendQuery`\> |
| `getContract` | (`variables`: `Exact`&lt;{ `contractId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetContractQuery`\> |
| `getContractBalance` | (`variables`: `Exact`&lt;{ `asset`: `string` ; `contract`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetContractBalanceQuery`\> |
| `getMessageProof` | (`variables`: `Exact`&lt;{ `commitBlockHeight?`: `any` ; `commitBlockId?`: `InputMaybe`&lt;`string`\> ; `nonce`: `string` ; `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageProofQuery`\> |
| `getMessageStatus` | (`variables`: `Exact`&lt;{ `nonce`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageStatusQuery`\> |
| `getMessages` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\> ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessagesQuery`\> |
| `getNodeInfo` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetNodeInfoQuery`\> |
| `getTransaction` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionQuery`\> |
| `getTransactionWithReceipts` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionWithReceiptsQuery`\> |
| `getTransactions` | (`variables?`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionsQuery`\> |
| `getTransactionsByOwner` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\> ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionsByOwnerQuery`\> |
| `getVersion` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetVersionQuery`\> |
| `produceBlocks` | (`variables`: `Exact`&lt;{ `blocksToProduce`: `any` ; `startTimestamp?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlProduceBlocksMutation`\> |
| `statusChange` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `AsyncIterable`&lt;`GqlStatusChangeSubscription`\> |
| `submit` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlSubmitMutation`\> |
| `submitAndAwait` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `AsyncIterable`&lt;`GqlSubmitAndAwaitSubscription`\> |

#### Defined in

[packages/account/src/providers/provider.ts:304](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L304)

___

### options

• **options**: [`ProviderOptions`](/api/Account/index.md#provideroptions)

#### Defined in

[packages/account/src/providers/provider.ts:315](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L315)

___

### url

• **url**: `string`

GraphQL endpoint of the Fuel node

#### Defined in

[packages/account/src/providers/provider.ts:350](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L350)

___

### chainInfoCache

▪ `Private` `Static` **chainInfoCache**: `ChainInfoCache` = `{}`

#### Defined in

[packages/account/src/providers/provider.ts:312](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L312)

___

### nodeInfoCache

▪ `Private` `Static` **nodeInfoCache**: `NodeInfoCache` = `{}`

#### Defined in

[packages/account/src/providers/provider.ts:313](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L313)

## Methods

### call

▸ **call**(`transactionRequestLike`, `utxoValidation?`): `Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

Executes a transaction without actually submitting it to the chain.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request object. |
| `utxoValidation` | [`ProviderCallParams`](/api/Account/index.md#providercallparams) | Additional provider call parameters. |

#### Returns

`Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

A promise that resolves to the call result object.

#### Defined in

[packages/account/src/providers/provider.ts:656](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L656)

___

### connect

▸ **connect**(`url`, `options?`): `Promise`&lt;`void`\>

Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options?` | [`ProviderOptions`](/api/Account/index.md#provideroptions) |

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/providers/provider.ts:419](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L419)

___

### createOperations

▸ **createOperations**(): `Object`

Create GraphQL client and set operations.

#### Returns

`Object`

The operation SDK object

| Name | Type |
| :------ | :------ |
| `dryRun` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string` ; `utxoValidation?`: `InputMaybe`&lt;`boolean`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlDryRunMutation`\> |
| `estimatePredicates` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlEstimatePredicatesQuery`\> |
| `getBalance` | (`variables`: `Exact`&lt;{ `assetId`: `string` ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBalanceQuery`\> |
| `getBalances` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `filter`: `GqlBalanceFilterInput` ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBalancesQuery`\> |
| `getBlock` | (`variables?`: `Exact`&lt;{ `blockId?`: `InputMaybe`&lt;`string`\> ; `height?`: `any`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlockQuery`\> |
| `getBlockWithTransactions` | (`variables?`: `Exact`&lt;{ `blockHeight?`: `any` ; `blockId?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlockWithTransactionsQuery`\> |
| `getBlocks` | (`variables?`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlocksQuery`\> |
| `getChain` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetChainQuery`\> |
| `getCoin` | (`variables`: `Exact`&lt;{ `coinId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinQuery`\> |
| `getCoins` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `filter`: `GqlCoinFilterInput` ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinsQuery`\> |
| `getCoinsToSpend` | (`variables`: `Exact`&lt;{ `excludedIds?`: `InputMaybe`&lt;`GqlExcludeInput`\> ; `owner`: `string` ; `queryPerAsset`: `GqlSpendQueryElementInput` \| `GqlSpendQueryElementInput`[]  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinsToSpendQuery`\> |
| `getContract` | (`variables`: `Exact`&lt;{ `contractId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetContractQuery`\> |
| `getContractBalance` | (`variables`: `Exact`&lt;{ `asset`: `string` ; `contract`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetContractBalanceQuery`\> |
| `getMessageProof` | (`variables`: `Exact`&lt;{ `commitBlockHeight?`: `any` ; `commitBlockId?`: `InputMaybe`&lt;`string`\> ; `nonce`: `string` ; `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageProofQuery`\> |
| `getMessageStatus` | (`variables`: `Exact`&lt;{ `nonce`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageStatusQuery`\> |
| `getMessages` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\> ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessagesQuery`\> |
| `getNodeInfo` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetNodeInfoQuery`\> |
| `getTransaction` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionQuery`\> |
| `getTransactionWithReceipts` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionWithReceiptsQuery`\> |
| `getTransactions` | (`variables?`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionsQuery`\> |
| `getTransactionsByOwner` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\> ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionsByOwnerQuery`\> |
| `getVersion` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetVersionQuery`\> |
| `produceBlocks` | (`variables`: `Exact`&lt;{ `blocksToProduce`: `any` ; `startTimestamp?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlProduceBlocksMutation`\> |
| `statusChange` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `AsyncIterable`&lt;`GqlStatusChangeSubscription`\> |
| `submit` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlSubmitMutation`\> |
| `submitAndAwait` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `AsyncIterable`&lt;`GqlSubmitAndAwaitSubscription`\> |

#### Defined in

[packages/account/src/providers/provider.ts:460](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L460)

___

### estimatePredicates

▸ **estimatePredicates**(`transactionRequest`): `Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

Verifies whether enough gas is available to complete transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](/api/Account/index.md#transactionrequest) | The transaction request object. |

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

A promise that resolves to the estimated transaction request object.

#### Defined in

[packages/account/src/providers/provider.ts:681](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L681)

___

### estimateTxDependencies

▸ **estimateTxDependencies**(`transactionRequest`): `Promise`&lt;[`EstimateTxDependenciesReturns`](/api/Account/index.md#estimatetxdependenciesreturns)\>

Will dryRun a transaction and check for missing dependencies.

If there are missing variable outputs,
`addVariableOutputs` is called on the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](/api/Account/index.md#transactionrequest) | The transaction request object. |

#### Returns

`Promise`&lt;[`EstimateTxDependenciesReturns`](/api/Account/index.md#estimatetxdependenciesreturns)\>

A promise.

#### Defined in

[packages/account/src/providers/provider.ts:729](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L729)

___

### estimateTxGasAndFee

▸ **estimateTxGasAndFee**(`params`): `Object`

Estimates the transaction gas and fee based on the provided transaction request.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.transactionRequest` | [`TransactionRequest`](/api/Account/index.md#transactionrequest) |

#### Returns

`Object`

An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.

| Name | Type |
| :------ | :------ |
| `maxFee` | `BN` |
| `maxGas` | `BN` |
| `minFee` | `BN` |
| `minGas` | `BN` |

#### Defined in

[packages/account/src/providers/provider.ts:782](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L782)

___

### fetchChain

▸ **fetchChain**(): `Promise`&lt;[`ChainInfo`](/api/Account/index.md#chaininfo)\>

Fetches the `chainInfo` for the given node URL.

#### Returns

`Promise`&lt;[`ChainInfo`](/api/Account/index.md#chaininfo)\>

ChainInfo object

#### Defined in

[packages/account/src/providers/provider.ts:553](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L553)

___

### fetchChainAndNodeInfo

▸ **fetchChainAndNodeInfo**(): `Promise`&lt;{ `chain`: [`ChainInfo`](/api/Account/index.md#chaininfo) ; `nodeInfo`: [`NodeInfo`](/api/Account/index.md#nodeinfo)  }\>

Fetches both the chain and node information, saves it to the cache, and return it.

#### Returns

`Promise`&lt;{ `chain`: [`ChainInfo`](/api/Account/index.md#chaininfo) ; `nodeInfo`: [`NodeInfo`](/api/Account/index.md#nodeinfo)  }\>

NodeInfo and Chain

#### Defined in

[packages/account/src/providers/provider.ts:431](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L431)

___

### fetchNode

▸ **fetchNode**(): `Promise`&lt;[`NodeInfo`](/api/Account/index.md#nodeinfo)\>

Returns the chain information.

#### Returns

`Promise`&lt;[`NodeInfo`](/api/Account/index.md#nodeinfo)\>

NodeInfo object

#### Defined in

[packages/account/src/providers/provider.ts:530](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L530)

___

### getBalance

▸ **getBalance**(`owner`, `assetId`): `Promise`&lt;`BN`\>

Returns the balance for the given owner for the given asset ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get coins for. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of coins to get. |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the balance.

#### Defined in

[packages/account/src/providers/provider.ts:1265](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1265)

___

### getBalances

▸ **getBalances**(`owner`, `paginationArgs?`): `Promise`&lt;[`CoinQuantity`](/api/Account/index.md#coinquantity)[]\>

Returns balances for the given owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get coins for. |
| `paginationArgs?` | `CursorPaginationArgs` | Pagination arguments. |

#### Returns

`Promise`&lt;[`CoinQuantity`](/api/Account/index.md#coinquantity)[]\>

A promise that resolves to the balances.

#### Defined in

[packages/account/src/providers/provider.ts:1285](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1285)

___

### getBlock

▸ **getBlock**(`idOrHeight`): `Promise`&lt;``null`` \| [`Block`](/api/Account/index.md#block)\>

Returns block matching the given ID or height.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrHeight` | `string` \| `number` | ID or height of the block. |

#### Returns

`Promise`&lt;``null`` \| [`Block`](/api/Account/index.md#block)\>

A promise that resolves to the block.

#### Defined in

[packages/account/src/providers/provider.ts:1121](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1121)

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`&lt;`BN`\>

Returns the block number.

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the block number

#### Defined in

[packages/account/src/providers/provider.ts:520](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L520)

___

### getBlockWithTransactions

▸ **getBlockWithTransactions**(`idOrHeight`): `Promise`&lt;``null`` \| [`Block`](/api/Account/index.md#block) & { `transactions`: `Partial`&lt;`Omit`&lt;`TransactionScript`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionCreate`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionMint`, ``"type"``\>\> & { `type`: [`TransactionType`](/api/Account/TransactionType.md)  }[]  }\>

Returns block matching the given ID or type, including transaction data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrHeight` | `string` \| `number` | ID or height of the block. |

#### Returns

`Promise`&lt;``null`` \| [`Block`](/api/Account/index.md#block) & { `transactions`: `Partial`&lt;`Omit`&lt;`TransactionScript`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionCreate`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionMint`, ``"type"``\>\> & { `type`: [`TransactionType`](/api/Account/TransactionType.md)  }[]  }\>

A promise that resolves to the block.

#### Defined in

[packages/account/src/providers/provider.ts:1175](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1175)

___

### getBlocks

▸ **getBlocks**(`params`): `Promise`&lt;[`Block`](/api/Account/index.md#block)[]\>

Returns all the blocks matching the given parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\> | The parameters to query blocks. |

#### Returns

`Promise`&lt;[`Block`](/api/Account/index.md#block)[]\>

A promise that resolves to the blocks.

#### Defined in

[packages/account/src/providers/provider.ts:1156](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1156)

___

### getChain

▸ **getChain**(): [`ChainInfo`](/api/Account/index.md#chaininfo)

Returns the cached chainInfo for the current URL.

#### Returns

[`ChainInfo`](/api/Account/index.md#chaininfo)

#### Defined in

[packages/account/src/providers/provider.ts:374](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L374)

___

### getChainId

▸ **getChainId**(): `number`

Returns the chain ID

#### Returns

`number`

A promise that resolves to the chain ID number

#### Defined in

[packages/account/src/providers/provider.ts:567](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L567)

___

### getCoins

▸ **getCoins**(`owner`, `assetId?`, `paginationArgs?`): `Promise`&lt;[`Coin`](/api/Account/index.md#coin)[]\>

Returns coins for the given owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get coins for |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of coins to get |
| `paginationArgs?` | `CursorPaginationArgs` | Pagination arguments |

#### Returns

`Promise`&lt;[`Coin`](/api/Account/index.md#coin)[]\>

#### Defined in

[packages/account/src/providers/provider.ts:1013](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1013)

___

### getContract

▸ **getContract**(`contractId`): `Promise`&lt;``null`` \| [`ContractResult`](/api/Account/index.md#contractresult)\>

Get deployed contract with the given ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `string` | ID of the contract. |

#### Returns

`Promise`&lt;``null`` \| [`ContractResult`](/api/Account/index.md#contractresult)\>

A promise that resolves to the contract.

#### Defined in

[packages/account/src/providers/provider.ts:1230](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1230)

___

### getContractBalance

▸ **getContractBalance**(`contractId`, `assetId`): `Promise`&lt;`BN`\>

Returns the balance for the given contract for the given asset ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The contract ID to get the balance for. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of coins to get. |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the balance.

#### Defined in

[packages/account/src/providers/provider.ts:1245](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1245)

___

### getGasConfig

▸ **getGasConfig**(): `Object`

Returns some helpful parameters related to gas fees.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `gasCosts` | `GqlGasCosts` |
| `gasPerByte` | `BN` |
| `gasPriceFactor` | `BN` |
| `maxGasPerPredicate` | `BN` |
| `maxGasPerTx` | `BN` |
| `minGasPrice` | `BN` |

#### Defined in

[packages/account/src/providers/provider.ts:402](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L402)

___

### getMessageProof

▸ **getMessageProof**(`transactionId`, `nonce`, `commitBlockId?`, `commitBlockHeight?`): `Promise`&lt;``null`` \| [`MessageProof`](/api/Account/index.md#messageproof)\>

Returns Message Proof for given transaction id and the message id from MessageOut receipt.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The transaction to get message from. |
| `nonce` | `string` | - |
| `commitBlockId?` | `string` | The commit block id. |
| `commitBlockHeight?` | `BN` | The commit block height. |

#### Returns

`Promise`&lt;``null`` \| [`MessageProof`](/api/Account/index.md#messageproof)\>

A promise that resolves to the message proof.

#### Defined in

[packages/account/src/providers/provider.ts:1352](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1352)

___

### getMessageStatus

▸ **getMessageStatus**(`nonce`): `Promise`&lt;[`MessageStatus`](/api/Account/index.md#messagestatus)\>

Returns Message Proof for given transaction id and the message id from MessageOut receipt.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nonce` | `string` | The nonce of the message to get status from. |

#### Returns

`Promise`&lt;[`MessageStatus`](/api/Account/index.md#messagestatus)\>

A promise that resolves to the message status

#### Defined in

[packages/account/src/providers/provider.ts:1458](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1458)

___

### getMessages

▸ **getMessages**(`address`, `paginationArgs?`): `Promise`&lt;[`Message`](/api/Account/index.md#message)[]\>

Returns message for the given address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get message from. |
| `paginationArgs?` | `CursorPaginationArgs` | Pagination arguments. |

#### Returns

`Promise`&lt;[`Message`](/api/Account/index.md#message)[]\>

A promise that resolves to the messages.

#### Defined in

[packages/account/src/providers/provider.ts:1312](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1312)

___

### getNode

▸ **getNode**(): [`NodeInfo`](/api/Account/index.md#nodeinfo)

Returns the cached nodeInfo for the current URL.

#### Returns

[`NodeInfo`](/api/Account/index.md#nodeinfo)

#### Defined in

[packages/account/src/providers/provider.ts:388](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L388)

___

### getResourcesForTransaction

▸ **getResourcesForTransaction**(`owner`, `transactionRequestLike`, `forwardingQuantities?`): `Promise`&lt;{ `estimatedInputs`: [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] ; `gasPrice`: `BN` ; `gasUsed`: `BN` ; `maxFee`: `BN` ; `maxGas`: `BN` ; `minFee`: `BN` ; `minGas`: `BN` ; `minGasPrice`: `BN` ; `missingContractIds`: `string`[] ; `outputVariables`: `number` ; `receipts`: `TransactionResultReceipt`[] ; `requiredQuantities`: [`CoinQuantity`](/api/Account/index.md#coinquantity)[] ; `resources`: [`Resource`](/api/Account/index.md#resource)[]  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | `undefined` |
| `forwardingQuantities` | [`CoinQuantity`](/api/Account/index.md#coinquantity)[] | `[]` |

#### Returns

`Promise`&lt;{ `estimatedInputs`: [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] ; `gasPrice`: `BN` ; `gasUsed`: `BN` ; `maxFee`: `BN` ; `maxGas`: `BN` ; `minFee`: `BN` ; `minGas`: `BN` ; `minGasPrice`: `BN` ; `missingContractIds`: `string`[] ; `outputVariables`: `number` ; `receipts`: `TransactionResultReceipt`[] ; `requiredQuantities`: [`CoinQuantity`](/api/Account/index.md#coinquantity)[] ; `resources`: [`Resource`](/api/Account/index.md#resource)[]  }\>

#### Defined in

[packages/account/src/providers/provider.ts:978](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L978)

___

### getResourcesToSpend

▸ **getResourcesToSpend**(`owner`, `quantities`, `excludedIds?`): `Promise`&lt;[`Resource`](/api/Account/index.md#resource)[]\>

Returns resources for the given owner satisfying the spend query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get resources for. |
| `quantities` | [`CoinQuantityLike`](/api/Account/index.md#coinquantitylike)[] | The quantities to get. |
| `excludedIds?` | `ExcludeResourcesOption` | IDs of excluded resources from the selection. |

#### Returns

`Promise`&lt;[`Resource`](/api/Account/index.md#resource)[]\>

A promise that resolves to the resources.

#### Defined in

[packages/account/src/providers/provider.ts:1049](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1049)

___

### getTransaction

▸ **getTransaction**&lt;`TTransactionType`\>(`transactionId`): `Promise`&lt;``null`` \| `Transaction`&lt;`TTransactionType`\>\>

Get transaction with the given ID.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | ID of the transaction. |

#### Returns

`Promise`&lt;``null`` \| `Transaction`&lt;`TTransactionType`\>\>

A promise that resolves to the transaction.

#### Defined in

[packages/account/src/providers/provider.ts:1211](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1211)

___

### getTransactionCost

▸ **getTransactionCost**(`transactionRequestLike`, `forwardingQuantities?`, `«destructured»?`): `Promise`&lt;[`TransactionCost`](/api/Account/index.md#transactioncost)\>

Returns a transaction cost to enable user
to set gasLimit and also reserve balance amounts
on the the transaction.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | `undefined` | The transaction request object. |
| `forwardingQuantities` | [`CoinQuantity`](/api/Account/index.md#coinquantity)[] | `[]` | - |
| `«destructured»` | [`TransactionCostParams`](/api/Account/index.md#transactioncostparams) | `{}` | - |

#### Returns

`Promise`&lt;[`TransactionCost`](/api/Account/index.md#transactioncost)\>

A promise that resolves to the transaction cost object.

#### Defined in

[packages/account/src/providers/provider.ts:873](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L873)

___

### getTransactionResponse

▸ **getTransactionResponse**(`transactionId`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionId` | `string` |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

#### Defined in

[packages/account/src/providers/provider.ts:1482](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1482)

___

### getVersion

▸ **getVersion**(): `Promise`&lt;`string`\>

Returns the version of the connected node.

#### Returns

`Promise`&lt;`string`\>

A promise that resolves to the version string.

#### Defined in

[packages/account/src/providers/provider.ts:492](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L492)

___

### produceBlocks

▸ **produceBlocks**(`amount`, `startTime?`): `Promise`&lt;`BN`\>

Lets you produce blocks with custom timestamps and the block number of the last block produced.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | The amount of blocks to produce |
| `startTime?` | `number` | The UNIX timestamp (milliseconds) to set for the first produced block |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the block number of the last produced block.

#### Defined in

[packages/account/src/providers/provider.ts:1473](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L1473)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`, `«destructured»?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Submits a transaction to the chain to be executed.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request object. |
| `«destructured»` | [`ProviderSendTxParams`](/api/Account/index.md#providersendtxparams) | - |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response object.

#### Defined in

[packages/account/src/providers/provider.ts:599](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L599)

___

### simulate

▸ **simulate**(`transactionRequestLike`, `«destructured»?`): `Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

Executes a signed transaction without applying the states changes
on the chain.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request object. |
| `«destructured»` | [`EstimateTransactionParams`](/api/Account/index.md#estimatetransactionparams) | - |

#### Returns

`Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

A promise that resolves to the call result object.

#### Defined in

[packages/account/src/providers/provider.ts:839](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L839)

___

### clearChainAndNodeCaches

▸ **clearChainAndNodeCaches**(): `void`

#### Returns

`void`

#### Defined in

[packages/account/src/providers/provider.ts:307](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L307)

___

### create

▸ **create**(`url`, `options?`): `Promise`&lt;[`Provider`](/api/Account/Provider.md)\>

Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | GraphQL endpoint of the Fuel node |
| `options` | [`ProviderOptions`](/api/Account/index.md#provideroptions) | Additional options for the provider |

#### Returns

`Promise`&lt;[`Provider`](/api/Account/Provider.md)\>

#### Defined in

[packages/account/src/providers/provider.ts:365](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L365)

___

### ensureClientVersionIsSupported

▸ **ensureClientVersionIsSupported**(`nodeInfo`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeInfo` | [`NodeInfo`](/api/Account/index.md#nodeinfo) |

#### Returns

`void`

#### Defined in

[packages/account/src/providers/provider.ts:443](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L443)

___

### getFetchFn

▸ **getFetchFn**(`options`): (`url`: `string`, `requestInit?`: `RequestInit`, `providerOptions?`: `Omit`&lt;[`ProviderOptions`](/api/Account/index.md#provideroptions), ``"fetch"``\>) => `Promise`&lt;`Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ProviderOptions`](/api/Account/index.md#provideroptions) |

#### Returns

`fn`

▸ (`url`, `requestInit?`, `providerOptions?`): `Promise`&lt;`Response`\>

Custom fetch function to use for making requests.

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `requestInit?` | `RequestInit` |
| `providerOptions?` | `Omit`&lt;[`ProviderOptions`](/api/Account/index.md#provideroptions), ``"fetch"``\> |

##### Returns

`Promise`&lt;`Response`\>

#### Defined in

[packages/account/src/providers/provider.ts:322](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/provider.ts#L322)
