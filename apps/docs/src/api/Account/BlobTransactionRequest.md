[**@fuel-ts/account v0.94.8**](../index.md) • **Docs**

***

# Class: BlobTransactionRequest

Abstract class to define the functionalities of a transaction request transaction request.

## Extends

- [`BaseTransactionRequest`](BaseTransactionRequest.md)

## Constructors

### new BlobTransactionRequest()

> **new BlobTransactionRequest**(`blobTransactionRequestLike`): [`BlobTransactionRequest`](BlobTransactionRequest.md)

Creates an instance `BlobTransactionRequest`.

#### Parameters

• **blobTransactionRequestLike**: [`BlobTransactionRequestLike`](./BlobTransactionRequestLike.md)

The initial values for the instance

#### Returns

[`BlobTransactionRequest`](BlobTransactionRequest.md)

#### Overrides

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`constructor`](BaseTransactionRequest.md#constructors)

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:36](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L36)

## Properties

### blobId

> **blobId**: `string`

Blob ID

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:27](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L27)

***

### inputs

> **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`inputs`](BaseTransactionRequest.md#inputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:116](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L116)

***

### maturity?

> `optional` **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`maturity`](BaseTransactionRequest.md#maturity)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:110](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L110)

***

### maxFee

> **maxFee**: `BN`

The maximum fee payable by this transaction using BASE_ASSET.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`maxFee`](BaseTransactionRequest.md#maxfee)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:112](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L112)

***

### outputs

> **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`outputs`](BaseTransactionRequest.md#outputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:118](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L118)

***

### tip?

> `optional` **tip**: `BN`

Gas price for transaction

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`tip`](BaseTransactionRequest.md#tip)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:108](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L108)

***

### type

> **type**: [`Blob`](./TransactionType.md#blob)

Type of the transaction

#### Overrides

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`type`](BaseTransactionRequest.md#type)

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:25](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L25)

***

### witnessIndex

> **witnessIndex**: `number`

Witness index of contract bytecode to create

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:29](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L29)

***

### witnessLimit?

> `optional` **witnessLimit**: `BN`

The maximum amount of witness data allowed for the transaction

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`witnessLimit`](BaseTransactionRequest.md#witnesslimit)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:114](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L114)

***

### witnesses

> **witnesses**: [`BytesLike`](../Interfaces/index.md#byteslike)[] = `[]`

List of witnesses

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`witnesses`](BaseTransactionRequest.md#witnesses)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:120](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L120)

## Methods

### addAccountWitnesses()

> **addAccountWitnesses**(`account`): `Promise`\&lt;[`BlobTransactionRequest`](BlobTransactionRequest.md)\>

Helper function to add an external signature to the transaction.

#### Parameters

• **account**: [`Account`](Account.md) \| [`Account`](Account.md)[]

The account/s to sign to the transaction.

#### Returns

`Promise`\&lt;[`BlobTransactionRequest`](BlobTransactionRequest.md)\>

The transaction with the signature witness added.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addAccountWitnesses`](BaseTransactionRequest.md#addaccountwitnesses)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:294](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L294)

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

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addChangeOutput`](BaseTransactionRequest.md#addchangeoutput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:519](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L519)

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

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addCoinInput`](BaseTransactionRequest.md#addcoininput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:368](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L368)

***

### addCoinOutput()

> **addCoinOutput**(`to`, `amount`, `assetId`): [`BlobTransactionRequest`](BlobTransactionRequest.md)

Adds a coin output to the transaction.

#### Parameters

• **to**: [`AddressLike`](../Interfaces/index.md#addresslike)

Address of the owner.

• **amount**: `BigNumberish`

Amount of coin.

• **assetId**: [`BytesLike`](../Interfaces/index.md#byteslike)

Asset ID of coin.

#### Returns

[`BlobTransactionRequest`](BlobTransactionRequest.md)

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addCoinOutput`](BaseTransactionRequest.md#addcoinoutput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:483](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L483)

***

### addCoinOutputs()

> **addCoinOutputs**(`to`, `quantities`): [`BlobTransactionRequest`](BlobTransactionRequest.md)

Adds multiple coin outputs to the transaction.

#### Parameters

• **to**: [`AddressLike`](../Interfaces/index.md#addresslike)

Address of the destination.

• **quantities**: [`CoinQuantityLike`](../index.md#coinquantitylike)[]

Quantities of coins.

#### Returns

[`BlobTransactionRequest`](BlobTransactionRequest.md)

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addCoinOutputs`](BaseTransactionRequest.md#addcoinoutputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:500](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L500)

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

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addMessageInput`](BaseTransactionRequest.md#addmessageinput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:409](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L409)

***

### addResource()

> **addResource**(`resource`): [`BlobTransactionRequest`](BlobTransactionRequest.md)

Adds a single resource to the transaction by adding a coin/message input and a
change output for the related assetId, if one it was not added yet.

#### Parameters

• **resource**: [`Resource`](../index.md#resource)

The resource to add.

#### Returns

[`BlobTransactionRequest`](BlobTransactionRequest.md)

This transaction.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addResource`](BaseTransactionRequest.md#addresource)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:453](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L453)

***

### addResources()

> **addResources**(`resources`): [`BlobTransactionRequest`](BlobTransactionRequest.md)

Adds multiple resources to the transaction by adding coin/message inputs and change
outputs from the related assetIds.

#### Parameters

• **resources**: readonly [`Resource`](../index.md#resource)[]

The resources to add.

#### Returns

[`BlobTransactionRequest`](BlobTransactionRequest.md)

This transaction.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addResources`](BaseTransactionRequest.md#addresources)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:470](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L470)

***

### byteLength()

> **byteLength**(): `number`

#### Returns

`number`

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`byteLength`](BaseTransactionRequest.md#bytelength)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:709](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L709)

***

### calculateMaxGas()

> **calculateMaxGas**(`chainInfo`, `minGas`): `BN`

#### Parameters

• **chainInfo**: [`ChainInfo`](../index.md#chaininfo)

• **minGas**: `BN`

#### Returns

`BN`

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`calculateMaxGas`](BaseTransactionRequest.md#calculatemaxgas)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:567](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L567)

***

### ~~fundWithFakeUtxos()~~

> **fundWithFakeUtxos**(`quantities`, `baseAssetId`, `resourcesOwner`?): [`BlobTransactionRequest`](BlobTransactionRequest.md)

Funds the transaction with fake UTXOs for each assetId and amount in the
quantities array.

#### Parameters

• **quantities**: [`CoinQuantity`](../index.md#coinquantity)[]

CoinQuantity Array.

• **baseAssetId**: `string`

The base asset to fund the transaction.

• **resourcesOwner?**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Returns

[`BlobTransactionRequest`](BlobTransactionRequest.md)

#### Deprecated

- This method is deprecated and will be removed in future versions.
Please use `Account.generateFakeResources` along with `this.addResources` instead.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`fundWithFakeUtxos`](BaseTransactionRequest.md#fundwithfakeutxos)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:596](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L596)

***

### getBaseTransaction()

> `protected` **getBaseTransaction**(): `ToBaseTransactionResponse`

Method to obtain the base transaction details.

#### Returns

`ToBaseTransactionResponse`

The base transaction details.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`getBaseTransaction`](BaseTransactionRequest.md#getbasetransaction)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:179](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L179)

***

### getChangeOutputs()

> **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

Gets the change outputs for a transaction.

#### Returns

[`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

The change outputs.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`getChangeOutputs`](BaseTransactionRequest.md#getchangeoutputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:332](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L332)

***

### getCoinInputs()

> **getCoinInputs**(): [`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

Gets the coin inputs for a transaction.

#### Returns

[`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

The coin inputs.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`getCoinInputs`](BaseTransactionRequest.md#getcoininputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:310](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L310)

***

### getCoinOutputs()

> **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

Gets the coin outputs for a transaction.

#### Returns

[`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

The coin outputs.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`getCoinOutputs`](BaseTransactionRequest.md#getcoinoutputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:321](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L321)

***

### getCoinOutputsQuantities()

> **getCoinOutputsQuantities**(): [`CoinQuantity`](../index.md#coinquantity)[]

Retrieves an array of CoinQuantity for each coin output present in the transaction.
a transaction.

#### Returns

[`CoinQuantity`](../index.md#coinquantity)[]

CoinQuantity array.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`getCoinOutputsQuantities`](BaseTransactionRequest.md#getcoinoutputsquantities)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:647](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L647)

***

### getTransactionId()

> **getTransactionId**(`chainId`): `string`

Gets the Transaction Request by hashing the transaction.

#### Parameters

• **chainId**: `number`

The chain ID.

#### Returns

`string`

- A hash of the transaction, which is the transaction ID.

#### Overrides

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`getTransactionId`](BaseTransactionRequest.md#gettransactionid)

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:65](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L65)

***

### metadataGas()

> **metadataGas**(`gasCosts`): `BN`

Calculates the metadata gas cost for a blob transaction.

#### Parameters

• **gasCosts**: [`GasCosts`](../index.md#gascosts-1)

gas costs passed from the chain.

#### Returns

`BN`

metadata gas cost for the blob transaction.

#### Overrides

`BaseTransactionRequest.metadataGas`

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:75](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L75)

***

### removeWitness()

> **removeWitness**(`index`): `void`

#### Parameters

• **index**: `number`

#### Returns

`void`

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`removeWitness`](BaseTransactionRequest.md#removewitness)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:675](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L675)

***

### toJSON()

> **toJSON**(): `any`

Return the minimum amount in native coins required to create
a transaction.

#### Returns

`any`

The transaction as a JSON object.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`toJSON`](BaseTransactionRequest.md#tojson)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:671](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L671)

***

### toTransaction()

> **toTransaction**(): `TransactionBlob`

Converts the transaction request to a `TransactionBlob`.

#### Returns

`TransactionBlob`

The transaction create object.

#### Overrides

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`toTransaction`](BaseTransactionRequest.md#totransaction)

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:47](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L47)

***

### toTransactionBytes()

> **toTransactionBytes**(): `Uint8Array`

Converts the transaction request to a byte array.

#### Returns

`Uint8Array`

The transaction bytes.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`toTransactionBytes`](BaseTransactionRequest.md#totransactionbytes)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:210](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L210)

***

### updatePredicateGasUsed()

> **updatePredicateGasUsed**(`inputs`): `void`

#### Parameters

• **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[]

#### Returns

`void`

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`updatePredicateGasUsed`](BaseTransactionRequest.md#updatepredicategasused)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:689](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L689)

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

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`updateWitness`](BaseTransactionRequest.md#updatewitness)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:281](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L281)

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

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`updateWitnessByOwner`](BaseTransactionRequest.md#updatewitnessbyowner)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:266](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L266)

***

### from()

> `static` **from**(`obj`): [`BlobTransactionRequest`](BlobTransactionRequest.md)

#### Parameters

• **obj**: [`BlobTransactionRequestLike`](./BlobTransactionRequestLike.md)

#### Returns

[`BlobTransactionRequest`](BlobTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/blob-transaction-request.ts:20](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/blob-transaction-request.ts#L20)

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

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`getPolicyMeta`](BaseTransactionRequest.md#getpolicymeta)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:145](https://github.com/FuelLabs/fuels-ts/blob/f2f18fa0b7b675b5fd86d7a2e5587e757a054fae/packages/account/src/providers/transaction-request/transaction-request.ts#L145)
