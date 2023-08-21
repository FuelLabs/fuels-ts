# Class: WalletLocked

[@fuel-ts/wallet](/api/Wallet/index.md).WalletLocked

`WalletLocked` provides the functionalities for a locked  wallet.

## Hierarchy

- [`Account`](/api/Wallet/Account.md)

  ↳ **`WalletLocked`**

## Constructors

### constructor

• **new WalletLocked**(`address`, `provider?`)

Creates a new Account instance.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the account. |
| `provider` | `string` \| [`Provider`](/api/Providers/Provider.md) | `FUEL_NETWORK_URL` | The provider URL or a Provider instance. |

#### Inherited from

[Account](/api/Wallet/Account.md).[constructor](/api/Wallet/Account.md#constructor)

#### Defined in

[account.ts:57](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L57)

## Properties

### address

• `Readonly` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The address associated with the account.

#### Inherited from

[Account](/api/Wallet/Account.md).[address](/api/Wallet/Account.md#address)

#### Defined in

[account.ts:44](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L44)

___

### provider

• **provider**: [`Provider`](/api/Providers/Provider.md)

The provider used to interact with the network.

#### Inherited from

[Account](/api/Wallet/Account.md).[provider](/api/Wallet/Account.md#provider)

#### Defined in

[account.ts:49](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L49)

## Methods

### connect

▸ **connect**(`provider`): [`Provider`](/api/Providers/Provider.md)

Changes the provider connection for the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `provider` | `string` \| [`Provider`](/api/Providers/Provider.md) | The provider URL or a Provider instance. |

#### Returns

[`Provider`](/api/Providers/Provider.md)

The updated Provider instance.

#### Inherited from

[Account](/api/Wallet/Account.md).[connect](/api/Wallet/Account.md#connect)

#### Defined in

[account.ts:69](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L69)

___

### fund

▸ **fund**&lt;`T`\>(`request`): `Promise`&lt;`void`\>

Adds resources to the transaction enough to fund it.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TransactionRequest`](/api/Providers/index.md#transactionrequest) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `T` | The transaction request. |

#### Returns

`Promise`&lt;`void`\>

A promise that resolves when the resources are added to the transaction.

#### Inherited from

[Account](/api/Wallet/Account.md).[fund](/api/Wallet/Account.md#fund)

#### Defined in

[account.ts:207](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L207)

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

#### Inherited from

[Account](/api/Wallet/Account.md).[getBalance](/api/Wallet/Account.md#getbalance)

#### Defined in

[account.ts:165](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L165)

___

### getBalances

▸ **getBalances**(): `Promise`&lt;[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]\>

Retrieves all the balances for the account.

#### Returns

`Promise`&lt;[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]\>

A promise that resolves to an array of Coins and their quantities.

#### Inherited from

[Account](/api/Wallet/Account.md).[getBalances](/api/Wallet/Account.md#getbalances)

#### Defined in

[account.ts:175](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L175)

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

#### Inherited from

[Account](/api/Wallet/Account.md).[getCoins](/api/Wallet/Account.md#getcoins)

#### Defined in

[account.ts:102](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L102)

___

### getMessages

▸ **getMessages**(): `Promise`&lt;[`Message`](/api/Providers/index.md#message)[]\>

Retrieves messages owned by the account.

#### Returns

`Promise`&lt;[`Message`](/api/Providers/index.md#message)[]\>

A promise that resolves to an array of Messages.

#### Inherited from

[Account](/api/Wallet/Account.md).[getMessages](/api/Wallet/Account.md#getmessages)

#### Defined in

[account.ts:133](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L133)

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

#### Inherited from

[Account](/api/Wallet/Account.md).[getResourcesToSpend](/api/Wallet/Account.md#getresourcestospend)

#### Defined in

[account.ts:89](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L89)

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

#### Inherited from

[Account](/api/Wallet/Account.md).[sendTransaction](/api/Wallet/Account.md#sendtransaction)

#### Defined in

[account.ts:354](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L354)

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

#### Inherited from

[Account](/api/Wallet/Account.md).[simulateTransaction](/api/Wallet/Account.md#simulatetransaction)

#### Defined in

[account.ts:368](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L368)

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
| `txParams` | `TxParamsType` | `{}` | The transaction parameters (gasLimit, gasPrice, maturity). |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[Account](/api/Wallet/Account.md).[transfer](/api/Wallet/Account.md#transfer)

#### Defined in

[account.ts:223](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L223)

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
| `txParams` | `TxParamsType` | `{}` | The optional transaction parameters. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[Account](/api/Wallet/Account.md).[transferToContract](/api/Wallet/Account.md#transfertocontract)

#### Defined in

[account.ts:262](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L262)

___

### unlock

▸ **unlock**(`privateKey`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `BytesLike` | The private key used to unlock the wallet. |

#### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[wallets.ts:27](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/wallets.ts#L27)

___

### withdrawToBaseLayer

▸ **withdrawToBaseLayer**(`recipient`, `amount`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Withdraws an amount of the base asset to the base chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recipient` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | Address of the recipient on the base chain. |
| `amount` | `BigNumberish` | Amount of base asset. |
| `txParams` | `TxParamsType` | The optional transaction parameters. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[Account](/api/Wallet/Account.md).[withdrawToBaseLayer](/api/Wallet/Account.md#withdrawtobaselayer)

#### Defined in

[account.ts:314](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/wallet/src/account.ts#L314)
