# Class: Predicate&lt;ARGS\>

[@fuel-ts/predicate](/api/Predicate/index.md).Predicate

`Predicate` provides methods to populate transaction data with predicate information and sending transactions with them.

## Type parameters

| Name | Type |
| :------ | :------ |
| `ARGS` | extends `InputValue`[] |

## Hierarchy

- [`Account`](/api/Wallet/Account.md)

  ↳ **`Predicate`**

## Implements

- `AbstractPredicate`

## Constructors

### constructor

• **new Predicate**&lt;`ARGS`\>(`bytes`, `provider`, `jsonAbi?`, `configurableConstants?`): [`Predicate`](/api/Predicate/Predicate.md)&lt;`ARGS`\>

Creates an instance of the Predicate class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ARGS` | extends `InputValue`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The bytes of the predicate. |
| `provider` | [`Provider`](/api/Providers/Provider.md) | The provider used to interact with the blockchain. |
| `jsonAbi?` | `JsonAbi` | The JSON ABI of the predicate. |
| `configurableConstants?` | `Object` | Optional configurable constants for the predicate. |

#### Returns

[`Predicate`](/api/Predicate/Predicate.md)&lt;`ARGS`\>

#### Overrides

[Account](/api/Wallet/Account.md).[constructor](/api/Wallet/Account.md#constructor)

#### Defined in

[predicate/src/predicate.ts:47](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/predicate/src/predicate.ts#L47)

## Properties

### \_provider

• `Protected` `Optional` **\_provider**: [`Provider`](/api/Providers/Provider.md)

The provider used to interact with the network.

#### Inherited from

[Account](/api/Wallet/Account.md).[_provider](/api/Wallet/Account.md#_provider)

#### Defined in

wallet/dist/account.d.ts:18

___

### address

• `Readonly` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The address associated with the account.

#### Implementation of

AbstractPredicate.address

#### Inherited from

[Account](/api/Wallet/Account.md).[address](/api/Wallet/Account.md#address)

#### Defined in

wallet/dist/account.d.ts:14

___

### bytes

• **bytes**: `Uint8Array`

#### Implementation of

AbstractPredicate.bytes

#### Defined in

[predicate/src/predicate.ts:34](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/predicate/src/predicate.ts#L34)

___

### interface

• `Optional` **interface**: `Interface`&lt;`JsonAbi`\>

#### Defined in

[predicate/src/predicate.ts:37](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/predicate/src/predicate.ts#L37)

___

### predicateArgs

• **predicateArgs**: `ARGS`

#### Defined in

[predicate/src/predicate.ts:36](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/predicate/src/predicate.ts#L36)

___

### predicateData

• **predicateData**: `Uint8Array`

#### Implementation of

AbstractPredicate.predicateData

#### Defined in

[predicate/src/predicate.ts:35](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/predicate/src/predicate.ts#L35)

## Accessors

### provider

• `get` **provider**(): [`Provider`](/api/Providers/Provider.md)

The provider used to interact with the network.

**`Throws`**

`FuelError` if the provider is not set.

#### Returns

[`Provider`](/api/Providers/Provider.md)

A Provider instance.

#### Inherited from

Account.provider

#### Defined in

wallet/dist/account.d.ts:33

• `set` **provider**(`provider`): `void`

Sets the provider for the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `provider` | [`Provider`](/api/Providers/Provider.md) | A Provider instance. |

#### Returns

`void`

#### Inherited from

Account.provider

#### Defined in

wallet/dist/account.d.ts:39

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

#### Inherited from

[Account](/api/Wallet/Account.md).[connect](/api/Wallet/Account.md#connect)

#### Defined in

wallet/dist/account.d.ts:46

___

### createTransfer

▸ **createTransfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionRequest`](/api/Providers/index.md#transactionrequest)\>

A helper that creates a transfer transaction request and returns it.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `destination` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the destination. |
| `amount` | `BigNumberish` | `undefined` | The amount of coins to transfer. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `BaseAssetId` | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Wallet/index.md#txparamstype) | `{}` | The transaction parameters (gasLimit, gasPrice, maturity). |

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Providers/index.md#transactionrequest)\>

A promise that resolves to the prepared transaction request.

#### Overrides

[Account](/api/Wallet/Account.md).[createTransfer](/api/Wallet/Account.md#createtransfer)

#### Defined in

[predicate/src/predicate.ts:95](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/predicate/src/predicate.ts#L95)

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

#### Inherited from

[Account](/api/Wallet/Account.md).[fund](/api/Wallet/Account.md#fund)

#### Defined in

wallet/dist/account.d.ts:89

___

### getBalance

▸ **getBalance**(`assetId?`): `Promise`&lt;`BN`\>

Retrieves the balance of the account for the given asset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId?` | `BytesLike` | The asset ID to check the balance for. |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the balance amount.

#### Inherited from

[Account](/api/Wallet/Account.md).[getBalance](/api/Wallet/Account.md#getbalance)

#### Defined in

wallet/dist/account.d.ts:74

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

wallet/dist/account.d.ts:80

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

wallet/dist/account.d.ts:61

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

wallet/dist/account.d.ts:67

___

### getPredicateData

▸ **getPredicateData**(`policiesLength`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `policiesLength` | `number` |

#### Returns

`Uint8Array`

#### Defined in

[predicate/src/predicate.ts:146](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/predicate/src/predicate.ts#L146)

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

wallet/dist/account.d.ts:54

___

### populateTransactionPredicateData

▸ **populateTransactionPredicateData**(`transactionRequestLike`): [`TransactionRequest`](/api/Providers/index.md#transactionrequest)

Populates the transaction data with predicate data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike) | The transaction request-like object. |

#### Returns

[`TransactionRequest`](/api/Providers/index.md#transactionrequest)

The transaction request with predicate data.

#### Defined in

[predicate/src/predicate.ts:71](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/predicate/src/predicate.ts#L71)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`, `options?`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Sends a transaction with the populated predicate data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike) | The transaction request-like object. |
| `options?` | `Pick`&lt;[`ProviderSendTxParams`](/api/Providers/index.md#providersendtxparams), ``"awaitExecution"``\> | - |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Overrides

[Account](/api/Wallet/Account.md).[sendTransaction](/api/Wallet/Account.md#sendtransaction)

#### Defined in

[predicate/src/predicate.ts:115](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/predicate/src/predicate.ts#L115)

___

### setData

▸ **setData**&lt;`T`\>(`...args`): [`Predicate`](/api/Predicate/Predicate.md)&lt;`ARGS`\>

Sets data for the predicate.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `InputValue`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `T` | Arguments for the predicate function. |

#### Returns

[`Predicate`](/api/Predicate/Predicate.md)&lt;`ARGS`\>

The Predicate instance with updated predicate data.

#### Defined in

[predicate/src/predicate.ts:140](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/predicate/src/predicate.ts#L140)

___

### simulateTransaction

▸ **simulateTransaction**(`transactionRequestLike`): `Promise`&lt;[`CallResult`](/api/Providers/index.md#callresult)\>

Simulates a transaction with the populated predicate data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike) | The transaction request-like object. |

#### Returns

`Promise`&lt;[`CallResult`](/api/Providers/index.md#callresult)\>

A promise that resolves to the call result.

#### Overrides

[Account](/api/Wallet/Account.md).[simulateTransaction](/api/Wallet/Account.md#simulatetransaction)

#### Defined in

[predicate/src/predicate.ts:129](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/predicate/src/predicate.ts#L129)

___

### transfer

▸ **transfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Transfers coins to a destination address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the destination. |
| `amount` | `BigNumberish` | The amount of coins to transfer. |
| `assetId?` | `BytesLike` | The asset ID of the coins to transfer. |
| `txParams?` | [`TxParamsType`](/api/Wallet/index.md#txparamstype) | The transaction parameters (gasLimit, gasPrice, maturity). |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[Account](/api/Wallet/Account.md).[transfer](/api/Wallet/Account.md#transfer)

#### Defined in

wallet/dist/account.d.ts:117

___

### transferToContract

▸ **transferToContract**(`contractId`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Transfers coins to a contract address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the contract. |
| `amount` | `BigNumberish` | The amount of coins to transfer. |
| `assetId?` | `BytesLike` | The asset ID of the coins to transfer. |
| `txParams?` | [`TxParamsType`](/api/Wallet/index.md#txparamstype) | The optional transaction parameters. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[Account](/api/Wallet/Account.md).[transferToContract](/api/Wallet/Account.md#transfertocontract)

#### Defined in

wallet/dist/account.d.ts:135

___

### withdrawToBaseLayer

▸ **withdrawToBaseLayer**(`recipient`, `amount`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Withdraws an amount of the base asset to the base chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recipient` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | Address of the recipient on the base chain. |
| `amount` | `BigNumberish` | Amount of base asset. |
| `txParams?` | [`TxParamsType`](/api/Wallet/index.md#txparamstype) | The optional transaction parameters. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[Account](/api/Wallet/Account.md).[withdrawToBaseLayer](/api/Wallet/Account.md#withdrawtobaselayer)

#### Defined in

wallet/dist/account.d.ts:152

___

### processPredicateData

▸ **processPredicateData**(`bytes`, `jsonAbi?`, `configurableConstants?`): `Object`

Processes the predicate data and returns the altered bytecode and interface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The bytes of the predicate. |
| `jsonAbi?` | `JsonAbi` | The JSON ABI of the predicate. |
| `configurableConstants?` | `Object` | Optional configurable constants for the predicate. |

#### Returns

`Object`

An object containing the new predicate bytes and interface.

| Name | Type |
| :------ | :------ |
| `predicateBytes` | `Uint8Array` |
| `predicateInterface` | `undefined` \| `Interface`&lt;`JsonAbi`\> |

#### Defined in

[predicate/src/predicate.ts:176](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/predicate/src/predicate.ts#L176)

___

### setConfigurableConstants

▸ **setConfigurableConstants**(`bytes`, `configurableConstants`, `abiInterface?`): `Uint8Array`

Sets the configurable constants for the predicate.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | The bytes of the predicate. |
| `configurableConstants` | `Object` | Configurable constants to be set. |
| `abiInterface?` | `Interface`&lt;`JsonAbi`\> | The ABI interface of the predicate. |

#### Returns

`Uint8Array`

The mutated bytes with the configurable constants set.

#### Defined in

[predicate/src/predicate.ts:216](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/predicate/src/predicate.ts#L216)
