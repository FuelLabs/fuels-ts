---
layout: default
title: ScriptTransactionRequest
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: ScriptTransactionRequest

[@fuel-ts/contract](../index.md).[internal](../namespaces/internal.md).ScriptTransactionRequest

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:407](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L407)

## Properties

### bytesOffset

• **bytesOffset**: `undefined` \| `number`

determined bytes offset for start of script data

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:405](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L405)

___

### gasLimit

• **gasLimit**: [`BN`](internal-BN.md)

Gas limit for transaction

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[gasLimit](internal-BaseTransactionRequest.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:122](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L122)

___

### gasPrice

• **gasPrice**: [`BN`](internal-BN.md)

Gas price for transaction

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[gasPrice](internal-BaseTransactionRequest.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:120](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L120)

___

### inputs

• **inputs**: [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput)[] = `[]`

List of inputs

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[inputs](internal-BaseTransactionRequest.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:126](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L126)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[maturity](internal-BaseTransactionRequest.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:124](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L124)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[outputs](internal-BaseTransactionRequest.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:128](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L128)

___

### script

• **script**: `Uint8Array`

Script to execute

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:401](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L401)

___

### scriptData

• **scriptData**: `Uint8Array`

Script input data (parameters)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:403](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L403)

___

### type

• **type**: [`Script`](../namespaces/internal.md#script)

Type of the transaction

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[type](internal-BaseTransactionRequest.md#type)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:399](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L399)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[witnesses](internal-BaseTransactionRequest.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:130](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L130)

## Methods

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addCoinOutput](internal-BaseTransactionRequest.md#addcoinoutput)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:322](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L322)

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addCoinOutputs](internal-BaseTransactionRequest.md#addcoinoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:338](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L338)

___

### addContract

▸ **addContract**(`contract`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`ContractIdLike`](../namespaces/internal.md#contractidlike) |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:482](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L482)

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

[packages/providers/src/transaction-request/transaction-request.ts:467](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L467)

___

### addResource

▸ **addResource**(`resource`): `void`

Converts the given Resource to a ResourceInput with the appropriate witnessIndex and pushes it

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`Resource`](../namespaces/internal.md#resource) |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addResource](internal-BaseTransactionRequest.md#addresource)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:267](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L267)

___

### addResources

▸ **addResources**(`resources`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resources` | readonly [`Resource`](../namespaces/internal.md#resource)[] |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addResources](internal-BaseTransactionRequest.md#addresources)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:318](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L318)

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

[packages/providers/src/transaction-request/transaction-request.ts:454](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L454)

___

### byteSize

▸ **byteSize**(): `number`

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[byteSize](internal-BaseTransactionRequest.md#bytesize)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:354](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L354)

___

### calculateFee

▸ **calculateFee**(): [`CoinQuantity`](../namespaces/internal.md#coinquantity)

Return the minimum amount in native coins required to create
a transaction.

Note: this is required even gasPrice = 0

#### Returns

[`CoinQuantity`](../namespaces/internal.md#coinquantity)

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[calculateFee](internal-BaseTransactionRequest.md#calculatefee)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:369](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L369)

___

### chargeableByteSize

▸ **chargeableByteSize**(): [`BN`](internal-BN.md)

#### Returns

[`BN`](internal-BN.md)

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[chargeableByteSize](internal-BaseTransactionRequest.md#chargeablebytesize)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:358](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L358)

___

### createWitness

▸ `Protected` **createWitness**(): `number`

Creates an empty witness without any side effects and returns the index

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[createWitness](internal-BaseTransactionRequest.md#createwitness)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:193](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L193)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`<[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md)\>

#### Returns

`Pick`<[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md)\>

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getBaseTransaction](internal-BaseTransactionRequest.md#getbasetransaction)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:148](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L148)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../namespaces/internal.md#changetransactionrequestoutput)[]

#### Returns

[`ChangeTransactionRequestOutput`](../namespaces/internal.md#changetransactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getChangeOutputs](internal-BaseTransactionRequest.md#getchangeoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:227](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L227)

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

[packages/providers/src/transaction-request/transaction-request.ts:236](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L236)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](../namespaces/internal.md#cointransactionrequestinput)[]

#### Returns

[`CoinTransactionRequestInput`](../namespaces/internal.md#cointransactionrequestinput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinInputs](internal-BaseTransactionRequest.md#getcoininputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:215](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L215)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../namespaces/internal.md#cointransactionrequestoutput)[]

#### Returns

[`CoinTransactionRequestOutput`](../namespaces/internal.md#cointransactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinOutputs](internal-BaseTransactionRequest.md#getcoinoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:221](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L221)

___

### getContractInputs

▸ **getContractInputs**(): [`ContractTransactionRequestInput`](../namespaces/internal.md#contracttransactionrequestinput)[]

#### Returns

[`ContractTransactionRequestInput`](../namespaces/internal.md#contracttransactionrequestinput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:427](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L427)

___

### getContractOutputs

▸ **getContractOutputs**(): [`ContractTransactionRequestOutput`](../namespaces/internal.md#contracttransactionrequestoutput)[]

#### Returns

[`ContractTransactionRequestOutput`](../namespaces/internal.md#contracttransactionrequestoutput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:433](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L433)

___

### getVariableOutputs

▸ **getVariableOutputs**(): [`VariableTransactionRequestOutput`](../namespaces/internal.md#variabletransactionrequestoutput)[]

#### Returns

[`VariableTransactionRequestOutput`](../namespaces/internal.md#variabletransactionrequestoutput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:439](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L439)

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[pushInput](internal-BaseTransactionRequest.md#pushinput)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:177](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L177)

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

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[pushOutput](internal-BaseTransactionRequest.md#pushoutput)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:185](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L185)

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

[packages/providers/src/transaction-request/transaction-request.ts:445](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L445)

___

### toJSON

▸ **toJSON**(): `any`

#### Returns

`any`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toJSON](internal-BaseTransactionRequest.md#tojson)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:378](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L378)

___

### toTransaction

▸ **toTransaction**(): [`TransactionScript`](../namespaces/internal.md#transactionscript)

#### Returns

[`TransactionScript`](../namespaces/internal.md#transactionscript)

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toTransaction](internal-BaseTransactionRequest.md#totransaction)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:413](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L413)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toTransactionBytes](internal-BaseTransactionRequest.md#totransactionbytes)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:170](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L170)

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

[packages/providers/src/transaction-request/transaction-request.ts:208](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L208)

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

[packages/providers/src/transaction-request/transaction-request.ts:254](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L254)

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

[packages/providers/src/transaction-request/transaction-request.ts:198](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L198)

___

### from

▸ `Static` **from**(`obj`): [`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`ScriptTransactionRequestLike`](../interfaces/internal-ScriptTransactionRequestLike.md) |

#### Returns

[`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:391](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L391)
