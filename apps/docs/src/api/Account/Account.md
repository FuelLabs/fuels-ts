# Class: Account

[@fuel-ts/account](/api/Account/index.md).Account

`Account` provides an abstraction for interacting with accounts or wallets on the network.

## Hierarchy

- [`AbstractAccount`](/api/Interfaces/AbstractAccount.md)

  ↳ **`Account`**

  ↳↳ [`BaseWalletUnlocked`](/api/Account/BaseWalletUnlocked.md)

  ↳↳ [`WalletLocked`](/api/Account/WalletLocked.md)

  ↳↳ [`Predicate`](/api/Account/Predicate.md)

## Constructors

### constructor

• **new Account**(`address`, `provider?`, `connector?`): [`Account`](/api/Account/Account.md)

Creates a new Account instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the account. |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |
| `connector?` | [`FuelConnector`](/api/Account/FuelConnector.md) | - |

#### Returns

[`Account`](/api/Account/Account.md)

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[constructor](/api/Interfaces/AbstractAccount.md#constructor)

#### Defined in

[packages/account/src/account.ts:75](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L75)

## Properties

### \_connector

• `Protected` `Optional` **\_connector**: [`FuelConnector`](/api/Account/FuelConnector.md)

#### Defined in

[packages/account/src/account.ts:67](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L67)

___

### \_provider

• `Protected` `Optional` **\_provider**: [`Provider`](/api/Account/Provider.md)

The provider used to interact with the network.

#### Defined in

[packages/account/src/account.ts:65](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L65)

___

### address

• `Readonly` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The address associated with the account.

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[address](/api/Interfaces/AbstractAccount.md#address)

#### Defined in

[packages/account/src/account.ts:60](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L60)

## Accessors

### provider

• `get` **provider**(): [`Provider`](/api/Account/Provider.md)

The provider used to interact with the network.

**`Throws`**

`FuelError` if the provider is not set.

#### Returns

[`Provider`](/api/Account/Provider.md)

A Provider instance.

#### Overrides

AbstractAccount.provider

#### Defined in

[packages/account/src/account.ts:89](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L89)

• `set` **provider**(`provider`): `void`

Sets the provider for the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `provider` | [`Provider`](/api/Account/Provider.md) | A Provider instance. |

#### Returns

`void`

#### Overrides

AbstractAccount.provider

#### Defined in

[packages/account/src/account.ts:102](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L102)

## Methods

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

#### Defined in

[packages/account/src/account.ts:112](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L112)

___

### createTransfer

▸ **createTransfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

A helper that creates a transfer transaction request and returns it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the destination. |
| `amount` | `BigNumberish` | The amount of coins to transfer. |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | The transaction parameters (gasLimit, tip, maturity, maxFee, witnessLimit). |

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

A promise that resolves to the prepared transaction request.

#### Defined in

[packages/account/src/account.ts:366](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L366)

___

### fund

▸ **fund**&lt;`T`\>(`request`, `params`): `Promise`&lt;`T`\>

Adds resources to the transaction enough to fund it.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TransactionRequest`](/api/Account/index.md#transactionrequest) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `T` | The transaction request. |
| `params` | [`EstimatedTxParams`](/api/Account/index.md#estimatedtxparams) | - |

#### Returns

`Promise`&lt;`T`\>

A promise that resolves when the resources are added to the transaction.

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[fund](/api/Interfaces/AbstractAccount.md#fund)

#### Defined in

[packages/account/src/account.ts:254](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L254)

___

### getBalance

▸ **getBalance**(`assetId?`): `Promise`&lt;`BN`\>

Retrieves the balance of the account for the given asset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID to check the balance for. |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the balance amount.

#### Defined in

[packages/account/src/account.ts:206](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L206)

___

### getBalances

▸ **getBalances**(): `Promise`&lt;[`CoinQuantity`](/api/Account/index.md#coinquantity)[]\>

Retrieves all the balances for the account.

#### Returns

`Promise`&lt;[`CoinQuantity`](/api/Account/index.md#coinquantity)[]\>

A promise that resolves to an array of Coins and their quantities.

#### Defined in

[packages/account/src/account.ts:217](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L217)

___

### getCoins

▸ **getCoins**(`assetId?`): `Promise`&lt;[`Coin`](/api/Account/index.md#coin)[]\>

Retrieves coins owned by the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of the coins to retrieve. |

#### Returns

`Promise`&lt;[`Coin`](/api/Account/index.md#coin)[]\>

A promise that resolves to an array of Coins.

#### Defined in

[packages/account/src/account.ts:137](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L137)

___

### getMessages

▸ **getMessages**(): `Promise`&lt;[`Message`](/api/Account/index.md#message)[]\>

Retrieves messages owned by the account.

#### Returns

`Promise`&lt;[`Message`](/api/Account/index.md#message)[]\>

A promise that resolves to an array of Messages.

#### Defined in

[packages/account/src/account.ts:171](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L171)

___

### getResourcesToSpend

▸ **getResourcesToSpend**(`quantities`, `excludedIds?`): `Promise`&lt;[`Resource`](/api/Account/index.md#resource)[]\>

Retrieves resources satisfying the spend query for the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quantities` | [`CoinQuantityLike`](/api/Account/index.md#coinquantitylike)[] | IDs of coins to exclude. |
| `excludedIds?` | `ExcludeResourcesOption` | IDs of resources to be excluded from the query. |

#### Returns

`Promise`&lt;[`Resource`](/api/Account/index.md#resource)[]\>

A promise that resolves to an array of Resources.

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[getResourcesToSpend](/api/Interfaces/AbstractAccount.md#getresourcestospend)

#### Defined in

[packages/account/src/account.ts:124](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L124)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`, `«destructured»?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Sends a transaction to the network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request to be sent. |
| `«destructured»` | [`ProviderSendTxParams`](/api/Account/index.md#providersendtxparams) | - |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[sendTransaction](/api/Interfaces/AbstractAccount.md#sendtransaction)

#### Defined in

[packages/account/src/account.ts:570](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L570)

___

### signMessage

▸ **signMessage**(`message`): `Promise`&lt;`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`Promise`&lt;`string`\>

#### Defined in

[packages/account/src/account.ts:541](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L541)

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

A promise that resolves to the signature of the transaction.

#### Defined in

[packages/account/src/account.ts:554](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L554)

___

### simulateTransaction

▸ **simulateTransaction**(`transactionRequestLike`, `«destructured»?`): `Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

Simulates a transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request to be simulated. |
| `«destructured»` | [`EstimateTransactionParams`](/api/Account/index.md#estimatetransactionparams) | - |

#### Returns

`Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

A promise that resolves to the call result.

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[simulateTransaction](/api/Interfaces/AbstractAccount.md#simulatetransaction)

#### Defined in

[packages/account/src/account.ts:595](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L595)

___

### transfer

▸ **transfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Transfers coins to a destination address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the destination. |
| `amount` | `BigNumberish` | The amount of coins to transfer. |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | The transaction parameters (gasLimit, maturity). |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Defined in

[packages/account/src/account.ts:407](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L407)

___

### transferToContract

▸ **transferToContract**(`contractId`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Transfers coins to a contract address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the contract. |
| `amount` | `BigNumberish` | The amount of coins to transfer. |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | The optional transaction parameters. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Defined in

[packages/account/src/account.ts:437](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L437)

___

### validateGasLimitAndMaxFee

▸ **validateGasLimitAndMaxFee**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `gasUsed` | `BN` |
| › `maxFee` | `BN` |
| › `txParams` | `Pick`&lt;[`TxParamsType`](/api/Account/index.md#txparamstype), ``"gasLimit"`` \| ``"maxFee"``\> |

#### Returns

`void`

#### Defined in

[packages/account/src/account.ts:606](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L606)

___

### withdrawToBaseLayer

▸ **withdrawToBaseLayer**(`recipient`, `amount`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Withdraws an amount of the base asset to the base chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recipient` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | Address of the recipient on the base chain. |
| `amount` | `BigNumberish` | Amount of base asset. |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | The optional transaction parameters. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Defined in

[packages/account/src/account.ts:497](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L497)
