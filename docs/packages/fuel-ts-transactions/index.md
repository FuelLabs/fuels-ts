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

- [InputCoder](classes/InputCoder.md)
- [InputCoinCoder](classes/InputCoinCoder.md)
- [InputContractCoder](classes/InputContractCoder.md)
- [OutputChangeCoder](classes/OutputChangeCoder.md)
- [OutputCoder](classes/OutputCoder.md)
- [OutputCoinCoder](classes/OutputCoinCoder.md)
- [OutputContractCoder](classes/OutputContractCoder.md)
- [OutputContractCreatedCoder](classes/OutputContractCreatedCoder.md)
- [OutputVariableCoder](classes/OutputVariableCoder.md)
- [OutputWithdrawalCoder](classes/OutputWithdrawalCoder.md)
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
- [StorageSlotCoder](classes/StorageSlotCoder.md)
- [TransactionCoder](classes/TransactionCoder.md)
- [TransactionCreateCoder](classes/TransactionCreateCoder.md)
- [TransactionScriptCoder](classes/TransactionScriptCoder.md)
- [UtxoIdCoder](classes/UtxoIdCoder.md)
- [WitnessCoder](classes/WitnessCoder.md)

## Type Aliases

### Input

Ƭ **Input**: [`InputCoin`](index.md#inputcoin) \| [`InputContract`](index.md#inputcontract)

#### Defined in

[packages/transactions/src/coders/input.ts:163](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L163)

___

### InputCoin

Ƭ **InputCoin**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `bigint` | Amount of coins (u64) |
| `assetId` | `string` | Asset ID of the coins (b256) |
| `maturity` | `bigint` | UTXO being spent must have been created at least this many blocks ago (u64) |
| `owner` | `string` | Owning address or script hash (b256) |
| `predicate` | `string` | Predicate bytecode (byte[]) |
| `predicateData` | `string` | Predicate input data (parameters) (byte[]) |
| `predicateDataLength` | `number` | Length of predicate input data, in bytes (u16) |
| `predicateLength` | `number` | Length of predicate, in instructions (u16) |
| `type` | [`Coin`](enums/InputType.md#coin) | - |
| `utxoID` | [`UtxoId`](index.md#utxoid) | UTXO ID (UtxoId) |
| `witnessIndex` | `number` | Index of witness that authorizes spending the coin (u8) |

#### Defined in

[packages/transactions/src/coders/input.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L15)

___

### InputContract

Ƭ **InputContract**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `balanceRoot` | `string` | Root of amount of coins owned by contract before transaction execution (b256) |
| `contractID` | `string` | Contract ID (b256) |
| `stateRoot` | `string` | State root of contract before transaction execution (b256) |
| `type` | [`Contract`](enums/InputType.md#contract) | - |
| `utxoID` | [`UtxoId`](index.md#utxoid) | UTXO ID (UtxoId) |

#### Defined in

[packages/transactions/src/coders/input.ts:109](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L109)

___

### Output

Ƭ **Output**: [`OutputCoin`](index.md#outputcoin) \| [`OutputContract`](index.md#outputcontract) \| [`OutputWithdrawal`](index.md#outputwithdrawal) \| [`OutputChange`](index.md#outputchange) \| [`OutputVariable`](index.md#outputvariable) \| [`OutputContractCreated`](index.md#outputcontractcreated)

#### Defined in

[packages/transactions/src/coders/output.ts:299](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L299)

___

### OutputChange

Ƭ **OutputChange**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `bigint` | Amount of coins to send (u64) |
| `assetId` | `string` | Asset ID of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Change`](enums/OutputType.md#change) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:158](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L158)

___

### OutputCoin

Ƭ **OutputCoin**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `bigint` | Amount of coins to send (u64) |
| `assetId` | `string` | Asset ID of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Coin`](enums/OutputType.md#coin) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L14)

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

[packages/transactions/src/coders/output.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L62)

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

[packages/transactions/src/coders/output.ts:254](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L254)

___

### OutputVariable

Ƭ **OutputVariable**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `bigint` | Amount of coins to send (u64) |
| `assetId` | `string` | Asset ID of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Variable`](enums/OutputType.md#variable) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:206](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L206)

___

### OutputWithdrawal

Ƭ **OutputWithdrawal**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `bigint` | Amount of coins to withdraw (u64) |
| `assetId` | `string` | Asset ID of coins (b256) |
| `to` | `string` | Receiving address (b256) |
| `type` | [`Withdrawal`](enums/OutputType.md#withdrawal) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:110](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L110)

___

### Receipt

Ƭ **Receipt**: [`ReceiptCall`](index.md#receiptcall) \| [`ReceiptReturn`](index.md#receiptreturn) \| [`ReceiptReturnData`](index.md#receiptreturndata) \| [`ReceiptPanic`](index.md#receiptpanic) \| [`ReceiptRevert`](index.md#receiptrevert) \| [`ReceiptLog`](index.md#receiptlog) \| [`ReceiptLogData`](index.md#receiptlogdata) \| [`ReceiptTransfer`](index.md#receipttransfer) \| [`ReceiptTransferOut`](index.md#receipttransferout) \| [`ReceiptScriptResult`](index.md#receiptscriptresult)

#### Defined in

[packages/transactions/src/coders/receipt.ts:655](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L655)

___

### ReceiptCall

Ƭ **ReceiptCall**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `bigint` | Amount of coins to forward, i.e. $rB (u64) |
| `assetId` | `string` | Asset ID of coins to forward, i.e. MEM[$rC, 32] (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `gas` | `bigint` | Gas to forward, i.e. $rD (u64) |
| `is` | `bigint` | Value of register $is (u64) |
| `param1` | `bigint` | First parameter (u64) |
| `param2` | `bigint` | Second parameter (u64) |
| `pc` | `bigint` | Value of register $pc (u64) |
| `to` | `string` | Contract ID of called contract (b256) |
| `type` | [`Call`](enums/ReceiptType.md#call) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L19)

___

### ReceiptLog

Ƭ **ReceiptLog**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `bigint` | Value of register $is (u64) |
| `pc` | `bigint` | Value of register $pc (u64) |
| `type` | [`Log`](enums/ReceiptType.md#log) | - |
| `val0` | `bigint` | Value of register $rA (u64) |
| `val1` | `bigint` | Value of register $rB (u64) |
| `val2` | `bigint` | Value of register $rC (u64) |
| `val3` | `bigint` | Value of register $rD (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:331](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L331)

___

### ReceiptLogData

Ƭ **ReceiptLogData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `digest` | `string` | Hash of MEM[$rC, $rD] (b256) |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `bigint` | Value of register $is (u64) |
| `len` | `bigint` | Value of register $rD (u64) |
| `pc` | `bigint` | Value of register $pc (u64) |
| `ptr` | `bigint` | Value of register $rC (u64) |
| `type` | [`LogData`](enums/ReceiptType.md#logdata) | - |
| `val0` | `bigint` | Value of register $rA (u64) |
| `val1` | `bigint` | Value of register $rB (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:403](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L403)

___

### ReceiptPanic

Ƭ **ReceiptPanic**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `bigint` | Value of register $is (u64) |
| `pc` | `bigint` | Value of register $pc (u64) |
| `reason` | `bigint` | Panic reason (u64) |
| `type` | [`Panic`](enums/ReceiptType.md#panic) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:223](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L223)

___

### ReceiptReturn

Ƭ **ReceiptReturn**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `bigint` | Value of register $is (u64) |
| `pc` | `bigint` | Value of register $pc (u64) |
| `type` | [`Return`](enums/ReceiptType.md#return) | - |
| `val` | `bigint` | Value of register $rA (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:103](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L103)

___

### ReceiptReturnData

Ƭ **ReceiptReturnData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `digest` | `string` | Hash of MEM[$rA, $rB] (b256) |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `bigint` | Value of register $is (u64) |
| `len` | `bigint` | Value of register $rB (u64) |
| `pc` | `bigint` | Value of register $pc (u64) |
| `ptr` | `bigint` | Value of register $rA (u64) |
| `type` | [`ReturnData`](enums/ReceiptType.md#returndata) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:157](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L157)

___

### ReceiptRevert

Ƭ **ReceiptRevert**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `bigint` | Value of register $is (u64) |
| `pc` | `bigint` | Value of register $pc (u64) |
| `type` | [`Revert`](enums/ReceiptType.md#revert) | - |
| `val` | `bigint` | Value of register $rA (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:277](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L277)

___

### ReceiptScriptResult

Ƭ **ReceiptScriptResult**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `gasUsed` | `bigint` | Gas consumed by the script (u64) |
| `result` | `bigint` | Result variant with embedded `PanicReason` in first 8 bits and `instr` (u64) |
| `type` | [`ScriptResult`](enums/ReceiptType.md#scriptresult) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:613](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L613)

___

### ReceiptTransfer

Ƭ **ReceiptTransfer**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `bigint` | Amount of coins transferred (u64) |
| `assetId` | `string` | Asset ID of coins transferred (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `bigint` | Value of register $is (u64) |
| `pc` | `bigint` | Value of register $pc (u64) |
| `to` | `string` | Contract ID of contract to transfer coins to (b256) |
| `type` | [`Transfer`](enums/ReceiptType.md#transfer) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:481](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L481)

___

### ReceiptTransferOut

Ƭ **ReceiptTransferOut**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `bigint` | Amount of coins transferred (u64) |
| `assetId` | `string` | Asset ID of coins transferred (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `bigint` | Value of register $is (u64) |
| `pc` | `bigint` | Value of register $pc (u64) |
| `to` | `string` | Address to transfer coins to (b256) |
| `type` | [`TransferOut`](enums/ReceiptType.md#transferout) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:547](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L547)

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

[packages/transactions/src/coders/transaction.ts:293](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L293)

___

### TransactionCreate

Ƭ **TransactionCreate**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytePrice` | `bigint` | Price per transaction byte (u64) |
| `bytecodeLength` | `number` | Contract bytecode length, in instructions (u32) |
| `bytecodeWitnessIndex` | `number` | Witness index of contract bytecode to create (u8) |
| `gasLimit` | `bigint` | Gas limit for transaction (u64) |
| `gasPrice` | `bigint` | Gas price for transaction (u64) |
| `inputs` | [`Input`](index.md#input)[] | List of inputs (Input[]) |
| `inputsCount` | `number` | Number of inputs (u8) |
| `maturity` | `bigint` | Block until which tx cannot be included (u64) |
| `outputs` | [`Output`](index.md#output)[] | List of outputs (Output[]) |
| `outputsCount` | `number` | Number of outputs (u8) |
| `salt` | `string` | Salt (b256) |
| `staticContracts` | `string`[] | List of static contracts (b256[]) |
| `staticContractsCount` | `number` | Number of static contracts (u8) |
| `storageSlots` | [`StorageSlot`](index.md#storageslot)[] | List of inputs (StorageSlot[]) |
| `storageSlotsCount` | `number` | Number of storage slots to initialize (u16) |
| `type` | [`Create`](enums/TransactionType.md#create) | - |
| `witnesses` | [`Witness`](index.md#witness)[] | List of witnesses (Witness[]) |
| `witnessesCount` | `number` | Number of witnesses (u8) |

#### Defined in

[packages/transactions/src/coders/transaction.ts:147](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L147)

___

### TransactionScript

Ƭ **TransactionScript**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytePrice` | `bigint` | Price per transaction byte (u64) |
| `gasLimit` | `bigint` | Gas limit for transaction (u64) |
| `gasPrice` | `bigint` | Gas price for transaction (u64) |
| `inputs` | [`Input`](index.md#input)[] | List of inputs (Input[]) |
| `inputsCount` | `number` | Number of inputs (u8) |
| `maturity` | `bigint` | Block until which tx cannot be included (u64) |
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

[packages/transactions/src/coders/transaction.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L21)

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

[packages/transactions/src/consts.ts:2](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L2)

___

### GAS\_PRICE\_FACTOR

• `Const` **GAS\_PRICE\_FACTOR**: `1000000n`

Maximum gas per transaction.

#### Defined in

[packages/transactions/src/consts.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L21)

___

### MAX\_GAS\_PER\_TX

• `Const` **MAX\_GAS\_PER\_TX**: `100000000n`

Gas Price factor this is used to calculate
This is used to calculate the gas fee in Native Coins.
Ex.: transactionFee = Math.ceil(<gasUsed> / MAX_GAS_PER_TX);

#### Defined in

[packages/transactions/src/consts.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L18)

___

### MAX\_INPUTS

• `Const` **MAX\_INPUTS**: ``8``

Maximum number of inputs.

#### Defined in

[packages/transactions/src/consts.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L5)

___

### MAX\_OUTPUTS

• `Const` **MAX\_OUTPUTS**: ``8``

Maximum number of outputs.

#### Defined in

[packages/transactions/src/consts.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L8)

___

### MAX\_PREDICATE\_DATA\_LENGTH

• `Const` **MAX\_PREDICATE\_DATA\_LENGTH**: `number`

Maximum length of predicate data, in bytes.

#### Defined in

[packages/transactions/src/consts.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L40)

___

### MAX\_PREDICATE\_LENGTH

• `Const` **MAX\_PREDICATE\_LENGTH**: `number`

Maximum length of predicate, in instructions.

#### Defined in

[packages/transactions/src/consts.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L36)

___

### MAX\_SCRIPT\_DATA\_LENGTH

• `Const` **MAX\_SCRIPT\_DATA\_LENGTH**: `number`

Maximum length of script data, in bytes.

#### Defined in

[packages/transactions/src/consts.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L29)

___

### MAX\_SCRIPT\_LENGTH

• `Const` **MAX\_SCRIPT\_LENGTH**: `number`

Maximum length of script, in instructions.

#### Defined in

[packages/transactions/src/consts.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L25)

___

### MAX\_STATIC\_CONTRACTS

• `Const` **MAX\_STATIC\_CONTRACTS**: ``255``

Maximum number of static contracts.

#### Defined in

[packages/transactions/src/consts.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L32)

___

### MAX\_WITNESSES

• `Const` **MAX\_WITNESSES**: ``16``

Maximum number of witnesses.

#### Defined in

[packages/transactions/src/consts.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/consts.ts#L11)
