---
layout: default
title: Account
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: Account

[@fuel-ts/wallet](../index.md).Account

Account

## Hierarchy

- [`AbstractAccount`](internal-AbstractAccount.md)

  ↳ **`Account`**

  ↳↳ [`BaseWalletUnlocked`](BaseWalletUnlocked.md)

  ↳↳ [`WalletLocked`](WalletLocked.md)

## Constructors

### constructor

• **new Account**(`address`, `provider?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](internal-AbstractAddress.md) | `undefined` |
| `provider` | `string` \| [`Provider`](internal-Provider.md) | `FUEL_NETWORK_URL` |

#### Overrides

[AbstractAccount](internal-AbstractAccount.md).[constructor](internal-AbstractAccount.md#constructor)

#### Defined in

[packages/wallet/src/account.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L39)

## Properties

### address

• `Readonly` **address**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Overrides

[AbstractAccount](internal-AbstractAccount.md).[address](internal-AbstractAccount.md#address)

#### Defined in

[packages/wallet/src/account.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L35)

___

### provider

• **provider**: [`Provider`](internal-Provider.md)

#### Overrides

[AbstractAccount](internal-AbstractAccount.md).[provider](internal-AbstractAccount.md#provider)

#### Defined in

[packages/wallet/src/account.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L37)

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

#### Defined in

[packages/wallet/src/account.ts:132](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L132)

___

### getBalances

▸ **getBalances**(): `Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

Gets balances.

#### Returns

`Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

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

#### Defined in

[packages/wallet/src/account.ts:74](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L74)

___

### getMessages

▸ **getMessages**(): `Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

Gets messages owned by the wallet address.

#### Returns

`Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

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

#### Overrides

[AbstractAccount](internal-AbstractAccount.md).[getResourcesToSpend](internal-AbstractAccount.md#getresourcestospend)

#### Defined in

[packages/wallet/src/account.ts:64](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L64)

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

#### Overrides

[AbstractAccount](internal-AbstractAccount.md).[sendTransaction](internal-AbstractAccount.md#sendtransaction)

#### Defined in

[packages/wallet/src/account.ts:253](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L253)

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

#### Overrides

[AbstractAccount](internal-AbstractAccount.md).[simulateTransaction](internal-AbstractAccount.md#simulatetransaction)

#### Defined in

[packages/wallet/src/account.ts:267](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L267)

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

#### Defined in

[packages/wallet/src/account.ts:212](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L212)
