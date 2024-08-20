# Class: WalletLocked

[@fuel-ts/account](/api/Account/index.md).WalletLocked

`WalletLocked` provides the functionalities for a locked  wallet.

## Hierarchy

- [`Account`](/api/Account/Account.md)

  ↳ **`WalletLocked`**

## Constructors

### constructor

• **new WalletLocked**(`address`, `provider?`, `connector?`): [`WalletLocked`](/api/Account/WalletLocked.md)

Creates a new Account instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the account. |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |
| `connector?` | [`FuelConnector`](/api/Account/FuelConnector.md) | A FuelConnector instance (optional). |

#### Returns

[`WalletLocked`](/api/Account/WalletLocked.md)

#### Inherited from

[Account](/api/Account/Account.md).[constructor](/api/Account/Account.md#constructor)

#### Defined in

[packages/account/src/account.ts:94](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L94)

## Properties

### \_connector

• `Protected` `Optional` **\_connector**: [`FuelConnector`](/api/Account/FuelConnector.md)

The connector for use with external wallets

#### Inherited from

[Account](/api/Account/Account.md).[_connector](/api/Account/Account.md#_connector)

#### Defined in

[packages/account/src/account.ts:85](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L85)

___

### \_provider

• `Protected` `Optional` **\_provider**: [`Provider`](/api/Account/Provider.md)

The provider used to interact with the network.

#### Inherited from

[Account](/api/Account/Account.md).[_provider](/api/Account/Account.md#_provider)

#### Defined in

[packages/account/src/account.ts:80](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L80)

___

### address

• `Readonly` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The address associated with the account.

#### Inherited from

[Account](/api/Account/Account.md).[address](/api/Account/Account.md#address)

#### Defined in

[packages/account/src/account.ts:75](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L75)

## Accessors

### provider

• `get` **provider**(): [`Provider`](/api/Account/Provider.md)

The provider used to interact with the network.

**`Throws`**

`FuelError` if the provider is not set.

#### Returns

[`Provider`](/api/Account/Provider.md)

A Provider instance.

#### Inherited from

Account.provider

#### Defined in

[packages/account/src/account.ts:108](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L108)

• `set` **provider**(`provider`): `void`

Sets the provider for the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `provider` | [`Provider`](/api/Account/Provider.md) | A Provider instance. |

#### Returns

`void`

#### Inherited from

Account.provider

#### Defined in

[packages/account/src/account.ts:121](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L121)

## Methods

### addBatchTransfer

▸ **addBatchTransfer**(`request`, `transferParams`): [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

Adds multiple transfers to a script transaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md) | The script transaction request to add transfers to. |
| `transferParams` | [`TransferParams`](/api/Account/index.md#transferparams)[] | An array of `TransferParams` objects representing the transfers to be made. |

#### Returns

[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

The updated script transaction request.

#### Inherited from

[Account](/api/Account/Account.md).[addBatchTransfer](/api/Account/Account.md#addbatchtransfer)

#### Defined in

[packages/account/src/account.ts:405](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L405)

___

### addTransfer

▸ **addTransfer**(`request`, `transferParams`): [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

Adds a transfer to the given transaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md) | The script transaction request to add transfers to. |
| `transferParams` | [`TransferParams`](/api/Account/index.md#transferparams) | The object representing the transfer to be made. |

#### Returns

[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

The updated transaction request with the added transfer.

#### Inherited from

[Account](/api/Account/Account.md).[addTransfer](/api/Account/Account.md#addtransfer)

#### Defined in

[packages/account/src/account.ts:387](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L387)

___

### batchTransfer

▸ **batchTransfer**(`transferParams`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Transfers multiple amounts of a token to multiple recipients.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transferParams` | [`TransferParams`](/api/Account/index.md#transferparams)[] | An array of `TransferParams` objects representing the transfers to be made. |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | Optional transaction parameters. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to a `TransactionResponse` object representing the transaction result.

#### Inherited from

[Account](/api/Account/Account.md).[batchTransfer](/api/Account/Account.md#batchtransfer)

#### Defined in

[packages/account/src/account.ts:370](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L370)

___

### connect

▸ **connect**(`provider`): [`Provider`](/api/Account/Provider.md)

Changes the provider connection for the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `provider` | [`Provider`](/api/Account/Provider.md) | A Provider instance. |

#### Returns

[`Provider`](/api/Account/Provider.md)

The updated Provider instance.

#### Inherited from

[Account](/api/Account/Account.md).[connect](/api/Account/Account.md#connect)

#### Defined in

[packages/account/src/account.ts:131](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L131)

___

### createTransfer

▸ **createTransfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)\>

A helper that creates a transfer transaction request and returns it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the destination. |
| `amount` | `BigNumberish` | The amount of coins to transfer. |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of the coins to transfer (optional). |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | The transaction parameters (optional). |

#### Returns

`Promise`&lt;[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)\>

A promise that resolves to the prepared transaction request.

#### Inherited from

[Account](/api/Account/Account.md).[createTransfer](/api/Account/Account.md#createtransfer)

#### Defined in

[packages/account/src/account.ts:332](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L332)

___

### fund

▸ **fund**&lt;`T`\>(`request`, `params`): `Promise`&lt;`T`\>

Funds a transaction request by adding the necessary resources.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`TransactionRequest`](/api/Account/index.md#transactionrequest) | The type of the TransactionRequest. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `T` | The transaction request to fund. |
| `params` | [`EstimatedTxParams`](/api/Account/index.md#estimatedtxparams) | The estimated transaction parameters. |

#### Returns

`Promise`&lt;`T`\>

A promise that resolves to the funded transaction request.

#### Inherited from

[Account](/api/Account/Account.md).[fund](/api/Account/Account.md#fund)

#### Defined in

[packages/account/src/account.ts:201](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L201)

___

### generateFakeResources

▸ **generateFakeResources**(`coins`): [`Resource`](/api/Account/index.md#resource)[]

Generates an array of fake resources based on the provided coins.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coins` | [`FakeResources`](/api/Account/index.md#fakeresources)[] | An array of `FakeResources` objects representing the coins. |

#### Returns

[`Resource`](/api/Account/index.md#resource)[]

An array of `Resource` objects with generated properties.

#### Inherited from

[Account](/api/Account/Account.md).[generateFakeResources](/api/Account/Account.md#generatefakeresources)

#### Defined in

[packages/account/src/account.ts:667](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L667)

___

### getBalance

▸ **getBalance**(`assetId?`): `Promise`&lt;`BN`\>

Retrieves the balance of the account for the given asset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID to check the balance for (optional). |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the balance amount.

#### Inherited from

[Account](/api/Account/Account.md).[getBalance](/api/Account/Account.md#getbalance)

#### Defined in

[packages/account/src/account.ts:178](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L178)

___

### getBalances

▸ **getBalances**(): `Promise`&lt;[`GetBalancesResponse`](/api/Account/index.md#getbalancesresponse)\>

Retrieves all the balances for the account.

#### Returns

`Promise`&lt;[`GetBalancesResponse`](/api/Account/index.md#getbalancesresponse)\>

A promise that resolves to an array of Coins and their quantities.

#### Inherited from

[Account](/api/Account/Account.md).[getBalances](/api/Account/Account.md#getbalances)

#### Defined in

[packages/account/src/account.ts:189](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L189)

___

### getCoins

▸ **getCoins**(`assetId?`, `paginationArgs?`): `Promise`&lt;[`GetCoinsResponse`](/api/Account/index.md#getcoinsresponse)\>

Retrieves coins owned by the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of the coins to retrieve (optional). |
| `paginationArgs?` | `CursorPaginationArgs` | - |

#### Returns

`Promise`&lt;[`GetCoinsResponse`](/api/Account/index.md#getcoinsresponse)\>

A promise that resolves to an array of Coins.

#### Inherited from

[Account](/api/Account/Account.md).[getCoins](/api/Account/Account.md#getcoins)

#### Defined in

[packages/account/src/account.ts:156](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L156)

___

### getMessages

▸ **getMessages**(`paginationArgs?`): `Promise`&lt;[`GetMessagesResponse`](/api/Account/index.md#getmessagesresponse)\>

Retrieves messages owned by the account.

#### Parameters

| Name | Type |
| :------ | :------ |
| `paginationArgs?` | `CursorPaginationArgs` |

#### Returns

`Promise`&lt;[`GetMessagesResponse`](/api/Account/index.md#getmessagesresponse)\>

A promise that resolves to an array of Messages.

#### Inherited from

[Account](/api/Account/Account.md).[getMessages](/api/Account/Account.md#getmessages)

#### Defined in

[packages/account/src/account.ts:168](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L168)

___

### getResourcesToSpend

▸ **getResourcesToSpend**(`quantities`, `excludedIds?`): `Promise`&lt;[`Resource`](/api/Account/index.md#resource)[]\>

Retrieves resources satisfying the spend query for the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quantities` | [`CoinQuantityLike`](/api/Account/index.md#coinquantitylike)[] | Quantities of resources to be obtained. |
| `excludedIds?` | `ExcludeResourcesOption` | IDs of resources to be excluded from the query (optional). |

#### Returns

`Promise`&lt;[`Resource`](/api/Account/index.md#resource)[]\>

A promise that resolves to an array of Resources.

#### Inherited from

[Account](/api/Account/Account.md).[getResourcesToSpend](/api/Account/Account.md#getresourcestospend)

#### Defined in

[packages/account/src/account.ts:143](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L143)

___

### getTransactionCost

▸ **getTransactionCost**(`transactionRequestLike`, `transactionCostParams?`): `Promise`&lt;[`TransactionCost`](/api/Account/index.md#transactioncost)\>

Returns a transaction cost to enable user
to set gasLimit and also reserve balance amounts
on the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request object. |
| `transactionCostParams` | [`TransactionCostParams`](/api/Account/index.md#transactioncostparams) | The transaction cost parameters (optional). |

#### Returns

`Promise`&lt;[`TransactionCost`](/api/Account/index.md#transactioncost)\>

A promise that resolves to the transaction cost object.

#### Inherited from

[Account](/api/Account/Account.md).[getTransactionCost](/api/Account/Account.md#gettransactioncost)

#### Defined in

[packages/account/src/account.ts:528](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L528)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`, `sendTransactionParams?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Sends a transaction to the network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request to be sent. |
| `sendTransactionParams` | [`EstimateTransactionParams`](/api/Account/index.md#estimatetransactionparams) | The provider send transaction parameters (optional). |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[Account](/api/Account/Account.md).[sendTransaction](/api/Account/Account.md#sendtransaction)

#### Defined in

[packages/account/src/account.ts:625](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L625)

___

### signTransaction

▸ **signTransaction**(`transactionRequestLike`): `Promise`&lt;`string`\>

Signs a transaction from the account via the connector..

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request to sign. |

#### Returns

`Promise`&lt;`string`\>

A promise that resolves to the signature of the transaction.

#### Inherited from

[Account](/api/Account/Account.md).[signTransaction](/api/Account/Account.md#signtransaction)

#### Defined in

[packages/account/src/account.ts:608](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L608)

___

### simulateTransaction

▸ **simulateTransaction**(`transactionRequestLike`, `estimateTxParams?`): `Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

Simulates a transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request to be simulated. |
| `estimateTxParams` | [`EstimateTransactionParams`](/api/Account/index.md#estimatetransactionparams) | The estimate transaction params (optional). |

#### Returns

`Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

A promise that resolves to the call result.

#### Inherited from

[Account](/api/Account/Account.md).[simulateTransaction](/api/Account/Account.md#simulatetransaction)

#### Defined in

[packages/account/src/account.ts:650](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L650)

___

### transfer

▸ **transfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Transfers coins to a destination address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the destination. |
| `amount` | `BigNumberish` | The amount of coins to transfer. |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of the coins to transfer (optional). |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | The transaction parameters (optional). |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[Account](/api/Account/Account.md).[transfer](/api/Account/Account.md#transfer)

#### Defined in

[packages/account/src/account.ts:353](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L353)

___

### transferToContract

▸ **transferToContract**(`contractId`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Transfers coins to a contract address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the contract. |
| `amount` | `BigNumberish` | The amount of coins to transfer. |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of the coins to transfer (optional). |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | The transaction parameters (optional). |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[Account](/api/Account/Account.md).[transferToContract](/api/Account/Account.md#transfertocontract)

#### Defined in

[packages/account/src/account.ts:426](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L426)

___

### unlock

▸ **unlock**(`privateKey`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The private key used to unlock the wallet. |

#### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[packages/account/src/wallet/wallets.ts:33](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/wallets.ts#L33)

___

### withdrawToBaseLayer

▸ **withdrawToBaseLayer**(`recipient`, `amount`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Withdraws an amount of the base asset to the base chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recipient` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | Address of the recipient on the base chain. |
| `amount` | `BigNumberish` | Amount of base asset. |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | The transaction parameters (optional). |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[Account](/api/Account/Account.md).[withdrawToBaseLayer](/api/Account/Account.md#withdrawtobaselayer)

#### Defined in

[packages/account/src/account.ts:479](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L479)
