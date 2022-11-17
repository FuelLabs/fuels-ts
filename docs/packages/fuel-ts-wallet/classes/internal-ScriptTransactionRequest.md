---
layout: default
title: ScriptTransactionRequest
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: ScriptTransactionRequest

[@fuel-ts/wallet](../index.md).[internal](../namespaces/internal.md).ScriptTransactionRequest

## Hierarchy

- [`BaseTransactionRequest`](internal-BaseTransactionRequest.md)

  ↳ **`ScriptTransactionRequest`**

## Constructors

### constructor

• **new ScriptTransactionRequest**(`__namedParameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ScriptTransactionRequestLike`](../interfaces/internal-ScriptTransactionRequestLike.md) |

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[constructor](internal-BaseTransactionRequest.md#constructor)

## Properties

### bytesOffset

• **bytesOffset**: `undefined` \| `number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:381](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L381)

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

• **inputs**: [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput)[] = `[]`

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

• **outputs**: [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput)[] = `[]`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[outputs](internal-BaseTransactionRequest.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:110](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L110)

___

### script

• **script**: `Uint8Array`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:377](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L377)

___

### scriptData

• **scriptData**: `Uint8Array`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:379](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L379)

___

### type

• **type**: [`Script`](../namespaces/internal.md#script)

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[type](internal-BaseTransactionRequest.md#type)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:375](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L375)

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
| `coin` | [`Coin`](../namespaces/internal.md#coin) |

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
| `quantities` | [`CoinQuantityLike`](../namespaces/internal.md#coinquantitylike)[] |

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
| `coins` | readonly [`Coin`](../namespaces/internal.md#coin)[] |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addCoins](internal-BaseTransactionRequest.md#addcoins)

___

### addContract

▸ **addContract**(`contract`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`ContractIdLike`](../namespaces/internal.md#contractidlike) |

#### Returns

`void`

___

### addMessage

▸ **addMessage**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`Message`](../namespaces/internal.md#message-2) |

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
| `messages` | readonly [`Message`](../namespaces/internal.md#message-2)[] |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addMessages](internal-BaseTransactionRequest.md#addmessages)

___

### addVariableOutputs

▸ **addVariableOutputs**(`numberOfVariables?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `numberOfVariables` | `number` | `1` |

#### Returns

`number`

___

### byteSize

▸ **byteSize**(): `number`

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[byteSize](internal-BaseTransactionRequest.md#bytesize)

___

### calculateFee

▸ **calculateFee**(): [`CoinQuantity`](../namespaces/internal.md#coinquantity)

#### Returns

[`CoinQuantity`](../namespaces/internal.md#coinquantity)

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

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../namespaces/internal.md#changetransactionrequestoutput)[]

#### Returns

[`ChangeTransactionRequestOutput`](../namespaces/internal.md#changetransactionrequestoutput)[]

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

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](../namespaces/internal.md#cointransactionrequestinput)[]

#### Returns

[`CoinTransactionRequestInput`](../namespaces/internal.md#cointransactionrequestinput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinInputs](internal-BaseTransactionRequest.md#getcoininputs)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../namespaces/internal.md#cointransactionrequestoutput)[]

#### Returns

[`CoinTransactionRequestOutput`](../namespaces/internal.md#cointransactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinOutputs](internal-BaseTransactionRequest.md#getcoinoutputs)

___

### getContractInputs

▸ **getContractInputs**(): [`ContractTransactionRequestInput`](../namespaces/internal.md#contracttransactionrequestinput)[]

#### Returns

[`ContractTransactionRequestInput`](../namespaces/internal.md#contracttransactionrequestinput)[]

___

### getContractOutputs

▸ **getContractOutputs**(): [`ContractTransactionRequestOutput`](../namespaces/internal.md#contracttransactionrequestoutput)[]

#### Returns

[`ContractTransactionRequestOutput`](../namespaces/internal.md#contracttransactionrequestoutput)[]

___

### getVariableOutputs

▸ **getVariableOutputs**(): [`VariableTransactionRequestOutput`](../namespaces/internal.md#variabletransactionrequestoutput)[]

#### Returns

[`VariableTransactionRequestOutput`](../namespaces/internal.md#variabletransactionrequestoutput)[]

___

### pushInput

▸ `Protected` **pushInput**(`input`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput) |

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
| `output` | [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput) |

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[pushOutput](internal-BaseTransactionRequest.md#pushoutput)

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
| `script` | [`AbstractScript`](internal-AbstractScript.md)<`T`\> |
| `data` | `T` |

#### Returns

`void`

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

▸ `Static` **from**(`obj`): [`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`ScriptTransactionRequestLike`](../interfaces/internal-ScriptTransactionRequestLike.md) |

#### Returns

[`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)
