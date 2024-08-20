# Class: WalletUnlocked

[@fuel-ts/account](/api/Account/index.md).WalletUnlocked

`WalletUnlocked` provides the functionalities for an unlocked wallet.

## Hierarchy

- [`BaseWalletUnlocked`](/api/Account/BaseWalletUnlocked.md)

  ↳ **`WalletUnlocked`**

## Constructors

### constructor

• **new WalletUnlocked**(`privateKey`, `provider?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

Creates a new BaseWalletUnlocked instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The private key of the wallet. |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

#### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[constructor](/api/Account/BaseWalletUnlocked.md#constructor)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:40](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/base-wallet-unlocked.ts#L40)

## Properties

### \_connector

• `Protected` `Optional` **\_connector**: [`FuelConnector`](/api/Account/FuelConnector.md)

The connector for use with external wallets

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[_connector](/api/Account/BaseWalletUnlocked.md#_connector)

#### Defined in

[packages/account/src/account.ts:85](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L85)

___

### \_provider

• `Protected` `Optional` **\_provider**: [`Provider`](/api/Account/Provider.md)

The provider used to interact with the network.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[_provider](/api/Account/BaseWalletUnlocked.md#_provider)

#### Defined in

[packages/account/src/account.ts:80](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L80)

___

### address

• `Readonly` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The address associated with the account.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[address](/api/Account/BaseWalletUnlocked.md#address)

#### Defined in

[packages/account/src/account.ts:75](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L75)

___

### signer

• **signer**: () => [`Signer`](/api/Account/Signer.md)

A function that returns the wallet's signer.

#### Type declaration

▸ (): [`Signer`](/api/Account/Signer.md)

##### Returns

[`Signer`](/api/Account/Signer.md)

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[signer](/api/Account/BaseWalletUnlocked.md#signer)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:32](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/base-wallet-unlocked.ts#L32)

___

### defaultPath

▪ `Static` **defaultPath**: `string` = `"m/44'/1179993420'/0'/0/0"`

Default HDWallet path.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[defaultPath](/api/Account/BaseWalletUnlocked.md#defaultpath)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:27](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/base-wallet-unlocked.ts#L27)

## Accessors

### privateKey

• `get` **privateKey**(): `string`

Gets the private key of the wallet.

#### Returns

`string`

The private key of the wallet.

#### Inherited from

BaseWalletUnlocked.privateKey

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:51](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/base-wallet-unlocked.ts#L51)

___

### provider

• `get` **provider**(): [`Provider`](/api/Account/Provider.md)

The provider used to interact with the network.

**`Throws`**

`FuelError` if the provider is not set.

#### Returns

[`Provider`](/api/Account/Provider.md)

A Provider instance.

#### Inherited from

BaseWalletUnlocked.provider

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

BaseWalletUnlocked.provider

#### Defined in

[packages/account/src/account.ts:121](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L121)

___

### publicKey

• `get` **publicKey**(): `string`

Gets the public key of the wallet.

#### Returns

`string`

#### Inherited from

BaseWalletUnlocked.publicKey

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:60](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/base-wallet-unlocked.ts#L60)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[addBatchTransfer](/api/Account/BaseWalletUnlocked.md#addbatchtransfer)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[addTransfer](/api/Account/BaseWalletUnlocked.md#addtransfer)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[batchTransfer](/api/Account/BaseWalletUnlocked.md#batchtransfer)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[connect](/api/Account/BaseWalletUnlocked.md#connect)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[createTransfer](/api/Account/BaseWalletUnlocked.md#createtransfer)

#### Defined in

[packages/account/src/account.ts:332](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L332)

___

### encrypt

▸ **encrypt**(`password`): `Promise`&lt;`string`\>

Encrypts an unlocked wallet with a password.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `password` | `string` | the password to encrypt the wallet with. |

#### Returns

`Promise`&lt;`string`\>

- the encrypted wallet.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[encrypt](/api/Account/BaseWalletUnlocked.md#encrypt)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:156](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/base-wallet-unlocked.ts#L156)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[fund](/api/Account/BaseWalletUnlocked.md#fund)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[generateFakeResources](/api/Account/BaseWalletUnlocked.md#generatefakeresources)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[getBalance](/api/Account/BaseWalletUnlocked.md#getbalance)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[getBalances](/api/Account/BaseWalletUnlocked.md#getbalances)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[getCoins](/api/Account/BaseWalletUnlocked.md#getcoins)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[getMessages](/api/Account/BaseWalletUnlocked.md#getmessages)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[getResourcesToSpend](/api/Account/BaseWalletUnlocked.md#getresourcestospend)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[getTransactionCost](/api/Account/BaseWalletUnlocked.md#gettransactioncost)

#### Defined in

[packages/account/src/account.ts:528](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L528)

___

### lock

▸ **lock**(): [`WalletLocked`](/api/Account/WalletLocked.md)

Locks the wallet and returns an instance of WalletLocked.

#### Returns

[`WalletLocked`](/api/Account/WalletLocked.md)

An instance of WalletLocked.

#### Defined in

[packages/account/src/wallet/wallets.ts:48](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/wallets.ts#L48)

___

### populateTransactionWitnessesSignature

▸ **populateTransactionWitnessesSignature**&lt;`T`\>(`transactionRequestLike`): `Promise`&lt;`T`\>

Populates a transaction with the witnesses signature.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TransactionRequest`](/api/Account/index.md#transactionrequest) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request to populate. |

#### Returns

`Promise`&lt;`T`\>

The populated transaction request.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[populateTransactionWitnessesSignature](/api/Account/BaseWalletUnlocked.md#populatetransactionwitnessessignature)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:95](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/base-wallet-unlocked.ts#L95)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`, `estimateTxDependencies?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request to send. |
| `estimateTxDependencies` | [`EstimateTransactionParams`](/api/Account/index.md#estimatetransactionparams) | Whether to estimate the transaction dependencies. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the TransactionResponse object.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[sendTransaction](/api/Account/BaseWalletUnlocked.md#sendtransaction)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:113](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/base-wallet-unlocked.ts#L113)

___

### signMessage

▸ **signMessage**(`message`): `Promise`&lt;`string`\>

Signs a message with the wallet's private key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message to sign. |

#### Returns

`Promise`&lt;`string`\>

A promise that resolves to the signature as a ECDSA 64 bytes string.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[signMessage](/api/Account/BaseWalletUnlocked.md#signmessage)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:70](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/base-wallet-unlocked.ts#L70)

___

### signTransaction

▸ **signTransaction**(`transactionRequestLike`): `Promise`&lt;`string`\>

Signs a transaction with the wallet's private key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request to sign. |

#### Returns

`Promise`&lt;`string`\>

A promise that resolves to the signature as a ECDSA 64 bytes string.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[signTransaction](/api/Account/BaseWalletUnlocked.md#signtransaction)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:81](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/base-wallet-unlocked.ts#L81)

___

### simulateTransaction

▸ **simulateTransaction**(`transactionRequestLike`, `«destructured»?`): `Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

Populates the witness signature for a transaction and sends a call to the network using `provider.dryRun`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request to simulate. |
| `«destructured»` | [`EstimateTransactionParams`](/api/Account/index.md#estimatetransactionparams) | - |

#### Returns

`Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

A promise that resolves to the CallResult object.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[simulateTransaction](/api/Account/BaseWalletUnlocked.md#simulatetransaction)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:133](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/base-wallet-unlocked.ts#L133)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[transfer](/api/Account/BaseWalletUnlocked.md#transfer)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[transferToContract](/api/Account/BaseWalletUnlocked.md#transfertocontract)

#### Defined in

[packages/account/src/account.ts:426](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L426)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[withdrawToBaseLayer](/api/Account/BaseWalletUnlocked.md#withdrawtobaselayer)

#### Defined in

[packages/account/src/account.ts:479](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/account.ts#L479)

___

### fromEncryptedJson

▸ **fromEncryptedJson**(`jsonWallet`, `password`, `provider?`): `Promise`&lt;[`WalletUnlocked`](/api/Account/WalletUnlocked.md)\>

Create a Wallet Unlocked from an encrypted JSON.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonWallet` | `string` | The encrypted JSON keystore. |
| `password` | `string` | The password to decrypt the JSON. |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

#### Returns

`Promise`&lt;[`WalletUnlocked`](/api/Account/WalletUnlocked.md)\>

An unlocked wallet instance.

#### Defined in

[packages/account/src/wallet/wallets.ts:123](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/wallets.ts#L123)

___

### fromExtendedKey

▸ **fromExtendedKey**(`extendedKey`, `provider?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

Create a Wallet Unlocked from an extended key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `extendedKey` | `string` | The extended key. |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

#### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[packages/account/src/wallet/wallets.ts:109](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/wallets.ts#L109)

___

### fromMnemonic

▸ **fromMnemonic**(`mnemonic`, `path?`, `passphrase?`, `provider?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

Create a Wallet Unlocked from a mnemonic phrase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonic` | `string` | The mnemonic phrase. |
| `path?` | `string` | The derivation path (optional). |
| `passphrase?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The passphrase for the mnemonic (optional). |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

#### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[packages/account/src/wallet/wallets.ts:89](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/wallets.ts#L89)

___

### fromSeed

▸ **fromSeed**(`seed`, `path?`, `provider?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

Create a Wallet Unlocked from a seed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `string` | The seed phrase. |
| `path?` | `string` | The derivation path (optional). |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

#### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[packages/account/src/wallet/wallets.ts:73](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/wallets.ts#L73)

___

### generate

▸ **generate**(`generateOptions?`): [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

Generate a new Wallet Unlocked with a random key pair.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `generateOptions?` | [`GenerateOptions`](/api/Account/GenerateOptions.md) | Options to customize the generation process (optional). |

#### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[packages/account/src/wallet/wallets.ts:59](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet/wallets.ts#L59)
