# Class: Predicate&lt;ARGS\>

[@fuel-ts/account](/api/Account/index.md).Predicate

`Predicate` provides methods to populate transaction data with predicate information and sending transactions with them.

## Type parameters

| Name | Type |
| :------ | :------ |
| `ARGS` | extends `InputValue`[] |

## Hierarchy

- [`Account`](/api/Account/Account.md)

  ↳ **`Predicate`**

## Constructors

### constructor

• **new Predicate**&lt;`ARGS`\>(`bytes`, `provider`, `jsonAbi?`, `configurableConstants?`): [`Predicate`](/api/Account/Predicate.md)&lt;`ARGS`\>

Creates an instance of the Predicate class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ARGS` | extends `InputValue`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The bytes of the predicate. |
| `provider` | [`Provider`](/api/Account/Provider.md) | The provider used to interact with the blockchain. |
| `jsonAbi?` | `JsonAbi` | The JSON ABI of the predicate. |
| `configurableConstants?` | `Object` | Optional configurable constants for the predicate. |

#### Returns

[`Predicate`](/api/Account/Predicate.md)&lt;`ARGS`\>

#### Overrides

[Account](/api/Account/Account.md).[constructor](/api/Account/Account.md#constructor)

#### Defined in

[packages/account/src/predicate/predicate.ts:48](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/predicate/predicate.ts#L48)

## Properties

### \_connector

• `Protected` `Optional` **\_connector**: [`FuelConnector`](/api/Account/FuelConnector.md)

#### Inherited from

[Account](/api/Account/Account.md).[_connector](/api/Account/Account.md#_connector)

#### Defined in

[packages/account/src/account.ts:54](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L54)

___

### \_provider

• `Protected` `Optional` **\_provider**: [`Provider`](/api/Account/Provider.md)

The provider used to interact with the network.

#### Inherited from

[Account](/api/Account/Account.md).[_provider](/api/Account/Account.md#_provider)

#### Defined in

[packages/account/src/account.ts:52](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L52)

___

### address

• `Readonly` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The address associated with the account.

#### Inherited from

[Account](/api/Account/Account.md).[address](/api/Account/Account.md#address)

#### Defined in

[packages/account/src/account.ts:47](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L47)

___

### bytes

• **bytes**: `Uint8Array`

#### Defined in

[packages/account/src/predicate/predicate.ts:35](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/predicate/predicate.ts#L35)

___

### interface

• `Optional` **interface**: `Interface`&lt;`JsonAbi`\>

#### Defined in

[packages/account/src/predicate/predicate.ts:38](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/predicate/predicate.ts#L38)

___

### predicateArgs

• **predicateArgs**: `ARGS`

#### Defined in

[packages/account/src/predicate/predicate.ts:37](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/predicate/predicate.ts#L37)

___

### predicateData

• **predicateData**: `Uint8Array`

#### Defined in

[packages/account/src/predicate/predicate.ts:36](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/predicate/predicate.ts#L36)

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

[packages/account/src/account.ts:76](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L76)

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

[packages/account/src/account.ts:89](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L89)

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

#### Inherited from

[Account](/api/Account/Account.md).[connect](/api/Account/Account.md#connect)

#### Defined in

[packages/account/src/account.ts:99](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L99)

___

### createTransfer

▸ **createTransfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

A helper that creates a transfer transaction request and returns it.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `destination` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the destination. |
| `amount` | `BigNumberish` | `undefined` | The amount of coins to transfer. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `BaseAssetId` | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | `{}` | The transaction parameters (gasLimit, gasPrice, maturity). |

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

A promise that resolves to the prepared transaction request.

#### Overrides

[Account](/api/Account/Account.md).[createTransfer](/api/Account/Account.md#createtransfer)

#### Defined in

[packages/account/src/predicate/predicate.ts:98](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/predicate/predicate.ts#L98)

___

### fund

▸ **fund**&lt;`T`\>(`request`, `coinQuantities`, `fee`): `Promise`&lt;`void`\>

Adds resources to the transaction enough to fund it.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TransactionRequest`](/api/Account/index.md#transactionrequest) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `T` | The transaction request. |
| `coinQuantities` | [`CoinQuantity`](/api/Account/index.md#coinquantity)[] | The coin quantities required to execute the transaction. |
| `fee` | `BN` | The estimated transaction fee. |

#### Returns

`Promise`&lt;`void`\>

A promise that resolves when the resources are added to the transaction.

#### Inherited from

[Account](/api/Account/Account.md).[fund](/api/Account/Account.md#fund)

#### Defined in

[packages/account/src/account.ts:240](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L240)

___

### getBalance

▸ **getBalance**(`assetId?`): `Promise`&lt;`BN`\>

Retrieves the balance of the account for the given asset.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `BaseAssetId` | The asset ID to check the balance for. |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the balance amount.

#### Inherited from

[Account](/api/Account/Account.md).[getBalance](/api/Account/Account.md#getbalance)

#### Defined in

[packages/account/src/account.ts:193](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L193)

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

[packages/account/src/account.ts:203](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L203)

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

#### Inherited from

[Account](/api/Account/Account.md).[getCoins](/api/Account/Account.md#getcoins)

#### Defined in

[packages/account/src/account.ts:124](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L124)

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

[packages/account/src/account.ts:158](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L158)

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

[packages/account/src/predicate/predicate.ts:149](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/predicate/predicate.ts#L149)

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

#### Inherited from

[Account](/api/Account/Account.md).[getResourcesToSpend](/api/Account/Account.md#getresourcestospend)

#### Defined in

[packages/account/src/account.ts:111](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L111)

___

### populateTransactionPredicateData

▸ **populateTransactionPredicateData**(`transactionRequestLike`): [`TransactionRequest`](/api/Account/index.md#transactionrequest)

Populates the transaction data with predicate data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request-like object. |

#### Returns

[`TransactionRequest`](/api/Account/index.md#transactionrequest)

The transaction request with predicate data.

#### Defined in

[packages/account/src/predicate/predicate.ts:72](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/predicate/predicate.ts#L72)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`, `options?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Sends a transaction with the populated predicate data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request-like object. |
| `options?` | `Pick`&lt;[`ProviderSendTxParams`](/api/Account/index.md#providersendtxparams), ``"awaitExecution"``\> | - |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Overrides

[Account](/api/Account/Account.md).[sendTransaction](/api/Account/Account.md#sendtransaction)

#### Defined in

[packages/account/src/predicate/predicate.ts:118](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/predicate/predicate.ts#L118)

___

### setData

▸ **setData**&lt;`T`\>(`...args`): [`Predicate`](/api/Account/Predicate.md)&lt;`ARGS`\>

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

[`Predicate`](/api/Account/Predicate.md)&lt;`ARGS`\>

The Predicate instance with updated predicate data.

#### Defined in

[packages/account/src/predicate/predicate.ts:143](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/predicate/predicate.ts#L143)

___

### signMessage

▸ **signMessage**(`message`): `Promise`&lt;`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`Promise`&lt;`string`\>

#### Inherited from

[Account](/api/Account/Account.md).[signMessage](/api/Account/Account.md#signmessage)

#### Defined in

[packages/account/src/account.ts:491](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L491)

___

### simulateTransaction

▸ **simulateTransaction**(`transactionRequestLike`): `Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

Simulates a transaction with the populated predicate data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request-like object. |

#### Returns

`Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

A promise that resolves to the call result.

#### Overrides

[Account](/api/Account/Account.md).[simulateTransaction](/api/Account/Account.md#simulatetransaction)

#### Defined in

[packages/account/src/predicate/predicate.ts:132](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/predicate/predicate.ts#L132)

___

### transfer

▸ **transfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Transfers coins to a destination address.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `destination` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the destination. |
| `amount` | `BigNumberish` | `undefined` | The amount of coins to transfer. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `BaseAssetId` | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | `{}` | The transaction parameters (gasLimit, gasPrice, maturity). |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[Account](/api/Account/Account.md).[transfer](/api/Account/Account.md#transfer)

#### Defined in

[packages/account/src/account.ts:365](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L365)

___

### transferToContract

▸ **transferToContract**(`contractId`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Transfers coins to a contract address.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `contractId` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the contract. |
| `amount` | `BigNumberish` | `undefined` | The amount of coins to transfer. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `BaseAssetId` | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | `{}` | The optional transaction parameters. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[Account](/api/Account/Account.md).[transferToContract](/api/Account/Account.md#transfertocontract)

#### Defined in

[packages/account/src/account.ts:388](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L388)

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

#### Inherited from

[Account](/api/Account/Account.md).[withdrawToBaseLayer](/api/Account/Account.md#withdrawtobaselayer)

#### Defined in

[packages/account/src/account.ts:443](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/account.ts#L443)

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

[packages/account/src/predicate/predicate.ts:179](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/predicate/predicate.ts#L179)

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

[packages/account/src/predicate/predicate.ts:219](https://github.com/FuelLabs/fuels-ts/blob/d858fa1d/packages/account/src/predicate/predicate.ts#L219)
