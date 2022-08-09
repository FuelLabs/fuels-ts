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

[packages/providers/src/transaction-request/transaction-request.ts:104](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L104)

## Properties

### bytePrice

• **bytePrice**: `bigint`

Price per transaction byte

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[bytePrice](../interfaces/internal-BaseTransactionRequestLike.md#byteprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:94](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L94)

___

### gasLimit

• **gasLimit**: `bigint`

Gas limit for transaction

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[gasLimit](../interfaces/internal-BaseTransactionRequestLike.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:92](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L92)

___

### gasPrice

• **gasPrice**: `bigint`

Gas price for transaction

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[gasPrice](../interfaces/internal-BaseTransactionRequestLike.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:90](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L90)

___

### inputs

• **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[inputs](../interfaces/internal-BaseTransactionRequestLike.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:98](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L98)

___

### maturity

• **maturity**: `bigint`

Block until which tx cannot be included

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[maturity](../interfaces/internal-BaseTransactionRequestLike.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:96](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L96)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[outputs](../interfaces/internal-BaseTransactionRequestLike.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:100](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L100)

___

### type

• `Abstract` **type**: `TransactionType`

Type of the transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:88](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L88)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[witnesses](../interfaces/internal-BaseTransactionRequestLike.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:102](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L102)

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

[packages/providers/src/transaction-request/transaction-request.ts:230](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L230)

___

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](../../fuel-ts-interfaces/index.md#addresslike) | `undefined` |
| `amount` | `BigNumberish` | `undefined` |
| `assetId` | `BytesLike` | `NativeAssetId` |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:269](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L269)

___

### addCoinOutputs

▸ **addCoinOutputs**(`to`, `quantities`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `to` | [`AddressLike`](../../fuel-ts-interfaces/index.md#addresslike) |
| `quantities` | [`CoinQuantityLike`](../index.md#coinquantitylike)[] |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:285](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L285)

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

[packages/providers/src/transaction-request/transaction-request.ts:265](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L265)

___

### calculateFee

▸ **calculateFee**(): `bigint`

#### Returns

`bigint`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:301](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L301)

___

### createWitness

▸ `Protected` **createWitness**(): `number`

Creates an empty witness without any side effects and returns the index

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:168](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L168)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`<`Transaction`, keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md) \| ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"``\>

#### Returns

`Pick`<`Transaction`, keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md) \| ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"``\>

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:122](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L122)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

#### Returns

[`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:195](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L195)

___

### getCoinInputWitnessIndexByOwner

▸ **getCoinInputWitnessIndexByOwner**(`owner`): ``null`` \| `number`

Returns the witnessIndex of the found CoinInput

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | [`AddressLike`](../../fuel-ts-interfaces/index.md#addresslike) |

#### Returns

``null`` \| `number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:204](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L204)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

#### Returns

[`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:183](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L183)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

#### Returns

[`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:189](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L189)

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

[packages/providers/src/transaction-request/transaction-request.ts:152](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L152)

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

[packages/providers/src/transaction-request/transaction-request.ts:160](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L160)

___

### toTransaction

▸ `Abstract` **toTransaction**(): `Transaction`

#### Returns

`Transaction`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:143](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L143)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:145](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L145)

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

[packages/providers/src/transaction-request/transaction-request.ts:176](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L176)

___

### updateWitnessByCoinInputOwner

▸ **updateWitnessByCoinInputOwner**(`owner`, `witness`): `void`

Updates the witness for the given CoinInput owner

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | [`AddressLike`](../../fuel-ts-interfaces/index.md#addresslike) |
| `witness` | `BytesLike` |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:217](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L217)
