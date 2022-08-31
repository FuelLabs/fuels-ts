---
layout: default
title: internal
parent: "@fuel-ts/hasher"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/hasher](../index.md).internal

## Interfaces

- [BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md)
- [CreateTransactionRequestLike](../interfaces/internal-CreateTransactionRequestLike.md)
- [ScriptTransactionRequestLike](../interfaces/internal-ScriptTransactionRequestLike.md)

## Enumeration Members

### Change

• **Change**: ``3``

#### Defined in

[packages/transactions/src/coders/output.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L9)

___

### Coin

• **Coin**: ``0``

#### Defined in

[packages/transactions/src/coders/input.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L11)

___

### Coin

• **Coin**: ``0``

#### Defined in

[packages/transactions/src/coders/output.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L6)

___

### Contract

• **Contract**: ``1``

#### Defined in

[packages/transactions/src/coders/input.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L12)

___

### Contract

• **Contract**: ``1``

#### Defined in

[packages/transactions/src/coders/output.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L7)

___

### ContractCreated

• **ContractCreated**: ``5``

#### Defined in

[packages/transactions/src/coders/output.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L11)

___

### Create

• **Create**: ``1``

#### Defined in

[packages/transactions/src/coders/transaction.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L18)

___

### Script

• **Script**: ``0``

#### Defined in

[packages/transactions/src/coders/transaction.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L17)

___

### Variable

• **Variable**: ``4``

#### Defined in

[packages/transactions/src/coders/output.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L10)

___

### Withdrawal

• **Withdrawal**: ``2``

#### Defined in

[packages/transactions/src/coders/output.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L8)

## Type Aliases

### BigNumberish

Ƭ **BigNumberish**: `string` \| `number` \| `bigint`

#### Defined in

[packages/math/src/types.ts:1](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L1)

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

[packages/providers/src/transaction-request/output.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L31)

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

[packages/providers/src/transaction-request/input.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L8)

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

[packages/providers/src/transaction-request/output.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L8)

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

[packages/providers/src/transaction-request/output.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L41)

___

### ContractTransactionRequestInput

Ƭ **ContractTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `type` | [`Contract`](internal.md#contract) | - |

#### Defined in

[packages/providers/src/transaction-request/input.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L27)

___

### ContractTransactionRequestOutput

Ƭ **ContractTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputIndex` | `number` | Index of input contract |
| `type` | [`Contract`](internal.md#contract-1) | - |

#### Defined in

[packages/providers/src/transaction-request/output.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L17)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](internal.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](internal.md#contracttransactionrequestinput)

#### Defined in

[packages/providers/src/transaction-request/input.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L32)

___

### TransactionRequestLike

Ƭ **TransactionRequestLike**: { `type`: [`Script`](internal.md#script)  } & [`ScriptTransactionRequestLike`](../interfaces/internal-ScriptTransactionRequestLike.md) \| { `type`: [`Create`](internal.md#create)  } & [`CreateTransactionRequestLike`](../interfaces/internal-CreateTransactionRequestLike.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:531](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L531)

___

### TransactionRequestOutput

Ƭ **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](internal.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](internal.md#contracttransactionrequestoutput) \| [`WithdrawalTransactionRequestOutput`](internal.md#withdrawaltransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](internal.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](internal.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](internal.md#contractcreatedtransactionrequestoutput)

#### Defined in

[packages/providers/src/transaction-request/output.ts:48](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L48)

___

### TransactionRequestStorageSlot

Ƭ **TransactionRequestStorageSlot**: { `key`: `BytesLike` ; `value`: `BytesLike`  } \| [key: BytesLike, value: BytesLike]

#### Defined in

[packages/providers/src/transaction-request/storage-slot.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/storage-slot.ts#L5)

___

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | [`Variable`](internal.md#variable) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L38)

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

[packages/providers/src/transaction-request/output.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L22)
