# Class: ScriptTransactionRequest

[@fuel-ts/account](/api/Account/index.md).ScriptTransactionRequest

`ScriptTransactionRequest` provides functionalities for creating a transaction request that uses a script.

## Hierarchy

- [`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

  ↳ **`ScriptTransactionRequest`**

## Constructors

### constructor

• **new ScriptTransactionRequest**(`scriptTransactionRequestLike?`): [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

Constructor for `ScriptTransactionRequest`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scriptTransactionRequestLike` | `ScriptTransactionRequestLike` | The initial values for the instance. |

#### Returns

[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

#### Overrides

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[constructor](/api/Account/BaseTransactionRequest.md#constructor)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:64](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L64)

## Properties

### abis

• `Optional` **abis**: [`JsonAbisFromAllCalls`](/api/Account/index.md#jsonabisfromallcalls)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:57](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L57)

___

### gasLimit

• **gasLimit**: `BN`

Gas limit for transaction

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:51](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L51)

___

### inputs

• **inputs**: [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[inputs](/api/Account/BaseTransactionRequest.md#inputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:107](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L107)

___

### maturity

• `Optional` **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[maturity](/api/Account/BaseTransactionRequest.md#maturity)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:101](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L101)

___

### maxFee

• **maxFee**: `BN`

The maximum fee payable by this transaction using BASE_ASSET.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[maxFee](/api/Account/BaseTransactionRequest.md#maxfee)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:103](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L103)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](/api/Account/index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[outputs](/api/Account/BaseTransactionRequest.md#outputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:109](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L109)

___

### script

• **script**: `Uint8Array`

Script to execute

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:53](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L53)

___

### scriptData

• **scriptData**: `Uint8Array`

Script input data (parameters)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:55](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L55)

___

### tip

• `Optional` **tip**: `BN`

Gas price for transaction

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[tip](/api/Account/BaseTransactionRequest.md#tip)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:99](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L99)

___

### type

• **type**: [`Script`](/api/Account/TransactionType.md#script)

Type of the transaction

#### Overrides

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[type](/api/Account/BaseTransactionRequest.md#type)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:49](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L49)

___

### witnessLimit

• `Optional` **witnessLimit**: `BN`

The maximum amount of witness data allowed for the transaction

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[witnessLimit](/api/Account/BaseTransactionRequest.md#witnesslimit)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:105](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L105)

___

### witnesses

• **witnesses**: [`BytesLike`](/api/Interfaces/index.md#byteslike)[] = `[]`

List of witnesses

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[witnesses](/api/Account/BaseTransactionRequest.md#witnesses)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:111](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L111)

## Methods

### addAccountWitnesses

▸ **addAccountWitnesses**(`account`): `Promise`&lt;[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)\>

Helper function to add an external signature to the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | [`Account`](/api/Account/Account.md) \| [`Account`](/api/Account/Account.md)[] | The account/s to sign to the transaction. |

#### Returns

`Promise`&lt;[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)\>

The transaction with the signature witness added.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addAccountWitnesses](/api/Account/BaseTransactionRequest.md#addaccountwitnesses)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:280](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L280)

___

### addChangeOutput

▸ **addChangeOutput**(`to`, `assetId`): `void`

Adds a change output to the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | Address of the owner. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Asset ID of coin. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addChangeOutput](/api/Account/BaseTransactionRequest.md#addchangeoutput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:502](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L502)

___

### addCoinInput

▸ **addCoinInput**(`coin`): `void`

Adds a single coin input to the transaction and a change output for the related
assetId, if one it was not added yet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coin` | [`Coin`](/api/Account/index.md#coin) | Coin resource. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addCoinInput](/api/Account/BaseTransactionRequest.md#addcoininput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:354](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L354)

___

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId`): [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

Adds a coin output to the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | Address of the owner. |
| `amount` | `BigNumberish` | Amount of coin. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Asset ID of coin. |

#### Returns

[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addCoinOutput](/api/Account/BaseTransactionRequest.md#addcoinoutput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:466](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L466)

___

### addCoinOutputs

▸ **addCoinOutputs**(`to`, `quantities`): [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

Adds multiple coin outputs to the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | Address of the destination. |
| `quantities` | [`CoinQuantityLike`](/api/Account/index.md#coinquantitylike)[] | Quantities of coins. |

#### Returns

[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addCoinOutputs](/api/Account/BaseTransactionRequest.md#addcoinoutputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:483](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L483)

___

### addContractInputAndOutput

▸ **addContractInputAndOutput**(`contract`): [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

Adds a contract input and output to the transaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | [`ContractIdLike`](/api/Interfaces/index.md#contractidlike) | The contract ID. |

#### Returns

[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

The current instance of the `ScriptTransactionRequest`.

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:190](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L190)

___

### addMessageInput

▸ **addMessageInput**(`message`): `void`

Adds a single message input to the transaction and a change output for the
asset against the message

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`MessageCoin`](/api/Account/index.md#messagecoin) | Message resource. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addMessageInput](/api/Account/BaseTransactionRequest.md#addmessageinput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:395](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L395)

___

### addResource

▸ **addResource**(`resource`): [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

Adds a single resource to the transaction by adding a coin/message input and a
change output for the related assetId, if one it was not added yet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resource` | [`Resource`](/api/Account/index.md#resource) | The resource to add. |

#### Returns

[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

This transaction.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addResource](/api/Account/BaseTransactionRequest.md#addresource)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:436](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L436)

___

### addResources

▸ **addResources**(`resources`): [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

Adds multiple resources to the transaction by adding coin/message inputs and change
outputs from the related assetIds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resources` | readonly [`Resource`](/api/Account/index.md#resource)[] | The resources to add. |

#### Returns

[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

This transaction.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addResources](/api/Account/BaseTransactionRequest.md#addresources)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:453](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L453)

___

### addVariableOutputs

▸ **addVariableOutputs**(`numberOfVariables?`): `number`

Adds variable outputs to the transaction request.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `numberOfVariables` | `number` | `1` | The number of variables to add. |

#### Returns

`number`

The new length of the outputs array.

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:142](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L142)

___

### calculateMaxGas

▸ **calculateMaxGas**(`chainInfo`, `minGas`): `BN`

Calculates the maximum gas for the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainInfo` | [`ChainInfo`](/api/Account/index.md#chaininfo) | The chain information. |
| `minGas` | `BN` | The minimum gas. |

#### Returns

`BN`

the maximum gas.

#### Overrides

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[calculateMaxGas](/api/Account/BaseTransactionRequest.md#calculatemaxgas)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:162](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L162)

___

### fundWithFakeUtxos

▸ **fundWithFakeUtxos**(`quantities`, `baseAssetId`, `resourcesOwner?`): `void`

Funds the transaction with fake UTXOs for each assetId and amount in the
quantities array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quantities` | [`CoinQuantity`](/api/Account/index.md#coinquantity)[] | CoinQuantity Array. |
| `baseAssetId` | `string` | The base asset to fund the transaction. |
| `resourcesOwner?` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | - |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[fundWithFakeUtxos](/api/Account/BaseTransactionRequest.md#fundwithfakeutxos)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:577](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L577)

___

### getBaseTransaction

▸ **getBaseTransaction**(): `ToBaseTransactionResponse`

Method to obtain the base transaction details.

#### Returns

`ToBaseTransactionResponse`

The base transaction details.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[getBaseTransaction](/api/Account/BaseTransactionRequest.md#getbasetransaction)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:170](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L170)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](/api/Account/index.md#changetransactionrequestoutput)[]

Gets the change outputs for a transaction.

#### Returns

[`ChangeTransactionRequestOutput`](/api/Account/index.md#changetransactionrequestoutput)[]

The change outputs.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[getChangeOutputs](/api/Account/BaseTransactionRequest.md#getchangeoutputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:318](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L318)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](/api/Account/index.md#cointransactionrequestinput)[]

Gets the coin inputs for a transaction.

#### Returns

[`CoinTransactionRequestInput`](/api/Account/index.md#cointransactionrequestinput)[]

The coin inputs.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[getCoinInputs](/api/Account/BaseTransactionRequest.md#getcoininputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:296](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L296)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](/api/Account/index.md#cointransactionrequestoutput)[]

Gets the coin outputs for a transaction.

#### Returns

[`CoinTransactionRequestOutput`](/api/Account/index.md#cointransactionrequestoutput)[]

The coin outputs.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[getCoinOutputs](/api/Account/BaseTransactionRequest.md#getcoinoutputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:307](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L307)

___

### getCoinOutputsQuantities

▸ **getCoinOutputsQuantities**(): [`CoinQuantity`](/api/Account/index.md#coinquantity)[]

Retrieves an array of CoinQuantity for each coin output present in the transaction.
a transaction.

#### Returns

[`CoinQuantity`](/api/Account/index.md#coinquantity)[]

CoinQuantity array.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[getCoinOutputsQuantities](/api/Account/BaseTransactionRequest.md#getcoinoutputsquantities)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:626](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L626)

___

### getContractInputs

▸ **getContractInputs**(): [`ContractTransactionRequestInput`](/api/Account/index.md#contracttransactionrequestinput)[]

Get contract inputs for the transaction.

#### Returns

[`ContractTransactionRequestInput`](/api/Account/index.md#contracttransactionrequestinput)[]

An array of contract transaction request inputs.

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:97](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L97)

___

### getContractOutputs

▸ **getContractOutputs**(): [`ContractTransactionRequestOutput`](/api/Account/index.md#contracttransactionrequestoutput)[]

Get contract outputs for the transaction.

#### Returns

[`ContractTransactionRequestOutput`](/api/Account/index.md#contracttransactionrequestoutput)[]

An array of contract transaction request outputs.

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:108](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L108)

___

### getTransactionId

▸ **getTransactionId**(`chainId`): `string`

Gets the Transaction Request by hashing the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `number` | The chain ID. |

#### Returns

`string`

- A hash of the transaction, which is the transaction ID.

#### Overrides

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[getTransactionId](/api/Account/BaseTransactionRequest.md#gettransactionid)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:219](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L219)

___

### getVariableOutputs

▸ **getVariableOutputs**(): [`VariableTransactionRequestOutput`](/api/Account/index.md#variabletransactionrequestoutput)[]

Get variable outputs for the transaction.

#### Returns

[`VariableTransactionRequestOutput`](/api/Account/index.md#variabletransactionrequestoutput)[]

An array of variable transaction request outputs.

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:119](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L119)

___

### metadataGas

▸ **metadataGas**(`gasCosts`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `gasCosts` | [`GasCosts`](/api/Account/index.md#gascosts) |

#### Returns

`BN`

#### Overrides

BaseTransactionRequest.metadataGas

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:236](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L236)

___

### removeWitness

▸ **removeWitness**(`index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[removeWitness](/api/Account/BaseTransactionRequest.md#removewitness)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:654](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L654)

___

### setData

▸ **setData**(`abi`, `args`): [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

Sets the data for the transaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `abi` | `JsonAbi` | Script JSON ABI. |
| `args` | `InputValue`[] | The input arguments. |

#### Returns

[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

The current instance of the `ScriptTransactionRequest`.

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:230](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L230)

___

### setScript

▸ **setScript**&lt;`T`\>(`script`, `data`): `void`

Set the script and its data.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `script` | `AbstractScriptRequest`&lt;`T`\> | The abstract script request. |
| `data` | `T` | The script data. |

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:131](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L131)

___

### toJSON

▸ **toJSON**(): `any`

Return the minimum amount in native coins required to create
a transaction.

#### Returns

`any`

The transaction as a JSON object.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[toJSON](/api/Account/BaseTransactionRequest.md#tojson)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:650](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L650)

___

### toTransaction

▸ **toTransaction**(): `TransactionScript`

Converts the transaction request to a `TransactionScript`.

#### Returns

`TransactionScript`

The transaction script object.

#### Overrides

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[toTransaction](/api/Account/BaseTransactionRequest.md#totransaction)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:77](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L77)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

Converts the transaction request to a byte array.

#### Returns

`Uint8Array`

The transaction bytes.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[toTransactionBytes](/api/Account/BaseTransactionRequest.md#totransactionbytes)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:196](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L196)

___

### updatePredicateGasUsed

▸ **updatePredicateGasUsed**(`inputs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputs` | [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[updatePredicateGasUsed](/api/Account/BaseTransactionRequest.md#updatepredicategasused)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:668](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L668)

___

### updateWitness

▸ **updateWitness**(`index`, `witness`): `void`

Updates an existing witness without any side effects.

**`Throws`**

If the witness does not exist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the witness to update. |
| `witness` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The new witness. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[updateWitness](/api/Account/BaseTransactionRequest.md#updatewitness)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:267](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L267)

___

### updateWitnessByOwner

▸ **updateWitnessByOwner**(`address`, `signature`): `void`

Updates the witness for a given owner and signature.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get the coin input witness index for. |
| `signature` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The signature to update the witness with. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[updateWitnessByOwner](/api/Account/BaseTransactionRequest.md#updatewitnessbyowner)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:252](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L252)

___

### from

▸ **from**(`obj`): [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `ScriptTransactionRequestLike` |

#### Returns

[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/script-transaction-request.ts:41](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/script-transaction-request.ts#L41)

___

### getPolicyMeta

▸ **getPolicyMeta**(`req`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `policies` | `Policy`[] |
| `policyTypes` | `number` |

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[getPolicyMeta](/api/Account/BaseTransactionRequest.md#getpolicymeta)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:136](https://github.com/FuelLabs/fuels-ts/blob/12602001/packages/account/src/providers/transaction-request/transaction-request.ts#L136)
