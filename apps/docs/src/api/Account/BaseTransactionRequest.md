[**@fuel-ts/account v0.94.4**](../index.md) • **Docs**

***

# Class: `abstract` BaseTransactionRequest

Abstract class to define the functionalities of a transaction request transaction request.

## Extended by

- [`BlobTransactionRequest`](BlobTransactionRequest.md)
- [`CreateTransactionRequest`](CreateTransactionRequest.md)
- [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

## Implements

- `BaseTransactionRequestLike`

## Constructors

### new BaseTransactionRequest()

> **new BaseTransactionRequest**(`baseTransactionRequest`): [`BaseTransactionRequest`](BaseTransactionRequest.md)

Constructor for initializing a base transaction request.

#### Parameters

• **baseTransactionRequest**: `BaseTransactionRequestLike` = `{}`

Optional object containing properties to initialize the transaction request.

#### Returns

[`BaseTransactionRequest`](BaseTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:125](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L125)

## Properties

### inputs

> **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

`BaseTransactionRequestLike.inputs`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:114](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L114)

***

### maturity?

> `optional` **maturity**: `number`

Block until which tx cannot be included

#### Implementation of

`BaseTransactionRequestLike.maturity`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:108](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L108)

***

### maxFee

> **maxFee**: `BN`

The maximum fee payable by this transaction using BASE_ASSET.

#### Implementation of

`BaseTransactionRequestLike.maxFee`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:110](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L110)

***

### outputs

> **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

`BaseTransactionRequestLike.outputs`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:116](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L116)

***

### tip?

> `optional` **tip**: `BN`

Gas price for transaction

#### Implementation of

`BaseTransactionRequestLike.tip`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:106](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L106)

***

### type

> `abstract` **type**: [`TransactionType`](./TransactionType.md)

Type of the transaction

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:104](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L104)

***

### witnessLimit?

> `optional` **witnessLimit**: `BN`

The maximum amount of witness data allowed for the transaction

#### Implementation of

`BaseTransactionRequestLike.witnessLimit`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:112](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L112)

***

### witnesses

> **witnesses**: [`BytesLike`](../Interfaces/index.md#byteslike)[] = `[]`

List of witnesses

#### Implementation of

`BaseTransactionRequestLike.witnesses`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:118](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L118)

## Methods

### addAccountWitnesses()

> **addAccountWitnesses**(`account`): `Promise`\&lt;[`BaseTransactionRequest`](BaseTransactionRequest.md)\>

Helper function to add an external signature to the transaction.

#### Parameters

• **account**: [`Account`](Account.md) \| [`Account`](Account.md)[]

The account/s to sign to the transaction.

#### Returns

`Promise`\&lt;[`BaseTransactionRequest`](BaseTransactionRequest.md)\>

The transaction with the signature witness added.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:287](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L287)

***

### addChangeOutput()

> **addChangeOutput**(`to`, `assetId`): `void`

Adds a change output to the transaction.

#### Parameters

• **to**: [`AddressLike`](../Interfaces/index.md#addresslike)

Address of the owner.

• **assetId**: [`BytesLike`](../Interfaces/index.md#byteslike)

Asset ID of coin.

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:512](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L512)

***

### addCoinInput()

> **addCoinInput**(`coin`): `void`

Adds a single coin input to the transaction and a change output for the related
assetId, if one it was not added yet.

#### Parameters

• **coin**: [`Coin`](../index.md#coin)

Coin resource.

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:361](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L361)

***

### addCoinOutput()

> **addCoinOutput**(`to`, `amount`, `assetId`): [`BaseTransactionRequest`](BaseTransactionRequest.md)

Adds a coin output to the transaction.

#### Parameters

• **to**: [`AddressLike`](../Interfaces/index.md#addresslike)

Address of the owner.

• **amount**: `BigNumberish`

Amount of coin.

• **assetId**: [`BytesLike`](../Interfaces/index.md#byteslike)

Asset ID of coin.

#### Returns

[`BaseTransactionRequest`](BaseTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:476](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L476)

***

### addCoinOutputs()

> **addCoinOutputs**(`to`, `quantities`): [`BaseTransactionRequest`](BaseTransactionRequest.md)

Adds multiple coin outputs to the transaction.

#### Parameters

• **to**: [`AddressLike`](../Interfaces/index.md#addresslike)

Address of the destination.

• **quantities**: [`CoinQuantityLike`](../index.md#coinquantitylike)[]

Quantities of coins.

#### Returns

[`BaseTransactionRequest`](BaseTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:493](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L493)

***

### addMessageInput()

> **addMessageInput**(`message`): `void`

Adds a single message input to the transaction and a change output for the
asset against the message

#### Parameters

• **message**: [`Message`](../index.md#message) \| [`MessageCoin`](../index.md#messagecoin)

Message resource.

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:402](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L402)

***

### addResource()

> **addResource**(`resource`): [`BaseTransactionRequest`](BaseTransactionRequest.md)

Adds a single resource to the transaction by adding a coin/message input and a
change output for the related assetId, if one it was not added yet.

#### Parameters

• **resource**: [`Resource`](../index.md#resource)

The resource to add.

#### Returns

[`BaseTransactionRequest`](BaseTransactionRequest.md)

This transaction.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:446](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L446)

***

### addResources()

> **addResources**(`resources`): [`BaseTransactionRequest`](BaseTransactionRequest.md)

Adds multiple resources to the transaction by adding coin/message inputs and change
outputs from the related assetIds.

#### Parameters

• **resources**: readonly [`Resource`](../index.md#resource)[]

The resources to add.

#### Returns

[`BaseTransactionRequest`](BaseTransactionRequest.md)

This transaction.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:463](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L463)

***

### byteLength()

> **byteLength**(): `number`

#### Returns

`number`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:702](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L702)

***

### calculateMaxGas()

> **calculateMaxGas**(`chainInfo`, `minGas`): `BN`

#### Parameters

• **chainInfo**: [`ChainInfo`](../index.md#chaininfo)

• **minGas**: `BN`

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:560](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L560)

***

### ~~fundWithFakeUtxos()~~

> **fundWithFakeUtxos**(`quantities`, `baseAssetId`, `resourcesOwner`?): [`BaseTransactionRequest`](BaseTransactionRequest.md)

Funds the transaction with fake UTXOs for each assetId and amount in the
quantities array.

#### Parameters

• **quantities**: [`CoinQuantity`](../index.md#coinquantity)[]

CoinQuantity Array.

• **baseAssetId**: `string`

The base asset to fund the transaction.

• **resourcesOwner?**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Returns

[`BaseTransactionRequest`](BaseTransactionRequest.md)

#### Deprecated

- This method is deprecated and will be removed in future versions.
Please use `Account.generateFakeResources` along with `this.addResources` instead.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:589](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L589)

***

### getBaseTransaction()

> `protected` **getBaseTransaction**(): `ToBaseTransactionResponse`

Method to obtain the base transaction details.

#### Returns

`ToBaseTransactionResponse`

The base transaction details.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:177](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L177)

***

### getChangeOutputs()

> **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

Gets the change outputs for a transaction.

#### Returns

[`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

The change outputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:325](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L325)

***

### getCoinInputs()

> **getCoinInputs**(): [`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

Gets the coin inputs for a transaction.

#### Returns

[`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

The coin inputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:303](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L303)

***

### getCoinOutputs()

> **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

Gets the coin outputs for a transaction.

#### Returns

[`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

The coin outputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:314](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L314)

***

### getCoinOutputsQuantities()

> **getCoinOutputsQuantities**(): [`CoinQuantity`](../index.md#coinquantity)[]

Retrieves an array of CoinQuantity for each coin output present in the transaction.
a transaction.

#### Returns

[`CoinQuantity`](../index.md#coinquantity)[]

CoinQuantity array.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:640](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L640)

***

### getTransactionId()

> `abstract` **getTransactionId**(`chainId`): `string`

Gets the Transaction Request by hashing the transaction.

#### Parameters

• **chainId**: `number`

The chain ID.

#### Returns

`string`

- A hash of the transaction, which is the transaction ID.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:656](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L656)

***

### removeWitness()

> **removeWitness**(`index`): `void`

#### Parameters

• **index**: `number`

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:668](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L668)

***

### toJSON()

> **toJSON**(): `any`

Return the minimum amount in native coins required to create
a transaction.

#### Returns

`any`

The transaction as a JSON object.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:664](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L664)

***

### toTransaction()

> `abstract` **toTransaction**(): `TransactionScript` \| `TransactionCreate` \| `TransactionBlob`

#### Returns

`TransactionScript` \| `TransactionCreate` \| `TransactionBlob`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:196](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L196)

***

### toTransactionBytes()

> **toTransactionBytes**(): `Uint8Array`

Converts the transaction request to a byte array.

#### Returns

`Uint8Array`

The transaction bytes.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:203](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L203)

***

### updatePredicateGasUsed()

> **updatePredicateGasUsed**(`inputs`): `void`

#### Parameters

• **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[]

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:682](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L682)

***

### updateWitness()

> **updateWitness**(`index`, `witness`): `void`

Updates an existing witness without any side effects.

#### Parameters

• **index**: `number`

The index of the witness to update.

• **witness**: [`BytesLike`](../Interfaces/index.md#byteslike)

The new witness.

#### Returns

`void`

#### Throws

If the witness does not exist.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:274](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L274)

***

### updateWitnessByOwner()

> **updateWitnessByOwner**(`address`, `signature`): `void`

Updates the witness for a given owner and signature.

#### Parameters

• **address**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The address to get the coin input witness index for.

• **signature**: [`BytesLike`](../Interfaces/index.md#byteslike)

The signature to update the witness with.

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:259](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L259)

***

### getPolicyMeta()

> `static` **getPolicyMeta**(`req`): `object`

#### Parameters

• **req**: [`BaseTransactionRequest`](BaseTransactionRequest.md)

#### Returns

`object`

##### policies

> **policies**: `Policy`[]

##### policyTypes

> **policyTypes**: `number`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:143](https://github.com/FuelLabs/fuels-ts/blob/1179e6c5f7a6085ce05c50d65a6afd87ec8d264f/packages/account/src/providers/transaction-request/transaction-request.ts#L143)
