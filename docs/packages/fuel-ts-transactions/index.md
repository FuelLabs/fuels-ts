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
- [OutputMessageCoder](classes/OutputMessageCoder.md)
- [OutputVariableCoder](classes/OutputVariableCoder.md)
- [ReceiptCallCoder](classes/ReceiptCallCoder.md)
- [ReceiptCoder](classes/ReceiptCoder.md)
- [ReceiptLogCoder](classes/ReceiptLogCoder.md)
- [ReceiptLogDataCoder](classes/ReceiptLogDataCoder.md)
- [ReceiptMessageOutCoder](classes/ReceiptMessageOutCoder.md)
- [ReceiptPanicCoder](classes/ReceiptPanicCoder.md)
- [ReceiptReturnCoder](classes/ReceiptReturnCoder.md)
- [ReceiptReturnDataCoder](classes/ReceiptReturnDataCoder.md)
- [ReceiptRevertCoder](classes/ReceiptRevertCoder.md)
- [ReceiptScriptResultCoder](classes/ReceiptScriptResultCoder.md)
- [ReceiptTransferCoder](classes/ReceiptTransferCoder.md)
- [ReceiptTransferOutCoder](classes/ReceiptTransferOutCoder.md)
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

[packages/transactions/src/coders/input.ts:324](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L324)

___

### InputCoin

Ƭ **InputCoin**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) | Amount of coins (u64) |
| `assetId` | `string` | Asset ID of the coins (b256) |
| `maturity` | `number` | UTXO being spent must have been created at least this many blocks ago (u32) |
| `owner` | `string` | Owning address or script hash (b256) |
| `predicate` | `string` | Predicate bytecode (byte[]) |
| `predicateData` | `string` | Predicate input data (parameters) (byte[]) |
| `predicateDataLength` | `number` | Length of predicate input data, in bytes (u16) |
| `predicateLength` | `number` | Length of predicate, in instructions (u16) |
| `txPointer` | [`TxPointer`](index.md#txpointer) | Points to the TX whose output is being spent. (TxPointer) |
| `type` | [`Coin`](enums/InputType.md#coin) | - |
| `utxoID` | [`UtxoId`](index.md#utxoid) | UTXO ID (UtxoId) |
| `witnessIndex` | `number` | Index of witness that authorizes spending the coin (u8) |

#### Defined in

[packages/transactions/src/coders/input.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L20)

___

### InputContract

Ƭ **InputContract**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `balanceRoot` | `string` | Root of amount of coins owned by contract before transaction execution (b256) |
| `contractID` | `string` | Contract ID (b256) |
| `stateRoot` | `string` | State root of contract before transaction execution (b256) |
| `txPointer` | [`TxPointer`](index.md#txpointer) | Points to the TX whose output is being spent. (TxPointer) |
| `type` | [`Contract`](enums/InputType.md#contract) | - |
| `utxoID` | [`UtxoId`](index.md#utxoid) | UTXO ID (UtxoId) |

#### Defined in

[packages/transactions/src/coders/input.ts:131](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L131)

___

### InputMessage

Ƭ **InputMessage**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) | Amount of coins |
| `data` | `string` | data of message |
| `dataLength` | `number` | Length of predicate, in instructions (u16) |
| `nonce` | [`BN`](classes/internal-BN.md) | Unique nonce of message |
| `predicate` | `string` | Predicate bytecode (byte[]) |
| `predicateData` | `string` | Predicate input data (parameters) (byte[]) |
| `predicateDataLength` | `number` | Length of predicate input data, in bytes (u16) |
| `predicateLength` | `number` | Length of predicate, in instructions (u16) |
| `recipient` | `string` | Address of sender |
| `sender` | `string` | Address of sender |
| `type` | [`Message`](enums/InputType.md#message) | - |
| `witnessIndex` | `number` | Index of witness that authorizes message (u8) |

#### Defined in

[packages/transactions/src/coders/input.ts:196](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L196)

___

### Output

Ƭ **Output**: [`OutputCoin`](index.md#outputcoin) \| [`OutputContract`](index.md#outputcontract) \| [`OutputMessage`](index.md#outputmessage) \| [`OutputChange`](index.md#outputchange) \| [`OutputVariable`](index.md#outputvariable) \| [`OutputContractCreated`](index.md#outputcontractcreated)

#### Defined in

[packages/transactions/src/coders/output.ts:294](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L294)

___

### OutputChange

Ƭ **OutputChange**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) | Amount of coins to send (u64) |
| `assetId` | `string` | Asset ID of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Change`](enums/OutputType.md#change) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:153](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L153)

___

### OutputCoin

Ƭ **OutputCoin**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) | Amount of coins to send (u64) |
| `assetId` | `string` | Asset ID of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Coin`](enums/OutputType.md#coin) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L15)

___

### OutputContract

Ƭ **OutputContract**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `balanceRoot` | `string` | Root of amount of coins owned by contract after transaction execution (b256) |
| `inputIndex` | `number` | Index of input contract (u8) |
| `stateRoot` | `string` | State root of contract after transaction execution (b256) |
| `type` | [`Contract`](enums/OutputType.md#contract) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:63](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L63)

___

### OutputContractCreated

Ƭ **OutputContractCreated**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `string` | Contract ID (b256) |
| `stateRoot` | `string` | State root of contract (b256) |
| `type` | [`ContractCreated`](enums/OutputType.md#contractcreated) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:249](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L249)

___

### OutputMessage

Ƭ **OutputMessage**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) | Amount of coins to send with message (u64) |
| `recipient` | `string` | Receiving address (b256) |
| `type` | [`Message`](enums/OutputType.md#message) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:111](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L111)

___

### OutputVariable

Ƭ **OutputVariable**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) | Amount of coins to send (u64) |
| `assetId` | `string` | Asset ID of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Variable`](enums/OutputType.md#variable) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:201](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L201)

___

### Receipt

Ƭ **Receipt**: [`ReceiptCall`](index.md#receiptcall) \| [`ReceiptReturn`](index.md#receiptreturn) \| [`ReceiptReturnData`](index.md#receiptreturndata) \| [`ReceiptPanic`](index.md#receiptpanic) \| [`ReceiptRevert`](index.md#receiptrevert) \| [`ReceiptLog`](index.md#receiptlog) \| [`ReceiptLogData`](index.md#receiptlogdata) \| [`ReceiptTransfer`](index.md#receipttransfer) \| [`ReceiptTransferOut`](index.md#receipttransferout) \| [`ReceiptScriptResult`](index.md#receiptscriptresult) \| [`ReceiptMessageOut`](index.md#receiptmessageout)

#### Defined in

[packages/transactions/src/coders/receipt.ts:734](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L734)

___

### ReceiptCall

Ƭ **ReceiptCall**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) | Amount of coins to forward, i.e. $rB (u64) |
| `assetId` | `string` | Asset ID of coins to forward, i.e. MEM[$rC, 32] (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `gas` | [`BN`](classes/internal-BN.md) | Gas to forward, i.e. $rD (u64) |
| `is` | [`BN`](classes/internal-BN.md) | Value of register $is (u64) |
| `param1` | [`BN`](classes/internal-BN.md) | First parameter (u64) |
| `param2` | [`BN`](classes/internal-BN.md) | Second parameter (u64) |
| `pc` | [`BN`](classes/internal-BN.md) | Value of register $pc (u64) |
| `to` | `string` | Contract ID of called contract (b256) |
| `type` | [`Call`](enums/ReceiptType.md#call) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L23)

___

### ReceiptLog

Ƭ **ReceiptLog**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](classes/internal-BN.md) | Value of register $is (u64) |
| `pc` | [`BN`](classes/internal-BN.md) | Value of register $pc (u64) |
| `type` | [`Log`](enums/ReceiptType.md#log) | - |
| `val0` | [`BN`](classes/internal-BN.md) | Value of register $rA (u64) |
| `val1` | [`BN`](classes/internal-BN.md) | Value of register $rB (u64) |
| `val2` | [`BN`](classes/internal-BN.md) | Value of register $rC (u64) |
| `val3` | [`BN`](classes/internal-BN.md) | Value of register $rD (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:335](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L335)

___

### ReceiptLogData

Ƭ **ReceiptLogData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `digest` | `string` | Hash of MEM[$rC, $rD] (b256) |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](classes/internal-BN.md) | Value of register $is (u64) |
| `len` | [`BN`](classes/internal-BN.md) | Value of register $rD (u64) |
| `pc` | [`BN`](classes/internal-BN.md) | Value of register $pc (u64) |
| `ptr` | [`BN`](classes/internal-BN.md) | Value of register $rC (u64) |
| `type` | [`LogData`](enums/ReceiptType.md#logdata) | - |
| `val0` | [`BN`](classes/internal-BN.md) | Value of register $rA (u64) |
| `val1` | [`BN`](classes/internal-BN.md) | Value of register $rB (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:407](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L407)

___

### ReceiptMessageOut

Ƭ **ReceiptMessageOut**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) | Hexadecimal string representation of a 64-bit unsigned integer; value of register $rD |
| `data` | `Uint8Array` | Hexadecimal string representation of the value of the memory range MEM[$rA + 32, $rB] |
| `digest` | `string` | Hexadecimal string representation of 256-bit (32-byte), hash of MEM[$rA + 32, $rB] |
| `messageID` | `string` | Hexadecimal string representation of the 256-bit (32-byte) message ID |
| `nonce` | `string` | Hexadecimal string representation of the 256-bit (32-byte) message nonce |
| `recipient` | `string` | Hexadecimal string representation of the 256-bit (32-byte) address of the message recipient: MEM[$rA, 32] |
| `sender` | `string` | Hexadecimal string representation of the 256-bit (32-byte) address of the message sender: MEM[$fp, 32] |
| `type` | [`MessageOut`](enums/ReceiptType.md#messageout) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:659](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L659)

___

### ReceiptPanic

Ƭ **ReceiptPanic**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](classes/internal-BN.md) | Value of register $is (u64) |
| `pc` | [`BN`](classes/internal-BN.md) | Value of register $pc (u64) |
| `reason` | [`BN`](classes/internal-BN.md) | Panic reason (u64) |
| `type` | [`Panic`](enums/ReceiptType.md#panic) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:227](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L227)

___

### ReceiptReturn

Ƭ **ReceiptReturn**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](classes/internal-BN.md) | Value of register $is (u64) |
| `pc` | [`BN`](classes/internal-BN.md) | Value of register $pc (u64) |
| `type` | [`Return`](enums/ReceiptType.md#return) | - |
| `val` | [`BN`](classes/internal-BN.md) | Value of register $rA (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:107](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L107)

___

### ReceiptReturnData

Ƭ **ReceiptReturnData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `digest` | `string` | Hash of MEM[$rA, $rB] (b256) |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](classes/internal-BN.md) | Value of register $is (u64) |
| `len` | [`BN`](classes/internal-BN.md) | Value of register $rB (u64) |
| `pc` | [`BN`](classes/internal-BN.md) | Value of register $pc (u64) |
| `ptr` | [`BN`](classes/internal-BN.md) | Value of register $rA (u64) |
| `type` | [`ReturnData`](enums/ReceiptType.md#returndata) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:161](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L161)

___

### ReceiptRevert

Ƭ **ReceiptRevert**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](classes/internal-BN.md) | Value of register $is (u64) |
| `pc` | [`BN`](classes/internal-BN.md) | Value of register $pc (u64) |
| `type` | [`Revert`](enums/ReceiptType.md#revert) | - |
| `val` | [`BN`](classes/internal-BN.md) | Value of register $rA (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:281](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L281)

___

### ReceiptScriptResult

Ƭ **ReceiptScriptResult**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `gasUsed` | [`BN`](classes/internal-BN.md) | Gas consumed by the script (u64) |
| `result` | [`BN`](classes/internal-BN.md) | Result variant with embedded `PanicReason` in first 8 bits and `instr` (u64) |
| `type` | [`ScriptResult`](enums/ReceiptType.md#scriptresult) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:617](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L617)

___

### ReceiptTransfer

Ƭ **ReceiptTransfer**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) | Amount of coins transferred (u64) |
| `assetId` | `string` | Asset ID of coins transferred (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](classes/internal-BN.md) | Value of register $is (u64) |
| `pc` | [`BN`](classes/internal-BN.md) | Value of register $pc (u64) |
| `to` | `string` | Contract ID of contract to transfer coins to (b256) |
| `type` | [`Transfer`](enums/ReceiptType.md#transfer) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:485](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L485)

___

### ReceiptTransferOut

Ƭ **ReceiptTransferOut**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](classes/internal-BN.md) | Amount of coins transferred (u64) |
| `assetId` | `string` | Asset ID of coins transferred (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](classes/internal-BN.md) | Value of register $is (u64) |
| `pc` | [`BN`](classes/internal-BN.md) | Value of register $pc (u64) |
| `to` | `string` | Address to transfer coins to (b256) |
| `type` | [`TransferOut`](enums/ReceiptType.md#transferout) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:551](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L551)

___

### StorageSlot

Ƭ **StorageSlot**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key (b256) |
| `value` | `string` | Value (b256) |

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytecodeLength` | `number` | Contract bytecode length, in instructions (u16) |
| `bytecodeWitnessIndex` | `number` | Witness index of contract bytecode to create (u8) |
| `gasLimit` | [`BN`](classes/internal-BN.md) | Gas limit for transaction (u64) |
| `gasPrice` | [`BN`](classes/internal-BN.md) | Gas price for transaction (u64) |
| `inputs` | [`Input`](index.md#input)[] | List of inputs (Input[]) |
| `inputsCount` | `number` | Number of inputs (u8) |
| `maturity` | `number` | Block until which tx cannot be included (u32) |
| `outputs` | [`Output`](index.md#output)[] | List of outputs (Output[]) |
| `outputsCount` | `number` | Number of outputs (u8) |
| `salt` | `string` | Salt (b256) |
| `storageSlots` | [`StorageSlot`](index.md#storageslot)[] | List of inputs (StorageSlot[]) |
| `storageSlotsCount` | `number` | Number of storage slots to initialize (u16) |
| `type` | [`Create`](enums/TransactionType.md#create) | - |
| `witnesses` | [`Witness`](index.md#witness)[] | List of witnesses (Witness[]) |
| `witnessesCount` | `number` | Number of witnesses (u8) |

#### Defined in

[packages/transactions/src/coders/transaction.ts:156](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L156)

___

### TransactionScript

Ƭ **TransactionScript**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `gasLimit` | [`BN`](classes/internal-BN.md) | Gas limit for transaction (u64) |
| `gasPrice` | [`BN`](classes/internal-BN.md) | Gas price for transaction (u64) |
| `inputs` | [`Input`](index.md#input)[] | List of inputs (Input[]) |
| `inputsCount` | `number` | Number of inputs (u8) |
| `maturity` | `number` | Block until which tx cannot be included (u32) |
| `outputs` | [`Output`](index.md#output)[] | List of outputs (Output[]) |
| `outputsCount` | `number` | Number of outputs (u8) |
| `receiptsRoot` | `string` | Merkle root of receipts (b256) |
| `script` | `string` | Script to execute (byte[]) |
| `scriptData` | `string` | Script input data (parameters) (byte[]) |
| `scriptDataLength` | `number` | Length of script input data, in bytes (u16) |
| `scriptLength` | `number` | Script length, in instructions (u16) |
| `type` | [`Script`](enums/TransactionType.md#script) | - |
| `witnesses` | [`Witness`](index.md#witness)[] | List of witnesses (Witness[]) |
| `witnessesCount` | `number` | Number of witnesses (u8) |

#### Defined in

[packages/transactions/src/coders/transaction.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L22)

___

### TxPointer

Ƭ **TxPointer**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockHeight` | `number` | Block height (u32) |
| `txIndex` | `number` | Transaction index (u16) |

#### Defined in

[packages/transactions/src/coders/tx-pointer.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/tx-pointer.ts#L3)

___

### UtxoId

Ƭ **UtxoId**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputIndex` | `number` | Output index (u8) |
| `transactionId` | `string` | Transaction ID (b256) |

#### Defined in

[packages/transactions/src/coders/utxo-id.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/utxo-id.ts#L3)

___

### Witness

Ƭ **Witness**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | Witness data (byte[]) |
| `dataLength` | `number` | Length of witness data, in bytes (u32) |

#### Defined in

[packages/transactions/src/coders/witness.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/witness.ts#L6)

## Variables

### CONTRACT\_MAX\_SIZE

• `Const` **CONTRACT\_MAX\_SIZE**: `number`

Maximum contract size, in bytes.

#### Defined in

[packages/transactions/src/consts.ts:4](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L4)

___

### FAILED\_TRANSFER\_TO\_ADDRESS\_SIGNAL

• `Const` **FAILED\_TRANSFER\_TO\_ADDRESS\_SIGNAL**: ``"0xffffffffffff0001"``

#### Defined in

[packages/transactions/src/consts.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L41)

___

### GAS\_PER\_BYTE

• `Const` **GAS\_PER\_BYTE**: [`BN`](classes/internal-BN.md)

Gas charged per byte of the transaction.

#### Defined in

[packages/transactions/src/consts.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L20)

___

### GAS\_PRICE\_FACTOR

• `Const` **GAS\_PRICE\_FACTOR**: [`BN`](classes/internal-BN.md)

Gas Price factor this is used to calculate
This is used to calculate the gas fee in Native Coins.
Ex.: transactionFee = Math.ceil(<gasUsed> / MAX_GAS_PER_TX);

#### Defined in

[packages/transactions/src/consts.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L17)

___

### MAX\_GAS\_PER\_TX

• `Const` **MAX\_GAS\_PER\_TX**: [`BN`](classes/internal-BN.md)

Maximum gas per transaction.

#### Defined in

[packages/transactions/src/consts.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L10)

___

### MAX\_PREDICATE\_DATA\_LENGTH

• `Const` **MAX\_PREDICATE\_DATA\_LENGTH**: `number`

Maximum length of predicate data, in bytes.

#### Defined in

[packages/transactions/src/consts.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L39)

___

### MAX\_PREDICATE\_LENGTH

• `Const` **MAX\_PREDICATE\_LENGTH**: `number`

Maximum length of predicate, in instructions.

#### Defined in

[packages/transactions/src/consts.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L35)

___

### MAX\_SCRIPT\_DATA\_LENGTH

• `Const` **MAX\_SCRIPT\_DATA\_LENGTH**: `number`

Maximum length of script data, in bytes.

#### Defined in

[packages/transactions/src/consts.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L28)

___

### MAX\_SCRIPT\_LENGTH

• `Const` **MAX\_SCRIPT\_LENGTH**: `number`

Maximum length of script, in instructions.

#### Defined in

[packages/transactions/src/consts.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L24)

___

### MAX\_STATIC\_CONTRACTS

• `Const` **MAX\_STATIC\_CONTRACTS**: ``255``

Maximum number of static contracts.

#### Defined in

[packages/transactions/src/consts.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L31)

___

### MAX\_WITNESSES

• `Const` **MAX\_WITNESSES**: ``16``

Maximum number of witnesses.

#### Defined in

[packages/transactions/src/consts.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L7)
