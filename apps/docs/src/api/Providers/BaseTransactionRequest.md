# Class: BaseTransactionRequest

[@fuel-ts/providers](/api/Providers/index.md).BaseTransactionRequest

Abstract class to define the functionalities of a transaction request transaction request.

## Hierarchy

- **`BaseTransactionRequest`**

  ↳ [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

  ↳ [`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

## Implements

- `BaseTransactionRequestLike`

## Constructors

### constructor

• **new BaseTransactionRequest**(`baseTransactionRequest?`): [`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

Constructor for initializing a base transaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseTransactionRequest` | `BaseTransactionRequestLike` | Optional object containing properties to initialize the transaction request. |

#### Returns

[`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:111](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L111)

## Properties

### gasPrice

• **gasPrice**: `BN`

Gas price for transaction

#### Implementation of

BaseTransactionRequestLike.gasPrice

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:92](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L92)

___

### inputs

• **inputs**: [`TransactionRequestInput`](/api/Providers/index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

BaseTransactionRequestLike.inputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:100](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L100)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Implementation of

BaseTransactionRequestLike.maturity

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:94](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L94)

___

### maxFee

• `Optional` **maxFee**: `BN`

The maximum fee payable by this transaction using BASE_ASSET.

#### Implementation of

BaseTransactionRequestLike.maxFee

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:96](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L96)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](/api/Providers/index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

BaseTransactionRequestLike.outputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:102](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L102)

___

### type

• `Abstract` **type**: [`TransactionType`](/api/Providers/TransactionType.md)

Type of the transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:90](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L90)

___

### witnessLimit

• `Optional` **witnessLimit**: `BN`

The maximum amount of witness data allowed for the transaction

#### Implementation of

BaseTransactionRequestLike.witnessLimit

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:98](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L98)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Implementation of

BaseTransactionRequestLike.witnesses

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:104](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L104)

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

[packages/providers/src/transaction-request/transaction-request.ts:497](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L497)

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

[packages/providers/src/transaction-request/transaction-request.ts:315](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L315)

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

[packages/providers/src/transaction-request/transaction-request.ts:461](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L461)

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

[packages/providers/src/transaction-request/transaction-request.ts:478](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L478)

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

[packages/providers/src/transaction-request/transaction-request.ts:358](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L358)

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

[packages/providers/src/transaction-request/transaction-request.ts:431](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L431)

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

[packages/providers/src/transaction-request/transaction-request.ts:448](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L448)

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

[packages/providers/src/transaction-request/transaction-request.ts:401](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L401)

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

[packages/providers/src/transaction-request/transaction-request.ts:418](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L418)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:542](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L542)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:564](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L564)

___

### getBaseTransaction

▸ **getBaseTransaction**(): `ToBaseTransactionResponse`

Method to obtain the base transaction details.

#### Returns

`ToBaseTransactionResponse`

The base transaction details.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:162](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L162)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](/api/Providers/index.md#changetransactionrequestoutput)[]

Gets the change outputs for a transaction.

#### Returns

[`ChangeTransactionRequestOutput`](/api/Providers/index.md#changetransactionrequestoutput)[]

The change outputs.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:277](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L277)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](/api/Providers/index.md#cointransactionrequestinput)[]

Gets the coin inputs for a transaction.

#### Returns

[`CoinTransactionRequestInput`](/api/Providers/index.md#cointransactionrequestinput)[]

The coin inputs.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:255](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L255)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](/api/Providers/index.md#cointransactionrequestoutput)[]

Gets the coin outputs for a transaction.

#### Returns

[`CoinTransactionRequestOutput`](/api/Providers/index.md#cointransactionrequestoutput)[]

The coin outputs.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:266](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L266)

___

### getCoinOutputsQuantities

▸ **getCoinOutputsQuantities**(): [`CoinQuantity`](/api/Providers/index.md#coinquantity)[]

Retrieves an array of CoinQuantity for each coin output present in the transaction.
a transaction.

#### Returns

[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]

CoinQuantity array.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:611](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L611)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:627](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L627)

___

### toJSON

▸ **toJSON**(): `any`

Return the minimum amount in native coins required to create
a transaction.

#### Returns

`any`

The transaction as a JSON object.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:635](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L635)

___

### toTransaction

▸ **toTransaction**(): `TransactionScript` \| `TransactionCreate`

#### Returns

`TransactionScript` \| `TransactionCreate`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:181](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L181)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

Converts the transaction request to a byte array.

#### Returns

`Uint8Array`

The transaction bytes.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:188](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L188)

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

[packages/providers/src/transaction-request/transaction-request.ts:243](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L243)

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

[packages/providers/src/transaction-request/transaction-request.ts:229](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L229)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:129](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/transaction-request.ts#L129)
