[**@fuel-ts/account v0.94.9**](../index.md) • **Docs**

***

# Class: WalletUnlocked

`WalletUnlocked` provides the functionalities for an unlocked wallet.

## Extends

- [`BaseWalletUnlocked`](BaseWalletUnlocked.md)

## Constructors

### new WalletUnlocked()

> **new WalletUnlocked**(`privateKey`, `provider`?): [`WalletUnlocked`](WalletUnlocked.md)

Creates a new BaseWalletUnlocked instance.

#### Parameters

• **privateKey**: [`BytesLike`](../Interfaces/index.md#byteslike)

The private key of the wallet.

• **provider?**: [`Provider`](Provider.md)

A Provider instance (optional).

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`constructor`](BaseWalletUnlocked.md#constructors)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:40](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/base-wallet-unlocked.ts#L40)

## Properties

### \_connector?

> `protected` `optional` **\_connector**: [`FuelConnector`](FuelConnector.md)

The connector for use with external wallets

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`_connector`](BaseWalletUnlocked.md#_connector)

#### Defined in

[packages/account/src/account.ts:87](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L87)

***

### \_provider?

> `protected` `optional` **\_provider**: [`Provider`](Provider.md)

The provider used to interact with the network.

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`_provider`](BaseWalletUnlocked.md#_provider)

#### Defined in

[packages/account/src/account.ts:82](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L82)

***

### address

> `readonly` **address**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address associated with the account.

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`address`](BaseWalletUnlocked.md#address)

#### Defined in

[packages/account/src/account.ts:77](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L77)

***

### signer()

> **signer**: () => [`Signer`](Signer.md)

A function that returns the wallet's signer.

#### Returns

[`Signer`](Signer.md)

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`signer`](BaseWalletUnlocked.md#signer)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:32](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/base-wallet-unlocked.ts#L32)

***

### defaultPath

> `static` **defaultPath**: `string` = `"m/44'/117999342./0"`

Default HDWallet path.

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`defaultPath`](BaseWalletUnlocked.md#defaultpath)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:27](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/base-wallet-unlocked.ts#L27)

## Accessors

### privateKey

> `get` **privateKey**(): `string`

Gets the private key of the wallet.

#### Returns

`string`

The private key of the wallet.

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`privateKey`](BaseWalletUnlocked.md#privatekey)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:51](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/base-wallet-unlocked.ts#L51)

***

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`provider`](BaseWalletUnlocked.md#provider)

#### Defined in

[packages/account/src/account.ts:110](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L110)

***

### publicKey

> `get` **publicKey**(): `string`

Gets the public key of the wallet.

#### Returns

`string`

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`publicKey`](BaseWalletUnlocked.md#publickey)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:60](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/base-wallet-unlocked.ts#L60)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`addBatchTransfer`](BaseWalletUnlocked.md#addbatchtransfer)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`addTransfer`](BaseWalletUnlocked.md#addtransfer)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`batchTransfer`](BaseWalletUnlocked.md#batchtransfer)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`connect`](BaseWalletUnlocked.md#connect)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`createTransfer`](BaseWalletUnlocked.md#createtransfer)

#### Defined in

[packages/account/src/account.ts:334](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L334)

***

### encrypt()

> **encrypt**(`password`): `Promise`\&lt;`string`\>

Encrypts an unlocked wallet with a password.

#### Parameters

• **password**: `string`

the password to encrypt the wallet with.

#### Returns

`Promise`\&lt;`string`\>

- the encrypted wallet.

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`encrypt`](BaseWalletUnlocked.md#encrypt)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:156](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/base-wallet-unlocked.ts#L156)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`fund`](BaseWalletUnlocked.md#fund)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`generateFakeResources`](BaseWalletUnlocked.md#generatefakeresources)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`getBalance`](BaseWalletUnlocked.md#getbalance)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`getBalances`](BaseWalletUnlocked.md#getbalances)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`getCoins`](BaseWalletUnlocked.md#getcoins)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`getMessages`](BaseWalletUnlocked.md#getmessages)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`getResourcesToSpend`](BaseWalletUnlocked.md#getresourcestospend)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`getTransactionCost`](BaseWalletUnlocked.md#gettransactioncost)

#### Defined in

[packages/account/src/account.ts:530](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L530)

***

### lock()

> **lock**(): [`WalletLocked`](WalletLocked.md)

Locks the wallet and returns an instance of WalletLocked.

#### Returns

[`WalletLocked`](WalletLocked.md)

An instance of WalletLocked.

#### Defined in

[packages/account/src/wallet/wallets.ts:48](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/wallets.ts#L48)

***

### populateTransactionWitnessesSignature()

> **populateTransactionWitnessesSignature**\&lt;`T`\>(`transactionRequestLike`): `Promise`\&lt;`T`\>

Populates a transaction with the witnesses signature.

#### Type Parameters

• **T** *extends* [`TransactionRequest`](../index.md#transactionrequest)

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request to populate.

#### Returns

`Promise`\&lt;`T`\>

The populated transaction request.

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`populateTransactionWitnessesSignature`](BaseWalletUnlocked.md#populatetransactionwitnessessignature)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:95](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/base-wallet-unlocked.ts#L95)

***

### sendTransaction()

> **sendTransaction**(`transactionRequestLike`, `estimateTxDependencies`): `Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request to send.

• **estimateTxDependencies**: [`EstimateTransactionParams`](../index.md#estimatetransactionparams) = `{}`

Whether to estimate the transaction dependencies.

#### Returns

`Promise`\&lt;[`TransactionResponse`](TransactionResponse.md)\>

A promise that resolves to the TransactionResponse object.

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`sendTransaction`](BaseWalletUnlocked.md#sendtransaction)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:113](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/base-wallet-unlocked.ts#L113)

***

### signMessage()

> **signMessage**(`message`): `Promise`\&lt;`string`\>

Signs a message with the wallet's private key.

#### Parameters

• **message**: `string`

The message to sign.

#### Returns

`Promise`\&lt;`string`\>

A promise that resolves to the signature as a ECDSA 64 bytes string.

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`signMessage`](BaseWalletUnlocked.md#signmessage)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:70](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/base-wallet-unlocked.ts#L70)

***

### signTransaction()

> **signTransaction**(`transactionRequestLike`): `Promise`\&lt;`string`\>

Signs a transaction with the wallet's private key.

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request to sign.

#### Returns

`Promise`\&lt;`string`\>

A promise that resolves to the signature as a ECDSA 64 bytes string.

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`signTransaction`](BaseWalletUnlocked.md#signtransaction)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:81](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/base-wallet-unlocked.ts#L81)

***

### simulateTransaction()

> **simulateTransaction**(`transactionRequestLike`, `__namedParameters`): `Promise`\&lt;[`CallResult`](../index.md#callresult)\>

Populates the witness signature for a transaction and sends a call to the network using `provider.dryRun`.

#### Parameters

• **transactionRequestLike**: [`TransactionRequestLike`](../index.md#transactionrequestlike)

The transaction request to simulate.

• **\_\_namedParameters**: [`EstimateTransactionParams`](../index.md#estimatetransactionparams) = `{}`

#### Returns

`Promise`\&lt;[`CallResult`](../index.md#callresult)\>

A promise that resolves to the CallResult object.

#### Inherited from

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`simulateTransaction`](BaseWalletUnlocked.md#simulatetransaction)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:133](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/base-wallet-unlocked.ts#L133)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`transfer`](BaseWalletUnlocked.md#transfer)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`transferToContract`](BaseWalletUnlocked.md#transfertocontract)

#### Defined in

[packages/account/src/account.ts:428](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L428)

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

[`BaseWalletUnlocked`](BaseWalletUnlocked.md).[`withdrawToBaseLayer`](BaseWalletUnlocked.md#withdrawtobaselayer)

#### Defined in

[packages/account/src/account.ts:481](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/account.ts#L481)

***

### fromEncryptedJson()

> `static` **fromEncryptedJson**(`jsonWallet`, `password`, `provider`?): `Promise`\&lt;[`WalletUnlocked`](WalletUnlocked.md)\>

Create a Wallet Unlocked from an encrypted JSON.

#### Parameters

• **jsonWallet**: `string`

The encrypted JSON keystore.

• **password**: `string`

The password to decrypt the JSON.

• **provider?**: [`Provider`](Provider.md)

A Provider instance (optional).

#### Returns

`Promise`\&lt;[`WalletUnlocked`](WalletUnlocked.md)\>

An unlocked wallet instance.

#### Defined in

[packages/account/src/wallet/wallets.ts:123](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/wallets.ts#L123)

***

### fromExtendedKey()

> `static` **fromExtendedKey**(`extendedKey`, `provider`?): [`WalletUnlocked`](WalletUnlocked.md)

Create a Wallet Unlocked from an extended key.

#### Parameters

• **extendedKey**: `string`

The extended key.

• **provider?**: [`Provider`](Provider.md)

A Provider instance (optional).

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[packages/account/src/wallet/wallets.ts:109](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/wallets.ts#L109)

***

### fromMnemonic()

> `static` **fromMnemonic**(`mnemonic`, `path`?, `passphrase`?, `provider`?): [`WalletUnlocked`](WalletUnlocked.md)

Create a Wallet Unlocked from a mnemonic phrase.

#### Parameters

• **mnemonic**: `string`

The mnemonic phrase.

• **path?**: `string`

The derivation path (optional).

• **passphrase?**: [`BytesLike`](../Interfaces/index.md#byteslike)

The passphrase for the mnemonic (optional).

• **provider?**: [`Provider`](Provider.md)

A Provider instance (optional).

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[packages/account/src/wallet/wallets.ts:89](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/wallets.ts#L89)

***

### fromSeed()

> `static` **fromSeed**(`seed`, `path`?, `provider`?): [`WalletUnlocked`](WalletUnlocked.md)

Create a Wallet Unlocked from a seed.

#### Parameters

• **seed**: `string`

The seed phrase.

• **path?**: `string`

The derivation path (optional).

• **provider?**: [`Provider`](Provider.md)

A Provider instance (optional).

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[packages/account/src/wallet/wallets.ts:73](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/wallets.ts#L73)

***

### generate()

> `static` **generate**(`generateOptions`?): [`WalletUnlocked`](WalletUnlocked.md)

Generate a new Wallet Unlocked with a random key pair.

#### Parameters

• **generateOptions?**: [`GenerateOptions`](./GenerateOptions.md)

Options to customize the generation process (optional).

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[packages/account/src/wallet/wallets.ts:59](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet/wallets.ts#L59)
