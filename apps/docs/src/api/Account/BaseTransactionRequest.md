[**@fuel-ts/account v0.94.3**](../index.md) • **Docs**

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

[packages/account/src/providers/transaction-request/transaction-request.ts:124](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L124)

## Properties

### inputs

> **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

`BaseTransactionRequestLike.inputs`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:113](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L113)

***

### maturity?

> `optional` **maturity**: `number`

Block until which tx cannot be included

#### Implementation of

`BaseTransactionRequestLike.maturity`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:107](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L107)

***

### maxFee

> **maxFee**: `BN`

The maximum fee payable by this transaction using BASE_ASSET.

#### Implementation of

`BaseTransactionRequestLike.maxFee`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:109](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L109)

***

### outputs

> **outputs**: [`TransactionRequestOutput`](../index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

`BaseTransactionRequestLike.outputs`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:115](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L115)

***

### tip?

> `optional` **tip**: `BN`

Gas price for transaction

#### Implementation of

`BaseTransactionRequestLike.tip`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:105](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L105)

***

### type

> `abstract` **type**: [`TransactionType`](./TransactionType.md)

Type of the transaction

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:103](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L103)

***

### witnessLimit?

> `optional` **witnessLimit**: `BN`

The maximum amount of witness data allowed for the transaction

#### Implementation of

`BaseTransactionRequestLike.witnessLimit`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:111](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L111)

***

### witnesses

> **witnesses**: [`BytesLike`](../Interfaces/index.md#byteslike)[] = `[]`

List of witnesses

#### Implementation of

`BaseTransactionRequestLike.witnesses`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:117](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L117)

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:360](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L360)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:472](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L472)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:489](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L489)

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:401](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L401)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:442](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L442)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:459](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L459)

***

### byteLength()

> **byteLength**(): `number`

#### Returns

`number`

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:556](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L556)

***

### fundWithFakeUtxos()

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:583](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L583)

***

### getBaseTransaction()

> `protected` **getBaseTransaction**(): `ToBaseTransactionResponse`

Method to obtain the base transaction details.

#### Returns

`ToBaseTransactionResponse`

The base transaction details.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:176](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L176)

***

### getChangeOutputs()

> **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

Gets the change outputs for a transaction.

#### Returns

[`ChangeTransactionRequestOutput`](../index.md#changetransactionrequestoutput)[]

The change outputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:324](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L324)

***

### getCoinInputs()

> **getCoinInputs**(): [`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

Gets the coin inputs for a transaction.

#### Returns

[`CoinTransactionRequestInput`](../index.md#cointransactionrequestinput)[]

The coin inputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:302](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L302)

***

### getCoinOutputs()

> **getCoinOutputs**(): [`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

Gets the coin outputs for a transaction.

#### Returns

[`CoinTransactionRequestOutput`](../index.md#cointransactionrequestoutput)[]

The coin outputs.

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:634](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L634)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:650](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L650)

***

### removeWitness()

> **removeWitness**(`index`): `void`

#### Parameters

• **index**: `number`

#### Returns

`void`

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:658](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L658)

***

### toTransaction()

> `abstract` **toTransaction**(): `TransactionScript` \| `TransactionCreate` \| `TransactionBlob`

#### Returns

`TransactionScript` \| `TransactionCreate` \| `TransactionBlob`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:195](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L195)

***

### toTransactionBytes()

> **toTransactionBytes**(): `Uint8Array`

Converts the transaction request to a byte array.

#### Returns

`Uint8Array`

The transaction bytes.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:202](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L202)

***

### updatePredicateGasUsed()

> **updatePredicateGasUsed**(`inputs`): `void`

#### Parameters

• **inputs**: [`TransactionRequestInput`](../index.md#transactionrequestinput)[]

#### Returns

`void`

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:258](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L258)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:142](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L142)
