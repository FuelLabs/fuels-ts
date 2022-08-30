---
layout: default
title: Wallet
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: Wallet

[@fuel-ts/wallet](../index.md).Wallet

## Hierarchy

- [`AbstractWallet`](internal-AbstractWallet.md)

  ↳ **`Wallet`**

## Constructors

### constructor

• **new Wallet**(`privateKey`, `provider?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `privateKey` | `BytesLike` | `undefined` |
| `provider` | `string` \| `default` | `FUEL_NETWORK_URL` |

#### Overrides

[AbstractWallet](internal-AbstractWallet.md).[constructor](internal-AbstractWallet.md#constructor)

#### Defined in

[packages/wallet/src/wallet.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L38)

## Properties

### provider

• **provider**: `default`

#### Defined in

[packages/wallet/src/wallet.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L34)

___

### signer

• `Readonly` **signer**: () => [`Signer`](internal-Signer.md)

#### Type declaration

▸ (): [`Signer`](internal-Signer.md)

##### Returns

[`Signer`](internal-Signer.md)

#### Defined in

[packages/wallet/src/wallet.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L36)

___

### defaultPath

▪ `Static` **defaultPath**: `string` = `"m/44'/1179993420'/0'/0/0"`

#### Defined in

[packages/wallet/src/wallet.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L32)

## Accessors

### address

• `get` **address**(): [`AbstractAddress`](internal-AbstractAddress.md)

#### Returns

[`AbstractAddress`](internal-AbstractAddress.md)

#### Overrides

AbstractWallet.address

#### Defined in

[packages/wallet/src/wallet.ts:46](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L46)

___

### privateKey

• `get` **privateKey**(): `string`

#### Returns

`string`

#### Defined in

[packages/wallet/src/wallet.ts:50](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L50)

___

### publicKey

• `get` **publicKey**(): `string`

#### Returns

`string`

#### Defined in

[packages/wallet/src/wallet.ts:54](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L54)

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

[packages/wallet/src/wallet.ts:243](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L243)

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

[packages/wallet/src/wallet.ts:61](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L61)

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

#### Defined in

[packages/wallet/src/wallet.ts:184](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L184)

___

### getBalance

▸ **getBalance**(`assetId?`): `Promise`<`string`\>

Gets balance for the given asset.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `assetId` | `BytesLike` | `NativeAssetId` |

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/wallet/src/wallet.ts:147](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L147)

___

### getBalances

▸ **getBalances**(): `Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

Gets balances.

#### Returns

`Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

#### Defined in

[packages/wallet/src/wallet.ts:155](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L155)

___

### getCoins

▸ **getCoins**(): `Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

Gets coins owned by the wallet address.

#### Returns

`Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

#### Defined in

[packages/wallet/src/wallet.ts:118](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L118)

___

### getCoinsToSpend

▸ **getCoinsToSpend**(`quantities`): `Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

Returns coins satisfying the spend query.

#### Parameters

| Name | Type |
| :------ | :------ |
| `quantities` | [`CoinQuantityLike`](../namespaces/internal.md#coinquantitylike)[] |

#### Returns

`Promise`<[`Coin`](../namespaces/internal.md#coin-2)[]\>

#### Defined in

[packages/wallet/src/wallet.ts:111](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L111)

___

### populateTransactionWitnessesSignature

▸ **populateTransactionWitnessesSignature**(`transactionRequestLike`): [`TransactionRequest`](../namespaces/internal.md#transactionrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike) |

#### Returns

[`TransactionRequest`](../namespaces/internal.md#transactionrequest)

#### Defined in

[packages/wallet/src/wallet.ts:96](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L96)

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

[packages/wallet/src/wallet.ts:219](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L219)

___

### signMessage

▸ **signMessage**(`message`): `string`

Sign message with wallet instance privateKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | Message |

#### Returns

`string`

string - Signature a ECDSA 64 bytes

#### Defined in

[packages/wallet/src/wallet.ts:78](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L78)

___

### signTransaction

▸ **signTransaction**(`transactionRequestLike`): `string`

Sign transaction with wallet instance privateKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike) | TransactionRequestLike |

#### Returns

`string`

string - Signature a ECDSA 64 bytes

#### Defined in

[packages/wallet/src/wallet.ts:88](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L88)

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

[packages/wallet/src/wallet.ts:235](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L235)

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

#### Defined in

[packages/wallet/src/wallet.ts:274](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L274)

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

#### Defined in

[packages/wallet/src/wallet.ts:290](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L290)

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
| `txParams` | `Pick`<[`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike), ``"maturity"`` \| ``"gasPrice"`` \| ``"gasLimit"`` \| ``"bytePrice"``\> | `{}` | Tx Params |

#### Returns

`Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

#### Defined in

[packages/wallet/src/wallet.ts:194](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L194)

___

### fromExtendedKey

▸ `Static` **fromExtendedKey**(`extendedKey`): [`Wallet`](Wallet.md)

Create wallet from extended key

#### Parameters

| Name | Type |
| :------ | :------ |
| `extendedKey` | `string` |

#### Returns

[`Wallet`](Wallet.md)

#### Defined in

[packages/wallet/src/wallet.ts:343](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L343)

___

### fromMnemonic

▸ `Static` **fromMnemonic**(`mnemonic`, `path?`, `passphrase?`): [`Wallet`](Wallet.md)

Create wallet from mnemonic phrase

#### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `path?` | `string` |
| `passphrase?` | `BytesLike` |

#### Returns

[`Wallet`](Wallet.md)

#### Defined in

[packages/wallet/src/wallet.ts:332](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L332)

___

### fromSeed

▸ `Static` **fromSeed**(`seed`, `path?`): [`Wallet`](Wallet.md)

Create wallet from a seed

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `string` |
| `path?` | `string` |

#### Returns

[`Wallet`](Wallet.md)

#### Defined in

[packages/wallet/src/wallet.ts:322](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L322)

___

### generate

▸ `Static` **generate**(`generateOptions?`): [`Wallet`](Wallet.md)

Generate a new Wallet with a random keyPair

#### Parameters

| Name | Type |
| :------ | :------ |
| `generateOptions?` | [`GenerateOptions`](../interfaces/internal-GenerateOptions.md) |

#### Returns

[`Wallet`](Wallet.md)

wallet - Wallet instance

#### Defined in

[packages/wallet/src/wallet.ts:313](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L313)
