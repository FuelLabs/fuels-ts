---
layout: default
title: BaseTransactionRequest
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: BaseTransactionRequest

[@fuel-ts/wallet](../index.md).[internal](../namespaces/internal.md).BaseTransactionRequest

## Hierarchy

- **`BaseTransactionRequest`**

  ↳ [`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)

  ↳ [`CreateTransactionRequest`](internal-CreateTransactionRequest.md)

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

[packages/providers/src/transaction-request/transaction-request.ts:123](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L123)

## Properties

### bytePrice

• **bytePrice**: `string`

Price per transaction byte

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[bytePrice](../interfaces/internal-BaseTransactionRequestLike.md#byteprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:113](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L113)

___

### gasLimit

• **gasLimit**: `string`

Gas limit for transaction

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[gasLimit](../interfaces/internal-BaseTransactionRequestLike.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:111](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L111)

___

### gasPrice

• **gasPrice**: `string`

Gas price for transaction

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[gasPrice](../interfaces/internal-BaseTransactionRequestLike.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:109](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L109)

___

### inputs

• **inputs**: [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[inputs](../interfaces/internal-BaseTransactionRequestLike.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:117](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L117)

___

### maturity

• **maturity**: `string`

Block until which tx cannot be included

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[maturity](../interfaces/internal-BaseTransactionRequestLike.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:115](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L115)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[outputs](../interfaces/internal-BaseTransactionRequestLike.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:119](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L119)

___

### type

• `Abstract` **type**: [`TransactionType`](../enums/internal-TransactionType.md)

Type of the transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:107](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L107)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[witnesses](../interfaces/internal-BaseTransactionRequestLike.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:121](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L121)

## Methods

### addCoin

▸ **addCoin**(`coin`): `void`

Converts the given Coin to a CoinInput with the appropriate witnessIndex and pushes it

#### Parameters

| Name | Type |
| :------ | :------ |
| `coin` | [`Coin`](../namespaces/internal.md#coin-2) |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:249](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L249)

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

[packages/providers/src/transaction-request/transaction-request.ts:288](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L288)

___

### addCoinOutputs

▸ **addCoinOutputs**(`to`, `quantities`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](../namespaces/internal.md#addresslike) | Address of the destination |
| `quantities` | [`CoinQuantityLike`](../namespaces/internal.md#coinquantitylike)[] | Quantities of coins |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:304](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L304)

___

### addCoins

▸ **addCoins**(`coins`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coins` | readonly [`Coin`](../namespaces/internal.md#coin-2)[] |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:284](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L284)

___

### byteSize

▸ **byteSize**(): `number`

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:320](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L320)

___

### calculateFee

▸ **calculateFee**(): [`CoinQuantity`](../namespaces/internal.md#coinquantity)

Return the minimum amount in native coins required to create
a transaction.

Note: this is required even if the gasPrice and bytePrice
are set to zero.

#### Returns

[`CoinQuantity`](../namespaces/internal.md#coinquantity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:336](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L336)

___

### chargeableByteSize

▸ **chargeableByteSize**(): `string`

#### Returns

`string`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:324](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L324)

___

### createWitness

▸ `Protected` **createWitness**(): `number`

Creates an empty witness without any side effects and returns the index

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:187](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L187)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`<[`Transaction`](../namespaces/internal.md#transaction), keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md) \| ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"``\>

#### Returns

`Pick`<[`Transaction`](../namespaces/internal.md#transaction), keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md) \| ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"``\>

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:141](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L141)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../namespaces/internal.md#changetransactionrequestoutput)[]

#### Returns

[`ChangeTransactionRequestOutput`](../namespaces/internal.md#changetransactionrequestoutput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:214](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L214)

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

[packages/providers/src/transaction-request/transaction-request.ts:223](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L223)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](../namespaces/internal.md#cointransactionrequestinput)[]

#### Returns

[`CoinTransactionRequestInput`](../namespaces/internal.md#cointransactionrequestinput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:202](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L202)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../namespaces/internal.md#cointransactionrequestoutput)[]

#### Returns

[`CoinTransactionRequestOutput`](../namespaces/internal.md#cointransactionrequestoutput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:208](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L208)

___

### pushInput

▸ `Protected` **pushInput**(`input`): `number`

Pushes an input to the list without any side effects and returns the index

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput) |

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:171](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L171)

___

### pushOutput

▸ `Protected` **pushOutput**(`output`): `number`

Pushes an output to the list without any side effects and returns the index

#### Parameters

| Name | Type |
| :------ | :------ |
| `output` | [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput) |

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:179](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L179)

___

### toTransaction

▸ `Abstract` **toTransaction**(): [`Transaction`](../namespaces/internal.md#transaction)

#### Returns

[`Transaction`](../namespaces/internal.md#transaction)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:162](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L162)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:164](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L164)

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

[packages/providers/src/transaction-request/transaction-request.ts:195](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L195)

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

[packages/providers/src/transaction-request/transaction-request.ts:236](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L236)
