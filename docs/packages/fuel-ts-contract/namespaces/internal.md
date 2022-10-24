---
layout: default
title: internal
parent: "@fuel-ts/contract"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/contract](../index.md).internal

## Enumerations

- [GqlCoinStatus](../enums/internal-GqlCoinStatus.md)
- [GqlReturnType](../enums/internal-GqlReturnType.md)
- [TransactionType](../enums/internal-TransactionType.md)

## Classes

- [AbstractAddress](../classes/internal-AbstractAddress.md)
- [AbstractContract](../classes/internal-AbstractContract.md)
- [AbstractScript](../classes/internal-AbstractScript.md)
- [AbstractWallet](../classes/internal-AbstractWallet.md)
- [BN](../classes/internal-BN.md)
- [BaseInvocationScope](../classes/internal-BaseInvocationScope.md)
- [BaseTransactionRequest](../classes/internal-BaseTransactionRequest.md)
- [CreateTransactionRequest](../classes/internal-CreateTransactionRequest.md)
- [InvocationCallResult](../classes/internal-InvocationCallResult.md)
- [ScriptTransactionRequest](../classes/internal-ScriptTransactionRequest.md)
- [TransactionResponse](../classes/internal-TransactionResponse.md)

## Interfaces

- [BNHelper](../interfaces/internal-BNHelper.md)
- [BNHiddenTypes](../interfaces/internal-BNHiddenTypes.md)
- [BNInputOverrides](../interfaces/internal-BNInputOverrides.md)
- [BNOverrides](../interfaces/internal-BNOverrides.md)
- [BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md)
- [CreateTransactionRequestLike](../interfaces/internal-CreateTransactionRequestLike.md)
- [JsonAbiFragment](../interfaces/internal-JsonAbiFragment.md)
- [JsonAbiFragmentType](../interfaces/internal-JsonAbiFragmentType.md)
- [JsonFlatAbi](../interfaces/internal-JsonFlatAbi.md)
- [JsonFlatAbiFragmentArgumentType](../interfaces/internal-JsonFlatAbiFragmentArgumentType.md)
- [JsonFlatAbiFragmentFunction](../interfaces/internal-JsonFlatAbiFragmentFunction.md)
- [JsonFlatAbiFragmentLoggedType](../interfaces/internal-JsonFlatAbiFragmentLoggedType.md)
- [JsonFlatAbiFragmentType](../interfaces/internal-JsonFlatAbiFragmentType.md)
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

[packages/transactions/src/coders/input.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L14)

___

### Coin

• **Coin**: ``0``

#### Defined in

[packages/transactions/src/coders/output.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L7)

___

### Contract

• **Contract**: ``1``

#### Defined in

[packages/transactions/src/coders/input.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L15)

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

### Message

• **Message**: ``2``

#### Defined in

[packages/transactions/src/coders/input.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L16)

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

[packages/interfaces/src/index.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L28)

___

### BNInput

Ƭ **BNInput**: `number` \| `string` \| `number`[] \| `Uint8Array` \| `Buffer` \| `BnJs`

#### Defined in

[packages/math/src/bn.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L8)

___

### BigNumberish

Ƭ **BigNumberish**: `string` \| `number` \| [`BN`](../classes/internal-BN.md)

#### Defined in

[packages/math/src/types.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L3)

___

### CallResult

Ƭ **CallResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](internal.md#transactionresultreceipt)[] |

#### Defined in

[packages/providers/src/provider.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L43)

___

### ChangeTransactionRequestOutput

Ƭ **ChangeTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assetId` | `BytesLike` |
| `to` | `BytesLike` |
| `type` | [`Change`](internal.md#change) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L32)

___

### Coin

Ƭ **Coin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `assetId` | `string` |
| `blockCreated` | [`BN`](../classes/internal-BN.md) |
| `id` | `string` |
| `maturity` | `number` |
| `owner` | `string` |
| `status` | [`GqlCoinStatus`](../enums/internal-GqlCoinStatus.md) |

#### Defined in

[packages/providers/src/coin.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin.ts#L8)

___

### CoinQuantity

Ƭ **CoinQuantity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
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

| Name | Type |
| :------ | :------ |
| `amount` | [`BigNumberish`](internal.md#bignumberish) |
| `assetId` | `BytesLike` |
| `id` | `BytesLike` |
| `maturity?` | `number` |
| `owner` | `BytesLike` |
| `predicate?` | `BytesLike` |
| `predicateData?` | `BytesLike` |
| `txPointer` | `BytesLike` |
| `type` | [`Coin`](internal.md#coin) |
| `witnessIndex` | `number` |

#### Defined in

[packages/providers/src/transaction-request/input.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L9)

___

### CoinTransactionRequestOutput

Ƭ **CoinTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BigNumberish`](internal.md#bignumberish) |
| `assetId` | `BytesLike` |
| `to` | `BytesLike` |
| `type` | [`Coin`](internal.md#coin) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L9)

___

### CompareResult

Ƭ **CompareResult**: ``-1`` \| ``0`` \| ``1``

#### Defined in

[packages/math/src/bn.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L7)

___

### ContractCall

Ƭ **ContractCall**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount?` | [`BigNumberish`](internal.md#bignumberish) |
| `assetId?` | `BytesLike` |
| `contractId` | [`AbstractAddress`](../classes/internal-AbstractAddress.md) |
| `data` | `BytesLike` |
| `gas?` | [`BigNumberish`](internal.md#bignumberish) |

#### Defined in

[packages/contract/src/scripts.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/scripts.ts#L15)

___

### ContractCreatedTransactionRequestOutput

Ƭ **ContractCreatedTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractId` | `BytesLike` |
| `stateRoot` | `BytesLike` |
| `type` | [`ContractCreated`](internal.md#contractcreated) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L42)

___

### ContractIdLike

Ƭ **ContractIdLike**: [`AbstractAddress`](../classes/internal-AbstractAddress.md) \| [`AbstractContract`](../classes/internal-AbstractContract.md)

#### Defined in

[packages/interfaces/src/index.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L30)

___

### ContractTransactionRequestInput

Ƭ **ContractTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractId` | `BytesLike` |
| `txPointer` | `BytesLike` |
| `type` | [`Contract`](internal.md#contract) |

#### Defined in

[packages/providers/src/transaction-request/input.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L66)

___

### ContractTransactionRequestOutput

Ƭ **ContractTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `inputIndex` | `number` |
| `type` | [`Contract`](internal.md#contract) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L18)

___

### DeployContractOptions

Ƭ **DeployContractOptions**: { `salt?`: `BytesLike` ; `stateRoot?`: `BytesLike` ; `storageSlots?`: [`StorageSlot`](internal.md#storageslot)[]  } & [`CreateTransactionRequestLike`](../interfaces/internal-CreateTransactionRequestLike.md)

#### Defined in

[packages/contract/src/contracts/contract-factory.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract-factory.ts#L18)

___

### FormatConfig

Ƭ **FormatConfig**: { `units?`: `number`  } & [`ToFixedConfig`](internal.md#tofixedconfig)

#### Defined in

[packages/math/src/types.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L8)

___

### Input

Ƭ **Input**: [`InputCoin`](internal.md#inputcoin) \| [`InputContract`](internal.md#inputcontract) \| [`InputMessage`](internal.md#inputmessage)

#### Defined in

[packages/transactions/src/coders/input.ts:327](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L327)

___

### InputCoin

Ƭ **InputCoin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `assetId` | `string` |
| `maturity` | `number` |
| `owner` | `string` |
| `predicate` | `string` |
| `predicateData` | `string` |
| `predicateDataLength` | `number` |
| `predicateLength` | `number` |
| `txPointer` | [`TxPointer`](internal.md#txpointer) |
| `type` | [`Coin`](internal.md#coin) |
| `utxoID` | [`UtxoId`](internal.md#utxoid) |
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
| `txPointer` | [`TxPointer`](internal.md#txpointer) |
| `type` | [`Contract`](internal.md#contract) |
| `utxoID` | [`UtxoId`](internal.md#utxoid) |

#### Defined in

[packages/transactions/src/coders/input.ts:130](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L130)

___

### InputMessage

Ƭ **InputMessage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `data` | `number`[] |
| `dataLength` | `number` |
| `nonce` | [`BN`](../classes/internal-BN.md) |
| `predicate` | `string` |
| `predicateData` | `string` |
| `predicateDataLength` | `number` |
| `predicateLength` | `number` |
| `recipient` | `string` |
| `sender` | `string` |
| `type` | [`Message`](internal.md#message) |
| `witnessIndex` | `number` |

#### Defined in

[packages/transactions/src/coders/input.ts:195](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L195)

___

### JsonAbi

Ƭ **JsonAbi**: `ReadonlyArray`<[`JsonAbiFragment`](../interfaces/internal-JsonAbiFragment.md)\> \| [`JsonFlatAbi`](../interfaces/internal-JsonFlatAbi.md)

#### Defined in

[packages/abi-coder/src/json-abi.ts:71](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L71)

___

### Message

Ƭ **Message**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `daHeight` | [`BN`](../classes/internal-BN.md) |
| `data` | `number`[] |
| `nonce` | [`BN`](../classes/internal-BN.md) |
| `recipient` | [`AbstractAddress`](../classes/internal-AbstractAddress.md) |
| `sender` | [`AbstractAddress`](../classes/internal-AbstractAddress.md) |

#### Defined in

[packages/providers/src/message.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/message.ts#L7)

___

### MessageTransactionRequestInput

Ƭ **MessageTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BigNumberish`](internal.md#bignumberish) |
| `data` | `number`[] |
| `nonce` | [`BigNumberish`](internal.md#bignumberish) |
| `predicate?` | `BytesLike` |
| `predicateData?` | `BytesLike` |
| `recipient` | `BytesLike` |
| `sender` | `BytesLike` |
| `type` | [`Message`](internal.md#message) |
| `witnessIndex` | `number` |

#### Defined in

[packages/providers/src/transaction-request/input.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L39)

___

### Output

Ƭ **Output**: [`OutputCoin`](internal.md#outputcoin) \| [`OutputContract`](internal.md#outputcontract) \| [`OutputWithdrawal`](internal.md#outputwithdrawal) \| [`OutputChange`](internal.md#outputchange) \| [`OutputVariable`](internal.md#outputvariable) \| [`OutputContractCreated`](internal.md#outputcontractcreated)

#### Defined in

[packages/transactions/src/coders/output.ts:300](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L300)

___

### OutputChange

Ƭ **OutputChange**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `assetId` | `string` |
| `to` | `string` |
| `type` | [`Change`](internal.md#change) |

#### Defined in

[packages/transactions/src/coders/output.ts:159](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L159)

___

### OutputCoin

Ƭ **OutputCoin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `assetId` | `string` |
| `to` | `string` |
| `type` | [`Coin`](internal.md#coin) |

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
| `type` | [`Contract`](internal.md#contract) |

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
| `type` | [`ContractCreated`](internal.md#contractcreated) |

#### Defined in

[packages/transactions/src/coders/output.ts:255](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L255)

___

### OutputVariable

Ƭ **OutputVariable**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `assetId` | `string` |
| `to` | `string` |
| `type` | [`Variable`](internal.md#variable) |

#### Defined in

[packages/transactions/src/coders/output.ts:207](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L207)

___

### OutputWithdrawal

Ƭ **OutputWithdrawal**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `assetId` | `string` |
| `to` | `string` |
| `type` | [`Withdrawal`](internal.md#withdrawal) |

#### Defined in

[packages/transactions/src/coders/output.ts:111](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L111)

___

### ReceiptCall

Ƭ **ReceiptCall**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `assetId` | `string` |
| `from` | `string` |
| `gas` | [`BN`](../classes/internal-BN.md) |
| `is` | [`BN`](../classes/internal-BN.md) |
| `param1` | [`BN`](../classes/internal-BN.md) |
| `param2` | [`BN`](../classes/internal-BN.md) |
| `pc` | [`BN`](../classes/internal-BN.md) |
| `to` | `string` |
| `type` | [`Call`](internal.md#call) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L20)

___

### ReceiptLog

Ƭ **ReceiptLog**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `is` | [`BN`](../classes/internal-BN.md) |
| `pc` | [`BN`](../classes/internal-BN.md) |
| `type` | [`Log`](internal.md#log) |
| `val0` | [`BN`](../classes/internal-BN.md) |
| `val1` | [`BN`](../classes/internal-BN.md) |
| `val2` | [`BN`](../classes/internal-BN.md) |
| `val3` | [`BN`](../classes/internal-BN.md) |

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
| `is` | [`BN`](../classes/internal-BN.md) |
| `len` | [`BN`](../classes/internal-BN.md) |
| `pc` | [`BN`](../classes/internal-BN.md) |
| `ptr` | [`BN`](../classes/internal-BN.md) |
| `type` | [`LogData`](internal.md#logdata) |
| `val0` | [`BN`](../classes/internal-BN.md) |
| `val1` | [`BN`](../classes/internal-BN.md) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:404](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L404)

___

### ReceiptPanic

Ƭ **ReceiptPanic**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `is` | [`BN`](../classes/internal-BN.md) |
| `pc` | [`BN`](../classes/internal-BN.md) |
| `reason` | [`BN`](../classes/internal-BN.md) |
| `type` | [`Panic`](internal.md#panic) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:224](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L224)

___

### ReceiptReturn

Ƭ **ReceiptReturn**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `is` | [`BN`](../classes/internal-BN.md) |
| `pc` | [`BN`](../classes/internal-BN.md) |
| `type` | [`Return`](internal.md#return) |
| `val` | [`BN`](../classes/internal-BN.md) |

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
| `is` | [`BN`](../classes/internal-BN.md) |
| `len` | [`BN`](../classes/internal-BN.md) |
| `pc` | [`BN`](../classes/internal-BN.md) |
| `ptr` | [`BN`](../classes/internal-BN.md) |
| `type` | [`ReturnData`](internal.md#returndata) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:158](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L158)

___

### ReceiptRevert

Ƭ **ReceiptRevert**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `is` | [`BN`](../classes/internal-BN.md) |
| `pc` | [`BN`](../classes/internal-BN.md) |
| `type` | [`Revert`](internal.md#revert) |
| `val` | [`BN`](../classes/internal-BN.md) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:278](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L278)

___

### ReceiptScriptResult

Ƭ **ReceiptScriptResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `gasUsed` | [`BN`](../classes/internal-BN.md) |
| `result` | [`BN`](../classes/internal-BN.md) |
| `type` | [`ScriptResult`](internal.md#scriptresult) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:614](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L614)

___

### ReceiptTransfer

Ƭ **ReceiptTransfer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `assetId` | `string` |
| `from` | `string` |
| `is` | [`BN`](../classes/internal-BN.md) |
| `pc` | [`BN`](../classes/internal-BN.md) |
| `to` | `string` |
| `type` | [`Transfer`](internal.md#transfer) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:482](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L482)

___

### ReceiptTransferOut

Ƭ **ReceiptTransferOut**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `assetId` | `string` |
| `from` | `string` |
| `is` | [`BN`](../classes/internal-BN.md) |
| `pc` | [`BN`](../classes/internal-BN.md) |
| `to` | `string` |
| `type` | [`TransferOut`](internal.md#transferout) |

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

### ToFixedConfig

Ƭ **ToFixedConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `minPrecision?` | `number` |
| `precision?` | `number` |

#### Defined in

[packages/math/src/types.ts:4](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L4)

___

### Transaction

Ƭ **Transaction**: [`TransactionScript`](internal.md#transactionscript) \| [`TransactionCreate`](internal.md#transactioncreate)

#### Defined in

[packages/transactions/src/coders/transaction.ts:294](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L294)

___

### TransactionCost

Ƭ **TransactionCost**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fee` | [`BN`](../classes/internal-BN.md) |
| `gasPrice` | [`BN`](../classes/internal-BN.md) |
| `gasUsed` | [`BN`](../classes/internal-BN.md) |
| `minGasPrice` | [`BN`](../classes/internal-BN.md) |

#### Defined in

[packages/providers/src/provider.ts:95](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L95)

___

### TransactionCreate

Ƭ **TransactionCreate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bytecodeLength` | `number` |
| `bytecodeWitnessIndex` | `number` |
| `gasLimit` | [`BN`](../classes/internal-BN.md) |
| `gasPrice` | [`BN`](../classes/internal-BN.md) |
| `inputs` | [`Input`](internal.md#input)[] |
| `inputsCount` | `number` |
| `maturity` | `number` |
| `outputs` | [`Output`](internal.md#output)[] |
| `outputsCount` | `number` |
| `salt` | `string` |
| `storageSlots` | [`StorageSlot`](internal.md#storageslot)[] |
| `storageSlotsCount` | `number` |
| `type` | [`Create`](../enums/internal-TransactionType.md#create) |
| `witnesses` | [`Witness`](internal.md#witness)[] |
| `witnessesCount` | `number` |

#### Defined in

[packages/transactions/src/coders/transaction.ts:156](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L156)

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](../classes/internal-ScriptTransactionRequest.md) \| [`CreateTransactionRequest`](../classes/internal-CreateTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:538](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L538)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](internal.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](internal.md#contracttransactionrequestinput) \| [`MessageTransactionRequestInput`](internal.md#messagetransactionrequestinput)

#### Defined in

[packages/providers/src/transaction-request/input.ts:75](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L75)

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

| Name | Type |
| :------ | :------ |
| `blockId` | `any` |
| `receipts` | [`TransactionResultReceipt`](internal.md#transactionresultreceipt)[] |
| `status` | `TStatus` extends ``"success"`` ? { `programState`: `any` ; `type`: ``"success"``  } : { `reason`: `any` ; `type`: ``"failure"``  } |
| `time` | `any` |
| `transactionId` | `string` |

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:51](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L51)

___

### TransactionResultCallReceipt

Ƭ **TransactionResultCallReceipt**: [`ReceiptCall`](internal.md#receiptcall)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L28)

___

### TransactionResultLogDataReceipt

Ƭ **TransactionResultLogDataReceipt**: [`ReceiptLogData`](internal.md#receiptlogdata) & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L34)

___

### TransactionResultLogReceipt

Ƭ **TransactionResultLogReceipt**: [`ReceiptLog`](internal.md#receiptlog)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L33)

___

### TransactionResultPanicReceipt

Ƭ **TransactionResultPanicReceipt**: [`ReceiptPanic`](internal.md#receiptpanic)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L31)

___

### TransactionResultReceipt

Ƭ **TransactionResultReceipt**: [`TransactionResultCallReceipt`](internal.md#transactionresultcallreceipt) \| [`TransactionResultReturnReceipt`](internal.md#transactionresultreturnreceipt) \| [`TransactionResultReturnDataReceipt`](internal.md#transactionresultreturndatareceipt) \| [`TransactionResultPanicReceipt`](internal.md#transactionresultpanicreceipt) \| [`TransactionResultRevertReceipt`](internal.md#transactionresultrevertreceipt) \| [`TransactionResultLogReceipt`](internal.md#transactionresultlogreceipt) \| [`TransactionResultLogDataReceipt`](internal.md#transactionresultlogdatareceipt) \| [`TransactionResultTransferReceipt`](internal.md#transactionresulttransferreceipt) \| [`TransactionResultTransferOutReceipt`](internal.md#transactionresulttransferoutreceipt) \| [`TransactionResultScriptResultReceipt`](internal.md#transactionresultscriptresultreceipt)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L39)

___

### TransactionResultReturnDataReceipt

Ƭ **TransactionResultReturnDataReceipt**: [`ReceiptReturnData`](internal.md#receiptreturndata) & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L30)

___

### TransactionResultReturnReceipt

Ƭ **TransactionResultReturnReceipt**: [`ReceiptReturn`](internal.md#receiptreturn)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L29)

___

### TransactionResultRevertReceipt

Ƭ **TransactionResultRevertReceipt**: [`ReceiptRevert`](internal.md#receiptrevert)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L32)

___

### TransactionResultScriptResultReceipt

Ƭ **TransactionResultScriptResultReceipt**: [`ReceiptScriptResult`](internal.md#receiptscriptresult)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L37)

___

### TransactionResultTransferOutReceipt

Ƭ **TransactionResultTransferOutReceipt**: [`ReceiptTransferOut`](internal.md#receipttransferout)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L36)

___

### TransactionResultTransferReceipt

Ƭ **TransactionResultTransferReceipt**: [`ReceiptTransfer`](internal.md#receipttransfer)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L35)

___

### TransactionScript

Ƭ **TransactionScript**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `gasLimit` | [`BN`](../classes/internal-BN.md) |
| `gasPrice` | [`BN`](../classes/internal-BN.md) |
| `inputs` | [`Input`](internal.md#input)[] |
| `inputsCount` | `number` |
| `maturity` | `number` |
| `outputs` | [`Output`](internal.md#output)[] |
| `outputsCount` | `number` |
| `receiptsRoot` | `string` |
| `script` | `string` |
| `scriptData` | `string` |
| `scriptDataLength` | `number` |
| `scriptLength` | `number` |
| `type` | [`Script`](internal.md#script) |
| `witnesses` | [`Witness`](internal.md#witness)[] |
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

| Name | Type |
| :------ | :------ |
| `amount` | [`BigNumberish`](internal.md#bignumberish) |
| `assetId` | `BytesLike` |
| `to` | `BytesLike` |
| `type` | [`Withdrawal`](internal.md#withdrawal) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L23)

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
