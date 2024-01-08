# Class: CreateTransactionRequest

[@fuel-ts/providers](/api/Providers/index.md).CreateTransactionRequest

`CreateTransactionRequest` provides functionalities for creating a transaction request that creates a contract.

## Hierarchy

- [`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

  ↳ **`CreateTransactionRequest`**

## Constructors

### constructor

• **new CreateTransactionRequest**(`createTransactionRequestLike?`): [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

Creates an instance `CreateTransactionRequest`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createTransactionRequestLike` | `CreateTransactionRequestLike` | The initial values for the instance |

#### Returns

[`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

#### Overrides

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[constructor](/api/Providers/BaseTransactionRequest.md#constructor)

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:55](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/create-transaction-request.ts#L55)

## Properties

### bytecodeWitnessIndex

• **bytecodeWitnessIndex**: `number`

Witness index of contract bytecode to create

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:44](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/create-transaction-request.ts#L44)

___

### gasPrice

• **gasPrice**: `BN`

Gas price for transaction

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[gasPrice](/api/Providers/BaseTransactionRequest.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:92](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L92)

___

### inputs

• **inputs**: [`TransactionRequestInput`](/api/Providers/index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[inputs](/api/Providers/BaseTransactionRequest.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:100](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L100)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[maturity](/api/Providers/BaseTransactionRequest.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:94](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L94)

___

### maxFee

• `Optional` **maxFee**: `BN`

The maximum fee payable by this transaction using BASE_ASSET.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[maxFee](/api/Providers/BaseTransactionRequest.md#maxfee)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:96](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L96)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](/api/Providers/index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[outputs](/api/Providers/BaseTransactionRequest.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:102](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L102)

___

### salt

• **salt**: `string`

Salt

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:46](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/create-transaction-request.ts#L46)

___

### storageSlots

• **storageSlots**: `TransactionRequestStorageSlot`[]

List of storage slots to initialize

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:48](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/create-transaction-request.ts#L48)

___

### type

• **type**: [`Create`](/api/Providers/TransactionType.md#create)

Type of the transaction

#### Overrides

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[type](/api/Providers/BaseTransactionRequest.md#type)

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:42](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/create-transaction-request.ts#L42)

___

### witnessLimit

• `Optional` **witnessLimit**: `BN`

The maximum amount of witness data allowed for the transaction

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[witnessLimit](/api/Providers/BaseTransactionRequest.md#witnesslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:98](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L98)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[witnesses](/api/Providers/BaseTransactionRequest.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:104](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L104)

## Methods

### addChangeOutput

▸ **addChangeOutput**(`to`, `assetId?`): `void`

Adds a change output to the transaction.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | `undefined` | Address of the owner. |
| `assetId` | `BytesLike` | `BaseAssetId` | Asset ID of coin. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[addChangeOutput](/api/Providers/BaseTransactionRequest.md#addchangeoutput)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:497](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L497)

___

### addCoinInput

▸ **addCoinInput**(`coin`, `predicate?`): `void`

Adds a single coin input to the transaction and a change output for the related
assetId, if one it was not added yet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coin` | [`Coin`](/api/Providers/index.md#coin) | Coin resource. |
| `predicate?` | `AbstractPredicate` | Predicate bytes. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[addCoinInput](/api/Providers/BaseTransactionRequest.md#addcoininput)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:315](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L315)

___

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId?`): [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

Adds a coin output to the transaction.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | `undefined` | Address of the owner. |
| `amount` | `BigNumberish` | `undefined` | Amount of coin. |
| `assetId` | `BytesLike` | `BaseAssetId` | Asset ID of coin. |

#### Returns

[`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[addCoinOutput](/api/Providers/BaseTransactionRequest.md#addcoinoutput)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:461](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L461)

___

### addCoinOutputs

▸ **addCoinOutputs**(`to`, `quantities`): [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

Adds multiple coin outputs to the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | Address of the destination. |
| `quantities` | [`CoinQuantityLike`](/api/Providers/index.md#coinquantitylike)[] | Quantities of coins. |

#### Returns

[`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[addCoinOutputs](/api/Providers/BaseTransactionRequest.md#addcoinoutputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:478](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L478)

___

### addContractCreatedOutput

▸ **addContractCreatedOutput**(`contractId`, `stateRoot`): `void`

Adds a contract created output to the transaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | The contract ID. |
| `stateRoot` | `BytesLike` | The state root. |

#### Returns

`void`

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:116](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/create-transaction-request.ts#L116)

___

### addMessageInput

▸ **addMessageInput**(`message`, `predicate?`): `void`

Adds a single message input to the transaction and a change output for the
baseAssetId, if one it was not added yet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`MessageCoin`](/api/Providers/index.md#messagecoin) | Message resource. |
| `predicate?` | `AbstractPredicate` | Predicate bytes. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[addMessageInput](/api/Providers/BaseTransactionRequest.md#addmessageinput)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:358](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L358)

___

### addPredicateResource

▸ **addPredicateResource**(`resource`, `predicate`): [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

Adds multiple resources to the transaction by adding coin/message inputs and change
outputs from the related assetIds.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`Resource`](/api/Providers/index.md#resource) |
| `predicate` | `AbstractPredicate` |

#### Returns

[`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

This transaction.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[addPredicateResource](/api/Providers/BaseTransactionRequest.md#addpredicateresource)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:431](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L431)

___

### addPredicateResources

▸ **addPredicateResources**(`resources`, `predicate`): [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

Adds multiple predicate coin/message inputs to the transaction and change outputs
from the related assetIds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resources` | [`Resource`](/api/Providers/index.md#resource)[] | The resources to add. |
| `predicate` | `AbstractPredicate` | - |

#### Returns

[`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

This transaction.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[addPredicateResources](/api/Providers/BaseTransactionRequest.md#addpredicateresources)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:448](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L448)

___

### addResource

▸ **addResource**(`resource`): [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

Adds a single resource to the transaction by adding a coin/message input and a
change output for the related assetId, if one it was not added yet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resource` | [`Resource`](/api/Providers/index.md#resource) | The resource to add. |

#### Returns

[`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

This transaction.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[addResource](/api/Providers/BaseTransactionRequest.md#addresource)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:401](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L401)

___

### addResources

▸ **addResources**(`resources`): [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

Adds multiple resources to the transaction by adding coin/message inputs and change
outputs from the related assetIds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resources` | readonly [`Resource`](/api/Providers/index.md#resource)[] | The resources to add. |

#### Returns

[`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

This transaction.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[addResources](/api/Providers/BaseTransactionRequest.md#addresources)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:418](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L418)

___

### calculateMaxGas

▸ **calculateMaxGas**(`chainInfo`, `minGas`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainInfo` | [`ChainInfo`](/api/Providers/index.md#chaininfo) |
| `minGas` | `BN` |

#### Returns

`BN`

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[calculateMaxGas](/api/Providers/BaseTransactionRequest.md#calculatemaxgas)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:542](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L542)

___

### fundWithFakeUtxos

▸ **fundWithFakeUtxos**(`quantities`): `void`

Funds the transaction with fake UTXOs for each assetId and amount in the
quantities array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quantities` | [`CoinQuantity`](/api/Providers/index.md#coinquantity)[] | CoinQuantity Array. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[fundWithFakeUtxos](/api/Providers/BaseTransactionRequest.md#fundwithfakeutxos)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:564](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L564)

___

### getBaseTransaction

▸ **getBaseTransaction**(): `ToBaseTransactionResponse`

Method to obtain the base transaction details.

#### Returns

`ToBaseTransactionResponse`

The base transaction details.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[getBaseTransaction](/api/Providers/BaseTransactionRequest.md#getbasetransaction)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:162](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L162)

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

[packages/providers/src/transaction-request/transaction-request.ts:277](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L277)

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

[packages/providers/src/transaction-request/transaction-request.ts:255](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L255)

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

[packages/providers/src/transaction-request/transaction-request.ts:266](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L266)

___

### getCoinOutputsQuantities

▸ **getCoinOutputsQuantities**(): [`CoinQuantity`](/api/Providers/index.md#coinquantity)[]

Retrieves an array of CoinQuantity for each coin output present in the transaction.
a transaction.

#### Returns

[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]

CoinQuantity array.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[getCoinOutputsQuantities](/api/Providers/BaseTransactionRequest.md#getcoinoutputsquantities)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:611](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L611)

___

### getContractCreatedOutputs

▸ **getContractCreatedOutputs**(): [`ContractCreatedTransactionRequestOutput`](/api/Providers/index.md#contractcreatedtransactionrequestoutput)[]

Get contract created outputs for the transaction.

#### Returns

[`ContractCreatedTransactionRequestOutput`](/api/Providers/index.md#contractcreatedtransactionrequestoutput)[]

An array of contract created transaction request outputs.

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:92](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/create-transaction-request.ts#L92)

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

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[getTransactionId](/api/Providers/BaseTransactionRequest.md#gettransactionid)

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:106](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/create-transaction-request.ts#L106)

___

### metadataGas

▸ **metadataGas**(`gasCosts`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `gasCosts` | `GqlGasCosts` |

#### Returns

`BN`

#### Overrides

BaseTransactionRequest.metadataGas

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:129](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/create-transaction-request.ts#L129)

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

[packages/providers/src/transaction-request/transaction-request.ts:635](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L635)

___

### toTransaction

▸ **toTransaction**(): `TransactionCreate`

Converts the transaction request to a `TransactionCreate`.

#### Returns

`TransactionCreate`

The transaction create object.

#### Overrides

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[toTransaction](/api/Providers/BaseTransactionRequest.md#totransaction)

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:72](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/create-transaction-request.ts#L72)

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

[packages/providers/src/transaction-request/transaction-request.ts:188](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L188)

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

[packages/providers/src/transaction-request/transaction-request.ts:243](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L243)

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

[packages/providers/src/transaction-request/transaction-request.ts:229](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L229)

___

### from

▸ **from**(`obj`): [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `CreateTransactionRequestLike` |

#### Returns

[`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:34](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/create-transaction-request.ts#L34)

___

### getPolicyMeta

▸ **getPolicyMeta**(`req`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `policies` | `Policy`[] |
| `policyTypes` | `number` |

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[getPolicyMeta](/api/Providers/BaseTransactionRequest.md#getpolicymeta)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:129](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/providers/src/transaction-request/transaction-request.ts#L129)
