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

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:468](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L468)
=======
[packages/providers/src/transaction-request/transaction-request.ts:424](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L424)
>>>>>>> master

## Properties

### bytesOffset

• **bytesOffset**: `undefined` \| `number`

determined bytes offset for start of script data

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:466](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L466)
=======
[packages/providers/src/transaction-request/transaction-request.ts:422](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L422)
>>>>>>> master

___

### gasLimit

• **gasLimit**: [`BN`](internal-BN.md)

Gas limit for transaction

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[gasLimit](internal-BaseTransactionRequest.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:123](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L123)

___

### gasPrice

• **gasPrice**: [`BN`](internal-BN.md)

Gas price for transaction

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[gasPrice](internal-BaseTransactionRequest.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:121](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L121)

___

### inputs

• **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[inputs](internal-BaseTransactionRequest.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:127](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L127)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[maturity](internal-BaseTransactionRequest.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:125](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L125)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[outputs](internal-BaseTransactionRequest.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:129](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L129)

___

### script

• **script**: `Uint8Array`

Script to execute

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:462](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L462)
=======
[packages/providers/src/transaction-request/transaction-request.ts:418](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L418)
>>>>>>> master

___

### scriptData

• **scriptData**: `Uint8Array`

Script input data (parameters)

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:464](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L464)
=======
[packages/providers/src/transaction-request/transaction-request.ts:420](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L420)
>>>>>>> master

___

### type

• **type**: [`Script`](../enums/TransactionType.md#script)

Type of the transaction

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[type](internal-BaseTransactionRequest.md#type)

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:460](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L460)
=======
[packages/providers/src/transaction-request/transaction-request.ts:416](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L416)
>>>>>>> master

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[witnesses](internal-BaseTransactionRequest.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:131](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L131)

## Methods

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId?`): `void`

Converts the given Coin to a CoinInput with the appropriate witnessIndex and pushes it

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `to` | [`AddressLike`](../namespaces/internal.md#addresslike) | `undefined` | Address of the destination |
| `amount` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` | Amount of coins |
| `assetId` | `BytesLike` | `NativeAssetId` | Asset ID of coins |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addCoinOutput](internal-BaseTransactionRequest.md#addcoinoutput)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:318](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L318)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:321](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L321)

___

### addCoinOutputs

▸ **addCoinOutputs**(`to`, `quantities`): `void`

#### Parameters

<<<<<<< HEAD
| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `to` | [`AddressLike`](../namespaces/internal.md#addresslike) | `undefined` | Address of the destination |
| `amount` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` | Amount of coins |
| `assetId` | `BytesLike` | `NativeAssetId` | Asset ID of coins |
=======
| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](../namespaces/internal.md#addresslike) | Address of the destination |
| `quantities` | [`CoinQuantityLike`](../index.md#coinquantitylike)[] | Quantities of coins |
>>>>>>> master

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addCoinOutputs](internal-BaseTransactionRequest.md#addcoinoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:334](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L334)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:362](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L362)

___

### addContract

▸ **addContract**(`contract`): `void`

#### Parameters

<<<<<<< HEAD
| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](../namespaces/internal.md#addresslike) | Address of the destination |
| `quantities` | [`CoinQuantityLike`](../index.md#coinquantitylike)[] | Quantities of coins |
=======
| Name | Type |
| :------ | :------ |
| `contract` | [`ContractIdLike`](../namespaces/internal.md#contractidlike) |
>>>>>>> master

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:499](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L499)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:378](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L378)

___

### addMessage

▸ **addMessage**(`message`): `void`

Converts the given Message to a MessageInput

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`Message`](../index.md#message) |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addMessage](internal-BaseTransactionRequest.md#addmessage)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:377](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L377)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:358](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L358)

___

### addMessageOutputs

▸ **addMessageOutputs**(`numberOfMessages?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `numberOfMessages` | `number` | `1` |

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:484](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L484)

___

### addMessages

▸ **addMessages**(`messages`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messages` | readonly [`Message`](../index.md#message)[] |

#### Returns

`void`

<<<<<<< HEAD
#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:543](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L543)
=======
#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addMessages](internal-BaseTransactionRequest.md#addmessages)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:395](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L395)
>>>>>>> master

___

### addResource

▸ **addResource**(`resource`): `void`

Converts the given Resource to a ResourceInput with the appropriate witnessIndex and pushes it

Converts the given Message to a MessageInput

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`Resource`](../index.md#resource) |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addResource](internal-BaseTransactionRequest.md#addresource)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:263](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L263)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:421](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L421)

___

### addMessageOutputs

▸ **addMessageOutputs**(`numberOfMessages?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `numberOfMessages` | `number` | `1` |

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:528](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L528)

___

### addResources

▸ **addResources**(`resources`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resources` | readonly [`Resource`](../index.md#resource)[] |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addResources](internal-BaseTransactionRequest.md#addresources)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:314](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L314)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:439](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L439)

___

### addResource

▸ **addResource**(`resource`): `void`

Converts the given Resource to a ResourceInput with the appropriate witnessIndex and pushes it

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`Resource`](../index.md#resource) |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addResource](internal-BaseTransactionRequest.md#addresource)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:263](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L263)

___

### addResources

▸ **addResources**(`resources`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resources` | readonly [`Resource`](../index.md#resource)[] |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addResources](internal-BaseTransactionRequest.md#addresources)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:314](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L314)

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

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:515](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L515)
=======
[packages/providers/src/transaction-request/transaction-request.ts:471](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L471)
>>>>>>> master

___

### byteSize

▸ **byteSize**(): `number`

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[byteSize](internal-BaseTransactionRequest.md#bytesize)

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:394](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L394)
=======
[packages/providers/src/transaction-request/transaction-request.ts:350](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L350)
>>>>>>> master

___

### calculateFee

▸ **calculateFee**(): [`CoinQuantity`](../index.md#coinquantity)

Return the minimum amount in native coins required to create
a transaction.

Note: this is required even gasPrice = 0

#### Returns

[`CoinQuantity`](../index.md#coinquantity)

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[calculateFee](internal-BaseTransactionRequest.md#calculatefee)

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:409](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L409)
=======
[packages/providers/src/transaction-request/transaction-request.ts:365](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L365)
>>>>>>> master

___

### chargeableByteSize

▸ **chargeableByteSize**(): [`BN`](internal-BN.md)

#### Returns

[`BN`](internal-BN.md)

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[chargeableByteSize](internal-BaseTransactionRequest.md#chargeablebytesize)

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:398](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L398)
=======
[packages/providers/src/transaction-request/transaction-request.ts:354](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L354)
>>>>>>> master

___

### createWitness

▸ `Protected` **createWitness**(): `number`

Creates an empty witness without any side effects and returns the index

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[createWitness](internal-BaseTransactionRequest.md#createwitness)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:194](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L194)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`<[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md)\>

#### Returns

`Pick`<[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md)\>

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getBaseTransaction](internal-BaseTransactionRequest.md#getbasetransaction)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:149](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L149)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

#### Returns

[`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getChangeOutputs](internal-BaseTransactionRequest.md#getchangeoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:228](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L228)

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinInputWitnessIndexByOwner](internal-BaseTransactionRequest.md#getcoininputwitnessindexbyowner)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:237](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L237)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

#### Returns

[`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinInputs](internal-BaseTransactionRequest.md#getcoininputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:216](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L216)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

#### Returns

[`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinOutputs](internal-BaseTransactionRequest.md#getcoinoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:222](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L222)

___

### getContractInputs

▸ **getContractInputs**(): [`ContractTransactionRequestInput`](../index.md#contracttransactionrequestinput)[]

#### Returns

[`ContractTransactionRequestInput`](../index.md#contracttransactionrequestinput)[]

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:488](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L488)
=======
[packages/providers/src/transaction-request/transaction-request.ts:444](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L444)
>>>>>>> master

___

### getContractOutputs

▸ **getContractOutputs**(): [`ContractTransactionRequestOutput`](../index.md#contracttransactionrequestoutput)[]

#### Returns

[`ContractTransactionRequestOutput`](../index.md#contracttransactionrequestoutput)[]

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:494](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L494)
=======
[packages/providers/src/transaction-request/transaction-request.ts:450](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L450)
>>>>>>> master

___

### getVariableOutputs

▸ **getVariableOutputs**(): [`VariableTransactionRequestOutput`](../index.md#variabletransactionrequestoutput)[]

#### Returns

[`VariableTransactionRequestOutput`](../index.md#variabletransactionrequestoutput)[]

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:500](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L500)
=======
[packages/providers/src/transaction-request/transaction-request.ts:456](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L456)
>>>>>>> master

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

[packages/providers/src/transaction-request/transaction-request.ts:178](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L178)

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

[packages/providers/src/transaction-request/transaction-request.ts:186](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L186)

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

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:506](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L506)
=======
[packages/providers/src/transaction-request/transaction-request.ts:462](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L462)
>>>>>>> master

___

### toTransaction

▸ **toTransaction**(): [`TransactionScript`](../namespaces/internal.md#transactionscript)

#### Returns

[`TransactionScript`](../namespaces/internal.md#transactionscript)

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toTransaction](internal-BaseTransactionRequest.md#totransaction)

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:474](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L474)
=======
[packages/providers/src/transaction-request/transaction-request.ts:430](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L430)
>>>>>>> master

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toTransactionBytes](internal-BaseTransactionRequest.md#totransactionbytes)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:171](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L171)

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

[packages/providers/src/transaction-request/transaction-request.ts:209](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L209)

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[updateWitnessByCoinInputOwner](internal-BaseTransactionRequest.md#updatewitnessbycoininputowner)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:250](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L250)

___

### updateWitnessByOwner

▸ **updateWitnessByOwner**(`address`, `signature`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](internal-AbstractAddress.md) |
| `signature` | `BytesLike` |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[updateWitnessByOwner](internal-BaseTransactionRequest.md#updatewitnessbyowner)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:199](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L199)

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

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:452](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L452)
=======
[packages/providers/src/transaction-request/transaction-request.ts:408](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L408)
>>>>>>> master
