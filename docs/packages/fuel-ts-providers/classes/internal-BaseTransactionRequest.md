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

[packages/providers/src/transaction-request/transaction-request.ts:132](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L132)

## Properties

### gasLimit

• **gasLimit**: [`BN`](internal-BN.md)

Gas limit for transaction

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[gasLimit](../interfaces/internal-BaseTransactionRequestLike.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:122](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L122)

___

### gasPrice

• **gasPrice**: [`BN`](internal-BN.md)

Gas price for transaction

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[gasPrice](../interfaces/internal-BaseTransactionRequestLike.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:120](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L120)

___

### inputs

• **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[inputs](../interfaces/internal-BaseTransactionRequestLike.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:126](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L126)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[maturity](../interfaces/internal-BaseTransactionRequestLike.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:124](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L124)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[outputs](../interfaces/internal-BaseTransactionRequestLike.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:128](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L128)

___

### type

• `Abstract` **type**: [`TransactionType`](../enums/TransactionType.md)

Type of the transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:118](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L118)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[witnesses](../interfaces/internal-BaseTransactionRequestLike.md#witnesses)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:317](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L317)

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

[packages/providers/src/transaction-request/transaction-request.ts:333](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L333)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:376](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L376)

___

### addMessages

▸ **addMessages**(`messages`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messages` | readonly [`Message`](../index.md#message)[] |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:394](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L394)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:262](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L262)

___

### addResources

▸ **addResources**(`resources`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resources` | readonly [`Resource`](../index.md#resource)[] |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:313](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L313)

___

### byteSize

▸ **byteSize**(): `number`

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:349](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L349)

___

### calculateFee

▸ **calculateFee**(): [`CoinQuantity`](../index.md#coinquantity)

Return the minimum amount in native coins required to create
a transaction.

Note: this is required even gasPrice = 0

#### Returns

[`CoinQuantity`](../index.md#coinquantity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:364](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L364)

___

### chargeableByteSize

▸ **chargeableByteSize**(): [`BN`](internal-BN.md)

#### Returns

[`BN`](internal-BN.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:353](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L353)

___

### createWitness

▸ `Protected` **createWitness**(): `number`

Creates an empty witness without any side effects and returns the index

#### Returns

`number`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:193](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L193)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`<[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md)\>

#### Returns

`Pick`<[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md)\>

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:148](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L148)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

#### Returns

[`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:236](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L236)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

#### Returns

[`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:215](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L215)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

#### Returns

[`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:221](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L221)

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

[packages/providers/src/transaction-request/transaction-request.ts:177](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L177)

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

[packages/providers/src/transaction-request/transaction-request.ts:185](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L185)

___

### toJSON

▸ **toJSON**(): `any`

#### Returns

`any`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:398](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L398)

___

### toTransaction

▸ `Abstract` **toTransaction**(): [`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate)

#### Returns

[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:168](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L168)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:249](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L249)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:198](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L198)
