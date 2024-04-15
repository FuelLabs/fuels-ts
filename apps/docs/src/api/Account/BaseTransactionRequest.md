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

[packages/account/src/providers/transaction-request/transaction-request.ts:116](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L116)

## Properties

### gasPrice

• **gasPrice**: `BN`

Gas price for transaction

#### Implementation of

BaseTransactionRequestLike.gasPrice

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:97](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L97)

___

### inputs

• **inputs**: [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

BaseTransactionRequestLike.inputs

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:105](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L105)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Implementation of

BaseTransactionRequestLike.maturity

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:99](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L99)

___

### maxFee

• `Optional` **maxFee**: `BN`

The maximum fee payable by this transaction using BASE_ASSET.

#### Implementation of

BaseTransactionRequestLike.maxFee

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:101](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L101)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](/api/Account/index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

BaseTransactionRequestLike.outputs

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:107](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L107)

___

### type

• `Abstract` **type**: [`TransactionType`](/api/Account/TransactionType.md)

Type of the transaction

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:95](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L95)

___

### witnessLimit

• `Optional` **witnessLimit**: `BN`

The maximum amount of witness data allowed for the transaction

#### Implementation of

BaseTransactionRequestLike.witnessLimit

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:103](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L103)

___

### witnesses

• **witnesses**: [`BytesLike`](/api/Interfaces/index.md#byteslike)[] = `[]`

List of witnesses

#### Implementation of

BaseTransactionRequestLike.witnesses

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:109](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L109)

## Methods

### addAccountWitnesses

▸ **addAccountWitnesses**(`account`): `Promise`&lt;[`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)\>

Helper function to add an external signature to the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | [`Account`](/api/Account/Account.md) \| [`Account`](/api/Account/Account.md)[] | The account/s to sign to the transaction. |

#### Returns

`Promise`&lt;[`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)\>

The transaction with the signature witness added.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:277](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L277)

___

### addChangeOutput

▸ **addChangeOutput**(`to`, `assetId?`): `void`

Adds a change output to the transaction.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | `undefined` | Address of the owner. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `BaseAssetId` | Asset ID of coin. |

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:533](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L533)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:353](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L353)

___

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId?`): [`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

Adds a coin output to the transaction.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | `undefined` | Address of the owner. |
| `amount` | `BigNumberish` | `undefined` | Amount of coin. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `BaseAssetId` | Asset ID of coin. |

#### Returns

[`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:497](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L497)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:514](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L514)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:395](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L395)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:467](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L467)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:484](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L484)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:437](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L437)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:454](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L454)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:578](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L578)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:600](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L600)

___

### getBaseTransaction

▸ **getBaseTransaction**(): `ToBaseTransactionResponse`

Method to obtain the base transaction details.

#### Returns

`ToBaseTransactionResponse`

The base transaction details.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:167](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L167)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](/api/Account/index.md#changetransactionrequestoutput)[]

Gets the change outputs for a transaction.

#### Returns

[`ChangeTransactionRequestOutput`](/api/Account/index.md#changetransactionrequestoutput)[]

The change outputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:315](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L315)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](/api/Account/index.md#cointransactionrequestinput)[]

Gets the coin inputs for a transaction.

#### Returns

[`CoinTransactionRequestInput`](/api/Account/index.md#cointransactionrequestinput)[]

The coin inputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:293](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L293)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](/api/Account/index.md#cointransactionrequestoutput)[]

Gets the coin outputs for a transaction.

#### Returns

[`CoinTransactionRequestOutput`](/api/Account/index.md#cointransactionrequestoutput)[]

The coin outputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:304](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L304)

___

### getCoinOutputsQuantities

▸ **getCoinOutputsQuantities**(): [`CoinQuantity`](/api/Account/index.md#coinquantity)[]

Retrieves an array of CoinQuantity for each coin output present in the transaction.
a transaction.

#### Returns

[`CoinQuantity`](/api/Account/index.md#coinquantity)[]

CoinQuantity array.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:640](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L640)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:656](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L656)

___

### toJSON

▸ **toJSON**(): `any`

Return the minimum amount in native coins required to create
a transaction.

#### Returns

`any`

The transaction as a JSON object.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:664](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L664)

___

### toTransaction

▸ **toTransaction**(): `TransactionCreate` \| `TransactionScript`

#### Returns

`TransactionCreate` \| `TransactionScript`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:186](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L186)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

Converts the transaction request to a byte array.

#### Returns

`Uint8Array`

The transaction bytes.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:193](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L193)

___

### updatePredicateInputs

▸ **updatePredicateInputs**(`inputs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputs` | [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] |

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:668](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L668)

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:264](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L264)

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

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:249](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L249)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:134](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/transaction-request.ts#L134)
