# Class: BaseTransactionRequest

[@fuel-ts/account](/api/Account/index.md).BaseTransactionRequest

Abstract class to define the functionalities of a transaction request transaction request.

## Hierarchy

- **`BaseTransactionRequest`**

  ↳ [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

  ↳ [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

## Implements

- `BaseTransactionRequestLike`

## Constructors

### constructor

• **new BaseTransactionRequest**(`baseTransactionRequest?`): [`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

Constructor for initializing a base transaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseTransactionRequest` | `BaseTransactionRequestLike` | Optional object containing properties to initialize the transaction request. |

#### Returns

[`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:113](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L113)

## Properties

### gasPrice

• **gasPrice**: `BN`

Gas price for transaction

#### Implementation of

BaseTransactionRequestLike.gasPrice

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:94](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L94)

___

### inputs

• **inputs**: [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

BaseTransactionRequestLike.inputs

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:102](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L102)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Implementation of

BaseTransactionRequestLike.maturity

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:96](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L96)

___

### maxFee

• `Optional` **maxFee**: `BN`

The maximum fee payable by this transaction using BASE_ASSET.

#### Implementation of

BaseTransactionRequestLike.maxFee

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:98](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L98)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](/api/Account/index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

BaseTransactionRequestLike.outputs

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:104](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L104)

___

### type

• `Abstract` **type**: [`TransactionType`](/api/Account/TransactionType.md)

Type of the transaction

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:92](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L92)

___

### witnessLimit

• `Optional` **witnessLimit**: `BN`

The maximum amount of witness data allowed for the transaction

#### Implementation of

BaseTransactionRequestLike.witnessLimit

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:100](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L100)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Implementation of

BaseTransactionRequestLike.witnesses

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:318](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L318)

___

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId?`): [`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

Adds a coin output to the transaction.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | `undefined` | Address of the owner. |
| `amount` | `BigNumberish` | `undefined` | Amount of coin. |
| `assetId` | `BytesLike` | `BaseAssetId` | Asset ID of coin. |

#### Returns

[`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:464](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L464)

___

### addCoinOutputs

▸ **addCoinOutputs**(`to`, `quantities`): [`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

Adds multiple coin outputs to the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | Address of the destination. |
| `quantities` | [`CoinQuantityLike`](/api/Account/index.md#coinquantitylike)[] | Quantities of coins. |

#### Returns

[`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:481](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L481)

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:361](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L361)

___

### addPredicateResource

▸ **addPredicateResource**(`resource`, `predicate`): [`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

Adds multiple resources to the transaction by adding coin/message inputs and change
outputs from the related assetIds.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`Resource`](/api/Account/index.md#resource) |
| `predicate` | [`Predicate`](/api/Account/Predicate.md)&lt;`InputValue`[]\> |

#### Returns

[`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

This transaction.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:434](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L434)

___

### addPredicateResources

▸ **addPredicateResources**(`resources`, `predicate`): [`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

Adds multiple predicate coin/message inputs to the transaction and change outputs
from the related assetIds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resources` | [`Resource`](/api/Account/index.md#resource)[] | The resources to add. |
| `predicate` | [`Predicate`](/api/Account/Predicate.md)&lt;`InputValue`[]\> | - |

#### Returns

[`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

This transaction.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:451](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L451)

___

### addResource

▸ **addResource**(`resource`): [`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

Adds a single resource to the transaction by adding a coin/message input and a
change output for the related assetId, if one it was not added yet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resource` | [`Resource`](/api/Account/index.md#resource) | The resource to add. |

#### Returns

[`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

This transaction.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:404](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L404)

___

### addResources

▸ **addResources**(`resources`): [`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

Adds multiple resources to the transaction by adding coin/message inputs and change
outputs from the related assetIds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resources` | readonly [`Resource`](/api/Account/index.md#resource)[] | The resources to add. |

#### Returns

[`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

This transaction.

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:567](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L567)

___

### getBaseTransaction

▸ **getBaseTransaction**(): `ToBaseTransactionResponse`

Method to obtain the base transaction details.

#### Returns

`ToBaseTransactionResponse`

The base transaction details.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:164](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L164)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](/api/Account/index.md#changetransactionrequestoutput)[]

Gets the change outputs for a transaction.

#### Returns

[`ChangeTransactionRequestOutput`](/api/Account/index.md#changetransactionrequestoutput)[]

The change outputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:280](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L280)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](/api/Account/index.md#cointransactionrequestinput)[]

Gets the coin inputs for a transaction.

#### Returns

[`CoinTransactionRequestInput`](/api/Account/index.md#cointransactionrequestinput)[]

The coin inputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:258](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L258)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](/api/Account/index.md#cointransactionrequestoutput)[]

Gets the coin outputs for a transaction.

#### Returns

[`CoinTransactionRequestOutput`](/api/Account/index.md#cointransactionrequestoutput)[]

The coin outputs.

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:614](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L614)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:630](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L630)

___

### toJSON

▸ **toJSON**(): `any`

Return the minimum amount in native coins required to create
a transaction.

#### Returns

`any`

The transaction as a JSON object.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:638](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L638)

___

### toTransaction

▸ **toTransaction**(): `TransactionCreate` \| `TransactionScript`

#### Returns

`TransactionCreate` \| `TransactionScript`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:183](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L183)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

Converts the transaction request to a byte array.

#### Returns

`Uint8Array`

The transaction bytes.

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:231](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L231)

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:131](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/account/src/providers/transaction-request/transaction-request.ts#L131)
