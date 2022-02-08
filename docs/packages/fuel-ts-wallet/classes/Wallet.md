---
layout: default
title: Wallet
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: Wallet

[@fuel-ts/wallet](../index.md).Wallet

## Constructors

### constructor

• **new Wallet**(`privateKey`, `provider?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `privateKey` | `BytesLike` | `undefined` |
| `provider` | `string` \| `default` | `FUEL_NETWORK_URL` |

#### Defined in

[wallet/src/wallet.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L17)

## Properties

### provider

• `Readonly` **provider**: `default`

#### Defined in

[wallet/src/wallet.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L13)

___

### signer

• `Readonly` **signer**: () => [`Signer`](Signer.md)

#### Type declaration

▸ (): [`Signer`](Signer.md)

##### Returns

[`Signer`](Signer.md)

#### Defined in

[wallet/src/wallet.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L15)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Defined in

[wallet/src/wallet.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L29)

___

### privateKey

• `get` **privateKey**(): `string`

#### Returns

`string`

#### Defined in

[wallet/src/wallet.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L33)

___

### publicKey

• `get` **publicKey**(): `string`

#### Returns

`string`

#### Defined in

[wallet/src/wallet.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L37)

## Methods

### populateTransactionWitnessesSignature

▸ **populateTransactionWitnessesSignature**(`transactionRequest`): [`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest) |

#### Returns

[`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest)

#### Defined in

[wallet/src/wallet.ts:64](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L64)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequest`): `Promise`<[`TransactionResponse`](../../fuel-ts-providers/index.md#transactionresponse)\>

Populates witnesses signature and send it to the network using `provider.sendTransaction`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest) | TransactionRequest |

#### Returns

`Promise`<[`TransactionResponse`](../../fuel-ts-providers/index.md#transactionresponse)\>

TransactionResponse

#### Defined in

[wallet/src/wallet.ts:87](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L87)

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

[wallet/src/wallet.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L47)

___

### signTransaction

▸ **signTransaction**(`transactionRequest`): `string`

Sign transaction with wallet instance privateKey
-   *
-   * @param transactionRequest - TransactionRequest
-   * @returns string - Signature a ECDSA 64 bytes

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest) |

#### Returns

`string`

#### Defined in

[wallet/src/wallet.ts:57](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L57)
