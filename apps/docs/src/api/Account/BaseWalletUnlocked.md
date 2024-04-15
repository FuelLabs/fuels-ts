# Class: BaseWalletUnlocked

[@fuel-ts/account](/api/Account/index.md).BaseWalletUnlocked

`BaseWalletUnlocked` provides the base functionalities for an unlocked wallet.

## Hierarchy

- [`Account`](/api/Account/Account.md)

  ↳ **`BaseWalletUnlocked`**

  ↳↳ [`WalletUnlocked`](/api/Account/WalletUnlocked.md)

## Constructors

### constructor

• **new BaseWalletUnlocked**(`privateKey`, `provider?`): [`BaseWalletUnlocked`](/api/Account/BaseWalletUnlocked.md)

Creates a new BaseWalletUnlocked instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The private key of the wallet. |
| `provider?` | [`Provider`](/api/Account/Provider.md) | A Provider instance (optional). |

#### Returns

[`BaseWalletUnlocked`](/api/Account/BaseWalletUnlocked.md)

#### Overrides

[Account](/api/Account/Account.md).[constructor](/api/Account/Account.md#constructor)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:39](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet/base-wallet-unlocked.ts#L39)

## Properties

### \_connector

• `Protected` `Optional` **\_connector**: [`FuelConnector`](/api/Account/FuelConnector.md)

#### Inherited from

[Account](/api/Account/Account.md).[_connector](/api/Account/Account.md#_connector)

#### Defined in

[packages/account/src/account.ts:54](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L54)

___

### \_provider

• `Protected` `Optional` **\_provider**: [`Provider`](/api/Account/Provider.md)

The provider used to interact with the network.

#### Inherited from

[Account](/api/Account/Account.md).[_provider](/api/Account/Account.md#_provider)

#### Defined in

[packages/account/src/account.ts:52](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L52)

___

### address

• `Readonly` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The address associated with the account.

#### Inherited from

[Account](/api/Account/Account.md).[address](/api/Account/Account.md#address)

#### Defined in

[packages/account/src/account.ts:47](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L47)

___

### signer

• **signer**: () => [`Signer`](/api/Account/Signer.md)

#### Type declaration

▸ (): [`Signer`](/api/Account/Signer.md)

A function that returns the wallet's signer.

##### Returns

[`Signer`](/api/Account/Signer.md)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:31](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet/base-wallet-unlocked.ts#L31)

___

### defaultPath

▪ `Static` **defaultPath**: `string` = `"m/44'/1179993420'/0'/0/0"`

Default HDWallet path.

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:26](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet/base-wallet-unlocked.ts#L26)

## Accessors

### privateKey

• `get` **privateKey**(): `string`

Gets the private key of the wallet.

#### Returns

`string`

The private key of the wallet.

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:50](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet/base-wallet-unlocked.ts#L50)

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

Account.provider

#### Defined in

[packages/account/src/account.ts:76](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L76)

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

[packages/account/src/account.ts:89](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L89)

___

### publicKey

• `get` **publicKey**(): `string`

Gets the public key of the wallet.

#### Returns

`string`

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:59](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet/base-wallet-unlocked.ts#L59)

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

[packages/account/src/account.ts:99](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L99)

___

### createTransfer

▸ **createTransfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

A helper that creates a transfer transaction request and returns it.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `destination` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the destination. |
| `amount` | `BigNumberish` | `undefined` | The amount of coins to transfer. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `BaseAssetId` | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Account/index.md#txparamstype) | `{}` | The transaction parameters (gasLimit, gasPrice, maturity). |

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

A promise that resolves to the prepared transaction request.

#### Inherited from

[Account](/api/Account/Account.md).[createTransfer](/api/Account/Account.md#createtransfer)

#### Defined in

[packages/account/src/account.ts:319](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L319)

___

### encrypt

▸ **encrypt**(`password`): `Promise`&lt;`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `password` | `string` |

#### Returns

`Promise`&lt;`string`\>

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:146](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet/base-wallet-unlocked.ts#L146)

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

[packages/account/src/account.ts:240](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L240)

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

[packages/account/src/account.ts:193](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L193)

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

[packages/account/src/account.ts:203](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L203)

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

[packages/account/src/account.ts:124](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L124)

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

[packages/account/src/account.ts:158](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L158)

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

[packages/account/src/account.ts:111](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L111)

___

### populateTransactionWitnessesSignature

▸ **populateTransactionWitnessesSignature**(`transactionRequestLike`): `Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

Populates a transaction with the witnesses signature.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request to populate. |

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

The populated transaction request.

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:94](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet/base-wallet-unlocked.ts#L94)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`, `«destructured»?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request to send. |
| `«destructured»` | [`ProviderSendTxParams`](/api/Account/index.md#providersendtxparams) | - |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the TransactionResponse object.

#### Overrides

[Account](/api/Account/Account.md).[sendTransaction](/api/Account/Account.md#sendtransaction)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:109](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet/base-wallet-unlocked.ts#L109)

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

#### Overrides

[Account](/api/Account/Account.md).[signMessage](/api/Account/Account.md#signmessage)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:69](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet/base-wallet-unlocked.ts#L69)

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

#### Overrides

[Account](/api/Account/Account.md).[signTransaction](/api/Account/Account.md#signtransaction)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:80](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet/base-wallet-unlocked.ts#L80)

___

### simulateTransaction

▸ **simulateTransaction**(`transactionRequestLike`, `«destructured»?`): `Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

Populates the witness signature for a transaction and sends a call to the network using `provider.call`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request to simulate. |
| `«destructured»` | [`EstimateTransactionParams`](/api/Account/index.md#estimatetransactionparams) | - |

#### Returns

`Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

A promise that resolves to the CallResult object.

#### Overrides

[Account](/api/Account/Account.md).[simulateTransaction](/api/Account/Account.md#simulatetransaction)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:129](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet/base-wallet-unlocked.ts#L129)

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

[packages/account/src/account.ts:365](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L365)

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

[packages/account/src/account.ts:394](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L394)

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

[packages/account/src/account.ts:456](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L456)
