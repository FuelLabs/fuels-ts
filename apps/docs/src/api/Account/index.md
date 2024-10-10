**@fuel-ts/account v0.95.0** • [**Docs**](index.md)

***

# @fuel-ts/account

## Type Aliases

### AbiMap

> **AbiMap**: `Record`\&lt;`string`, `JsonAbi`\>

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:145](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L145)

***

### AccountEvent

> **AccountEvent**: `object`

Event trigger when the current account on the connector is changed
if the account is not authorized for the connection it should trigger with value null.

#### Type declaration

##### data

> **data**: `string` \| `null`

##### type

> **type**: [`currentAccount`](./FuelConnectorEventTypes.md#currentaccount)

#### Defined in

[packages/account/src/connectors/types/events.ts:40](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/events.ts#L40)

***

### AccountsEvent

> **AccountsEvent**: `object`

Event trigger when the accounts available to the
connection changes.

#### Type declaration

##### data

> **data**: `string`[]

##### type

> **type**: [`accounts`](./FuelConnectorEventTypes.md#accounts)

#### Defined in

[packages/account/src/connectors/types/events.ts:28](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/events.ts#L28)

***

### Asset

> **Asset**: `object`

#### Type declaration

##### icon

> **icon**: `string`

icon of the asset

##### name

> **name**: `string`

name of the asset

##### networks

> **networks**: ([`NetworkEthereum`](index.md#networkethereum) \| [`NetworkFuel`](index.md#networkfuel))[]

asset id on Fuel Network

##### symbol

> **symbol**: `string`

description of the asset

#### Defined in

[packages/account/src/providers/assets/types.ts:25](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/types.ts#L25)

***

### AssetEth

> **AssetEth**: `Omit`\&lt;[`Asset`](index.md#asset), `"networks"`\> & [`NetworkEthereum`](index.md#networkethereum)

#### Defined in

[packages/account/src/providers/assets/types.ts:38](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/types.ts#L38)

***

### AssetFuel

> **AssetFuel**: `Omit`\&lt;[`Asset`](index.md#asset), `"networks"`\> & [`NetworkFuel`](index.md#networkfuel)

#### Defined in

[packages/account/src/providers/assets/types.ts:39](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/types.ts#L39)

***

### Assets

> **Assets**: [`Asset`](index.md#asset)[]

#### Defined in

[packages/account/src/providers/assets/types.ts:36](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/types.ts#L36)

***

### Block

> **Block**: `object`

A Fuel block

#### Type declaration

##### header

> **header**: `object`

##### header.applicationHash

> **header.applicationHash**: `string`

##### header.daHeight

> **header.daHeight**: `BN`

##### header.eventInboxRoot

> **header.eventInboxRoot**: `string`

##### header.messageOutboxRoot

> **header.messageOutboxRoot**: `string`

##### header.prevRoot

> **header.prevRoot**: `string`

##### header.stateTransitionBytecodeVersion

> **header.stateTransitionBytecodeVersion**: `string`

##### header.transactionsCount

> **header.transactionsCount**: `string`

##### header.transactionsRoot

> **header.transactionsRoot**: `string`

##### height

> **height**: `BN`

##### id

> **id**: `string`

##### time

> **time**: `string`

##### transactionIds

> **transactionIds**: `string`[]

#### Defined in

[packages/account/src/providers/provider.ts:91](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L91)

***

### BlockHeader

> **BlockHeader**: `object`

#### Type declaration

##### applicationHash

> **applicationHash**: `string`

##### consensusParametersVersion

> **consensusParametersVersion**: `number`

##### daHeight

> **daHeight**: `BN`

##### eventInboxRoot

> **eventInboxRoot**: `string`

##### height

> **height**: `BN`

##### id

> **id**: `string`

##### messageOutboxRoot

> **messageOutboxRoot**: `string`

##### messageReceiptCount

> **messageReceiptCount**: `number`

##### prevRoot

> **prevRoot**: `string`

##### stateTransitionBytecodeVersion

> **stateTransitionBytecodeVersion**: `number`

##### time

> **time**: `string`

##### transactionsCount

> **transactionsCount**: `number`

##### transactionsRoot

> **transactionsRoot**: `string`

#### Defined in

[packages/account/src/providers/message.ts:39](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/message.ts#L39)

***

### BlockId

> **BlockId**: [`SuccessStatus`](index.md#successstatus)\[`"block"`\]\[`"id"`\] \| [`FailureStatus`](index.md#failurestatus)\[`"block"`\]\[`"id"`\]

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:27](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L27)

***

### BurnedAsset

> **BurnedAsset**: [`MintedAsset`](./MintedAsset.md)

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:174](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L174)

***

### CacheFor

> **CacheFor**: `object`

#### Index Signature

 \[`key`: `string`\]: `object` \| `null`

#### Defined in

[packages/account/src/connectors/utils/cache.ts:3](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/utils/cache.ts#L3)

***

### CalculateTXFeeForSummaryParams

> **CalculateTXFeeForSummaryParams**: `object`

#### Type declaration

##### consensusParameters

> **consensusParameters**: `Pick`\&lt;[`ConsensusParameters`](index.md#consensusparameters-2), `"gasCosts"`\> & `object`

###### Type declaration

###### feeParams

> **feeParams**: `FeeParams`

###### maxGasPerTx

> **maxGasPerTx**: `BN`

##### gasPrice

> **gasPrice**: `BN`

##### rawPayload

> **rawPayload**: `string`

##### tip

> **tip**: `BN`

##### totalFee?

> `optional` **totalFee**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/calculate-tx-fee-for-summary.ts:24](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/calculate-tx-fee-for-summary.ts#L24)

***

### CallResult

> **CallResult**: `object`

#### Type declaration

##### dryRunStatus?

> `optional` **dryRunStatus**: [`DryRunStatus`](index.md#dryrunstatus-1)

##### receipts

> **receipts**: `TransactionResultReceipt`[]

#### Defined in

[packages/account/src/providers/provider.ts:78](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L78)

***

### ChainInfo

> **ChainInfo**: `object`

Chain information

#### Type declaration

##### baseChainHeight

> **baseChainHeight**: `BN`

##### consensusParameters

> **consensusParameters**: [`ConsensusParameters`](index.md#consensusparameters-2)

##### name

> **name**: `string`

#### Defined in

[packages/account/src/providers/provider.ts:168](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L168)

***

### ChangeTransactionRequestOutput

> **ChangeTransactionRequestOutput**: `object`

#### Type declaration

##### assetId

> **assetId**: [`BytesLike`](../Interfaces/index.md#byteslike)

Asset ID of coins

##### to

> **to**: [`BytesLike`](../Interfaces/index.md#byteslike)

Receiving address or script hash

##### type

> **type**: `OutputType.Change`

#### Defined in

[packages/account/src/providers/transaction-request/output.ts:24](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/output.ts#L24)

***

### Coin

> **Coin**: `object`

A Fuel coin

#### Type declaration

##### amount

> **amount**: `BN`

##### assetId

> **assetId**: `string`

##### blockCreated

> **blockCreated**: `BN`

##### id

> **id**: `string`

##### owner

> **owner**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

##### predicate?

> `optional` **predicate**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### predicateData?

> `optional` **predicateData**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### txCreatedIdx

> **txCreatedIdx**: `BN`

#### Defined in

[packages/account/src/providers/coin.ts:7](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/coin.ts#L7)

***

### CoinQuantity

> **CoinQuantity**: `object`

#### Type declaration

##### amount

> **amount**: `BN`

##### assetId

> **assetId**: `string`

##### max?

> `optional` **max**: `BN`

#### Defined in

[packages/account/src/providers/coin-quantity.ts:9](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/coin-quantity.ts#L9)

***

### CoinQuantityLike

> **CoinQuantityLike**: [`BigNumberish`, [`BytesLike`](../Interfaces/index.md#byteslike), `BigNumberish`] \| `object`

#### Defined in

[packages/account/src/providers/coin-quantity.ts:6](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/coin-quantity.ts#L6)

***

### CoinTransactionRequestInput

> **CoinTransactionRequestInput**: `object`

#### Type declaration

##### amount

> **amount**: `BigNumberish`

Amount of coins

##### assetId

> **assetId**: [`BytesLike`](../Interfaces/index.md#byteslike)

Asset ID of the coins

##### id

> **id**: [`BytesLike`](../Interfaces/index.md#byteslike)

UTXO ID

##### owner

> **owner**: [`BytesLike`](../Interfaces/index.md#byteslike)

Owning address or script hash

##### predicate?

> `optional` **predicate**: [`BytesLike`](../Interfaces/index.md#byteslike)

Predicate bytecode

##### predicateData?

> `optional` **predicateData**: [`BytesLike`](../Interfaces/index.md#byteslike)

Predicate input data (parameters)

##### predicateGasUsed?

> `optional` **predicateGasUsed**: `BigNumberish`

Gas used by predicate

##### txPointer

> **txPointer**: [`BytesLike`](../Interfaces/index.md#byteslike)

Points to the TX whose output is being spent. (TxPointer)

##### type

> **type**: `InputType.Coin`

##### witnessIndex

> **witnessIndex**: `number`

Index of witness that authorizes spending the coin

#### Defined in

[packages/account/src/providers/transaction-request/input.ts:11](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/input.ts#L11)

***

### CoinTransactionRequestOutput

> **CoinTransactionRequestOutput**: `object`

#### Type declaration

##### amount

> **amount**: `BigNumberish`

Amount of coins to send

##### assetId

> **assetId**: [`BytesLike`](../Interfaces/index.md#byteslike)

Asset ID of coins

##### to

> **to**: [`BytesLike`](../Interfaces/index.md#byteslike)

Receiving address or script hash

##### type

> **type**: `OutputType.Coin`

#### Defined in

[packages/account/src/providers/transaction-request/output.ts:10](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/output.ts#L10)

***

### ConnectorMetadata

> **ConnectorMetadata**: `object`

#### Type declaration

##### image?

> `optional` **image**: `string` \| `object`

##### install

> **install**: `object`

##### install.action

> **install.action**: `string`

##### install.description

> **install.description**: `string`

##### install.link

> **install.link**: `string`

#### Defined in

[packages/account/src/connectors/types/connector-metadata.ts:2](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/connector-metadata.ts#L2)

***

### ConsensusParameters

> **ConsensusParameters**: `object`

#### Type declaration

##### baseAssetId

> **baseAssetId**: `string`

##### chainId

> **chainId**: `BN`

##### contractParameters

> **contractParameters**: `ModifyStringToBN`\&lt;[`ContractParameters`](index.md#contractparameters-1)\>

##### feeParameters

> **feeParameters**: `ModifyStringToBN`\&lt;[`FeeParameters`](index.md#feeparameters-1)\>

##### gasCosts

> **gasCosts**: [`GasCosts`](index.md#gascosts-1)

##### predicateParameters

> **predicateParameters**: `ModifyStringToBN`\&lt;[`PredicateParameters`](index.md#predicateparameters-1)\>

##### scriptParameters

> **scriptParameters**: `ModifyStringToBN`\&lt;[`ScriptParameters`](index.md#scriptparameters-1)\>

##### txParameters

> **txParameters**: `ModifyStringToBN`\&lt;[`TxParameters`](index.md#txparameters-1)\>

##### version

> **version**: `GqlConsensusParametersVersion`

#### Defined in

[packages/account/src/providers/provider.ts:153](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L153)

***

### ContractCreatedTransactionRequestOutput

> **ContractCreatedTransactionRequestOutput**: `object`

#### Type declaration

##### contractId

> **contractId**: [`BytesLike`](../Interfaces/index.md#byteslike)

Contract ID

##### stateRoot

> **stateRoot**: [`BytesLike`](../Interfaces/index.md#byteslike)

State Root

##### type

> **type**: `OutputType.ContractCreated`

#### Defined in

[packages/account/src/providers/transaction-request/output.ts:34](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/output.ts#L34)

***

### ContractParameters

> **ContractParameters**: `object`

#### Type declaration

##### contractMaxSize

> **contractMaxSize**: `Scalars`\[`"U64"`\]\[`"output"`\]

##### maxStorageSlots

> **maxStorageSlots**: `Scalars`\[`"U64"`\]\[`"output"`\]

##### version

> **version**: `GqlContractParametersVersion`

#### Defined in

packages/account/src/providers/\_\_generated\_\_/operations.ts:236

***

### ContractResult

> **ContractResult**: `object`

Deployed Contract bytecode and contract id

#### Type declaration

##### bytecode

> **bytecode**: `string`

##### id

> **id**: `string`

#### Defined in

[packages/account/src/providers/provider.ts:135](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L135)

***

### ContractTransactionRequestInput

> **ContractTransactionRequestInput**: `object`

#### Type declaration

##### contractId

> **contractId**: [`BytesLike`](../Interfaces/index.md#byteslike)

Contract ID

##### txPointer

> **txPointer**: [`BytesLike`](../Interfaces/index.md#byteslike)

Points to the TX whose output is being spent. (TxPointer)

##### type

> **type**: `InputType.Contract`

#### Defined in

[packages/account/src/providers/transaction-request/input.ts:73](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/input.ts#L73)

***

### ContractTransactionRequestOutput

> **ContractTransactionRequestOutput**: `object`

#### Type declaration

##### inputIndex

> **inputIndex**: `number`

Index of input contract

##### type

> **type**: `OutputType.Contract`

#### Defined in

[packages/account/src/providers/transaction-request/output.ts:19](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/output.ts#L19)

***

### DeferPromise\&lt;R\>

> **DeferPromise**\&lt;`R`\>: `object`

#### Type Parameters

• **R** = `unknown`

#### Type declaration

##### promise

> **promise**: `Promise`\&lt;`R`\>

##### reject()

> **reject**: (`error`) => `void`

###### Parameters

• **error**: `unknown`

###### Returns

`void`

##### resolve()

> **resolve**: (`value`) => `void`

###### Parameters

• **value**: `R`

###### Returns

`void`

#### Defined in

[packages/account/src/connectors/utils/promises.ts:5](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/utils/promises.ts#L5)

***

### DryRunFailureStatusFragment

> **DryRunFailureStatusFragment**: `GqlDryRunFailureStatusFragment`

#### Defined in

[packages/account/src/providers/provider.ts:73](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L73)

***

### DryRunStatus

> **DryRunStatus**: [`DryRunFailureStatusFragment`](index.md#dryrunfailurestatusfragment) \| [`DryRunSuccessStatusFragment`](index.md#dryrunsuccessstatusfragment)

#### Defined in

[packages/account/src/providers/provider.ts:76](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L76)

***

### DryRunSuccessStatusFragment

> **DryRunSuccessStatusFragment**: `GqlDryRunSuccessStatusFragment`

#### Defined in

[packages/account/src/providers/provider.ts:74](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L74)

***

### EstimateTransactionParams

> **EstimateTransactionParams**: `object`

Transaction estimation params

#### Type declaration

##### estimateTxDependencies?

> `optional` **estimateTxDependencies**: `boolean`

Estimate the transaction dependencies.

#### Defined in

[packages/account/src/providers/provider.ts:332](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L332)

***

### EstimateTxDependenciesReturns

> **EstimateTxDependenciesReturns**: [`CallResult`](index.md#callresult) & `object`

#### Type declaration

##### missingContractIds

> **missingContractIds**: `string`[]

##### outputVariables

> **outputVariables**: `number`

#### Defined in

[packages/account/src/providers/provider.ts:83](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L83)

***

### EstimatedTxParams

> **EstimatedTxParams**: `Pick`\&lt;[`TransactionCost`](index.md#transactioncost), `"estimatedPredicates"` \| `"addedSignatures"` \| `"requiredQuantities"` \| `"updateMaxFee"` \| `"gasPrice"`\>

#### Defined in

[packages/account/src/account.ts:62](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/account.ts#L62)

***

### FailureStatus

> **FailureStatus**: `GqlFailureStatusFragment`

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:20](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L20)

***

### FakeResources

> **FakeResources**: `Partial`\&lt;[`Coin`](index.md#coin)\> & `Required`\&lt;`Pick`\&lt;[`Coin`](index.md#coin), `"amount"` \| `"assetId"`\>\>

#### Defined in

[packages/account/src/account.ts:68](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/account.ts#L68)

***

### FeeParameters

> **FeeParameters**: `object`

#### Type declaration

##### gasPerByte

> **gasPerByte**: `Scalars`\[`"U64"`\]\[`"output"`\]

##### gasPriceFactor

> **gasPriceFactor**: `Scalars`\[`"U64"`\]\[`"output"`\]

##### version

> **version**: `GqlFeeParametersVersion`

#### Defined in

packages/account/src/providers/\_\_generated\_\_/operations.ts:295

***

### FuelABI

> **FuelABI**: `JsonAbi`

ABI that represents a binary code interface from Sway.

Read more at: https://docs.fuel.network/docs/specs/abi/json-abi-format/

#### Defined in

[packages/account/src/connectors/types/data-type.ts:44](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/data-type.ts#L44)

***

### FuelConfig

> **FuelConfig**: `object`

#### Type declaration

##### connectors?

> `optional` **connectors**: [`FuelConnector`](./FuelConnector.md)[]

##### storage?

> `optional` **storage**: [`StorageAbstract`](./StorageAbstract.md) \| `null`

##### targetObject?

> `optional` **targetObject**: [`TargetObject`](./TargetObject.md)

#### Defined in

[packages/account/src/connectors/fuel.ts:30](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/fuel.ts#L30)

***

### FuelConnectorEvents

> **FuelConnectorEvents**: [`ConnectionEvent`](index.md#connectionevent) \| [`NetworkEvent`](index.md#networkevent) \| [`NetworksEvent`](index.md#networksevent) \| [`AccountEvent`](index.md#accountevent) \| [`AccountsEvent`](index.md#accountsevent) \| [`ConnectorsEvent`](index.md#connectorsevent) \| [`ConnectorEvent`](index.md#connectorevent) \| [`AssetsEvent`](index.md#assetsevent)

All the events available to the connector.

#### Defined in

[packages/account/src/connectors/types/events.ts:122](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/events.ts#L122)

***

### FuelConnectorEventsType

> **FuelConnectorEventsType**: [`FuelConnectorEvents`](index.md#fuelconnectorevents)\[`"type"`\]

#### Defined in

[packages/account/src/connectors/types/events.ts:132](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/events.ts#L132)

***

### FuelConnectorSelectOptions

> **FuelConnectorSelectOptions**: `object`

#### Type declaration

##### emitEvents?

> `optional` **emitEvents**: `boolean`

#### Defined in

[packages/account/src/connectors/fuel.ts:36](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/fuel.ts#L36)

***

### FuelEventArg\&lt;T\>

> **FuelEventArg**\&lt;`T`\>: `Extract`\&lt;[`FuelConnectorEventTypes`](./FuelConnectorEventTypes.md), `object`\>\[`"data"`\]

Extract the event argument type from the event type.

#### Type Parameters

• **T** *extends* [`FuelConnectorEvents`](index.md#fuelconnectorevents)\[`"type"`\]

#### Defined in

[packages/account/src/connectors/types/events.ts:16](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/events.ts#L16)

***

### GasCosts

> **GasCosts**: `object`

#### Type declaration

##### contractRoot

> **contractRoot**: `object` \| `object`

##### ecr1

> **ecr1**: `string`

##### newStoragePerByte

> **newStoragePerByte**: `string`

##### s256

> **s256**: `object` \| `object`

##### stateRoot

> **stateRoot**: `object` \| `object`

##### vmInitialization

> **vmInitialization**: `object` \| `object`

#### Defined in

packages/account/src/providers/\_\_generated\_\_/operations.ts:1321

***

### GetAssetNetworkParams\&lt;T\>

> **GetAssetNetworkParams**\&lt;`T`\>: `object`

#### Type Parameters

• **T** *extends* [`NetworkTypes`](index.md#networktypes) \| `undefined`

#### Type declaration

##### asset

> **asset**: [`Asset`](index.md#asset)

##### chainId?

> `optional` **chainId**: `number`

##### networkType

> **networkType**: `T`

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:22](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/utils/network.ts#L22)

***

### GetBalancesResponse

> **GetBalancesResponse**: `object`

#### Type declaration

##### balances

> **balances**: [`CoinQuantity`](index.md#coinquantity)[]

#### Defined in

[packages/account/src/providers/provider.ts:118](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L118)

***

### GetBlocksResponse

> **GetBlocksResponse**: `object`

#### Type declaration

##### blocks

> **blocks**: [`Block`](index.md#block)[]

##### pageInfo

> **pageInfo**: `GqlPageInfo`

#### Defined in

[packages/account/src/providers/provider.ts:127](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L127)

***

### GetCoinsResponse

> **GetCoinsResponse**: `object`

#### Type declaration

##### coins

> **coins**: [`Coin`](index.md#coin)[]

##### pageInfo

> **pageInfo**: `GqlPageInfo`

#### Defined in

[packages/account/src/providers/provider.ts:108](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L108)

***

### GetMessagesResponse

> **GetMessagesResponse**: `object`

#### Type declaration

##### messages

> **messages**: [`Message`](index.md#message)[]

##### pageInfo

> **pageInfo**: `GqlPageInfo`

#### Defined in

[packages/account/src/providers/provider.ts:113](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L113)

***

### GetOperationParams

> **GetOperationParams**: `object` & [`InputOutputParam`](index.md#inputoutputparam) & [`ReceiptParam`](index.md#receiptparam) & [`RawPayloadParam`](index.md#rawpayloadparam)

#### Type declaration

##### abiMap?

> `optional` **abiMap**: [`AbiMap`](index.md#abimap)

##### baseAssetId

> **baseAssetId**: `string`

##### maxInputs

> **maxInputs**: `BN`

##### transactionType

> **transactionType**: [`TransactionType`](./TransactionType.md)

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:158](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L158)

***

### GetTransactionsResponse

> **GetTransactionsResponse**: `object`

#### Type declaration

##### pageInfo

> **pageInfo**: `GqlPageInfo`

##### transactions

> **transactions**: `Transaction`[]

#### Defined in

[packages/account/src/providers/provider.ts:122](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L122)

***

### GqlTransaction

> **GqlTransaction**: `NonNullable`\&lt;`GqlGetTransactionQuery`\[`"transaction"`\]\>

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:15](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L15)

***

### GraphqlTransactionStatus

> **GraphqlTransactionStatus**: [`GqlTransaction`](index.md#gqltransaction)\[`"status"`\]

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:17](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L17)

***

### InputOutputParam

> **InputOutputParam**: [`InputParam`](index.md#inputparam) & [`OutputParam`](index.md#outputparam)

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:151](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L151)

***

### InputParam

> **InputParam**: `object`

#### Type declaration

##### inputs

> **inputs**: `Input`[]

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:133](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L133)

***

### JsonAbisFromAllCalls

> **JsonAbisFromAllCalls**: `object`

#### Type declaration

##### main

> **main**: `JsonAbi`

##### otherContractsAbis

> **otherContractsAbis**: `Record`\&lt;`string`, `JsonAbi`\>

#### Defined in

[packages/account/src/providers/transaction-request/types.ts:38](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/types.ts#L38)

***

### MerkleProof

> **MerkleProof**: `object`

#### Type declaration

##### proofIndex

> **proofIndex**: `BN`

##### proofSet

> **proofSet**: `string`[]

#### Defined in

[packages/account/src/providers/message.ts:34](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/message.ts#L34)

***

### Message

> **Message**: `object`

A Fuel message

#### Type declaration

##### amount

> **amount**: `BN`

##### daHeight

> **daHeight**: `BN`

##### data

> **data**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### messageId

> **messageId**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### nonce

> **nonce**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### predicate?

> `optional` **predicate**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### predicateData?

> `optional` **predicateData**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### recipient

> **recipient**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

##### sender

> **sender**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Defined in

[packages/account/src/providers/message.ts:10](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/message.ts#L10)

***

### MessageCoin

> **MessageCoin**: `object`

#### Type declaration

##### amount

> **amount**: `BN`

##### assetId

> **assetId**: `string`

##### daHeight

> **daHeight**: `BN`

##### nonce

> **nonce**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### predicate?

> `optional` **predicate**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### predicateData?

> `optional` **predicateData**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### recipient

> **recipient**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

##### sender

> **sender**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Defined in

[packages/account/src/providers/message.ts:23](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/message.ts#L23)

***

### MessageProof

> **MessageProof**: `object`

Message Proof

#### Type declaration

##### amount

> **amount**: `BN`

##### blockProof

> **blockProof**: [`MerkleProof`](index.md#merkleproof)

##### commitBlockHeader

> **commitBlockHeader**: [`BlockHeader`](index.md#blockheader)

##### data

> **data**: `string`

##### messageBlockHeader

> **messageBlockHeader**: [`BlockHeader`](index.md#blockheader)

##### messageProof

> **messageProof**: [`MerkleProof`](index.md#merkleproof)

##### nonce

> **nonce**: `string`

##### recipient

> **recipient**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

##### sender

> **sender**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Defined in

[packages/account/src/providers/message.ts:58](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/message.ts#L58)

***

### MessageStatus

> **MessageStatus**: `object`

Message Status

#### Type declaration

##### state

> **state**: `GqlMessageState`

#### Defined in

[packages/account/src/providers/message.ts:73](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/message.ts#L73)

***

### MessageTransactionRequestInput

> **MessageTransactionRequestInput**: `object`

#### Type declaration

##### amount

> **amount**: `BigNumberish`

Amount of coins

##### data?

> `optional` **data**: [`BytesLike`](../Interfaces/index.md#byteslike)

data of message

##### nonce

> **nonce**: [`BytesLike`](../Interfaces/index.md#byteslike)

Unique nonce of message

##### predicate?

> `optional` **predicate**: [`BytesLike`](../Interfaces/index.md#byteslike)

Predicate bytecode

##### predicateData?

> `optional` **predicateData**: [`BytesLike`](../Interfaces/index.md#byteslike)

Predicate input data (parameters)

##### predicateGasUsed?

> `optional` **predicateGasUsed**: `BigNumberish`

Gas used by predicate

##### recipient

> **recipient**: [`BytesLike`](../Interfaces/index.md#byteslike)

Address of recipient

##### sender

> **sender**: [`BytesLike`](../Interfaces/index.md#byteslike)

Address of sender

##### type

> **type**: `InputType.Message`

##### witnessIndex

> **witnessIndex**: `number`

Index of witness that authorizes the message

#### Defined in

[packages/account/src/providers/transaction-request/input.ts:42](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/input.ts#L42)

***

### MnemonicPhrase

> **MnemonicPhrase**: `string` \| `string`[]

#### Defined in

[packages/account/src/mnemonic/utils.ts:7](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/mnemonic/utils.ts#L7)

***

### Network

> **Network**: `object`

**`Name`**

Network

#### Type declaration

##### chainId

> **chainId**: `number`

The chain id of the network.

##### url

> **url**: `string`

The name of the network.

#### Defined in

[packages/account/src/connectors/types/data-type.ts:21](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/data-type.ts#L21)

***

### NetworkEthereum

> **NetworkEthereum**: `object`

#### Type declaration

##### address?

> `optional` **address**: `string`

address of the asset contract

##### chainId

> **chainId**: `number`

chain id of the network

##### decimals

> **decimals**: `number`

number of decimals of the asset

##### type

> **type**: `"ethereum"`

type of network

#### Defined in

[packages/account/src/providers/assets/types.ts:1](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/types.ts#L1)

***

### NetworkFuel

> **NetworkFuel**: `object`

#### Type declaration

##### assetId

> **assetId**: `string`

assetId on the Fuel Network

##### chainId

> **chainId**: `number`

chain id of the network

##### contractId?

> `optional` **contractId**: `string`

the contractId of that generated the Asset on the Fuel Network

##### decimals

> **decimals**: `number`

number of decimals of the asset

##### type

> **type**: `"fuel"`

type of network

#### Defined in

[packages/account/src/providers/assets/types.ts:12](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/types.ts#L12)

***

### NetworkTypes

> **NetworkTypes**: [`NetworkEthereum`](index.md#networkethereum)\[`"type"`\] \| [`NetworkFuel`](index.md#networkfuel)\[`"type"`\]

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:5](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/utils/network.ts#L5)

***

### NodeInfo

> **NodeInfo**: `object`

Node information

#### Type declaration

##### maxDepth

> **maxDepth**: `BN`

##### maxTx

> **maxTx**: `BN`

##### nodeVersion

> **nodeVersion**: `string`

##### utxoValidation

> **utxoValidation**: `boolean`

##### vmBacktrace

> **vmBacktrace**: `boolean`

#### Defined in

[packages/account/src/providers/provider.ts:177](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L177)

***

### NodeInfoAndConsensusParameters

> **NodeInfoAndConsensusParameters**: `object`

#### Type declaration

##### gasPerByte

> **gasPerByte**: `BN`

##### gasPriceFactor

> **gasPriceFactor**: `BN`

##### maxGasPerTx

> **maxGasPerTx**: `BN`

##### nodeVersion

> **nodeVersion**: `string`

#### Defined in

[packages/account/src/providers/provider.ts:185](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L185)

***

### Operation

> **Operation**: `object`

#### Type declaration

##### assetsSent?

> `optional` **assetsSent**: [`OperationCoin`](index.md#operationcoin)[]

##### calls?

> `optional` **calls**: [`OperationFunctionCall`](index.md#operationfunctioncall)[]

##### from?

> `optional` **from**: [`OperationTransactionAddress`](index.md#operationtransactionaddress)

##### name?

> `optional` **name**: `OperationName`

##### to?

> `optional` **to**: [`OperationTransactionAddress`](index.md#operationtransactionaddress)

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:103](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L103)

***

### OperationCoin

> **OperationCoin**: `object`

#### Type declaration

##### amount

> **amount**: `BNInput`

##### assetId

> **assetId**: `string`

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:92](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L92)

***

### OperationFunctionCall

> **OperationFunctionCall**: `object` & `Partial`\&lt;[`OperationCoin`](index.md#operationcoin)\>

#### Type declaration

##### argumentsProvided?

> `optional` **argumentsProvided**: `Record`\&lt;`string`, `unknown`\>

##### functionName

> **functionName**: `string`

##### functionSignature

> **functionSignature**: `string`

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:97](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L97)

***

### OperationTransactionAddress

> **OperationTransactionAddress**: `object`

#### Type declaration

##### address

> **address**: `string`

##### chain?

> `optional` **chain**: `ChainName`

##### type

> **type**: `AddressType`

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:127](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L127)

***

### OutputParam

> **OutputParam**: `object`

#### Type declaration

##### outputs

> **outputs**: `Output`[]

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:137](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L137)

***

### PredicateParameters

> **PredicateParameters**: `object`

#### Type declaration

##### maxGasPerPredicate

> **maxGasPerPredicate**: `Scalars`\[`"U64"`\]\[`"output"`\]

##### maxMessageDataLength

> **maxMessageDataLength**: `Scalars`\[`"U64"`\]\[`"output"`\]

##### maxPredicateDataLength

> **maxPredicateDataLength**: `Scalars`\[`"U64"`\]\[`"output"`\]

##### maxPredicateLength

> **maxPredicateLength**: `Scalars`\[`"U64"`\]\[`"output"`\]

##### version

> **version**: `GqlPredicateParametersVersion`

#### Defined in

packages/account/src/providers/\_\_generated\_\_/operations.ts:752

***

### PredicateParams\&lt;TData, TConfigurables\>

> **PredicateParams**\&lt;`TData`, `TConfigurables`\>: `object`

#### Type Parameters

• **TData** *extends* `InputValue`[] = `InputValue`[]

• **TConfigurables** *extends* `object` \| `undefined` = `object`

#### Type declaration

##### abi?

> `optional` **abi**: `JsonAbi`

##### bytecode

> **bytecode**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### configurableConstants?

> `optional` **configurableConstants**: `TConfigurables`

##### data?

> `optional` **data**: `TData`

##### loaderBytecode?

> `optional` **loaderBytecode**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### provider

> **provider**: [`Provider`](./Provider.md)

#### Defined in

[packages/account/src/predicate/predicate.ts:29](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/predicate/predicate.ts#L29)

***

### ProgramState

> **ProgramState**: [`SuccessStatus`](index.md#successstatus)\[`"programState"`\]

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:25](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L25)

***

### ProviderCallParams

> **ProviderCallParams**: [`UTXOValidationParams`](index.md#utxovalidationparams) & [`EstimateTransactionParams`](index.md#estimatetransactionparams)

Provider Call transaction params

#### Defined in

[packages/account/src/providers/provider.ts:357](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L357)

***

### ProviderOptions

> **ProviderOptions**: `object`

#### Type declaration

##### fetch()?

> `optional` **fetch**: (`url`, `requestInit`?, `providerOptions`?) => `Promise`\&lt;`Response`\>

Custom fetch function to use for making requests.

###### Parameters

• **url**: `string`

• **requestInit?**: `RequestInit`

• **providerOptions?**: `Omit`\&lt;[`ProviderOptions`](index.md#provideroptions), `"fetch"`\>

###### Returns

`Promise`\&lt;`Response`\>

##### headers?

> `optional` **headers**: `RequestInit`\[`"headers"`\]

Custom headers to include in the request.

##### requestMiddleware()?

> `optional` **requestMiddleware**: (`request`) => `RequestInit` \| `Promise`\&lt;`RequestInit`\>

Middleware to modify the request before it is sent.
This can be used to add headers, modify the body, etc.

###### Parameters

• **request**: `RequestInit`

###### Returns

`RequestInit` \| `Promise`\&lt;`RequestInit`\>

##### resourceCacheTTL?

> `optional` **resourceCacheTTL**: `number`

Resources cache for the given time [ms]. If set to -1, the cache will be disabled.

##### retryOptions?

> `optional` **retryOptions**: `RetryOptions`

Retry options to use when fetching data from the node.

##### timeout?

> `optional` **timeout**: `number`

Timeout [ms] after which every request will be aborted.

#### Defined in

[packages/account/src/providers/provider.ts:290](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L290)

***

### ProviderSendTxParams

> **ProviderSendTxParams**: [`EstimateTransactionParams`](index.md#estimatetransactionparams)

Provider Send transaction params

#### Defined in

[packages/account/src/providers/provider.ts:362](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L362)

***

### RawCoin

> **RawCoin**: `object`

#### Type declaration

##### amount

> **amount**: `string`

##### assetId

> **assetId**: `string`

##### blockCreated

> **blockCreated**: `string`

##### owner

> **owner**: `string`

##### txCreatedIdx

> **txCreatedIdx**: `string`

##### utxoId

> **utxoId**: `string`

#### Defined in

[packages/account/src/providers/resource.ts:6](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/resource.ts#L6)

***

### RawMessage

> **RawMessage**: `object`

#### Type declaration

##### amount

> **amount**: `string`

##### assetId

> **assetId**: `string`

##### daHeight

> **daHeight**: `string`

##### data

> **data**: `string`

##### nonce

> **nonce**: `string`

##### recipient

> **recipient**: `string`

##### sender

> **sender**: `string`

#### Defined in

[packages/account/src/providers/resource.ts:15](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/resource.ts#L15)

***

### RawPayloadParam

> **RawPayloadParam**: `object`

#### Type declaration

##### rawPayload?

> `optional` **rawPayload**: `string`

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:147](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L147)

***

### RawResource

> **RawResource**: [`RawCoin`](index.md#rawcoin) \| [`RawMessage`](index.md#rawmessage)

#### Defined in

[packages/account/src/providers/resource.ts:25](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/resource.ts#L25)

***

### Reason

> **Reason**: [`FailureStatus`](index.md#failurestatus)\[`"reason"`\]

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:24](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L24)

***

### ReceiptParam

> **ReceiptParam**: `object`

#### Type declaration

##### receipts

> **receipts**: `TransactionResultReceipt`[]

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:141](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L141)

***

### Resource

> **Resource**: [`Coin`](index.md#coin) \| [`MessageCoin`](index.md#messagecoin)

#### Defined in

[packages/account/src/providers/resource.ts:26](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/resource.ts#L26)

***

### ScriptParameters

> **ScriptParameters**: `object`

#### Type declaration

##### maxScriptDataLength

> **maxScriptDataLength**: `Scalars`\[`"U64"`\]\[`"output"`\]

##### maxScriptLength

> **maxScriptLength**: `Scalars`\[`"U64"`\]\[`"output"`\]

##### version

> **version**: `GqlScriptParametersVersion`

#### Defined in

packages/account/src/providers/\_\_generated\_\_/operations.ts:1061

***

### SelectNetworkArguments

> **SelectNetworkArguments**: `RequireAtLeastOne`\&lt;[`Network`](index.md#network), `"chainId"` \| `"url"`\>

**`Name`**

SelectNetworkArguments

Select a network requires either the `chainId` or the `url`.

#### Defined in

[packages/account/src/connectors/types/data-type.ts:37](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/data-type.ts#L37)

***

### SqueezedOutStatus

> **SqueezedOutStatus**: `GqlSqueezedOutStatusFragment`

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:22](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L22)

***

### Status

> **Status**: `object`

#### Type declaration

##### connected

> **connected**: `boolean`

##### installed

> **installed**: `boolean`

#### Defined in

[packages/account/src/connectors/fuel.ts:40](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/fuel.ts#L40)

***

### SubmittedStatus

> **SubmittedStatus**: `GqlSubmittedStatusFragment`

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:21](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L21)

***

### SuccessStatus

> **SuccessStatus**: `GqlSuccessStatusFragment`

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:19](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L19)

***

### Time

> **Time**: [`SubmittedStatus`](index.md#submittedstatus)\[`"time"`\] \| [`SuccessStatus`](index.md#successstatus)\[`"time"`\] \| [`FailureStatus`](index.md#failurestatus)\[`"time"`\]

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:26](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L26)

***

### TransactionCost

> **TransactionCost**: `object`

#### Type declaration

##### addedSignatures

> **addedSignatures**: `number`

##### dryRunStatus?

> `optional` **dryRunStatus**: [`DryRunStatus`](index.md#dryrunstatus-1)

##### estimatedPredicates

> **estimatedPredicates**: [`TransactionRequestInput`](index.md#transactionrequestinput)[]

##### gasPrice

> **gasPrice**: `BN`

##### gasUsed

> **gasUsed**: `BN`

##### maxFee

> **maxFee**: `BN`

##### maxGas

> **maxGas**: `BN`

##### minFee

> **minFee**: `BN`

##### minGas

> **minGas**: `BN`

##### missingContractIds

> **missingContractIds**: `string`[]

##### outputVariables

> **outputVariables**: `number`

##### receipts

> **receipts**: `TransactionResultReceipt`[]

##### requiredQuantities

> **requiredQuantities**: [`CoinQuantity`](index.md#coinquantity)[]

##### updateMaxFee?

> `optional` **updateMaxFee**: `boolean`

#### Defined in

[packages/account/src/providers/provider.ts:193](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L193)

***

### TransactionCostParams

> **TransactionCostParams**: [`EstimateTransactionParams`](index.md#estimatetransactionparams) & `object`

#### Type declaration

##### quantities?

> `optional` **quantities**: [`CoinQuantity`](index.md#coinquantity)[]

The quantities to forward to the contract.

##### signatureCallback()?

> `optional` **signatureCallback**: (`request`) => `Promise`\&lt;[`ScriptTransactionRequest`](./ScriptTransactionRequest.md)\>

A callback to sign the transaction.

###### Parameters

• **request**: [`ScriptTransactionRequest`](./ScriptTransactionRequest.md)

The transaction request to sign.

###### Returns

`Promise`\&lt;[`ScriptTransactionRequest`](./ScriptTransactionRequest.md)\>

A promise that resolves to the signed transaction request.

#### Defined in

[packages/account/src/providers/provider.ts:339](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L339)

***

### TransactionRequest

> **TransactionRequest**: [`ScriptTransactionRequest`](./ScriptTransactionRequest.md) \| [`CreateTransactionRequest`](./CreateTransactionRequest.md) \| [`BlobTransactionRequest`](./BlobTransactionRequest.md) \| [`UpgradeTransactionRequest`](./UpgradeTransactionRequest.md) \| [`UploadTransactionRequest`](./UploadTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/types.ts:25](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/types.ts#L25)

***

### TransactionRequestInput

> **TransactionRequestInput**: [`CoinTransactionRequestInput`](index.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](index.md#contracttransactionrequestinput) \| [`MessageTransactionRequestInput`](index.md#messagetransactionrequestinput)

#### Defined in

[packages/account/src/providers/transaction-request/input.ts:82](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/input.ts#L82)

***

### TransactionRequestLike

> **TransactionRequestLike**: `object` & `ScriptTransactionRequestLike` \| `object` & `CreateTransactionRequestLike` \| `object` & [`BlobTransactionRequestLike`](./BlobTransactionRequestLike.md) \| `object` & `UpgradeTransactionRequestLike` \| `object` & `UploadTransactionRequestLike`

#### Defined in

[packages/account/src/providers/transaction-request/types.ts:31](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/types.ts#L31)

***

### TransactionRequestOutput

> **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](index.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](index.md#contracttransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](index.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](index.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](index.md#contractcreatedtransactionrequestoutput)

#### Defined in

[packages/account/src/providers/transaction-request/output.ts:41](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/output.ts#L41)

***

### TransactionResultBurnReceipt

> **TransactionResultBurnReceipt**: `ReceiptBurn`

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:67](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-response/transaction-response.ts#L67)

***

### TransactionResultMintReceipt

> **TransactionResultMintReceipt**: `ReceiptMint`

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:66](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-response/transaction-response.ts#L66)

***

### TransactionSummary\&lt;TTransactionType\>

> **TransactionSummary**\&lt;`TTransactionType`\>: `object`

#### Type Parameters

• **TTransactionType** = `void`

#### Type declaration

##### blockId?

> `optional` **blockId**: [`BlockId`](index.md#blockid)

##### burnedAssets

> **burnedAssets**: [`BurnedAsset`](index.md#burnedasset)[]

##### date?

> `optional` **date**: `Date`

##### fee

> **fee**: `BN`

##### gasUsed

> **gasUsed**: `BN`

##### id

> **id**: `string`

##### isStatusFailure

> **isStatusFailure**: `boolean`

##### isStatusPending

> **isStatusPending**: `boolean`

##### isStatusSuccess

> **isStatusSuccess**: `boolean`

##### isTypeBlob

> **isTypeBlob**: `boolean`

##### isTypeCreate

> **isTypeCreate**: `boolean`

##### isTypeMint

> **isTypeMint**: `boolean`

##### isTypeScript

> **isTypeScript**: `boolean`

##### isTypeUpgrade

> **isTypeUpgrade**: `boolean`

##### isTypeUpload

> **isTypeUpload**: `boolean`

##### mintedAssets

> **mintedAssets**: [`MintedAsset`](./MintedAsset.md)[]

##### operations

> **operations**: [`Operation`](index.md#operation)[]

##### receipts

> **receipts**: `TransactionResultReceipt`[]

##### status?

> `optional` **status**: `TransactionStatus`

##### time?

> `optional` **time**: `string`

##### tip

> **tip**: `BN`

##### transaction

> **transaction**: `Transaction`\&lt;`TTransactionType`\>

##### type

> **type**: `TransactionTypeName`

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:176](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/types.ts#L176)

***

### TransferParams

> **TransferParams**: `object`

#### Type declaration

##### amount

> **amount**: `BigNumberish`

##### assetId?

> `optional` **assetId**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### destination

> **destination**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Defined in

[packages/account/src/account.ts:56](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/account.ts#L56)

***

### TxParameters

> **TxParameters**: `object`

#### Type declaration

##### maxBytecodeSubsections

> **maxBytecodeSubsections**: `Scalars`\[`"U16"`\]\[`"output"`\]

##### maxGasPerTx

> **maxGasPerTx**: `Scalars`\[`"U64"`\]\[`"output"`\]

##### maxInputs

> **maxInputs**: `Scalars`\[`"U16"`\]\[`"output"`\]

##### maxOutputs

> **maxOutputs**: `Scalars`\[`"U16"`\]\[`"output"`\]

##### maxSize

> **maxSize**: `Scalars`\[`"U64"`\]\[`"output"`\]

##### maxWitnesses

> **maxWitnesses**: `Scalars`\[`"U32"`\]\[`"output"`\]

##### version

> **version**: `GqlTxParametersVersion`

#### Defined in

packages/account/src/providers/\_\_generated\_\_/operations.ts:1208

***

### TxParamsType

> **TxParamsType**: `Pick`\&lt;`ScriptTransactionRequestLike`, `"gasLimit"` \| `"tip"` \| `"maturity"` \| `"maxFee"` \| `"witnessLimit"`\>

#### Defined in

[packages/account/src/account.ts:51](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/account.ts#L51)

***

### UTXOValidationParams

> **UTXOValidationParams**: `object`

UTXO validation params

#### Type declaration

##### utxoValidation?

> `optional` **utxoValidation**: `boolean`

#### Defined in

[packages/account/src/providers/provider.ts:325](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L325)

***

### VariableTransactionRequestOutput

> **VariableTransactionRequestOutput**: `object`

#### Type declaration

##### type

> **type**: `OutputType.Variable`

#### Defined in

[packages/account/src/providers/transaction-request/output.ts:31](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/output.ts#L31)

***

### VaultConfig

> **VaultConfig**: `object`

#### Type declaration

##### secret?

> `optional` **secret**: `string`

##### title?

> `optional` **title**: `string`

##### type

> **type**: `string`

#### Defined in

[packages/account/src/wallet-manager/types.ts:17](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/wallet-manager/types.ts#L17)

***

### VaultsState

> **VaultsState**: `object`[]

#### Defined in

[packages/account/src/wallet-manager/types.ts:23](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/wallet-manager/types.ts#L23)

***

### Version

> **Version**: `object`

**`Name`**

Version

#### Type declaration

##### app

> **app**: `string`

##### network

> **network**: `string`

Version selection this allow
Caret Ranges ^1.2.3 ^0.2.5 ^0.0.4
Tilde Ranges ~1.2.3 ~1.2 ~1
And Exact Versions 1.0.0

#### Defined in

[packages/account/src/connectors/types/data-type.ts:7](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/data-type.ts#L7)

***

### WalletManagerAccount

> **WalletManagerAccount**: `object`

#### Type declaration

##### address

> **address**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

##### publicKey

> **publicKey**: `string`

##### vaultId?

> `optional` **vaultId**: `number`

#### Defined in

[packages/account/src/wallet-manager/types.ts:7](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/wallet-manager/types.ts#L7)

***

### WalletManagerOptions

> **WalletManagerOptions**: `object`

#### Type declaration

##### storage

> **storage**: [`StorageAbstract`](./StorageAbstract.md)

#### Defined in

[packages/account/src/wallet-manager/types.ts:13](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/wallet-manager/types.ts#L13)

## Variables

### BLOCKS\_PAGE\_SIZE\_LIMIT

> `const` **BLOCKS\_PAGE\_SIZE\_LIMIT**: `5` = `5`

#### Defined in

[packages/account/src/providers/provider.ts:70](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L70)

***

### CHAIN\_IDS

> `const` **CHAIN\_IDS**: `object`

#### Type declaration

##### eth

> **eth**: `object`

##### eth.foundry

> **eth.foundry**: `number` = `31337`

##### eth.mainnet

> **eth.mainnet**: `number` = `1`

##### eth.sepolia

> **eth.sepolia**: `number` = `11155111`

##### fuel

> **fuel**: `object`

##### fuel.devnet

> **fuel.devnet**: `number` = `0`

##### fuel.mainnet

> **fuel.mainnet**: `number` = `9889`

##### fuel.testnet

> **fuel.testnet**: `number` = `0`

#### Defined in

[packages/account/src/providers/chains.ts:1](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/chains.ts#L1)

***

### DEFAULT\_RESOURCE\_CACHE\_TTL

> `const` **DEFAULT\_RESOURCE\_CACHE\_TTL**: `20000` = `20_000`

#### Defined in

[packages/account/src/providers/provider.ts:71](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L71)

***

### FuelConnectorEventType

> `const` **FuelConnectorEventType**: `"FuelConnector"` = `'FuelConnector'`

#### Defined in

[packages/account/src/connectors/types/connector-types.ts:42](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/connector-types.ts#L42)

***

### MNEMONIC\_SIZES

> `const` **MNEMONIC\_SIZES**: `number`[]

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:20](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/mnemonic/mnemonic.ts#L20)

***

### RESOURCES\_PAGE\_SIZE\_LIMIT

> `const` **RESOURCES\_PAGE\_SIZE\_LIMIT**: `512` = `512`

#### Defined in

[packages/account/src/providers/provider.ts:68](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L68)

***

### TRANSACTIONS\_PAGE\_SIZE\_LIMIT

> `const` **TRANSACTIONS\_PAGE\_SIZE\_LIMIT**: `60` = `60`

#### Defined in

[packages/account/src/providers/provider.ts:69](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/provider.ts#L69)

***

### assets

> `const` **assets**: `object`[]

#### Defined in

[packages/account/src/providers/assets/assets.ts:621](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/assets.ts#L621)

***

### english

> `const` **english**: `string`[]

#### Defined in

[packages/account/src/wordlists/words/english.ts:1](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/wordlists/words/english.ts#L1)

***

### fuelAssetsBaseUrl

> `const` **fuelAssetsBaseUrl**: `"https://cdn.fuel.network/assets/"` = `'https://cdn.fuel.network/assets/'`

#### Defined in

[packages/account/src/providers/assets/utils/fuelAssetsBaseUrl.ts:1](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/utils/fuelAssetsBaseUrl.ts#L1)

***

### rawAssets

> `const` **rawAssets**: [`Assets`](index.md#assets)

#### Defined in

[packages/account/src/providers/assets/assets.ts:6](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/assets.ts#L6)

## Functions

### addAmountToCoinQuantities()

> **addAmountToCoinQuantities**(`params`): [`CoinQuantity`](index.md#coinquantity)[]

#### Parameters

• **params**: [`IAddAmountToAssetParams`](./IAddAmountToAssetParams.md)

#### Returns

[`CoinQuantity`](index.md#coinquantity)[]

#### Defined in

[packages/account/src/providers/coin-quantity.ts:40](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/coin-quantity.ts#L40)

***

### assemblePanicError()

> **assemblePanicError**(`statusReason`, `metadata`): `FuelError`

Assembles an error message for a panic status.

#### Parameters

• **statusReason**: `string`

• **metadata**: `Record`\&lt;`string`, `unknown`\>

#### Returns

`FuelError`

The error message.

#### Defined in

[packages/account/src/providers/utils/extract-tx-error.ts:22](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/extract-tx-error.ts#L22)

***

### assembleReceiptByType()

> **assembleReceiptByType**(`receipt`): `ReceiptCall` \| `ReceiptReturn` \| `ReceiptReturnData` \| `ReceiptPanic` \| `ReceiptRevert` \| `ReceiptLog` \| `ReceiptLogData` \| `ReceiptTransfer` \| `ReceiptTransferOut` \| `ReceiptScriptResult` \| `ReceiptMessageOut` \| `ReceiptMint` \| `ReceiptBurn`

#### Parameters

• **receipt**: `GqlReceiptFragment`

#### Returns

`ReceiptCall` \| `ReceiptReturn` \| `ReceiptReturnData` \| `ReceiptPanic` \| `ReceiptRevert` \| `ReceiptLog` \| `ReceiptLogData` \| `ReceiptTransfer` \| `ReceiptTransferOut` \| `ReceiptScriptResult` \| `ReceiptMessageOut` \| `ReceiptMint` \| `ReceiptBurn`

#### Defined in

[packages/account/src/providers/utils/receipts.ts:64](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/receipts.ts#L64)

***

### assembleRevertError()

> **assembleRevertError**(`receipts`, `logs`, `metadata`): `FuelError`

Assembles an error message for a revert status.

#### Parameters

• **receipts**: `TransactionResultReceipt`[]

The transaction result processed receipts.

• **logs**: `unknown`[]

The transaction decoded logs.

• **metadata**: `Record`\&lt;`string`, `unknown`\>

#### Returns

`FuelError`

The error message.

#### Defined in

[packages/account/src/providers/utils/extract-tx-error.ts:47](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/extract-tx-error.ts#L47)

***

### cacheFor()

> **cacheFor**\&lt;`F`\>(`fn`, `__namedParameters`): `F`

#### Type Parameters

• **F** *extends* (...`args`) => `Promise`\&lt;`unknown`\>

#### Parameters

• **fn**: `F`

• **\_\_namedParameters**: `CacheForOptions`

#### Returns

`F`

#### Defined in

[packages/account/src/connectors/utils/cache.ts:16](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/utils/cache.ts#L16)

***

### cacheRequestInputsResources()

> **cacheRequestInputsResources**(`inputs`): `Required`\&lt;`ExcludeResourcesOption`\>

#### Parameters

• **inputs**: [`TransactionRequestInput`](index.md#transactionrequestinput)[]

#### Returns

`Required`\&lt;`ExcludeResourcesOption`\>

#### Defined in

[packages/account/src/providers/transaction-request/helpers.ts:62](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/helpers.ts#L62)

***

### cacheRequestInputsResourcesFromOwner()

> **cacheRequestInputsResourcesFromOwner**(`inputs`, `owner`): `ExcludeResourcesOption`

#### Parameters

• **inputs**: [`TransactionRequestInput`](index.md#transactionrequestinput)[]

• **owner**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Returns

`ExcludeResourcesOption`

#### Defined in

[packages/account/src/providers/transaction-request/helpers.ts:78](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/helpers.ts#L78)

***

### calculateGasFee()

> **calculateGasFee**(`params`): `BN`

#### Parameters

• **params**: [`CalculateGasFeeParams`](./CalculateGasFeeParams.md)

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:241](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/gas.ts#L241)

***

### calculateMetadataGasForTxBlob()

> **calculateMetadataGasForTxBlob**(`__namedParameters`): `BN`

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.gasCosts**: [`GasCosts`](index.md#gascosts-1)

• **\_\_namedParameters.txBytesSize**: `number`

• **\_\_namedParameters.witnessBytesSize**: `number`

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:162](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/gas.ts#L162)

***

### calculateMetadataGasForTxCreate()

> **calculateMetadataGasForTxCreate**(`__namedParameters`): `BN`

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.contractBytesSize**: `BN`

• **\_\_namedParameters.gasCosts**: [`GasCosts`](index.md#gascosts-1)

• **\_\_namedParameters.stateRootSize**: `number`

• **\_\_namedParameters.txBytesSize**: `number`

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:131](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/gas.ts#L131)

***

### calculateMetadataGasForTxScript()

> **calculateMetadataGasForTxScript**(`__namedParameters`): `BN`

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.gasCosts**: [`GasCosts`](index.md#gascosts-1)

• **\_\_namedParameters.txBytesSize**: `number`

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:152](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/gas.ts#L152)

***

### calculateMetadataGasForTxUpgrade()

> **calculateMetadataGasForTxUpgrade**(`__namedParameters`): `BN`

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.consensusSize?**: `number`

• **\_\_namedParameters.gasCosts**: [`GasCosts`](index.md#gascosts-1)

• **\_\_namedParameters.txBytesSize**: `number`

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:176](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/gas.ts#L176)

***

### calculateMetadataGasForTxUpload()

> **calculateMetadataGasForTxUpload**(`__namedParameters`): `BN`

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.gasCosts**: [`GasCosts`](index.md#gascosts-1)

• **\_\_namedParameters.subsectionSize**: `number`

• **\_\_namedParameters.subsectionsSize**: `number`

• **\_\_namedParameters.txBytesSize**: `number`

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:195](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/gas.ts#L195)

***

### calculateMinGasForTxUpload()

> **calculateMinGasForTxUpload**(`__namedParameters`): `BN`

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.baseMinGas**: `number`

• **\_\_namedParameters.gasCosts**: [`GasCosts`](index.md#gascosts-1)

• **\_\_namedParameters.subsectionSize**: `number`

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:217](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/gas.ts#L217)

***

### calculateTXFeeForSummary()

> **calculateTXFeeForSummary**(`params`): `BN`

#### Parameters

• **params**: [`CalculateTXFeeForSummaryParams`](index.md#calculatetxfeeforsummaryparams)

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/transaction-summary/calculate-tx-fee-for-summary.ts:35](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/calculate-tx-fee-for-summary.ts#L35)

***

### deferPromise()

> **deferPromise**\&lt;`R`\>(): [`DeferPromise`](index.md#deferpromiser)\&lt;`R`\>

#### Type Parameters

• **R** = `unknown`

#### Returns

[`DeferPromise`](index.md#deferpromiser)\&lt;`R`\>

#### Defined in

[packages/account/src/connectors/utils/promises.ts:11](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/utils/promises.ts#L11)

***

### dispatchFuelConnectorEvent()

> **dispatchFuelConnectorEvent**(`connector`): `void`

Fuel Connector Event is a custom event that can be used by the connector to
inform the Fuel Connector Manager that a new connector is available.

#### Parameters

• **connector**: [`FuelConnector`](./FuelConnector.md)

#### Returns

`void`

#### Defined in

[packages/account/src/connectors/utils/dispatch-fuel-connector-event.ts:8](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/utils/dispatch-fuel-connector-event.ts#L8)

***

### extractBurnedAssetsFromReceipts()

> **extractBurnedAssetsFromReceipts**(`receipts`): [`MintedAsset`](./MintedAsset.md)[]

#### Parameters

• **receipts**: `TransactionResultReceipt`[]

#### Returns

[`MintedAsset`](./MintedAsset.md)[]

#### Defined in

[packages/account/src/providers/transaction-summary/receipt.ts:31](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/receipt.ts#L31)

***

### extractMintedAssetsFromReceipts()

> **extractMintedAssetsFromReceipts**(`receipts`): [`MintedAsset`](./MintedAsset.md)[]

#### Parameters

• **receipts**: `TransactionResultReceipt`[]

#### Returns

[`MintedAsset`](./MintedAsset.md)[]

#### Defined in

[packages/account/src/providers/transaction-summary/receipt.ts:12](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/receipt.ts#L12)

***

### extractTxError()

> **extractTxError**(`params`): `FuelError`

Extracts the transaction error and returns a FuelError object.

#### Parameters

• **params**: `IExtractTxError`

#### Returns

`FuelError`

The FuelError object.

#### Defined in

[packages/account/src/providers/utils/extract-tx-error.ts:132](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/extract-tx-error.ts#L132)

***

### gasUsedByInputs()

> **gasUsedByInputs**(`inputs`, `txBytesSize`, `gasCosts`): `BN`

#### Parameters

• **inputs**: ([`TransactionRequestInput`](index.md#transactionrequestinput) \| `Input`)[]

• **txBytesSize**: `number`

• **gasCosts**: [`GasCosts`](index.md#gascosts-1)

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:40](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/gas.ts#L40)

***

### getAssetAmountInRequestInputs()

> **getAssetAmountInRequestInputs**(`inputs`, `assetId`, `baseAsset`): `BN`

#### Parameters

• **inputs**: [`TransactionRequestInput`](index.md#transactionrequestinput)[]

• **assetId**: `string`

• **baseAsset**: `string`

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/transaction-request/helpers.ts:45](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/helpers.ts#L45)

***

### getAssetEth()

> **getAssetEth**(`asset`, `chainId`?): `undefined` \| [`AssetEth`](index.md#asseteth)

Returns the asset's details on Ethereum

#### Parameters

• **asset**: [`Asset`](index.md#asset)

• **chainId?**: `number`

#### Returns

`undefined` \| [`AssetEth`](index.md#asseteth)

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:80](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/utils/network.ts#L80)

***

### getAssetFuel()

> **getAssetFuel**(`asset`, `chainId`?): `undefined` \| [`AssetFuel`](index.md#assetfuel)

Returns the asset's details on Fuel

#### Parameters

• **asset**: [`Asset`](index.md#asset)

• **chainId?**: `number`

#### Returns

`undefined` \| [`AssetFuel`](index.md#assetfuel)

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:90](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/utils/network.ts#L90)

***

### getAssetNetwork()

> **getAssetNetwork**\&lt;`T`\>(`__namedParameters`): `NetworkTypeToNetwork`\&lt;`T`\>

Returns the asset's network on the given network
eg. getAssetNetwork({ asset, chainId: 1, networkType: 'ethereum' }) will return the asset's details on Ethereum mainnet

#### Type Parameters

• **T** *extends* `undefined` \| [`NetworkTypes`](index.md#networktypes)

#### Parameters

• **\_\_namedParameters**: [`GetAssetNetworkParams`](index.md#getassetnetworkparamst)\&lt;`T`\>

#### Returns

`NetworkTypeToNetwork`\&lt;`T`\>

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:32](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/utils/network.ts#L32)

***

### getAssetWithNetwork()

> **getAssetWithNetwork**\&lt;`T`\>(`__namedParameters`): `undefined` \| [`AssetEth`](index.md#asseteth) \| [`AssetFuel`](index.md#assetfuel)

Returns the asset's details on the given network alongwith the asset itself
eg. getAssetWithNetwork({ asset, chainId: 1, networkType: 'ethereum' }) will return the asset's details on Ethereum mainnet and the asset itself

#### Type Parameters

• **T** *extends* [`NetworkTypes`](index.md#networktypes)

#### Parameters

• **\_\_namedParameters**: [`GetAssetNetworkParams`](index.md#getassetnetworkparamst)\&lt;`T`\>

#### Returns

`undefined` \| [`AssetEth`](index.md#asseteth) \| [`AssetFuel`](index.md#assetfuel)

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:48](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/utils/network.ts#L48)

***

### getDefaultChainId()

> **getDefaultChainId**(`networkType`): `undefined` \| `number`

Returns the default chainId for the given network

#### Parameters

• **networkType**: [`NetworkTypes`](index.md#networktypes)

#### Returns

`undefined` \| `number`

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:11](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/utils/network.ts#L11)

***

### getMaxGas()

> **getMaxGas**(`params`): `BN`

#### Parameters

• **params**: [`IGetMaxGasParams`](./IGetMaxGasParams.md)

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:110](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/gas.ts#L110)

***

### getMinGas()

> **getMinGas**(`params`): `BN`

#### Parameters

• **params**: [`IGetMinGasParams`](./IGetMinGasParams.md)

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:88](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/gas.ts#L88)

***

### getRequestInputResourceOwner()

> **getRequestInputResourceOwner**(`input`): [`BytesLike`](../Interfaces/index.md#byteslike)

#### Parameters

• **input**: [`CoinTransactionRequestInput`](index.md#cointransactionrequestinput) \| [`MessageTransactionRequestInput`](index.md#messagetransactionrequestinput)

#### Returns

[`BytesLike`](../Interfaces/index.md#byteslike)

#### Defined in

[packages/account/src/providers/transaction-request/helpers.ts:36](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/helpers.ts#L36)

***

### getTransactionSummary()

> **getTransactionSummary**\&lt;`TTransactionType`\>(`params`): `Promise`\&lt;`TransactionResult`\>

#### Type Parameters

• **TTransactionType** = `void`

#### Parameters

• **params**: `GetTransactionSummaryParams`

#### Returns

`Promise`\&lt;`TransactionResult`\>

#### Defined in

[packages/account/src/providers/transaction-summary/get-transaction-summary.ts:26](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/get-transaction-summary.ts#L26)

***

### isMessageCoin()

> **isMessageCoin**(`message`): `message is MessageCoin`

#### Parameters

• **message**: [`Message`](index.md#message) \| [`MessageCoin`](index.md#messagecoin)

#### Returns

`message is MessageCoin`

#### Defined in

[packages/account/src/providers/message.ts:77](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/message.ts#L77)

***

### isRequestInputCoin()

> **isRequestInputCoin**(`input`): `input is CoinTransactionRequestInput`

#### Parameters

• **input**: [`TransactionRequestInput`](index.md#transactionrequestinput)

#### Returns

`input is CoinTransactionRequestInput`

#### Defined in

[packages/account/src/providers/transaction-request/helpers.ts:13](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/helpers.ts#L13)

***

### isRequestInputCoinOrMessage()

> **isRequestInputCoinOrMessage**(`input`): input is CoinTransactionRequestInput \| MessageTransactionRequestInput

#### Parameters

• **input**: [`TransactionRequestInput`](index.md#transactionrequestinput)

#### Returns

input is CoinTransactionRequestInput \| MessageTransactionRequestInput

#### Defined in

[packages/account/src/providers/transaction-request/helpers.ts:26](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/helpers.ts#L26)

***

### isRequestInputMessage()

> **isRequestInputMessage**(`input`): `input is MessageTransactionRequestInput`

#### Parameters

• **input**: [`TransactionRequestInput`](index.md#transactionrequestinput)

#### Returns

`input is MessageTransactionRequestInput`

#### Defined in

[packages/account/src/providers/transaction-request/helpers.ts:17](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/helpers.ts#L17)

***

### isRequestInputMessageWithoutData()

> **isRequestInputMessageWithoutData**(`input`): `input is MessageTransactionRequestInput`

#### Parameters

• **input**: [`TransactionRequestInput`](index.md#transactionrequestinput)

#### Returns

`input is MessageTransactionRequestInput`

#### Defined in

[packages/account/src/providers/transaction-request/helpers.ts:21](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/helpers.ts#L21)

***

### isRequestInputResource()

> **isRequestInputResource**(`input`): input is CoinTransactionRequestInput \| MessageTransactionRequestInput

#### Parameters

• **input**: [`TransactionRequestInput`](index.md#transactionrequestinput)

#### Returns

input is CoinTransactionRequestInput \| MessageTransactionRequestInput

#### Defined in

[packages/account/src/providers/transaction-request/helpers.ts:31](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/helpers.ts#L31)

***

### isRequestInputResourceFromOwner()

> **isRequestInputResourceFromOwner**(`input`, `owner`): `boolean`

#### Parameters

• **input**: [`CoinTransactionRequestInput`](index.md#cointransactionrequestinput) \| [`MessageTransactionRequestInput`](index.md#messagetransactionrequestinput)

• **owner**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

#### Returns

`boolean`

#### Defined in

[packages/account/src/providers/transaction-request/helpers.ts:40](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-request/helpers.ts#L40)

***

### processGqlReceipt()

> **processGqlReceipt**(`gqlReceipt`): `TransactionResultReceipt`

#### Parameters

• **gqlReceipt**: `GqlReceiptFragment`

#### Returns

`TransactionResultReceipt`

#### Defined in

[packages/account/src/providers/transaction-summary/receipt.ts:9](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/transaction-summary/receipt.ts#L9)

***

### resolveGasDependentCosts()

> **resolveGasDependentCosts**(`byteSize`, `gasDependentCost`): `BN`

#### Parameters

• **byteSize**: `BNInput`

• **gasDependentCost**: `GqlDependentCost`

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:29](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/utils/gas.ts#L29)

***

### resolveIconPaths()

> **resolveIconPaths**(`assets`, `basePath`): `object`[]

Returns the list of assets with the icon paths 'resolved'. eg. `./eth.svg` -> `https://some-url.com/eth.svg`

#### Parameters

• **assets**: [`Assets`](index.md#assets)

List of assets

• **basePath**: `string` = `'./'`

Base path for the icon URLs (default: './')

#### Returns

`object`[]

The assets with the icon paths resolved

#### Defined in

[packages/account/src/providers/assets/utils/resolveIconPaths.ts:11](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/utils/resolveIconPaths.ts#L11)

***

### urlJoin()

> **urlJoin**(`baseUrl`, ...`paths`): `string`

#### Parameters

• **baseUrl**: `undefined` \| `string`

• ...**paths**: `string`[]

#### Returns

`string`

#### Defined in

[packages/account/src/providers/assets/utils/url.ts:5](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/providers/assets/utils/url.ts#L5)

***

### withTimeout()

> **withTimeout**\&lt;`F`, `RT`\>(`promise`, `timeout`): `Promise`\&lt;`RT`\>

#### Type Parameters

• **F** *extends* `Promise`\&lt;`unknown`\>

• **RT** = `Awaited`\&lt;`F`\>

#### Parameters

• **promise**: `F`

• **timeout**: `number` = `1050`

#### Returns

`Promise`\&lt;`RT`\>

#### Defined in

[packages/account/src/connectors/utils/promises.ts:23](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/utils/promises.ts#L23)

## Events

### AssetsEvent

> **AssetsEvent**: `object`

Event trigger when the assets list of metadata changed.

 AssetsEvent

#### Type declaration

##### data

> **data**: [`Asset`](index.md#asset)[]

##### type

> **type**: [`assets`](./FuelConnectorEventTypes.md#assets)

#### Defined in

[packages/account/src/connectors/types/events.ts:114](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/events.ts#L114)

***

### ConnectionEvent

> **ConnectionEvent**: `object`

Event trigger when connection status changes. With the new connection status.

 ConnectionEvent

#### Type declaration

##### data

> **data**: `boolean`

##### type

> **type**: [`connection`](./FuelConnectorEventTypes.md#connection)

#### Defined in

[packages/account/src/connectors/types/events.ts:52](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/events.ts#L52)

***

### ConnectorEvent

> **ConnectorEvent**: `object`

Event trigger when the current connector has changed.

 ConnectorEvent

#### Type declaration

##### data

> **data**: [`FuelConnector`](./FuelConnector.md)

##### type

> **type**: [`currentConnector`](./FuelConnectorEventTypes.md#currentconnector)

#### Defined in

[packages/account/src/connectors/types/events.ts:102](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/events.ts#L102)

***

### ConnectorsEvent

> **ConnectorsEvent**: `object`

Event trigger when the list of connectors has changed.

 ConnectorsEvent

#### Type declaration

##### data

> **data**: [`FuelConnector`](./FuelConnector.md)[]

##### type

> **type**: [`connectors`](./FuelConnectorEventTypes.md#connectors)

#### Defined in

[packages/account/src/connectors/types/events.ts:90](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/events.ts#L90)

***

### NetworkEvent

> **NetworkEvent**: `object`

Event trigger when the network selected on the connector is changed.
It should trigger even if the network is not available for the connection.

 NetworkEvent

#### Type declaration

##### data

> **data**: [`Network`](index.md#network)

##### type

> **type**: [`currentNetwork`](./FuelConnectorEventTypes.md#currentnetwork)

#### Defined in

[packages/account/src/connectors/types/events.ts:65](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/events.ts#L65)

***

### NetworksEvent

> **NetworksEvent**: `object`

Event trigger when the network selected on the connector is changed.
It should trigger even if the network is not available for the connection.

 NetworksEvent

#### Type declaration

##### data

> **data**: [`Network`](index.md#network)

##### type

> **type**: [`networks`](./FuelConnectorEventTypes.md#networks)

#### Defined in

[packages/account/src/connectors/types/events.ts:78](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/account/src/connectors/types/events.ts#L78)

## Enumerations

- [FuelConnectorEventTypes](./FuelConnectorEventTypes.md)
- [FuelConnectorMethods](./FuelConnectorMethods.md)
- [Language](./Language.md)
- [TransactionType](./TransactionType.md)

## Classes

- [Account](./Account.md)
- [BaseTransactionRequest](./BaseTransactionRequest.md)
- [BaseWalletUnlocked](./BaseWalletUnlocked.md)
- [BlobTransactionRequest](./BlobTransactionRequest.md)
- [CreateTransactionRequest](./CreateTransactionRequest.md)
- [Fuel](./Fuel.md)
- [FuelConnector](./FuelConnector.md)
- [HDWallet](./HDWallet.md)
- [LocalStorage](./LocalStorage.md)
- [MemoryStorage](./MemoryStorage.md)
- [Mnemonic](./Mnemonic.md)
- [MnemonicVault](./MnemonicVault.md)
- [Predicate](./Predicate.md)
- [PrivateKeyVault](./PrivateKeyVault.md)
- [Provider](./Provider.md)
- [ScriptTransactionRequest](./ScriptTransactionRequest.md)
- [Signer](./Signer.md)
- [StorageAbstract](./StorageAbstract.md)
- [TransactionResponse](./TransactionResponse.md)
- [UpgradeTransactionRequest](./UpgradeTransactionRequest.md)
- [UploadTransactionRequest](./UploadTransactionRequest.md)
- [Vault](./Vault.md)
- [Wallet](./Wallet.md)
- [WalletLocked](./WalletLocked.md)
- [WalletManager](./WalletManager.md)
- [WalletUnlocked](./WalletUnlocked.md)

## Interfaces

- [AssembleTransactionSummaryParams](./AssembleTransactionSummaryParams.md)
- [BlobTransactionRequestLike](./BlobTransactionRequestLike.md)
- [CalculateGasFeeParams](./CalculateGasFeeParams.md)
- [GenerateOptions](./GenerateOptions.md)
- [GetTransactionSummaryFromRequestParams](./GetTransactionSummaryFromRequestParams.md)
- [GetTransactionsSummariesParams](./GetTransactionsSummariesParams.md)
- [GetTransactionsSummariesReturns](./GetTransactionsSummariesReturns.md)
- [GetTransferOperationsParams](./GetTransferOperationsParams.md)
- [IAddAmountToAssetParams](./IAddAmountToAssetParams.md)
- [IGetMaxGasParams](./IGetMaxGasParams.md)
- [IGetMinGasParams](./IGetMinGasParams.md)
- [MintedAsset](./MintedAsset.md)
- [MnemonicVaultOptions](./MnemonicVaultOptions.md)
- [PkVaultOptions](./PkVaultOptions.md)
- [TargetObject](./TargetObject.md)
- [WalletManagerState](./WalletManagerState.md)
