# Class: Account

[@fuel-ts/wallet](/api/Wallet/index.md).Account

`Account` provides an abstraction for interacting with accounts or wallets on the network.

## Hierarchy

- [`AbstractAccount`](/api/Interfaces/AbstractAccount.md)

  ↳ **`Account`**

  ↳↳ [`BaseWalletUnlocked`](/api/Wallet/BaseWalletUnlocked.md)

  ↳↳ [`WalletLocked`](/api/Wallet/WalletLocked.md)

  ↳↳ [`Predicate`](/api/Predicate/Predicate.md)

  ↳↳ [`BaseWalletUnlocked`](/api/Wallet/BaseWalletUnlocked.md)

  ↳↳ [`WalletLocked`](/api/Wallet/WalletLocked.md)

## Constructors

### constructor

• **new Account**(`address`, `provider?`)

Creates a new Account instance.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the account. |
| `provider` | `string` \| [`Provider`](/api/Providers/Provider.md) | `FUEL_NETWORK_URL` | The provider URL or a Provider instance. |

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[constructor](/api/Interfaces/AbstractAccount.md#constructor)

#### Defined in

[account.ts:57](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L57)

## Properties

### address

• `Readonly` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The address associated with the account.

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[address](/api/Interfaces/AbstractAccount.md#address)

#### Defined in

[account.ts:44](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L44)

___

### provider

• **provider**: [`Provider`](/api/Providers/Provider.md)

The provider used to interact with the network.

#### Overrides

[AbstractAccount](/api/Interfaces/AbstractAccount.md).[provider](/api/Interfaces/AbstractAccount.md#provider)

#### Defined in

[account.ts:49](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L49)

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

#### Defined in

[account.ts:69](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L69)

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

#### Defined in

[account.ts:207](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L207)

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

[account.ts:165](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L165)

___

### getBalances

▸ **getBalances**(): `Promise`&lt;[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]\>

Retrieves all the balances for the account.

#### Returns

`Promise`&lt;[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]\>

A promise that resolves to an array of Coins and their quantities.

#### Defined in

[account.ts:175](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L175)

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

[account.ts:102](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L102)

___

### getMessages

▸ **getMessages**(): `Promise`&lt;[`Message`](/api/Providers/index.md#message)[]\>

Retrieves messages owned by the account.

#### Returns

`Promise`&lt;[`Message`](/api/Providers/index.md#message)[]\>

A promise that resolves to an array of Messages.

#### Defined in

[account.ts:133](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L133)

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

[account.ts:89](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L89)

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

[account.ts:354](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L354)

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

[account.ts:368](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L368)

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

#### Defined in

[account.ts:223](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L223)

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

#### Defined in

[account.ts:262](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L262)

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

#### Defined in

[account.ts:314](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/wallet/src/account.ts#L314)
