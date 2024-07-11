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

[packages/account/src/providers/transaction-request/transaction-request.ts:118](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L118)

## Properties

### inputs

• **inputs**: [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] = `[]`

List of inputs

#### Implementation of

BaseTransactionRequestLike.inputs

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:107](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L107)

___

### maturity

• `Optional` **maturity**: `number`

Block until which tx cannot be included

#### Implementation of

BaseTransactionRequestLike.maturity

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:101](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L101)

___

### maxFee

• **maxFee**: `BN`

The maximum fee payable by this transaction using BASE_ASSET.

#### Implementation of

BaseTransactionRequestLike.maxFee

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:103](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L103)

___

### outputs

• **outputs**: [`TransactionRequestOutput`](/api/Account/index.md#transactionrequestoutput)[] = `[]`

List of outputs

#### Implementation of

BaseTransactionRequestLike.outputs

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:109](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L109)

___

### tip

• `Optional` **tip**: `BN`

Gas price for transaction

#### Implementation of

BaseTransactionRequestLike.tip

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:99](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L99)

___

### type

• `Abstract` **type**: [`TransactionType`](/api/Account/TransactionType.md)

Type of the transaction

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:97](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L97)

___

### witnessLimit

• `Optional` **witnessLimit**: `BN`

The maximum amount of witness data allowed for the transaction

#### Implementation of

BaseTransactionRequestLike.witnessLimit

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:105](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L105)

___

### witnesses

• **witnesses**: [`BytesLike`](/api/Interfaces/index.md#byteslike)[] = `[]`

List of witnesses

#### Implementation of

BaseTransactionRequestLike.witnesses

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:111](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L111)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:280](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L280)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:502](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L502)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:354](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L354)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:466](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L466)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:483](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L483)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:395](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L395)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:436](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L436)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:453](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L453)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:659](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L659)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:550](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L550)

___

### fundWithFakeUtxos

▸ **fundWithFakeUtxos**(`quantities`, `baseAssetId`, `resourcesOwner?`): `void`

Funds the transaction with fake UTXOs for each assetId and amount in the
quantities array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `quantities` | [`CoinQuantity`](/api/Account/index.md#coinquantity)[] | CoinQuantity Array. |
| `baseAssetId` | `string` | The base asset to fund the transaction. |
| `resourcesOwner?` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | - |

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:577](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L577)

___

### getBaseTransaction

▸ **getBaseTransaction**(): `ToBaseTransactionResponse`

Method to obtain the base transaction details.

#### Returns

`ToBaseTransactionResponse`

The base transaction details.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:170](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L170)

___

### getChangeOutputs

▸ **getChangeOutputs**(): [`ChangeTransactionRequestOutput`](/api/Account/index.md#changetransactionrequestoutput)[]

Gets the change outputs for a transaction.

#### Returns

[`ChangeTransactionRequestOutput`](/api/Account/index.md#changetransactionrequestoutput)[]

The change outputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:318](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L318)

___

### getCoinInputs

▸ **getCoinInputs**(): [`CoinTransactionRequestInput`](/api/Account/index.md#cointransactionrequestinput)[]

Gets the coin inputs for a transaction.

#### Returns

[`CoinTransactionRequestInput`](/api/Account/index.md#cointransactionrequestinput)[]

The coin inputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:296](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L296)

___

### getCoinOutputs

▸ **getCoinOutputs**(): [`CoinTransactionRequestOutput`](/api/Account/index.md#cointransactionrequestoutput)[]

Gets the coin outputs for a transaction.

#### Returns

[`CoinTransactionRequestOutput`](/api/Account/index.md#cointransactionrequestoutput)[]

The coin outputs.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:307](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L307)

___

### getCoinOutputsQuantities

▸ **getCoinOutputsQuantities**(): [`CoinQuantity`](/api/Account/index.md#coinquantity)[]

Retrieves an array of CoinQuantity for each coin output present in the transaction.
a transaction.

#### Returns

[`CoinQuantity`](/api/Account/index.md#coinquantity)[]

CoinQuantity array.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:626](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L626)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:642](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L642)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:654](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L654)

___

### toJSON

▸ **toJSON**(): `any`

Return the minimum amount in native coins required to create
a transaction.

#### Returns

`any`

The transaction as a JSON object.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:650](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L650)

___

### toTransaction

▸ **toTransaction**(): `TransactionScript` \| `TransactionCreate`

#### Returns

`TransactionScript` \| `TransactionCreate`

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:189](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L189)

___

### toTransactionBytes

▸ **toTransactionBytes**(): `Uint8Array`

Converts the transaction request to a byte array.

#### Returns

`Uint8Array`

The transaction bytes.

#### Defined in

[packages/account/src/providers/transaction-request/transaction-request.ts:196](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L196)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:668](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L668)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:267](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L267)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:252](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L252)

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

[packages/account/src/providers/transaction-request/transaction-request.ts:136](https://github.com/FuelLabs/fuels-ts/blob/1a41c2e84f24ca93f6aa919bf95adf35ee3263a1/packages/account/src/providers/transaction-request/transaction-request.ts#L136)
