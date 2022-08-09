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

## Type aliases

### Block

Ƭ **Block**: `Object`

A Fuel block

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `bigint` |
| `id` | `string` |
| `producer` | `string` |
| `time` | `string` |
| `transactionIds` | `string`[] |

#### Defined in

[packages/providers/src/provider.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L26)

___

### CallResult

Ƭ **CallResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] |

#### Defined in

[packages/providers/src/provider.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L19)

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

[packages/providers/src/transaction-request/output.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L31)

___

### Coin

Ƭ **Coin**: `Object`

A Fuel coin

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `bigint` |
| `assetId` | `string` |
| `blockCreated` | `bigint` |
| `id` | `string` |
| `maturity` | `bigint` |
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
| `amount` | `bigint` |
| `assetId` | `string` |

#### Defined in

[packages/providers/src/coin-quantity.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin-quantity.ts#L9)

___

### CoinQuantityLike

Ƭ **CoinQuantityLike**: [amount: BigNumberish, assetId?: BytesLike] \| { `amount`: `BigNumberish` ; `assetId?`: `BytesLike`  }

#### Defined in

[packages/providers/src/coin-quantity.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin-quantity.ts#L6)

___

### CoinTransactionRequestInput

Ƭ **CoinTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumberish` | Amount of coins |
| `assetId` | `BytesLike` | Asset ID of the coins |
| `id` | `BytesLike` | UTXO ID |
| `maturity?` | `BigNumberish` | UTXO being spent must have been created at least this many blocks ago |
| `owner` | `BytesLike` | Owning address or script hash |
| `predicate?` | `BytesLike` | Predicate bytecode |
| `predicateData?` | `BytesLike` | Predicate input data (parameters) |
| `type` | [`Coin`](index.md#coin) | - |
| `witnessIndex` | `number` | Index of witness that authorizes spending the coin |

#### Defined in

[packages/providers/src/transaction-request/input.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L8)

___

### CoinTransactionRequestOutput

Ƭ **CoinTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumberish` | Amount of coins to send |
| `assetId` | `BytesLike` | Asset ID of coins |
| `to` | `BytesLike` | Receiving address or script hash |
| `type` | [`Coin`](index.md#coin) | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L8)

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

[packages/providers/src/transaction-request/output.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L41)

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

[packages/providers/src/provider.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L37)

___

### ContractTransactionRequestInput

Ƭ **ContractTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `type` | [`Contract`](../fuel-ts-contract/classes/Contract.md) | - |

#### Defined in

[packages/providers/src/transaction-request/input.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L27)

___

### ContractTransactionRequestOutput

Ƭ **ContractTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputIndex` | `number` | Index of input contract |
| `type` | [`Contract`](../fuel-ts-contract/classes/Contract.md) | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L17)

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

[packages/providers/src/provider.ts:68](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L68)

___

### ProviderCallParams

Ƭ **ProviderCallParams**: `Object`

Provider Call transaction params

#### Type declaration

| Name | Type |
| :------ | :------ |
| `utxoValidation?` | `boolean` |

#### Defined in

[packages/providers/src/provider.ts:82](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L82)

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](classes/ScriptTransactionRequest.md) \| [`CreateTransactionRequest`](classes/CreateTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:483](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L483)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](index.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](index.md#contracttransactionrequestinput)

#### Defined in

[packages/providers/src/transaction-request/input.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L32)

___

### TransactionRequestLike

Ƭ **TransactionRequestLike**: { `type`: `TransactionType.Script`  } & [`ScriptTransactionRequestLike`](interfaces/ScriptTransactionRequestLike.md) \| { `type`: `TransactionType.Create`  } & [`CreateTransactionRequestLike`](interfaces/CreateTransactionRequestLike.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:484](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L484)

___

### TransactionRequestOutput

Ƭ **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](index.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](index.md#contracttransactionrequestoutput) \| [`WithdrawalTransactionRequestOutput`](index.md#withdrawaltransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](index.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](index.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](index.md#contractcreatedtransactionrequestoutput)

#### Defined in

[packages/providers/src/transaction-request/output.ts:48](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L48)

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

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:48](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L48)

___

### TransactionResultCallReceipt

Ƭ **TransactionResultCallReceipt**: `ReceiptCall`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L25)

___

### TransactionResultLogDataReceipt

Ƭ **TransactionResultLogDataReceipt**: `ReceiptLogData` & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L31)

___

### TransactionResultLogReceipt

Ƭ **TransactionResultLogReceipt**: `ReceiptLog`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L30)

___

### TransactionResultPanicReceipt

Ƭ **TransactionResultPanicReceipt**: `ReceiptPanic`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L28)

___

### TransactionResultReceipt

Ƭ **TransactionResultReceipt**: [`TransactionResultCallReceipt`](index.md#transactionresultcallreceipt) \| [`TransactionResultReturnReceipt`](index.md#transactionresultreturnreceipt) \| [`TransactionResultReturnDataReceipt`](index.md#transactionresultreturndatareceipt) \| [`TransactionResultPanicReceipt`](index.md#transactionresultpanicreceipt) \| [`TransactionResultRevertReceipt`](index.md#transactionresultrevertreceipt) \| [`TransactionResultLogReceipt`](index.md#transactionresultlogreceipt) \| [`TransactionResultLogDataReceipt`](index.md#transactionresultlogdatareceipt) \| [`TransactionResultTransferReceipt`](index.md#transactionresulttransferreceipt) \| [`TransactionResultTransferOutReceipt`](index.md#transactionresulttransferoutreceipt) \| [`TransactionResultScriptResultReceipt`](index.md#transactionresultscriptresultreceipt)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L36)

___

### TransactionResultReturnDataReceipt

Ƭ **TransactionResultReturnDataReceipt**: `ReceiptReturnData` & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L27)

___

### TransactionResultReturnReceipt

Ƭ **TransactionResultReturnReceipt**: `ReceiptReturn`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L26)

___

### TransactionResultRevertReceipt

Ƭ **TransactionResultRevertReceipt**: `ReceiptRevert`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L29)

___

### TransactionResultScriptResultReceipt

Ƭ **TransactionResultScriptResultReceipt**: `ReceiptScriptResult`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L34)

___

### TransactionResultTransferOutReceipt

Ƭ **TransactionResultTransferOutReceipt**: `ReceiptTransferOut`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L33)

___

### TransactionResultTransferReceipt

Ƭ **TransactionResultTransferReceipt**: `ReceiptTransfer`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L32)

___

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `OutputType.Variable` |

#### Defined in

[packages/providers/src/transaction-request/output.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L38)

___

### WithdrawalTransactionRequestOutput

Ƭ **WithdrawalTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumberish` | Amount of coins to withdraw |
| `assetId` | `BytesLike` | Asset ID of coins |
| `to` | `BytesLike` | Receiving address |
| `type` | `OutputType.Withdrawal` | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L22)

## Variables

### returnZeroScript

• `Const` **returnZeroScript**: [`AbstractScript`](../fuel-ts-interfaces/classes/AbstractScript.md)<`void`\>

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L38)

## Functions

### coinQuantityfy

▸ **coinQuantityfy**(`coinQuantityLike`): [`CoinQuantity`](index.md#coinquantity)

#### Parameters

| Name | Type |
| :------ | :------ |
| `coinQuantityLike` | [`CoinQuantityLike`](index.md#coinquantitylike) |

#### Returns

[`CoinQuantity`](index.md#coinquantity)

#### Defined in

[packages/providers/src/coin-quantity.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin-quantity.ts#L11)

___

### getSignableTransaction

▸ **getSignableTransaction**(`transaction`): `Transaction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Transaction` |

#### Returns

`Transaction`

#### Defined in

[packages/providers/src/util.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L6)

___

### getTransactionId

▸ **getTransactionId**(`transaction`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Transaction` |

#### Returns

`string`

#### Defined in

[packages/providers/src/util.ts:68](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L68)

___

### inputify

▸ **inputify**(`value`): `Input`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TransactionRequestInput`](index.md#transactionrequestinput) |

#### Returns

`Input`

#### Defined in

[packages/providers/src/transaction-request/input.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L34)

___

### outputify

▸ **outputify**(`value`): `Output`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TransactionRequestOutput`](index.md#transactionrequestoutput) |

#### Returns

`Output`

#### Defined in

[packages/providers/src/transaction-request/output.ts:56](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L56)

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

[packages/providers/src/transaction-request/transaction-request.ts:488](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L488)
