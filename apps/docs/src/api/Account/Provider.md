[**@fuel-ts/account v0.94.9**](../index.md) • **Docs**

***

# Class: Provider

A provider for connecting to a node

## Properties

### cache?

> `optional` **cache**: `ResourceCache`

#### Defined in

[packages/account/src/providers/provider.ts:416](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L416)

***

### operations

> **operations**: `SdkOperations`

#### Defined in

[packages/account/src/providers/provider.ts:415](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L415)

***

### options

> **options**: [`ProviderOptions`](../index.md#provideroptions)

#### Defined in

[packages/account/src/providers/provider.ts:433](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L433)

## Methods

### connect()

> **connect**(`url`, `options`?): `Promise`\&lt;`void`\>

Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.

#### Parameters

• **url**: `string`

The URL to connect to.

• **options?**: [`ProviderOptions`](../index.md#provideroptions)

Additional options for the provider.

#### Returns

`Promise`\&lt;`void`\>

#### Defined in

[packages/account/src/providers/provider.ts:597](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L597)

***

### dryRun()

> **dryRun**(`transactionRequestLike`, `sendTransactionParams`): `Promise`\&lt;[`CallResult`](../index.md#callresult)\>

Executes a transaction without actually submitting it to the chain.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added.

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request object.

• **sendTransactionParams**: [`ProviderCallParams`](../index.md#providercallparams) = `{}`

The provider call parameters (optional).

#### Returns

`Promise`\&lt;[`CallResult`](../index.md#callresult)\>

A promise that resolves to the call result object.

#### Defined in

[packages/account/src/providers/provider.ts:886](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L886)

***

### dryRunMultipleTransactions()

> **dryRunMultipleTransactions**(`transactionRequests`, `sendTransactionParams`): `Promise`\&lt;[`CallResult`](../index.md#callresult)[]\>

Dry runs multiple transactions.

#### Parameters

• **transactionRequests**: [`TransactionRequest`](../index.md#transactionrequest)[]

Array of transaction request objects.

• **sendTransactionParams**: [`ProviderCallParams`](../index.md#providercallparams) = `{}`

The provider call parameters (optional).

#### Returns

`Promise`\&lt;[`CallResult`](../index.md#callresult)[]\>

A promise that resolves to an array of results for each transaction call.

#### Defined in

[packages/account/src/providers/provider.ts:1108](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1108)

***

### estimateGasPrice()

> **estimateGasPrice**(`blockHorizon`): `Promise`\&lt;`BN`\>

Returns the estimate gas price for the given block horizon.

#### Parameters

• **blockHorizon**: `number`

The block horizon to estimate gas price for.

#### Returns

`Promise`\&lt;`BN`\>

A promise that resolves to the estimated gas price.

#### Defined in

[packages/account/src/providers/provider.ts:1894](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1894)

***

### estimateMultipleTxDependencies()

> **estimateMultipleTxDependencies**(`transactionRequests`): `Promise`\&lt;[`EstimateTxDependenciesReturns`](../index.md#estimatetxdependenciesreturns)[]\>

Dry runs multiple transactions and checks for missing dependencies in batches.

Transactions are dry run in batches. After each dry run, transactions requiring
further modifications are identified. The method iteratively updates these transactions
and performs subsequent dry runs until all dependencies for each transaction are satisfied.

#### Parameters

• **transactionRequests**: [`TransactionRequest`](../index.md#transactionrequest)[]

Array of transaction request objects.

#### Returns

`Promise`\&lt;[`EstimateTxDependenciesReturns`](../index.md#estimatetxdependenciesreturns)[]\>

A promise that resolves to an array of results for each transaction.

#### Defined in

[packages/account/src/providers/provider.ts:1027](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1027)

***

### estimatePredicates()

> **estimatePredicates**\&lt;`T`\>(`transactionRequest`): `Promise`\&lt;`T`\>

Verifies whether enough gas is available to complete transaction.

#### Type Parameters

• **T** *extends* [`TransactionRequest`](../index.md#transactionrequest)

The type of the transaction request object.

#### Parameters

• **transactionRequest**: `T`

The transaction request object.

#### Returns

`Promise`\&lt;`T`\>

A promise that resolves to the estimated transaction request object.

#### Defined in

[packages/account/src/providers/provider.ts:913](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L913)

***

### estimateTxDependencies()

> **estimateTxDependencies**(`transactionRequest`): `Promise`\&lt;[`EstimateTxDependenciesReturns`](../index.md#estimatetxdependenciesreturns)\>

Will dryRun a transaction and check for missing dependencies.

If there are missing variable outputs,
`addVariableOutputs` is called on the transaction.

#### Parameters

• **transactionRequest**: [`TransactionRequest`](../index.md#transactionrequest)

The transaction request object.

#### Returns

`Promise`\&lt;[`EstimateTxDependenciesReturns`](../index.md#estimatetxdependenciesreturns)\>

A promise that resolves to the estimate transaction dependencies.

#### Defined in

[packages/account/src/providers/provider.ts:957](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L957)

***

### estimateTxGasAndFee()

> **estimateTxGasAndFee**(`params`): `Promise`\&lt;`object`\>

Estimates the transaction gas and fee based on the provided transaction request.

#### Parameters

• **params**

• **params.gasPrice?**: `BN`

• **params.transactionRequest**: [`TransactionRequest`](../index.md#transactionrequest)

#### Returns

`Promise`\&lt;`object`\>

An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.

##### gasLimit

> **gasLimit**: `BN`

##### gasPrice

> **gasPrice**: `BN`

##### maxFee

> **maxFee**: `BN`

##### maxGas

> **maxGas**: `BN`

##### minFee

> **minFee**: `BN`

##### minGas

> **minGas**: `BN`

#### Defined in

[packages/account/src/providers/provider.ts:1134](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1134)

***

### fetchChain()

> **fetchChain**(): `Promise`\&lt;[`ChainInfo`](../index.md#chaininfo)\>

Returns the chain information for the current provider network.

#### Returns

`Promise`\&lt;[`ChainInfo`](../index.md#chaininfo)\>

a promise that resolves to the chain information.

#### Defined in

[packages/account/src/providers/provider.ts:760](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L760)

***

### fetchChainAndNodeInfo()

> **fetchChainAndNodeInfo**(): `Promise`\&lt;`object`\>

Return the chain and node information.

#### Returns

`Promise`\&lt;`object`\>

A promise that resolves to the Chain and NodeInfo.

##### chain

> **chain**: [`ChainInfo`](../index.md#chaininfo)

##### nodeInfo

> **nodeInfo**: [`NodeInfo`](../index.md#nodeinfo)

#### Defined in

[packages/account/src/providers/provider.ts:614](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L614)

***

### fetchNode()

> **fetchNode**(): `Promise`\&lt;[`NodeInfo`](../index.md#nodeinfo)\>

Returns the node information for the current provider network.

#### Returns

`Promise`\&lt;[`NodeInfo`](../index.md#nodeinfo)\>

a promise that resolves to the node information.

#### Defined in

[packages/account/src/providers/provider.ts:739](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L739)

***

### getBalance()

> **getBalance**(`owner`, `assetId`): `Promise`\&lt;`BN`\>

Returns the balance for the given owner for the given asset ID.

#### Parameters

• **owner**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address to get coins for.

• **assetId**: [`BytesLike`](../Interfaces/index.md#byteslike)

The asset ID of coins to get.

#### Returns

`Promise`\&lt;`BN`\>

A promise that resolves to the balance.

#### Defined in

[packages/account/src/providers/provider.ts:1681](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1681)

***

### getBalances()

> **getBalances**(`owner`): `Promise`\&lt;[`GetBalancesResponse`](../index.md#getbalancesresponse)\>

Returns balances for the given owner.

#### Parameters

• **owner**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address to get coins for.

#### Returns

`Promise`\&lt;[`GetBalancesResponse`](../index.md#getbalancesresponse)\>

A promise that resolves to the balances.

#### Defined in

[packages/account/src/providers/provider.ts:1701](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1701)

***

### getBaseAssetId()

> **getBaseAssetId**(): `string`

Returns the base asset ID for the current provider network.

#### Returns

`string`

the base asset ID.

#### Defined in

[packages/account/src/providers/provider.ts:787](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L787)

***

### getBlobs()

> **getBlobs**(`blobIds`): `Promise`\&lt;`string`[]\>

Returns an array of blobIds that exist on chain, for a given array of blobIds.

#### Parameters

• **blobIds**: `string`[]

blobIds to check.

#### Returns

`Promise`\&lt;`string`[]\>

- A promise that resolves to an array of blobIds that exist on chain.

#### Defined in

[packages/account/src/providers/provider.ts:1442](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1442)

***

### getBlock()

> **getBlock**(`idOrHeight`): `Promise`\&lt;`null` \| [`Block`](../index.md#block)\>

Returns block matching the given ID or height.

#### Parameters

• **idOrHeight**: `string` \| `number`

ID or height of the block.

#### Returns

`Promise`\&lt;`null` \| [`Block`](../index.md#block)\>

A promise that resolves to the block or null.

#### Defined in

[packages/account/src/providers/provider.ts:1461](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1461)

***

### getBlockNumber()

> **getBlockNumber**(): `Promise`\&lt;`BN`\>

Returns the latest block number.

#### Returns

`Promise`\&lt;`BN`\>

A promise that resolves to the latest block number.

#### Defined in

[packages/account/src/providers/provider.ts:729](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L729)

***

### getBlockWithTransactions()

> **getBlockWithTransactions**(`idOrHeight`): `Promise`\&lt;`null` \| [`Block`](../index.md#block) & `object`\>

Returns block matching the given ID or type, including transaction data.

#### Parameters

• **idOrHeight**: `string` \| `number`

ID or height of the block.

#### Returns

`Promise`\&lt;`null` \| [`Block`](../index.md#block) & `object`\>

A promise that resolves to the block.

#### Defined in

[packages/account/src/providers/provider.ts:1541](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1541)

***

### getBlocks()

> **getBlocks**(`params`?): `Promise`\&lt;[`GetBlocksResponse`](../index.md#getblocksresponse)\>

Returns all the blocks matching the given parameters.

#### Parameters

• **params?**: `CursorPaginationArgs`

The parameters to query blocks.

#### Returns

`Promise`\&lt;[`GetBlocksResponse`](../index.md#getblocksresponse)\>

A promise that resolves to the blocks.

#### Defined in

[packages/account/src/providers/provider.ts:1505](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1505)

***

### getChain()

> **getChain**(): [`ChainInfo`](../index.md#chaininfo)

Returns the cached chainInfo for the current URL.

#### Returns

[`ChainInfo`](../index.md#chaininfo)

the chain information configuration.

#### Defined in

[packages/account/src/providers/provider.ts:545](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L545)

***

### getChainId()

> **getChainId**(): `number`

Returns the chain ID for the current provider network.

#### Returns

`number`

A promise that resolves to the chain ID number.

#### Defined in

[packages/account/src/providers/provider.ts:775](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L775)

***

### getCoins()

> **getCoins**(`owner`, `assetId`?, `paginationArgs`?): `Promise`\&lt;[`GetCoinsResponse`](../index.md#getcoinsresponse)\>

Returns coins for the given owner.

#### Parameters

• **owner**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address to get coins for.

• **assetId?**: [`BytesLike`](../Interfaces/index.md#byteslike)

The asset ID of coins to get (optional).

• **paginationArgs?**: `CursorPaginationArgs`

Pagination arguments (optional).

#### Returns

`Promise`\&lt;[`GetCoinsResponse`](../index.md#getcoinsresponse)\>

A promise that resolves to the coins.

#### Defined in

[packages/account/src/providers/provider.ts:1335](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1335)

***

### getContract()

> **getContract**(`contractId`): `Promise`\&lt;`null` \| [`ContractResult`](../index.md#contractresult)\>

Get deployed contract with the given ID.

#### Parameters

• **contractId**: `string`

ID of the contract.

#### Returns

`Promise`\&lt;`null` \| [`ContractResult`](../index.md#contractresult)\>

A promise that resolves to the contract.

#### Defined in

[packages/account/src/providers/provider.ts:1646](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1646)

***

### getContractBalance()

> **getContractBalance**(`contractId`, `assetId`): `Promise`\&lt;`BN`\>

Returns the balance for the given contract for the given asset ID.

#### Parameters

• **contractId**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The contract ID to get the balance for.

• **assetId**: [`BytesLike`](../Interfaces/index.md#byteslike)

The asset ID of coins to get.

#### Returns

`Promise`\&lt;`BN`\>

A promise that resolves to the balance.

#### Defined in

[packages/account/src/providers/provider.ts:1661](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1661)

***

### getGasConfig()

> **getGasConfig**(): `object`

Returns some helpful parameters related to gas fees.

#### Returns

`object`

##### gasCosts

> **gasCosts**: [`GasCosts`](../index.md#gascosts-1)

##### gasPerByte

> **gasPerByte**: `BN`

##### gasPriceFactor

> **gasPriceFactor**: `BN`

##### maxGasPerPredicate

> **maxGasPerPredicate**: `BN`

##### maxGasPerTx

> **maxGasPerTx**: `BN`

#### Defined in

[packages/account/src/providers/provider.ts:575](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L575)

***

### getLatestGasPrice()

> **getLatestGasPrice**(): `Promise`\&lt;`BN`\>

Get the latest gas price from the node.

#### Returns

`Promise`\&lt;`BN`\>

A promise that resolves to the latest gas price.

#### Defined in

[packages/account/src/providers/provider.ts:1883](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1883)

***

### getMessageByNonce()

> **getMessageByNonce**(`nonce`): `Promise`\&lt;`null` \| [`Message`](../index.md#message)\>

Returns Message for given nonce.

#### Parameters

• **nonce**: `string`

The nonce of the message to retrieve.

#### Returns

`Promise`\&lt;`null` \| [`Message`](../index.md#message)\>

A promise that resolves to the Message object or null.

#### Defined in

[packages/account/src/providers/provider.ts:1947](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1947)

***

### getMessageProof()

> **getMessageProof**(`transactionId`, `nonce`, `commitBlockId`?, `commitBlockHeight`?): `Promise`\&lt;`null` \| [`MessageProof`](../index.md#messageproof)\>

Returns Message Proof for given transaction id and the message id from MessageOut receipt.

#### Parameters

• **transactionId**: `string`

The transaction to get message from.

• **nonce**: `string`

• **commitBlockId?**: `string`

The commit block id (optional).

• **commitBlockHeight?**: `BN`

The commit block height (optional).

#### Returns

`Promise`\&lt;`null` \| [`MessageProof`](../index.md#messageproof)\>

A promise that resolves to the message proof.

#### Defined in

[packages/account/src/providers/provider.ts:1773](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1773)

***

### getMessageStatus()

> **getMessageStatus**(`nonce`): `Promise`\&lt;[`MessageStatus`](../index.md#messagestatus)\>

Returns Message Proof for given transaction id and the message id from MessageOut receipt.

#### Parameters

• **nonce**: `string`

The nonce of the message to get status from.

#### Returns

`Promise`\&lt;[`MessageStatus`](../index.md#messagestatus)\>

A promise that resolves to the message status

#### Defined in

[packages/account/src/providers/provider.ts:1907](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1907)

***

### getMessages()

> **getMessages**(`address`, `paginationArgs`?): `Promise`\&lt;[`GetMessagesResponse`](../index.md#getmessagesresponse)\>

Returns message for the given address.

#### Parameters

• **address**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address to get message from.

• **paginationArgs?**: `CursorPaginationArgs`

Pagination arguments (optional).

#### Returns

`Promise`\&lt;[`GetMessagesResponse`](../index.md#getmessagesresponse)\>

A promise that resolves to the messages.

#### Defined in

[packages/account/src/providers/provider.ts:1728](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1728)

***

### getNode()

> **getNode**(): [`NodeInfo`](../index.md#nodeinfo)

Returns the cached nodeInfo for the current URL.

#### Returns

[`NodeInfo`](../index.md#nodeinfo)

the node information configuration.

#### Defined in

[packages/account/src/providers/provider.ts:561](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L561)

***

### getRelayedTransactionStatus()

> **getRelayedTransactionStatus**(`relayedTransactionId`): `Promise`\&lt;`null` \| `GqlRelayedTransactionFailed`\>

Get the relayed transaction for the given transaction ID.

#### Parameters

• **relayedTransactionId**: `string`

The relayed transaction ID to get the response for.

#### Returns

`Promise`\&lt;`null` \| `GqlRelayedTransactionFailed`\>

A promise that resolves to the relayed transaction.

#### Defined in

[packages/account/src/providers/provider.ts:1979](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1979)

***

### getResourcesToSpend()

> **getResourcesToSpend**(`owner`, `quantities`, `excludedIds`?): `Promise`\&lt;[`Resource`](../index.md#resource)[]\>

Returns resources for the given owner satisfying the spend query.

#### Parameters

• **owner**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address to get resources for.

• **quantities**: [`CoinQuantityLike`](../index.md#coinquantitylike)[]

The coin quantities to get.

• **excludedIds?**: `ExcludeResourcesOption`

IDs of excluded resources from the selection (optional).

#### Returns

`Promise`\&lt;[`Resource`](../index.md#resource)[]\>

A promise that resolves to the resources.

#### Defined in

[packages/account/src/providers/provider.ts:1374](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1374)

***

### getTransaction()

> **getTransaction**\&lt;`TTransactionType`\>(`transactionId`): `Promise`\&lt;`null` \| `Transaction`\&lt;`TTransactionType`\>\>

Get transaction with the given ID.

#### Type Parameters

• **TTransactionType** = `void`

#### Parameters

• **transactionId**: `string`

ID of the transaction.

#### Returns

`Promise`\&lt;`null` \| `Transaction`\&lt;`TTransactionType`\>\>

A promise that resolves to the transaction.

#### Defined in

[packages/account/src/providers/provider.ts:1587](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1587)

***

### getTransactionResponse()

> **getTransactionResponse**(`transactionId`): `Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

Get the transaction response for the given transaction ID.

#### Parameters

• **transactionId**: `string`

The transaction ID to get the response for.

#### Returns

`Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Defined in

[packages/account/src/providers/provider.ts:1937](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1937)

***

### getTransactions()

> **getTransactions**(`paginationArgs`?): `Promise`\&lt;[`GetTransactionsResponse`](../index.md#gettransactionsresponse)\>

Retrieves transactions based on the provided pagination arguments.

#### Parameters

• **paginationArgs?**: `CursorPaginationArgs`

The pagination arguments for retrieving transactions.

#### Returns

`Promise`\&lt;[`GetTransactionsResponse`](../index.md#gettransactionsresponse)\>

A promise that resolves to an object containing the retrieved transactions and pagination information.

#### Defined in

[packages/account/src/providers/provider.ts:1616](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1616)

***

### getVersion()

> **getVersion**(): `Promise`\&lt;`string`\>

Returns the version of the connected node.

#### Returns

`Promise`\&lt;`string`\>

A promise that resolves to the version string.

#### Defined in

[packages/account/src/providers/provider.ts:717](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L717)

***

### produceBlocks()

> **produceBlocks**(`amount`, `startTime`?): `Promise`\&lt;`BN`\>

Lets you produce blocks with custom timestamps and the block number of the last block produced.

#### Parameters

• **amount**: `number`

The amount of blocks to produce.

• **startTime?**: `number`

The UNIX timestamp (milliseconds) to set for the first produced block (optional).

#### Returns

`Promise`\&lt;`BN`\>

A promise that resolves to the block number of the last produced block.

#### Defined in

[packages/account/src/providers/provider.ts:1922](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1922)

***

### sendTransaction()

> **sendTransaction**(`transactionRequestLike`, `sendTransactionParams`): `Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

Submits a transaction to the chain to be executed.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added.

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request object.

• **sendTransactionParams**: [`EstimateTransactionParams`](../index.md#estimatetransactionparams) = `{}`

The provider send transaction parameters (optional).

#### Returns

`Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

A promise that resolves to the transaction response object.

#### Defined in

[packages/account/src/providers/provider.ts:844](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L844)

***

### simulate()

> **simulate**(`transactionRequestLike`, `estimateTxParams`): `Promise`\&lt;[`CallResult`](../index.md#callresult)\>

Executes a signed transaction without applying the states changes
on the chain.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request object.

• **estimateTxParams**: [`EstimateTransactionParams`](../index.md#estimatetransactionparams) = `{}`

The estimate transaction params (optional).

#### Returns

`Promise`\&lt;[`CallResult`](../index.md#callresult)\>

A promise that resolves to the call result object.

#### Defined in

[packages/account/src/providers/provider.ts:1210](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L1210)

***

### create()

> `static` **create**(`url`, `options`): `Promise`\&lt;[`Provider`](Provider.md)\>

Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.

#### Parameters

• **url**: `string`

GraphQL endpoint of the Fuel node

• **options**: [`ProviderOptions`](../index.md#provideroptions) = `{}`

Additional options for the provider

#### Returns

`Promise`\&lt;[`Provider`](Provider.md)\>

A promise that resolves to a Provider instance.

#### Defined in

[packages/account/src/providers/provider.ts:532](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/provider.ts#L532)
