---
layout: default
title: internal
parent: "@fuel-ts/hasher"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/hasher](../index.md).internal

## Classes

- [BN](../classes/internal-BN.md)

## Interfaces

- [BNHelper](../interfaces/internal-BNHelper.md)
- [BNHiddenTypes](../interfaces/internal-BNHiddenTypes.md)
- [BNInputOverrides](../interfaces/internal-BNInputOverrides.md)
- [BNOverrides](../interfaces/internal-BNOverrides.md)
- [BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md)
- [CreateTransactionRequestLike](../interfaces/internal-CreateTransactionRequestLike.md)
- [ScriptTransactionRequestLike](../interfaces/internal-ScriptTransactionRequestLike.md)

## Enumeration Members

### Change

• **Change**: ``3``

#### Defined in

packages/transactions/dist/index.d.ts:127

___

### Coin

• **Coin**: ``0``

#### Defined in

packages/transactions/dist/index.d.ts:32

___

### Coin

• **Coin**: ``0``

#### Defined in

packages/transactions/dist/index.d.ts:124

___

### Contract

• **Contract**: ``1``

#### Defined in

packages/transactions/dist/index.d.ts:33

___

### Contract

• **Contract**: ``1``

#### Defined in

packages/transactions/dist/index.d.ts:125

___

### ContractCreated

• **ContractCreated**: ``5``

#### Defined in

packages/transactions/dist/index.d.ts:129

___

### Create

• **Create**: ``1``

#### Defined in

packages/transactions/dist/index.d.ts:481

___

### Message

• **Message**: ``2``

#### Defined in

packages/transactions/dist/index.d.ts:34

___

### Message

• **Message**: ``2``

#### Defined in

packages/transactions/dist/index.d.ts:126

___

### Script

• **Script**: ``0``

#### Defined in

packages/transactions/dist/index.d.ts:480

___

### Variable

• **Variable**: ``4``

#### Defined in

packages/transactions/dist/index.d.ts:128

## Type Aliases

### BNInput

Ƭ **BNInput**: `number` \| `string` \| `number`[] \| `Uint8Array` \| `Buffer` \| `BnJs`

#### Defined in

packages/math/dist/index.d.ts:13

___

### BigNumberish

Ƭ **BigNumberish**: `string` \| `number` \| [`BN`](../classes/internal-BN.md)

#### Defined in

packages/math/dist/index.d.ts:3

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

packages/providers/dist/index.d.ts:860

___

### CoinTransactionRequestInput

Ƭ **CoinTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BigNumberish`](internal.md#bignumberish) | Amount of coins |
| `assetId` | `BytesLike` | Asset ID of the coins |
| `id` | `BytesLike` | UTXO ID |
| `maturity?` | `number` | UTXO being spent must have been created at least this many blocks ago |
| `owner` | `BytesLike` | Owning address or script hash |
| `predicate?` | `BytesLike` | Predicate bytecode |
| `predicateData?` | `BytesLike` | Predicate input data (parameters) |
| `txPointer` | `BytesLike` | Points to the TX whose output is being spent. (TxPointer) |
| `type` | [`Coin`](internal.md#coin) | - |
| `witnessIndex` | `number` | Index of witness that authorizes spending the coin |

#### Defined in

packages/providers/dist/index.d.ts:789

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

packages/providers/dist/index.d.ts:839

___

### CompareResult

Ƭ **CompareResult**: ``-1`` \| ``0`` \| ``1``

#### Defined in

packages/math/dist/index.d.ts:12

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

packages/providers/dist/index.d.ts:870

___

### ContractTransactionRequestInput

Ƭ **ContractTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `txPointer` | `BytesLike` | Points to the TX whose output is being spent. (TxPointer) |
| `type` | [`Contract`](internal.md#contract) | - |

#### Defined in

packages/providers/dist/index.d.ts:829

___

### ContractTransactionRequestOutput

Ƭ **ContractTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputIndex` | `number` | Index of input contract |
| `type` | [`Contract`](internal.md#contract-1) | - |

#### Defined in

packages/providers/dist/index.d.ts:848

___

### FormatConfig

Ƭ **FormatConfig**: { `units?`: `number`  } & [`ToFixedConfig`](internal.md#tofixedconfig)

#### Defined in

packages/math/dist/index.d.ts:8

___

### MessageTransactionRequestInput

Ƭ **MessageTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BigNumberish`](internal.md#bignumberish) | Amount of coins |
| `data` | `BytesLike` | data of message |
| `nonce` | [`BigNumberish`](internal.md#bignumberish) | Unique nonce of message |
| `predicate?` | `BytesLike` | Predicate bytecode |
| `predicateData?` | `BytesLike` | Predicate input data (parameters) |
| `recipient` | `BytesLike` | Address of sender |
| `sender` | `BytesLike` | Address of sender |
| `type` | [`Message`](internal.md#message) | - |
| `witnessIndex` | `number` | Index of witness that authorizes the message |

#### Defined in

packages/providers/dist/index.d.ts:810

___

### MessageTransactionRequestOutput

Ƭ **MessageTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BigNumberish`](internal.md#bignumberish) | Amount of coins sent with message |
| `recipient` | `BytesLike` | Receiving address |
| `type` | [`Message`](internal.md#message-1) | - |

#### Defined in

packages/providers/dist/index.d.ts:853

___

### ToFixedConfig

Ƭ **ToFixedConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `minPrecision?` | `number` |
| `precision?` | `number` |

#### Defined in

packages/math/dist/index.d.ts:4

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](internal.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](internal.md#contracttransactionrequestinput) \| [`MessageTransactionRequestInput`](internal.md#messagetransactionrequestinput)

#### Defined in

packages/providers/dist/index.d.ts:836

___

### TransactionRequestLike

Ƭ **TransactionRequestLike**: { `type`: [`Script`](internal.md#script)  } & [`ScriptTransactionRequestLike`](../interfaces/internal-ScriptTransactionRequestLike.md) \| { `type`: [`Create`](internal.md#create)  } & [`CreateTransactionRequestLike`](../interfaces/internal-CreateTransactionRequestLike.md)

#### Defined in

packages/providers/dist/index.d.ts:1048

___

### TransactionRequestOutput

Ƭ **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](internal.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](internal.md#contracttransactionrequestoutput) \| [`MessageTransactionRequestOutput`](internal.md#messagetransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](internal.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](internal.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](internal.md#contractcreatedtransactionrequestoutput)

#### Defined in

packages/providers/dist/index.d.ts:877

___

### TransactionRequestStorageSlot

Ƭ **TransactionRequestStorageSlot**: { `key`: `BytesLike` ; `value`: `BytesLike`  } \| [key: BytesLike, value: BytesLike]

#### Defined in

packages/providers/dist/index.d.ts:880

___

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | [`Variable`](internal.md#variable) |

#### Defined in

packages/providers/dist/index.d.ts:867
