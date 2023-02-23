---
layout: default
title: CreateTransactionRequest
parent: "@fuel-ts/predicate"
nav_order: 1

---

# Class: CreateTransactionRequest

[@fuel-ts/predicate](../index.md).[internal](../namespaces/internal.md).CreateTransactionRequest

## Hierarchy

- [`BaseTransactionRequest`](internal-BaseTransactionRequest.md)

  ↳ **`CreateTransactionRequest`**

## Constructors

### constructor

• **new CreateTransactionRequest**(`__namedParameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`CreateTransactionRequestLike`](../interfaces/internal-CreateTransactionRequestLike.md) |

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[constructor](internal-BaseTransactionRequest.md#constructor)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:528](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L528)

## Properties

### bytecodeWitnessIndex

• **bytecodeWitnessIndex**: `number`

Witness index of contract bytecode to create

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:522](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L522)

___

### gasLimit

• **gasLimit**: [`BN`](internal-BN.md)

Gas limit for transaction

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[gasLimit](internal-BaseTransactionRequest.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:121](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L121)

___

### gasPrice

• **gasPrice**: [`BN`](internal-BN.md)

Gas price for transaction

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[gasPrice](internal-BaseTransactionRequest.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:119](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L119)

___

### inputs

• **inputs**: [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput)[] = `[]`

List of inputs

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[inputs](internal-BaseTransactionRequest.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:125](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L125)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[maturity](internal-BaseTransactionRequest.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:123](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L123)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[outputs](internal-BaseTransactionRequest.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:127](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L127)

___

### salt

• **salt**: `string`

Salt

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:524](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L524)

___

### storageSlots

• **storageSlots**: [`TransactionRequestStorageSlot`](../namespaces/internal.md#transactionrequeststorageslot)[]

List of storage slots to initialize

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:526](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L526)

___

### type

• **type**: [`Create`](../namespaces/internal.md#create)

Type of the transaction

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[type](internal-BaseTransactionRequest.md#type)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:520](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L520)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[witnesses](internal-BaseTransactionRequest.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:129](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L129)

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

[packages/providers/src/transaction-request/transaction-request.ts:321](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L321)

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

[packages/providers/src/transaction-request/transaction-request.ts:337](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L337)

___

### addContractCreatedOutput

▸ **addContractCreatedOutput**(`contractId`, `stateRoot`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `stateRoot` | `BytesLike` | State Root |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:562](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L562)

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

[packages/providers/src/transaction-request/transaction-request.ts:266](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L266)

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

[packages/providers/src/transaction-request/transaction-request.ts:317](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L317)

___

### byteSize

▸ **byteSize**(): `number`

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[byteSize](internal-BaseTransactionRequest.md#bytesize)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:353](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L353)

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

[packages/providers/src/transaction-request/transaction-request.ts:368](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L368)

___

### chargeableByteSize

▸ **chargeableByteSize**(): [`BN`](internal-BN.md)

#### Returns

[`BN`](internal-BN.md)

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[chargeableByteSize](internal-BaseTransactionRequest.md#chargeablebytesize)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:357](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L357)

___

### createWitness

▸ `Protected` **createWitness**(): `number`

Creates an empty witness without any side effects and returns the index

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[createWitness](internal-BaseTransactionRequest.md#createwitness)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:192](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L192)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`<[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md)\>

#### Returns

`Pick`<[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md)\>

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getBaseTransaction](internal-BaseTransactionRequest.md#getbasetransaction)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:147](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L147)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../namespaces/internal.md#changetransactionrequestoutput)[]

#### Returns

[`ChangeTransactionRequestOutput`](../namespaces/internal.md#changetransactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getChangeOutputs](internal-BaseTransactionRequest.md#getchangeoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:226](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L226)

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

[packages/providers/src/transaction-request/transaction-request.ts:235](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L235)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](../namespaces/internal.md#cointransactionrequestinput)[]

#### Returns

[`CoinTransactionRequestInput`](../namespaces/internal.md#cointransactionrequestinput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinInputs](internal-BaseTransactionRequest.md#getcoininputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:214](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L214)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../namespaces/internal.md#cointransactionrequestoutput)[]

#### Returns

[`CoinTransactionRequestOutput`](../namespaces/internal.md#cointransactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinOutputs](internal-BaseTransactionRequest.md#getcoinoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:220](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L220)

___

### getContractCreatedOutputs

▸ **getContractCreatedOutputs**(): [`ContractCreatedTransactionRequestOutput`](../namespaces/internal.md#contractcreatedtransactionrequestoutput)[]

#### Returns

[`ContractCreatedTransactionRequestOutput`](../namespaces/internal.md#contractcreatedtransactionrequestoutput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:555](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L555)

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

[packages/providers/src/transaction-request/transaction-request.ts:176](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L176)

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

[packages/providers/src/transaction-request/transaction-request.ts:184](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L184)

___

### toJSON

▸ **toJSON**(): `any`

#### Returns

`any`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toJSON](internal-BaseTransactionRequest.md#tojson)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:377](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L377)

___

### toTransaction

▸ **toTransaction**(): [`TransactionCreate`](../namespaces/internal.md#transactioncreate)

#### Returns

[`TransactionCreate`](../namespaces/internal.md#transactioncreate)

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toTransaction](internal-BaseTransactionRequest.md#totransaction)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:540](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L540)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toTransactionBytes](internal-BaseTransactionRequest.md#totransactionbytes)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:169](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L169)

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

[packages/providers/src/transaction-request/transaction-request.ts:207](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L207)

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

[packages/providers/src/transaction-request/transaction-request.ts:253](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L253)

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

[packages/providers/src/transaction-request/transaction-request.ts:197](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L197)

___

### from

▸ `Static` **from**(`obj`): [`CreateTransactionRequest`](internal-CreateTransactionRequest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`CreateTransactionRequestLike`](../interfaces/internal-CreateTransactionRequestLike.md) |

#### Returns

[`CreateTransactionRequest`](internal-CreateTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:512](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L512)
