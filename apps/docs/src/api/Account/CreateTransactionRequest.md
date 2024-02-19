# Class: CreateTransactionRequest

[@fuel-ts/account](/api/Account/index.md).CreateTransactionRequest

`CreateTransactionRequest` provides functionalities for creating a transaction request that creates a contract.

## Hierarchy

- [`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

  ↳ **`CreateTransactionRequest`**

## Constructors

### constructor

• **new CreateTransactionRequest**(`createTransactionRequestLike?`): [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

Creates an instance `CreateTransactionRequest`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createTransactionRequestLike` | `CreateTransactionRequestLike` | The initial values for the instance |

#### Returns

[`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

#### Overrides

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[constructor](/api/Account/BaseTransactionRequest.md#constructor)

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:55](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/create-transaction-request.ts#L55)

## Properties

### bytecodeWitnessIndex

• **bytecodeWitnessIndex**: `number`

Witness index of contract bytecode to create

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:44](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/create-transaction-request.ts#L44)

___

### gasPrice

• **gasPrice**: `BN`

Gas price for transaction

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[gasPrice](/api/Account/BaseTransactionRequest.md#gasprice)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:94](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L94)

___

### inputs

• **inputs**: [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[inputs](/api/Account/BaseTransactionRequest.md#inputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:102](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L102)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[maturity](/api/Account/BaseTransactionRequest.md#maturity)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:96](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L96)

___

### maxFee

• `Optional` **maxFee**: `BN`

The maximum fee payable by this transaction using BASE_ASSET.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[maxFee](/api/Account/BaseTransactionRequest.md#maxfee)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:98](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L98)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](/api/Account/index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[outputs](/api/Account/BaseTransactionRequest.md#outputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:104](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L104)

___

### salt

• **salt**: `string`

Salt

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:46](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/create-transaction-request.ts#L46)

___

### storageSlots

• **storageSlots**: `TransactionRequestStorageSlot`[]

List of storage slots to initialize

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:48](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/create-transaction-request.ts#L48)

___

### type

• **type**: [`Create`](/api/Account/TransactionType.md#create)

Type of the transaction

#### Overrides

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[type](/api/Account/BaseTransactionRequest.md#type)

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:42](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/create-transaction-request.ts#L42)

___

### witnessLimit

• `Optional` **witnessLimit**: `BN`

The maximum amount of witness data allowed for the transaction

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[witnessLimit](/api/Account/BaseTransactionRequest.md#witnesslimit)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:100](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L100)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[witnesses](/api/Account/BaseTransactionRequest.md#witnesses)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:106](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L106)

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

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addChangeOutput](/api/Account/BaseTransactionRequest.md#addchangeoutput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:500](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L500)

___

### addCoinInput

▸ **addCoinInput**(`coin`, `predicate?`): `void`

Adds a single coin input to the transaction and a change output for the related
assetId, if one it was not added yet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coin` | [`Coin`](/api/Account/index.md#coin) | Coin resource. |
| `predicate?` | [`Predicate`](/api/Account/Predicate.md)&lt;`InputValue`[]\> | Predicate bytes. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addCoinInput](/api/Account/BaseTransactionRequest.md#addcoininput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:318](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L318)

___

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId?`): [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

Adds a coin output to the transaction.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | `undefined` | Address of the owner. |
| `amount` | `BigNumberish` | `undefined` | Amount of coin. |
| `assetId` | `BytesLike` | `BaseAssetId` | Asset ID of coin. |

#### Returns

[`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addCoinOutput](/api/Account/BaseTransactionRequest.md#addcoinoutput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:464](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L464)

___

### addCoinOutputs

▸ **addCoinOutputs**(`to`, `quantities`): [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

Adds multiple coin outputs to the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | Address of the destination. |
| `quantities` | [`CoinQuantityLike`](/api/Account/index.md#coinquantitylike)[] | Quantities of coins. |

#### Returns

[`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addCoinOutputs](/api/Account/BaseTransactionRequest.md#addcoinoutputs)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:481](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L481)

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

[packages/account/src/providers/transaction-request/create-transaction-request.ts:116](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/create-transaction-request.ts#L116)

___

### addMessageInput

▸ **addMessageInput**(`message`, `predicate?`): `void`

Adds a single message input to the transaction and a change output for the
baseAssetId, if one it was not added yet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`MessageCoin`](/api/Account/index.md#messagecoin) | Message resource. |
| `predicate?` | [`Predicate`](/api/Account/Predicate.md)&lt;`InputValue`[]\> | Predicate bytes. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addMessageInput](/api/Account/BaseTransactionRequest.md#addmessageinput)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:361](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L361)

___

### addPredicateResource

▸ **addPredicateResource**(`resource`, `predicate`): [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

Adds multiple resources to the transaction by adding coin/message inputs and change
outputs from the related assetIds.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`Resource`](/api/Account/index.md#resource) |
| `predicate` | [`Predicate`](/api/Account/Predicate.md)&lt;`InputValue`[]\> |

#### Returns

[`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

This transaction.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addPredicateResource](/api/Account/BaseTransactionRequest.md#addpredicateresource)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:434](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L434)

___

### addPredicateResources

▸ **addPredicateResources**(`resources`, `predicate`): [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

Adds multiple predicate coin/message inputs to the transaction and change outputs
from the related assetIds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resources` | [`Resource`](/api/Account/index.md#resource)[] | The resources to add. |
| `predicate` | [`Predicate`](/api/Account/Predicate.md)&lt;`InputValue`[]\> | - |

#### Returns

[`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

This transaction.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addPredicateResources](/api/Account/BaseTransactionRequest.md#addpredicateresources)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:451](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L451)

___

### addResource

▸ **addResource**(`resource`): [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

Adds a single resource to the transaction by adding a coin/message input and a
change output for the related assetId, if one it was not added yet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resource` | [`Resource`](/api/Account/index.md#resource) | The resource to add. |

#### Returns

[`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

This transaction.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addResource](/api/Account/BaseTransactionRequest.md#addresource)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:404](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L404)

___

### addResources

▸ **addResources**(`resources`): [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

Adds multiple resources to the transaction by adding coin/message inputs and change
outputs from the related assetIds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resources` | readonly [`Resource`](/api/Account/index.md#resource)[] | The resources to add. |

#### Returns

[`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

This transaction.

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[addResources](/api/Account/BaseTransactionRequest.md#addresources)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:421](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L421)

___

### calculateMaxGas

▸ **calculateMaxGas**(`chainInfo`, `minGas`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainInfo` | [`ChainInfo`](/api/Account/index.md#chaininfo) |
| `minGas` | `BN` |

#### Returns

`BN`

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[calculateMaxGas](/api/Account/BaseTransactionRequest.md#calculatemaxgas)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:545](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L545)

___

### fundWithFakeUtxos

▸ **fundWithFakeUtxos**(`quantities`, `resourcesOwner?`): `void`

Funds the transaction with fake UTXOs for each assetId and amount in the
quantities array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quantities` | [`CoinQuantity`](/api/Account/index.md#coinquantity)[] | CoinQuantity Array. |
| `resourcesOwner?` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | - |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[fundWithFakeUtxos](/api/Account/BaseTransactionRequest.md#fundwithfakeutxos)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:567](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L567)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:164](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L164)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:280](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L280)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:258](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L258)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:269](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L269)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:614](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L614)

___

### getContractCreatedOutputs

▸ **getContractCreatedOutputs**(): [`ContractCreatedTransactionRequestOutput`](/api/Account/index.md#contractcreatedtransactionrequestoutput)[]

Get contract created outputs for the transaction.

#### Returns

[`ContractCreatedTransactionRequestOutput`](/api/Account/index.md#contractcreatedtransactionrequestoutput)[]

An array of contract created transaction request outputs.

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:92](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/create-transaction-request.ts#L92)

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

[packages/account/src/providers/transaction-request/create-transaction-request.ts:106](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/create-transaction-request.ts#L106)

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

[packages/account/src/providers/transaction-request/create-transaction-request.ts:129](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/create-transaction-request.ts#L129)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:638](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L638)

___

### toTransaction

▸ **toTransaction**(): `TransactionCreate`

Converts the transaction request to a `TransactionCreate`.

#### Returns

`TransactionCreate`

The transaction create object.

#### Overrides

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[toTransaction](/api/Account/BaseTransactionRequest.md#totransaction)

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:72](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/create-transaction-request.ts#L72)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:190](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L190)

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

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[updateWitness](/api/Account/BaseTransactionRequest.md#updatewitness)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:246](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L246)

___

### updateWitnessByOwner

▸ **updateWitnessByOwner**(`address`, `signature`): `void`

Updates the witness for a given owner and signature.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get the coin input witness index for. |
| `signature` | `BytesLike` | The signature to update the witness with. |

#### Returns

`void`

#### Inherited from

[BaseTransactionRequest](/api/Account/BaseTransactionRequest.md).[updateWitnessByOwner](/api/Account/BaseTransactionRequest.md#updatewitnessbyowner)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:231](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L231)

___

### from

▸ **from**(`obj`): [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `CreateTransactionRequestLike` |

#### Returns

[`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/create-transaction-request.ts:34](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/create-transaction-request.ts#L34)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:131](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L131)
