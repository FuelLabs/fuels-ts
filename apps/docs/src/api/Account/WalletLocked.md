[**@fuel-ts/account v0.94.9**](../index.md) • **Docs**

***

# Class: WalletLocked

`WalletLocked` provides the functionalities for a locked  wallet.

## Extends

- [`Account`](Account.md)

## Constructors

### new WalletLocked()

> **new WalletLocked**(`address`, `provider`?, `connector`?): [`WalletLocked`](WalletLocked.md)

Creates a new Account instance.

#### Parameters

• **address**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address of the account.

• **provider?**: [`Provider`](Provider.md)

A Provider instance  (optional).

• **connector?**: [`FuelConnector`](FuelConnector.md)

A FuelConnector instance (optional).

#### Returns

[`WalletLocked`](WalletLocked.md)

#### Inherited from

[`Account`](Account.md).[`constructor`](Account.md#constructors)

#### Defined in

[packages/account/src/account.ts:96](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L96)

## Properties

### \_connector?

> `protected` `optional` **\_connector**: [`FuelConnector`](FuelConnector.md)

The connector for use with external wallets

#### Inherited from

[`Account`](Account.md).[`_connector`](Account.md#_connector)

#### Defined in

[packages/account/src/account.ts:87](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L87)

***

### \_provider?

> `protected` `optional` **\_provider**: [`Provider`](Provider.md)

The provider used to interact with the network.

#### Inherited from

[`Account`](Account.md).[`_provider`](Account.md#_provider)

#### Defined in

[packages/account/src/account.ts:82](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L82)

***

### address

> `readonly` **address**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address associated with the account.

#### Inherited from

[`Account`](Account.md).[`address`](Account.md#address)

#### Defined in

[packages/account/src/account.ts:77](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L77)

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

[packages/account/src/account.ts:110](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L110)

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

[packages/account/src/account.ts:407](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L407)

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

[packages/account/src/account.ts:389](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L389)

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

[packages/account/src/account.ts:372](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L372)

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

[packages/account/src/account.ts:133](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L133)

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

[packages/account/src/account.ts:334](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L334)

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

[packages/account/src/account.ts:203](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L203)

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

#### Inherited from

[`Account`](Account.md).[`generateFakeResources`](Account.md#generatefakeresources)

#### Defined in

[packages/account/src/account.ts:671](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L671)

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

[packages/account/src/account.ts:180](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L180)

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

[packages/account/src/account.ts:191](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L191)

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

[packages/account/src/account.ts:158](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L158)

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

[packages/account/src/account.ts:170](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L170)

***

### getResourcesToSpend()

> **getResourcesToSpend**(`quantities`, `excludedIds`?): `Promise`\&lt;[`Resource`](../index.md#resource)[]\>

Retrieves resources satisfying the spend query for the account.

#### Parameters

• **quantities**: [`CoinQuantityLike`](../index.md#coinquantitylike)[]

Quantities of resources to be obtained.

• **excludedIds?**: `ExcludeResourcesOption`

IDs of resources to be excluded from the query (optional).

#### Returns

`Promise`\&lt;[`Resource`](../index.md#resource)[]\>

A promise that resolves to an array of Resources.

#### Inherited from

[`Account`](Account.md).[`getResourcesToSpend`](Account.md#getresourcestospend)

#### Defined in

[packages/account/src/account.ts:145](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L145)

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

[packages/account/src/account.ts:530](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L530)

***

### sendTransaction()

> **sendTransaction**(`transactionRequestLike`, `sendTransactionParams`): `Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

Sends a transaction to the network.

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request to be sent.

• **sendTransactionParams**: [`EstimateTransactionParams`](../index.md#estimatetransactionparams) = `{}`

The provider send transaction parameters (optional).

#### Returns

`Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[`Account`](Account.md).[`sendTransaction`](Account.md#sendtransaction)

#### Defined in

[packages/account/src/account.ts:629](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L629)

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

[packages/account/src/account.ts:612](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L612)

***

### simulateTransaction()

> **simulateTransaction**(`transactionRequestLike`, `estimateTxParams`): `Promise`\&lt;[`CallResult`](../index.md#callresult)\>

Simulates a transaction.

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request to be simulated.

• **estimateTxParams**: [`EstimateTransactionParams`](../index.md#estimatetransactionparams) = `{}`

The estimate transaction params (optional).

#### Returns

`Promise`\&lt;[`CallResult`](../index.md#callresult)\>

A promise that resolves to the call result.

#### Inherited from

[`Account`](Account.md).[`simulateTransaction`](Account.md#simulatetransaction)

#### Defined in

[packages/account/src/account.ts:654](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L654)

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

[packages/account/src/account.ts:355](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L355)

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

[packages/account/src/account.ts:428](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L428)

***

### unlock()

> **unlock**(`privateKey`): [`WalletUnlocked`](WalletUnlocked.md)

Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.

#### Parameters

• **privateKey**: [`BytesLike`](../Interfaces/index.md#byteslike)

The private key used to unlock the wallet.

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[packages/account/src/wallet/wallets.ts:33](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/wallets.ts#L33)

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

[packages/account/src/account.ts:481](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L481)
