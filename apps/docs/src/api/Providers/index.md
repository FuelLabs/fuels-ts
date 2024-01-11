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
- [GetTransactionSummaryFromRequestParams](/api/Providers/GetTransactionSummaryFromRequestParams.md)
- [GetTransactionsSummariesParams](/api/Providers/GetTransactionsSummariesParams.md)
- [GetTransactionsSummariesReturns](/api/Providers/GetTransactionsSummariesReturns.md)
- [GetTransferOperationsParams](/api/Providers/GetTransferOperationsParams.md)
- [IAddAmountToAssetParams](/api/Providers/IAddAmountToAssetParams.md)
- [IGetMaxGasParams](/api/Providers/IGetMaxGasParams.md)
- [IGetMinGasParams](/api/Providers/IGetMinGasParams.md)
- [MintedAsset](/api/Providers/MintedAsset.md)

## Type Aliases

### AbiMap

Ƭ **AbiMap**: `Record`&lt;`string`, `JsonAbi`\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:124](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L124)

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

[packages/providers/src/provider.ts:59](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L59)

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

[packages/providers/src/message.ts:36](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/message.ts#L36)

___

### BlockId

Ƭ **BlockId**: [`SuccessStatus`](/api/Providers/index.md#successstatus)[``"block"``][``"id"``] \| [`FailureStatus`](/api/Providers/index.md#failurestatus)[``"block"``][``"id"``]

#### Defined in

[packages/providers/src/transaction-summary/types.ts:24](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L24)

___

### BurnedAsset

Ƭ **BurnedAsset**: [`MintedAsset`](/api/Providers/MintedAsset.md)

#### Defined in

[packages/providers/src/transaction-summary/types.ts:151](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L151)

___

### CalculateTransactionFeeParams

Ƭ **CalculateTransactionFeeParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `consensusParameters` | `Pick`&lt;`GqlConsensusParameters`, ``"gasCosts"``\> & { `feeParams`: `FeeParams`  } |
| `gasUsed` | `BN` |
| `rawPayload` | `string` |

#### Defined in

[packages/providers/src/transaction-summary/calculate-transaction-fee.ts:23](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/calculate-transaction-fee.ts#L23)

___

### CallResult

Ƭ **CallResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | `TransactionResultReceipt`[] |

#### Defined in

[packages/providers/src/provider.ts:52](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L52)

___

### ChainInfo

Ƭ **ChainInfo**: `Object`

Chain information

#### Type declaration

| Name | Type |
| :------ | :------ |
| `baseChainHeight` | `BN` |
| `consensusParameters` | `ConsensusParameters` |
| `gasCosts` | `GqlGasCosts` |
| `latestBlock` | { `height`: `BN` ; `id`: `string` ; `time`: `string` ; `transactions`: { `id`: `string`  }[]  } |
| `latestBlock.height` | `BN` |
| `latestBlock.id` | `string` |
| `latestBlock.time` | `string` |
| `latestBlock.transactions` | { `id`: `string`  }[] |
| `name` | `string` |

#### Defined in

[packages/providers/src/provider.ts:96](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L96)

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

[packages/providers/src/transaction-request/output.ts:24](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/output.ts#L24)

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

[packages/providers/src/coin.ts:7](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/coin.ts#L7)

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

[packages/providers/src/coin-quantity.ts:10](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/coin-quantity.ts#L10)

___

### CoinQuantityLike

Ƭ **CoinQuantityLike**: [amount: BigNumberish, assetId?: BytesLike, max?: BigNumberish] \| { `amount`: `BigNumberish` ; `assetId?`: `BytesLike` ; `max?`: `BigNumberish`  }

#### Defined in

[packages/providers/src/coin-quantity.ts:7](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/coin-quantity.ts#L7)

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

[packages/providers/src/transaction-request/input.ts:10](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/input.ts#L10)

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

[packages/providers/src/transaction-request/output.ts:10](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/output.ts#L10)

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

[packages/providers/src/transaction-request/output.ts:34](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/output.ts#L34)

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

[packages/providers/src/provider.ts:69](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L69)

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

[packages/providers/src/transaction-request/input.ts:75](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/input.ts#L75)

___

### ContractTransactionRequestOutput

Ƭ **ContractTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputIndex` | `number` | Index of input contract |
| `type` | `OutputType.Contract` | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:19](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/output.ts#L19)

___

### EstimatePredicateParams

Ƭ **EstimatePredicateParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `estimatePredicates?` | `boolean` |

#### Defined in

[packages/providers/src/provider.ts:230](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L230)

___

### EstimateTransactionParams

Ƭ **EstimateTransactionParams**: `Object`

Transaction estimation Param

#### Type declaration

| Name | Type |
| :------ | :------ |
| `estimateTxDependencies?` | `boolean` |

#### Defined in

[packages/providers/src/provider.ts:226](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L226)

___

### FailureStatus

Ƭ **FailureStatus**: `Extract`&lt;[`GraphqlTransactionStatus`](/api/Providers/index.md#graphqltransactionstatus), { `__typename`: ``"FailureStatus"``  }\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:14](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L14)

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

[packages/providers/src/provider.ts:202](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L202)

___

### GetOperationParams

Ƭ **GetOperationParams**: { `abiMap?`: [`AbiMap`](/api/Providers/index.md#abimap) ; `maxInputs`: `BN` ; `transactionType`: [`TransactionType`](/api/Providers/TransactionType.md)  } & [`InputOutputParam`](/api/Providers/index.md#inputoutputparam) & [`ReceiptParam`](/api/Providers/index.md#receiptparam) & [`RawPayloadParam`](/api/Providers/index.md#rawpayloadparam)

#### Defined in

[packages/providers/src/transaction-summary/types.ts:136](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L136)

___

### GqlTransaction

Ƭ **GqlTransaction**: `NonNullable`&lt;`GqlGetTransactionQuery`[``"transaction"``]\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:9](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L9)

___

### GraphqlTransactionStatus

Ƭ **GraphqlTransactionStatus**: [`GqlTransaction`](/api/Providers/index.md#gqltransaction)[``"status"``]

#### Defined in

[packages/providers/src/transaction-summary/types.ts:11](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L11)

___

### InputOutputParam

Ƭ **InputOutputParam**: [`InputParam`](/api/Providers/index.md#inputparam) & [`OutputParam`](/api/Providers/index.md#outputparam)

#### Defined in

[packages/providers/src/transaction-summary/types.ts:130](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L130)

___

### InputParam

Ƭ **InputParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `inputs` | `Input`[] |

#### Defined in

[packages/providers/src/transaction-summary/types.ts:112](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L112)

___

### MerkleProof

Ƭ **MerkleProof**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `proofIndex` | `BN` |
| `proofSet` | `string`[] |

#### Defined in

[packages/providers/src/message.ts:31](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/message.ts#L31)

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

[packages/providers/src/message.ts:11](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/message.ts#L11)

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

[packages/providers/src/message.ts:22](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/message.ts#L22)

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

[packages/providers/src/message.ts:52](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/message.ts#L52)

___

### MessageStatus

Ƭ **MessageStatus**: `Object`

Message Status

#### Type declaration

| Name | Type |
| :------ | :------ |
| `state` | `GqlMessageState` |

#### Defined in

[packages/providers/src/message.ts:67](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/message.ts#L67)

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

[packages/providers/src/transaction-request/input.ts:44](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/input.ts#L44)

___

### NodeInfo

Ƭ **NodeInfo**: `Object`

Node information

#### Type declaration

| Name | Type |
| :------ | :------ |
| `maxDepth` | `BN` |
| `maxTx` | `BN` |
| `minGasPrice` | `BN` |
| `nodeVersion` | `string` |
| `peers` | `GqlPeerInfo`[] |
| `utxoValidation` | `boolean` |
| `vmBacktrace` | `boolean` |

#### Defined in

[packages/providers/src/provider.ts:112](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L112)

___

### NodeInfoAndConsensusParameters

Ƭ **NodeInfoAndConsensusParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `gasPerByte` | `BN` |
| `gasPriceFactor` | `BN` |
| `maxGasPerTx` | `BN` |
| `minGasPrice` | `BN` |
| `nodeVersion` | `string` |

#### Defined in

[packages/providers/src/provider.ts:122](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L122)

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

[packages/providers/src/transaction-summary/types.ts:82](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L82)

___

### OperationCoin

Ƭ **OperationCoin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BNInput` |
| `assetId` | `string` |

#### Defined in

[packages/providers/src/transaction-summary/types.ts:71](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L71)

___

### OperationFunctionCall

Ƭ **OperationFunctionCall**: { `argumentsProvided?`: `Record`&lt;`string`, `unknown`\> ; `functionName`: `string` ; `functionSignature`: `string`  } & `Partial`&lt;[`OperationCoin`](/api/Providers/index.md#operationcoin)\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:76](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L76)

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

[packages/providers/src/transaction-summary/types.ts:106](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L106)

___

### OutputParam

Ƭ **OutputParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `outputs` | `Output`[] |

#### Defined in

[packages/providers/src/transaction-summary/types.ts:116](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L116)

___

### ProgramState

Ƭ **ProgramState**: [`SuccessStatus`](/api/Providers/index.md#successstatus)[``"programState"``]

#### Defined in

[packages/providers/src/transaction-summary/types.ts:22](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L22)

___

### ProviderCallParams

Ƭ **ProviderCallParams**: [`UTXOValidationParams`](/api/Providers/index.md#utxovalidationparams) & [`EstimateTransactionParams`](/api/Providers/index.md#estimatetransactionparams)

Provider Call transaction params

#### Defined in

[packages/providers/src/provider.ts:239](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L239)

___

### ProviderOptions

Ƭ **ProviderOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cacheUtxo?` | `number` |
| `fetch?` | (`url`: `string`, `options`: [`FetchRequestOptions`](/api/Providers/index.md#fetchrequestoptions)) => `Promise`&lt;`unknown`\> |

#### Defined in

[packages/providers/src/provider.ts:211](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L211)

___

### ProviderSendTxParams

Ƭ **ProviderSendTxParams**: [`EstimateTransactionParams`](/api/Providers/index.md#estimatetransactionparams)

Provider Send transaction params

#### Defined in

[packages/providers/src/provider.ts:244](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L244)

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

[packages/providers/src/resource.ts:6](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/resource.ts#L6)

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

[packages/providers/src/resource.ts:16](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/resource.ts#L16)

___

### RawPayloadParam

Ƭ **RawPayloadParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `rawPayload?` | `string` |

#### Defined in

[packages/providers/src/transaction-summary/types.ts:126](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L126)

___

### RawResource

Ƭ **RawResource**: [`RawCoin`](/api/Providers/index.md#rawcoin) \| [`RawMessage`](/api/Providers/index.md#rawmessage)

#### Defined in

[packages/providers/src/resource.ts:26](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/resource.ts#L26)

___

### Reason

Ƭ **Reason**: [`FailureStatus`](/api/Providers/index.md#failurestatus)[``"reason"``]

#### Defined in

[packages/providers/src/transaction-summary/types.ts:21](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L21)

___

### ReceiptParam

Ƭ **ReceiptParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | `TransactionResultReceipt`[] |

#### Defined in

[packages/providers/src/transaction-summary/types.ts:120](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L120)

___

### Resource

Ƭ **Resource**: [`Coin`](/api/Providers/index.md#coin) \| [`MessageCoin`](/api/Providers/index.md#messagecoin)

#### Defined in

[packages/providers/src/resource.ts:27](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/resource.ts#L27)

___

### SqueezedOutStatus

Ƭ **SqueezedOutStatus**: `Extract`&lt;[`GraphqlTransactionStatus`](/api/Providers/index.md#graphqltransactionstatus), { `__typename`: ``"SqueezedOutStatus"``  }\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:16](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L16)

___

### SubmittedStatus

Ƭ **SubmittedStatus**: `Extract`&lt;[`GraphqlTransactionStatus`](/api/Providers/index.md#graphqltransactionstatus), { `__typename`: ``"SubmittedStatus"``  }\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:15](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L15)

___

### SuccessStatus

Ƭ **SuccessStatus**: `Extract`&lt;[`GraphqlTransactionStatus`](/api/Providers/index.md#graphqltransactionstatus), { `__typename`: ``"SuccessStatus"``  }\>

#### Defined in

[packages/providers/src/transaction-summary/types.ts:13](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L13)

___

### Time

Ƭ **Time**: [`SubmittedStatus`](/api/Providers/index.md#submittedstatus)[``"time"``] \| [`SuccessStatus`](/api/Providers/index.md#successstatus)[``"time"``] \| [`FailureStatus`](/api/Providers/index.md#failurestatus)[``"time"``]

#### Defined in

[packages/providers/src/transaction-summary/types.ts:23](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L23)

___

### TransactionCost

Ƭ **TransactionCost**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `gasPrice` | `BN` |
| `gasUsed` | `BN` |
| `maxFee` | `BN` |
| `maxGas` | `BN` |
| `minFee` | `BN` |
| `minGas` | `BN` |
| `minGasPrice` | `BN` |
| `receipts` | `TransactionResultReceipt`[] |
| `requiredQuantities` | [`CoinQuantity`](/api/Providers/index.md#coinquantity)[] |
| `usedFee` | `BN` |

#### Defined in

[packages/providers/src/provider.ts:131](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L131)

___

### TransactionCostParams

Ƭ **TransactionCostParams**: [`EstimateTransactionParams`](/api/Providers/index.md#estimatetransactionparams) & [`EstimatePredicateParams`](/api/Providers/index.md#estimatepredicateparams)

#### Defined in

[packages/providers/src/provider.ts:234](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L234)

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md) \| [`CreateTransactionRequest`](/api/Providers/CreateTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/types.ts:12](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/types.ts#L12)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](/api/Providers/index.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](/api/Providers/index.md#contracttransactionrequestinput) \| [`MessageTransactionRequestInput`](/api/Providers/index.md#messagetransactionrequestinput)

#### Defined in

[packages/providers/src/transaction-request/input.ts:84](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/input.ts#L84)

___

### TransactionRequestLike

Ƭ **TransactionRequestLike**: { `type`: [`Script`](/api/Providers/TransactionType.md#script)  } & `ScriptTransactionRequestLike` \| { `type`: [`Create`](/api/Providers/TransactionType.md#create)  } & `CreateTransactionRequestLike`

#### Defined in

[packages/providers/src/transaction-request/types.ts:13](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/types.ts#L13)

___

### TransactionRequestOutput

Ƭ **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](/api/Providers/index.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](/api/Providers/index.md#contracttransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](/api/Providers/index.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](/api/Providers/index.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](/api/Providers/index.md#contractcreatedtransactionrequestoutput)

#### Defined in

[packages/providers/src/transaction-request/output.ts:41](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/output.ts#L41)

___

### TransactionResultBurnReceipt

Ƭ **TransactionResultBurnReceipt**: `ReceiptBurn`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:57](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-response/transaction-response.ts#L57)

___

### TransactionResultMintReceipt

Ƭ **TransactionResultMintReceipt**: `ReceiptMint`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:56](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-response/transaction-response.ts#L56)

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
| `date?` | `Date` |
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

[packages/providers/src/transaction-summary/types.ts:153](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/types.ts#L153)

___

### UTXOValidationParams

Ƭ **UTXOValidationParams**: `Object`

UTXO Validation Param

#### Type declaration

| Name | Type |
| :------ | :------ |
| `utxoValidation?` | `boolean` |

#### Defined in

[packages/providers/src/provider.ts:219](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/provider.ts#L219)

___

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `OutputType.Variable` |

#### Defined in

[packages/providers/src/transaction-request/output.ts:31](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-request/output.ts#L31)

## Functions

### addAmountToAsset

▸ **addAmountToAsset**(`params`): [`CoinQuantity`](/api/Providers/index.md#coinquantity)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`IAddAmountToAssetParams`](/api/Providers/IAddAmountToAssetParams.md) |

#### Returns

[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]

#### Defined in

[packages/providers/src/coin-quantity.ts:41](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/coin-quantity.ts#L41)

___

### assembleReceiptByType

▸ **assembleReceiptByType**(`receipt`): `ReceiptCall` \| `ReceiptReturn` \| `ReceiptReturnData` \| `ReceiptPanic` \| `ReceiptRevert` \| `ReceiptLog` \| `ReceiptLogData` \| `ReceiptTransfer` \| `ReceiptTransferOut` \| `ReceiptScriptResult` \| `ReceiptMessageOut` \| `ReceiptMint` \| `ReceiptBurn`

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipt` | `GqlReceipt` |

#### Returns

`ReceiptCall` \| `ReceiptReturn` \| `ReceiptReturnData` \| `ReceiptPanic` \| `ReceiptRevert` \| `ReceiptLog` \| `ReceiptLogData` \| `ReceiptTransfer` \| `ReceiptTransferOut` \| `ReceiptScriptResult` \| `ReceiptMessageOut` \| `ReceiptMint` \| `ReceiptBurn`

#### Defined in

[packages/providers/src/utils/receipts.ts:69](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/utils/receipts.ts#L69)

___

### calculateMetadataGasForTxCreate

▸ **calculateMetadataGasForTxCreate**(`«destructured»`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `contractBytesSize` | `BN` |
| › `gasCosts` | `GqlGasCosts` |
| › `stateRootSize` | `number` |
| › `txBytesSize` | `number` |

#### Returns

`BN`

#### Defined in

[packages/providers/src/utils/gas.ts:106](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/utils/gas.ts#L106)

___

### calculateMetadataGasForTxScript

▸ **calculateMetadataGasForTxScript**(`«destructured»`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `gasCosts` | `GqlGasCosts` |
| › `txBytesSize` | `number` |

#### Returns

`BN`

#### Defined in

[packages/providers/src/utils/gas.ts:127](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/utils/gas.ts#L127)

___

### calculateTransactionFee

▸ **calculateTransactionFee**(`params`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CalculateTransactionFeeParams`](/api/Providers/index.md#calculatetransactionfeeparams) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `fee` | `BN` |
| `feeFromGasUsed` | `BN` |
| `maxFee` | `BN` |
| `minFee` | `BN` |

#### Defined in

[packages/providers/src/transaction-summary/calculate-transaction-fee.ts:29](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/calculate-transaction-fee.ts#L29)

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

[packages/providers/src/transaction-summary/receipt.ts:49](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/receipt.ts#L49)

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

[packages/providers/src/transaction-summary/receipt.ts:30](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/receipt.ts#L30)

___

### fromDateToTai64

▸ **fromDateToTai64**(`date`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

#### Returns

`string`

#### Defined in

[packages/providers/src/transaction-summary/date.ts:8](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/date.ts#L8)

___

### fromTai64ToDate

▸ **fromTai64ToDate**(`tai64Timestamp`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tai64Timestamp` | `string` |

#### Returns

`Date`

#### Defined in

[packages/providers/src/transaction-summary/date.ts:3](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/date.ts#L3)

___

### gasUsedByInputs

▸ **gasUsedByInputs**(`inputs`, `txBytesSize`, `gasCosts`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputs` | ([`TransactionRequestInput`](/api/Providers/index.md#transactionrequestinput) \| `Input`)[] |
| `txBytesSize` | `number` |
| `gasCosts` | `GqlGasCosts` |

#### Returns

`BN`

#### Defined in

[packages/providers/src/utils/gas.ts:40](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/utils/gas.ts#L40)

___

### getMaxGas

▸ **getMaxGas**(`params`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`IGetMaxGasParams`](/api/Providers/IGetMaxGasParams.md) |

#### Returns

`BN`

#### Defined in

[packages/providers/src/utils/gas.ts:94](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/utils/gas.ts#L94)

___

### getMinGas

▸ **getMinGas**(`params`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`IGetMinGasParams`](/api/Providers/IGetMinGasParams.md) |

#### Returns

`BN`

#### Defined in

[packages/providers/src/utils/gas.ts:74](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/utils/gas.ts#L74)

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

[packages/providers/src/transaction-summary/get-transaction-summary.ts:25](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/get-transaction-summary.ts#L25)

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

[packages/providers/src/transaction-summary/receipt.ts:9](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/transaction-summary/receipt.ts#L9)

___

### resolveGasDependentCosts

▸ **resolveGasDependentCosts**(`byteSize`, `gasDependentCost`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteSize` | `BNInput` |
| `gasDependentCost` | `GqlDependentCost` |

#### Returns

`BN`

#### Defined in

[packages/providers/src/utils/gas.ts:28](https://github.com/FuelLabs/fuels-ts/blob/c441653b/packages/providers/src/utils/gas.ts#L28)
