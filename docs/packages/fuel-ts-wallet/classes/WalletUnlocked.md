---
layout: default
title: WalletUnlocked
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: WalletUnlocked

[@fuel-ts/wallet](../index.md).WalletUnlocked

WalletUnlocked

## Hierarchy

- [`BaseWalletUnlocked`](BaseWalletUnlocked.md)

  ↳ **`WalletUnlocked`**

## Constructors

### constructor

• **new WalletUnlocked**(`privateKey`, `provider?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `privateKey` | `BytesLike` | `undefined` |
| `provider` | `string` \| [`Provider`](internal-Provider.md) | `FUEL_NETWORK_URL` |

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[constructor](BaseWalletUnlocked.md#constructor)

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L26)

## Properties

### address

• `Readonly` **address**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[address](BaseWalletUnlocked.md#address)

#### Defined in

[packages/wallet/src/account.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L35)

___

### provider

• **provider**: [`Provider`](internal-Provider.md)

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[provider](BaseWalletUnlocked.md#provider)

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L22)

___

### signer

• **signer**: () => [`Signer`](internal-Signer.md)

#### Type declaration

▸ (): [`Signer`](internal-Signer.md)

##### Returns

[`Signer`](internal-Signer.md)

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[signer](BaseWalletUnlocked.md#signer)

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L24)

___

### defaultPath

▪ `Static` **defaultPath**: `string` = `"m/44'/1179993420'/0'/0/0"`

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[defaultPath](BaseWalletUnlocked.md#defaultpath)

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L20)

## Accessors

### privateKey

• `get` **privateKey**(): `string`

#### Returns

`string`

#### Inherited from

BaseWalletUnlocked.privateKey

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L33)

___

### publicKey

• `get` **publicKey**(): `string`

#### Returns

`string`

#### Inherited from

BaseWalletUnlocked.publicKey

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L37)

## Methods

### connect

▸ **connect**(`provider`): [`Provider`](internal-Provider.md)

Change provider connection

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `string` \| [`Provider`](internal-Provider.md) |

#### Returns

[`Provider`](internal-Provider.md)

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[connect](BaseWalletUnlocked.md#connect)

#### Defined in

[packages/wallet/src/account.ts:48](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L48)

___

### fund

▸ **fund**<`T`\>(`request`): `Promise`<`void`\>

Adds resources to the transaction enough to fund it.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`TransactionRequest`](../namespaces/internal.md#transactionrequest) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `T` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[fund](BaseWalletUnlocked.md#fund)

#### Defined in

[packages/wallet/src/account.ts:169](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L169)

___

### getBalance

▸ **getBalance**(`assetId?`): `Promise`<[`BN`](internal-BN.md)\>

Gets balance for the given asset.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `assetId` | `BytesLike` | `NativeAssetId` |

#### Returns

`Promise`<[`BN`](internal-BN.md)\>

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[getBalance](BaseWalletUnlocked.md#getbalance)

#### Defined in

[packages/wallet/src/account.ts:132](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L132)

___

### getBalances

▸ **getBalances**(): `Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

Gets balances.

#### Returns

`Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[getBalances](BaseWalletUnlocked.md#getbalances)

#### Defined in

[packages/wallet/src/account.ts:140](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L140)

___

### getCoins

▸ **getCoins**(`assetId?`): `Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

Gets coins owned by the wallet address.

#### Parameters

| Name | Type |
| :------ | :------ |
| `assetId?` | `BytesLike` |

#### Returns

`Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[getCoins](BaseWalletUnlocked.md#getcoins)

#### Defined in

[packages/wallet/src/account.ts:74](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L74)

___

### getMessages

▸ **getMessages**(): `Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

Gets messages owned by the wallet address.

#### Returns

`Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[getMessages](BaseWalletUnlocked.md#getmessages)

#### Defined in

[packages/wallet/src/account.ts:103](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L103)

___

### getResourcesToSpend

▸ **getResourcesToSpend**(`quantities`, `excludedIds?`): `Promise`<[`Resource`](../namespaces/internal.md#resource)[]\>

Returns resources satisfying the spend query.

#### Parameters

| Name | Type |
| :------ | :------ |
| `quantities` | [`CoinQuantityLike`](../namespaces/internal.md#coinquantitylike)[] |
| `excludedIds?` | [`ExcludeResourcesOption`](../namespaces/internal.md#excluderesourcesoption) |

#### Returns

`Promise`<[`Resource`](../namespaces/internal.md#resource)[]\>

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[getResourcesToSpend](BaseWalletUnlocked.md#getresourcestospend)

#### Defined in

[packages/wallet/src/account.ts:64](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L64)

___

### lock

▸ **lock**(): [`WalletLocked`](WalletLocked.md)

#### Returns

[`WalletLocked`](WalletLocked.md)

#### Defined in

[packages/wallet/src/wallets.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallets.ts#L30)

___

### populateTransactionWitnessesSignature

▸ **populateTransactionWitnessesSignature**(`transactionRequestLike`): `Promise`<[`TransactionRequest`](../namespaces/internal.md#transactionrequest)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike) |

#### Returns

`Promise`<[`TransactionRequest`](../namespaces/internal.md#transactionrequest)\>

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[populateTransactionWitnessesSignature](BaseWalletUnlocked.md#populatetransactionwitnessessignature)

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:65](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L65)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`): `Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

Populates witnesses signature and send it to the network using `provider.sendTransaction`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike) |

#### Returns

`Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

TransactionResponse

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[sendTransaction](BaseWalletUnlocked.md#sendtransaction)

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:80](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L80)

___

### signMessage

▸ **signMessage**(`message`): `Promise`<`string`\>

Sign message with wallet instance privateKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | Message |

#### Returns

`Promise`<`string`\>

Promise<string> - Signature a ECDSA 64 bytes

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[signMessage](BaseWalletUnlocked.md#signmessage)

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L47)

___

### signTransaction

▸ **signTransaction**(`transactionRequestLike`): `Promise`<`string`\>

Sign transaction with wallet instance privateKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike) | TransactionRequestLike |

#### Returns

`Promise`<`string`\>

string - Signature a ECDSA 64 bytes

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[signTransaction](BaseWalletUnlocked.md#signtransaction)

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:57](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L57)

___

### simulateTransaction

▸ **simulateTransaction**(`transactionRequestLike`): `Promise`<[`CallResult`](../namespaces/internal.md#callresult)\>

Populates witnesses signature and send a call it to the network using `provider.call`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike) |

#### Returns

`Promise`<[`CallResult`](../namespaces/internal.md#callresult)\>

CallResult

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[simulateTransaction](BaseWalletUnlocked.md#simulatetransaction)

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:96](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L96)

___

### transfer

▸ **transfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

Returns coins satisfying the spend query.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `destination` | [`AbstractAddress`](internal-AbstractAddress.md) | `undefined` | Address of the destination |
| `amount` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` | Amount of coins |
| `assetId` | `BytesLike` | `NativeAssetId` | Asset ID of coins |
| `txParams` | `Pick`<[`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike), ``"gasLimit"`` \| ``"gasPrice"`` \| ``"maturity"``\> | `{}` | Tx Params |

#### Returns

`Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[transfer](BaseWalletUnlocked.md#transfer)

#### Defined in

[packages/wallet/src/account.ts:179](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L179)

___

### withdrawToBaseLayer

▸ **withdrawToBaseLayer**(`recipient`, `amount`, `txParams?`): `Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

Withdraws an amount of the base asset to the base chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recipient` | [`AbstractAddress`](internal-AbstractAddress.md) | Address of the recipient on the base chain |
| `amount` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | Amount of base asset |
| `txParams` | `Pick`<[`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike), ``"gasLimit"`` \| ``"gasPrice"`` \| ``"maturity"``\> | Tx Params |

#### Returns

`Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

#### Inherited from

[BaseWalletUnlocked](BaseWalletUnlocked.md).[withdrawToBaseLayer](BaseWalletUnlocked.md#withdrawtobaselayer)

#### Defined in

[packages/wallet/src/account.ts:212](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L212)

___

### fromExtendedKey

▸ `Static` **fromExtendedKey**(`extendedKey`, `provider?`): [`WalletUnlocked`](WalletUnlocked.md)

Create Wallet Unlocked from extended key

#### Parameters

| Name | Type |
| :------ | :------ |
| `extendedKey` | `string` |
| `provider?` | [`Provider`](internal-Provider.md) |

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

#### Defined in

[packages/wallet/src/wallets.ts:76](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallets.ts#L76)

___

### fromMnemonic

▸ `Static` **fromMnemonic**(`mnemonic`, `path?`, `passphrase?`, `provider?`): [`WalletUnlocked`](WalletUnlocked.md)

Create Wallet Unlocked from mnemonic phrase

#### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `path?` | `string` |
| `passphrase?` | `BytesLike` |
| `provider?` | [`Provider`](internal-Provider.md) |

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

#### Defined in

[packages/wallet/src/wallets.ts:60](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallets.ts#L60)

___

### fromSeed

▸ `Static` **fromSeed**(`seed`, `path?`, `provider?`): [`WalletUnlocked`](WalletUnlocked.md)

Create Wallet Unlocked from a seed

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `string` |
| `path?` | `string` |
| `provider?` | [`Provider`](internal-Provider.md) |

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

#### Defined in

[packages/wallet/src/wallets.ts:50](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallets.ts#L50)

___

### generate

▸ `Static` **generate**(`generateOptions?`): [`WalletUnlocked`](WalletUnlocked.md)

Generate a new Wallet Unlocked with a random keyPair

#### Parameters

| Name | Type |
| :------ | :------ |
| `generateOptions?` | [`GenerateOptions`](../interfaces/internal-GenerateOptions.md) |

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

wallet - Wallet instance

#### Defined in

[packages/wallet/src/wallets.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallets.ts#L41)
