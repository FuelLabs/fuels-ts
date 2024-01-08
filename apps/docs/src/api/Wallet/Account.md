# Class: Account

[@fuel-ts/wallet](/api/Wallet/index.md).Account

`Account` provides an abstraction for interacting with accounts or wallets on the network.

## Hierarchy

- [`AbstractAccount`](/api/Interfaces/AbstractAccount.md)

  ↳ **`Account`**

  ↳↳ [`BaseWalletUnlocked`](/api/Wallet/BaseWalletUnlocked.md)

  ↳↳ [`WalletLocked`](/api/Wallet/WalletLocked.md)

## Constructors

### constructor

• **new Account**(`address`, `provider`): [`Account`](/api/Wallet/Account.md)

Creates a new Account instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the account. |
| `provider` | [`Provider`](/api/Providers/Provider.md) | A Provider instance. |

#### Returns

[`Account`](/api/Wallet/Account.md)

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[constructor](/api/Interfaces/AbstractAccount.md#constructor)

#### Defined in

[account.ts:61](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L61)

## Properties

### address

• `Readonly` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The address associated with the account.

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[address](/api/Interfaces/AbstractAccount.md#address)

#### Defined in

[account.ts:48](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L48)

___

### provider

• **provider**: [`Provider`](/api/Providers/Provider.md)

The provider used to interact with the network.

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[provider](/api/Interfaces/AbstractAccount.md#provider)

#### Defined in

[account.ts:53](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L53)

## Methods

### connect

▸ **connect**(`provider`): [`Provider`](/api/Providers/Provider.md)

Changes the provider connection for the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `provider` | [`Provider`](/api/Providers/Provider.md) | A Provider instance. |

#### Returns

[`Provider`](/api/Providers/Provider.md)

The updated Provider instance.

#### Defined in

[account.ts:73](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L73)

___

### createTransfer

▸ **createTransfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionRequest`](/api/Providers/index.md#transactionrequest)\>

A helper that creates a transfer transaction request and returns it.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `destination` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the destination. |
| `amount` | `BigNumberish` | `undefined` | The amount of coins to transfer. |
| `assetId` | `BytesLike` | `BaseAssetId` | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Wallet/index.md#txparamstype) | `{}` | The transaction parameters (gasLimit, gasPrice, maturity). |

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Providers/index.md#transactionrequest)\>

A promise that resolves to the prepared transaction request.

#### Defined in

[account.ts:293](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L293)

___

### fund

▸ **fund**&lt;`T`\>(`request`, `coinQuantities`, `fee`): `Promise`&lt;`void`\>

Adds resources to the transaction enough to fund it.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TransactionRequest`](/api/Providers/index.md#transactionrequest) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `T` | The transaction request. |
| `coinQuantities` | [`CoinQuantity`](/api/Providers/index.md#coinquantity)[] | The coin quantities required to execute the transaction. |
| `fee` | `BN` | The estimated transaction fee. |

#### Returns

`Promise`&lt;`void`\>

A promise that resolves when the resources are added to the transaction.

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[fund](/api/Interfaces/AbstractAccount.md#fund)

#### Defined in

[account.ts:214](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L214)

___

### getBalance

▸ **getBalance**(`assetId?`): `Promise`&lt;`BN`\>

Retrieves the balance of the account for the given asset.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `assetId` | `BytesLike` | `BaseAssetId` | The asset ID to check the balance for. |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the balance amount.

#### Defined in

[account.ts:167](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L167)

___

### getBalances

▸ **getBalances**(): `Promise`&lt;[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]\>

Retrieves all the balances for the account.

#### Returns

`Promise`&lt;[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]\>

A promise that resolves to an array of Coins and their quantities.

#### Defined in

[account.ts:177](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L177)

___

### getCoins

▸ **getCoins**(`assetId?`): `Promise`&lt;[`Coin`](/api/Providers/index.md#coin)[]\>

Retrieves coins owned by the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId?` | `BytesLike` | The asset ID of the coins to retrieve. |

#### Returns

`Promise`&lt;[`Coin`](/api/Providers/index.md#coin)[]\>

A promise that resolves to an array of Coins.

#### Defined in

[account.ts:98](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L98)

___

### getMessages

▸ **getMessages**(): `Promise`&lt;[`Message`](/api/Providers/index.md#message)[]\>

Retrieves messages owned by the account.

#### Returns

`Promise`&lt;[`Message`](/api/Providers/index.md#message)[]\>

A promise that resolves to an array of Messages.

#### Defined in

[account.ts:132](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L132)

___

### getResourcesToSpend

▸ **getResourcesToSpend**(`quantities`, `excludedIds?`): `Promise`&lt;[`Resource`](/api/Providers/index.md#resource)[]\>

Retrieves resources satisfying the spend query for the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quantities` | [`CoinQuantityLike`](/api/Providers/index.md#coinquantitylike)[] | IDs of coins to exclude. |
| `excludedIds?` | `ExcludeResourcesOption` | IDs of resources to be excluded from the query. |

#### Returns

`Promise`&lt;[`Resource`](/api/Providers/index.md#resource)[]\>

A promise that resolves to an array of Resources.

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[getResourcesToSpend](/api/Interfaces/AbstractAccount.md#getresourcestospend)

#### Defined in

[account.ts:85](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L85)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Sends a transaction to the network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike) | The transaction request to be sent. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[sendTransaction](/api/Interfaces/AbstractAccount.md#sendtransaction)

#### Defined in

[account.ts:431](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L431)

___

### simulateTransaction

▸ **simulateTransaction**(`transactionRequestLike`): `Promise`&lt;[`CallResult`](/api/Providers/index.md#callresult)\>

Simulates a transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike) | The transaction request to be simulated. |

#### Returns

`Promise`&lt;[`CallResult`](/api/Providers/index.md#callresult)\>

A promise that resolves to the call result.

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[simulateTransaction](/api/Interfaces/AbstractAccount.md#simulatetransaction)

#### Defined in

[account.ts:445](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L445)

___

### transfer

▸ **transfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Transfers coins to a destination address.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `destination` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the destination. |
| `amount` | `BigNumberish` | `undefined` | The amount of coins to transfer. |
| `assetId` | `BytesLike` | `BaseAssetId` | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Wallet/index.md#txparamstype) | `{}` | The transaction parameters (gasLimit, gasPrice, maturity). |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Defined in

[account.ts:321](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L321)

___

### transferToContract

▸ **transferToContract**(`contractId`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Transfers coins to a contract address.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `contractId` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the contract. |
| `amount` | `BigNumberish` | `undefined` | The amount of coins to transfer. |
| `assetId` | `BytesLike` | `BaseAssetId` | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Wallet/index.md#txparamstype) | `{}` | The optional transaction parameters. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Defined in

[account.ts:344](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L344)

___

### withdrawToBaseLayer

▸ **withdrawToBaseLayer**(`recipient`, `amount`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Withdraws an amount of the base asset to the base chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recipient` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | Address of the recipient on the base chain. |
| `amount` | `BigNumberish` | Amount of base asset. |
| `txParams` | [`TxParamsType`](/api/Wallet/index.md#txparamstype) | The optional transaction parameters. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Defined in

[account.ts:390](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/wallet/src/account.ts#L390)
