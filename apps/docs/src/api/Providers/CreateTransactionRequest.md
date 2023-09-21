# Class: CreateTransactionRequest

[@fuel-ts/providers](/api/Providers/index.md).CreateTransactionRequest

`CreateTransactionRequest` provides functionalities for creating a transaction request that creates a contract.

## Hierarchy

- [`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

  ↳ **`CreateTransactionRequest`**

## Constructors

### constructor

• **new CreateTransactionRequest**(`createTransactionRequestLike?`)

Creates an instance `CreateTransactionRequest`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `createTransactionRequestLike` | `CreateTransactionRequestLike` | The initial values for the instance |

#### Overrides

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[constructor](/api/Providers/BaseTransactionRequest.md#constructor)

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:50](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/create-transaction-request.ts#L50)

## Properties

### bytecodeWitnessIndex

• **bytecodeWitnessIndex**: `number`

Witness index of contract bytecode to create

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:39](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/create-transaction-request.ts#L39)

___

### gasLimit

• **gasLimit**: `BN`

Gas limit for transaction

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[gasLimit](/api/Providers/BaseTransactionRequest.md#gaslimit)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:68](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L68)

___

### gasPrice

• **gasPrice**: `BN`

Gas price for transaction

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[gasPrice](/api/Providers/BaseTransactionRequest.md#gasprice)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:66](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L66)

___

### inputs

• **inputs**: [`TransactionRequestInput`](/api/Providers/index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[inputs](/api/Providers/BaseTransactionRequest.md#inputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:72](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L72)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[maturity](/api/Providers/BaseTransactionRequest.md#maturity)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:70](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L70)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](/api/Providers/index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[outputs](/api/Providers/BaseTransactionRequest.md#outputs)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:74](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L74)

___

### salt

• **salt**: `string`

Salt

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:41](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/create-transaction-request.ts#L41)

___

### storageSlots

• **storageSlots**: `TransactionRequestStorageSlot`[]

List of storage slots to initialize

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:43](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/create-transaction-request.ts#L43)

___

### type

• **type**: [`Create`](/api/Providers/TransactionType.md#create)

Type of the transaction

#### Overrides

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[type](/api/Providers/BaseTransactionRequest.md#type)

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:37](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/create-transaction-request.ts#L37)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[witnesses](/api/Providers/BaseTransactionRequest.md#witnesses)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:76](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L76)

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

[packages/providers/src/transaction-request/transaction-request.ts:439](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L439)

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

[packages/providers/src/transaction-request/transaction-request.ts:257](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L257)

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

[packages/providers/src/transaction-request/transaction-request.ts:403](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L403)

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

[packages/providers/src/transaction-request/transaction-request.ts:420](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L420)

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

[packages/providers/src/transaction-request/create-transaction-request.ts:100](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/create-transaction-request.ts#L100)

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

[packages/providers/src/transaction-request/transaction-request.ts:300](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L300)

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

[packages/providers/src/transaction-request/transaction-request.ts:373](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L373)

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

[packages/providers/src/transaction-request/transaction-request.ts:390](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L390)

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

[packages/providers/src/transaction-request/transaction-request.ts:343](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L343)

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

[packages/providers/src/transaction-request/transaction-request.ts:360](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L360)

___

### calculateFee

▸ **calculateFee**(`gasPriceFactor`): [`CoinQuantity`](/api/Providers/index.md#coinquantity)

Return the minimum amount in native coins required to create
a transaction. This is required even if the gasPrice is 0.

#### Parameters

| Name | Type |
| :------ | :------ |
| `gasPriceFactor` | `BN` |

#### Returns

[`CoinQuantity`](/api/Providers/index.md#coinquantity)

The minimum amount in coins required to create a transaction.

#### Inherited from

[BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md).[calculateFee](/api/Providers/BaseTransactionRequest.md#calculatefee)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:473](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L473)

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

[packages/providers/src/transaction-request/transaction-request.ts:104](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L104)

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

[packages/providers/src/transaction-request/transaction-request.ts:219](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L219)

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

[packages/providers/src/transaction-request/transaction-request.ts:197](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L197)

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

[packages/providers/src/transaction-request/transaction-request.ts:208](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L208)

___

### getContractCreatedOutputs

▸ **getContractCreatedOutputs**(): [`ContractCreatedTransactionRequestOutput`](/api/Providers/index.md#contractcreatedtransactionrequestoutput)[]

Get contract created outputs for the transaction.

#### Returns

[`ContractCreatedTransactionRequestOutput`](/api/Providers/index.md#contractcreatedtransactionrequestoutput)[]

An array of contract created transaction request outputs.

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:87](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/create-transaction-request.ts#L87)

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

[packages/providers/src/transaction-request/transaction-request.ts:488](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L488)

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

[packages/providers/src/transaction-request/create-transaction-request.ts:67](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/create-transaction-request.ts#L67)

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

[packages/providers/src/transaction-request/transaction-request.ts:131](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L131)

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

[packages/providers/src/transaction-request/transaction-request.ts:185](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L185)

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

[packages/providers/src/transaction-request/transaction-request.ts:171](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/transaction-request.ts#L171)

___

### from

▸ `Static` **from**(`obj`): [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `CreateTransactionRequestLike` |

#### Returns

[`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/create-transaction-request.ts:29](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/providers/src/transaction-request/create-transaction-request.ts#L29)
