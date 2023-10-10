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

[packages/providers/src/transaction-request/transaction-request.ts:83](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L83)

## Properties

### gasLimit

• **gasLimit**: `BN`

Gas limit for transaction

#### Implementation of

BaseTransactionRequestLike.gasLimit

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:68](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L68)

___

### gasPrice

• **gasPrice**: `BN`

Gas price for transaction

#### Implementation of

BaseTransactionRequestLike.gasPrice

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:66](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L66)

___

### inputs

• **inputs**: [`TransactionRequestInput`](/api/Providers/index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

BaseTransactionRequestLike.inputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:72](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L72)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Implementation of

BaseTransactionRequestLike.maturity

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:70](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L70)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](/api/Providers/index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

BaseTransactionRequestLike.outputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:74](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L74)

___

### type

• `Abstract` **type**: [`TransactionType`](/api/Providers/TransactionType.md)

Type of the transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:64](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L64)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Implementation of

BaseTransactionRequestLike.witnesses

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:76](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L76)

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

[packages/providers/src/transaction-request/transaction-request.ts:439](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L439)

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

[packages/providers/src/transaction-request/transaction-request.ts:257](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L257)

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

[packages/providers/src/transaction-request/transaction-request.ts:403](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L403)

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

[packages/providers/src/transaction-request/transaction-request.ts:420](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L420)

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

[packages/providers/src/transaction-request/transaction-request.ts:300](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L300)

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

[packages/providers/src/transaction-request/transaction-request.ts:373](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L373)

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

[packages/providers/src/transaction-request/transaction-request.ts:390](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L390)

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

[packages/providers/src/transaction-request/transaction-request.ts:343](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L343)

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

[packages/providers/src/transaction-request/transaction-request.ts:360](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L360)

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:473](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L473)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`&lt;`TransactionScript` \| `TransactionCreate`, ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof `BaseTransactionRequestLike`\>

Method to obtain the base transaction details.

#### Returns

`Pick`&lt;`TransactionScript` \| `TransactionCreate`, ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof `BaseTransactionRequestLike`\>

The base transaction details.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:104](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L104)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](/api/Providers/index.md#changetransactionrequestoutput)[]

Gets the change outputs for a transaction.

#### Returns

[`ChangeTransactionRequestOutput`](/api/Providers/index.md#changetransactionrequestoutput)[]

The change outputs.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:219](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L219)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](/api/Providers/index.md#cointransactionrequestinput)[]

Gets the coin inputs for a transaction.

#### Returns

[`CoinTransactionRequestInput`](/api/Providers/index.md#cointransactionrequestinput)[]

The coin inputs.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:197](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L197)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](/api/Providers/index.md#cointransactionrequestoutput)[]

Gets the coin outputs for a transaction.

#### Returns

[`CoinTransactionRequestOutput`](/api/Providers/index.md#cointransactionrequestoutput)[]

The coin outputs.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:208](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L208)

___

### toJSON

▸ **toJSON**(): `any`

Return the minimum amount in native coins required to create
a transaction.

#### Returns

`any`

The transaction as a JSON object.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:488](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L488)

___

### toTransaction

▸ `Abstract` **toTransaction**(): `TransactionScript` \| `TransactionCreate`

#### Returns

`TransactionScript` \| `TransactionCreate`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:124](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L124)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

Converts the transaction request to a byte array.

#### Returns

`Uint8Array`

The transaction bytes.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:131](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L131)

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

[packages/providers/src/transaction-request/transaction-request.ts:185](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L185)

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

[packages/providers/src/transaction-request/transaction-request.ts:171](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packages/providers/src/transaction-request/transaction-request.ts#L171)
