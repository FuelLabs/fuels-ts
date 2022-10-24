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

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | [`BN`](classes/internal-BN.md) |
| `id` | `string` |
| `producer` | `string` |
| `time` | `string` |
| `transactionIds` | `string`[] |

#### Defined in

[packages/providers/src/provider.ts:50](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L50)

___

### BuildPredicateOptions

Ƭ **BuildPredicateOptions**: { `fundTransaction?`: `boolean`  } & `Pick`<[`TransactionRequestLike`](index.md#transactionrequestlike), ``"gasLimit"`` \| ``"gasPrice"`` \| ``"maturity"``\>

#### Defined in

[packages/providers/src/provider.ts:164](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L164)

___

### CallResult

Ƭ **CallResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] |

#### Defined in

[packages/providers/src/provider.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L43)

___

### ChainInfo

Ƭ **ChainInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `baseChainHeight` | [`BN`](classes/internal-BN.md) |
| `consensusParameters` | `Object` |
| `consensusParameters.gasPriceFactor` | [`BN`](classes/internal-BN.md) |
| `consensusParameters.maxGasPerTx` | [`BN`](classes/internal-BN.md) |
| `consensusParameters.maxScriptLength` | [`BN`](classes/internal-BN.md) |
| `latestBlock` | `Object` |
| `latestBlock.height` | [`BN`](classes/internal-BN.md) |
| `latestBlock.id` | `string` |
| `latestBlock.producer` | `string` |
| `latestBlock.time` | `string` |
| `latestBlock.transactions` | { `id`: `string`  }[] |
| `name` | `string` |
| `peerCount` | `number` |

#### Defined in

[packages/providers/src/provider.ts:69](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L69)

___

### ChangeTransactionRequestOutput

Ƭ **ChangeTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assetId` | `BytesLike` |
| `to` | `BytesLike` |
| `type` | [`Change`](namespaces/internal.md#change) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L32)

___

### Coin

Ƭ **Coin**: `Object`

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

| Name | Type |
| :------ | :------ |
| `amount` | [`BigNumberish`](namespaces/internal.md#bignumberish) |
| `assetId` | `BytesLike` |
| `id` | `BytesLike` |
| `maturity?` | `number` |
| `owner` | `BytesLike` |
| `predicate?` | `BytesLike` |
| `predicateData?` | `BytesLike` |
| `txPointer` | `BytesLike` |
| `type` | [`Coin`](namespaces/internal.md#coin) |
| `witnessIndex` | `number` |

#### Defined in

[packages/providers/src/transaction-request/input.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L9)

___

### CoinTransactionRequestOutput

Ƭ **CoinTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BigNumberish`](namespaces/internal.md#bignumberish) |
| `assetId` | `BytesLike` |
| `to` | `BytesLike` |
| `type` | [`Coin`](namespaces/internal.md#coin) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L9)

___

### ContractCreatedTransactionRequestOutput

Ƭ **ContractCreatedTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractId` | `BytesLike` |
| `stateRoot` | `BytesLike` |
| `type` | [`ContractCreated`](namespaces/internal.md#contractcreated) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L42)

___

### ContractResult

Ƭ **ContractResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bytecode` | `string` |
| `id` | `string` |

#### Defined in

[packages/providers/src/provider.ts:61](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L61)

___

### ContractTransactionRequestInput

Ƭ **ContractTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractId` | `BytesLike` |
| `txPointer` | `BytesLike` |
| `type` | [`Contract`](namespaces/internal.md#contract) |

#### Defined in

[packages/providers/src/transaction-request/input.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L66)

___

### ContractTransactionRequestOutput

Ƭ **ContractTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `inputIndex` | `number` |
| `type` | [`Contract`](namespaces/internal.md#contract) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L18)

___

### CursorPaginationArgs

Ƭ **CursorPaginationArgs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `after?` | `string` \| ``null`` |
| `before?` | `string` \| ``null`` |
| `first?` | `number` \| ``null`` |
| `last?` | `number` \| ``null`` |

#### Defined in

[packages/providers/src/provider.ts:153](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L153)

___

### Message

Ƭ **Message**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `daHeight` | [`BN`](classes/internal-BN.md) |
| `data` | `number`[] |
| `nonce` | [`BN`](classes/internal-BN.md) |
| `recipient` | [`AbstractAddress`](classes/internal-AbstractAddress.md) |
| `sender` | [`AbstractAddress`](classes/internal-AbstractAddress.md) |

#### Defined in

[packages/providers/src/message.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/message.ts#L7)

___

### MessageTransactionRequestInput

Ƭ **MessageTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BigNumberish`](namespaces/internal.md#bignumberish) |
| `data` | `number`[] |
| `nonce` | [`BigNumberish`](namespaces/internal.md#bignumberish) |
| `predicate?` | `BytesLike` |
| `predicateData?` | `BytesLike` |
| `recipient` | `BytesLike` |
| `sender` | `BytesLike` |
| `type` | [`Message`](namespaces/internal.md#message) |
| `witnessIndex` | `number` |

#### Defined in

[packages/providers/src/transaction-request/input.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L39)

___

### NodeInfo

Ƭ **NodeInfo**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `minGasPrice` | [`BN`](classes/internal-BN.md) |
| `nodeVersion` | `string` |

#### Defined in

[packages/providers/src/provider.ts:90](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L90)

___

### ProviderCallParams

Ƭ **ProviderCallParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `utxoValidation?` | `boolean` |

#### Defined in

[packages/providers/src/provider.ts:171](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L171)

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

[packages/providers/src/provider.ts:95](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L95)

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](classes/ScriptTransactionRequest.md) \| [`CreateTransactionRequest`](classes/CreateTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:538](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L538)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](index.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](index.md#contracttransactionrequestinput) \| [`MessageTransactionRequestInput`](index.md#messagetransactionrequestinput)

#### Defined in

[packages/providers/src/transaction-request/input.ts:75](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L75)

___

### TransactionRequestLike

Ƭ **TransactionRequestLike**: { `type`: [`Script`](enums/TransactionType.md#script)  } & [`ScriptTransactionRequestLike`](interfaces/ScriptTransactionRequestLike.md) \| { `type`: [`Create`](enums/TransactionType.md#create)  } & [`CreateTransactionRequestLike`](interfaces/CreateTransactionRequestLike.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:539](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L539)

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

| Name | Type |
| :------ | :------ |
| `blockId` | `any` |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] |
| `status` | `TStatus` extends ``"success"`` ? { `programState`: `any` ; `type`: ``"success"``  } : { `reason`: `any` ; `type`: ``"failure"``  } |
| `time` | `any` |
| `transactionId` | `string` |

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:51](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L51)

___

### TransactionResultCallReceipt

Ƭ **TransactionResultCallReceipt**: [`ReceiptCall`](namespaces/internal.md#receiptcall)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L28)

___

### TransactionResultLogDataReceipt

Ƭ **TransactionResultLogDataReceipt**: [`ReceiptLogData`](namespaces/internal.md#receiptlogdata) & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L34)

___

### TransactionResultLogReceipt

Ƭ **TransactionResultLogReceipt**: [`ReceiptLog`](namespaces/internal.md#receiptlog)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L33)

___

### TransactionResultPanicReceipt

Ƭ **TransactionResultPanicReceipt**: [`ReceiptPanic`](namespaces/internal.md#receiptpanic)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L31)

___

### TransactionResultReceipt

Ƭ **TransactionResultReceipt**: [`TransactionResultCallReceipt`](index.md#transactionresultcallreceipt) \| [`TransactionResultReturnReceipt`](index.md#transactionresultreturnreceipt) \| [`TransactionResultReturnDataReceipt`](index.md#transactionresultreturndatareceipt) \| [`TransactionResultPanicReceipt`](index.md#transactionresultpanicreceipt) \| [`TransactionResultRevertReceipt`](index.md#transactionresultrevertreceipt) \| [`TransactionResultLogReceipt`](index.md#transactionresultlogreceipt) \| [`TransactionResultLogDataReceipt`](index.md#transactionresultlogdatareceipt) \| [`TransactionResultTransferReceipt`](index.md#transactionresulttransferreceipt) \| [`TransactionResultTransferOutReceipt`](index.md#transactionresulttransferoutreceipt) \| [`TransactionResultScriptResultReceipt`](index.md#transactionresultscriptresultreceipt)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L39)

___

### TransactionResultReturnDataReceipt

Ƭ **TransactionResultReturnDataReceipt**: [`ReceiptReturnData`](namespaces/internal.md#receiptreturndata) & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L30)

___

### TransactionResultReturnReceipt

Ƭ **TransactionResultReturnReceipt**: [`ReceiptReturn`](namespaces/internal.md#receiptreturn)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L29)

___

### TransactionResultRevertReceipt

Ƭ **TransactionResultRevertReceipt**: [`ReceiptRevert`](namespaces/internal.md#receiptrevert)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L32)

___

### TransactionResultScriptResultReceipt

Ƭ **TransactionResultScriptResultReceipt**: [`ReceiptScriptResult`](namespaces/internal.md#receiptscriptresult)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L37)

___

### TransactionResultTransferOutReceipt

Ƭ **TransactionResultTransferOutReceipt**: [`ReceiptTransferOut`](namespaces/internal.md#receipttransferout)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L36)

___

### TransactionResultTransferReceipt

Ƭ **TransactionResultTransferReceipt**: [`ReceiptTransfer`](namespaces/internal.md#receipttransfer)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L35)

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

| Name | Type |
| :------ | :------ |
| `amount` | [`BigNumberish`](namespaces/internal.md#bignumberish) |
| `assetId` | `BytesLike` |
| `to` | `BytesLike` |
| `type` | [`Withdrawal`](namespaces/internal.md#withdrawal) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L23)

## Variables

### returnZeroScript

• `Const` **returnZeroScript**: [`AbstractScript`](classes/internal-AbstractScript.md)<`void`\>

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:52](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L52)

## Functions

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

___

### coinQuantityfy

▸ **coinQuantityfy**(`coinQuantityLike`): [`CoinQuantity`](index.md#coinquantity)

#### Parameters

| Name | Type |
| :------ | :------ |
| `coinQuantityLike` | [`CoinQuantityLike`](index.md#coinquantitylike) |

#### Returns

[`CoinQuantity`](index.md#coinquantity)

___

### getGasUsedFromReceipts

▸ **getGasUsedFromReceipts**(`receipts`): [`BN`](classes/internal-BN.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] |

#### Returns

[`BN`](classes/internal-BN.md)

___

### getSignableTransaction

▸ **getSignableTransaction**(`transaction`): [`Transaction`](namespaces/internal.md#transaction)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | [`Transaction`](namespaces/internal.md#transaction) |

#### Returns

[`Transaction`](namespaces/internal.md#transaction)

___

### getTransactionId

▸ **getTransactionId**(`transaction`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | [`Transaction`](namespaces/internal.md#transaction) |

#### Returns

`string`

___

### inputify

▸ **inputify**(`value`): [`Input`](namespaces/internal.md#input)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TransactionRequestInput`](index.md#transactionrequestinput) |

#### Returns

[`Input`](namespaces/internal.md#input)

___

### outputify

▸ **outputify**(`value`): [`Output`](namespaces/internal.md#output)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TransactionRequestOutput`](index.md#transactionrequestoutput) |

#### Returns

[`Output`](namespaces/internal.md#output)

___

### transactionRequestify

▸ **transactionRequestify**(`obj`): [`TransactionRequest`](index.md#transactionrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`TransactionRequestLike`](index.md#transactionrequestlike) |

#### Returns

[`TransactionRequest`](index.md#transactionrequest)
