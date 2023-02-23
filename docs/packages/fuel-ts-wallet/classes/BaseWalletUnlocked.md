---
layout: default
title: BaseWalletUnlocked
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: BaseWalletUnlocked

[@fuel-ts/wallet](../index.md).BaseWalletUnlocked

BaseWalletUnlocked

## Hierarchy

- [`Account`](Account.md)

  ↳ **`BaseWalletUnlocked`**

  ↳↳ [`WalletUnlocked`](WalletUnlocked.md)

## Constructors

### constructor

• **new BaseWalletUnlocked**(`privateKey`, `provider?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `privateKey` | `BytesLike` | `undefined` |
| `provider` | `string` \| `default` | `FUEL_NETWORK_URL` |

#### Overrides

[Account](Account.md).[constructor](Account.md#constructor)

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L26)

## Properties

### address

• `Readonly` **address**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Inherited from

[Account](Account.md).[address](Account.md#address)

#### Defined in

[packages/wallet/src/account.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L35)

___

### provider

• **provider**: `default`

#### Overrides

[Account](Account.md).[provider](Account.md#provider)

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L22)

___

### signer

• **signer**: () => [`Signer`](internal-Signer.md)

#### Type declaration

▸ (): [`Signer`](internal-Signer.md)

##### Returns

[`Signer`](internal-Signer.md)

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L24)

___

### defaultPath

▪ `Static` **defaultPath**: `string` = `"m/44'/1179993420'/0'/0/0"`

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L20)

## Accessors

### privateKey

• `get` **privateKey**(): `string`

#### Returns

`string`

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L33)

___

### publicKey

• `get` **publicKey**(): `string`

#### Returns

`string`

#### Defined in

[packages/wallet/src/base-unlocked-wallet.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/base-unlocked-wallet.ts#L37)

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

[Account](Account.md).[connect](Account.md#connect)

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

[Account](Account.md).[fund](Account.md#fund)

#### Defined in

[packages/wallet/src/account.ts:171](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L171)

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

[Account](Account.md).[getBalance](Account.md#getbalance)

#### Defined in

[packages/wallet/src/account.ts:134](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L134)

___

### getBalances

▸ **getBalances**(): `Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

Gets balances.

#### Returns

`Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

#### Inherited from

[Account](Account.md).[getBalances](Account.md#getbalances)

#### Defined in

[packages/wallet/src/account.ts:142](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L142)

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

[Account](Account.md).[getCoins](Account.md#getcoins)

#### Defined in

[packages/wallet/src/account.ts:76](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L76)

___

### getMessages

▸ **getMessages**(): `Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

Gets messages owned by the wallet address.

#### Returns

`Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

#### Inherited from

[Account](Account.md).[getMessages](Account.md#getmessages)

#### Defined in

[packages/wallet/src/account.ts:105](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L105)

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

[Account](Account.md).[getResourcesToSpend](Account.md#getresourcestospend)

#### Defined in

[packages/wallet/src/account.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L66)

___

### populateTransactionWitnessesSignature

▸ **populateTransactionWitnessesSignature**(`transactionRequestLike`): `Promise`<[`TransactionRequest`](../namespaces/internal.md#transactionrequest)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike) |

#### Returns

`Promise`<[`TransactionRequest`](../namespaces/internal.md#transactionrequest)\>

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

#### Overrides

[Account](Account.md).[sendTransaction](Account.md#sendtransaction)

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

#### Overrides

[Account](Account.md).[simulateTransaction](Account.md#simulatetransaction)

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
| `txParams` | `Pick`<[`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike), ``"gasPrice"`` \| ``"gasLimit"`` \| ``"maturity"``\> | `{}` | Tx Params |

#### Returns

`Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

#### Inherited from

[Account](Account.md).[transfer](Account.md#transfer)

#### Defined in

[packages/wallet/src/account.ts:181](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L181)

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

[Account](Account.md).[withdrawToBaseLayer](Account.md#withdrawtobaselayer)

#### Defined in

[packages/wallet/src/account.ts:213](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/account.ts#L213)
