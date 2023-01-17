---
layout: default
title: WalletUnlocked
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: WalletUnlocked

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).WalletUnlocked

WalletUnlocked

## Hierarchy

- [`BaseWalletUnlocked`](internal-BaseWalletUnlocked.md)

  ↳ **`WalletUnlocked`**

## Constructors

### constructor

• **new WalletUnlocked**(`privateKey`, `provider?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `BytesLike` |
| `provider?` | `string` \| `default` |

#### Inherited from

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[constructor](internal-BaseWalletUnlocked.md#constructor)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:93

## Properties

### provider

• **provider**: `default`

#### Inherited from

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[provider](internal-BaseWalletUnlocked.md#provider)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:91

___

### signer

• **signer**: () => [`Signer`](internal-Signer.md)

#### Type declaration

▸ (): [`Signer`](internal-Signer.md)

##### Returns

[`Signer`](internal-Signer.md)

#### Inherited from

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[signer](internal-BaseWalletUnlocked.md#signer)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:92

___

### defaultPath

▪ `Static` **defaultPath**: `string`

#### Inherited from

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[defaultPath](internal-BaseWalletUnlocked.md#defaultpath)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:90

## Accessors

### address

• `get` **address**(): [`AbstractAddress`](internal-AbstractAddress.md)

#### Returns

[`AbstractAddress`](internal-AbstractAddress.md)

#### Inherited from

BaseWalletUnlocked.address

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:16

___

### privateKey

• `get` **privateKey**(): `string`

#### Returns

`string`

#### Inherited from

BaseWalletUnlocked.privateKey

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:94

___

### publicKey

• `get` **publicKey**(): `string`

#### Returns

`string`

#### Inherited from

BaseWalletUnlocked.publicKey

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:95

## Methods

### buildPredicateTransaction

▸ **buildPredicateTransaction**(`predicateAddress`, `amountToPredicate`, `assetId?`, `predicateOptions?`): `Promise`<[`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicateAddress` | [`AbstractAddress`](internal-AbstractAddress.md) |
| `amountToPredicate` | [`BigNumberish`](../namespaces/internal.md#bignumberish) |
| `assetId?` | `BytesLike` |
| `predicateOptions?` | [`BuildPredicateOptions`](../namespaces/internal.md#buildpredicateoptions) |

#### Returns

`Promise`<[`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)\>

#### Inherited from

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[buildPredicateTransaction](internal-BaseWalletUnlocked.md#buildpredicatetransaction)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:81

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

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[connect](internal-BaseWalletUnlocked.md#connect)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:20

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

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[fund](internal-BaseWalletUnlocked.md#fund)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:44

___

### getBalance

▸ **getBalance**(`assetId?`): `Promise`<[`BN`](internal-BN.md)\>

Gets balance for the given asset.

#### Parameters

| Name | Type |
| :------ | :------ |
| `assetId?` | `BytesLike` |

#### Returns

`Promise`<[`BN`](internal-BN.md)\>

#### Inherited from

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[getBalance](internal-BaseWalletUnlocked.md#getbalance)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:36

___

### getBalances

▸ **getBalances**(): `Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

Gets balances.

#### Returns

`Promise`<[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]\>

#### Inherited from

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[getBalances](internal-BaseWalletUnlocked.md#getbalances)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:40

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

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[getCoins](internal-BaseWalletUnlocked.md#getcoins)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:28

___

### getMessages

▸ **getMessages**(): `Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

Gets messages owned by the wallet address.

#### Returns

`Promise`<[`Message`](../namespaces/internal.md#message-2)[]\>

#### Inherited from

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[getMessages](internal-BaseWalletUnlocked.md#getmessages)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:32

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

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[getResourcesToSpend](internal-BaseWalletUnlocked.md#getresourcestospend)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:24

___

### lock

▸ **lock**(): [`WalletLocked`](internal-WalletLocked.md)

#### Returns

[`WalletLocked`](internal-WalletLocked.md)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:143

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

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[populateTransactionWitnessesSignature](internal-BaseWalletUnlocked.md#populatetransactionwitnessessignature)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:110

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

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[sendTransaction](internal-BaseWalletUnlocked.md#sendtransaction)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:117

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

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[signMessage](internal-BaseWalletUnlocked.md#signmessage)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:102

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

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[signTransaction](internal-BaseWalletUnlocked.md#signtransaction)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:109

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

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[simulateTransaction](internal-BaseWalletUnlocked.md#simulatetransaction)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:124

___

### submitPredicate

▸ **submitPredicate**(`predicateAddress`, `amountToPredicate`, `assetId?`, `options?`): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``, `void`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicateAddress` | [`AbstractAddress`](internal-AbstractAddress.md) |
| `amountToPredicate` | [`BigNumberish`](../namespaces/internal.md#bignumberish) |
| `assetId?` | `BytesLike` |
| `options?` | [`BuildPredicateOptions`](../namespaces/internal.md#buildpredicateoptions) |

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``, `void`\>\>

#### Inherited from

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[submitPredicate](internal-BaseWalletUnlocked.md#submitpredicate)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:82

___

### submitSpendPredicate

▸ **submitSpendPredicate**(`predicate`, `amountToSpend`, `predicateData?`, `assetId?`, `options?`): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``, `void`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`AbstractPredicate`](internal-AbstractPredicate.md) |
| `amountToSpend` | [`BigNumberish`](../namespaces/internal.md#bignumberish) |
| `predicateData?` | [`InputValue`](../namespaces/internal.md#inputvalue)<`void`\>[] |
| `assetId?` | `BytesLike` |
| `options?` | [`BuildPredicateOptions`](../namespaces/internal.md#buildpredicateoptions) |

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``, `void`\>\>

#### Inherited from

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[submitSpendPredicate](internal-BaseWalletUnlocked.md#submitspendpredicate)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:83

___

### transfer

▸ **transfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

Returns coins satisfying the spend query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination` | [`AbstractAddress`](internal-AbstractAddress.md) | Address of the destination |
| `amount` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | Amount of coins |
| `assetId?` | `BytesLike` | Asset ID of coins |
| `txParams?` | `Pick`<[`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike), ``"gasPrice"`` \| ``"gasLimit"`` \| ``"maturity"``\> | Tx Params |

#### Returns

`Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

#### Inherited from

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[transfer](internal-BaseWalletUnlocked.md#transfer)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:48

___

### withdrawToBaseLayer

▸ **withdrawToBaseLayer**(`recipient`, `amount`, `txParams?`): `Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

Withdraws an amount of the base asset to the base chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recipient` | [`AbstractAddress`](internal-AbstractAddress.md) | Address of the recipient on the base chain |
| `amount` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | Amount of base asset |
| `txParams?` | `Pick`<[`TransactionRequestLike`](../namespaces/internal.md#transactionrequestlike), ``"gasPrice"`` \| ``"gasLimit"`` \| ``"maturity"``\> | Tx Params |

#### Returns

`Promise`<[`TransactionResponse`](internal-TransactionResponse.md)\>

#### Inherited from

[BaseWalletUnlocked](internal-BaseWalletUnlocked.md).[withdrawToBaseLayer](internal-BaseWalletUnlocked.md#withdrawtobaselayer)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:60

___

### fromExtendedKey

▸ `Static` **fromExtendedKey**(`extendedKey`, `provider?`): [`WalletUnlocked`](internal-WalletUnlocked.md)

Create Wallet Unlocked from extended key

#### Parameters

| Name | Type |
| :------ | :------ |
| `extendedKey` | `string` |
| `provider?` | `default` |

#### Returns

[`WalletUnlocked`](internal-WalletUnlocked.md)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:162

___

### fromMnemonic

▸ `Static` **fromMnemonic**(`mnemonic`, `path?`, `passphrase?`, `provider?`): [`WalletUnlocked`](internal-WalletUnlocked.md)

Create Wallet Unlocked from mnemonic phrase

#### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `path?` | `string` |
| `passphrase?` | `BytesLike` |
| `provider?` | `default` |

#### Returns

[`WalletUnlocked`](internal-WalletUnlocked.md)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:158

___

### fromSeed

▸ `Static` **fromSeed**(`seed`, `path?`, `provider?`): [`WalletUnlocked`](internal-WalletUnlocked.md)

Create Wallet Unlocked from a seed

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `string` |
| `path?` | `string` |
| `provider?` | `default` |

#### Returns

[`WalletUnlocked`](internal-WalletUnlocked.md)

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:154

___

### generate

▸ `Static` **generate**(`generateOptions?`): [`WalletUnlocked`](internal-WalletUnlocked.md)

Generate a new Wallet Unlocked with a random keyPair

#### Parameters

| Name | Type |
| :------ | :------ |
| `generateOptions?` | [`GenerateOptions`](../interfaces/internal-GenerateOptions.md) |

#### Returns

[`WalletUnlocked`](internal-WalletUnlocked.md)

wallet - Wallet instance

#### Defined in

packages/wallet/dist/wallets-69de291a.d.ts:150
