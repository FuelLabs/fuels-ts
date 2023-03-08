---
layout: default
title: Predicate
parent: "@fuel-ts/predicate"
nav_order: 1

---

# Class: Predicate<ARGS\>

[@fuel-ts/predicate](../index.md).Predicate

Account

## Type parameters

| Name | Type |
| :------ | :------ |
| `ARGS` | extends [`InputValue`](../namespaces/internal.md#inputvalue)[] |

## Hierarchy

- [`Account`](internal-Account.md)

  ↳ **`Predicate`**

## Constructors

### constructor

• **new Predicate**<`ARGS`\>(`bytes`, `types?`, `provider?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ARGS` | extends [`InputValue`](../namespaces/internal.md#inputvalue)<`void`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytes` | `BytesLike` |
| `types?` | [`JsonAbi`](../namespaces/internal.md#jsonabi) |
| `provider?` | `string` \| `default` |

#### Overrides

[Account](internal-Account.md).[constructor](internal-Account.md#constructor)

#### Defined in

[packages/predicate/src/predicate.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L28)

## Properties

### address

• `Readonly` **address**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Inherited from

[Account](internal-Account.md).[address](internal-Account.md#address)

#### Defined in

[packages/wallet/src/account.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L35)

___

### bytes

• **bytes**: `Uint8Array`

#### Defined in

[packages/predicate/src/predicate.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L23)

___

### interface

• `Optional` **interface**: `default`

#### Defined in

[packages/predicate/src/predicate.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L26)

___

### predicateData

• **predicateData**: `Uint8Array`

#### Defined in

[packages/predicate/src/predicate.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L25)

___

### provider

• **provider**: `default`

#### Inherited from

[Account](internal-Account.md).[provider](internal-Account.md#provider)

#### Defined in

[packages/wallet/src/account.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L37)

___

### types

• `Optional` **types**: readonly [`JsonAbiFragmentType`](../interfaces/internal-JsonAbiFragmentType.md)[]

#### Defined in

[packages/predicate/src/predicate.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L24)

## Methods

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

[Account](internal-Account.md).[connect](internal-Account.md#connect)

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

[Account](internal-Account.md).[fund](internal-Account.md#fund)

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

[Account](internal-Account.md).[getBalance](internal-Account.md#getbalance)

#### Defined in

[packages/wallet/src/account.ts:132](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L132)

___

### getBalances

▸ **getBalances**(): `Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

Gets balances.

#### Returns

`Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

#### Inherited from

[Account](internal-Account.md).[getBalances](internal-Account.md#getbalances)

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

[Account](internal-Account.md).[getCoins](internal-Account.md#getcoins)

#### Defined in

[packages/wallet/src/account.ts:74](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L74)

___

### getMessages

▸ **getMessages**(): `Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

Gets messages owned by the wallet address.

#### Returns

`Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

#### Inherited from

[Account](internal-Account.md).[getMessages](internal-Account.md#getmessages)

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

[Account](internal-Account.md).[getResourcesToSpend](internal-Account.md#getresourcestospend)

#### Defined in

[packages/wallet/src/account.ts:64](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L64)

___

### populateTransactionPredicateData

▸ **populateTransactionPredicateData**(`transactionRequestLike`): [`TransactionRequest`](../namespaces/internal.md#transactionrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike) |

#### Returns

[`TransactionRequest`](../namespaces/internal.md#transactionrequest)

#### Defined in

[packages/predicate/src/predicate.ts:50](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L50)

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

[Account](internal-Account.md).[sendTransaction](internal-Account.md#sendtransaction)

#### Defined in

[packages/predicate/src/predicate.ts:65](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L65)

___

### setData

▸ **setData**<`T`\>(...`args`): [`Predicate`](Predicate.md)<`ARGS`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`InputValue`](../namespaces/internal.md#inputvalue)<`void`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `T` |

#### Returns

[`Predicate`](Predicate.md)<`ARGS`\>

#### Defined in

[packages/predicate/src/predicate.ts:75](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L75)

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

[Account](internal-Account.md).[simulateTransaction](internal-Account.md#simulatetransaction)

#### Defined in

[packages/predicate/src/predicate.ts:70](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L70)

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

[Account](internal-Account.md).[transfer](internal-Account.md#transfer)

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
| `txParams` | `Pick`<[`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike), ``"gasPrice"`` \| ``"gasLimit"`` \| ``"maturity"``\> | Tx Params |

#### Returns

`Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

#### Inherited from

[Account](internal-Account.md).[withdrawToBaseLayer](internal-Account.md#withdrawtobaselayer)

#### Defined in

[packages/wallet/src/account.ts:212](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L212)
