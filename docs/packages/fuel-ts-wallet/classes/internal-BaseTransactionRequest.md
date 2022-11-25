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

[packages/providers/src/transaction-request/transaction-request.ts:133](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L133)

## Properties

### gasLimit

• **gasLimit**: [`BN`](internal-BN.md)

Gas limit for transaction

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[gasLimit](../interfaces/internal-BaseTransactionRequestLike.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:123](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L123)

___

### gasPrice

• **gasPrice**: [`BN`](internal-BN.md)

Gas price for transaction

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[gasPrice](../interfaces/internal-BaseTransactionRequestLike.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:121](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L121)

___

### inputs

• **inputs**: [`TransactionRequestInput`](../namespaces/internal.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[inputs](../interfaces/internal-BaseTransactionRequestLike.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:127](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L127)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[maturity](../interfaces/internal-BaseTransactionRequestLike.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:125](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L125)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](../namespaces/internal.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[outputs](../interfaces/internal-BaseTransactionRequestLike.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:129](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L129)

___

### type

• `Abstract` **type**: [`TransactionType`](../enums/internal-TransactionType.md)

Type of the transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:119](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L119)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Implementation of

[BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md).[witnesses](../interfaces/internal-BaseTransactionRequestLike.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:131](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L131)

## Methods

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId?`): `void`

Converts the given Coin to a CoinInput with the appropriate witnessIndex and pushes it

#### Parameters

<<<<<<< HEAD
| Name | Type |
| :------ | :------ |
| `coin` | [`Coin`](../namespaces/internal.md#coin-2) |
=======
| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `to` | [`AddressLike`](../namespaces/internal.md#addresslike) | `undefined` | Address of the destination |
| `amount` | [`BigNumberish`](../namespaces/internal.md#bignumberish) | `undefined` | Amount of coins |
| `assetId` | `BytesLike` | `NativeAssetId` | Asset ID of coins |
>>>>>>> master

#### Returns

`void`

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:321](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L321)
=======
[packages/providers/src/transaction-request/transaction-request.ts:318](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L318)
>>>>>>> master

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
| `quantities` | [`CoinQuantityLike`](../namespaces/internal.md#coinquantitylike)[] | Quantities of coins |
>>>>>>> master

#### Returns

`void`

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:362](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L362)
=======
[packages/providers/src/transaction-request/transaction-request.ts:334](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L334)
>>>>>>> master

___

### addMessage

▸ **addMessage**(`message`): `void`

Converts the given Message to a MessageInput

#### Parameters

<<<<<<< HEAD
| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](../namespaces/internal.md#addresslike) | Address of the destination |
| `quantities` | [`CoinQuantityLike`](../namespaces/internal.md#coinquantitylike)[] | Quantities of coins |
=======
| Name | Type |
| :------ | :------ |
| `message` | [`Message`](../namespaces/internal.md#message-2) |
>>>>>>> master

#### Returns

`void`

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:378](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L378)
=======
[packages/providers/src/transaction-request/transaction-request.ts:377](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L377)
>>>>>>> master

___

### addMessages

▸ **addMessages**(`messages`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
<<<<<<< HEAD
| `coins` | readonly [`Coin`](../namespaces/internal.md#coin-2)[] |
=======
| `messages` | readonly [`Message`](../namespaces/internal.md#message-2)[] |
>>>>>>> master

#### Returns

`void`

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:358](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L358)
=======
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
| `resource` | [`Resource`](../namespaces/internal.md#resource) |

#### Returns

`void`

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:421](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L421)
=======
[packages/providers/src/transaction-request/transaction-request.ts:263](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L263)
>>>>>>> master

___

### addResources

▸ **addResources**(`resources`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resources` | readonly [`Resource`](../namespaces/internal.md#resource)[] |

#### Returns

`void`

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:439](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L439)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:263](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L263)

___

### addResources

▸ **addResources**(`resources`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resources` | readonly [`Resource`](../namespaces/internal.md#resource)[] |

#### Returns

`void`

#### Defined in

=======
>>>>>>> master
[packages/providers/src/transaction-request/transaction-request.ts:314](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L314)

___

### byteSize

▸ **byteSize**(): `number`

#### Returns

`number`

#### Defined in

<<<<<<< HEAD
[packages/providers/src/transaction-request/transaction-request.ts:394](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L394)
=======
[packages/providers/src/transaction-request/transaction-request.ts:350](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L350)
>>>>>>> master

___

### calculateFee

▸ **calculateFee**(): [`CoinQuantity`](../namespaces/internal.md#coinquantity)

Return the minimum amount in native coins required to create
a transaction.

Note: this is required even gasPrice = 0

#### Returns

[`CoinQuantity`](../namespaces/internal.md#coinquantity)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:194](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L194)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`<[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md)\>

#### Returns

`Pick`<[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate), ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof [`BaseTransactionRequestLike`](../interfaces/internal-BaseTransactionRequestLike.md)\>

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:149](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L149)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../namespaces/internal.md#changetransactionrequestoutput)[]

#### Returns

[`ChangeTransactionRequestOutput`](../namespaces/internal.md#changetransactionrequestoutput)[]

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:237](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L237)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](../namespaces/internal.md#cointransactionrequestinput)[]

#### Returns

[`CoinTransactionRequestInput`](../namespaces/internal.md#cointransactionrequestinput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:216](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L216)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../namespaces/internal.md#cointransactionrequestoutput)[]

#### Returns

[`CoinTransactionRequestOutput`](../namespaces/internal.md#cointransactionrequestoutput)[]

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:222](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L222)

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

[packages/providers/src/transaction-request/transaction-request.ts:178](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L178)

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

[packages/providers/src/transaction-request/transaction-request.ts:186](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L186)

___

### toTransaction

▸ `Abstract` **toTransaction**(): [`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate)

#### Returns

[`TransactionScript`](../namespaces/internal.md#transactionscript) \| [`TransactionCreate`](../namespaces/internal.md#transactioncreate)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:169](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L169)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:199](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L199)
