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

[wallet/src/wallet.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L18)

## Properties

### provider

• `Readonly` **provider**: `default`

#### Defined in

[wallet/src/wallet.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L14)

___

### signer

• `Readonly` **signer**: () => [`Signer`](../../fuel-ts-signer/classes/Signer.md)

#### Type declaration

▸ (): [`Signer`](../../fuel-ts-signer/classes/Signer.md)

##### Returns

[`Signer`](../../fuel-ts-signer/classes/Signer.md)

#### Defined in

[wallet/src/wallet.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L16)

## Accessors

### address

• `get` **address**(): `string`

#### Returns

`string`

#### Defined in

[wallet/src/wallet.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L30)

___

### privateKey

• `get` **privateKey**(): `string`

#### Returns

`string`

#### Defined in

[wallet/src/wallet.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L34)

___

### publicKey

• `get` **publicKey**(): `string`

#### Returns

`string`

#### Defined in

[wallet/src/wallet.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L38)

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

[wallet/src/wallet.ts:65](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L65)

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

[wallet/src/wallet.ts:88](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L88)

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

[wallet/src/wallet.ts:48](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L48)

___

### signTransaction

▸ **signTransaction**(`transactionRequest`): `string`

Sign transaction with wallet instance privateKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](../../fuel-ts-providers/index.md#transactionrequest) | TransactionRequest |

#### Returns

`string`

string - Signature a ECDSA 64 bytes

#### Defined in

[wallet/src/wallet.ts:58](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L58)

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

[wallet/src/wallet.ts:100](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/wallet.ts#L100)
