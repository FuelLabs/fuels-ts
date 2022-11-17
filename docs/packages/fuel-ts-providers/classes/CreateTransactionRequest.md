---
layout: default
title: CreateTransactionRequest
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: CreateTransactionRequest

[@fuel-ts/providers](../index.md).CreateTransactionRequest

## Hierarchy

- [`BaseTransactionRequest`](internal-BaseTransactionRequest.md)

  ↳ **`CreateTransactionRequest`**

## Constructors

### constructor

• **new CreateTransactionRequest**(`__namedParameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`CreateTransactionRequestLike`](../interfaces/CreateTransactionRequestLike.md) |

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[constructor](internal-BaseTransactionRequest.md#constructor)

## Properties

### bytecodeWitnessIndex

• **bytecodeWitnessIndex**: `number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:484](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L484)

___

### gasLimit

• **gasLimit**: [`BN`](internal-BN.md)

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[gasLimit](internal-BaseTransactionRequest.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:104](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L104)

___

### gasPrice

• **gasPrice**: [`BN`](internal-BN.md)

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[gasPrice](internal-BaseTransactionRequest.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:102](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L102)

___

### inputs

• **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[] = `[]`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[inputs](internal-BaseTransactionRequest.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:108](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L108)

___

### maturity

• **maturity**: `number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[maturity](internal-BaseTransactionRequest.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:106](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L106)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[] = `[]`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[outputs](internal-BaseTransactionRequest.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:110](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L110)

___

### salt

• **salt**: `string`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:486](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L486)

___

### storageSlots

• **storageSlots**: [`TransactionRequestStorageSlot`](../namespaces/internal.md#transactionrequeststorageslot)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:488](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L488)

___

### type

• **type**: [`Create`](../enums/TransactionType.md#create)

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[type](internal-BaseTransactionRequest.md#type)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:482](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L482)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[witnesses](internal-BaseTransactionRequest.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:112](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L112)

## Methods

### addCoin

▸ **addCoin**(`coin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coin` | [`Coin`](../index.md#coin) |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addCoin](internal-BaseTransactionRequest.md#addcoin)

___

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](../namespaces/internal.md#addresslike) | `undefined` |
| `amount` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` |
| `assetId` | `BytesLike` | `NativeAssetId` |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addCoinOutput](internal-BaseTransactionRequest.md#addcoinoutput)

___

### addCoinOutputs

▸ **addCoinOutputs**(`to`, `quantities`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `to` | [`AddressLike`](../namespaces/internal.md#addresslike) |
| `quantities` | [`CoinQuantityLike`](../index.md#coinquantitylike)[] |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addCoinOutputs](internal-BaseTransactionRequest.md#addcoinoutputs)

___

### addCoins

▸ **addCoins**(`coins`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coins` | readonly [`Coin`](../index.md#coin)[] |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addCoins](internal-BaseTransactionRequest.md#addcoins)

___

### addContractCreatedOutput

▸ **addContractCreatedOutput**(`contractId`, `stateRoot`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractId` | `BytesLike` |
| `stateRoot` | `BytesLike` |

#### Returns

`void`

___

### addMessage

▸ **addMessage**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`Message`](../index.md#message) |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addMessage](internal-BaseTransactionRequest.md#addmessage)

___

### addMessages

▸ **addMessages**(`messages`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messages` | readonly [`Message`](../index.md#message)[] |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addMessages](internal-BaseTransactionRequest.md#addmessages)

___

### byteSize

▸ **byteSize**(): `number`

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[byteSize](internal-BaseTransactionRequest.md#bytesize)

___

### calculateFee

▸ **calculateFee**(): [`CoinQuantity`](../index.md#coinquantity)

#### Returns

[`CoinQuantity`](../index.md#coinquantity)

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[calculateFee](internal-BaseTransactionRequest.md#calculatefee)

___

### chargeableByteSize

▸ **chargeableByteSize**(): [`BN`](internal-BN.md)

#### Returns

[`BN`](internal-BN.md)

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[chargeableByteSize](internal-BaseTransactionRequest.md#chargeablebytesize)

___

### createWitness

▸ `Protected` **createWitness**(): `number`

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[createWitness](internal-BaseTransactionRequest.md#createwitness)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`<[`Transaction`](../namespaces/internal.md#transaction), keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md) \| ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"``\>

#### Returns

`Pick`<[`Transaction`](../namespaces/internal.md#transaction), keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md) \| ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"``\>

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getBaseTransaction](internal-BaseTransactionRequest.md#getbasetransaction)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

#### Returns

[`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getChangeOutputs](internal-BaseTransactionRequest.md#getchangeoutputs)

___

### getCoinInputWitnessIndexByOwner

▸ **getCoinInputWitnessIndexByOwner**(`owner`): ``null`` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | [`AddressLike`](../namespaces/internal.md#addresslike) |

#### Returns

``null`` \| `number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinInputWitnessIndexByOwner](internal-BaseTransactionRequest.md#getcoininputwitnessindexbyowner)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

#### Returns

[`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinInputs](internal-BaseTransactionRequest.md#getcoininputs)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

#### Returns

[`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinOutputs](internal-BaseTransactionRequest.md#getcoinoutputs)

___

### getContractCreatedOutputs

▸ **getContractCreatedOutputs**(): [`ContractCreatedTransactionRequestOutput`](../index.md#contractcreatedtransactionrequestoutput)[]

#### Returns

[`ContractCreatedTransactionRequestOutput`](../index.md#contractcreatedtransactionrequestoutput)[]

___

### pushInput

▸ `Protected` **pushInput**(`input`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TransactionRequestInput`](../index.md#transactionrequestinput) |

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[pushInput](internal-BaseTransactionRequest.md#pushinput)

___

### pushOutput

▸ `Protected` **pushOutput**(`output`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `output` | [`TransactionRequestOutput`](../index.md#transactionrequestoutput) |

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[pushOutput](internal-BaseTransactionRequest.md#pushoutput)

___

### toTransaction

▸ **toTransaction**(): [`Transaction`](../namespaces/internal.md#transaction)

#### Returns

[`Transaction`](../namespaces/internal.md#transaction)

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toTransaction](internal-BaseTransactionRequest.md#totransaction)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toTransactionBytes](internal-BaseTransactionRequest.md#totransactionbytes)

___

### updateWitness

▸ **updateWitness**(`index`, `witness`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `witness` | `BytesLike` |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[updateWitness](internal-BaseTransactionRequest.md#updatewitness)

___

### updateWitnessByCoinInputOwner

▸ **updateWitnessByCoinInputOwner**(`owner`, `witness`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | [`AddressLike`](../namespaces/internal.md#addresslike) |
| `witness` | `BytesLike` |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[updateWitnessByCoinInputOwner](internal-BaseTransactionRequest.md#updatewitnessbycoininputowner)

___

### from

▸ `Static` **from**(`obj`): [`CreateTransactionRequest`](CreateTransactionRequest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`CreateTransactionRequestLike`](../interfaces/CreateTransactionRequestLike.md) |

#### Returns

[`CreateTransactionRequest`](CreateTransactionRequest.md)
