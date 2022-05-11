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
- [Script](classes/Script.md)
- [ScriptTransactionRequest](classes/ScriptTransactionRequest.md)

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
| `height` | `BigNumber` |
| `id` | `string` |
| `producer` | `string` |
| `time` | `string` |
| `transactionIds` | `string`[] |

#### Defined in

[packages/providers/src/provider.ts:67](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L67)

___

### CallResult

Ƭ **CallResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](index.md#transactionresultreceipt)[] |

#### Defined in

[packages/providers/src/provider.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L31)

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

[packages/providers/src/transaction-request/output.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L32)

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

[packages/providers/src/coin.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin.ts#L8)

___

### CoinQuantity

Ƭ **CoinQuantity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BigNumber` |
| `assetId` | `string` |

#### Defined in

[packages/providers/src/coin-quantity.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin-quantity.ts#L10)

___

### CoinQuantityLike

Ƭ **CoinQuantityLike**: [amount: BigNumberish, assetId?: BytesLike] \| { `amount`: `BigNumberish` ; `assetId?`: `BytesLike`  }

#### Defined in

[packages/providers/src/coin-quantity.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin-quantity.ts#L7)

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

[packages/providers/src/transaction-request/input.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L9)

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

[packages/providers/src/transaction-request/output.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L9)

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

[packages/providers/src/provider.ts:78](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L78)

___

### ContractTransactionRequestInput

Ƭ **ContractTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `type` | [`Contract`](../fuel-ts-contract/classes/Contract.md) | - |

#### Defined in

[packages/providers/src/transaction-request/input.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L28)

___

### ContractTransactionRequestOutput

Ƭ **ContractTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputIndex` | `BigNumberish` | Index of input contract |
| `type` | [`Contract`](../fuel-ts-contract/classes/Contract.md) | - |

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

[packages/providers/src/provider.ts:109](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L109)

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](classes/ScriptTransactionRequest.md) \| [`CreateTransactionRequest`](classes/CreateTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:474](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L474)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](index.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](index.md#contracttransactionrequestinput)

#### Defined in

[packages/providers/src/transaction-request/input.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L33)

___

### TransactionRequestLike

Ƭ **TransactionRequestLike**: { `type`: [`Script`](classes/Script.md)  } & [`ScriptTransactionRequestLike`](interfaces/ScriptTransactionRequestLike.md) \| { `type`: `TransactionType.Create`  } & [`CreateTransactionRequestLike`](interfaces/CreateTransactionRequestLike.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:475](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L475)

___

### TransactionRequestOutput

Ƭ **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](index.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](index.md#contracttransactionrequestoutput) \| [`WithdrawalTransactionRequestOutput`](index.md#withdrawaltransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](index.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](index.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](index.md#contractcreatedtransactionrequestoutput)

#### Defined in

[packages/providers/src/transaction-request/output.ts:49](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L49)

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

[packages/providers/src/provider.ts:55](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L55)

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

[packages/providers/src/provider.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L47)

___

### TransactionResultReceipt

Ƭ **TransactionResultReceipt**: `ReceiptCall` \| `ReceiptReturn` \| `ReceiptReturnData` & { `data`: `string`  } \| `ReceiptPanic` \| `ReceiptRevert` \| `ReceiptLog` \| `ReceiptLogData` & { `data`: `string`  } \| `ReceiptTransfer` \| `ReceiptTransferOut` \| `ReceiptScriptResult`

#### Defined in

[packages/providers/src/provider.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L35)

___

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `OutputType.Variable` |

#### Defined in

[packages/providers/src/transaction-request/output.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L39)

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

[packages/providers/src/transaction-request/output.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L23)

## Variables

### returnZeroScript

• `Const` **returnZeroScript**: [`Script`](classes/Script.md)<`void`, `undefined`\>

A script that just returns zero

Accepts nothing
Returns nothing

Used for coin transfer transactions

#### Defined in

[packages/providers/src/scripts.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/scripts.ts#L11)

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

[packages/providers/src/coin-quantity.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin-quantity.ts#L12)

___

### getCoinUtxoId

▸ **getCoinUtxoId**(`transactionId`, `outputIndex`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionId` | `BytesLike` |
| `outputIndex` | `BigNumberish` |

#### Returns

`string`

#### Defined in

[packages/providers/src/util.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L10)

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

[packages/providers/src/util.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L17)

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

[packages/providers/src/util.ts:79](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/util.ts#L79)

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

[packages/providers/src/transaction-request/input.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L35)

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

[packages/providers/src/transaction-request/transaction-request.ts:479](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L479)
