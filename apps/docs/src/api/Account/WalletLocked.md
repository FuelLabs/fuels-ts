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

[packages/account/src/account.ts:85](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L85)

## Properties

### \_connector

• `Protected` `Optional` **\_connector**: [`FuelConnector`](/api/Account/FuelConnector.md)

The connector for use with external wallets

#### Inherited from

[Account](/api/Account/Account.md).[_connector](/api/Account/Account.md#_connector)

#### Defined in

[packages/account/src/account.ts:76](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L76)

___

### \_provider

• `Protected` `Optional` **\_provider**: [`Provider`](/api/Account/Provider.md)

The provider used to interact with the network.

#### Inherited from

[Account](/api/Account/Account.md).[_provider](/api/Account/Account.md#_provider)

#### Defined in

[packages/account/src/account.ts:71](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L71)

___

### address

• `Readonly` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The address associated with the account.

#### Inherited from

[Account](/api/Account/Account.md).[address](/api/Account/Account.md#address)

#### Defined in

[packages/account/src/account.ts:66](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L66)

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

[packages/account/src/account.ts:99](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L99)

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

[packages/account/src/account.ts:112](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L112)

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

[packages/account/src/account.ts:454](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L454)

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

[packages/account/src/account.ts:436](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L436)

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

[packages/account/src/account.ts:419](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L419)

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

[packages/account/src/account.ts:122](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L122)

___

### createTransfer

▸ **createTransfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

A helper that creates a transfer transaction request and returns it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the destination. |
| `amount` | `BigNumberish` | The amount of coins to transfer. |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of the coins to transfer (optional). |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | The transaction parameters (optional). |

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

A promise that resolves to the prepared transaction request.

#### Inherited from

[Account](/api/Account/Account.md).[createTransfer](/api/Account/Account.md#createtransfer)

#### Defined in

[packages/account/src/account.ts:381](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L381)

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

[packages/account/src/account.ts:264](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L264)

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

[packages/account/src/account.ts:216](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L216)

___

### getBalances

▸ **getBalances**(): `Promise`&lt;[`CoinQuantity`](/api/Account/index.md#coinquantity)[]\>

Retrieves all the balances for the account.

#### Returns

`Promise`&lt;[`CoinQuantity`](/api/Account/index.md#coinquantity)[]\>

A promise that resolves to an array of Coins and their quantities.

#### Inherited from

[Account](/api/Account/Account.md).[getBalances](/api/Account/Account.md#getbalances)

#### Defined in

[packages/account/src/account.ts:227](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L227)

___

### getCoins

▸ **getCoins**(`assetId?`): `Promise`&lt;[`Coin`](/api/Account/index.md#coin)[]\>

Retrieves coins owned by the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of the coins to retrieve (optional). |

#### Returns

`Promise`&lt;[`Coin`](/api/Account/index.md#coin)[]\>

A promise that resolves to an array of Coins.

#### Inherited from

[Account](/api/Account/Account.md).[getCoins](/api/Account/Account.md#getcoins)

#### Defined in

[packages/account/src/account.ts:147](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L147)

___

### getMessages

▸ **getMessages**(): `Promise`&lt;[`Message`](/api/Account/index.md#message)[]\>

Retrieves messages owned by the account.

#### Returns

`Promise`&lt;[`Message`](/api/Account/index.md#message)[]\>

A promise that resolves to an array of Messages.

#### Inherited from

[Account](/api/Account/Account.md).[getMessages](/api/Account/Account.md#getmessages)

#### Defined in

[packages/account/src/account.ts:181](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L181)

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

[packages/account/src/account.ts:134](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L134)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`, `sendTransactionParams?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Sends a transaction to the network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request to be sent. |
| `sendTransactionParams` | [`ProviderSendTxParams`](/api/Account/index.md#providersendtxparams) | The provider send transaction parameters (optional). |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[Account](/api/Account/Account.md).[sendTransaction](/api/Account/Account.md#sendtransaction)

#### Defined in

[packages/account/src/account.ts:606](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L606)

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

[packages/account/src/account.ts:589](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L589)

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

[packages/account/src/account.ts:632](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L632)

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

[packages/account/src/account.ts:402](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L402)

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

[packages/account/src/account.ts:475](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L475)

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

[packages/account/src/wallet/wallets.ts:33](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/wallet/wallets.ts#L33)

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

[packages/account/src/account.ts:529](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/account/src/account.ts#L529)
