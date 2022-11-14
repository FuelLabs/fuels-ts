---
layout: default
title: "@fuel-ts/providers"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/providers

## Namespaces

- [internal](namespaces/internal.md)

## Enumerations

- [CoinStatus](enums/CoinStatus.md)
- [TransactionType](enums/TransactionType.md)

## Classes

- [ChangeOutputCollisionError](classes/ChangeOutputCollisionError.md)
- [CreateTransactionRequest](classes/CreateTransactionRequest.md)
- [NoWitnessAtIndexError](classes/NoWitnessAtIndexError.md)
- [NoWitnessByOwnerError](classes/NoWitnessByOwnerError.md)
- [Provider](classes/Provider.md)
- [ScriptTransactionRequest](classes/ScriptTransactionRequest.md)
- [TransactionResponse](classes/TransactionResponse.md)

## Interfaces

- [CreateTransactionRequestLike](interfaces/CreateTransactionRequestLike.md)
- [ScriptTransactionRequestLike](interfaces/ScriptTransactionRequestLike.md)

## Type Aliases

### Block

Ƭ **Block**: `Object`

A Fuel block

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | [`BN`](classes/internal-BN.md) |
| `id` | `string` |
| `time` | `string` |
| `transactionIds` | `string`[] |

#### Defined in

[packages/providers/src/provider.ts:59](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L59)

___

### BuildPredicateOptions

Ƭ **BuildPredicateOptions**: { `fundTransaction?`: `boolean`  } & `Pick`<[`TransactionRequestLike`](index.md#transactionrequestlike), ``"gasLimit"`` \| ``"gasPrice"`` \| ``"maturity"``\>

#### Defined in

[packages/providers/src/provider.ts:170](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L170)

___

### CallResult

Ƭ **CallResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] |

#### Defined in

[packages/providers/src/provider.ts:52](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L52)

___

### ChainInfo

Ƭ **ChainInfo**: `Object`

Chain information

#### Type declaration

| Name | Type |
| :------ | :------ |
| `baseChainHeight` | [`BN`](classes/internal-BN.md) |
| `consensusParameters` | { `gasPriceFactor`: [`BN`](classes/internal-BN.md) ; `maxGasPerTx`: [`BN`](classes/internal-BN.md) ; `maxScriptLength`: [`BN`](classes/internal-BN.md)  } |
| `consensusParameters.gasPriceFactor` | [`BN`](classes/internal-BN.md) |
| `consensusParameters.maxGasPerTx` | [`BN`](classes/internal-BN.md) |
| `consensusParameters.maxScriptLength` | [`BN`](classes/internal-BN.md) |
| `latestBlock` | { `height`: [`BN`](classes/internal-BN.md) ; `id`: `string` ; `time`: `string` ; `transactions`: { `id`: `string`  }[]  } |
| `latestBlock.height` | [`BN`](classes/internal-BN.md) |
| `latestBlock.id` | `string` |
| `latestBlock.time` | `string` |
| `latestBlock.transactions` | { `id`: `string`  }[] |
| `name` | `string` |
| `peerCount` | `number` |

#### Defined in

[packages/providers/src/provider.ts:77](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L77)

___

### ChangeTransactionRequestOutput

Ƭ **ChangeTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId` | `BytesLike` | Asset ID of coins |
| `to` | `BytesLike` | Receiving address or script hash |
| `type` | [`Change`](namespaces/internal.md#change) | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L30)

___

### Coin

Ƭ **Coin**: `Object`

A Fuel coin

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `assetId` | `string` |
| `blockCreated` | [`BN`](classes/internal-BN.md) |
| `id` | `string` |
| `maturity` | `number` |
| `owner` | `string` |
| `status` | [`CoinStatus`](enums/CoinStatus.md) |

#### Defined in

[packages/providers/src/coin.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin.ts#L8)

___

### CoinQuantity

Ƭ **CoinQuantity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `assetId` | `string` |
| `max?` | [`BN`](classes/internal-BN.md) |

#### Defined in

[packages/providers/src/coin-quantity.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin-quantity.ts#L10)

___

### CoinQuantityLike

Ƭ **CoinQuantityLike**: [amount: BigNumberish, assetId?: BytesLike, max?: BigNumberish] \| { `amount`: [`BigNumberish`](namespaces/internal.md#bignumberish) ; `assetId?`: `BytesLike` ; `max?`: [`BigNumberish`](namespaces/internal.md#bignumberish)  }

#### Defined in

[packages/providers/src/coin-quantity.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin-quantity.ts#L7)

___

### CoinTransactionRequestInput

Ƭ **CoinTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BigNumberish`](namespaces/internal.md#bignumberish) | Amount of coins |
| `assetId` | `BytesLike` | Asset ID of the coins |
| `id` | `BytesLike` | UTXO ID |
| `maturity?` | `number` | UTXO being spent must have been created at least this many blocks ago |
| `owner` | `BytesLike` | Owning address or script hash |
| `predicate?` | `BytesLike` | Predicate bytecode |
| `predicateData?` | `BytesLike` | Predicate input data (parameters) |
| `txPointer` | `BytesLike` | Points to the TX whose output is being spent. (TxPointer) |
| `type` | [`Coin`](namespaces/internal.md#coin) | - |
| `witnessIndex` | `number` | Index of witness that authorizes spending the coin |

#### Defined in

[packages/providers/src/transaction-request/input.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L9)

___

### CoinTransactionRequestOutput

Ƭ **CoinTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BigNumberish`](namespaces/internal.md#bignumberish) | Amount of coins to send |
| `assetId` | `BytesLike` | Asset ID of coins |
| `to` | `BytesLike` | Receiving address or script hash |
| `type` | [`Coin`](namespaces/internal.md#coin-1) | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L9)

___

### ContractCreatedTransactionRequestOutput

Ƭ **ContractCreatedTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `stateRoot` | `BytesLike` | State Root |
| `type` | [`ContractCreated`](namespaces/internal.md#contractcreated) | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L40)

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

[packages/providers/src/provider.ts:69](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L69)

___

### ContractTransactionRequestInput

Ƭ **ContractTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `txPointer` | `BytesLike` | Points to the TX whose output is being spent. (TxPointer) |
| `type` | [`Contract`](namespaces/internal.md#contract) | - |

#### Defined in

[packages/providers/src/transaction-request/input.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L66)

___

### ContractTransactionRequestOutput

Ƭ **ContractTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputIndex` | `number` | Index of input contract |
| `type` | [`Contract`](namespaces/internal.md#contract-1) | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L18)

___

### CursorPaginationArgs

Ƭ **CursorPaginationArgs**: `Object`

Cursor pagination arguments

https://relay.dev/graphql/connections.htm#sec-Arguments

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `after?` | `string` \| ``null`` | Forward pagination cursor |
| `before?` | `string` \| ``null`` | Backward pagination cursor |
| `first?` | `number` \| ``null`` | Forward pagination limit |
| `last?` | `number` \| ``null`` | Backward pagination limit |

#### Defined in

[packages/providers/src/provider.ts:159](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L159)

___

### ExcludeResourcesOption

Ƭ **ExcludeResourcesOption**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `messages?` | `BytesLike`[] |
| `utxos?` | `BytesLike`[] |

#### Defined in

[packages/providers/src/resource.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/resource.ts#L28)

___

### Message

Ƭ **Message**: `Object`

A Fuel message

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `daHeight` | [`BN`](classes/internal-BN.md) |
| `data` | `BytesLike` |
| `fuelBlockSpend` | [`BN`](classes/internal-BN.md) |
| `nonce` | [`BN`](classes/internal-BN.md) |
| `recipient` | [`AbstractAddress`](classes/internal-AbstractAddress.md) |
| `sender` | [`AbstractAddress`](classes/internal-AbstractAddress.md) |

#### Defined in

[packages/providers/src/message.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/message.ts#L8)

___

### MessageProof

Ƭ **MessageProof**: `Object`

Message Proof

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `data` | `string` |
| `header` | { `applicationHash`: `string` ; `daHeight`: [`BN`](classes/internal-BN.md) ; `height`: [`BN`](classes/internal-BN.md) ; `id`: `string` ; `outputMessagesCount`: [`BN`](classes/internal-BN.md) ; `outputMessagesRoot`: `string` ; `prevRoot`: `string` ; `time`: `string` ; `transactionsCount`: [`BN`](classes/internal-BN.md) ; `transactionsRoot`: `string`  } |
| `header.applicationHash` | `string` |
| `header.daHeight` | [`BN`](classes/internal-BN.md) |
| `header.height` | [`BN`](classes/internal-BN.md) |
| `header.id` | `string` |
| `header.outputMessagesCount` | [`BN`](classes/internal-BN.md) |
| `header.outputMessagesRoot` | `string` |
| `header.prevRoot` | `string` |
| `header.time` | `string` |
| `header.transactionsCount` | [`BN`](classes/internal-BN.md) |
| `header.transactionsRoot` | `string` |
| `nonce` | `string` |
| `proofIndex` | [`BN`](classes/internal-BN.md) |
| `proofSet` | `string`[] |
| `recipient` | [`AbstractAddress`](classes/internal-AbstractAddress.md) |
| `sender` | [`AbstractAddress`](classes/internal-AbstractAddress.md) |
| `signature` | `string` |

#### Defined in

[packages/providers/src/message.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/message.ts#L21)

___

### MessageTransactionRequestInput

Ƭ **MessageTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BigNumberish`](namespaces/internal.md#bignumberish) | Amount of coins |
| `data` | `BytesLike` | data of message |
| `nonce` | [`BigNumberish`](namespaces/internal.md#bignumberish) | Unique nonce of message |
| `predicate?` | `BytesLike` | Predicate bytecode |
| `predicateData?` | `BytesLike` | Predicate input data (parameters) |
| `recipient` | `BytesLike` | Address of sender |
| `sender` | `BytesLike` | Address of sender |
| `type` | [`Message`](namespaces/internal.md#message) | - |
| `witnessIndex` | `number` | Index of witness that authorizes the message |

#### Defined in

[packages/providers/src/transaction-request/input.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L39)

___

### MessageTransactionRequestOutput

Ƭ **MessageTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BigNumberish`](namespaces/internal.md#bignumberish) | Amount of coins sent with message |
| `recipient` | `BytesLike` | Receiving address |
| `type` | [`Message`](namespaces/internal.md#message-1) | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L23)

___

### NodeInfo

Ƭ **NodeInfo**: `Object`

Node information

#### Type declaration

| Name | Type |
| :------ | :------ |
| `minGasPrice` | [`BN`](classes/internal-BN.md) |
| `nodeVersion` | `string` |

#### Defined in

[packages/providers/src/provider.ts:97](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L97)

___

### ProviderCallParams

Ƭ **ProviderCallParams**: `Object`

Provider Call transaction params

#### Type declaration

| Name | Type |
| :------ | :------ |
| `utxoValidation?` | `boolean` |

#### Defined in

[packages/providers/src/provider.ts:177](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L177)

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
| `status` | [`CoinStatus`](enums/CoinStatus.md) |
| `utxoId` | `string` |

#### Defined in

[packages/providers/src/resource.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/resource.ts#L5)

___

### RawMessage

Ƭ **RawMessage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `string` |
| `daHeight` | `string` |
| `data` | `string` |
| `nonce` | `string` |
| `recipient` | `string` |
| `sender` | `string` |

#### Defined in

[packages/providers/src/resource.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/resource.ts#L15)

___

### Resources

Ƭ **Resources**: [`GqlGetResourcesToSpendQuery`](namespaces/internal.md#gqlgetresourcestospendquery)[``"resourcesToSpend"``]

#### Defined in

[packages/providers/src/resource.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/resource.ts#L26)

___

### TransactionCost

Ƭ **TransactionCost**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fee` | [`BN`](classes/internal-BN.md) |
| `gasPrice` | [`BN`](classes/internal-BN.md) |
| `gasUsed` | [`BN`](classes/internal-BN.md) |
| `minGasPrice` | [`BN`](classes/internal-BN.md) |

#### Defined in

[packages/providers/src/provider.ts:102](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L102)

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](classes/ScriptTransactionRequest.md) \| [`CreateTransactionRequest`](classes/CreateTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:576](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L576)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](index.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](index.md#contracttransactionrequestinput) \| [`MessageTransactionRequestInput`](index.md#messagetransactionrequestinput)

#### Defined in

[packages/providers/src/transaction-request/input.ts:75](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L75)

___

### TransactionRequestLike

Ƭ **TransactionRequestLike**: { `type`: [`Script`](enums/TransactionType.md#script)  } & [`ScriptTransactionRequestLike`](interfaces/ScriptTransactionRequestLike.md) \| { `type`: [`Create`](enums/TransactionType.md#create)  } & [`CreateTransactionRequestLike`](interfaces/CreateTransactionRequestLike.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:577](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L577)

___

### TransactionRequestOutput

Ƭ **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](index.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](index.md#contracttransactionrequestoutput) \| [`MessageTransactionRequestOutput`](index.md#messagetransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](index.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](index.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](index.md#contractcreatedtransactionrequestoutput)

#### Defined in

[packages/providers/src/transaction-request/output.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L47)

___

### TransactionResult

Ƭ **TransactionResult**<`TStatus`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TStatus` | extends ``"success"`` \| ``"failure"`` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | `any` | - |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] | Receipts produced during the execution of the transaction |
| `status` | `TStatus` extends ``"success"`` ? { `programState`: `any` ; `type`: ``"success"``  } : { `reason`: `any` ; `type`: ``"failure"``  } | - |
| `time` | `any` | - |
| `transactionId` | `string` | - |

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:54](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L54)

___

### TransactionResultCallReceipt

Ƭ **TransactionResultCallReceipt**: [`ReceiptCall`](namespaces/internal.md#receiptcall)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L29)

___

### TransactionResultLogDataReceipt

Ƭ **TransactionResultLogDataReceipt**: [`ReceiptLogData`](namespaces/internal.md#receiptlogdata) & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L35)

___

### TransactionResultLogReceipt

Ƭ **TransactionResultLogReceipt**: [`ReceiptLog`](namespaces/internal.md#receiptlog)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L34)

___

### TransactionResultMessageOutReceipt

Ƭ **TransactionResultMessageOutReceipt**: [`ReceiptMessageOut`](namespaces/internal.md#receiptmessageout)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L39)

___

### TransactionResultPanicReceipt

Ƭ **TransactionResultPanicReceipt**: [`ReceiptPanic`](namespaces/internal.md#receiptpanic)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L32)

___

### TransactionResultReceipt

Ƭ **TransactionResultReceipt**: [`TransactionResultCallReceipt`](index.md#transactionresultcallreceipt) \| [`TransactionResultReturnReceipt`](index.md#transactionresultreturnreceipt) \| [`TransactionResultReturnDataReceipt`](index.md#transactionresultreturndatareceipt) \| [`TransactionResultPanicReceipt`](index.md#transactionresultpanicreceipt) \| [`TransactionResultRevertReceipt`](index.md#transactionresultrevertreceipt) \| [`TransactionResultLogReceipt`](index.md#transactionresultlogreceipt) \| [`TransactionResultLogDataReceipt`](index.md#transactionresultlogdatareceipt) \| [`TransactionResultTransferReceipt`](index.md#transactionresulttransferreceipt) \| [`TransactionResultTransferOutReceipt`](index.md#transactionresulttransferoutreceipt) \| [`TransactionResultScriptResultReceipt`](index.md#transactionresultscriptresultreceipt) \| [`TransactionResultMessageOutReceipt`](index.md#transactionresultmessageoutreceipt)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L41)

___

### TransactionResultReturnDataReceipt

Ƭ **TransactionResultReturnDataReceipt**: [`ReceiptReturnData`](namespaces/internal.md#receiptreturndata) & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L31)

___

### TransactionResultReturnReceipt

Ƭ **TransactionResultReturnReceipt**: [`ReceiptReturn`](namespaces/internal.md#receiptreturn)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L30)

___

### TransactionResultRevertReceipt

Ƭ **TransactionResultRevertReceipt**: [`ReceiptRevert`](namespaces/internal.md#receiptrevert)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L33)

___

### TransactionResultScriptResultReceipt

Ƭ **TransactionResultScriptResultReceipt**: [`ReceiptScriptResult`](namespaces/internal.md#receiptscriptresult)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L38)

___

### TransactionResultTransferOutReceipt

Ƭ **TransactionResultTransferOutReceipt**: [`ReceiptTransferOut`](namespaces/internal.md#receipttransferout)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L37)

___

### TransactionResultTransferReceipt

Ƭ **TransactionResultTransferReceipt**: [`ReceiptTransfer`](namespaces/internal.md#receipttransfer)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L36)

___

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | [`Variable`](namespaces/internal.md#variable) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L37)

## Variables

### returnZeroScript

• `Const` **returnZeroScript**: [`AbstractScript`](classes/internal-AbstractScript.md)<`void`\>

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:52](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L52)

___

### withdrawScript

• `Const` **withdrawScript**: [`AbstractScript`](classes/internal-AbstractScript.md)<`void`\>

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L62)

## Functions

### arraifyFromUint8Array

▸ **arraifyFromUint8Array**(`bytes`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytes` | `BytesLike` |

#### Returns

`Uint8Array`

#### Defined in

[packages/providers/src/util.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L12)

___

### calculatePriceWithFactor

▸ **calculatePriceWithFactor**(`gasUsed`, `gasPrice`, `priceFactor`): [`BN`](classes/internal-BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gasUsed` | [`BN`](classes/internal-BN.md) |
| `gasPrice` | [`BN`](classes/internal-BN.md) |
| `priceFactor` | [`BN`](classes/internal-BN.md) |

#### Returns

[`BN`](classes/internal-BN.md)

#### Defined in

[packages/providers/src/util.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L23)

___

### coinQuantityfy

▸ **coinQuantityfy**(`coinQuantityLike`): [`CoinQuantity`](index.md#coinquantity)

#### Parameters

| Name | Type |
| :------ | :------ |
| `coinQuantityLike` | [`CoinQuantityLike`](index.md#coinquantitylike) |

#### Returns

[`CoinQuantity`](index.md#coinquantity)

#### Defined in

[packages/providers/src/coin-quantity.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin-quantity.ts#L12)

___

### getGasUsedFromReceipts

▸ **getGasUsedFromReceipts**(`receipts`): [`BN`](classes/internal-BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] |

#### Returns

[`BN`](classes/internal-BN.md)

#### Defined in

[packages/providers/src/util.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L26)

___

### getReceiptsWithMissingOutputVariables

▸ **getReceiptsWithMissingOutputVariables**(`receipts`): [`TransactionResultReceipt`](index.md#transactionresultreceipt)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] |

#### Returns

[`TransactionResultReceipt`](index.md#transactionresultreceipt)[]

#### Defined in

[packages/providers/src/util.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L44)

___

### inputify

▸ **inputify**(`value`): [`Input`](namespaces/internal.md#input)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TransactionRequestInput`](index.md#transactionrequestinput) |

#### Returns

[`Input`](namespaces/internal.md#input)

#### Defined in

[packages/providers/src/transaction-request/input.ts:80](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L80)

___

### isCoin

▸ **isCoin**(`resource`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`Resource`](namespaces/internal.md#resource) |

#### Returns

`boolean`

#### Defined in

[packages/providers/src/resource.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/resource.ts#L33)

___

### isMessage

▸ **isMessage**(`resource`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`Resource`](namespaces/internal.md#resource) |

#### Returns

`boolean`

#### Defined in

[packages/providers/src/resource.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/resource.ts#L34)

___

### outputify

▸ **outputify**(`value`): [`Output`](namespaces/internal.md#output)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TransactionRequestOutput`](index.md#transactionrequestoutput) |

#### Returns

[`Output`](namespaces/internal.md#output)

#### Defined in

[packages/providers/src/transaction-request/output.ts:55](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L55)

___

### sleep

▸ **sleep**(`time?`): `Promise`<`unknown`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `time` | `number` | `1000` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[packages/providers/src/util.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L36)

___

### transactionRequestify

▸ **transactionRequestify**(`obj`): [`TransactionRequest`](index.md#transactionrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`TransactionRequestLike`](index.md#transactionrequestlike) |

#### Returns

[`TransactionRequest`](index.md#transactionrequest)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:581](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L581)
