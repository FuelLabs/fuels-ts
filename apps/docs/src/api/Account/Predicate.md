[**@fuel-ts/account v0.96.1**](../index.md) • **Docs**

***

# Class: Predicate\&lt;TData, TConfigurables\>

`Predicate` provides methods to populate transaction data with predicate information and sending transactions with them.

## Extends

- [`Account`](Account.md)

## Type Parameters

• **TData** *extends* `InputValue`[] = `InputValue`[]

• **TConfigurables** *extends* `object` \| `undefined` = `object`

## Constructors

### new Predicate()

> **new Predicate**\&lt;`TData`, `TConfigurables`\>(`__namedParameters`): [`Predicate`](Predicate.md)\&lt;`TData`, `TConfigurables`\>

Creates an instance of the Predicate class.

#### Parameters

• **\_\_namedParameters**: [`PredicateParams`](../index.md#predicateparamstdata-tconfigurables)\&lt;`TData`, `TConfigurables`\>

#### Returns

[`Predicate`](Predicate.md)\&lt;`TData`, `TConfigurables`\>

#### Overrides

[`Account`](Account.md).[`constructor`](Account.md#constructors)

#### Defined in

[packages/account/src/predicate/predicate.ts:69](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/predicate/predicate.ts#L69)

## Properties

### \_connector?

> `protected` `optional` **\_connector**: [`FuelConnector`](FuelConnector.md)

The connector for use with external wallets

#### Inherited from

[`Account`](Account.md).[`_connector`](Account.md#_connector)

#### Defined in

[packages/account/src/account.ts:87](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L87)

***

### \_provider?

> `protected` `optional` **\_provider**: [`Provider`](Provider.md)

The provider used to interact with the network.

#### Inherited from

[`Account`](Account.md).[`_provider`](Account.md#_provider)

#### Defined in

[packages/account/src/account.ts:82](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L82)

***

### address

> `readonly` **address**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address associated with the account.

#### Inherited from

[`Account`](Account.md).[`address`](Account.md#address)

#### Defined in

[packages/account/src/account.ts:77](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L77)

***

### bytes

> **bytes**: `Uint8Array`

#### Defined in

[packages/account/src/predicate/predicate.ts:55](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/predicate/predicate.ts#L55)

***

### interface?

> `optional` **interface**: `Interface`

#### Defined in

[packages/account/src/predicate/predicate.ts:57](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/predicate/predicate.ts#L57)

***

### loaderBytecode

> **loaderBytecode**: [`BytesLike`](../Interfaces/index.md#byteslike) = `''`

#### Defined in

[packages/account/src/predicate/predicate.ts:58](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/predicate/predicate.ts#L58)

***

### predicateData

> **predicateData**: `TData`

#### Defined in

[packages/account/src/predicate/predicate.ts:56](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/predicate/predicate.ts#L56)

## Accessors

### provider

> `get` **provider**(): [`Provider`](Provider.md)

The provider used to interact with the network.

#### Throws

`FuelError` if the provider is not set.

> `set` **provider**(`provider`): `void`

Sets the provider for the account.

#### Parameters

• **provider**: [`Provider`](Provider.md)

A Provider instance.

#### Returns

[`Provider`](Provider.md)

A Provider instance.

#### Inherited from

[`Account`](Account.md).[`provider`](Account.md#provider)

#### Defined in

[packages/account/src/account.ts:110](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L110)

## Methods

### addBatchTransfer()

> **addBatchTransfer**(`request`, `transferParams`): [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

Adds multiple transfers to a script transaction request.

#### Parameters

• **request**: [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

The script transaction request to add transfers to.

• **transferParams**: [`TransferParams`](../index.md#transferparams)[]

An array of `TransferParams` objects representing the transfers to be made.

#### Returns

[`ScriptTransactionRequest`](ScriptTransactionRequest.md)

The updated script transaction request.

#### Inherited from

[`Account`](Account.md).[`addBatchTransfer`](Account.md#addbatchtransfer)

#### Defined in

[packages/account/src/account.ts:409](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L409)

***

### addTransfer()

> **addTransfer**(`request`, `transferParams`): [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

Adds a transfer to the given transaction request.

#### Parameters

• **request**: [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

The script transaction request to add transfers to.

• **transferParams**: [`TransferParams`](../index.md#transferparams)

The object representing the transfer to be made.

#### Returns

[`ScriptTransactionRequest`](ScriptTransactionRequest.md)

The updated transaction request with the added transfer.

#### Inherited from

[`Account`](Account.md).[`addTransfer`](Account.md#addtransfer)

#### Defined in

[packages/account/src/account.ts:391](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L391)

***

### batchTransfer()

> **batchTransfer**(`transferParams`, `txParams`): `Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

Transfers multiple amounts of a token to multiple recipients.

#### Parameters

• **transferParams**: [`TransferParams`](../index.md#transferparams)[]

An array of `TransferParams` objects representing the transfers to be made.

• **txParams**: [`TxParamsType`](../index.md#txparamstype) = `{}`

Optional transaction parameters.

#### Returns

`Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

A promise that resolves to a `TransactionResponse` object representing the transaction result.

#### Inherited from

[`Account`](Account.md).[`batchTransfer`](Account.md#batchtransfer)

#### Defined in

[packages/account/src/account.ts:374](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L374)

***

### connect()

> **connect**(`provider`): [`Provider`](Provider.md)

Changes the provider connection for the account.

#### Parameters

• **provider**: [`Provider`](Provider.md)

A Provider instance.

#### Returns

[`Provider`](Provider.md)

The updated Provider instance.

#### Inherited from

[`Account`](Account.md).[`connect`](Account.md#connect)

#### Defined in

[packages/account/src/account.ts:133](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L133)

***

### createTransfer()

> **createTransfer**(`destination`, `amount`, `assetId`?, `txParams`?): `Promise`\&lt;[`ScriptTransactionRequest`](ScriptTransactionRequest.md)\>

A helper that creates a transfer transaction request and returns it.

#### Parameters

• **destination**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address of the destination.

• **amount**: `BigNumberish`

The amount of coins to transfer.

• **assetId?**: [`BytesLike`](../Interfaces/index.md#byteslike)

The asset ID of the coins to transfer (optional).

• **txParams?**: [`TxParamsType`](../index.md#txparamstype) = `{}`

The transaction parameters (optional).

#### Returns

`Promise`\&lt;[`ScriptTransactionRequest`](ScriptTransactionRequest.md)\>

A promise that resolves to the prepared transaction request.

#### Inherited from

[`Account`](Account.md).[`createTransfer`](Account.md#createtransfer)

#### Defined in

[packages/account/src/account.ts:336](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L336)

***

### fund()

> **fund**\&lt;`T`\>(`request`, `params`): `Promise`\&lt;`T`\>

Funds a transaction request by adding the necessary resources.

#### Type Parameters

• **T** *extends* [`TransactionRequest`](../index.md#transactionrequest)

The type of the TransactionRequest.

#### Parameters

• **request**: `T`

The transaction request to fund.

• **params**: [`EstimatedTxParams`](../index.md#estimatedtxparams)

The estimated transaction parameters.

#### Returns

`Promise`\&lt;`T`\>

A promise that resolves to the funded transaction request.

#### Inherited from

[`Account`](Account.md).[`fund`](Account.md#fund)

#### Defined in

[packages/account/src/account.ts:203](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L203)

***

### generateFakeResources()

> **generateFakeResources**(`coins`): [`Resource`](../index.md#resource)[]

Generates an array of fake resources based on the provided coins.

#### Parameters

• **coins**: [`FakeResources`](../index.md#fakeresources)[]

An array of `FakeResources` objects representing the coins.

#### Returns

[`Resource`](../index.md#resource)[]

An array of `Resource` objects with generated properties.

#### Overrides

[`Account`](Account.md).[`generateFakeResources`](Account.md#generatefakeresources)

#### Defined in

[packages/account/src/predicate/predicate.ts:230](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/predicate/predicate.ts#L230)

***

### getBalance()

> **getBalance**(`assetId`?): `Promise`\&lt;`BN`\>

Retrieves the balance of the account for the given asset.

#### Parameters

• **assetId?**: [`BytesLike`](../Interfaces/index.md#byteslike)

The asset ID to check the balance for (optional).

#### Returns

`Promise`\&lt;`BN`\>

A promise that resolves to the balance amount.

#### Inherited from

[`Account`](Account.md).[`getBalance`](Account.md#getbalance)

#### Defined in

[packages/account/src/account.ts:180](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L180)

***

### getBalances()

> **getBalances**(): `Promise`\&lt;[`GetBalancesResponse`](../index.md#getbalancesresponse)\>

Retrieves all the balances for the account.

#### Returns

`Promise`\&lt;[`GetBalancesResponse`](../index.md#getbalancesresponse)\>

A promise that resolves to an array of Coins and their quantities.

#### Inherited from

[`Account`](Account.md).[`getBalances`](Account.md#getbalances)

#### Defined in

[packages/account/src/account.ts:191](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L191)

***

### getCoins()

> **getCoins**(`assetId`?, `paginationArgs`?): `Promise`\&lt;[`GetCoinsResponse`](../index.md#getcoinsresponse)\>

Retrieves coins owned by the account.

#### Parameters

• **assetId?**: [`BytesLike`](../Interfaces/index.md#byteslike)

The asset ID of the coins to retrieve (optional).

• **paginationArgs?**: `CursorPaginationArgs`

#### Returns

`Promise`\&lt;[`GetCoinsResponse`](../index.md#getcoinsresponse)\>

A promise that resolves to an array of Coins.

#### Inherited from

[`Account`](Account.md).[`getCoins`](Account.md#getcoins)

#### Defined in

[packages/account/src/account.ts:158](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L158)

***

### getMessages()

> **getMessages**(`paginationArgs`?): `Promise`\&lt;[`GetMessagesResponse`](../index.md#getmessagesresponse)\>

Retrieves messages owned by the account.

#### Parameters

• **paginationArgs?**: `CursorPaginationArgs`

#### Returns

`Promise`\&lt;[`GetMessagesResponse`](../index.md#getmessagesresponse)\>

A promise that resolves to an array of Messages.

#### Inherited from

[`Account`](Account.md).[`getMessages`](Account.md#getmessages)

#### Defined in

[packages/account/src/account.ts:170](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L170)

***

### getResourcesToSpend()

> **getResourcesToSpend**(`quantities`, `excludedIds`?): `Promise`\&lt;[`Resource`](../index.md#resource)[]\>

Retrieves resources satisfying the spend query for the account.

#### Parameters

• **quantities**: [`CoinQuantityLike`](../index.md#coinquantitylike)[]

IDs of coins to exclude.

• **excludedIds?**: `ExcludeResourcesOption`

IDs of resources to be excluded from the query.

#### Returns

`Promise`\&lt;[`Resource`](../index.md#resource)[]\>

A promise that resolves to an array of Resources.

#### Overrides

[`Account`](Account.md).[`getResourcesToSpend`](Account.md#getresourcestospend)

#### Defined in

[packages/account/src/predicate/predicate.ts:208](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/predicate/predicate.ts#L208)

***

### getTransactionCost()

> **getTransactionCost**(`transactionRequestLike`, `transactionCostParams`): `Promise`\&lt;[`TransactionCost`](../index.md#transactioncost)\>

Returns a transaction cost to enable user
to set gasLimit and also reserve balance amounts
on the transaction.

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request object.

• **transactionCostParams**: [`TransactionCostParams`](../index.md#transactioncostparams) = `{}`

The transaction cost parameters (optional).

#### Returns

`Promise`\&lt;[`TransactionCost`](../index.md#transactioncost)\>

A promise that resolves to the transaction cost object.

#### Inherited from

[`Account`](Account.md).[`getTransactionCost`](Account.md#gettransactioncost)

#### Defined in

[packages/account/src/account.ts:532](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L532)

***

### populateTransactionPredicateData()

> **populateTransactionPredicateData**\&lt;`T`\>(`transactionRequestLike`): `T`

Populates the transaction data with predicate data.

#### Type Parameters

• **T** *extends* [`TransactionRequest`](../index.md#transactionrequest)

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request-like object.

#### Returns

`T`

The transaction request with predicate data.

#### Defined in

[packages/account/src/predicate/predicate.ts:104](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/predicate/predicate.ts#L104)

***

### sendTransaction()

> **sendTransaction**(`transactionRequestLike`): `Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

Sends a transaction with the populated predicate data.

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request-like object.

#### Returns

`Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Overrides

[`Account`](Account.md).[`sendTransaction`](Account.md#sendtransaction)

#### Defined in

[packages/account/src/predicate/predicate.ts:135](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/predicate/predicate.ts#L135)

***

### signTransaction()

> **signTransaction**(`transactionRequestLike`): `Promise`\&lt;`string`\>

Signs a transaction from the account via the connector..

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request to sign.

#### Returns

`Promise`\&lt;`string`\>

A promise that resolves to the signature of the transaction.

#### Inherited from

[`Account`](Account.md).[`signTransaction`](Account.md#signtransaction)

#### Defined in

[packages/account/src/account.ts:614](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L614)

***

### simulateTransaction()

> **simulateTransaction**(`transactionRequestLike`): `Promise`\&lt;[`CallResult`](../index.md#callresult)\>

Simulates a transaction with the populated predicate data.

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request-like object.

#### Returns

`Promise`\&lt;[`CallResult`](../index.md#callresult)\>

A promise that resolves to the call result.

#### Overrides

[`Account`](Account.md).[`simulateTransaction`](Account.md#simulatetransaction)

#### Defined in

[packages/account/src/predicate/predicate.ts:147](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/predicate/predicate.ts#L147)

***

### transfer()

> **transfer**(`destination`, `amount`, `assetId`?, `txParams`?): `Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

Transfers coins to a destination address.

#### Parameters

• **destination**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address of the destination.

• **amount**: `BigNumberish`

The amount of coins to transfer.

• **assetId?**: [`BytesLike`](../Interfaces/index.md#byteslike)

The asset ID of the coins to transfer (optional).

• **txParams?**: [`TxParamsType`](../index.md#txparamstype) = `{}`

The transaction parameters (optional).

#### Returns

`Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[`Account`](Account.md).[`transfer`](Account.md#transfer)

#### Defined in

[packages/account/src/account.ts:357](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L357)

***

### transferToContract()

> **transferToContract**(`contractId`, `amount`, `assetId`?, `txParams`?): `Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

Transfers coins to a contract address.

#### Parameters

• **contractId**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address of the contract.

• **amount**: `BigNumberish`

The amount of coins to transfer.

• **assetId?**: [`BytesLike`](../Interfaces/index.md#byteslike)

The asset ID of the coins to transfer (optional).

• **txParams?**: [`TxParamsType`](../index.md#txparamstype) = `{}`

The transaction parameters (optional).

#### Returns

`Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[`Account`](Account.md).[`transferToContract`](Account.md#transfertocontract)

#### Defined in

[packages/account/src/account.ts:430](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L430)

***

### withdrawToBaseLayer()

> **withdrawToBaseLayer**(`recipient`, `amount`, `txParams`): `Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

Withdraws an amount of the base asset to the base chain.

#### Parameters

• **recipient**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

Address of the recipient on the base chain.

• **amount**: `BigNumberish`

Amount of base asset.

• **txParams**: [`TxParamsType`](../index.md#txparamstype) = `{}`

The transaction parameters (optional).

#### Returns

`Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[`Account`](Account.md).[`withdrawToBaseLayer`](Account.md#withdrawtobaselayer)

#### Defined in

[packages/account/src/account.ts:483](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/account/src/account.ts#L483)
