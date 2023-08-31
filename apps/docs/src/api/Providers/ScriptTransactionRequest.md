# Class: ScriptTransactionRequest

[@fuel-ts/providers](/api/Providers/index.md).ScriptTransactionRequest

`ScriptTransactionRequest` provides functionalities for creating a transaction request that uses a script.

## Hierarchy

- [`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

  ↳ **`ScriptTransactionRequest`**

## Constructors

### constructor

• **new ScriptTransactionRequest**(`scriptTransactionRequestLike?`)

Constructor for `ScriptTransactionRequest`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scriptTransactionRequestLike` | `ScriptTransactionRequestLike` | The initial values for the instance. |

#### Overrides

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[constructor](/api/Providers/BaseTransactionRequest.md#constructor)

#### Defined in

[packages/providers/src/transaction-request/script-transaction-request.ts:50](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/script-transaction-request.ts#L50)

## Properties

### gasLimit

• **gasLimit**: `BN`

Gas limit for transaction

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[gasLimit](/api/Providers/BaseTransactionRequest.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:67](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L67)

___

### gasPrice

• **gasPrice**: `BN`

Gas price for transaction

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[gasPrice](/api/Providers/BaseTransactionRequest.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:65](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L65)

___

### inputs

• **inputs**: [`TransactionRequestInput`](/api/Providers/index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[inputs](/api/Providers/BaseTransactionRequest.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:71](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L71)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[maturity](/api/Providers/BaseTransactionRequest.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:69](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L69)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](/api/Providers/index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[outputs](/api/Providers/BaseTransactionRequest.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:73](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L73)

___

### script

• **script**: `Uint8Array`

Script to execute

#### Defined in

[packages/providers/src/transaction-request/script-transaction-request.ts:41](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/script-transaction-request.ts#L41)

___

### scriptData

• **scriptData**: `Uint8Array`

Script input data (parameters)

#### Defined in

[packages/providers/src/transaction-request/script-transaction-request.ts:43](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/script-transaction-request.ts#L43)

___

### type

• **type**: [`Script`](/api/Providers/TransactionType.md#script)

Type of the transaction

#### Overrides

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[type](/api/Providers/BaseTransactionRequest.md#type)

#### Defined in

[packages/providers/src/transaction-request/script-transaction-request.ts:39](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/script-transaction-request.ts#L39)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[witnesses](/api/Providers/BaseTransactionRequest.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:75](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L75)

## Methods

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId?`): `void`

Adds a coin input to the transaction.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | `undefined` | Address of the owner. |
| `amount` | `BigNumberish` | `undefined` | Amount of coin. |
| `assetId` | `BytesLike` | `BaseAssetId` | Asset ID of coin. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[addCoinOutput](/api/Providers/BaseTransactionRequest.md#addcoinoutput)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:339](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L339)

___

### addCoinOutputs

▸ **addCoinOutputs**(`to`, `quantities`): `void`

Adds multiple coin outputs to the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | Address of the destination. |
| `quantities` | [`CoinQuantityLike`](/api/Providers/index.md#coinquantitylike)[] | Quantities of coins. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[addCoinOutputs](/api/Providers/BaseTransactionRequest.md#addcoinoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:361](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L361)

___

### addContractInputAndOutput

▸ **addContractInputAndOutput**(`contract`): [`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

Adds a contract input and output to the transaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | [`ContractIdLike`](/api/Interfaces/index.md#contractidlike) | The contract ID. |

#### Returns

[`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

The current instance of the `ScriptTransactionRequest`.

#### Defined in

[packages/providers/src/transaction-request/script-transaction-request.ts:144](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/script-transaction-request.ts#L144)

___

### addResourceInputAndOutput

▸ **addResourceInputAndOutput**(`resource`): [`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

Adds a single resource to the transaction by adding inputs and outputs.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`Resource`](/api/Providers/index.md#resource) |

#### Returns

[`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

This transaction.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[addResourceInputAndOutput](/api/Providers/BaseTransactionRequest.md#addresourceinputandoutput)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:267](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L267)

___

### addResourceInputsAndOutputs

▸ **addResourceInputsAndOutputs**(`resources`): [`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

Adds multiple resources to the transaction by adding inputs and outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resources` | readonly [`Resource`](/api/Providers/index.md#resource)[] | The resources to add. |

#### Returns

[`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

This transaction.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[addResourceInputsAndOutputs](/api/Providers/BaseTransactionRequest.md#addresourceinputsandoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:326](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L326)

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

[packages/providers/src/transaction-request/script-transaction-request.ts:125](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/script-transaction-request.ts#L125)

___

### calculateFee

▸ **calculateFee**(): [`CoinQuantity`](/api/Providers/index.md#coinquantity)

Return the minimum amount in native coins required to create
a transaction. This is required even if the gasPrice is 0.

#### Returns

[`CoinQuantity`](/api/Providers/index.md#coinquantity)

The minimum amount in coins required to create a transaction.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[calculateFee](/api/Providers/BaseTransactionRequest.md#calculatefee)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:398](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L398)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`&lt;`TransactionScript` \| `TransactionCreate`, ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof `BaseTransactionRequestLike`\>

Method to obtain the base transaction details.

#### Returns

`Pick`&lt;`TransactionScript` \| `TransactionCreate`, ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof `BaseTransactionRequestLike`\>

The base transaction details.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[getBaseTransaction](/api/Providers/BaseTransactionRequest.md#getbasetransaction)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:103](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L103)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](/api/Providers/index.md#changetransactionrequestoutput)[]

Gets the change outputs for a transaction.

#### Returns

[`ChangeTransactionRequestOutput`](/api/Providers/index.md#changetransactionrequestoutput)[]

The change outputs.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[getChangeOutputs](/api/Providers/BaseTransactionRequest.md#getchangeoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:218](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L218)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](/api/Providers/index.md#cointransactionrequestinput)[]

Gets the coin inputs for a transaction.

#### Returns

[`CoinTransactionRequestInput`](/api/Providers/index.md#cointransactionrequestinput)[]

The coin inputs.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[getCoinInputs](/api/Providers/BaseTransactionRequest.md#getcoininputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:196](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L196)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](/api/Providers/index.md#cointransactionrequestoutput)[]

Gets the coin outputs for a transaction.

#### Returns

[`CoinTransactionRequestOutput`](/api/Providers/index.md#cointransactionrequestoutput)[]

The coin outputs.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[getCoinOutputs](/api/Providers/BaseTransactionRequest.md#getcoinoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:207](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L207)

___

### getContractInputs

▸ **getContractInputs**(): [`ContractTransactionRequestInput`](/api/Providers/index.md#contracttransactionrequestinput)[]

Get contract inputs for the transaction.

#### Returns

[`ContractTransactionRequestInput`](/api/Providers/index.md#contracttransactionrequestinput)[]

An array of contract transaction request inputs.

#### Defined in

[packages/providers/src/transaction-request/script-transaction-request.ts:80](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/script-transaction-request.ts#L80)

___

### getContractOutputs

▸ **getContractOutputs**(): [`ContractTransactionRequestOutput`](/api/Providers/index.md#contracttransactionrequestoutput)[]

Get contract outputs for the transaction.

#### Returns

[`ContractTransactionRequestOutput`](/api/Providers/index.md#contracttransactionrequestoutput)[]

An array of contract transaction request outputs.

#### Defined in

[packages/providers/src/transaction-request/script-transaction-request.ts:91](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/script-transaction-request.ts#L91)

___

### getVariableOutputs

▸ **getVariableOutputs**(): [`VariableTransactionRequestOutput`](/api/Providers/index.md#variabletransactionrequestoutput)[]

Get variable outputs for the transaction.

#### Returns

[`VariableTransactionRequestOutput`](/api/Providers/index.md#variabletransactionrequestoutput)[]

An array of variable transaction request outputs.

#### Defined in

[packages/providers/src/transaction-request/script-transaction-request.ts:102](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/script-transaction-request.ts#L102)

___

### setData

▸ **setData**(`abi`, `args`): [`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

Sets the data for the transaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `abi` | `JsonAbi` | Script JSON ABI. |
| `args` | `InputValue`[] | The input arguments. |

#### Returns

[`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

The current instance of the `ScriptTransactionRequest`.

#### Defined in

[packages/providers/src/transaction-request/script-transaction-request.ts:173](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/script-transaction-request.ts#L173)

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

[packages/providers/src/transaction-request/script-transaction-request.ts:114](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/script-transaction-request.ts#L114)

___

### toJSON

▸ **toJSON**(): `any`

Return the minimum amount in native coins required to create
a transaction.

#### Returns

`any`

The transaction as a JSON object.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[toJSON](/api/Providers/BaseTransactionRequest.md#tojson)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:413](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L413)

___

### toTransaction

▸ **toTransaction**(): `TransactionScript`

Converts the transaction request to a `TransactionScript`.

#### Returns

`TransactionScript`

The transaction script object.

#### Overrides

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[toTransaction](/api/Providers/BaseTransactionRequest.md#totransaction)

#### Defined in

[packages/providers/src/transaction-request/script-transaction-request.ts:61](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/script-transaction-request.ts#L61)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

Converts the transaction request to a byte array.

#### Returns

`Uint8Array`

The transaction bytes.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[toTransactionBytes](/api/Providers/BaseTransactionRequest.md#totransactionbytes)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:130](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L130)

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
| `witness` | `BytesLike` | The new witness. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[updateWitness](/api/Providers/BaseTransactionRequest.md#updatewitness)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:184](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L184)

___

### updateWitnessByCoinInputOwner

▸ **updateWitnessByCoinInputOwner**(`owner`, `witness`): `void`

Updates the witness for the given CoinInput owner.

**`Throws`**

If no witness exists for the given owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | The owner of the CoinInput. |
| `witness` | `BytesLike` | The witness to update. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[updateWitnessByCoinInputOwner](/api/Providers/BaseTransactionRequest.md#updatewitnessbycoininputowner)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:251](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L251)

___

### updateWitnessByOwner

▸ **updateWitnessByOwner**(`address`, `signature`): `void`

Updates the witness for a given owner and signature.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get the coin input witness index for. |
| `signature` | `BytesLike` | The signature to update the witness with. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[updateWitnessByOwner](/api/Providers/BaseTransactionRequest.md#updatewitnessbyowner)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:170](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L170)

___

### from

▸ `Static` **from**(`obj`): [`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `ScriptTransactionRequestLike` |

#### Returns

[`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/script-transaction-request.ts:31](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/script-transaction-request.ts#L31)
