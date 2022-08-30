---
layout: default
title: internal
parent: "@fuel-ts/wallet"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/wallet](../index.md).internal

## Enumerations

- [GqlCoinStatus](../enums/internal-GqlCoinStatus.md)
- [GqlReturnType](../enums/internal-GqlReturnType.md)
- [TransactionType](../enums/internal-TransactionType.md)

## Classes

- [AbstractAddress](../classes/internal-AbstractAddress.md)
- [AbstractContract](../classes/internal-AbstractContract.md)
- [AbstractPredicate](../classes/internal-AbstractPredicate.md)
- [AbstractScript](../classes/internal-AbstractScript.md)
- [AbstractWallet](../classes/internal-AbstractWallet.md)
- [BaseTransactionRequest](../classes/internal-BaseTransactionRequest.md)
- [CreateTransactionRequest](../classes/internal-CreateTransactionRequest.md)
- [ScriptTransactionRequest](../classes/internal-ScriptTransactionRequest.md)
- [Signer](../classes/internal-Signer.md)
- [TransactionResponse](../classes/internal-TransactionResponse.md)

## Interfaces

- [BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md)
- [CreateTransactionRequestLike](../interfaces/internal-CreateTransactionRequestLike.md)
- [GenerateOptions](../interfaces/internal-GenerateOptions.md)
- [ScriptTransactionRequestLike](../interfaces/internal-ScriptTransactionRequestLike.md)

## Enumeration Members

### Call

• **Call**: ``0``

#### Defined in

[packages/transactions/src/coders/receipt.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L8)

___

### Change

• **Change**: ``3``

#### Defined in

[packages/transactions/src/coders/output.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L10)

___

### Coin

• **Coin**: ``0``

#### Defined in

[packages/transactions/src/coders/input.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L12)

___

### Coin

• **Coin**: ``0``

#### Defined in

[packages/transactions/src/coders/output.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L7)

___

### Contract

• **Contract**: ``1``

#### Defined in

[packages/transactions/src/coders/input.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L13)

___

### Contract

• **Contract**: ``1``

#### Defined in

[packages/transactions/src/coders/output.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L8)

___

### ContractCreated

• **ContractCreated**: ``5``

#### Defined in

[packages/transactions/src/coders/output.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L12)

___

### Create

• **Create**: ``1``

#### Defined in

[packages/transactions/src/coders/transaction.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L19)

___

### Log

• **Log**: ``5``

#### Defined in

[packages/transactions/src/coders/receipt.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L13)

___

### LogData

• **LogData**: ``6``

#### Defined in

[packages/transactions/src/coders/receipt.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L14)

___

### Panic

• **Panic**: ``3``

#### Defined in

[packages/transactions/src/coders/receipt.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L11)

___

### Return

• **Return**: ``1``

#### Defined in

[packages/transactions/src/coders/receipt.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L9)

___

### ReturnData

• **ReturnData**: ``2``

#### Defined in

[packages/transactions/src/coders/receipt.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L10)

___

### Revert

• **Revert**: ``4``

#### Defined in

[packages/transactions/src/coders/receipt.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L12)

___

### Script

• **Script**: ``0``

#### Defined in

[packages/transactions/src/coders/transaction.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L18)

___

### ScriptResult

• **ScriptResult**: ``9``

#### Defined in

[packages/transactions/src/coders/receipt.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L17)

___

### Transfer

• **Transfer**: ``7``

#### Defined in

[packages/transactions/src/coders/receipt.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L15)

___

### TransferOut

• **TransferOut**: ``8``

#### Defined in

[packages/transactions/src/coders/receipt.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L16)

___

### Variable

• **Variable**: ``4``

#### Defined in

[packages/transactions/src/coders/output.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L11)

___

### Withdrawal

• **Withdrawal**: ``2``

#### Defined in

[packages/transactions/src/coders/output.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L9)

## Type Aliases

### AddressLike

Ƭ **AddressLike**: [`AbstractAddress`](../classes/internal-AbstractAddress.md) \| [`AbstractWallet`](../classes/internal-AbstractWallet.md)

#### Defined in

[packages/interfaces/src/index.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L26)

___

### BigNumberish

Ƭ **BigNumberish**: `string` \| `number` \| `BN`

#### Defined in

[packages/math/src/types.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L3)

___

### BuildPredicateOptions

Ƭ **BuildPredicateOptions**: { `fundTransaction?`: `boolean`  } & `Pick`<[`TransactionRequestLike`](internal.md#transactionrequestlike), ``"gasLimit"`` \| ``"gasPrice"`` \| ``"bytePrice"`` \| ``"maturity"``\>

#### Defined in

[packages/providers/src/provider.ts:166](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L166)

___

### CallResult

Ƭ **CallResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](internal.md#transactionresultreceipt)[] |

#### Defined in

[packages/providers/src/provider.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L40)

___

### ChangeTransactionRequestOutput

Ƭ **ChangeTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId` | `BytesLike` | Asset ID of coins |
| `to` | `BytesLike` | Receiving address or script hash |
| `type` | [`Change`](internal.md#change) | - |

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
| `status` | [`GqlCoinStatus`](../enums/internal-GqlCoinStatus.md) |

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

Ƭ **CoinQuantityLike**: [amount: BigNumberish, assetId?: BytesLike] \| { `amount`: [`BigNumberish`](internal.md#bignumberish) ; `assetId?`: `BytesLike`  }

#### Defined in

[packages/providers/src/coin-quantity.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin-quantity.ts#L7)

___

### CoinTransactionRequestInput

Ƭ **CoinTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BigNumberish`](internal.md#bignumberish) | Amount of coins |
| `assetId` | `BytesLike` | Asset ID of the coins |
| `id` | `BytesLike` | UTXO ID |
| `maturity?` | [`BigNumberish`](internal.md#bignumberish) | UTXO being spent must have been created at least this many blocks ago |
| `owner` | `BytesLike` | Owning address or script hash |
| `predicate?` | `BytesLike` | Predicate bytecode |
| `predicateData?` | `BytesLike` | Predicate input data (parameters) |
| `type` | [`Coin`](internal.md#coin) | - |
| `witnessIndex` | `number` | Index of witness that authorizes spending the coin |

#### Defined in

[packages/providers/src/transaction-request/input.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L9)

___

### CoinTransactionRequestOutput

Ƭ **CoinTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BigNumberish`](internal.md#bignumberish) | Amount of coins to send |
| `assetId` | `BytesLike` | Asset ID of coins |
| `to` | `BytesLike` | Receiving address or script hash |
| `type` | [`Coin`](internal.md#coin-1) | - |

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
| `type` | [`ContractCreated`](internal.md#contractcreated) | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L42)

___

### ContractIdLike

Ƭ **ContractIdLike**: [`AbstractAddress`](../classes/internal-AbstractAddress.md) \| [`AbstractContract`](../classes/internal-AbstractContract.md)

#### Defined in

[packages/interfaces/src/index.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L28)

___

### ContractTransactionRequestInput

Ƭ **ContractTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `type` | [`Contract`](internal.md#contract) | - |

#### Defined in

[packages/providers/src/transaction-request/input.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L28)

___

### ContractTransactionRequestOutput

Ƭ **ContractTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputIndex` | `number` | Index of input contract |
| `type` | [`Contract`](internal.md#contract-1) | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L18)

___

### Input

Ƭ **Input**: [`InputCoin`](internal.md#inputcoin) \| [`InputContract`](internal.md#inputcontract)

#### Defined in

[packages/transactions/src/coders/input.ts:164](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L164)

___

### InputCoin

Ƭ **InputCoin**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | Amount of coins (u64) |
| `assetId` | `string` | Asset ID of the coins (b256) |
| `maturity` | `string` | UTXO being spent must have been created at least this many blocks ago (u64) |
| `owner` | `string` | Owning address or script hash (b256) |
| `predicate` | `string` | Predicate bytecode (byte[]) |
| `predicateData` | `string` | Predicate input data (parameters) (byte[]) |
| `predicateDataLength` | `number` | Length of predicate input data, in bytes (u16) |
| `predicateLength` | `number` | Length of predicate, in instructions (u16) |
| `type` | [`Coin`](internal.md#coin) | - |
| `utxoID` | [`UtxoId`](internal.md#utxoid) | UTXO ID (UtxoId) |
| `witnessIndex` | `number` | Index of witness that authorizes spending the coin (u8) |

#### Defined in

[packages/transactions/src/coders/input.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L16)

___

### InputContract

Ƭ **InputContract**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `balanceRoot` | `string` | Root of amount of coins owned by contract before transaction execution (b256) |
| `contractID` | `string` | Contract ID (b256) |
| `stateRoot` | `string` | State root of contract before transaction execution (b256) |
| `type` | [`Contract`](internal.md#contract) | - |
| `utxoID` | [`UtxoId`](internal.md#utxoid) | UTXO ID (UtxoId) |

#### Defined in

[packages/transactions/src/coders/input.ts:110](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L110)

___

### InputValue

Ƭ **InputValue**: [`Primitive`](internal.md#primitive) \| `BN` \| `BytesLike` \| [`InputValue`](internal.md#inputvalue)[] \| { `[key: string]`: [`InputValue`](internal.md#inputvalue);  } \| `Record`<`string`, [`Primitive`](internal.md#primitive) \| `BytesLike`\>

The type of value you can provide to `Coder.encode`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L12)

___

### Output

Ƭ **Output**: [`OutputCoin`](internal.md#outputcoin) \| [`OutputContract`](internal.md#outputcontract) \| [`OutputWithdrawal`](internal.md#outputwithdrawal) \| [`OutputChange`](internal.md#outputchange) \| [`OutputVariable`](internal.md#outputvariable) \| [`OutputContractCreated`](internal.md#outputcontractcreated)

#### Defined in

[packages/transactions/src/coders/output.ts:300](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L300)

___

### OutputChange

Ƭ **OutputChange**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | Amount of coins to send (u64) |
| `assetId` | `string` | Asset ID of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Change`](internal.md#change) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:159](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L159)

___

### OutputCoin

Ƭ **OutputCoin**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | Amount of coins to send (u64) |
| `assetId` | `string` | Asset ID of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Coin`](internal.md#coin-1) | - |

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
| `type` | [`Contract`](internal.md#contract-1) | - |

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
| `type` | [`ContractCreated`](internal.md#contractcreated) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:255](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L255)

___

### OutputVariable

Ƭ **OutputVariable**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | Amount of coins to send (u64) |
| `assetId` | `string` | Asset ID of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Variable`](internal.md#variable) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:207](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L207)

___

### OutputWithdrawal

Ƭ **OutputWithdrawal**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | Amount of coins to withdraw (u64) |
| `assetId` | `string` | Asset ID of coins (b256) |
| `to` | `string` | Receiving address (b256) |
| `type` | [`Withdrawal`](internal.md#withdrawal) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:111](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L111)

___

### Primitive

Ƭ **Primitive**: `string` \| `number` \| `boolean`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L7)

___

### ReceiptCall

Ƭ **ReceiptCall**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | Amount of coins to forward, i.e. $rB (u64) |
| `assetId` | `string` | Asset ID of coins to forward, i.e. MEM[$rC, 32] (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `gas` | `string` | Gas to forward, i.e. $rD (u64) |
| `is` | `string` | Value of register $is (u64) |
| `param1` | `string` | First parameter (u64) |
| `param2` | `string` | Second parameter (u64) |
| `pc` | `string` | Value of register $pc (u64) |
| `to` | `string` | Contract ID of called contract (b256) |
| `type` | [`Call`](internal.md#call) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L20)

___

### ReceiptLog

Ƭ **ReceiptLog**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `string` | Value of register $is (u64) |
| `pc` | `string` | Value of register $pc (u64) |
| `type` | [`Log`](internal.md#log) | - |
| `val0` | `string` | Value of register $rA (u64) |
| `val1` | `string` | Value of register $rB (u64) |
| `val2` | `string` | Value of register $rC (u64) |
| `val3` | `string` | Value of register $rD (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:332](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L332)

___

### ReceiptLogData

Ƭ **ReceiptLogData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `digest` | `string` | Hash of MEM[$rC, $rD] (b256) |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `string` | Value of register $is (u64) |
| `len` | `string` | Value of register $rD (u64) |
| `pc` | `string` | Value of register $pc (u64) |
| `ptr` | `string` | Value of register $rC (u64) |
| `type` | [`LogData`](internal.md#logdata) | - |
| `val0` | `string` | Value of register $rA (u64) |
| `val1` | `string` | Value of register $rB (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:404](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L404)

___

### ReceiptPanic

Ƭ **ReceiptPanic**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `string` | Value of register $is (u64) |
| `pc` | `string` | Value of register $pc (u64) |
| `reason` | `string` | Panic reason (u64) |
| `type` | [`Panic`](internal.md#panic) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:224](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L224)

___

### ReceiptReturn

Ƭ **ReceiptReturn**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `string` | Value of register $is (u64) |
| `pc` | `string` | Value of register $pc (u64) |
| `type` | [`Return`](internal.md#return) | - |
| `val` | `string` | Value of register $rA (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:104](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L104)

___

### ReceiptReturnData

Ƭ **ReceiptReturnData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `digest` | `string` | Hash of MEM[$rA, $rB] (b256) |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `string` | Value of register $is (u64) |
| `len` | `string` | Value of register $rB (u64) |
| `pc` | `string` | Value of register $pc (u64) |
| `ptr` | `string` | Value of register $rA (u64) |
| `type` | [`ReturnData`](internal.md#returndata) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:158](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L158)

___

### ReceiptRevert

Ƭ **ReceiptRevert**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `string` | Value of register $is (u64) |
| `pc` | `string` | Value of register $pc (u64) |
| `type` | [`Revert`](internal.md#revert) | - |
| `val` | `string` | Value of register $rA (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:278](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L278)

___

### ReceiptScriptResult

Ƭ **ReceiptScriptResult**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `gasUsed` | `string` | Gas consumed by the script (u64) |
| `result` | `string` | Result variant with embedded `PanicReason` in first 8 bits and `instr` (u64) |
| `type` | [`ScriptResult`](internal.md#scriptresult) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:614](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L614)

___

### ReceiptTransfer

Ƭ **ReceiptTransfer**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | Amount of coins transferred (u64) |
| `assetId` | `string` | Asset ID of coins transferred (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `string` | Value of register $is (u64) |
| `pc` | `string` | Value of register $pc (u64) |
| `to` | `string` | Contract ID of contract to transfer coins to (b256) |
| `type` | [`Transfer`](internal.md#transfer) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:482](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L482)

___

### ReceiptTransferOut

Ƭ **ReceiptTransferOut**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | Amount of coins transferred (u64) |
| `assetId` | `string` | Asset ID of coins transferred (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `string` | Value of register $is (u64) |
| `pc` | `string` | Value of register $pc (u64) |
| `to` | `string` | Address to transfer coins to (b256) |
| `type` | [`TransferOut`](internal.md#transferout) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:548](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L548)

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

Ƭ **Transaction**: [`TransactionScript`](internal.md#transactionscript) \| [`TransactionCreate`](internal.md#transactioncreate)

#### Defined in

[packages/transactions/src/coders/transaction.ts:294](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L294)

___

### TransactionCreate

Ƭ **TransactionCreate**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytePrice` | `string` | Price per transaction byte (u64) |
| `bytecodeLength` | `number` | Contract bytecode length, in instructions (u32) |
| `bytecodeWitnessIndex` | `number` | Witness index of contract bytecode to create (u8) |
| `gasLimit` | `string` | Gas limit for transaction (u64) |
| `gasPrice` | `string` | Gas price for transaction (u64) |
| `inputs` | [`Input`](internal.md#input)[] | List of inputs (Input[]) |
| `inputsCount` | `number` | Number of inputs (u8) |
| `maturity` | `string` | Block until which tx cannot be included (u64) |
| `outputs` | [`Output`](internal.md#output)[] | List of outputs (Output[]) |
| `outputsCount` | `number` | Number of outputs (u8) |
| `salt` | `string` | Salt (b256) |
| `staticContracts` | `string`[] | List of static contracts (b256[]) |
| `staticContractsCount` | `number` | Number of static contracts (u8) |
| `storageSlots` | [`StorageSlot`](internal.md#storageslot)[] | List of inputs (StorageSlot[]) |
| `storageSlotsCount` | `number` | Number of storage slots to initialize (u16) |
| `type` | [`Create`](internal.md#create) | - |
| `witnesses` | [`Witness`](internal.md#witness)[] | List of witnesses (Witness[]) |
| `witnessesCount` | `number` | Number of witnesses (u8) |

#### Defined in

[packages/transactions/src/coders/transaction.ts:148](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L148)

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](../classes/internal-ScriptTransactionRequest.md) \| [`CreateTransactionRequest`](../classes/internal-CreateTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:531](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L531)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](internal.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](internal.md#contracttransactionrequestinput)

#### Defined in

[packages/providers/src/transaction-request/input.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L33)

___

### TransactionRequestLike

Ƭ **TransactionRequestLike**: { `type`: [`Script`](internal.md#script)  } & [`ScriptTransactionRequestLike`](../interfaces/internal-ScriptTransactionRequestLike.md) \| { `type`: [`Create`](internal.md#create)  } & [`CreateTransactionRequestLike`](../interfaces/internal-CreateTransactionRequestLike.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:532](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L532)

___

### TransactionRequestOutput

Ƭ **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](internal.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](internal.md#contracttransactionrequestoutput) \| [`WithdrawalTransactionRequestOutput`](internal.md#withdrawaltransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](internal.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](internal.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](internal.md#contractcreatedtransactionrequestoutput)

#### Defined in

[packages/providers/src/transaction-request/output.ts:49](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L49)

___

### TransactionRequestStorageSlot

Ƭ **TransactionRequestStorageSlot**: { `key`: `BytesLike` ; `value`: `BytesLike`  } \| [key: BytesLike, value: BytesLike]

#### Defined in

[packages/providers/src/transaction-request/storage-slot.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/storage-slot.ts#L5)

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
| `receipts` | [`TransactionResultReceipt`](internal.md#transactionresultreceipt)[] | Receipts produced during the execution of the transaction |
| `status` | `TStatus` extends ``"success"`` ? { `programState`: `any` ; `type`: ``"success"``  } : { `reason`: `any` ; `type`: ``"failure"``  } | - |
| `time` | `any` | - |
| `transactionId` | `string` | - |

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:50](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L50)

___

### TransactionResultCallReceipt

Ƭ **TransactionResultCallReceipt**: [`ReceiptCall`](internal.md#receiptcall)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L27)

___

### TransactionResultLogDataReceipt

Ƭ **TransactionResultLogDataReceipt**: [`ReceiptLogData`](internal.md#receiptlogdata) & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L33)

___

### TransactionResultLogReceipt

Ƭ **TransactionResultLogReceipt**: [`ReceiptLog`](internal.md#receiptlog)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L32)

___

### TransactionResultPanicReceipt

Ƭ **TransactionResultPanicReceipt**: [`ReceiptPanic`](internal.md#receiptpanic)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L30)

___

### TransactionResultReceipt

Ƭ **TransactionResultReceipt**: [`TransactionResultCallReceipt`](internal.md#transactionresultcallreceipt) \| [`TransactionResultReturnReceipt`](internal.md#transactionresultreturnreceipt) \| [`TransactionResultReturnDataReceipt`](internal.md#transactionresultreturndatareceipt) \| [`TransactionResultPanicReceipt`](internal.md#transactionresultpanicreceipt) \| [`TransactionResultRevertReceipt`](internal.md#transactionresultrevertreceipt) \| [`TransactionResultLogReceipt`](internal.md#transactionresultlogreceipt) \| [`TransactionResultLogDataReceipt`](internal.md#transactionresultlogdatareceipt) \| [`TransactionResultTransferReceipt`](internal.md#transactionresulttransferreceipt) \| [`TransactionResultTransferOutReceipt`](internal.md#transactionresulttransferoutreceipt) \| [`TransactionResultScriptResultReceipt`](internal.md#transactionresultscriptresultreceipt)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L38)

___

### TransactionResultReturnDataReceipt

Ƭ **TransactionResultReturnDataReceipt**: [`ReceiptReturnData`](internal.md#receiptreturndata) & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L29)

___

### TransactionResultReturnReceipt

Ƭ **TransactionResultReturnReceipt**: [`ReceiptReturn`](internal.md#receiptreturn)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L28)

___

### TransactionResultRevertReceipt

Ƭ **TransactionResultRevertReceipt**: [`ReceiptRevert`](internal.md#receiptrevert)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L31)

___

### TransactionResultScriptResultReceipt

Ƭ **TransactionResultScriptResultReceipt**: [`ReceiptScriptResult`](internal.md#receiptscriptresult)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L36)

___

### TransactionResultTransferOutReceipt

Ƭ **TransactionResultTransferOutReceipt**: [`ReceiptTransferOut`](internal.md#receipttransferout)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L35)

___

### TransactionResultTransferReceipt

Ƭ **TransactionResultTransferReceipt**: [`ReceiptTransfer`](internal.md#receipttransfer)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L34)

___

### TransactionScript

Ƭ **TransactionScript**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytePrice` | `string` | Price per transaction byte (u64) |
| `gasLimit` | `string` | Gas limit for transaction (u64) |
| `gasPrice` | `string` | Gas price for transaction (u64) |
| `inputs` | [`Input`](internal.md#input)[] | List of inputs (Input[]) |
| `inputsCount` | `number` | Number of inputs (u8) |
| `maturity` | `string` | Block until which tx cannot be included (u64) |
| `outputs` | [`Output`](internal.md#output)[] | List of outputs (Output[]) |
| `outputsCount` | `number` | Number of outputs (u8) |
| `receiptsRoot` | `string` | Merkle root of receipts (b256) |
| `script` | `string` | Script to execute (byte[]) |
| `scriptData` | `string` | Script input data (parameters) (byte[]) |
| `scriptDataLength` | `number` | Length of script input data, in bytes (u16) |
| `scriptLength` | `number` | Script length, in instructions (u16) |
| `type` | [`Script`](internal.md#script) | - |
| `witnesses` | [`Witness`](internal.md#witness)[] | List of witnesses (Witness[]) |
| `witnessesCount` | `number` | Number of witnesses (u8) |

#### Defined in

[packages/transactions/src/coders/transaction.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L22)

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

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | [`Variable`](internal.md#variable) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L39)

___

### WithdrawalTransactionRequestOutput

Ƭ **WithdrawalTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BigNumberish`](internal.md#bignumberish) | Amount of coins to withdraw |
| `assetId` | `BytesLike` | Asset ID of coins |
| `to` | `BytesLike` | Receiving address |
| `type` | [`Withdrawal`](internal.md#withdrawal) | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L23)

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
