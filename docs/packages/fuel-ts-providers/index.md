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
| `height` | `string` |
| `id` | `string` |
| `producer` | `string` |
| `time` | `string` |
| `transactionIds` | `string`[] |

#### Defined in

[packages/providers/src/provider.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L47)

___

### BuildPredicateOptions

Ƭ **BuildPredicateOptions**: { `fundTransaction?`: `boolean`  } & `Pick`<[`TransactionRequestLike`](index.md#transactionrequestlike), ``"gasLimit"`` \| ``"gasPrice"`` \| ``"bytePrice"`` \| ``"maturity"``\>

#### Defined in

[packages/providers/src/provider.ts:166](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L166)

___

### CallResult

Ƭ **CallResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] |

#### Defined in

[packages/providers/src/provider.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L40)

___

### ChainInfo

Ƭ **ChainInfo**: `Object`

Chain information

#### Type declaration

| Name | Type |
| :------ | :------ |
| `baseChainHeight` | `string` |
| `consensusParameters` | { `gasPriceFactor`: `string` ; `maxGasPerTx`: `string` ; `maxScriptLength`: `string`  } |
| `consensusParameters.gasPriceFactor` | `string` |
| `consensusParameters.maxGasPerTx` | `string` |
| `consensusParameters.maxScriptLength` | `string` |
| `latestBlock` | { `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `id`: `string`  }[]  } |
| `latestBlock.height` | `string` |
| `latestBlock.id` | `string` |
| `latestBlock.producer` | `string` |
| `latestBlock.time` | `string` |
| `latestBlock.transactions` | { `id`: `string`  }[] |
| `name` | `string` |
| `peerCount` | `number` |

#### Defined in

[packages/providers/src/provider.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L66)

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

[packages/providers/src/transaction-request/output.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L32)

___

### Coin

Ƭ **Coin**: `Object`

A Fuel coin

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `string` |
| `assetId` | `string` |
| `blockCreated` | `string` |
| `id` | `string` |
| `maturity` | `string` |
| `owner` | `string` |
| `status` | [`CoinStatus`](enums/CoinStatus.md) |

#### Defined in

[packages/providers/src/coin.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin.ts#L6)

___

### CoinQuantity

Ƭ **CoinQuantity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `string` |
| `assetId` | `string` |

#### Defined in

[packages/providers/src/coin-quantity.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin-quantity.ts#L10)

___

### CoinQuantityLike

Ƭ **CoinQuantityLike**: [amount: BigNumberish, assetId?: BytesLike] \| { `amount`: [`BigNumberish`](namespaces/internal.md#bignumberish) ; `assetId?`: `BytesLike`  }

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
| `maturity?` | [`BigNumberish`](namespaces/internal.md#bignumberish) | UTXO being spent must have been created at least this many blocks ago |
| `owner` | `BytesLike` | Owning address or script hash |
| `predicate?` | `BytesLike` | Predicate bytecode |
| `predicateData?` | `BytesLike` | Predicate input data (parameters) |
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

[packages/providers/src/transaction-request/output.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L42)

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

[packages/providers/src/provider.ts:58](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L58)

___

### ContractTransactionRequestInput

Ƭ **ContractTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `type` | [`Contract`](namespaces/internal.md#contract) | - |

#### Defined in

[packages/providers/src/transaction-request/input.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L28)

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

[packages/providers/src/provider.ts:155](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L155)

___

### NodeInfo

Ƭ **NodeInfo**: `Object`

Node information

#### Type declaration

| Name | Type |
| :------ | :------ |
| `minBytePrice` | `string` |
| `minGasPrice` | `string` |
| `nodeVersion` | `string` |

#### Defined in

[packages/providers/src/provider.ts:87](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L87)

___

### ProviderCallParams

Ƭ **ProviderCallParams**: `Object`

Provider Call transaction params

#### Type declaration

| Name | Type |
| :------ | :------ |
| `utxoValidation?` | `boolean` |

#### Defined in

[packages/providers/src/provider.ts:173](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L173)

___

### TransactionCost

Ƭ **TransactionCost**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bytePrice` | `string` |
| `byteSize` | `string` |
| `fee` | `string` |
| `gasPrice` | `string` |
| `gasUsed` | `string` |
| `minBytePrice` | `string` |
| `minGasPrice` | `string` |

#### Defined in

[packages/providers/src/provider.ts:93](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L93)

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](classes/ScriptTransactionRequest.md) \| [`CreateTransactionRequest`](classes/CreateTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:531](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L531)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](index.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](index.md#contracttransactionrequestinput)

#### Defined in

[packages/providers/src/transaction-request/input.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L33)

___

### TransactionRequestLike

Ƭ **TransactionRequestLike**: { `type`: [`Script`](enums/TransactionType.md#script)  } & [`ScriptTransactionRequestLike`](interfaces/ScriptTransactionRequestLike.md) \| { `type`: [`Create`](enums/TransactionType.md#create)  } & [`CreateTransactionRequestLike`](interfaces/CreateTransactionRequestLike.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:532](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L532)

___

### TransactionRequestOutput

Ƭ **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](index.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](index.md#contracttransactionrequestoutput) \| [`WithdrawalTransactionRequestOutput`](index.md#withdrawaltransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](index.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](index.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](index.md#contractcreatedtransactionrequestoutput)

#### Defined in

[packages/providers/src/transaction-request/output.ts:49](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L49)

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

[packages/providers/src/transaction-response/transaction-response.ts:50](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L50)

___

### TransactionResultCallReceipt

Ƭ **TransactionResultCallReceipt**: [`ReceiptCall`](namespaces/internal.md#receiptcall)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L27)

___

### TransactionResultLogDataReceipt

Ƭ **TransactionResultLogDataReceipt**: [`ReceiptLogData`](namespaces/internal.md#receiptlogdata) & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L33)

___

### TransactionResultLogReceipt

Ƭ **TransactionResultLogReceipt**: [`ReceiptLog`](namespaces/internal.md#receiptlog)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L32)

___

### TransactionResultPanicReceipt

Ƭ **TransactionResultPanicReceipt**: [`ReceiptPanic`](namespaces/internal.md#receiptpanic)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L30)

___

### TransactionResultReceipt

Ƭ **TransactionResultReceipt**: [`TransactionResultCallReceipt`](index.md#transactionresultcallreceipt) \| [`TransactionResultReturnReceipt`](index.md#transactionresultreturnreceipt) \| [`TransactionResultReturnDataReceipt`](index.md#transactionresultreturndatareceipt) \| [`TransactionResultPanicReceipt`](index.md#transactionresultpanicreceipt) \| [`TransactionResultRevertReceipt`](index.md#transactionresultrevertreceipt) \| [`TransactionResultLogReceipt`](index.md#transactionresultlogreceipt) \| [`TransactionResultLogDataReceipt`](index.md#transactionresultlogdatareceipt) \| [`TransactionResultTransferReceipt`](index.md#transactionresulttransferreceipt) \| [`TransactionResultTransferOutReceipt`](index.md#transactionresulttransferoutreceipt) \| [`TransactionResultScriptResultReceipt`](index.md#transactionresultscriptresultreceipt)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L38)

___

### TransactionResultReturnDataReceipt

Ƭ **TransactionResultReturnDataReceipt**: [`ReceiptReturnData`](namespaces/internal.md#receiptreturndata) & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L29)

___

### TransactionResultReturnReceipt

Ƭ **TransactionResultReturnReceipt**: [`ReceiptReturn`](namespaces/internal.md#receiptreturn)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L28)

___

### TransactionResultRevertReceipt

Ƭ **TransactionResultRevertReceipt**: [`ReceiptRevert`](namespaces/internal.md#receiptrevert)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L31)

___

### TransactionResultScriptResultReceipt

Ƭ **TransactionResultScriptResultReceipt**: [`ReceiptScriptResult`](namespaces/internal.md#receiptscriptresult)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L36)

___

### TransactionResultTransferOutReceipt

Ƭ **TransactionResultTransferOutReceipt**: [`ReceiptTransferOut`](namespaces/internal.md#receipttransferout)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L35)

___

### TransactionResultTransferReceipt

Ƭ **TransactionResultTransferReceipt**: [`ReceiptTransfer`](namespaces/internal.md#receipttransfer)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L34)

___

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | [`Variable`](namespaces/internal.md#variable) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L39)

___

### WithdrawalTransactionRequestOutput

Ƭ **WithdrawalTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BigNumberish`](namespaces/internal.md#bignumberish) | Amount of coins to withdraw |
| `assetId` | `BytesLike` | Asset ID of coins |
| `to` | `BytesLike` | Receiving address |
| `type` | [`Withdrawal`](namespaces/internal.md#withdrawal) | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L23)

## Variables

### MIN\_TRANSACTION\_AMOUNT

• `Const` **MIN\_TRANSACTION\_AMOUNT**: `1n`

The provider required at least 1 native coin
even if the gasPrice and bytePrice are 0

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:103](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L103)

___

### returnZeroScript

• `Const` **returnZeroScript**: [`AbstractScript`](classes/internal-AbstractScript.md)<`void`\>

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:51](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L51)

## Functions

### calculatePriceWithFactor

▸ **calculatePriceWithFactor**(`gasUsed`, `gasPrice`, `priceFactor`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `gasUsed` | `string` |
| `gasPrice` | `string` |
| `priceFactor` | `string` |

#### Returns

`string`

#### Defined in

[packages/providers/src/util.ts:85](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L85)

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

▸ **getGasUsedFromReceipts**(`receipts`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] |

#### Returns

`string`

#### Defined in

[packages/providers/src/util.ts:91](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L91)

___

### getSignableTransaction

▸ **getSignableTransaction**(`transaction`): [`Transaction`](namespaces/internal.md#transaction)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | [`Transaction`](namespaces/internal.md#transaction) |

#### Returns

[`Transaction`](namespaces/internal.md#transaction)

#### Defined in

[packages/providers/src/util.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L15)

___

### getTransactionId

▸ **getTransactionId**(`transaction`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | [`Transaction`](namespaces/internal.md#transaction) |

#### Returns

`string`

#### Defined in

[packages/providers/src/util.ts:77](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L77)

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

[packages/providers/src/transaction-request/input.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L35)

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

[packages/providers/src/transaction-request/output.ts:57](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L57)

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

[packages/providers/src/transaction-request/transaction-request.ts:536](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L536)
