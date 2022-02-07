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

- [TransactionType](enums/TransactionType.md)

## Classes

- [Provider](classes/Provider.md)

## Type aliases

### Block

Ƭ **Block**: `Object`

A Fuel block

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `BigNumber` |
| `id` | `string` |
| `producer` | `string` |
| `time` | `string` |
| `transactionIds` | `string`[] |

#### Defined in

[providers/src/provider.ts:74](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/provider.ts#L74)

___

### CallResult

Ƭ **CallResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] |

#### Defined in

[providers/src/provider.ts:38](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/provider.ts#L38)

___

### Coin

Ƭ **Coin**: `Object`

A Fuel coin

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BigNumber` |
| `blockCreated` | `BigNumber` |
| `color` | `string` |
| `id` | `string` |
| `maturity` | `BigNumber` |
| `owner` | `string` |

#### Defined in

[providers/src/provider.ts:85](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/provider.ts#L85)

___

### CreateTransactionRequest

Ƭ **CreateTransactionRequest**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytecodeWitnessIndex` | `BigNumberish` | Witness index of contract bytecode to create |
| `gasLimit` | `BigNumberish` | Gas limit for transaction |
| `gasPrice` | `BigNumberish` | Gas price for transaction |
| `inputs?` | [`TransactionRequestInput`](index.md#transactionrequestinput)[] | List of inputs |
| `maturity?` | `BigNumberish` | Block until which tx cannot be included |
| `outputs?` | [`TransactionRequestOutput`](index.md#transactionrequestoutput)[] | List of outputs |
| `salt` | `string` | Salt |
| `staticContracts?` | `string`[] | List of static contracts |
| `type` | [`Create`](enums/TransactionType.md#create) | - |
| `witnesses?` | [`TransactionRequestWitness`](namespaces/internal.md#transactionrequestwitness)[] | List of witnesses |

#### Defined in

[providers/src/transaction-request/transaction-request.ts:36](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/transaction-request.ts#L36)

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

[providers/src/provider.ts:120](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/provider.ts#L120)

___

### ScriptTransactionRequest

Ƭ **ScriptTransactionRequest**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `gasLimit` | `BigNumberish` | Gas limit for transaction |
| `gasPrice` | `BigNumberish` | Gas price for transaction |
| `inputs?` | [`TransactionRequestInput`](index.md#transactionrequestinput)[] | List of inputs |
| `maturity?` | `BigNumberish` | Block until which tx cannot be included |
| `outputs?` | [`TransactionRequestOutput`](index.md#transactionrequestoutput)[] | List of outputs |
| `script?` | `BytesLike` | Script to execute |
| `scriptData?` | `BytesLike` | Script input data (parameters) |
| `type` | [`Script`](enums/TransactionType.md#script) | - |
| `witnesses?` | [`TransactionRequestWitness`](namespaces/internal.md#transactionrequestwitness)[] | List of witnesses |

#### Defined in

[providers/src/transaction-request/transaction-request.ts:17](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/transaction-request.ts#L17)

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](index.md#scripttransactionrequest) \| [`CreateTransactionRequest`](index.md#createtransactionrequest)

#### Defined in

[providers/src/transaction-request/transaction-request.ts:57](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/transaction-request.ts#L57)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](namespaces/internal.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](namespaces/internal.md#contracttransactionrequestinput)

#### Defined in

[providers/src/transaction-request/input.ts:32](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/input.ts#L32)

___

### TransactionRequestOutput

Ƭ **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](namespaces/internal.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](namespaces/internal.md#contracttransactionrequestoutput) \| [`WithdrawalTransactionRequestOutput`](namespaces/internal.md#withdrawaltransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](namespaces/internal.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](namespaces/internal.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](namespaces/internal.md#contractcreatedtransactionrequestoutput)

#### Defined in

[providers/src/transaction-request/output.ts:46](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/output.ts#L46)

___

### TransactionResponse

Ƭ **TransactionResponse**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Transaction ID |
| `request` | [`TransactionRequest`](index.md#transactionrequest) | Transaction request |
| `wait` | () => `Promise`<[`TransactionResult`](index.md#transactionresult)\> | Waits for transaction to be confirmed and returns the result |

#### Defined in

[providers/src/provider.ts:62](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/provider.ts#L62)

___

### TransactionResult

Ƭ **TransactionResult**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | `any` | - |
| `programState` | `any` | - |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] | Receipts produced during the execution of the transaction |
| `time` | `any` | - |

#### Defined in

[providers/src/provider.ts:54](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/provider.ts#L54)

___

### TransactionResultReceipt

Ƭ **TransactionResultReceipt**: [`ReceiptCall`](../fuel-ts-transactions/index.md#receiptcall) \| [`ReceiptReturn`](../fuel-ts-transactions/index.md#receiptreturn) \| [`ReceiptReturnData`](../fuel-ts-transactions/index.md#receiptreturndata) & { `data`: `string`  } \| [`ReceiptPanic`](../fuel-ts-transactions/index.md#receiptpanic) \| [`ReceiptRevert`](../fuel-ts-transactions/index.md#receiptrevert) \| [`ReceiptLog`](../fuel-ts-transactions/index.md#receiptlog) \| [`ReceiptLogData`](../fuel-ts-transactions/index.md#receiptlogdata) & { `data`: `string`  } \| [`ReceiptTransfer`](../fuel-ts-transactions/index.md#receipttransfer) \| [`ReceiptTransferOut`](../fuel-ts-transactions/index.md#receipttransferout) \| [`ReceiptScriptResult`](../fuel-ts-transactions/index.md#receiptscriptresult)

#### Defined in

[providers/src/provider.ts:42](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/provider.ts#L42)

## Functions

### getCoinUtxoId

▸ `Const` **getCoinUtxoId**(`transactionId`, `outputIndex`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionId` | `BytesLike` |
| `outputIndex` | `BigNumberish` |

#### Returns

`string`

#### Defined in

[providers/src/util.ts:28](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/util.ts#L28)

___

### getContractId

▸ `Const` **getContractId**(`bytecode`, `salt`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytecode` | `BytesLike` |
| `salt` | `string` |

#### Returns

`string`

#### Defined in

[providers/src/util.ts:22](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/util.ts#L22)

___

### getSignableTransaction

▸ `Const` **getSignableTransaction**(`transaction`): [`Transaction`](../fuel-ts-transactions/index.md#transaction)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | [`Transaction`](../fuel-ts-transactions/index.md#transaction) |

#### Returns

[`Transaction`](../fuel-ts-transactions/index.md#transaction)

#### Defined in

[providers/src/util.ts:35](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/util.ts#L35)

___

### getTransactionId

▸ `Const` **getTransactionId**(`transaction`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | [`Transaction`](../fuel-ts-transactions/index.md#transaction) |

#### Returns

`string`

#### Defined in

[providers/src/util.ts:98](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/util.ts#L98)

___

### inputify

▸ `Const` **inputify**(`value`): [`Input`](../fuel-ts-transactions/index.md#input)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TransactionRequestInput`](index.md#transactionrequestinput) |

#### Returns

[`Input`](../fuel-ts-transactions/index.md#input)

#### Defined in

[providers/src/transaction-request/input.ts:34](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/input.ts#L34)

___

### outputify

▸ `Const` **outputify**(`value`): [`Output`](../fuel-ts-transactions/index.md#output)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`TransactionRequestOutput`](index.md#transactionrequestoutput) |

#### Returns

[`Output`](../fuel-ts-transactions/index.md#output)

#### Defined in

[providers/src/transaction-request/output.ts:54](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/output.ts#L54)

___

### transactionFromRequest

▸ `Const` **transactionFromRequest**(`transactionRequest`): [`Transaction`](../fuel-ts-transactions/index.md#transaction)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](index.md#transactionrequest) |

#### Returns

[`Transaction`](../fuel-ts-transactions/index.md#transaction)

#### Defined in

[providers/src/transaction-request/transaction-request.ts:59](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/transaction-request.ts#L59)
