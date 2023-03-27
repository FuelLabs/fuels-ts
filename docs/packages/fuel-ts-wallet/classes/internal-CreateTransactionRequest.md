---
layout: default
title: CreateTransactionRequest
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: CreateTransactionRequest

[@fuel-ts/wallet](../index.md).[internal](../namespaces/internal.md).CreateTransactionRequest

## Hierarchy

- [`BaseTransactionRequest`](internal-BaseTransactionRequest.md)

  ↳ **`CreateTransactionRequest`**

## Constructors

### constructor

• **new CreateTransactionRequest**(`__namedParameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters?` | [`CreateTransactionRequestLike`](../interfaces/internal-CreateTransactionRequestLike.md) |

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[constructor](internal-BaseTransactionRequest.md#constructor)

#### Defined in

packages/providers/dist/index.d.ts:1038

## Properties

### bytecodeWitnessIndex

• **bytecodeWitnessIndex**: `number`

Witness index of contract bytecode to create

#### Defined in

packages/providers/dist/index.d.ts:1033

___

### gasLimit

• **gasLimit**: [`BN`](internal-BN.md)

Gas limit for transaction

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[gasLimit](internal-BaseTransactionRequest.md#gaslimit)

#### Defined in

packages/providers/dist/index.d.ts:925

___

### gasPrice

• **gasPrice**: [`BN`](internal-BN.md)

Gas price for transaction

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[gasPrice](internal-BaseTransactionRequest.md#gasprice)

#### Defined in

packages/providers/dist/index.d.ts:923

___

### inputs

• **inputs**: [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput)[]

List of inputs

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[inputs](internal-BaseTransactionRequest.md#inputs)

#### Defined in

packages/providers/dist/index.d.ts:929

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[maturity](internal-BaseTransactionRequest.md#maturity)

#### Defined in

packages/providers/dist/index.d.ts:927

___

### outputs

• **outputs**: [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput)[]

List of outputs

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[outputs](internal-BaseTransactionRequest.md#outputs)

#### Defined in

packages/providers/dist/index.d.ts:931

___

### salt

• **salt**: `string`

Salt

#### Defined in

packages/providers/dist/index.d.ts:1035

___

### storageSlots

• **storageSlots**: [`TransactionRequestStorageSlot`](../namespaces/internal.md#transactionrequeststorageslot)[]

List of storage slots to initialize

#### Defined in

packages/providers/dist/index.d.ts:1037

___

### type

• **type**: [`Create`](../namespaces/internal.md#create)

Type of the transaction

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[type](internal-BaseTransactionRequest.md#type)

#### Defined in

packages/providers/dist/index.d.ts:1031

___

### witnesses

• **witnesses**: `BytesLike`[]

List of witnesses

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[witnesses](internal-BaseTransactionRequest.md#witnesses)

#### Defined in

packages/providers/dist/index.d.ts:933

## Methods

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](../namespaces/internal.md#addresslike) | Address of the destination |
| `amount` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | Amount of coins |
| `assetId?` | `BytesLike` | Asset ID of coins |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[addCoinOutput](internal-BaseTransactionRequest.md#addcoinoutput)

#### Defined in

packages/providers/dist/index.d.ts:971

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

packages/providers/dist/index.d.ts:978

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

packages/providers/dist/index.d.ts:1041

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

packages/providers/dist/index.d.ts:969

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

packages/providers/dist/index.d.ts:970

___

### byteSize

▸ **byteSize**(): `number`

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[byteSize](internal-BaseTransactionRequest.md#bytesize)

#### Defined in

packages/providers/dist/index.d.ts:983

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

packages/providers/dist/index.d.ts:991

___

### chargeableByteSize

▸ **chargeableByteSize**(): [`BN`](internal-BN.md)

#### Returns

[`BN`](internal-BN.md)

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[chargeableByteSize](internal-BaseTransactionRequest.md#chargeablebytesize)

#### Defined in

packages/providers/dist/index.d.ts:984

___

### createWitness

▸ `Protected` **createWitness**(): `number`

Creates an empty witness without any side effects and returns the index

#### Returns

`number`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[createWitness](internal-BaseTransactionRequest.md#createwitness)

#### Defined in

packages/providers/dist/index.d.ts:949

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`<[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md)\>

#### Returns

`Pick`<[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md)\>

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getBaseTransaction](internal-BaseTransactionRequest.md#getbasetransaction)

#### Defined in

packages/providers/dist/index.d.ts:935

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../namespaces/internal.md#changetransactionrequestoutput)[]

#### Returns

[`ChangeTransactionRequestOutput`](../namespaces/internal.md#changetransactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getChangeOutputs](internal-BaseTransactionRequest.md#getchangeoutputs)

#### Defined in

packages/providers/dist/index.d.ts:957

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

packages/providers/dist/index.d.ts:961

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](../namespaces/internal.md#cointransactionrequestinput)[]

#### Returns

[`CoinTransactionRequestInput`](../namespaces/internal.md#cointransactionrequestinput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinInputs](internal-BaseTransactionRequest.md#getcoininputs)

#### Defined in

packages/providers/dist/index.d.ts:955

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../namespaces/internal.md#cointransactionrequestoutput)[]

#### Returns

[`CoinTransactionRequestOutput`](../namespaces/internal.md#cointransactionrequestoutput)[]

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[getCoinOutputs](internal-BaseTransactionRequest.md#getcoinoutputs)

#### Defined in

packages/providers/dist/index.d.ts:956

___

### getContractCreatedOutputs

▸ **getContractCreatedOutputs**(): [`ContractCreatedTransactionRequestOutput`](../namespaces/internal.md#contractcreatedtransactionrequestoutput)[]

#### Returns

[`ContractCreatedTransactionRequestOutput`](../namespaces/internal.md#contractcreatedtransactionrequestoutput)[]

#### Defined in

packages/providers/dist/index.d.ts:1040

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

packages/providers/dist/index.d.ts:941

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

packages/providers/dist/index.d.ts:945

___

### toJSON

▸ **toJSON**(): `any`

#### Returns

`any`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toJSON](internal-BaseTransactionRequest.md#tojson)

#### Defined in

packages/providers/dist/index.d.ts:992

___

### toTransaction

▸ **toTransaction**(): [`TransactionCreate`](../namespaces/internal.md#transactioncreate)

#### Returns

[`TransactionCreate`](../namespaces/internal.md#transactioncreate)

#### Overrides

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toTransaction](internal-BaseTransactionRequest.md#totransaction)

#### Defined in

packages/providers/dist/index.d.ts:1039

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Inherited from

[BaseTransactionRequest](internal-BaseTransactionRequest.md).[toTransactionBytes](internal-BaseTransactionRequest.md#totransactionbytes)

#### Defined in

packages/providers/dist/index.d.ts:937

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

packages/providers/dist/index.d.ts:954

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

packages/providers/dist/index.d.ts:965

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

packages/providers/dist/index.d.ts:950

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

packages/providers/dist/index.d.ts:1029
