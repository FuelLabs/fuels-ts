# Class: Provider

[@fuel-ts/providers](/api/Providers/index.md).Provider

A provider for connecting to a node

## Properties

### #subscriptionClient

• `Private` **#subscriptionClient**: `Client`

#### Defined in

[packages/providers/src/provider.ts:230](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L230)

___

### cache

• `Optional` **cache**: `MemoryCache`

#### Defined in

[packages/providers/src/provider.ts:232](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L232)

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
| `getBlock` | (`variables?`: `Exact`&lt;{ `blockHeight?`: `InputMaybe`&lt;`string`\> ; `blockId?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlockQuery`\> |
| `getBlockWithTransactions` | (`variables?`: `Exact`&lt;{ `blockHeight?`: `InputMaybe`&lt;`string`\> ; `blockId?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlockWithTransactionsQuery`\> |
| `getBlocks` | (`variables?`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlocksQuery`\> |
| `getChain` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetChainQuery`\> |
| `getCoin` | (`variables`: `Exact`&lt;{ `coinId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinQuery`\> |
| `getCoins` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `filter`: `GqlCoinFilterInput` ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinsQuery`\> |
| `getCoinsToSpend` | (`variables`: `Exact`&lt;{ `excludedIds?`: `InputMaybe`&lt;`GqlExcludeInput`\> ; `owner`: `string` ; `queryPerAsset`: `GqlSpendQueryElementInput` \| `GqlSpendQueryElementInput`[]  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinsToSpendQuery`\> |
| `getContract` | (`variables`: `Exact`&lt;{ `contractId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetContractQuery`\> |
| `getContractBalance` | (`variables`: `Exact`&lt;{ `asset`: `string` ; `contract`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetContractBalanceQuery`\> |
| `getMessageProof` | (`variables`: `Exact`&lt;{ `commitBlockHeight?`: `any` ; `commitBlockId?`: `InputMaybe`&lt;`string`\> ; `messageId`: `any` ; `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageProofQuery`\> |
| `getMessageStatus` | (`variables`: `Exact`&lt;{ `nonce`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageStatusQuery`\> |
| `getMessages` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\> ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessagesQuery`\> |
| `getNodeInfo` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetNodeInfoQuery`\> |
| `getTransaction` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionQuery`\> |
| `getTransactionWithReceipts` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionWithReceiptsQuery`\> |
| `getTransactions` | (`variables?`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionsQuery`\> |
| `getTransactionsByOwner` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\> ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionsByOwnerQuery`\> |
| `getVersion` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetVersionQuery`\> |
| `produceBlocks` | (`variables`: `Exact`&lt;{ `blocksToProduce`: `string` ; `startTimestamp?`: `any`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlProduceBlocksMutation`\> |
| `statusChange` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `AsyncIterable`&lt;`GqlStatusChangeSubscription`\> |
| `submit` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlSubmitMutation`\> |
| `submitAndAwait` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `AsyncIterable`&lt;`GqlSubmitAndAwaitSubscription`\> |

#### Defined in

[packages/providers/src/provider.ts:229](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L229)

___

### options

• **options**: [`ProviderOptions`](/api/Providers/index.md#provideroptions)&lt;`Response`\>

#### Defined in

[packages/providers/src/provider.ts:233](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L233)

___

### url

• **url**: `string`

GraphQL endpoint of the Fuel node

#### Defined in

[packages/providers/src/provider.ts:263](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L263)

___

### chainInfoCache

▪ `Static` **chainInfoCache**: `ChainInfoCache` = `{}`

#### Defined in

[packages/providers/src/provider.ts:250](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L250)

___

### nodeInfoCache

▪ `Static` **nodeInfoCache**: `NodeInfoCache` = `{}`

#### Defined in

[packages/providers/src/provider.ts:251](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L251)

## Methods

### call

▸ **call**(`transactionRequestLike`, `utxoValidation?`): `Promise`&lt;[`CallResult`](/api/Providers/index.md#callresult)\>

Executes a transaction without actually submitting it to the chain.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike) | The transaction request object. |
| `utxoValidation` | [`ProviderCallParams`](/api/Providers/index.md#providercallparams) | Additional provider call parameters. |

#### Returns

`Promise`&lt;[`CallResult`](/api/Providers/index.md#callresult)\>

A promise that resolves to the call result object.

#### Defined in

[packages/providers/src/provider.ts:585](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L585)

___

### createOperations

▸ `Private` **createOperations**(): `void`

Create GraphQL client and set operations.

#### Returns

`void`

The operation SDK object

#### Defined in

[packages/providers/src/provider.ts:370](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L370)

___

### estimatePredicates

▸ **estimatePredicates**(`transactionRequest`): `Promise`&lt;[`TransactionRequest`](/api/Providers/index.md#transactionrequest)\>

Verifies whether enough gas is available to complete transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](/api/Providers/index.md#transactionrequest) | The transaction request object. |

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Providers/index.md#transactionrequest)\>

A promise that resolves to the estimated transaction request object.

#### Defined in

[packages/providers/src/provider.ts:608](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L608)

___

### estimateTxDependencies

▸ **estimateTxDependencies**(`transactionRequest`): `Promise`&lt;`void`\>

Will dryRun a transaction and check for missing dependencies.

If there are missing variable outputs,
`addVariableOutputs` is called on the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](/api/Providers/index.md#transactionrequest) | The transaction request object. |

#### Returns

`Promise`&lt;`void`\>

A promise.

#### Defined in

[packages/providers/src/provider.ts:645](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L645)

___

### fetchChain

▸ **fetchChain**(): `Promise`&lt;[`ChainInfo`](/api/Providers/index.md#chaininfo)\>

Fetches the `chainInfo` for the given node URL.

#### Returns

`Promise`&lt;[`ChainInfo`](/api/Providers/index.md#chaininfo)\>

ChainInfo object

#### Defined in

[packages/providers/src/provider.ts:501](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L501)

___

### fetchChainAndNodeInfo

▸ **fetchChainAndNodeInfo**(): `Promise`&lt;{ `chain`: [`ChainInfo`](/api/Providers/index.md#chaininfo) ; `nodeInfo`: [`NodeInfo`](/api/Providers/index.md#nodeinfo)  }\>

Retrieves and caches chain and node information if not already cached.

- Checks the cache for existing chain and node information based on the current URL.
- If not found in cache, fetches the information, caches it, and then returns the data.

#### Returns

`Promise`&lt;{ `chain`: [`ChainInfo`](/api/Providers/index.md#chaininfo) ; `nodeInfo`: [`NodeInfo`](/api/Providers/index.md#nodeinfo)  }\>

NodeInfo and Chain

#### Defined in

[packages/providers/src/provider.ts:343](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L343)

___

### fetchNode

▸ **fetchNode**(): `Promise`&lt;[`NodeInfo`](/api/Providers/index.md#nodeinfo)\>

Returns the chain information.

#### Returns

`Promise`&lt;[`NodeInfo`](/api/Providers/index.md#nodeinfo)\>

NodeInfo object

#### Defined in

[packages/providers/src/provider.ts:484](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L484)

___

### getBalance

▸ **getBalance**(`owner`, `assetId`): `Promise`&lt;`BN`\>

Returns the balance for the given owner for the given asset ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get coins for. |
| `assetId` | `BytesLike` | The asset ID of coins to get. |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the balance.

#### Defined in

[packages/providers/src/provider.ts:1016](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L1016)

___

### getBalances

▸ **getBalances**(`owner`, `paginationArgs?`): `Promise`&lt;[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]\>

Returns balances for the given owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get coins for. |
| `paginationArgs?` | `CursorPaginationArgs` | Pagination arguments. |

#### Returns

`Promise`&lt;[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]\>

A promise that resolves to the balances.

#### Defined in

[packages/providers/src/provider.ts:1036](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L1036)

___

### getBlock

▸ **getBlock**(`idOrHeight`): `Promise`&lt;``null`` \| [`Block`](/api/Providers/index.md#block)\>

Returns block matching the given ID or height.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrHeight` | `string` \| `number` | ID or height of the block. |

#### Returns

`Promise`&lt;``null`` \| [`Block`](/api/Providers/index.md#block)\>

A promise that resolves to the block.

#### Defined in

[packages/providers/src/provider.ts:872](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L872)

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`&lt;`BN`\>

Returns the block number.

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the block number

#### Defined in

[packages/providers/src/provider.ts:474](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L474)

___

### getBlockWithTransactions

▸ **getBlockWithTransactions**(`idOrHeight`): `Promise`&lt;``null`` \| [`Block`](/api/Providers/index.md#block) & { `transactions`: `Partial`&lt;`Omit`&lt;`TransactionScript`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionCreate`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionMint`, ``"type"``\>\> & { `type`: [`TransactionType`](/api/Providers/TransactionType.md)  }[]  }\>

Returns block matching the given ID or type, including transaction data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrHeight` | `string` \| `number` | ID or height of the block. |

#### Returns

`Promise`&lt;``null`` \| [`Block`](/api/Providers/index.md#block) & { `transactions`: `Partial`&lt;`Omit`&lt;`TransactionScript`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionCreate`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionMint`, ``"type"``\>\> & { `type`: [`TransactionType`](/api/Providers/TransactionType.md)  }[]  }\>

A promise that resolves to the block.

#### Defined in

[packages/providers/src/provider.ts:926](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L926)

___

### getBlocks

▸ **getBlocks**(`params`): `Promise`&lt;[`Block`](/api/Providers/index.md#block)[]\>

Returns all the blocks matching the given parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\> | The parameters to query blocks. |

#### Returns

`Promise`&lt;[`Block`](/api/Providers/index.md#block)[]\>

A promise that resolves to the blocks.

#### Defined in

[packages/providers/src/provider.ts:907](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L907)

___

### getChain

▸ **getChain**(): [`ChainInfo`](/api/Providers/index.md#chaininfo)

Returns the cached chainInfo for the current URL.

#### Returns

[`ChainInfo`](/api/Providers/index.md#chaininfo)

#### Defined in

[packages/providers/src/provider.ts:285](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L285)

___

### getChainId

▸ **getChainId**(): `number`

Returns the chain ID

#### Returns

`number`

A promise that resolves to the chain ID number

#### Defined in

[packages/providers/src/provider.ts:510](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L510)

___

### getCoins

▸ **getCoins**(`owner`, `assetId?`, `paginationArgs?`): `Promise`&lt;[`Coin`](/api/Providers/index.md#coin)[]\>

Returns coins for the given owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get coins for |
| `assetId?` | `BytesLike` | The asset ID of coins to get |
| `paginationArgs?` | `CursorPaginationArgs` | Pagination arguments |

#### Returns

`Promise`&lt;[`Coin`](/api/Providers/index.md#coin)[]\>

#### Defined in

[packages/providers/src/provider.ts:766](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L766)

___

### getContract

▸ **getContract**(`contractId`): `Promise`&lt;``null`` \| [`ContractResult`](/api/Providers/index.md#contractresult)\>

Get deployed contract with the given ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `string` | ID of the contract. |

#### Returns

`Promise`&lt;``null`` \| [`ContractResult`](/api/Providers/index.md#contractresult)\>

A promise that resolves to the contract.

#### Defined in

[packages/providers/src/provider.ts:981](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L981)

___

### getContractBalance

▸ **getContractBalance**(`contractId`, `assetId`): `Promise`&lt;`BN`\>

Returns the balance for the given contract for the given asset ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The contract ID to get the balance for. |
| `assetId` | `BytesLike` | The asset ID of coins to get. |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the balance.

#### Defined in

[packages/providers/src/provider.ts:996](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L996)

___

### getGasConfig

▸ **getGasConfig**(): `Object`

Returns some helpful parameters related to gas fees.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `gasPerByte` | `BN` |
| `gasPriceFactor` | `BN` |
| `maxGasPerPredicate` | `BN` |
| `maxGasPerTx` | `BN` |
| `minGasPrice` | `BN` |

#### Defined in

[packages/providers/src/provider.ts:313](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L313)

___

### getMessageProof

▸ **getMessageProof**(`transactionId`, `messageId`, `commitBlockId?`, `commitBlockHeight?`): `Promise`&lt;``null`` \| [`MessageProof`](/api/Providers/index.md#messageproof)\>

Returns Message Proof for given transaction id and the message id from MessageOut receipt.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The transaction to get message from. |
| `messageId` | `string` | The message id from MessageOut receipt. |
| `commitBlockId?` | `string` | The commit block id. |
| `commitBlockHeight?` | `BN` | The commit block height. |

#### Returns

`Promise`&lt;``null`` \| [`MessageProof`](/api/Providers/index.md#messageproof)\>

A promise that resolves to the message proof.

#### Defined in

[packages/providers/src/provider.ts:1103](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L1103)

___

### getMessageStatus

▸ **getMessageStatus**(`nonce`): `Promise`&lt;[`MessageStatus`](/api/Providers/index.md#messagestatus)\>

Returns Message Proof for given transaction id and the message id from MessageOut receipt.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nonce` | `string` | The nonce of the message to get status from. |

#### Returns

`Promise`&lt;[`MessageStatus`](/api/Providers/index.md#messagestatus)\>

A promise that resolves to the message status

#### Defined in

[packages/providers/src/provider.ts:1211](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L1211)

___

### getMessages

▸ **getMessages**(`address`, `paginationArgs?`): `Promise`&lt;[`Message`](/api/Providers/index.md#message)[]\>

Returns message for the given address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get message from. |
| `paginationArgs?` | `CursorPaginationArgs` | Pagination arguments. |

#### Returns

`Promise`&lt;[`Message`](/api/Providers/index.md#message)[]\>

A promise that resolves to the messages.

#### Defined in

[packages/providers/src/provider.ts:1063](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L1063)

___

### getNode

▸ **getNode**(): [`NodeInfo`](/api/Providers/index.md#nodeinfo)

Returns the cached nodeInfo for the current URL.

#### Returns

[`NodeInfo`](/api/Providers/index.md#nodeinfo)

#### Defined in

[packages/providers/src/provider.ts:299](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L299)

___

### getResourcesToSpend

▸ **getResourcesToSpend**(`owner`, `quantities`, `excludedIds?`): `Promise`&lt;[`Resource`](/api/Providers/index.md#resource)[]\>

Returns resources for the given owner satisfying the spend query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get resources for. |
| `quantities` | [`CoinQuantityLike`](/api/Providers/index.md#coinquantitylike)[] | The quantities to get. |
| `excludedIds?` | `ExcludeResourcesOption` | IDs of excluded resources from the selection. |

#### Returns

`Promise`&lt;[`Resource`](/api/Providers/index.md#resource)[]\>

A promise that resolves to the resources.

#### Defined in

[packages/providers/src/provider.ts:801](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L801)

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

[packages/providers/src/provider.ts:962](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L962)

___

### getTransactionCost

▸ **getTransactionCost**(`transactionRequestLike`, `tolerance?`): `Promise`&lt;[`TransactionCost`](/api/Providers/index.md#transactioncost)\>

Returns a transaction cost to enable user
to set gasLimit and also reserve balance amounts
on the the transaction.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike) | `undefined` | The transaction request object. |
| `tolerance` | `number` | `0.2` | The tolerance to add on top of the gasUsed. |

#### Returns

`Promise`&lt;[`TransactionCost`](/api/Providers/index.md#transactioncost)\>

A promise that resolves to the transaction cost object.

#### Defined in

[packages/providers/src/provider.ts:725](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L725)

___

### getVersion

▸ **getVersion**(): `Promise`&lt;`string`\>

Returns the version of the connected node.

#### Returns

`Promise`&lt;`string`\>

A promise that resolves to the version string.

#### Defined in

[packages/providers/src/provider.ts:448](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L448)

___

### produceBlocks

▸ **produceBlocks**(`amount`, `startTime?`): `Promise`&lt;`BN`\>

Lets you produce blocks with custom timestamps and the block number of the last block produced.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | The amount of blocks to produce |
| `startTime?` | `number` | The UNIX timestamp to set for the first produced block |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the block number of the last produced block.

#### Defined in

[packages/providers/src/provider.ts:1226](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L1226)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Submits a transaction to the chain to be executed.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike) | The transaction request object. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response object.

#### Defined in

[packages/providers/src/provider.ts:542](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L542)

___

### simulate

▸ **simulate**(`transactionRequestLike`): `Promise`&lt;[`CallResult`](/api/Providers/index.md#callresult)\>

Executes a signed transaction without applying the states changes
on the chain.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike) | The transaction request object. |

#### Returns

`Promise`&lt;[`CallResult`](/api/Providers/index.md#callresult)\>

A promise that resolves to the call result object.

#### Defined in

[packages/providers/src/provider.ts:696](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L696)

___

### switchUrl

▸ **switchUrl**(`url`): `Promise`&lt;`void`\>

Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/providers/src/provider.ts:329](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L329)

___

### adaptSubscriptionResponse

▸ `Private` `Static` **adaptSubscriptionResponse**(`originalResponse`): `Promise`&lt;`Response`\>

The subscription response processing serves two purposes:
1. To add an `event` field which is mandated by the graphql-sse library (not by the SSE protocol)
(see [the library's protocol](https://github.com/enisdenjo/graphql-sse/blob/master/PROTOCOL.md))
2. To process the node's response because it's a different format to the types generated by graphql-codegen.

#### Parameters

| Name | Type |
| :------ | :------ |
| `originalResponse` | `Response` |

#### Returns

`Promise`&lt;`Response`\>

#### Defined in

[packages/providers/src/provider.ts:431](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L431)

___

### create

▸ `Static` **create**(`url`, `options?`): `Promise`&lt;[`Provider`](/api/Providers/Provider.md)\>

Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | GraphQL endpoint of the Fuel node |
| `options` | `Partial`&lt;[`ProviderOptions`](/api/Providers/index.md#provideroptions)&lt;`Response`\>\> | Additional options for the provider |

#### Returns

`Promise`&lt;[`Provider`](/api/Providers/Provider.md)\>

#### Defined in

[packages/providers/src/provider.ts:276](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L276)

___

### createSubscriptionClient

▸ `Private` `Static` **createSubscriptionClient**(`url`, `fetchFn`, `options`): `Client`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `fetchFn` | [`CustomFetch`](/api/Providers/index.md#customfetch)&lt;`Response`\> |
| `options` | [`ProviderOptions`](/api/Providers/index.md#provideroptions)&lt;`Response`\> |

#### Returns

`Client`

#### Defined in

[packages/providers/src/provider.ts:396](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L396)

___

### getFetchFn

▸ `Private` `Static` **getFetchFn**(`options`): [`CustomFetch`](/api/Providers/index.md#customfetch)&lt;`Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ProviderOptions`](/api/Providers/index.md#provideroptions)&lt;`Response`\> |

#### Returns

[`CustomFetch`](/api/Providers/index.md#customfetch)&lt;`Response`\>

#### Defined in

[packages/providers/src/provider.ts:239](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/providers/src/provider.ts#L239)
