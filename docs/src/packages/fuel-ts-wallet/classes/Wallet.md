---
layout: default
title: Wallet
parent: "@fuel-ts/wallet"
nav_order: 1
---

# Class: Wallet

[@fuel-ts/wallet](../index.md).Wallet

## Hierarchy

- [`AbstractWallet`](../../fuel-ts-interfaces/classes/AbstractWallet.md)

  ↳ **`Wallet`**

## Constructors

### constructor

• **new Wallet**(`privateKey`, `provider?`)

#### Parameters

| Name         | Type                                                                  | Default value      |
| :----------- | :-------------------------------------------------------------------- | :----------------- |
| `privateKey` | `BytesLike`                                                           | `undefined`        |
| `provider`   | `string` \| [`Provider`](../../fuel-ts-providers/classes/Provider.md) | `FUEL_NETWORK_URL` |

#### Overrides

[AbstractWallet](../../fuel-ts-interfaces/classes/AbstractWallet.md).[constructor](../../fuel-ts-interfaces/classes/AbstractWallet.md#constructor)

#### Defined in

[packages/wallet/src/wallet.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L32)

## Properties

### provider

• **provider**: [`Provider`](../../fuel-ts-providers/classes/Provider.md)

#### Defined in

[packages/wallet/src/wallet.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L28)

---

### signer

• `Readonly` **signer**: () => [`Signer`](../../fuel-ts-signer/classes/Signer.md)

#### Type declaration

▸ (): [`Signer`](../../fuel-ts-signer/classes/Signer.md)

##### Returns

[`Signer`](../../fuel-ts-signer/classes/Signer.md)

#### Defined in

[packages/wallet/src/wallet.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L30)

---

### defaultPath

▪ `Static` **defaultPath**: `string` = `"m/44'/1179993420'/0'/0/0"`

#### Defined in

[packages/wallet/src/wallet.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L26)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Overrides

AbstractWallet.address

#### Defined in

[packages/wallet/src/wallet.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L40)

---

### privateKey

• `get` **privateKey**(): `string`

#### Returns

`string`

#### Defined in

[packages/wallet/src/wallet.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L44)

---

### publicKey

• `get` **publicKey**(): `string`

#### Returns

`string`

#### Defined in

[packages/wallet/src/wallet.ts:48](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L48)

## Methods

### connect

▸ **connect**(`provider`): [`Provider`](../../fuel-ts-providers/classes/Provider.md)

Change provider connection

#### Parameters

| Name       | Type                                                                  |
| :--------- | :-------------------------------------------------------------------- |
| `provider` | `string` \| [`Provider`](../../fuel-ts-providers/classes/Provider.md) |

#### Returns

[`Provider`](../../fuel-ts-providers/classes/Provider.md)

#### Defined in

[packages/wallet/src/wallet.ts:55](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L55)

---

### fund

▸ **fund**<`T`\>(`request`): `Promise`<`void`\>

Adds coins to the transaction enough to fund it.

#### Type parameters

| Name | Type                                                                                |
| :--- | :---------------------------------------------------------------------------------- |
| `T`  | extends [`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest) |

#### Parameters

| Name      | Type |
| :-------- | :--- |
| `request` | `T`  |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet/src/wallet.ts:178](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L178)

---

### getBalance

▸ **getBalance**(`assetId?`): `Promise`<`bigint`\>

Gets balance for the given asset.

#### Parameters

| Name      | Type        | Default value   |
| :-------- | :---------- | :-------------- |
| `assetId` | `BytesLike` | `NativeAssetId` |

#### Returns

`Promise`<`bigint`\>

#### Defined in

[packages/wallet/src/wallet.ts:141](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L141)

---

### getBalances

▸ **getBalances**(): `Promise`<[`CoinQuantity`](../../fuel-ts-providers/index.md#coinquantity)[]\>

Gets balances.

#### Returns

`Promise`<[`CoinQuantity`](../../fuel-ts-providers/index.md#coinquantity)[]\>

#### Defined in

[packages/wallet/src/wallet.ts:149](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L149)

---

### getCoins

▸ **getCoins**(): `Promise`<[`Coin`](../../fuel-ts-providers/index.md#coin)[]\>

Gets coins owned by the wallet address.

#### Returns

`Promise`<[`Coin`](../../fuel-ts-providers/index.md#coin)[]\>

#### Defined in

[packages/wallet/src/wallet.ts:112](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L112)

---

### getCoinsToSpend

▸ **getCoinsToSpend**(`quantities`): `Promise`<[`Coin`](../../fuel-ts-providers/index.md#coin)[]\>

Returns coins satisfying the spend query.

#### Parameters

| Name         | Type                                                                      |
| :----------- | :------------------------------------------------------------------------ |
| `quantities` | [`CoinQuantityLike`](../../fuel-ts-providers/index.md#coinquantitylike)[] |

#### Returns

`Promise`<[`Coin`](../../fuel-ts-providers/index.md#coin)[]\>

#### Defined in

[packages/wallet/src/wallet.ts:105](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L105)

---

### populateTransactionWitnessesSignature

▸ **populateTransactionWitnessesSignature**(`transactionRequestLike`): [`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest)

#### Parameters

| Name                     | Type                                                                                |
| :----------------------- | :---------------------------------------------------------------------------------- |
| `transactionRequestLike` | [`TransactionRequestLike`](../../fuel-ts-providers/index.md#transactionrequestlike) |

#### Returns

[`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest)

#### Defined in

[packages/wallet/src/wallet.ts:90](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L90)

---

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`): `Promise`<[`TransactionResponse`](../../fuel-ts-providers/classes/TransactionResponse.md)\>

Populates witnesses signature and send it to the network using `provider.sendTransaction`.

#### Parameters

| Name                     | Type                                                                                |
| :----------------------- | :---------------------------------------------------------------------------------- |
| `transactionRequestLike` | [`TransactionRequestLike`](../../fuel-ts-providers/index.md#transactionrequestlike) |

#### Returns

`Promise`<[`TransactionResponse`](../../fuel-ts-providers/classes/TransactionResponse.md)\>

TransactionResponse

#### Defined in

[packages/wallet/src/wallet.ts:217](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L217)

---

### signMessage

▸ **signMessage**(`message`): `string`

Sign message with wallet instance privateKey

#### Parameters

| Name      | Type     | Description |
| :-------- | :------- | :---------- |
| `message` | `string` | Message     |

#### Returns

`string`

string - Signature a ECDSA 64 bytes

#### Defined in

[packages/wallet/src/wallet.ts:72](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L72)

---

### signTransaction

▸ **signTransaction**(`transactionRequestLike`): `string`

Sign transaction with wallet instance privateKey

#### Parameters

| Name                     | Type                                                                                | Description            |
| :----------------------- | :---------------------------------------------------------------------------------- | :--------------------- |
| `transactionRequestLike` | [`TransactionRequestLike`](../../fuel-ts-providers/index.md#transactionrequestlike) | TransactionRequestLike |

#### Returns

`string`

string - Signature a ECDSA 64 bytes

#### Defined in

[packages/wallet/src/wallet.ts:82](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L82)

---

### transfer

▸ **transfer**(`destination`, `amount`, `assetId?`, `txParams?`): `Promise`<[`TransactionResponse`](../../fuel-ts-providers/classes/TransactionResponse.md)\>

Returns coins satisfying the spend query.

#### Parameters

| Name          | Type                                                                                                                                                        | Default value   |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| `destination` | `BytesLike`                                                                                                                                                 | `undefined`     |
| `amount`      | `BigNumberish`                                                                                                                                              | `undefined`     |
| `assetId`     | `BytesLike`                                                                                                                                                 | `NativeAssetId` |
| `txParams`    | `Pick`<[`TransactionRequestLike`](../../fuel-ts-providers/index.md#transactionrequestlike), `"gasLimit"` \| `"gasPrice"` \| `"bytePrice"` \| `"maturity"`\> | `{}`            |

#### Returns

`Promise`<[`TransactionResponse`](../../fuel-ts-providers/classes/TransactionResponse.md)\>

#### Defined in

[packages/wallet/src/wallet.ts:188](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L188)

---

### fromExtendedKey

▸ `Static` **fromExtendedKey**(`extendedKey`): [`Wallet`](Wallet.md)

Create wallet from extended key

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `extendedKey` | `string` |

#### Returns

[`Wallet`](Wallet.md)

#### Defined in

[packages/wallet/src/wallet.ts:263](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L263)

---

### fromMnemonic

▸ `Static` **fromMnemonic**(`mnemonic`, `path?`, `passphrase?`): [`Wallet`](Wallet.md)

Create wallet from mnemonic phrase

#### Parameters

| Name          | Type        |
| :------------ | :---------- |
| `mnemonic`    | `string`    |
| `path?`       | `string`    |
| `passphrase?` | `BytesLike` |

#### Returns

[`Wallet`](Wallet.md)

#### Defined in

[packages/wallet/src/wallet.ts:252](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L252)

---

### fromSeed

▸ `Static` **fromSeed**(`seed`, `path?`): [`Wallet`](Wallet.md)

Create wallet from a seed

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `seed`  | `string` |
| `path?` | `string` |

#### Returns

[`Wallet`](Wallet.md)

#### Defined in

[packages/wallet/src/wallet.ts:242](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L242)

---

### generate

▸ `Static` **generate**(`generateOptions?`): [`Wallet`](Wallet.md)

Generate a new Wallet with a random keyPair

#### Parameters

| Name               | Type                                                           |
| :----------------- | :------------------------------------------------------------- |
| `generateOptions?` | [`GenerateOptions`](../interfaces/internal-GenerateOptions.md) |

#### Returns

[`Wallet`](Wallet.md)

wallet - Wallet instance

#### Defined in

[packages/wallet/src/wallet.ts:233](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L233)
