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

[packages/providers/src/transaction-request/transaction-request.ts:82](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L82)

## Properties

### gasLimit

• **gasLimit**: `BN`

Gas limit for transaction

#### Implementation of

BaseTransactionRequestLike.gasLimit

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:67](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L67)

___

### gasPrice

• **gasPrice**: `BN`

Gas price for transaction

#### Implementation of

BaseTransactionRequestLike.gasPrice

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:65](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L65)

___

### inputs

• **inputs**: [`TransactionRequestInput`](/api/Providers/index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

BaseTransactionRequestLike.inputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:71](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L71)

___

### maturity

• **maturity**: `number`

Block until which tx cannot be included

#### Implementation of

BaseTransactionRequestLike.maturity

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:69](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L69)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](/api/Providers/index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

BaseTransactionRequestLike.outputs

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:73](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L73)

___

### type

• `Abstract` **type**: [`TransactionType`](/api/Providers/TransactionType.md)

Type of the transaction

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:63](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L63)

___

### witnesses

• **witnesses**: `BytesLike`[] = `[]`

List of witnesses

#### Implementation of

BaseTransactionRequestLike.witnesses

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:361](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L361)

___

### addResourceInputAndOutput

▸ **addResourceInputAndOutput**(`resource`): [`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

Adds a single resource to the transaction by adding inputs and outputs.

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`Resource`](/api/Providers/index.md#resource) |

#### Returns

[`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

This transaction.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:267](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L267)

___

### addResourceInputsAndOutputs

▸ **addResourceInputsAndOutputs**(`resources`): [`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

Adds multiple resources to the transaction by adding inputs and outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resources` | readonly [`Resource`](/api/Providers/index.md#resource)[] | The resources to add. |

#### Returns

[`BaseTransactionRequest`](/api/Providers/BaseTransactionRequest.md)

This transaction.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:326](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L326)

___

### calculateFee

▸ **calculateFee**(): [`CoinQuantity`](/api/Providers/index.md#coinquantity)

Return the minimum amount in native coins required to create
a transaction. This is required even if the gasPrice is 0.

#### Returns

[`CoinQuantity`](/api/Providers/index.md#coinquantity)

The minimum amount in coins required to create a transaction.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:398](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L398)

___

### getBaseTransaction

▸ `Protected` **getBaseTransaction**(): `Pick`&lt;`TransactionScript` \| `TransactionCreate`, ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof `BaseTransactionRequestLike`\>

Method to obtain the base transaction details.

#### Returns

`Pick`&lt;`TransactionScript` \| `TransactionCreate`, ``"inputsCount"`` \| ``"outputsCount"`` \| ``"witnessesCount"`` \| keyof `BaseTransactionRequestLike`\>

The base transaction details.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:103](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L103)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](/api/Providers/index.md#changetransactionrequestoutput)[]

Gets the change outputs for a transaction.

#### Returns

[`ChangeTransactionRequestOutput`](/api/Providers/index.md#changetransactionrequestoutput)[]

The change outputs.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:218](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L218)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](/api/Providers/index.md#cointransactionrequestinput)[]

Gets the coin inputs for a transaction.

#### Returns

[`CoinTransactionRequestInput`](/api/Providers/index.md#cointransactionrequestinput)[]

The coin inputs.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:196](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L196)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](/api/Providers/index.md#cointransactionrequestoutput)[]

Gets the coin outputs for a transaction.

#### Returns

[`CoinTransactionRequestOutput`](/api/Providers/index.md#cointransactionrequestoutput)[]

The coin outputs.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:207](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L207)

___

### toJSON

▸ **toJSON**(): `any`

Return the minimum amount in native coins required to create
a transaction.

#### Returns

`any`

The transaction as a JSON object.

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:413](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L413)

___

### toTransaction

▸ `Abstract` **toTransaction**(): `TransactionScript` \| `TransactionCreate`

#### Returns

`TransactionScript` \| `TransactionCreate`

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:123](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L123)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

Converts the transaction request to a byte array.

#### Returns

`Uint8Array`

The transaction bytes.

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

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:170](https://github.com/FuelLabs/fuels-ts/blob/5ff795dc/packages/providers/src/transaction-request/transaction-request.ts#L170)
