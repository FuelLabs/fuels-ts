# Class: WalletUnlocked

[@fuel-ts/wallet](/api/Wallet/index.md).WalletUnlocked

`WalletUnlocked` provides the functionalities for an unlocked wallet.

## Hierarchy

- [`BaseWalletUnlocked`](/api/Wallet/BaseWalletUnlocked.md)

  ↳ **`WalletUnlocked`**

## Constructors

### constructor

• **new WalletUnlocked**(`privateKey`, `provider?`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Creates a new BaseWalletUnlocked instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `BytesLike` | The private key of the wallet. |
| `provider?` | [`Provider`](/api/Providers/Provider.md) | A Provider instance (optional). |

#### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[constructor](/api/Wallet/BaseWalletUnlocked.md#constructor)

#### Defined in

[base-unlocked-wallet.ts:36](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/base-unlocked-wallet.ts#L36)

## Properties

### \_provider

• `Protected` `Optional` **\_provider**: [`Provider`](/api/Providers/Provider.md)

The provider used to interact with the network.

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[_provider](/api/Wallet/BaseWalletUnlocked.md#_provider)

#### Defined in

[account.ts:54](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L54)

___

### address

• `Readonly` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The address associated with the account.

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[address](/api/Wallet/BaseWalletUnlocked.md#address)

#### Defined in

[account.ts:49](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L49)

___

### signer

• **signer**: () => `Signer`

#### Type declaration

▸ (): `Signer`

A function that returns the wallet's signer.

##### Returns

`Signer`

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[signer](/api/Wallet/BaseWalletUnlocked.md#signer)

#### Defined in

[base-unlocked-wallet.ts:28](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/base-unlocked-wallet.ts#L28)

___

### defaultPath

▪ `Static` **defaultPath**: `string` = `"m/44'/1179993420'/0'/0/0"`

Default HDWallet path.

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[defaultPath](/api/Wallet/BaseWalletUnlocked.md#defaultpath)

#### Defined in

[base-unlocked-wallet.ts:23](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/base-unlocked-wallet.ts#L23)

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

[base-unlocked-wallet.ts:47](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/base-unlocked-wallet.ts#L47)

___

### provider

• `get` **provider**(): [`Provider`](/api/Providers/Provider.md)

The provider used to interact with the network.

**`Throws`**

`FuelError` if the provider is not set.

#### Returns

[`Provider`](/api/Providers/Provider.md)

A Provider instance.

#### Inherited from

BaseWalletUnlocked.provider

#### Defined in

[account.ts:75](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L75)

• `set` **provider**(`provider`): `void`

Sets the provider for the account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `provider` | [`Provider`](/api/Providers/Provider.md) | A Provider instance. |

#### Returns

`void`

#### Inherited from

BaseWalletUnlocked.provider

#### Defined in

[account.ts:88](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L88)

___

### publicKey

• `get` **publicKey**(): `string`

Gets the public key of the wallet.

#### Returns

`string`

#### Inherited from

BaseWalletUnlocked.publicKey

#### Defined in

[base-unlocked-wallet.ts:56](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/base-unlocked-wallet.ts#L56)

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

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[connect](/api/Wallet/BaseWalletUnlocked.md#connect)

#### Defined in

[account.ts:98](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L98)

___

### createTransfer

▸ **createTransfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionRequest`](/api/Providers/index.md#transactionrequest)\>

A helper that creates a transfer transaction request and returns it.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `destination` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the destination. |
| `amount` | `BigNumberish` | `undefined` | The amount of coins to transfer. |
| `assetId` | `BytesLike` | `BaseAssetId` | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Wallet/index.md#txparamstype) | `{}` | The transaction parameters (gasLimit, gasPrice, maturity). |

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Providers/index.md#transactionrequest)\>

A promise that resolves to the prepared transaction request.

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[createTransfer](/api/Wallet/BaseWalletUnlocked.md#createtransfer)

#### Defined in

[account.ts:318](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L318)

___

### encrypt

▸ **encrypt**(`password`): `Promise`&lt;`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `password` | `string` |

#### Returns

`Promise`&lt;`string`\>

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[encrypt](/api/Wallet/BaseWalletUnlocked.md#encrypt)

#### Defined in

[base-unlocked-wallet.ts:137](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/base-unlocked-wallet.ts#L137)

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

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[fund](/api/Wallet/BaseWalletUnlocked.md#fund)

#### Defined in

[account.ts:239](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L239)

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

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[getBalance](/api/Wallet/BaseWalletUnlocked.md#getbalance)

#### Defined in

[account.ts:192](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L192)

___

### getBalances

▸ **getBalances**(): `Promise`&lt;[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]\>

Retrieves all the balances for the account.

#### Returns

`Promise`&lt;[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]\>

A promise that resolves to an array of Coins and their quantities.

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[getBalances](/api/Wallet/BaseWalletUnlocked.md#getbalances)

#### Defined in

[account.ts:202](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L202)

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

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[getCoins](/api/Wallet/BaseWalletUnlocked.md#getcoins)

#### Defined in

[account.ts:123](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L123)

___

### getMessages

▸ **getMessages**(): `Promise`&lt;[`Message`](/api/Providers/index.md#message)[]\>

Retrieves messages owned by the account.

#### Returns

`Promise`&lt;[`Message`](/api/Providers/index.md#message)[]\>

A promise that resolves to an array of Messages.

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[getMessages](/api/Wallet/BaseWalletUnlocked.md#getmessages)

#### Defined in

[account.ts:157](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L157)

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

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[getResourcesToSpend](/api/Wallet/BaseWalletUnlocked.md#getresourcestospend)

#### Defined in

[account.ts:110](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L110)

___

### lock

▸ **lock**(): [`WalletLocked`](/api/Wallet/WalletLocked.md)

Locks the wallet and returns an instance of WalletLocked.

#### Returns

[`WalletLocked`](/api/Wallet/WalletLocked.md)

An instance of WalletLocked.

#### Defined in

[wallets.ts:42](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/wallets.ts#L42)

___

### populateTransactionWitnessesSignature

▸ **populateTransactionWitnessesSignature**(`transactionRequestLike`): `Promise`&lt;[`TransactionRequest`](/api/Providers/index.md#transactionrequest)\>

Populates a transaction with the witnesses signature.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike) | The transaction request to populate. |

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Providers/index.md#transactionrequest)\>

The populated transaction request.

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[populateTransactionWitnessesSignature](/api/Wallet/BaseWalletUnlocked.md#populatetransactionwitnessessignature)

#### Defined in

[base-unlocked-wallet.ts:92](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/base-unlocked-wallet.ts#L92)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`, `options?`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike) | The transaction request to send. |
| `options?` | `Pick`&lt;[`ProviderSendTxParams`](/api/Providers/index.md#providersendtxparams), ``"awaitExecution"``\> | - |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the TransactionResponse object.

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[sendTransaction](/api/Wallet/BaseWalletUnlocked.md#sendtransaction)

#### Defined in

[base-unlocked-wallet.ts:107](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/base-unlocked-wallet.ts#L107)

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

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[signMessage](/api/Wallet/BaseWalletUnlocked.md#signmessage)

#### Defined in

[base-unlocked-wallet.ts:66](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/base-unlocked-wallet.ts#L66)

___

### signTransaction

▸ **signTransaction**(`transactionRequestLike`): `Promise`&lt;`string`\>

Signs a transaction with the wallet's private key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike) | The transaction request to sign. |

#### Returns

`Promise`&lt;`string`\>

A promise that resolves to the signature as a ECDSA 64 bytes string.

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[signTransaction](/api/Wallet/BaseWalletUnlocked.md#signtransaction)

#### Defined in

[base-unlocked-wallet.ts:77](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/base-unlocked-wallet.ts#L77)

___

### simulateTransaction

▸ **simulateTransaction**(`transactionRequestLike`): `Promise`&lt;[`CallResult`](/api/Providers/index.md#callresult)\>

Populates the witness signature for a transaction and sends a call to the network using `provider.call`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike) | The transaction request to simulate. |

#### Returns

`Promise`&lt;[`CallResult`](/api/Providers/index.md#callresult)\>

A promise that resolves to the CallResult object.

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[simulateTransaction](/api/Wallet/BaseWalletUnlocked.md#simulatetransaction)

#### Defined in

[base-unlocked-wallet.ts:125](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/base-unlocked-wallet.ts#L125)

___

### transfer

▸ **transfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Transfers coins to a destination address.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `destination` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the destination. |
| `amount` | `BigNumberish` | `undefined` | The amount of coins to transfer. |
| `assetId` | `BytesLike` | `BaseAssetId` | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Wallet/index.md#txparamstype) | `{}` | The transaction parameters (gasLimit, gasPrice, maturity). |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[transfer](/api/Wallet/BaseWalletUnlocked.md#transfer)

#### Defined in

[account.ts:346](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L346)

___

### transferToContract

▸ **transferToContract**(`contractId`, `amount`, `assetId?`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Transfers coins to a contract address.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `contractId` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` | The address of the contract. |
| `amount` | `BigNumberish` | `undefined` | The amount of coins to transfer. |
| `assetId` | `BytesLike` | `BaseAssetId` | The asset ID of the coins to transfer. |
| `txParams` | [`TxParamsType`](/api/Wallet/index.md#txparamstype) | `{}` | The optional transaction parameters. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[transferToContract](/api/Wallet/BaseWalletUnlocked.md#transfertocontract)

#### Defined in

[account.ts:369](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L369)

___

### withdrawToBaseLayer

▸ **withdrawToBaseLayer**(`recipient`, `amount`, `txParams?`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Withdraws an amount of the base asset to the base chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recipient` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | Address of the recipient on the base chain. |
| `amount` | `BigNumberish` | Amount of base asset. |
| `txParams` | [`TxParamsType`](/api/Wallet/index.md#txparamstype) | The optional transaction parameters. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

A promise that resolves to the transaction response.

#### Inherited from

[BaseWalletUnlocked](/api/Wallet/BaseWalletUnlocked.md).[withdrawToBaseLayer](/api/Wallet/BaseWalletUnlocked.md#withdrawtobaselayer)

#### Defined in

[account.ts:416](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/account.ts#L416)

___

### fromEncryptedJson

▸ **fromEncryptedJson**(`jsonWallet`, `password`, `provider?`): `Promise`&lt;[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)\>

Create a Wallet Unlocked from an encrypted JSON.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonWallet` | `string` | The encrypted JSON keystore. |
| `password` | `string` | The password to decrypt the JSON. |
| `provider?` | [`Provider`](/api/Providers/Provider.md) | A Provider instance (optional). |

#### Returns

`Promise`&lt;[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)\>

An unlocked wallet instance.

#### Defined in

[wallets.ts:117](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/wallets.ts#L117)

___

### fromExtendedKey

▸ **fromExtendedKey**(`extendedKey`, `provider?`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Create a Wallet Unlocked from an extended key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `extendedKey` | `string` | The extended key. |
| `provider?` | [`Provider`](/api/Providers/Provider.md) | A Provider instance (optional). |

#### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[wallets.ts:103](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/wallets.ts#L103)

___

### fromMnemonic

▸ **fromMnemonic**(`mnemonic`, `provider?`, `path?`, `passphrase?`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Create a Wallet Unlocked from a mnemonic phrase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonic` | `string` | The mnemonic phrase. |
| `provider?` | [`Provider`](/api/Providers/Provider.md) | A Provider instance (optional). |
| `path?` | `string` | The derivation path (optional). |
| `passphrase?` | `BytesLike` | The passphrase for the mnemonic (optional). |

#### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[wallets.ts:83](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/wallets.ts#L83)

___

### fromSeed

▸ **fromSeed**(`seed`, `provider?`, `path?`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Create a Wallet Unlocked from a seed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `string` | The seed phrase. |
| `provider?` | [`Provider`](/api/Providers/Provider.md) | A Provider instance (optional). |
| `path?` | `string` | The derivation path (optional). |

#### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[wallets.ts:67](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/wallets.ts#L67)

___

### generate

▸ **generate**(`generateOptions?`): [`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

Generate a new Wallet Unlocked with a random key pair.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `generateOptions?` | `GenerateOptions` | Options to customize the generation process (optional). |

#### Returns

[`WalletUnlocked`](/api/Wallet/WalletUnlocked.md)

An instance of WalletUnlocked.

#### Defined in

[wallets.ts:53](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/wallet/src/wallets.ts#L53)
