---
layout: default
title: "@fuel-ts/transactions"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/transactions

## Namespaces

- [internal](namespaces/internal.md)

## Enumerations

- [InputType](enums/InputType.md)
- [OutputType](enums/OutputType.md)
- [ReceiptType](enums/ReceiptType.md)
- [TransactionType](enums/TransactionType.md)

## Classes

- [ByteArrayCoder](classes/ByteArrayCoder.md)
- [InputCoder](classes/InputCoder.md)
- [InputCoinCoder](classes/InputCoinCoder.md)
- [InputContractCoder](classes/InputContractCoder.md)
- [InputMessageCoder](classes/InputMessageCoder.md)
- [OutputChangeCoder](classes/OutputChangeCoder.md)
- [OutputCoder](classes/OutputCoder.md)
- [OutputCoinCoder](classes/OutputCoinCoder.md)
- [OutputContractCoder](classes/OutputContractCoder.md)
- [OutputContractCreatedCoder](classes/OutputContractCreatedCoder.md)
- [OutputVariableCoder](classes/OutputVariableCoder.md)
- [OutputMessageCoder](classes/OutputMessageCoder.md)
- [ReceiptCallCoder](classes/ReceiptCallCoder.md)
- [ReceiptCoder](classes/ReceiptCoder.md)
- [ReceiptLogCoder](classes/ReceiptLogCoder.md)
- [ReceiptLogDataCoder](classes/ReceiptLogDataCoder.md)
- [ReceiptPanicCoder](classes/ReceiptPanicCoder.md)
- [ReceiptReturnCoder](classes/ReceiptReturnCoder.md)
- [ReceiptReturnDataCoder](classes/ReceiptReturnDataCoder.md)
- [ReceiptRevertCoder](classes/ReceiptRevertCoder.md)
- [ReceiptScriptResultCoder](classes/ReceiptScriptResultCoder.md)
- [ReceiptTransferCoder](classes/ReceiptTransferCoder.md)
- [ReceiptTransferOutCoder](classes/ReceiptTransferOutCoder.md)
- [ReceiptMessageOutCoder](classes/ReceiptMessageOutCoder.md)
- [StorageSlotCoder](classes/StorageSlotCoder.md)
- [TransactionCoder](classes/TransactionCoder.md)
- [TransactionCreateCoder](classes/TransactionCreateCoder.md)
- [TransactionScriptCoder](classes/TransactionScriptCoder.md)
- [TxPointerCoder](classes/TxPointerCoder.md)
- [UtxoIdCoder](classes/UtxoIdCoder.md)
- [WitnessCoder](classes/WitnessCoder.md)

## Type Aliases

### Input

Ƭ **Input**: [`InputCoin`](index.md#inputcoin) \| [`InputContract`](index.md#inputcontract) \| [`InputMessage`](index.md#inputmessage)

#### Defined in

[packages/transactions/src/coders/input.ts:327](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L327)

___

### InputCoin

Ƭ **InputCoin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `assetId` | `string` |
| `maturity` | `number` |
| `owner` | `string` |
| `predicate` | `string` |
| `predicateData` | `string` |
| `predicateDataLength` | `number` |
| `predicateLength` | `number` |
| `txPointer` | [`TxPointer`](index.md#txpointer) |
| `type` | [`Coin`](enums/InputType.md#coin) |
| `utxoID` | [`UtxoId`](index.md#utxoid) |
| `witnessIndex` | `number` |

#### Defined in

[packages/transactions/src/coders/input.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L19)

___

### InputContract

Ƭ **InputContract**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `balanceRoot` | `string` |
| `contractID` | `string` |
| `stateRoot` | `string` |
| `txPointer` | [`TxPointer`](index.md#txpointer) |
| `type` | [`Contract`](enums/InputType.md#contract) |
| `utxoID` | [`UtxoId`](index.md#utxoid) |

#### Defined in

[packages/transactions/src/coders/input.ts:130](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L130)

___

### InputMessage

Ƭ **InputMessage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `data` | `number`[] |
| `dataLength` | `number` |
| `nonce` | [`BN`](classes/internal-BN.md) |
| `predicate` | `string` |
| `predicateData` | `string` |
| `predicateDataLength` | `number` |
| `predicateLength` | `number` |
| `recipient` | `string` |
| `sender` | `string` |
| `type` | [`Message`](enums/InputType.md#message) |
| `witnessIndex` | `number` |

#### Defined in

[packages/transactions/src/coders/input.ts:195](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L195)

___

### Output

Ƭ **Output**: [`OutputCoin`](index.md#outputcoin) \| [`OutputContract`](index.md#outputcontract) \| [`OutputMessage`](index.md#outputmessage) \| [`OutputChange`](index.md#outputchange) \| [`OutputVariable`](index.md#outputvariable) \| [`OutputContractCreated`](index.md#outputcontractcreated)

#### Defined in

[packages/transactions/src/coders/output.ts:300](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L300)

___

### OutputChange

Ƭ **OutputChange**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `assetId` | `string` |
| `to` | `string` |
| `type` | [`Change`](enums/OutputType.md#change) |

#### Defined in

[packages/transactions/src/coders/output.ts:159](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L159)

___

### OutputCoin

Ƭ **OutputCoin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `assetId` | `string` |
| `to` | `string` |
| `type` | [`Coin`](enums/OutputType.md#coin) |

#### Defined in

[packages/transactions/src/coders/output.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L15)

___

### OutputContract

Ƭ **OutputContract**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `balanceRoot` | `string` |
| `inputIndex` | `number` |
| `stateRoot` | `string` |
| `type` | [`Contract`](enums/OutputType.md#contract) |

#### Defined in

[packages/transactions/src/coders/output.ts:63](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L63)

___

### OutputContractCreated

Ƭ **OutputContractCreated**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractId` | `string` |
| `stateRoot` | `string` |
| `type` | [`ContractCreated`](enums/OutputType.md#contractcreated) |

#### Defined in

[packages/transactions/src/coders/output.ts:255](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L255)

___

### OutputVariable

Ƭ **OutputVariable**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `assetId` | `string` |
| `to` | `string` |
| `type` | [`Variable`](enums/OutputType.md#variable) |

#### Defined in

[packages/transactions/src/coders/output.ts:207](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L207)

___

### OutputMessage

Ƭ **OutputMessage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `recipient` | `string` |
| `type` | [`Message`](enums/OutputType.md#message) |

#### Defined in

[packages/transactions/src/coders/output.ts:111](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L111)

___

### Receipt

Ƭ **Receipt**: [`ReceiptCall`](index.md#receiptcall) \| [`ReceiptReturn`](index.md#receiptreturn) \| [`ReceiptReturnData`](index.md#receiptreturndata) \| [`ReceiptPanic`](index.md#receiptpanic) \| [`ReceiptRevert`](index.md#receiptrevert) \| [`ReceiptLog`](index.md#receiptlog) \| [`ReceiptLogData`](index.md#receiptlogdata) \| [`ReceiptTransfer`](index.md#receipttransfer) \| [`ReceiptTransferOut`](index.md#receipttransferout) \| [`ReceiptScriptResult`](index.md#receiptscriptresult) \| [`ReceiptMessageOut`](index.md#receiptmessageout)

#### Defined in

[packages/transactions/src/coders/receipt.ts:656](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L656)

___

### ReceiptCall

Ƭ **ReceiptCall**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `assetId` | `string` |
| `from` | `string` |
| `gas` | [`BN`](classes/internal-BN.md) |
| `is` | [`BN`](classes/internal-BN.md) |
| `param1` | [`BN`](classes/internal-BN.md) |
| `param2` | [`BN`](classes/internal-BN.md) |
| `pc` | [`BN`](classes/internal-BN.md) |
| `to` | `string` |
| `type` | [`Call`](enums/ReceiptType.md#call) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L20)

___

### ReceiptLog

Ƭ **ReceiptLog**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `is` | [`BN`](classes/internal-BN.md) |
| `pc` | [`BN`](classes/internal-BN.md) |
| `type` | [`Log`](enums/ReceiptType.md#log) |
| `val0` | [`BN`](classes/internal-BN.md) |
| `val1` | [`BN`](classes/internal-BN.md) |
| `val2` | [`BN`](classes/internal-BN.md) |
| `val3` | [`BN`](classes/internal-BN.md) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:332](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L332)

___

### ReceiptLogData

Ƭ **ReceiptLogData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `digest` | `string` |
| `id` | `string` |
| `is` | [`BN`](classes/internal-BN.md) |
| `len` | [`BN`](classes/internal-BN.md) |
| `pc` | [`BN`](classes/internal-BN.md) |
| `ptr` | [`BN`](classes/internal-BN.md) |
| `type` | [`LogData`](enums/ReceiptType.md#logdata) |
| `val0` | [`BN`](classes/internal-BN.md) |
| `val1` | [`BN`](classes/internal-BN.md) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:404](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L404)

___

### ReceiptPanic

Ƭ **ReceiptPanic**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `is` | [`BN`](classes/internal-BN.md) |
| `pc` | [`BN`](classes/internal-BN.md) |
| `reason` | [`BN`](classes/internal-BN.md) |
| `type` | [`Panic`](enums/ReceiptType.md#panic) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:224](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L224)

___

### ReceiptReturn

Ƭ **ReceiptReturn**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `is` | [`BN`](classes/internal-BN.md) |
| `pc` | [`BN`](classes/internal-BN.md) |
| `type` | [`Return`](enums/ReceiptType.md#return) |
| `val` | [`BN`](classes/internal-BN.md) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:104](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L104)

___

### ReceiptReturnData

Ƭ **ReceiptReturnData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `digest` | `string` |
| `id` | `string` |
| `is` | [`BN`](classes/internal-BN.md) |
| `len` | [`BN`](classes/internal-BN.md) |
| `pc` | [`BN`](classes/internal-BN.md) |
| `ptr` | [`BN`](classes/internal-BN.md) |
| `type` | [`ReturnData`](enums/ReceiptType.md#returndata) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:158](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L158)

___

### ReceiptRevert

Ƭ **ReceiptRevert**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `is` | [`BN`](classes/internal-BN.md) |
| `pc` | [`BN`](classes/internal-BN.md) |
| `type` | [`Revert`](enums/ReceiptType.md#revert) |
| `val` | [`BN`](classes/internal-BN.md) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:278](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L278)

___

### ReceiptScriptResult

Ƭ **ReceiptScriptResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `gasUsed` | [`BN`](classes/internal-BN.md) |
| `result` | [`BN`](classes/internal-BN.md) |
| `type` | [`ScriptResult`](enums/ReceiptType.md#scriptresult) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:614](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L614)

___

### ReceiptTransfer

Ƭ **ReceiptTransfer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `assetId` | `string` |
| `from` | `string` |
| `is` | [`BN`](classes/internal-BN.md) |
| `pc` | [`BN`](classes/internal-BN.md) |
| `to` | `string` |
| `type` | [`Transfer`](enums/ReceiptType.md#transfer) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:482](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L482)

___

### ReceiptTransferOut

Ƭ **ReceiptTransferOut**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) |
| `assetId` | `string` |
| `from` | `string` |
| `is` | [`BN`](classes/internal-BN.md) |
| `pc` | [`BN`](classes/internal-BN.md) |
| `to` | `string` |
| `type` | [`TransferOut`](enums/ReceiptType.md#transferout) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:548](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L548)

___

### ReceiptMessageOut

Ƭ **ReceiptMessageOut**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `messageID` | `string` |
| `sender` | `string` |
| `recipient` | `string` |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `nonce` | `string` |
| `digest` | `string` |
| `data` | `Uint8Array` |
| `type` | [`MessageOut`](internal.md#messageout) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:548](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L548)

___

### StorageSlot

Ƭ **StorageSlot**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Defined in

[packages/transactions/src/coders/storage-slot.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/storage-slot.ts#L3)

___

### Transaction

Ƭ **Transaction**: [`TransactionScript`](index.md#transactionscript) \| [`TransactionCreate`](index.md#transactioncreate)

#### Defined in

[packages/transactions/src/coders/transaction.ts:294](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L294)

___

### TransactionCreate

Ƭ **TransactionCreate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bytecodeLength` | `number` |
| `bytecodeWitnessIndex` | `number` |
| `gasLimit` | [`BN`](classes/internal-BN.md) |
| `gasPrice` | [`BN`](classes/internal-BN.md) |
| `inputs` | [`Input`](index.md#input)[] |
| `inputsCount` | `number` |
| `maturity` | `number` |
| `outputs` | [`Output`](index.md#output)[] |
| `outputsCount` | `number` |
| `salt` | `string` |
| `storageSlots` | [`StorageSlot`](index.md#storageslot)[] |
| `storageSlotsCount` | `number` |
| `type` | [`Create`](enums/TransactionType.md#create) |
| `witnesses` | [`Witness`](index.md#witness)[] |
| `witnessesCount` | `number` |

#### Defined in

[packages/transactions/src/coders/transaction.ts:156](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L156)

___

### TransactionScript

Ƭ **TransactionScript**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `gasLimit` | [`BN`](classes/internal-BN.md) |
| `gasPrice` | [`BN`](classes/internal-BN.md) |
| `inputs` | [`Input`](index.md#input)[] |
| `inputsCount` | `number` |
| `maturity` | `number` |
| `outputs` | [`Output`](index.md#output)[] |
| `outputsCount` | `number` |
| `receiptsRoot` | `string` |
| `script` | `string` |
| `scriptData` | `string` |
| `scriptDataLength` | `number` |
| `scriptLength` | `number` |
| `type` | [`Script`](enums/TransactionType.md#script) |
| `witnesses` | [`Witness`](index.md#witness)[] |
| `witnessesCount` | `number` |

#### Defined in

[packages/transactions/src/coders/transaction.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L22)

___

### TxPointer

Ƭ **TxPointer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blockHeight` | `number` |
| `txIndex` | `number` |

#### Defined in

[packages/transactions/src/coders/tx-pointer.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/tx-pointer.ts#L3)

___

### UtxoId

Ƭ **UtxoId**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `outputIndex` | `number` |
| `transactionId` | `string` |

#### Defined in

[packages/transactions/src/coders/utxo-id.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/utxo-id.ts#L3)

___

### Witness

Ƭ **Witness**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `dataLength` | `number` |

#### Defined in

[packages/transactions/src/coders/witness.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/witness.ts#L6)

## Variables

### CONTRACT\_MAX\_SIZE

• `Const` **CONTRACT\_MAX\_SIZE**: `number`

#### Defined in

[packages/transactions/src/consts.ts:4](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L4)

___

### GAS\_PER\_BYTE

• `Const` **GAS\_PER\_BYTE**: [`BN`](classes/internal-BN.md)

#### Defined in

[packages/transactions/src/consts.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L20)

___

### GAS\_PRICE\_FACTOR

• `Const` **GAS\_PRICE\_FACTOR**: [`BN`](classes/internal-BN.md)

#### Defined in

[packages/transactions/src/consts.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L17)

___

### MAX\_GAS\_PER\_TX

• `Const` **MAX\_GAS\_PER\_TX**: [`BN`](classes/internal-BN.md)

#### Defined in

[packages/transactions/src/consts.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L10)

___

### MAX\_PREDICATE\_DATA\_LENGTH

• `Const` **MAX\_PREDICATE\_DATA\_LENGTH**: `number`

#### Defined in

[packages/transactions/src/consts.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L39)

___

### MAX\_PREDICATE\_LENGTH

• `Const` **MAX\_PREDICATE\_LENGTH**: `number`

#### Defined in

[packages/transactions/src/consts.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L35)

___

### MAX\_SCRIPT\_DATA\_LENGTH

• `Const` **MAX\_SCRIPT\_DATA\_LENGTH**: `number`

#### Defined in

[packages/transactions/src/consts.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L28)

___

### MAX\_SCRIPT\_LENGTH

• `Const` **MAX\_SCRIPT\_LENGTH**: `number`

#### Defined in

[packages/transactions/src/consts.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L24)

___

### MAX\_STATIC\_CONTRACTS

• `Const` **MAX\_STATIC\_CONTRACTS**: ``255``

#### Defined in

[packages/transactions/src/consts.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L31)

___

### MAX\_WITNESSES

• `Const` **MAX\_WITNESSES**: ``16``

#### Defined in

[packages/transactions/src/consts.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L7)
