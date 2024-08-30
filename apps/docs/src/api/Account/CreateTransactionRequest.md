[**@fuel-ts/account v0.94.3**](../index.md) • **Docs**

***

# Class: CreateTransactionRequest

`CreateTransactionRequest` provides functionalities for creating a transaction request that creates a contract.

## Extends

- [`BaseTransactionRequest`](BaseTransactionRequest.md)

## Constructors

### new CreateTransactionRequest()

> **new CreateTransactionRequest**(`createTransactionRequestLike`): [`CreateTransactionRequest`](CreateTransactionRequest.md)

Creates an instance `CreateTransactionRequest`.

#### Parameters

• **createTransactionRequestLike**: `CreateTransactionRequestLike`

The initial values for the instance

#### Returns

[`CreateTransactionRequest`](CreateTransactionRequest.md)

#### Overrides

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`constructor`](BaseTransactionRequest.md#constructors)

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:55](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/create-transaction-request.ts#L55)

## Properties

### bytecodeWitnessIndex

> **bytecodeWitnessIndex**: `number`

Witness index of contract bytecode to create

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:44](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/create-transaction-request.ts#L44)

***

### inputs

> **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`inputs`](BaseTransactionRequest.md#inputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:113](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L113)

***

### maturity?

> `optional` **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`maturity`](BaseTransactionRequest.md#maturity)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:107](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L107)

***

### maxFee

> **maxFee**: `BN`

The maximum fee payable by this transaction using BASE_ASSET.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`maxFee`](BaseTransactionRequest.md#maxfee)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:109](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L109)

***

### outputs

> **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`outputs`](BaseTransactionRequest.md#outputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:115](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L115)

***

### salt

> **salt**: `string`

Salt

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:46](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/create-transaction-request.ts#L46)

***

### storageSlots

> **storageSlots**: `TransactionRequestStorageSlot`[]

List of storage slots to initialize

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:48](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/create-transaction-request.ts#L48)

***

### tip?

> `optional` **tip**: `BN`

Gas price for transaction

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`tip`](BaseTransactionRequest.md#tip)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:105](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L105)

***

### type

> **type**: [`Create`](./TransactionType.md#create)

Type of the transaction

#### Overrides

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`type`](BaseTransactionRequest.md#type)

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:42](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/create-transaction-request.ts#L42)

***

### witnessLimit?

> `optional` **witnessLimit**: `BN`

The maximum amount of witness data allowed for the transaction

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`witnessLimit`](BaseTransactionRequest.md#witnesslimit)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:111](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L111)

***

### witnesses

> **witnesses**: [`BytesLike`](../Interfaces/index.md#byteslike)[] = `[]`

List of witnesses

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`witnesses`](BaseTransactionRequest.md#witnesses)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:117](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L117)

## Methods

### addAccountWitnesses()

> **addAccountWitnesses**(`account`): `Promise`\&lt;[`CreateTransactionRequest`](CreateTransactionRequest.md)\>

Helper function to add an external signature to the transaction.

#### Parameters

• **account**: [`Account`](Account.md) \| [`Account`](Account.md)[]

The account/s to sign to the transaction.

#### Returns

`Promise`\&lt;[`CreateTransactionRequest`](CreateTransactionRequest.md)\>

The transaction with the signature witness added.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addAccountWitnesses`](BaseTransactionRequest.md#addaccountwitnesses)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:286](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L286)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:508](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L508)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:360](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L360)

***

### addCoinOutput()

> **addCoinOutput**(`to`, `amount`, `assetId`): [`CreateTransactionRequest`](CreateTransactionRequest.md)

Adds a coin output to the transaction.

#### Parameters

• **to**: [`AddressLike`](../Interfaces/index.md#addresslike)

Address of the owner.

• **amount**: `BigNumberish`

Amount of coin.

• **assetId**: [`BytesLike`](../Interfaces/index.md#byteslike)

Asset ID of coin.

#### Returns

[`CreateTransactionRequest`](CreateTransactionRequest.md)

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addCoinOutput`](BaseTransactionRequest.md#addcoinoutput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:472](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L472)

***

### addCoinOutputs()

> **addCoinOutputs**(`to`, `quantities`): [`CreateTransactionRequest`](CreateTransactionRequest.md)

Adds multiple coin outputs to the transaction.

#### Parameters

• **to**: [`AddressLike`](../Interfaces/index.md#addresslike)

Address of the destination.

• **quantities**: [`CoinQuantityLike`](../index.md#coinquantitylike)[]

Quantities of coins.

#### Returns

[`CreateTransactionRequest`](CreateTransactionRequest.md)

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addCoinOutputs`](BaseTransactionRequest.md#addcoinoutputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:489](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L489)

***

### addContractCreatedOutput()

> **addContractCreatedOutput**(`contractId`, `stateRoot`): `void`

Adds a contract created output to the transaction request.

#### Parameters

• **contractId**: [`BytesLike`](../Interfaces/index.md#byteslike)

The contract ID.

• **stateRoot**: [`BytesLike`](../Interfaces/index.md#byteslike)

The state root.

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:110](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/create-transaction-request.ts#L110)

***

### addMessageInput()

> **addMessageInput**(`message`): `void`

Adds a single message input to the transaction and a change output for the
asset against the message

#### Parameters

• **message**: [`MessageCoin`](../index.md#messagecoin)

Message resource.

#### Returns

`void`

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addMessageInput`](BaseTransactionRequest.md#addmessageinput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:401](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L401)

***

### addResource()

> **addResource**(`resource`): [`CreateTransactionRequest`](CreateTransactionRequest.md)

Adds a single resource to the transaction by adding a coin/message input and a
change output for the related assetId, if one it was not added yet.

#### Parameters

• **resource**: [`Resource`](../index.md#resource)

The resource to add.

#### Returns

[`CreateTransactionRequest`](CreateTransactionRequest.md)

This transaction.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addResource`](BaseTransactionRequest.md#addresource)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:442](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L442)

***

### addResources()

> **addResources**(`resources`): [`CreateTransactionRequest`](CreateTransactionRequest.md)

Adds multiple resources to the transaction by adding coin/message inputs and change
outputs from the related assetIds.

#### Parameters

• **resources**: readonly [`Resource`](../index.md#resource)[]

The resources to add.

#### Returns

[`CreateTransactionRequest`](CreateTransactionRequest.md)

This transaction.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addResources`](BaseTransactionRequest.md#addresources)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:459](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L459)

***

### byteLength()

> **byteLength**(): `number`

#### Returns

`number`

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`byteLength`](BaseTransactionRequest.md#bytelength)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:696](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L696)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:556](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L556)

***

### fundWithFakeUtxos()

> **fundWithFakeUtxos**(`quantities`, `baseAssetId`, `resourcesOwner`?): [`CreateTransactionRequest`](CreateTransactionRequest.md)

Funds the transaction with fake UTXOs for each assetId and amount in the
quantities array.

#### Parameters

• **quantities**: [`CoinQuantity`](../index.md#coinquantity)[]

CoinQuantity Array.

• **baseAssetId**: `string`

The base asset to fund the transaction.

• **resourcesOwner?**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Returns

[`CreateTransactionRequest`](CreateTransactionRequest.md)

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`fundWithFakeUtxos`](BaseTransactionRequest.md#fundwithfakeutxos)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:583](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L583)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:176](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L176)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:324](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L324)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:302](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L302)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:313](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L313)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:634](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L634)

***

### getContractCreatedOutputs()

> **getContractCreatedOutputs**(): [`ContractCreatedTransactionRequestOutput`](../index.md#contractcreatedtransactionrequestoutput)[]

Get contract created outputs for the transaction.

#### Returns

[`ContractCreatedTransactionRequestOutput`](../index.md#contractcreatedtransactionrequestoutput)[]

An array of contract created transaction request outputs.

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:86](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/create-transaction-request.ts#L86)

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

[packages/account/src/providers/transaction-request/create-transaction-request.ts:100](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/create-transaction-request.ts#L100)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:662](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L662)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:658](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L658)

***

### toTransaction()

> **toTransaction**(): `TransactionCreate`

Converts the transaction request to a `TransactionCreate`.

#### Returns

`TransactionCreate`

The transaction create object.

#### Overrides

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`toTransaction`](BaseTransactionRequest.md#totransaction)

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:67](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/create-transaction-request.ts#L67)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:202](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L202)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:676](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L676)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:273](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L273)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:258](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L258)

***

### from()

> `static` **from**(`obj`): [`CreateTransactionRequest`](CreateTransactionRequest.md)

#### Parameters

• **obj**: `CreateTransactionRequestLike`

#### Returns

[`CreateTransactionRequest`](CreateTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:34](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/create-transaction-request.ts#L34)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:142](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L142)
