# Class: Provider

[@fuel-ts/account](/api/Account/index.md).Provider

A provider for connecting to a node

## Properties

### cache

• `Optional` **cache**: `MemoryCache`

#### Defined in

[packages/account/src/providers/provider.ts:370](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L370)

___

### operations

• **operations**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dryRun` | (`variables`: `Exact`&lt;{ `encodedTransactions`: `string` \| `string`[] ; `gasPrice?`: `InputMaybe`&lt;`string`\> ; `utxoValidation?`: `InputMaybe`&lt;`boolean`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlDryRunMutation`\> |
| `estimateGasPrice` | (`variables`: `Exact`&lt;{ `blockHorizon`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlEstimateGasPriceQuery`\> |
| `estimatePredicates` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlEstimatePredicatesQuery`\> |
| `getBalance` | (`variables`: `Exact`&lt;{ `assetId`: `string` ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBalanceQuery`\> |
| `getBalances` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `filter`: `GqlBalanceFilterInput` ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBalancesQuery`\> |
| `getBlock` | (`variables?`: `Exact`&lt;{ `blockId?`: `InputMaybe`&lt;`string`\> ; `height?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlockQuery`\> |
| `getBlockWithTransactions` | (`variables?`: `Exact`&lt;{ `blockHeight?`: `InputMaybe`&lt;`string`\> ; `blockId?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlockWithTransactionsQuery`\> |
| `getBlocks` | (`variables?`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlocksQuery`\> |
| `getChain` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetChainQuery`\> |
| `getCoin` | (`variables`: `Exact`&lt;{ `coinId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinQuery`\> |
| `getCoins` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `filter`: `GqlCoinFilterInput` ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinsQuery`\> |
| `getCoinsToSpend` | (`variables`: `Exact`&lt;{ `excludedIds?`: `InputMaybe`&lt;`GqlExcludeInput`\> ; `owner`: `string` ; `queryPerAsset`: `GqlSpendQueryElementInput` \| `GqlSpendQueryElementInput`[]  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinsToSpendQuery`\> |
| `getContract` | (`variables`: `Exact`&lt;{ `contractId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetContractQuery`\> |
| `getContractBalance` | (`variables`: `Exact`&lt;{ `asset`: `string` ; `contract`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetContractBalanceQuery`\> |
| `getLatestGasPrice` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetLatestGasPriceQuery`\> |
| `getMessageByNonce` | (`variables`: `Exact`&lt;{ `nonce`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageByNonceQuery`\> |
| `getMessageProof` | (`variables`: `Exact`&lt;{ `commitBlockHeight?`: `InputMaybe`&lt;`string`\> ; `commitBlockId?`: `InputMaybe`&lt;`string`\> ; `nonce`: `string` ; `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageProofQuery`\> |
| `getMessageStatus` | (`variables`: `Exact`&lt;{ `nonce`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageStatusQuery`\> |
| `getMessages` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\> ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessagesQuery`\> |
| `getNodeInfo` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetNodeInfoQuery`\> |
| `getRelayedTransactionStatus` | (`variables`: `Exact`&lt;{ `relayedTransactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetRelayedTransactionStatusQuery`\> |
| `getTransaction` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionQuery`\> |
| `getTransactionWithReceipts` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionWithReceiptsQuery`\> |
| `getTransactions` | (`variables?`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionsQuery`\> |
| `getTransactionsByOwner` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\> ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionsByOwnerQuery`\> |
| `getVersion` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetVersionQuery`\> |
| `produceBlocks` | (`variables`: `Exact`&lt;{ `blocksToProduce`: `string` ; `startTimestamp?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlProduceBlocksMutation`\> |
| `statusChange` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `AsyncIterable`&lt;`GqlStatusChangeSubscription`\> |
| `submit` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlSubmitMutation`\> |
| `submitAndAwait` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `AsyncIterable`&lt;`GqlSubmitAndAwaitSubscription`\> |

#### Defined in

[packages/account/src/providers/provider.ts:369](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L369)

___

### options

• **options**: [`ProviderOptions`](/api/Account/index.md#provideroptions)

#### Defined in

[packages/account/src/providers/provider.ts:383](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L383)

___

### url

• **url**: `string`

GraphQL endpoint of the Fuel node

#### Defined in

[packages/account/src/providers/provider.ts:419](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L419)

## Methods

### connect

▸ **connect**(`url`, `options?`): `Promise`&lt;`void`\>

Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to connect to. |
| `options?` | [`ProviderOptions`](/api/Account/index.md#provideroptions) | Additional options for the provider. |

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/providers/provider.ts:500](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L500)

___

### dryRun

▸ **dryRun**(`transactionRequestLike`, `sendTransactionParams?`): `Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

Executes a transaction without actually submitting it to the chain.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request object. |
| `sendTransactionParams` | [`ProviderCallParams`](/api/Account/index.md#providercallparams) | The provider call parameters (optional). |

#### Returns

`Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

A promise that resolves to the call result object.

#### Defined in

[packages/account/src/providers/provider.ts:751](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L751)

___

### dryRunMultipleTransactions

▸ **dryRunMultipleTransactions**(`transactionRequests`, `sendTransactionParams?`): `Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)[]\>

Dry runs multiple transactions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequests` | [`TransactionRequest`](/api/Account/index.md#transactionrequest)[] | Array of transaction request objects. |
| `sendTransactionParams` | [`ProviderCallParams`](/api/Account/index.md#providercallparams) | The provider call parameters (optional). |

#### Returns

`Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)[]\>

A promise that resolves to an array of results for each transaction call.

#### Defined in

[packages/account/src/providers/provider.ts:973](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L973)

___

### estimateGasPrice

▸ **estimateGasPrice**(`blockHorizon`): `Promise`&lt;`BN`\>

Returns the estimate gas price for the given block horizon.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockHorizon` | `number` | The block horizon to estimate gas price for. |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the estimated gas price.

#### Defined in

[packages/account/src/providers/provider.ts:1726](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1726)

___

### estimateMultipleTxDependencies

▸ **estimateMultipleTxDependencies**(`transactionRequests`): `Promise`&lt;[`EstimateTxDependenciesReturns`](/api/Account/index.md#estimatetxdependenciesreturns)[]\>

Dry runs multiple transactions and checks for missing dependencies in batches.

Transactions are dry run in batches. After each dry run, transactions requiring
further modifications are identified. The method iteratively updates these transactions
and performs subsequent dry runs until all dependencies for each transaction are satisfied.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequests` | [`TransactionRequest`](/api/Account/index.md#transactionrequest)[] | Array of transaction request objects. |

#### Returns

`Promise`&lt;[`EstimateTxDependenciesReturns`](/api/Account/index.md#estimatetxdependenciesreturns)[]\>

A promise that resolves to an array of results for each transaction.

#### Defined in

[packages/account/src/providers/provider.ts:892](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L892)

___

### estimatePredicates

▸ **estimatePredicates**&lt;`T`\>(`transactionRequest`): `Promise`&lt;`T`\>

Verifies whether enough gas is available to complete transaction.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`TransactionRequest`](/api/Account/index.md#transactionrequest) | The type of the transaction request object. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequest` | `T` | The transaction request object. |

#### Returns

`Promise`&lt;`T`\>

A promise that resolves to the estimated transaction request object.

#### Defined in

[packages/account/src/providers/provider.ts:778](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L778)

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

A promise that resolves to the estimate transaction dependencies.

#### Defined in

[packages/account/src/providers/provider.ts:822](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L822)

___

### estimateTxGasAndFee

▸ **estimateTxGasAndFee**(`params`): `Promise`&lt;{ `gasLimit`: `BN` ; `gasPrice`: `BN` ; `maxFee`: `BN` ; `maxGas`: `BN` ; `minFee`: `BN` ; `minGas`: `BN`  }\>

Estimates the transaction gas and fee based on the provided transaction request.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.gasPrice?` | `BN` |
| `params.transactionRequest` | [`TransactionRequest`](/api/Account/index.md#transactionrequest) |

#### Returns

`Promise`&lt;{ `gasLimit`: `BN` ; `gasPrice`: `BN` ; `maxFee`: `BN` ; `maxGas`: `BN` ; `minFee`: `BN` ; `minGas`: `BN`  }\>

An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.

#### Defined in

[packages/account/src/providers/provider.ts:999](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L999)

___

### fetchChain

▸ **fetchChain**(): `Promise`&lt;[`ChainInfo`](/api/Account/index.md#chaininfo)\>

Returns the chain information for the current provider network.

#### Returns

`Promise`&lt;[`ChainInfo`](/api/Account/index.md#chaininfo)\>

a promise that resolves to the chain information.

#### Defined in

[packages/account/src/providers/provider.ts:634](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L634)

___

### fetchChainAndNodeInfo

▸ **fetchChainAndNodeInfo**(): `Promise`&lt;{ `chain`: [`ChainInfo`](/api/Account/index.md#chaininfo) ; `nodeInfo`: [`NodeInfo`](/api/Account/index.md#nodeinfo)  }\>

Return the chain and node information.

#### Returns

`Promise`&lt;{ `chain`: [`ChainInfo`](/api/Account/index.md#chaininfo) ; `nodeInfo`: [`NodeInfo`](/api/Account/index.md#nodeinfo)  }\>

A promise that resolves to the Chain and NodeInfo.

#### Defined in

[packages/account/src/providers/provider.ts:512](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L512)

___

### fetchNode

▸ **fetchNode**(): `Promise`&lt;[`NodeInfo`](/api/Account/index.md#nodeinfo)\>

Returns the node information for the current provider network.

#### Returns

`Promise`&lt;[`NodeInfo`](/api/Account/index.md#nodeinfo)\>

a promise that resolves to the node information.

#### Defined in

[packages/account/src/providers/provider.ts:613](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L613)

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

[packages/account/src/providers/provider.ts:1522](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1522)

___

### getBalances

▸ **getBalances**(`owner`, `paginationArgs?`): `Promise`&lt;[`CoinQuantity`](/api/Account/index.md#coinquantity)[]\>

Returns balances for the given owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get coins for. |
| `paginationArgs?` | `CursorPaginationArgs` | Pagination arguments (optional). |

#### Returns

`Promise`&lt;[`CoinQuantity`](/api/Account/index.md#coinquantity)[]\>

A promise that resolves to the balances.

#### Defined in

[packages/account/src/providers/provider.ts:1542](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1542)

___

### getBaseAssetId

▸ **getBaseAssetId**(): `string`

Returns the base asset ID for the current provider network.

#### Returns

`string`

the base asset ID.

#### Defined in

[packages/account/src/providers/provider.ts:661](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L661)

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

A promise that resolves to the block or null.

#### Defined in

[packages/account/src/providers/provider.ts:1363](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1363)

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`&lt;`BN`\>

Returns the latest block number.

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the latest block number.

#### Defined in

[packages/account/src/providers/provider.ts:603](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L603)

___

### getBlockWithTransactions

▸ **getBlockWithTransactions**(`idOrHeight`): `Promise`&lt;``null`` \| [`Block`](/api/Account/index.md#block) & { `transactions`: `Partial`&lt;`Omit`&lt;`TransactionScript`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionCreate`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionMint`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionUpgrade`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionUpload`, ``"type"``\>\> & { `type`: [`TransactionType`](/api/Account/TransactionType.md)  }[]  }\>

Returns block matching the given ID or type, including transaction data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrHeight` | `string` \| `number` | ID or height of the block. |

#### Returns

`Promise`&lt;``null`` \| [`Block`](/api/Account/index.md#block) & { `transactions`: `Partial`&lt;`Omit`&lt;`TransactionScript`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionCreate`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionMint`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionUpgrade`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionUpload`, ``"type"``\>\> & { `type`: [`TransactionType`](/api/Account/TransactionType.md)  }[]  }\>

A promise that resolves to the block.

#### Defined in

[packages/account/src/providers/provider.ts:1414](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1414)

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

[packages/account/src/providers/provider.ts:1395](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1395)

___

### getChain

▸ **getChain**(): [`ChainInfo`](/api/Account/index.md#chaininfo)

Returns the cached chainInfo for the current URL.

#### Returns

[`ChainInfo`](/api/Account/index.md#chaininfo)

the chain information configuration.

#### Defined in

[packages/account/src/providers/provider.ts:448](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L448)

___

### getChainId

▸ **getChainId**(): `number`

Returns the chain ID for the current provider network.

#### Returns

`number`

A promise that resolves to the chain ID number.

#### Defined in

[packages/account/src/providers/provider.ts:649](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L649)

___

### getCoins

▸ **getCoins**(`owner`, `assetId?`, `paginationArgs?`): `Promise`&lt;[`Coin`](/api/Account/index.md#coin)[]\>

Returns coins for the given owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get coins for. |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of coins to get (optional). |
| `paginationArgs?` | `CursorPaginationArgs` | Pagination arguments (optional). |

#### Returns

`Promise`&lt;[`Coin`](/api/Account/index.md#coin)[]\>

A promise that resolves to the coins.

#### Defined in

[packages/account/src/providers/provider.ts:1263](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1263)

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

[packages/account/src/providers/provider.ts:1487](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1487)

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

[packages/account/src/providers/provider.ts:1502](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1502)

___

### getGasConfig

▸ **getGasConfig**(): `Object`

Returns some helpful parameters related to gas fees.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `gasCosts` | [`GasCosts`](/api/Account/index.md#gascosts) |
| `gasPerByte` | `BN` |
| `gasPriceFactor` | `BN` |
| `maxGasPerPredicate` | `BN` |
| `maxGasPerTx` | `BN` |

#### Defined in

[packages/account/src/providers/provider.ts:478](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L478)

___

### getLatestGasPrice

▸ **getLatestGasPrice**(): `Promise`&lt;`BN`\>

Get the latest gas price from the node.

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the latest gas price.

#### Defined in

[packages/account/src/providers/provider.ts:1715](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1715)

___

### getMessageByNonce

▸ **getMessageByNonce**(`nonce`): `Promise`&lt;``null`` \| `GqlMessage`\>

Returns Message for given nonce.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nonce` | `string` | The nonce of the message to retrieve. |

#### Returns

`Promise`&lt;``null`` \| `GqlMessage`\>

A promise that resolves to the Message object or null.

#### Defined in

[packages/account/src/providers/provider.ts:1779](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1779)

___

### getMessageProof

▸ **getMessageProof**(`transactionId`, `nonce`, `commitBlockId?`, `commitBlockHeight?`): `Promise`&lt;``null`` \| [`MessageProof`](/api/Account/index.md#messageproof)\>

Returns Message Proof for given transaction id and the message id from MessageOut receipt.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The transaction to get message from. |
| `nonce` | `string` | - |
| `commitBlockId?` | `string` | The commit block id (optional). |
| `commitBlockHeight?` | `BN` | The commit block height (optional). |

#### Returns

`Promise`&lt;``null`` \| [`MessageProof`](/api/Account/index.md#messageproof)\>

A promise that resolves to the message proof.

#### Defined in

[packages/account/src/providers/provider.ts:1605](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1605)

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

[packages/account/src/providers/provider.ts:1739](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1739)

___

### getMessages

▸ **getMessages**(`address`, `paginationArgs?`): `Promise`&lt;[`Message`](/api/Account/index.md#message)[]\>

Returns message for the given address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get message from. |
| `paginationArgs?` | `CursorPaginationArgs` | Pagination arguments (optional). |

#### Returns

`Promise`&lt;[`Message`](/api/Account/index.md#message)[]\>

A promise that resolves to the messages.

#### Defined in

[packages/account/src/providers/provider.ts:1567](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1567)

___

### getNode

▸ **getNode**(): [`NodeInfo`](/api/Account/index.md#nodeinfo)

Returns the cached nodeInfo for the current URL.

#### Returns

[`NodeInfo`](/api/Account/index.md#nodeinfo)

the node information configuration.

#### Defined in

[packages/account/src/providers/provider.ts:464](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L464)

___

### getRelayedTransactionStatus

▸ **getRelayedTransactionStatus**(`relayedTransactionId`): `Promise`&lt;``null`` \| `GqlRelayedTransactionFailed`\>

Get the relayed transaction for the given transaction ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `relayedTransactionId` | `string` | The relayed transaction ID to get the response for. |

#### Returns

`Promise`&lt;``null`` \| `GqlRelayedTransactionFailed`\>

A promise that resolves to the relayed transaction.

#### Defined in

[packages/account/src/providers/provider.ts:1795](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1795)

___

### getResourcesForTransaction

▸ **getResourcesForTransaction**(`owner`, `transactionRequestLike`, `quantitiesToContract?`): `Promise`&lt;{ `addedSignatures`: `number` ; `dryRunStatus?`: [`DryRunStatus`](/api/Account/index.md#dryrunstatus) ; `estimatedPredicates`: [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] ; `gasPrice`: `BN` ; `gasUsed`: `BN` ; `maxFee`: `BN` ; `maxGas`: `BN` ; `minFee`: `BN` ; `minGas`: `BN` ; `missingContractIds`: `string`[] ; `outputVariables`: `number` ; `receipts`: `TransactionResultReceipt`[] ; `requiredQuantities`: [`CoinQuantity`](/api/Account/index.md#coinquantity)[] ; `resources`: [`Resource`](/api/Account/index.md#resource)[] ; `updateMaxFee?`: `boolean`  }\>

Get the required quantities and associated resources for a transaction.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | address to add resources from. |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | `undefined` | transaction request to populate resources for. |
| `quantitiesToContract` | [`CoinQuantity`](/api/Account/index.md#coinquantity)[] | `[]` | quantities for the contract (optional). |

#### Returns

`Promise`&lt;{ `addedSignatures`: `number` ; `dryRunStatus?`: [`DryRunStatus`](/api/Account/index.md#dryrunstatus) ; `estimatedPredicates`: [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] ; `gasPrice`: `BN` ; `gasUsed`: `BN` ; `maxFee`: `BN` ; `maxGas`: `BN` ; `minFee`: `BN` ; `minGas`: `BN` ; `missingContractIds`: `string`[] ; `outputVariables`: `number` ; `receipts`: `TransactionResultReceipt`[] ; `requiredQuantities`: [`CoinQuantity`](/api/Account/index.md#coinquantity)[] ; `resources`: [`Resource`](/api/Account/index.md#resource)[] ; `updateMaxFee?`: `boolean`  }\>

a promise resolving to the required quantities for the transaction.

#### Defined in

[packages/account/src/providers/provider.ts:1221](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1221)

___

### getResourcesToSpend

▸ **getResourcesToSpend**(`owner`, `quantities`, `excludedIds?`): `Promise`&lt;[`Resource`](/api/Account/index.md#resource)[]\>

Returns resources for the given owner satisfying the spend query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get resources for. |
| `quantities` | [`CoinQuantityLike`](/api/Account/index.md#coinquantitylike)[] | The coin quantities to get. |
| `excludedIds?` | `ExcludeResourcesOption` | IDs of excluded resources from the selection (optional). |

#### Returns

`Promise`&lt;[`Resource`](/api/Account/index.md#resource)[]\>

A promise that resolves to the resources.

#### Defined in

[packages/account/src/providers/provider.ts:1295](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1295)

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

[packages/account/src/providers/provider.ts:1450](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1450)

___

### getTransactionCost

▸ **getTransactionCost**(`transactionRequestLike`, `transactionCostParams?`): `Promise`&lt;[`TransactionCost`](/api/Account/index.md#transactioncost)\>

Returns a transaction cost to enable user
to set gasLimit and also reserve balance amounts
on the the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request object. |
| `transactionCostParams` | [`TransactionCostParams`](/api/Account/index.md#transactioncostparams) | The transaction cost parameters (optional). |

#### Returns

`Promise`&lt;[`TransactionCost`](/api/Account/index.md#transactioncost)\>

A promise that resolves to the transaction cost object.

#### Defined in

[packages/account/src/providers/provider.ts:1111](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1111)

___

### getTransactionResponse

▸ **getTransactionResponse**(`transactionId`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Get the transaction response for the given transaction ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The transaction ID to get the response for. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Defined in

[packages/account/src/providers/provider.ts:1769](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1769)

___

### getTransactions

▸ **getTransactions**(`paginationArgs?`): `Promise`&lt;[`GetTransactionsResponse`](/api/Account/index.md#gettransactionsresponse)\>

Retrieves transactions based on the provided pagination arguments.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paginationArgs?` | `CursorPaginationArgs` | The pagination arguments for retrieving transactions. |

#### Returns

`Promise`&lt;[`GetTransactionsResponse`](/api/Account/index.md#gettransactionsresponse)\>

A promise that resolves to an object containing the retrieved transactions and pagination information.

#### Defined in

[packages/account/src/providers/provider.ts:1468](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1468)

___

### getVersion

▸ **getVersion**(): `Promise`&lt;`string`\>

Returns the version of the connected node.

#### Returns

`Promise`&lt;`string`\>

A promise that resolves to the version string.

#### Defined in

[packages/account/src/providers/provider.ts:591](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L591)

___

### produceBlocks

▸ **produceBlocks**(`amount`, `startTime?`): `Promise`&lt;`BN`\>

Lets you produce blocks with custom timestamps and the block number of the last block produced.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | The amount of blocks to produce. |
| `startTime?` | `number` | The UNIX timestamp (milliseconds) to set for the first produced block (optional). |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the block number of the last produced block.

#### Defined in

[packages/account/src/providers/provider.ts:1754](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1754)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`, `sendTransactionParams?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Submits a transaction to the chain to be executed.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request object. |
| `sendTransactionParams` | [`ProviderSendTxParams`](/api/Account/index.md#providersendtxparams) | The provider send transaction parameters (optional). |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response object.

#### Defined in

[packages/account/src/providers/provider.ts:694](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L694)

___

### simulate

▸ **simulate**(`transactionRequestLike`, `estimateTxParams?`): `Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

Executes a signed transaction without applying the states changes
on the chain.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request object. |
| `estimateTxParams` | [`EstimateTransactionParams`](/api/Account/index.md#estimatetransactionparams) | The estimate transaction params (optional). |

#### Returns

`Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

A promise that resolves to the call result object.

#### Defined in

[packages/account/src/providers/provider.ts:1075](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L1075)

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

A promise that resolves to a Provider instance.

#### Defined in

[packages/account/src/providers/provider.ts:437](https://github.com/FuelLabs/fuels-ts/blob/719534a2/packages/account/src/providers/provider.ts#L437)
