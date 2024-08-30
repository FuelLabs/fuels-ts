[**@fuel-ts/account v0.94.3**](../index.md) • **Docs**

***

# Class: ScriptTransactionRequest

`ScriptTransactionRequest` provides functionalities for creating a transaction request that uses a script.

## Extends

- [`BaseTransactionRequest`](BaseTransactionRequest.md)

## Constructors

### new ScriptTransactionRequest()

> **new ScriptTransactionRequest**(`scriptTransactionRequestLike`): [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

Constructor for `ScriptTransactionRequest`.

#### Parameters

• **scriptTransactionRequestLike**: `ScriptTransactionRequestLike` = `{}`

The initial values for the instance.

#### Returns

[`ScriptTransactionRequest`](ScriptTransactionRequest.md)

#### Overrides

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`constructor`](BaseTransactionRequest.md#constructors)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:64](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L64)

## Properties

### abis?

> `optional` **abis**: [`JsonAbisFromAllCalls`](../index.md#jsonabisfromallcalls)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:57](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L57)

***

### gasLimit

> **gasLimit**: `BN`

Gas limit for transaction

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:51](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L51)

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

### script

> **script**: `Uint8Array`

Script to execute

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:53](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L53)

***

### scriptData

> **scriptData**: `Uint8Array`

Script input data (parameters)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:55](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L55)

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

> **type**: [`Script`](./TransactionType.md#script)

Type of the transaction

#### Overrides

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`type`](BaseTransactionRequest.md#type)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:49](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L49)

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

> **addAccountWitnesses**(`account`): `Promise`\&lt;[`ScriptTransactionRequest`](ScriptTransactionRequest.md)\>

Helper function to add an external signature to the transaction.

#### Parameters

• **account**: [`Account`](Account.md) \| [`Account`](Account.md)[]

The account/s to sign to the transaction.

#### Returns

`Promise`\&lt;[`ScriptTransactionRequest`](ScriptTransactionRequest.md)\>

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

> **addCoinOutput**(`to`, `amount`, `assetId`): [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

Adds a coin output to the transaction.

#### Parameters

• **to**: [`AddressLike`](../Interfaces/index.md#addresslike)

Address of the owner.

• **amount**: `BigNumberish`

Amount of coin.

• **assetId**: [`BytesLike`](../Interfaces/index.md#byteslike)

Asset ID of coin.

#### Returns

[`ScriptTransactionRequest`](ScriptTransactionRequest.md)

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addCoinOutput`](BaseTransactionRequest.md#addcoinoutput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:472](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L472)

***

### addCoinOutputs()

> **addCoinOutputs**(`to`, `quantities`): [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

Adds multiple coin outputs to the transaction.

#### Parameters

• **to**: [`AddressLike`](../Interfaces/index.md#addresslike)

Address of the destination.

• **quantities**: [`CoinQuantityLike`](../index.md#coinquantitylike)[]

Quantities of coins.

#### Returns

[`ScriptTransactionRequest`](ScriptTransactionRequest.md)

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addCoinOutputs`](BaseTransactionRequest.md#addcoinoutputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:489](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L489)

***

### addContractInputAndOutput()

> **addContractInputAndOutput**(`contract`): [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

Adds a contract input and output to the transaction request.

#### Parameters

• **contract**: [`ContractIdLike`](../Interfaces/index.md#contractidlike)

The contract ID.

#### Returns

[`ScriptTransactionRequest`](ScriptTransactionRequest.md)

The current instance of the `ScriptTransactionRequest`.

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:190](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L190)

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

> **addResource**(`resource`): [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

Adds a single resource to the transaction by adding a coin/message input and a
change output for the related assetId, if one it was not added yet.

#### Parameters

• **resource**: [`Resource`](../index.md#resource)

The resource to add.

#### Returns

[`ScriptTransactionRequest`](ScriptTransactionRequest.md)

This transaction.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addResource`](BaseTransactionRequest.md#addresource)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:442](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L442)

***

### addResources()

> **addResources**(`resources`): [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

Adds multiple resources to the transaction by adding coin/message inputs and change
outputs from the related assetIds.

#### Parameters

• **resources**: readonly [`Resource`](../index.md#resource)[]

The resources to add.

#### Returns

[`ScriptTransactionRequest`](ScriptTransactionRequest.md)

This transaction.

#### Inherited from

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`addResources`](BaseTransactionRequest.md#addresources)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:459](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/transaction-request.ts#L459)

***

### addVariableOutputs()

> **addVariableOutputs**(`numberOfVariables`): `number`

Adds variable outputs to the transaction request.

#### Parameters

• **numberOfVariables**: `number` = `1`

The number of variables to add.

#### Returns

`number`

The new length of the outputs array.

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:142](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L142)

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

Calculates the maximum gas for the transaction.

#### Parameters

• **chainInfo**: [`ChainInfo`](../index.md#chaininfo)

The chain information.

• **minGas**: `BN`

The minimum gas.

#### Returns

`BN`

the maximum gas.

#### Overrides

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`calculateMaxGas`](BaseTransactionRequest.md#calculatemaxgas)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:162](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L162)

***

### fundWithFakeUtxos()

> **fundWithFakeUtxos**(`quantities`, `baseAssetId`, `resourcesOwner`?): [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

Funds the transaction with fake UTXOs for each assetId and amount in the
quantities array.

#### Parameters

• **quantities**: [`CoinQuantity`](../index.md#coinquantity)[]

CoinQuantity Array.

• **baseAssetId**: `string`

The base asset to fund the transaction.

• **resourcesOwner?**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Returns

[`ScriptTransactionRequest`](ScriptTransactionRequest.md)

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

### getContractInputs()

> **getContractInputs**(): [`ContractTransactionRequestInput`](../index.md#contracttransactionrequestinput)[]

Get contract inputs for the transaction.

#### Returns

[`ContractTransactionRequestInput`](../index.md#contracttransactionrequestinput)[]

An array of contract transaction request inputs.

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:97](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L97)

***

### getContractOutputs()

> **getContractOutputs**(): [`ContractTransactionRequestOutput`](../index.md#contracttransactionrequestoutput)[]

Get contract outputs for the transaction.

#### Returns

[`ContractTransactionRequestOutput`](../index.md#contracttransactionrequestoutput)[]

An array of contract transaction request outputs.

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:108](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L108)

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

[packages/account/src/providers/transaction-request/script-transaction-request.ts:219](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L219)

***

### getVariableOutputs()

> **getVariableOutputs**(): [`VariableTransactionRequestOutput`](../index.md#variabletransactionrequestoutput)[]

Get variable outputs for the transaction.

#### Returns

[`VariableTransactionRequestOutput`](../index.md#variabletransactionrequestoutput)[]

An array of variable transaction request outputs.

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:119](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L119)

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

### setData()

> **setData**(`abi`, `args`): [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

Sets the data for the transaction request.

#### Parameters

• **abi**: `JsonAbi`

Script JSON ABI.

• **args**: `InputValue`[]

The input arguments.

#### Returns

[`ScriptTransactionRequest`](ScriptTransactionRequest.md)

The current instance of the `ScriptTransactionRequest`.

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:230](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L230)

***

### setScript()

> **setScript**\&lt;`T`\>(`script`, `data`): `void`

Set the script and its data.

#### Type Parameters

• **T**

#### Parameters

• **script**: `AbstractScriptRequest`\&lt;`T`\>

The abstract script request.

• **data**: `T`

The script data.

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:131](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L131)

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

> **toTransaction**(): `TransactionScript`

Converts the transaction request to a `TransactionScript`.

#### Returns

`TransactionScript`

The transaction script object.

#### Overrides

[`BaseTransactionRequest`](BaseTransactionRequest.md).[`toTransaction`](BaseTransactionRequest.md#totransaction)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:77](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L77)

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

> `static` **from**(`obj`): [`ScriptTransactionRequest`](ScriptTransactionRequest.md)

#### Parameters

• **obj**: `ScriptTransactionRequestLike`

#### Returns

[`ScriptTransactionRequest`](ScriptTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:41](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/providers/transaction-request/script-transaction-request.ts#L41)

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
