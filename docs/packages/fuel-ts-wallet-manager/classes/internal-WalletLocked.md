---
layout: default
title: WalletLocked
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: WalletLocked

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).WalletLocked

WalletLocked

## Hierarchy

- [`BaseWalletLocked`](internal-BaseWalletLocked.md)

  ↳ **`WalletLocked`**

## Constructors

### constructor

• **new WalletLocked**(`publicKey`, `provider?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `publicKey` | `string` \| [`AbstractAddress`](internal-AbstractAddress.md) | `undefined` |
| `provider` | `string` \| `default` | `FUEL_NETWORK_URL` |

#### Inherited from

[BaseWalletLocked](internal-BaseWalletLocked.md).[constructor](internal-BaseWalletLocked.md#constructor)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L40)

## Properties

### provider

• **provider**: `default`

#### Inherited from

[BaseWalletLocked](internal-BaseWalletLocked.md).[provider](internal-BaseWalletLocked.md#provider)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L38)

## Accessors

### address

• `get` **address**(): [`AbstractAddress`](internal-AbstractAddress.md)

#### Returns

[`AbstractAddress`](internal-AbstractAddress.md)

#### Inherited from

BaseWalletLocked.address

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:50](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L50)

## Methods

### buildPredicateTransaction

▸ **buildPredicateTransaction**(`predicateAddress`, `amountToPredicate`, `assetId?`, `predicateOptions?`): `Promise`<[`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `predicateAddress` | [`AbstractAddress`](internal-AbstractAddress.md) | `undefined` |
| `amountToPredicate` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` |
| `assetId` | `BytesLike` | `NativeAssetId` |
| `predicateOptions?` | [`BuildPredicateOptions`](../namespaces/internal.md#buildpredicateoptions) | `undefined` |

#### Returns

`Promise`<[`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)\>

#### Inherited from

[BaseWalletLocked](internal-BaseWalletLocked.md).[buildPredicateTransaction](internal-BaseWalletLocked.md#buildpredicatetransaction)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:278](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L278)

___

### connect

▸ **connect**(`provider`): `default`

Change provider connection

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `string` \| `default` |

#### Returns

`default`

#### Inherited from

[BaseWalletLocked](internal-BaseWalletLocked.md).[connect](internal-BaseWalletLocked.md#connect)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:57](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L57)

___

### fund

▸ **fund**<`T`\>(`request`): `Promise`<`void`\>

Adds coins to the transaction enough to fund it.

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

[BaseWalletLocked](internal-BaseWalletLocked.md).[fund](internal-BaseWalletLocked.md#fund)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:177](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L177)

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

[BaseWalletLocked](internal-BaseWalletLocked.md).[getBalance](internal-BaseWalletLocked.md#getbalance)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:140](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L140)

___

### getBalances

▸ **getBalances**(): `Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

Gets balances.

#### Returns

`Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

#### Inherited from

[BaseWalletLocked](internal-BaseWalletLocked.md).[getBalances](internal-BaseWalletLocked.md#getbalances)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:148](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L148)

___

### getCoins

▸ **getCoins**(): `Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

Gets coins owned by the wallet address.

#### Returns

`Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

#### Inherited from

[BaseWalletLocked](internal-BaseWalletLocked.md).[getCoins](internal-BaseWalletLocked.md#getcoins)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:82](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L82)

___

### getCoinsToSpend

▸ **getCoinsToSpend**(`quantities`, `excludedIds?`): `Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

Returns coins satisfying the spend query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quantities` | [`CoinQuantityLike`](../namespaces/internal.md#coinquantitylike)[] | - |
| `excludedIds?` | `BytesLike`[] | IDs of coins to exclude |

#### Returns

`Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

#### Inherited from

[BaseWalletLocked](internal-BaseWalletLocked.md).[getCoinsToSpend](internal-BaseWalletLocked.md#getcoinstospend)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:71](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L71)

___

### getMessages

▸ **getMessages**(): `Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

Gets messages owned by the wallet address.

#### Returns

`Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

#### Inherited from

[BaseWalletLocked](internal-BaseWalletLocked.md).[getMessages](internal-BaseWalletLocked.md#getmessages)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:111](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L111)

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

[BaseWalletLocked](internal-BaseWalletLocked.md).[sendTransaction](internal-BaseWalletLocked.md#sendtransaction)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:258](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L258)

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

[BaseWalletLocked](internal-BaseWalletLocked.md).[simulateTransaction](internal-BaseWalletLocked.md#simulatetransaction)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:272](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L272)

___

### submitPredicate

▸ **submitPredicate**(`predicateAddress`, `amountToPredicate`, `assetId?`, `options?`): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `predicateAddress` | [`AbstractAddress`](internal-AbstractAddress.md) | `undefined` |
| `amountToPredicate` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` |
| `assetId` | `BytesLike` | `NativeAssetId` |
| `options?` | [`BuildPredicateOptions`](../namespaces/internal.md#buildpredicateoptions) | `undefined` |

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``\>\>

#### Inherited from

[BaseWalletLocked](internal-BaseWalletLocked.md).[submitPredicate](internal-BaseWalletLocked.md#submitpredicate)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:309](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L309)

___

### submitSpendPredicate

▸ **submitSpendPredicate**(`predicate`, `amountToSpend`, `predicateData?`, `assetId?`, `options?`): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `predicate` | [`AbstractPredicate`](internal-AbstractPredicate.md) | `undefined` |
| `amountToSpend` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` |
| `predicateData?` | [`InputValue`](../namespaces/internal.md#inputvalue)[] | `undefined` |
| `assetId` | `BytesLike` | `NativeAssetId` |
| `options?` | [`BuildPredicateOptions`](../namespaces/internal.md#buildpredicateoptions) | `undefined` |

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``\>\>

#### Inherited from

[BaseWalletLocked](internal-BaseWalletLocked.md).[submitSpendPredicate](internal-BaseWalletLocked.md#submitspendpredicate)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:325](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L325)

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
| `txParams` | `Pick`<[`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike), ``"maturity"`` \| ``"gasPrice"`` \| ``"gasLimit"``\> | `{}` | Tx Params |

#### Returns

`Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

#### Inherited from

[BaseWalletLocked](internal-BaseWalletLocked.md).[transfer](internal-BaseWalletLocked.md#transfer)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:187](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L187)

___

### unlock

▸ **unlock**(`privateKey`): [`WalletUnlocked`](internal-WalletUnlocked.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `BytesLike` |

#### Returns

[`WalletUnlocked`](internal-WalletUnlocked.md)

#### Defined in

[packages/wallet/src/wallets.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallets.ts#L19)

___

### withdrawToBaseLayer

▸ **withdrawToBaseLayer**(`recipient`, `amount`, `txParams?`): `Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

Withdraws an amount of the base asset to the base chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recipient` | [`AbstractAddress`](internal-AbstractAddress.md) | Address of the recipient on the base chain |
| `amount` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | Amount of base asset |
| `txParams` | `Pick`<[`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike), ``"maturity"`` \| ``"gasPrice"`` \| ``"gasLimit"``\> | Tx Params |

#### Returns

`Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

#### Inherited from

[BaseWalletLocked](internal-BaseWalletLocked.md).[withdrawToBaseLayer](internal-BaseWalletLocked.md#withdrawtobaselayer)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:217](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L217)
