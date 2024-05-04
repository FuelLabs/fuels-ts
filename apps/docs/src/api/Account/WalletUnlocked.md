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

[packages/account/src/wallet/base-wallet-unlocked.ts:39](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/base-wallet-unlocked.ts#L39)

## Properties

### \_connector

• `Protected` `Optional` **\_connector**: [`FuelConnector`](/api/Account/FuelConnector.md)

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[_connector](/api/Account/BaseWalletUnlocked.md#_connector)

#### Defined in

[packages/account/src/account.ts:67](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L67)

___

### \_provider

• `Protected` `Optional` **\_provider**: [`Provider`](/api/Account/Provider.md)

The provider used to interact with the network.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[_provider](/api/Account/BaseWalletUnlocked.md#_provider)

#### Defined in

[packages/account/src/account.ts:65](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L65)

___

### address

• `Readonly` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The address associated with the account.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[address](/api/Account/BaseWalletUnlocked.md#address)

#### Defined in

[packages/account/src/account.ts:60](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L60)

___

### signer

• **signer**: () => [`Signer`](/api/Account/Signer.md)

#### Type declaration

▸ (): [`Signer`](/api/Account/Signer.md)

A function that returns the wallet's signer.

##### Returns

[`Signer`](/api/Account/Signer.md)

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[signer](/api/Account/BaseWalletUnlocked.md#signer)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:31](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/base-wallet-unlocked.ts#L31)

___

### defaultPath

▪ `Static` **defaultPath**: `string` = `"m/44'/1179993420'/0'/0/0"`

Default HDWallet path.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[defaultPath](/api/Account/BaseWalletUnlocked.md#defaultpath)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:26](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/base-wallet-unlocked.ts#L26)

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

[packages/account/src/wallet/base-wallet-unlocked.ts:50](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/base-wallet-unlocked.ts#L50)

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

[packages/account/src/account.ts:89](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L89)

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

[packages/account/src/account.ts:102](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L102)

___

### publicKey

• `get` **publicKey**(): `string`

Gets the public key of the wallet.

#### Returns

`string`

#### Inherited from

BaseWalletUnlocked.publicKey

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:59](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/base-wallet-unlocked.ts#L59)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[connect](/api/Account/BaseWalletUnlocked.md#connect)

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

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[createTransfer](/api/Account/BaseWalletUnlocked.md#createtransfer)

#### Defined in

[packages/account/src/account.ts:366](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L366)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[encrypt](/api/Account/BaseWalletUnlocked.md#encrypt)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:146](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/base-wallet-unlocked.ts#L146)

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

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[fund](/api/Account/BaseWalletUnlocked.md#fund)

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

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[getBalance](/api/Account/BaseWalletUnlocked.md#getbalance)

#### Defined in

[packages/account/src/account.ts:206](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L206)

___

### getBalances

▸ **getBalances**(): `Promise`&lt;[`CoinQuantity`](/api/Account/index.md#coinquantity)[]\>

Retrieves all the balances for the account.

#### Returns

`Promise`&lt;[`CoinQuantity`](/api/Account/index.md#coinquantity)[]\>

A promise that resolves to an array of Coins and their quantities.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[getBalances](/api/Account/BaseWalletUnlocked.md#getbalances)

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

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[getCoins](/api/Account/BaseWalletUnlocked.md#getcoins)

#### Defined in

[packages/account/src/account.ts:137](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L137)

___

### getMessages

▸ **getMessages**(): `Promise`&lt;[`Message`](/api/Account/index.md#message)[]\>

Retrieves messages owned by the account.

#### Returns

`Promise`&lt;[`Message`](/api/Account/index.md#message)[]\>

A promise that resolves to an array of Messages.

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[getMessages](/api/Account/BaseWalletUnlocked.md#getmessages)

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

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[getResourcesToSpend](/api/Account/BaseWalletUnlocked.md#getresourcestospend)

#### Defined in

[packages/account/src/account.ts:124](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L124)

___

### lock

▸ **lock**(): [`WalletLocked`](/api/Account/WalletLocked.md)

Locks the wallet and returns an instance of WalletLocked.

#### Returns

[`WalletLocked`](/api/Account/WalletLocked.md)

An instance of WalletLocked.

#### Defined in

[packages/account/src/wallet/wallets.ts:48](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/wallets.ts#L48)

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

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[populateTransactionWitnessesSignature](/api/Account/BaseWalletUnlocked.md#populatetransactionwitnessessignature)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:94](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/base-wallet-unlocked.ts#L94)

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

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[sendTransaction](/api/Account/BaseWalletUnlocked.md#sendtransaction)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:109](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/base-wallet-unlocked.ts#L109)

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

[packages/account/src/wallet/base-wallet-unlocked.ts:69](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/base-wallet-unlocked.ts#L69)

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

[packages/account/src/wallet/base-wallet-unlocked.ts:80](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/base-wallet-unlocked.ts#L80)

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

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[simulateTransaction](/api/Account/BaseWalletUnlocked.md#simulatetransaction)

#### Defined in

[packages/account/src/wallet/base-wallet-unlocked.ts:129](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/base-wallet-unlocked.ts#L129)

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

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[transfer](/api/Account/BaseWalletUnlocked.md#transfer)

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

#### Inherited from

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[transferToContract](/api/Account/BaseWalletUnlocked.md#transfertocontract)

#### Defined in

[packages/account/src/account.ts:437](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L437)

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

[BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md).[withdrawToBaseLayer](/api/Account/BaseWalletUnlocked.md#withdrawtobaselayer)

#### Defined in

[packages/account/src/account.ts:497](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/account.ts#L497)

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

[packages/account/src/wallet/wallets.ts:123](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/wallets.ts#L123)

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

[packages/account/src/wallet/wallets.ts:109](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/wallets.ts#L109)

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

[packages/account/src/wallet/wallets.ts:89](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/wallets.ts#L89)

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

[packages/account/src/wallet/wallets.ts:73](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/wallets.ts#L73)

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

[packages/account/src/wallet/wallets.ts:59](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet/wallets.ts#L59)
