---
layout: default
title: BaseWalletLocked
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: BaseWalletLocked

[@fuel-ts/wallet](../index.md).BaseWalletLocked

BaseWallet

## Hierarchy

- [`AbstractWallet`](internal-AbstractWallet.md)

  ↳ **`BaseWalletLocked`**

  ↳↳ [`BaseWalletUnlocked`](BaseWalletUnlocked.md)

  ↳↳ [`WalletLocked`](WalletLocked.md)

## Constructors

### constructor

• **new BaseWalletLocked**(`publicKey`, `provider?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `publicKey` | `string` \| [`AbstractAddress`](internal-AbstractAddress.md) | `undefined` |
| `provider` | `string` \| `default` | `FUEL_NETWORK_URL` |

#### Overrides

[AbstractWallet](internal-AbstractWallet.md).[constructor](internal-AbstractWallet.md#constructor)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L42)

## Properties

### \_address

• `Private` `Readonly` **\_address**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L38)

___

### provider

• **provider**: `default`

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L40)

## Accessors

### address

• `get` **address**(): [`AbstractAddress`](internal-AbstractAddress.md)

#### Returns

[`AbstractAddress`](internal-AbstractAddress.md)

#### Overrides

AbstractWallet.address

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

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:285](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L285)

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

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:182](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L182)

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

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:145](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L145)

___

### getBalances

▸ **getBalances**(): `Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

Gets balances.

#### Returns

`Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:153](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L153)

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

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:87](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L87)

___

### getMessages

▸ **getMessages**(): `Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

Gets messages owned by the wallet address.

#### Returns

`Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:116](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L116)

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

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:77](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L77)

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

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:265](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L265)

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

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:279](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L279)

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

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:316](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L316)

___

### submitSpendPredicate

▸ **submitSpendPredicate**(`predicate`, `amountToSpend`, `predicateData?`, `assetId?`, `options?`): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``, `void`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `predicate` | [`AbstractPredicate`](internal-AbstractPredicate.md) | `undefined` |
| `amountToSpend` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` |
| `predicateData?` | [`InputValue`](../namespaces/internal.md#inputvalue)<`void`\>[] | `undefined` |
| `assetId` | `BytesLike` | `NativeAssetId` |
| `options?` | [`BuildPredicateOptions`](../namespaces/internal.md#buildpredicateoptions) | `undefined` |

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``, `void`\>\>

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:332](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L332)

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

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:192](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L192)

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

#### Defined in

[packages/wallet/src/base-locked-wallet.ts:224](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-locked-wallet.ts#L224)
