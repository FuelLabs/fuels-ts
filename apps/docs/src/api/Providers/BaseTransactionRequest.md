# Class: BaseTransactionRequest

[@fuel-ts/providers](/api/Providers/index.md).BaseTransactionRequest

Abstract class to define the functionalities of a transaction request transaction request.

## Hierarchy

- **`BaseTransactionRequest`**

  ↳ [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

  ↳ [`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

  ↳ [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

  ↳ [`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

## Implements

- `BaseTransactionRequestLike`

## Constructors

### constructor

• **new BaseTransactionRequest**(`baseTransactionRequest?`)

Constructor for initializing a base transaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseTransactionRequest` | `BaseTransactionRequestLike` | Optional object containing properties to initialize the transaction request. |

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:84](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L84)

## Properties

### gasLimit

• **gasLimit**: `BN`

Gas limit for transaction

#### Implementation of

BaseTransactionRequestLike.gasLimit

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:69](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L69)

___

### gasPrice

• **gasPrice**: `BN`

Gas price for transaction

#### Implementation of

BaseTransactionRequestLike.gasPrice

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:67](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L67)

___

### inputs

• **inputs**: [`TransactionRequestInput`](/api/Providers/index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

BaseTransactionRequestLike.inputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:73](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L73)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Implementation of

BaseTransactionRequestLike.maturity

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:71](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L71)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](/api/Providers/index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

BaseTransactionRequestLike.outputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:75](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L75)

___

### type

• `Abstract` **type**: [`TransactionType`](/api/Providers/TransactionType.md)

Type of the transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:65](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L65)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Implementation of

BaseTransactionRequestLike.witnesses

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:77](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L77)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:440](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L440)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:258](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L258)

___

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId?`): [`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

Adds a coin output to the transaction.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | `undefined` | Address of the owner. |
| `amount` | `BigNumberish` | `undefined` | Amount of coin. |
| `assetId` | `BytesLike` | `BaseAssetId` | Asset ID of coin. |

#### Returns

[`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:404](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L404)

___

### addCoinOutputs

▸ **addCoinOutputs**(`to`, `quantities`): [`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

Adds multiple coin outputs to the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | Address of the destination. |
| `quantities` | [`CoinQuantityLike`](/api/Providers/index.md#coinquantitylike)[] | Quantities of coins. |

#### Returns

[`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:421](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L421)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:301](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L301)

___

### addPredicateResource

▸ **addPredicateResource**(`resource`, `predicate`): [`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

Adds multiple resources to the transaction by adding coin/message inputs and change
outputs from the related assetIds.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`Resource`](/api/Providers/index.md#resource) |
| `predicate` | `AbstractPredicate` |

#### Returns

[`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

This transaction.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:374](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L374)

___

### addPredicateResources

▸ **addPredicateResources**(`resources`, `predicate`): [`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

Adds multiple predicate coin/message inputs to the transaction and change outputs
from the related assetIds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resources` | [`Resource`](/api/Providers/index.md#resource)[] | The resources to add. |
| `predicate` | `AbstractPredicate` | - |

#### Returns

[`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

This transaction.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:391](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L391)

___

### addResource

▸ **addResource**(`resource`): [`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

Adds a single resource to the transaction by adding a coin/message input and a
change output for the related assetId, if one it was not added yet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resource` | [`Resource`](/api/Providers/index.md#resource) | The resource to add. |

#### Returns

[`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

This transaction.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:344](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L344)

___

### addResources

▸ **addResources**(`resources`): [`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

Adds multiple resources to the transaction by adding coin/message inputs and change
outputs from the related assetIds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resources` | readonly [`Resource`](/api/Providers/index.md#resource)[] | The resources to add. |

#### Returns

[`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

This transaction.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:361](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L361)

___

### calculateFee

▸ **calculateFee**(): [`CoinQuantity`](/api/Providers/index.md#coinquantity)

Return the minimum amount in native coins required to create
a transaction. This is required even if the gasPrice is 0.

#### Returns

[`CoinQuantity`](/api/Providers/index.md#coinquantity)

The minimum amount in coins required to create a transaction.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:474](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L474)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`&lt;`TransactionScript` \| `TransactionCreate`, ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof `BaseTransactionRequestLike`\>

Method to obtain the base transaction details.

#### Returns

`Pick`&lt;`TransactionScript` \| `TransactionCreate`, ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof `BaseTransactionRequestLike`\>

The base transaction details.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:105](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L105)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](/api/Providers/index.md#changetransactionrequestoutput)[]

Gets the change outputs for a transaction.

#### Returns

[`ChangeTransactionRequestOutput`](/api/Providers/index.md#changetransactionrequestoutput)[]

The change outputs.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:220](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L220)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](/api/Providers/index.md#cointransactionrequestinput)[]

Gets the coin inputs for a transaction.

#### Returns

[`CoinTransactionRequestInput`](/api/Providers/index.md#cointransactionrequestinput)[]

The coin inputs.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:198](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L198)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](/api/Providers/index.md#cointransactionrequestoutput)[]

Gets the coin outputs for a transaction.

#### Returns

[`CoinTransactionRequestOutput`](/api/Providers/index.md#cointransactionrequestoutput)[]

The coin outputs.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:209](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L209)

___

### toJSON

▸ **toJSON**(): `any`

Return the minimum amount in native coins required to create
a transaction.

#### Returns

`any`

The transaction as a JSON object.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:489](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L489)

___

### toTransaction

▸ `Abstract` **toTransaction**(): `TransactionScript` \| `TransactionCreate`

#### Returns

`TransactionScript` \| `TransactionCreate`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:125](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L125)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

Converts the transaction request to a byte array.

#### Returns

`Uint8Array`

The transaction bytes.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:132](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L132)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:186](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L186)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:172](https://github.com/FuelLabs/fuels-ts/blob/b1bbe92b/packages/providers/src/transaction-request/transaction-request.ts#L172)
