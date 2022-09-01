---
layout: default
title: BaseTransactionRequest
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: BaseTransactionRequest

[@fuel-ts/providers](../index.md).[internal](../namespaces/internal.md).BaseTransactionRequest

## Hierarchy

- **`BaseTransactionRequest`**

  ↳ [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

  ↳ [`CreateTransactionRequest`](CreateTransactionRequest.md)

## Implements

- [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md)

## Constructors

### constructor

• **new BaseTransactionRequest**(`__namedParameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md) |

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:122](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L122)

## Properties

### bytePrice

• **bytePrice**: `bigint`

Price per transaction byte

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[bytePrice](../interfaces/internal-BaseTransactionRequestLike.md#byteprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:112](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L112)

___

### gasLimit

• **gasLimit**: `bigint`

Gas limit for transaction

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[gasLimit](../interfaces/internal-BaseTransactionRequestLike.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:110](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L110)

___

### gasPrice

• **gasPrice**: `bigint`

Gas price for transaction

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[gasPrice](../interfaces/internal-BaseTransactionRequestLike.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:108](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L108)

___

### inputs

• **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[inputs](../interfaces/internal-BaseTransactionRequestLike.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:116](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L116)

___

### maturity

• **maturity**: `bigint`

Block until which tx cannot be included

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[maturity](../interfaces/internal-BaseTransactionRequestLike.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:114](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L114)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[outputs](../interfaces/internal-BaseTransactionRequestLike.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:118](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L118)

___

### type

• `Abstract` **type**: [`TransactionType`](../enums/TransactionType.md)

Type of the transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:106](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L106)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[witnesses](../interfaces/internal-BaseTransactionRequestLike.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:120](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L120)

## Methods

### addCoin

▸ **addCoin**(`coin`): `void`

Converts the given Coin to a CoinInput with the appropriate witnessIndex and pushes it

#### Parameters

| Name | Type |
| :------ | :------ |
| `coin` | [`Coin`](../index.md#coin) |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:248](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L248)

___

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId?`): `void`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `to` | [`AddressLike`](../namespaces/internal.md#addresslike) | `undefined` | Address of the destination |
| `amount` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` | Amount of coins |
| `assetId` | `BytesLike` | `NativeAssetId` | Asset ID of coins |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:287](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L287)

___

### addCoinOutputs

▸ **addCoinOutputs**(`to`, `quantities`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](../namespaces/internal.md#addresslike) | Address of the destination |
| `quantities` | [`CoinQuantityLike`](../index.md#coinquantitylike)[] | Quantities of coins |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:303](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L303)

___

### addCoins

▸ **addCoins**(`coins`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coins` | readonly [`Coin`](../index.md#coin)[] |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:283](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L283)

___

### byteSize

▸ **byteSize**(): `number`

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:319](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L319)

___

### calculateFee

▸ **calculateFee**(): [`CoinQuantity`](../index.md#coinquantity)

Return the minimum amount in native coins required to create
a transaction.

Note: this is required even if the gasPrice and bytePrice
are set to zero.

#### Returns

[`CoinQuantity`](../index.md#coinquantity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:335](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L335)

___

### chargeableByteSize

▸ **chargeableByteSize**(): `bigint`

#### Returns

`bigint`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:323](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L323)

___

### createWitness

▸ `Protected` **createWitness**(): `number`

Creates an empty witness without any side effects and returns the index

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:186](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L186)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`<[`Transaction`](../namespaces/internal.md#transaction), keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md) \| ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"``\>

#### Returns

`Pick`<[`Transaction`](../namespaces/internal.md#transaction), keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md) \| ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"``\>

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:140](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L140)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

#### Returns

[`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:213](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L213)

___

### getCoinInputWitnessIndexByOwner

▸ **getCoinInputWitnessIndexByOwner**(`owner`): ``null`` \| `number`

Returns the witnessIndex of the found CoinInput

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | [`AddressLike`](../namespaces/internal.md#addresslike) |

#### Returns

``null`` \| `number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:222](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L222)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

#### Returns

[`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:201](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L201)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

#### Returns

[`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:207](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L207)

___

### pushInput

▸ `Protected` **pushInput**(`input`): `number`

Pushes an input to the list without any side effects and returns the index

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TransactionRequestInput`](../index.md#transactionrequestinput) |

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:170](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L170)

___

### pushOutput

▸ `Protected` **pushOutput**(`output`): `number`

Pushes an output to the list without any side effects and returns the index

#### Parameters

| Name | Type |
| :------ | :------ |
| `output` | [`TransactionRequestOutput`](../index.md#transactionrequestoutput) |

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:178](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L178)

___

### toTransaction

▸ `Abstract` **toTransaction**(): [`Transaction`](../namespaces/internal.md#transaction)

#### Returns

[`Transaction`](../namespaces/internal.md#transaction)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:161](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L161)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:163](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L163)

___

### updateWitness

▸ **updateWitness**(`index`, `witness`): `void`

Updates an existing witness without any side effects

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `witness` | `BytesLike` |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:194](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L194)

___

### updateWitnessByCoinInputOwner

▸ **updateWitnessByCoinInputOwner**(`owner`, `witness`): `void`

Updates the witness for the given CoinInput owner

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | [`AddressLike`](../namespaces/internal.md#addresslike) |
| `witness` | `BytesLike` |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:235](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L235)
