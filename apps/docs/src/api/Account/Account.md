[**@fuel-ts/account v0.97.0**](../index.md) • **Docs**

***

# Class: Account

`Account` provides an abstraction for interacting with accounts or wallets on the network.

## Extends

- [`AbstractAccount`](../Interfaces/AbstractAccount.md)

## Extended by

- [`BaseWalletUnlocked`](BaseWalletUnlocked.md)
- [`WalletLocked`](WalletLocked.md)
- [`Predicate`](Predicate.md)

## Constructors

### new Account()

> **new Account**(`address`, `provider`?, `connector`?): [`Account`](Account.md)

Creates a new Account instance.

#### Parameters

• **address**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address of the account.

• **provider?**: [`Provider`](Provider.md)

A Provider instance  (optional).

• **connector?**: [`FuelConnector`](FuelConnector.md)

A FuelConnector instance (optional).

#### Returns

[`Account`](Account.md)

#### Overrides

[`AbstractAccount`](../Interfaces/AbstractAccount.md).[`constructor`](../Interfaces/AbstractAccount.md#constructors)

#### Defined in

[packages/account/src/account.ts:102](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L102)

## Properties

### \_connector?

> `protected` `optional` **\_connector**: [`FuelConnector`](FuelConnector.md)

The connector for use with external wallets

#### Defined in

[packages/account/src/account.ts:93](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L93)

***

### \_provider?

> `protected` `optional` **\_provider**: [`Provider`](Provider.md)

The provider used to interact with the network.

#### Defined in

[packages/account/src/account.ts:88](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L88)

***

### address

> `readonly` **address**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address associated with the account.

#### Overrides

[`AbstractAccount`](../Interfaces/AbstractAccount.md).[`address`](../Interfaces/AbstractAccount.md#address)

#### Defined in

[packages/account/src/account.ts:83](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L83)

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

#### Overrides

[`AbstractAccount`](../Interfaces/AbstractAccount.md).[`provider`](../Interfaces/AbstractAccount.md#provider)

#### Defined in

[packages/account/src/account.ts:116](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L116)

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

#### Defined in

[packages/account/src/account.ts:415](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L415)

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

#### Defined in

[packages/account/src/account.ts:397](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L397)

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

#### Defined in

[packages/account/src/account.ts:380](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L380)

***

### batchTransferToContracts()

> **batchTransferToContracts**(`contractTransferParams`, `txParams`): `Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

#### Parameters

• **contractTransferParams**: [`ContractTransferParams`](../index.md#contracttransferparams)[]

• **txParams**: [`TxParamsType`](../index.md#txparamstype) = `{}`

#### Returns

`Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

#### Defined in

[packages/account/src/account.ts:445](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L445)

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

#### Defined in

[packages/account/src/account.ts:139](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L139)

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

#### Defined in

[packages/account/src/account.ts:342](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L342)

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

#### Overrides

[`AbstractAccount`](../Interfaces/AbstractAccount.md).[`fund`](../Interfaces/AbstractAccount.md#fund)

#### Defined in

[packages/account/src/account.ts:209](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L209)

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

#### Defined in

[packages/account/src/account.ts:688](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L688)

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

#### Defined in

[packages/account/src/account.ts:186](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L186)

***

### getBalances()

> **getBalances**(): `Promise`\&lt;[`GetBalancesResponse`](../index.md#getbalancesresponse)\>

Retrieves all the balances for the account.

#### Returns

`Promise`\&lt;[`GetBalancesResponse`](../index.md#getbalancesresponse)\>

A promise that resolves to an array of Coins and their quantities.

#### Defined in

[packages/account/src/account.ts:197](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L197)

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

#### Defined in

[packages/account/src/account.ts:164](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L164)

***

### getMessages()

> **getMessages**(`paginationArgs`?): `Promise`\&lt;[`GetMessagesResponse`](../index.md#getmessagesresponse)\>

Retrieves messages owned by the account.

#### Parameters

• **paginationArgs?**: `CursorPaginationArgs`

#### Returns

`Promise`\&lt;[`GetMessagesResponse`](../index.md#getmessagesresponse)\>

A promise that resolves to an array of Messages.

#### Defined in

[packages/account/src/account.ts:176](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L176)

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

#### Overrides

[`AbstractAccount`](../Interfaces/AbstractAccount.md).[`getResourcesToSpend`](../Interfaces/AbstractAccount.md#getresourcestospend)

#### Defined in

[packages/account/src/account.ts:151](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L151)

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

#### Overrides

[`AbstractAccount`](../Interfaces/AbstractAccount.md).[`getTransactionCost`](../Interfaces/AbstractAccount.md#gettransactioncost)

#### Defined in

[packages/account/src/account.ts:547](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L547)

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

#### Overrides

[`AbstractAccount`](../Interfaces/AbstractAccount.md).[`sendTransaction`](../Interfaces/AbstractAccount.md#sendtransaction)

#### Defined in

[packages/account/src/account.ts:646](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L646)

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

#### Defined in

[packages/account/src/account.ts:629](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L629)

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

#### Overrides

[`AbstractAccount`](../Interfaces/AbstractAccount.md).[`simulateTransaction`](../Interfaces/AbstractAccount.md#simulatetransaction)

#### Defined in

[packages/account/src/account.ts:671](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L671)

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

#### Defined in

[packages/account/src/account.ts:363](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L363)

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

#### Defined in

[packages/account/src/account.ts:436](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L436)

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

#### Defined in

[packages/account/src/account.ts:498](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/account/src/account.ts#L498)
