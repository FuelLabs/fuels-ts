---
layout: default
title: WalletLocked
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: WalletLocked

[@fuel-ts/wallet](../index.md).WalletLocked

WalletLocked

## Hierarchy

- [`BaseWalletLocked`](BaseWalletLocked.md)

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

[BaseWalletLocked](BaseWalletLocked.md).[constructor](BaseWalletLocked.md#constructor)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L42)

## Properties

### provider

• **provider**: `default`

#### Inherited from

[BaseWalletLocked](BaseWalletLocked.md).[provider](BaseWalletLocked.md#provider)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L40)

## Accessors

### address

• `get` **address**(): [`AbstractAddress`](internal-AbstractAddress.md)

#### Returns

[`AbstractAddress`](internal-AbstractAddress.md)

#### Inherited from

BaseWalletLocked.address

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:52](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L52)

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

[BaseWalletLocked](BaseWalletLocked.md).[buildPredicateTransaction](BaseWalletLocked.md#buildpredicatetransaction)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:279](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L279)

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

[BaseWalletLocked](BaseWalletLocked.md).[connect](BaseWalletLocked.md#connect)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:59](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L59)

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

[BaseWalletLocked](BaseWalletLocked.md).[fund](BaseWalletLocked.md#fund)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:178](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L178)

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

[BaseWalletLocked](BaseWalletLocked.md).[getBalance](BaseWalletLocked.md#getbalance)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:141](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L141)

___

### getBalances

▸ **getBalances**(): `Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

Gets balances.

#### Returns

`Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

#### Inherited from

[BaseWalletLocked](BaseWalletLocked.md).[getBalances](BaseWalletLocked.md#getbalances)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:149](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L149)

___

### getCoins

▸ **getCoins**(): `Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

Gets coins owned by the wallet address.

#### Returns

`Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

#### Inherited from

[BaseWalletLocked](BaseWalletLocked.md).[getCoins](BaseWalletLocked.md#getcoins)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:83](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L83)

___

### getMessages

▸ **getMessages**(): `Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

Gets messages owned by the wallet address.

#### Returns

`Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

#### Inherited from

[BaseWalletLocked](BaseWalletLocked.md).[getMessages](BaseWalletLocked.md#getmessages)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:112](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L112)

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

[BaseWalletLocked](BaseWalletLocked.md).[getResourcesToSpend](BaseWalletLocked.md#getresourcestospend)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:73](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L73)

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

[BaseWalletLocked](BaseWalletLocked.md).[sendTransaction](BaseWalletLocked.md#sendtransaction)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:259](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L259)

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

[BaseWalletLocked](BaseWalletLocked.md).[simulateTransaction](BaseWalletLocked.md#simulatetransaction)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:273](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L273)

___

### submitPredicate

▸ **submitPredicate**(`predicateAddress`, `amountToPredicate`, `assetId?`, `options?`): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``, `void`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `predicateAddress` | [`AbstractAddress`](internal-AbstractAddress.md) | `undefined` |
| `amountToPredicate` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` |
| `assetId` | `BytesLike` | `NativeAssetId` |
| `options?` | [`BuildPredicateOptions`](../namespaces/internal.md#buildpredicateoptions) | `undefined` |

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``, `void`\>\>

#### Inherited from

[BaseWalletLocked](BaseWalletLocked.md).[submitPredicate](BaseWalletLocked.md#submitpredicate)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:310](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L310)

___

### submitSpendPredicate

▸ **submitSpendPredicate**(`predicate`, `amountToSpend`, `predicateData?`, `assetId?`, `options?`): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``, `void`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `predicate` | [`AbstractPredicate`](internal-AbstractPredicate.md) | `undefined` |
| `amountToSpend` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` |
| `predicateData?` | [`InputValue`](../namespaces/internal.md#inputvalue)[] | `undefined` |
| `assetId` | `BytesLike` | `NativeAssetId` |
| `options?` | [`BuildPredicateOptions`](../namespaces/internal.md#buildpredicateoptions) | `undefined` |

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``, `void`\>\>

#### Inherited from

[BaseWalletLocked](BaseWalletLocked.md).[submitSpendPredicate](BaseWalletLocked.md#submitspendpredicate)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:326](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L326)

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
| `txParams` | `Pick`<[`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike), ``"gasPrice"`` \| ``"gasLimit"`` \| ``"maturity"``\> | `{}` | Tx Params |

#### Returns

`Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

#### Inherited from

[BaseWalletLocked](BaseWalletLocked.md).[transfer](BaseWalletLocked.md#transfer)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:188](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L188)

___

### unlock

▸ **unlock**(`privateKey`): [`WalletUnlocked`](WalletUnlocked.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `BytesLike` |

#### Returns

[`WalletUnlocked`](WalletUnlocked.md)

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
| `txParams` | `Pick`<[`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike), ``"gasPrice"`` \| ``"gasLimit"`` \| ``"maturity"``\> | Tx Params |

#### Returns

`Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

#### Inherited from

[BaseWalletLocked](BaseWalletLocked.md).[withdrawToBaseLayer](BaseWalletLocked.md#withdrawtobaselayer)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:218](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L218)
