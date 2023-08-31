# Module: @fuel-ts/providers

## Enumerations

- [TransactionType](/api/Providers/TransactionType.md)

## Classes

- [BaseTransactionRequest](/api/Providers/BaseTransactionRequest.md)
- [CreateTransactionRequest](/api/Providers/CreateTransactionRequest.md)
- [Provider](/api/Providers/Provider.md)
- [ScriptTransactionRequest](/api/Providers/ScriptTransactionRequest.md)
- [TransactionResponse](/api/Providers/TransactionResponse.md)

## Interfaces

- [AssembleTransactionSummaryParams](/api/Providers/AssembleTransactionSummaryParams.md)
- [CalculateTransactionFeeParams](/api/Providers/CalculateTransactionFeeParams.md)
- [GetTransactionSummaryFromRequestParams](/api/Providers/GetTransactionSummaryFromRequestParams.md)
- [GetTransactionsSummariesParams](/api/Providers/GetTransactionsSummariesParams.md)
- [GetTransactionsSummariesReturns](/api/Providers/GetTransactionsSummariesReturns.md)
- [MintedAsset](/api/Providers/MintedAsset.md)

## Type Aliases

### AbiMap

Ƭ **AbiMap**: `Record`&lt;`string`, `JsonAbi`\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:124](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L124)

___

### Block

Ƭ **Block**: `Object`

A Fuel block

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `BN` |
| `id` | `string` |
| `time` | `string` |
| `transactionIds` | `string`[] |

#### Defined in

[packages/providers/src/provider.ts:52](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/provider.ts#L52)

___

### BlockHeader

Ƭ **BlockHeader**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `applicationHash` | `string` |
| `daHeight` | `BN` |
| `height` | `BN` |
| `id` | `string` |
| `messageReceiptCount` | `BN` |
| `messageReceiptRoot` | `string` |
| `prevRoot` | `string` |
| `time` | `string` |
| `transactionsCount` | `BN` |
| `transactionsRoot` | `string` |

#### Defined in

[packages/providers/src/message.ts:34](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/message.ts#L34)

___

### BlockId

Ƭ **BlockId**: [`SuccessStatus`](/api/Providers/index.md#successstatus)[``"block"``][``"id"``] \| [`FailureStatus`](/api/Providers/index.md#failurestatus)[``"block"``][``"id"``]

#### Defined in

[packages/providers/src/transaction-summary/types.ts:24](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L24)

___

### BuildPredicateOptions

Ƭ **BuildPredicateOptions**: { `fundTransaction?`: `boolean`  } & `Pick`&lt;[`TransactionRequestLike`](/api/Providers/index.md#transactionrequestlike), ``"gasLimit"`` \| ``"gasPrice"`` \| ``"maturity"``\>

#### Defined in

[packages/providers/src/provider.ts:183](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/provider.ts#L183)

___

### BurnedAsset

Ƭ **BurnedAsset**: [`MintedAsset`](/api/Providers/MintedAsset.md)

#### Defined in

[packages/providers/src/transaction-summary/types.ts:146](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L146)

___

### CallResult

Ƭ **CallResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | `TransactionResultReceipt`[] |

#### Defined in

[packages/providers/src/provider.ts:45](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/provider.ts#L45)

___

### ChainInfo

Ƭ **ChainInfo**: `Object`

Chain information

#### Type declaration

| Name | Type |
| :------ | :------ |
| `baseChainHeight` | `BN` |
| `consensusParameters` | { `chainId`: `BN` ; `contractMaxSize`: `BN` ; `gasPerByte`: `BN` ; `gasPriceFactor`: `BN` ; `maxGasPerPredicate`: `BN` ; `maxGasPerTx`: `BN` ; `maxInputs`: `BN` ; `maxMessageDataLength`: `BN` ; `maxOutputs`: `BN` ; `maxPredicateDataLength`: `BN` ; `maxPredicateLength`: `BN` ; `maxScriptDataLength`: `BN` ; `maxScriptLength`: `BN` ; `maxStorageSlots`: `BN` ; `maxWitnesses`: `BN`  } |
| `consensusParameters.chainId` | `BN` |
| `consensusParameters.contractMaxSize` | `BN` |
| `consensusParameters.gasPerByte` | `BN` |
| `consensusParameters.gasPriceFactor` | `BN` |
| `consensusParameters.maxGasPerPredicate` | `BN` |
| `consensusParameters.maxGasPerTx` | `BN` |
| `consensusParameters.maxInputs` | `BN` |
| `consensusParameters.maxMessageDataLength` | `BN` |
| `consensusParameters.maxOutputs` | `BN` |
| `consensusParameters.maxPredicateDataLength` | `BN` |
| `consensusParameters.maxPredicateLength` | `BN` |
| `consensusParameters.maxScriptDataLength` | `BN` |
| `consensusParameters.maxScriptLength` | `BN` |
| `consensusParameters.maxStorageSlots` | `BN` |
| `consensusParameters.maxWitnesses` | `BN` |
| `latestBlock` | { `height`: `BN` ; `id`: `string` ; `time`: `string` ; `transactions`: { `id`: `string`  }[]  } |
| `latestBlock.height` | `BN` |
| `latestBlock.id` | `string` |
| `latestBlock.time` | `string` |
| `latestBlock.transactions` | { `id`: `string`  }[] |
| `name` | `string` |
| `peerCount` | `number` |

#### Defined in

[packages/providers/src/provider.ts:70](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/provider.ts#L70)

___

### ChangeTransactionRequestOutput

Ƭ **ChangeTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId` | `BytesLike` | Asset ID of coins |
| `to` | `BytesLike` | Receiving address or script hash |
| `type` | `OutputType.Change` | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:23](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-request/output.ts#L23)

___

### Coin

Ƭ **Coin**: `Object`

A Fuel coin

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BN` |
| `assetId` | `string` |
| `blockCreated` | `BN` |
| `id` | `string` |
| `maturity` | `number` |
| `owner` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |
| `txCreatedIdx` | `BN` |

#### Defined in

[packages/providers/src/coin.ts:7](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/coin.ts#L7)

___

### CoinQuantity

Ƭ **CoinQuantity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BN` |
| `assetId` | `string` |
| `max?` | `BN` |

#### Defined in

[packages/providers/src/coin-quantity.ts:10](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/coin-quantity.ts#L10)

___

### CoinQuantityLike

Ƭ **CoinQuantityLike**: [amount: BigNumberish, assetId?: BytesLike, max?: BigNumberish] \| { `amount`: `BigNumberish` ; `assetId?`: `BytesLike` ; `max?`: `BigNumberish`  }

#### Defined in

[packages/providers/src/coin-quantity.ts:7](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/coin-quantity.ts#L7)

___

### CoinTransactionRequestInput

Ƭ **CoinTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumberish` | Amount of coins |
| `assetId` | `BytesLike` | Asset ID of the coins |
| `id` | `BytesLike` | UTXO ID |
| `maturity?` | `number` | UTXO being spent must have been created at least this many blocks ago |
| `owner` | `BytesLike` | Owning address or script hash |
| `predicate?` | `BytesLike` | Predicate bytecode |
| `predicateData?` | `BytesLike` | Predicate input data (parameters) |
| `predicateGasUsed?` | `BigNumberish` | Gas used by predicate |
| `txPointer` | `BytesLike` | Points to the TX whose output is being spent. (TxPointer) |
| `type` | `InputType.Coin` | - |
| `witnessIndex` | `number` | Index of witness that authorizes spending the coin |

#### Defined in

[packages/providers/src/transaction-request/input.ts:9](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-request/input.ts#L9)

___

### CoinTransactionRequestOutput

Ƭ **CoinTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumberish` | Amount of coins to send |
| `assetId` | `BytesLike` | Asset ID of coins |
| `to` | `BytesLike` | Receiving address or script hash |
| `type` | `OutputType.Coin` | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:9](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-request/output.ts#L9)

___

### ContractCreatedTransactionRequestOutput

Ƭ **ContractCreatedTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `stateRoot` | `BytesLike` | State Root |
| `type` | `OutputType.ContractCreated` | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:33](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-request/output.ts#L33)

___

### ContractResult

Ƭ **ContractResult**: `Object`

Deployed Contract bytecode and contract id

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bytecode` | `string` |
| `id` | `string` |

#### Defined in

[packages/providers/src/provider.ts:62](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/provider.ts#L62)

___

### ContractTransactionRequestInput

Ƭ **ContractTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `txPointer` | `BytesLike` | Points to the TX whose output is being spent. (TxPointer) |
| `type` | `InputType.Contract` | - |

#### Defined in

[packages/providers/src/transaction-request/input.ts:74](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-request/input.ts#L74)

___

### ContractTransactionRequestOutput

Ƭ **ContractTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputIndex` | `number` | Index of input contract |
| `type` | `OutputType.Contract` | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:18](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-request/output.ts#L18)

___

### FailureStatus

Ƭ **FailureStatus**: `Extract`&lt;[`GraphqlTransactionStatus`](/api/Providers/index.md#graphqltransactionstatus), { `__typename`: ``"FailureStatus"``  }\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:14](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L14)

___

### FetchRequestOptions

Ƭ **FetchRequestOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `body` | `string` |
| `headers` | { `[key: string]`: `string`;  } |
| `method` | ``"POST"`` |

#### Defined in

[packages/providers/src/provider.ts:187](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/provider.ts#L187)

___

### GetOperationParams

Ƭ **GetOperationParams**: { `abiMap?`: [`AbiMap`](/api/Providers/index.md#abimap) ; `transactionType`: [`TransactionType`](/api/Providers/TransactionType.md)  } & [`InputOutputParam`](/api/Providers/index.md#inputoutputparam) & [`ReceiptParam`](/api/Providers/index.md#receiptparam) & [`RawPayloadParam`](/api/Providers/index.md#rawpayloadparam)

#### Defined in

[packages/providers/src/transaction-summary/types.ts:132](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L132)

___

### GqlTransaction

Ƭ **GqlTransaction**: `NonNullable`&lt;`GqlGetTransactionQuery`[``"transaction"``]\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:9](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L9)

___

### GraphqlTransactionStatus

Ƭ **GraphqlTransactionStatus**: [`GqlTransaction`](/api/Providers/index.md#gqltransaction)[``"status"``]

#### Defined in

[packages/providers/src/transaction-summary/types.ts:11](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L11)

___

### InputOutputParam

Ƭ **InputOutputParam**: [`InputParam`](/api/Providers/index.md#inputparam) & [`OutputParam`](/api/Providers/index.md#outputparam)

#### Defined in

[packages/providers/src/transaction-summary/types.ts:130](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L130)

___

### InputParam

Ƭ **InputParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `inputs` | `Input`[] |

#### Defined in

[packages/providers/src/transaction-summary/types.ts:112](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L112)

___

### MerkleProof

Ƭ **MerkleProof**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `proofIndex` | `BN` |
| `proofSet` | `string`[] |

#### Defined in

[packages/providers/src/message.ts:29](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/message.ts#L29)

___

### Message

Ƭ **Message**: `Object`

A Fuel message

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BN` |
| `daHeight` | `BN` |
| `data` | `BytesLike` |
| `messageId` | `BytesLike` |
| `nonce` | `BytesLike` |
| `recipient` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |
| `sender` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Defined in

[packages/providers/src/message.ts:9](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/message.ts#L9)

___

### MessageCoin

Ƭ **MessageCoin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BN` |
| `assetId` | `string` |
| `daHeight` | `BN` |
| `nonce` | `BytesLike` |
| `recipient` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |
| `sender` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Defined in

[packages/providers/src/message.ts:20](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/message.ts#L20)

___

### MessageProof

Ƭ **MessageProof**: `Object`

Message Proof

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BN` |
| `blockProof` | [`MerkleProof`](/api/Providers/index.md#merkleproof) |
| `commitBlockHeader` | [`BlockHeader`](/api/Providers/index.md#blockheader) |
| `data` | `string` |
| `messageBlockHeader` | [`BlockHeader`](/api/Providers/index.md#blockheader) |
| `messageProof` | [`MerkleProof`](/api/Providers/index.md#merkleproof) |
| `nonce` | `string` |
| `recipient` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |
| `sender` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Defined in

[packages/providers/src/message.ts:50](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/message.ts#L50)

___

### MessageTransactionRequestInput

Ƭ **MessageTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumberish` | Amount of coins |
| `data?` | `BytesLike` | data of message |
| `nonce` | `BytesLike` | Unique nonce of message |
| `predicate?` | `BytesLike` | Predicate bytecode |
| `predicateData?` | `BytesLike` | Predicate input data (parameters) |
| `predicateGasUsed?` | `BigNumberish` | Gas used by predicate |
| `recipient` | `BytesLike` | Address of recipient |
| `sender` | `BytesLike` | Address of sender |
| `type` | `InputType.Message` | - |
| `witnessIndex` | `number` | Index of witness that authorizes the message |

#### Defined in

[packages/providers/src/transaction-request/input.ts:43](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-request/input.ts#L43)

___

### NodeInfoAndConsensusParameters

Ƭ **NodeInfoAndConsensusParameters**: `Object`

Node information

#### Type declaration

| Name | Type |
| :------ | :------ |
| `gasPerByte` | `BN` |
| `gasPriceFactor` | `BN` |
| `maxGasPerTx` | `BN` |
| `minGasPrice` | `BN` |
| `nodeVersion` | `string` |

#### Defined in

[packages/providers/src/provider.ts:102](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/provider.ts#L102)

___

### Operation

Ƭ **Operation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assetsSent?` | [`OperationCoin`](/api/Providers/index.md#operationcoin)[] |
| `calls?` | [`OperationFunctionCall`](/api/Providers/index.md#operationfunctioncall)[] |
| `from?` | [`OperationTransactionAddress`](/api/Providers/index.md#operationtransactionaddress) |
| `name?` | `OperationName` |
| `to?` | [`OperationTransactionAddress`](/api/Providers/index.md#operationtransactionaddress) |

#### Defined in

[packages/providers/src/transaction-summary/types.ts:82](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L82)

___

### OperationCoin

Ƭ **OperationCoin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BNInput` |
| `assetId` | `string` |

#### Defined in

[packages/providers/src/transaction-summary/types.ts:71](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L71)

___

### OperationFunctionCall

Ƭ **OperationFunctionCall**: { `argumentsProvided?`: `Record`&lt;`string`, `unknown`\> ; `functionName`: `string` ; `functionSignature`: `string`  } & `Partial`&lt;[`OperationCoin`](/api/Providers/index.md#operationcoin)\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:76](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L76)

___

### OperationTransactionAddress

Ƭ **OperationTransactionAddress**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `chain?` | `ChainName` |
| `type` | `AddressType` |

#### Defined in

[packages/providers/src/transaction-summary/types.ts:106](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L106)

___

### OutputParam

Ƭ **OutputParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `outputs` | `Output`[] |

#### Defined in

[packages/providers/src/transaction-summary/types.ts:116](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L116)

___

### ProgramState

Ƭ **ProgramState**: [`SuccessStatus`](/api/Providers/index.md#successstatus)[``"programState"``]

#### Defined in

[packages/providers/src/transaction-summary/types.ts:22](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L22)

___

### ProviderCallParams

Ƭ **ProviderCallParams**: `Object`

Provider Call transaction params

#### Type declaration

| Name | Type |
| :------ | :------ |
| `utxoValidation?` | `boolean` |

#### Defined in

[packages/providers/src/provider.ts:204](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/provider.ts#L204)

___

### ProviderOptions

Ƭ **ProviderOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cacheUtxo?` | `number` |
| `fetch?` | (`url`: `string`, `options`: [`FetchRequestOptions`](/api/Providers/index.md#fetchrequestoptions)) => `Promise`&lt;`unknown`\> |

#### Defined in

[packages/providers/src/provider.ts:196](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/provider.ts#L196)

___

### RawCoin

Ƭ **RawCoin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `string` |
| `assetId` | `string` |
| `blockCreated` | `string` |
| `maturity` | `string` |
| `owner` | `string` |
| `txCreatedIdx` | `string` |
| `utxoId` | `string` |

#### Defined in

[packages/providers/src/resource.ts:6](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/resource.ts#L6)

___

### RawMessage

Ƭ **RawMessage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `string` |
| `assetId` | `string` |
| `daHeight` | `string` |
| `data` | `string` |
| `nonce` | `string` |
| `recipient` | `string` |
| `sender` | `string` |

#### Defined in

[packages/providers/src/resource.ts:16](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/resource.ts#L16)

___

### RawPayloadParam

Ƭ **RawPayloadParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `rawPayload?` | `string` |

#### Defined in

[packages/providers/src/transaction-summary/types.ts:126](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L126)

___

### RawResource

Ƭ **RawResource**: [`RawCoin`](/api/Providers/index.md#rawcoin) \| [`RawMessage`](/api/Providers/index.md#rawmessage)

#### Defined in

[packages/providers/src/resource.ts:26](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/resource.ts#L26)

___

### Reason

Ƭ **Reason**: [`FailureStatus`](/api/Providers/index.md#failurestatus)[``"reason"``]

#### Defined in

[packages/providers/src/transaction-summary/types.ts:21](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L21)

___

### ReceiptParam

Ƭ **ReceiptParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | `TransactionResultReceipt`[] |

#### Defined in

[packages/providers/src/transaction-summary/types.ts:120](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L120)

___

### Resource

Ƭ **Resource**: [`Coin`](/api/Providers/index.md#coin) \| [`MessageCoin`](/api/Providers/index.md#messagecoin)

#### Defined in

[packages/providers/src/resource.ts:27](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/resource.ts#L27)

___

### SqueezedOutStatus

Ƭ **SqueezedOutStatus**: `Extract`&lt;[`GraphqlTransactionStatus`](/api/Providers/index.md#graphqltransactionstatus), { `__typename`: ``"SqueezedOutStatus"``  }\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:16](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L16)

___

### SubmittedStatus

Ƭ **SubmittedStatus**: `Extract`&lt;[`GraphqlTransactionStatus`](/api/Providers/index.md#graphqltransactionstatus), { `__typename`: ``"SubmittedStatus"``  }\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:15](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L15)

___

### SuccessStatus

Ƭ **SuccessStatus**: `Extract`&lt;[`GraphqlTransactionStatus`](/api/Providers/index.md#graphqltransactionstatus), { `__typename`: ``"SuccessStatus"``  }\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:13](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L13)

___

### Time

Ƭ **Time**: [`SubmittedStatus`](/api/Providers/index.md#submittedstatus)[``"time"``] \| [`SuccessStatus`](/api/Providers/index.md#successstatus)[``"time"``] \| [`FailureStatus`](/api/Providers/index.md#failurestatus)[``"time"``]

#### Defined in

[packages/providers/src/transaction-summary/types.ts:23](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L23)

___

### TransactionCost

Ƭ **TransactionCost**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fee` | `BN` |
| `gasPrice` | `BN` |
| `gasUsed` | `BN` |
| `minGasPrice` | `BN` |

#### Defined in

[packages/providers/src/provider.ts:111](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/provider.ts#L111)

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md) \| [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/types.ts:12](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-request/types.ts#L12)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](/api/Providers/index.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](/api/Providers/index.md#contracttransactionrequestinput) \| [`MessageTransactionRequestInput`](/api/Providers/index.md#messagetransactionrequestinput)

#### Defined in

[packages/providers/src/transaction-request/input.ts:83](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-request/input.ts#L83)

___

### TransactionRequestLike

Ƭ **TransactionRequestLike**: { `type`: [`Script`](/api/Providers/TransactionType.md#script)  } & `ScriptTransactionRequestLike` \| { `type`: [`Create`](/api/Providers/TransactionType.md#create)  } & `CreateTransactionRequestLike`

#### Defined in

[packages/providers/src/transaction-request/types.ts:13](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-request/types.ts#L13)

___

### TransactionRequestOutput

Ƭ **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](/api/Providers/index.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](/api/Providers/index.md#contracttransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](/api/Providers/index.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](/api/Providers/index.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](/api/Providers/index.md#contractcreatedtransactionrequestoutput)

#### Defined in

[packages/providers/src/transaction-request/output.ts:40](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-request/output.ts#L40)

___

### TransactionResultBurnReceipt

Ƭ **TransactionResultBurnReceipt**: `ReceiptBurn`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:57](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-response/transaction-response.ts#L57)

___

### TransactionResultMintReceipt

Ƭ **TransactionResultMintReceipt**: `ReceiptMint`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:56](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-response/transaction-response.ts#L56)

___

### TransactionSummary

Ƭ **TransactionSummary**&lt;`TTransactionType`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blockId?` | [`BlockId`](/api/Providers/index.md#blockid) |
| `burnedAssets` | [`BurnedAsset`](/api/Providers/index.md#burnedasset)[] |
| `fee` | `BN` |
| `gasUsed` | `BN` |
| `id?` | `string` |
| `isStatusFailure` | `boolean` |
| `isStatusPending` | `boolean` |
| `isStatusSuccess` | `boolean` |
| `isTypeCreate` | `boolean` |
| `isTypeMint` | `boolean` |
| `isTypeScript` | `boolean` |
| `mintedAssets` | [`MintedAsset`](/api/Providers/MintedAsset.md)[] |
| `operations` | [`Operation`](/api/Providers/index.md#operation)[] |
| `receipts` | `TransactionResultReceipt`[] |
| `status?` | `TransactionStatus` |
| `time?` | `string` |
| `transaction` | `Transaction`&lt;`TTransactionType`\> |
| `type` | `TransactionTypeName` |

#### Defined in

[packages/providers/src/transaction-summary/types.ts:148](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/types.ts#L148)

___

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `OutputType.Variable` |

#### Defined in

[packages/providers/src/transaction-request/output.ts:30](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-request/output.ts#L30)

## Functions

### assembleReceiptByType

▸ **assembleReceiptByType**(`receipt`): `ReceiptCall` \| `ReceiptReturn` \| `ReceiptReturnData` \| `ReceiptPanic` \| `ReceiptRevert` \| `ReceiptLog` \| `ReceiptLogData` \| `ReceiptTransfer` \| `ReceiptTransferOut` \| `ReceiptScriptResult` \| `ReceiptMessageOut` \| `ReceiptMint` \| `ReceiptBurn`

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipt` | `GqlReceipt` |

#### Returns

`ReceiptCall` \| `ReceiptReturn` \| `ReceiptReturnData` \| `ReceiptPanic` \| `ReceiptRevert` \| `ReceiptLog` \| `ReceiptLogData` \| `ReceiptTransfer` \| `ReceiptTransferOut` \| `ReceiptScriptResult` \| `ReceiptMessageOut` \| `ReceiptMint` \| `ReceiptBurn`

#### Defined in

[packages/providers/src/utils/receipts.ts:68](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/utils/receipts.ts#L68)

___

### extractBurnedAssetsFromReceipts

▸ **extractBurnedAssetsFromReceipts**(`receipts`): [`MintedAsset`](/api/Providers/MintedAsset.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipts` | `TransactionResultReceipt`[] |

#### Returns

[`MintedAsset`](/api/Providers/MintedAsset.md)[]

#### Defined in

[packages/providers/src/transaction-summary/receipt.ts:49](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/receipt.ts#L49)

___

### extractMintedAssetsFromReceipts

▸ **extractMintedAssetsFromReceipts**(`receipts`): [`MintedAsset`](/api/Providers/MintedAsset.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipts` | `TransactionResultReceipt`[] |

#### Returns

[`MintedAsset`](/api/Providers/MintedAsset.md)[]

#### Defined in

[packages/providers/src/transaction-summary/receipt.ts:30](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/receipt.ts#L30)

___

### getTransactionSummary

▸ **getTransactionSummary**&lt;`TTransactionType`\>(`params`): `Promise`&lt;`TransactionResult`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `GetTransactionSummaryParams` |

#### Returns

`Promise`&lt;`TransactionResult`\>

#### Defined in

[packages/providers/src/transaction-summary/get-transaction-summary.ts:24](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/get-transaction-summary.ts#L24)

___

### processGqlReceipt

▸ **processGqlReceipt**(`gqlReceipt`): `TransactionResultReceipt`

#### Parameters

| Name | Type |
| :------ | :------ |
| `gqlReceipt` | `GqlReceipt` |

#### Returns

`TransactionResultReceipt`

#### Defined in

[packages/providers/src/transaction-summary/receipt.ts:9](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/providers/src/transaction-summary/receipt.ts#L9)
