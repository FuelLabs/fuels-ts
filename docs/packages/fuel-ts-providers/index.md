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

[providers/src/provider.ts:78](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L78)

___

### CallResult

Ƭ **CallResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] |

#### Defined in

[providers/src/provider.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L42)

___

### Coin

Ƭ **Coin**: `Object`

A Fuel coin

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BigNumber` |
| `assetId` | `string` |
| `blockCreated` | `BigNumber` |
| `id` | `string` |
| `maturity` | `BigNumber` |
| `owner` | `string` |
| `status` | [`CoinStatus`](enums/CoinStatus.md) |

#### Defined in

[providers/src/provider.ts:89](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L89)

___

### CreateTransactionRequest

Ƭ **CreateTransactionRequest**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytePrice` | `BigNumberish` | Price per transaction byte |
| `bytecodeWitnessIndex` | `BigNumberish` | Witness index of contract bytecode to create |
| `gasLimit` | `BigNumberish` | Gas limit for transaction |
| `gasPrice` | `BigNumberish` | Gas price for transaction |
| `inputs?` | [`TransactionRequestInput`](index.md#transactionrequestinput)[] | List of inputs |
| `maturity?` | `BigNumberish` | Block until which tx cannot be included |
| `outputs?` | [`TransactionRequestOutput`](index.md#transactionrequestoutput)[] | List of outputs |
| `salt` | `BytesLike` | Salt |
| `staticContracts?` | `BytesLike`[] | List of static contracts |
| `storageSlots?` | [`TransactionRequestStorageSlot`](namespaces/internal.md#transactionrequeststorageslot)[] | List of storage slots to initialize |
| `type` | [`Create`](enums/TransactionType.md#create) | - |
| `witnesses?` | [`TransactionRequestWitness`](namespaces/internal.md#transactionrequestwitness)[] | List of witnesses |

#### Defined in

[providers/src/transaction-request/transaction-request.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L40)

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

[providers/src/provider.ts:126](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L126)

___

### ScriptTransactionRequest

Ƭ **ScriptTransactionRequest**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytePrice` | `BigNumberish` | Price per transaction byte |
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

[providers/src/transaction-request/transaction-request.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L19)

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](index.md#scripttransactionrequest) \| [`CreateTransactionRequest`](index.md#createtransactionrequest)

#### Defined in

[providers/src/transaction-request/transaction-request.ts:65](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L65)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](namespaces/internal.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](namespaces/internal.md#contracttransactionrequestinput)

#### Defined in

[providers/src/transaction-request/input.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L32)

___

### TransactionRequestOutput

Ƭ **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](namespaces/internal.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](namespaces/internal.md#contracttransactionrequestoutput) \| [`WithdrawalTransactionRequestOutput`](namespaces/internal.md#withdrawaltransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](namespaces/internal.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](namespaces/internal.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](namespaces/internal.md#contractcreatedtransactionrequestoutput)

#### Defined in

[providers/src/transaction-request/output.ts:48](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L48)

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

[providers/src/provider.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L66)

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

[providers/src/provider.ts:58](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L58)

___

### TransactionResultReceipt

Ƭ **TransactionResultReceipt**: [`ReceiptCall`](../fuel-ts-transactions/index.md#receiptcall) \| [`ReceiptReturn`](../fuel-ts-transactions/index.md#receiptreturn) \| [`ReceiptReturnData`](../fuel-ts-transactions/index.md#receiptreturndata) & { `data`: `string`  } \| [`ReceiptPanic`](../fuel-ts-transactions/index.md#receiptpanic) \| [`ReceiptRevert`](../fuel-ts-transactions/index.md#receiptrevert) \| [`ReceiptLog`](../fuel-ts-transactions/index.md#receiptlog) \| [`ReceiptLogData`](../fuel-ts-transactions/index.md#receiptlogdata) & { `data`: `string`  } \| [`ReceiptTransfer`](../fuel-ts-transactions/index.md#receipttransfer) \| [`ReceiptTransferOut`](../fuel-ts-transactions/index.md#receipttransferout) \| [`ReceiptScriptResult`](../fuel-ts-transactions/index.md#receiptscriptresult)

#### Defined in

[providers/src/provider.ts:46](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L46)

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

[providers/src/util.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L44)

___

### getContractId

▸ `Const` **getContractId**(`bytecode`, `salt`, `stateRoot`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytecode` | `BytesLike` |
| `salt` | `BytesLike` |
| `stateRoot` | `BytesLike` |

#### Returns

`string`

#### Defined in

[providers/src/util.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L34)

___

### getContractStorageRoot

▸ `Const` **getContractStorageRoot**(`storageSlots`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `storageSlots` | [`Uint8Array`, `Uint8Array`][] |

#### Returns

`string`

#### Defined in

[providers/src/util.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L21)

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

[providers/src/util.ts:51](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L51)

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

[providers/src/util.ts:114](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L114)

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

[providers/src/transaction-request/input.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L34)

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

[providers/src/transaction-request/output.ts:56](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L56)

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

[providers/src/transaction-request/transaction-request.ts:67](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L67)
