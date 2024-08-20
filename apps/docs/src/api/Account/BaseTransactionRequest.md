# Class: BaseTransactionRequest

[@fuel-ts/account](/api/Account/index.md).BaseTransactionRequest

Abstract class to define the functionalities of a transaction request transaction request.

## Hierarchy

- **`BaseTransactionRequest`**

  ↳ [`BlobTransactionRequest`](/api/Account/BlobTransactionRequest.md)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:124](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L124)

## Properties

### inputs

• **inputs**: [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

BaseTransactionRequestLike.inputs

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:113](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L113)

___

### maturity

• `Optional` **maturity**: `number`

Block until which tx cannot be included

#### Implementation of

BaseTransactionRequestLike.maturity

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:107](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L107)

___

### maxFee

• **maxFee**: `BN`

The maximum fee payable by this transaction using BASE_ASSET.

#### Implementation of

BaseTransactionRequestLike.maxFee

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:109](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L109)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](/api/Account/index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

BaseTransactionRequestLike.outputs

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:115](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L115)

___

### tip

• `Optional` **tip**: `BN`

Gas price for transaction

#### Implementation of

BaseTransactionRequestLike.tip

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:105](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L105)

___

### type

• `Abstract` **type**: [`TransactionType`](/api/Account/TransactionType.md)

Type of the transaction

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:103](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L103)

___

### witnessLimit

• `Optional` **witnessLimit**: `BN`

The maximum amount of witness data allowed for the transaction

#### Implementation of

BaseTransactionRequestLike.witnessLimit

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:111](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L111)

___

### witnesses

• **witnesses**: [`BytesLike`](/api/Interfaces/index.md#byteslike)[] = `[]`

List of witnesses

#### Implementation of

BaseTransactionRequestLike.witnesses

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:117](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L117)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:286](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L286)

___

### addChangeOutput

▸ **addChangeOutput**(`to`, `assetId`): `void`

Adds a change output to the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | Address of the owner. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Asset ID of coin. |

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:508](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L508)

___

### addCoinInput

▸ **addCoinInput**(`coin`): `void`

Adds a single coin input to the transaction and a change output for the related
assetId, if one it was not added yet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coin` | [`Coin`](/api/Account/index.md#coin) | Coin resource. |

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:360](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L360)

___

### addCoinOutput

▸ **addCoinOutput**(`to`, `amount`, `assetId`): [`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

Adds a coin output to the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | [`AddressLike`](/api/Interfaces/index.md#addresslike) | Address of the owner. |
| `amount` | `BigNumberish` | Amount of coin. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Asset ID of coin. |

#### Returns

[`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:472](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L472)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:489](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L489)

___

### addMessageInput

▸ **addMessageInput**(`message`): `void`

Adds a single message input to the transaction and a change output for the
asset against the message

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`MessageCoin`](/api/Account/index.md#messagecoin) | Message resource. |

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:401](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L401)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:442](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L442)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:459](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L459)

___

### adjustWitnessIndexes

▸ **adjustWitnessIndexes**(`removedIndex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `removedIndex` | `number` |

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:667](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L667)

___

### byteLength

▸ **byteLength**(): `number`

#### Returns

`number`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:696](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L696)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:556](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L556)

___

### fundWithFakeUtxos

▸ **fundWithFakeUtxos**(`quantities`, `baseAssetId`, `resourcesOwner?`): [`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

Funds the transaction with fake UTXOs for each assetId and amount in the
quantities array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quantities` | [`CoinQuantity`](/api/Account/index.md#coinquantity)[] | CoinQuantity Array. |
| `baseAssetId` | `string` | The base asset to fund the transaction. |
| `resourcesOwner?` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | - |

#### Returns

[`BaseTransactionRequest`](/api/Account/BaseTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:583](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L583)

___

### getBaseTransaction

▸ **getBaseTransaction**(): `ToBaseTransactionResponse`

Method to obtain the base transaction details.

#### Returns

`ToBaseTransactionResponse`

The base transaction details.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:176](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L176)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](/api/Account/index.md#changetransactionrequestoutput)[]

Gets the change outputs for a transaction.

#### Returns

[`ChangeTransactionRequestOutput`](/api/Account/index.md#changetransactionrequestoutput)[]

The change outputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:324](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L324)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](/api/Account/index.md#cointransactionrequestinput)[]

Gets the coin inputs for a transaction.

#### Returns

[`CoinTransactionRequestInput`](/api/Account/index.md#cointransactionrequestinput)[]

The coin inputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:302](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L302)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](/api/Account/index.md#cointransactionrequestoutput)[]

Gets the coin outputs for a transaction.

#### Returns

[`CoinTransactionRequestOutput`](/api/Account/index.md#cointransactionrequestoutput)[]

The coin outputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:313](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L313)

___

### getCoinOutputsQuantities

▸ **getCoinOutputsQuantities**(): [`CoinQuantity`](/api/Account/index.md#coinquantity)[]

Retrieves an array of CoinQuantity for each coin output present in the transaction.
a transaction.

#### Returns

[`CoinQuantity`](/api/Account/index.md#coinquantity)[]

CoinQuantity array.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:634](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L634)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:650](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L650)

___

### removeWitness

▸ **removeWitness**(`index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:662](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L662)

___

### toJSON

▸ **toJSON**(): `any`

Return the minimum amount in native coins required to create
a transaction.

#### Returns

`any`

The transaction as a JSON object.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:658](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L658)

___

### toTransaction

▸ **toTransaction**(): `TransactionScript` \| `TransactionCreate` \| `TransactionBlob`

#### Returns

`TransactionScript` \| `TransactionCreate` \| `TransactionBlob`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:195](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L195)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

Converts the transaction request to a byte array.

#### Returns

`Uint8Array`

The transaction bytes.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:202](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L202)

___

### updatePredicateGasUsed

▸ **updatePredicateGasUsed**(`inputs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputs` | [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] |

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:676](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L676)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:273](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L273)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:258](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L258)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:142](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/providers/transaction-request/transaction-request.ts#L142)
