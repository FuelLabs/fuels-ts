---
layout: default
title: ScriptTransactionRequest
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: ScriptTransactionRequest

[@fuel-ts/providers](../index.md).ScriptTransactionRequest

## Hierarchy

- [`BaseTransactionRequest`](internal-BaseTransactionRequest.md)

  ↳ **`ScriptTransactionRequest`**

## Constructors

### constructor

• **new ScriptTransactionRequest**(`__namedParameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ScriptTransactionRequestLike`](../interfaces/ScriptTransactionRequestLike.md) |

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[constructor](internal-BaseTransactionRequest.md#constructor)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:322](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L322)

## Properties

### bytePrice

• **bytePrice**: `BigNumber`

Price per transaction byte

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[bytePrice](internal-BaseTransactionRequest.md#byteprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:85](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L85)

___

### gasLimit

• **gasLimit**: `BigNumber`

Gas limit for transaction

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[gasLimit](internal-BaseTransactionRequest.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:83](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L83)

___

### gasPrice

• **gasPrice**: `BigNumber`

Gas price for transaction

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[gasPrice](internal-BaseTransactionRequest.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:81](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L81)

___

### inputs

• **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[inputs](internal-BaseTransactionRequest.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:89](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L89)

___

### maturity

• **maturity**: `BigNumber`

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[maturity](internal-BaseTransactionRequest.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:87](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L87)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[outputs](internal-BaseTransactionRequest.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:91](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L91)

___

### script

• **script**: `Uint8Array`

Script to execute

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:318](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L318)

___

### scriptData

• **scriptData**: `Uint8Array`

Script input data (parameters)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:320](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L320)

___

### type

• **type**: [`Script`](Script.md)

Type of the transaction

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[type](internal-BaseTransactionRequest.md#type)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:316](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L316)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[witnesses](internal-BaseTransactionRequest.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:93](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L93)

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addCoin](internal-BaseTransactionRequest.md#addcoin)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:221](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L221)

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addCoinOutput](internal-BaseTransactionRequest.md#addcoinoutput)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:260](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L260)

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addCoinOutputs](internal-BaseTransactionRequest.md#addcoinoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:276](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L276)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:256](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L256)

___

### addContract

▸ **addContract**(`contract`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`ContractIdLike`](../../fuel-ts-interfaces/index.md#contractidlike) |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:378](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L378)

___

### addVariableOutputs

▸ **addVariableOutputs**(`numberOfVariables?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `numberOfVariables` | `number` | `1` |

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:365](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L365)

___

### calculateFee

▸ **calculateFee**(): `BigNumber`

#### Returns

`BigNumber`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[calculateFee](internal-BaseTransactionRequest.md#calculatefee)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:292](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L292)

___

### createWitness

▸ `Protected` **createWitness**(): `number`

Creates an empty witness without any side effects and returns the index

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[createWitness](internal-BaseTransactionRequest.md#createwitness)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:159](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L159)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`<`Transaction`, keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md) \| ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"``\>

#### Returns

`Pick`<`Transaction`, keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md) \| ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"``\>

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getBaseTransaction](internal-BaseTransactionRequest.md#getbasetransaction)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:113](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L113)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

#### Returns

[`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getChangeOutputs](internal-BaseTransactionRequest.md#getchangeoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:186](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L186)

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinInputWitnessIndexByOwner](internal-BaseTransactionRequest.md#getcoininputwitnessindexbyowner)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:195](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L195)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

#### Returns

[`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinInputs](internal-BaseTransactionRequest.md#getcoininputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:174](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L174)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

#### Returns

[`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinOutputs](internal-BaseTransactionRequest.md#getcoinoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:180](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L180)

___

### getContractInputs

▸ **getContractInputs**(): [`ContractTransactionRequestInput`](../index.md#contracttransactionrequestinput)[]

#### Returns

[`ContractTransactionRequestInput`](../index.md#contracttransactionrequestinput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:342](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L342)

___

### getContractOutputs

▸ **getContractOutputs**(): [`ContractTransactionRequestOutput`](../index.md#contracttransactionrequestoutput)[]

#### Returns

[`ContractTransactionRequestOutput`](../index.md#contracttransactionrequestoutput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:348](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L348)

___

### getVariableOutputs

▸ **getVariableOutputs**(): [`VariableTransactionRequestOutput`](../index.md#variabletransactionrequestoutput)[]

#### Returns

[`VariableTransactionRequestOutput`](../index.md#variabletransactionrequestoutput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:354](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L354)

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[pushInput](internal-BaseTransactionRequest.md#pushinput)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:143](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L143)

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[pushOutput](internal-BaseTransactionRequest.md#pushoutput)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:151](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L151)

___

### setScript

▸ **setScript**<`T`\>(`script`, `data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `script` | [`Script`](Script.md)<`T`, `void`\> |
| `data` | `T` |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:360](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L360)

___

### toTransaction

▸ **toTransaction**(): `Transaction`

#### Returns

`Transaction`

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toTransaction](internal-BaseTransactionRequest.md#totransaction)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:328](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L328)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toTransactionBytes](internal-BaseTransactionRequest.md#totransactionbytes)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:136](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L136)

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[updateWitness](internal-BaseTransactionRequest.md#updatewitness)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:167](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L167)

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[updateWitnessByCoinInputOwner](internal-BaseTransactionRequest.md#updatewitnessbycoininputowner)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:208](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L208)

___

### from

▸ `Static` **from**(`obj`): [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`ScriptTransactionRequestLike`](../interfaces/ScriptTransactionRequestLike.md) |

#### Returns

[`ScriptTransactionRequest`](ScriptTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:308](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L308)
