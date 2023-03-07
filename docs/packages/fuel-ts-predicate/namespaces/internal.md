---
layout: default
title: internal
parent: "@fuel-ts/predicate"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/predicate](../index.md).internal

## Enumerations

- [GqlCoinStatus](../enums/internal-GqlCoinStatus.md)
- [GqlMessageStatus](../enums/internal-GqlMessageStatus.md)
- [GqlReturnType](../enums/internal-GqlReturnType.md)
- [TransactionType](../enums/internal-TransactionType.md)

## Classes

- [AbstractAccount](../classes/internal-AbstractAccount.md)
- [AbstractAddress](../classes/internal-AbstractAddress.md)
- [AbstractContract](../classes/internal-AbstractContract.md)
- [AbstractProgram](../classes/internal-AbstractProgram.md)
- [AbstractScriptRequest](../classes/internal-AbstractScriptRequest.md)
- [Account](../classes/internal-Account.md)
- [BN](../classes/internal-BN.md)
- [BaseTransactionRequest](../classes/internal-BaseTransactionRequest.md)
- [CreateTransactionRequest](../classes/internal-CreateTransactionRequest.md)
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
- [JsonAbiFunctionAttributeType](../interfaces/internal-JsonAbiFunctionAttributeType.md)
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

[packages/transactions/src/coders/receipt.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L10)

___

### Change

• **Change**: ``3``

#### Defined in

[packages/transactions/src/coders/output.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L10)

___

### Coin

• **Coin**: ``0``

#### Defined in

[packages/transactions/src/coders/input.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L15)

___

### Coin

• **Coin**: ``0``

#### Defined in

[packages/transactions/src/coders/output.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L7)

___

### Contract

• **Contract**: ``1``

#### Defined in

[packages/transactions/src/coders/input.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L16)

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

[packages/transactions/src/coders/transaction.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L21)

___

### Log

• **Log**: ``5``

#### Defined in

[packages/transactions/src/coders/receipt.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L15)

___

### LogData

• **LogData**: ``6``

#### Defined in

[packages/transactions/src/coders/receipt.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L16)

___

### Message

• **Message**: ``2``

#### Defined in

[packages/transactions/src/coders/input.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L17)

___

### Message

• **Message**: ``2``

#### Defined in

[packages/transactions/src/coders/output.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L9)

___

### MessageOut

• **MessageOut**: ``10``

#### Defined in

[packages/transactions/src/coders/receipt.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L20)

___

### Panic

• **Panic**: ``3``

#### Defined in

[packages/transactions/src/coders/receipt.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L13)

___

### Return

• **Return**: ``1``

#### Defined in

[packages/transactions/src/coders/receipt.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L11)

___

### ReturnData

• **ReturnData**: ``2``

#### Defined in

[packages/transactions/src/coders/receipt.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L12)

___

### Revert

• **Revert**: ``4``

#### Defined in

[packages/transactions/src/coders/receipt.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L14)

___

### Script

• **Script**: ``0``

#### Defined in

[packages/transactions/src/coders/transaction.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L20)

___

### ScriptResult

• **ScriptResult**: ``9``

#### Defined in

[packages/transactions/src/coders/receipt.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L19)

___

### Transfer

• **Transfer**: ``7``

#### Defined in

[packages/transactions/src/coders/receipt.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L17)

___

### TransferOut

• **TransferOut**: ``8``

#### Defined in

[packages/transactions/src/coders/receipt.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L18)

___

### Variable

• **Variable**: ``4``

#### Defined in

[packages/transactions/src/coders/output.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L11)

## Type Aliases

### AddressLike

Ƭ **AddressLike**: [`AbstractAddress`](../classes/internal-AbstractAddress.md) \| [`AbstractAccount`](../classes/internal-AbstractAccount.md)

#### Defined in

[packages/interfaces/src/index.ts:55](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L55)

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

[packages/providers/src/provider.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/provider.ts#L42)

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

[packages/providers/src/transaction-request/output.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L30)

___

### Coin

Ƭ **Coin**: `Object`

A Fuel coin

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `assetId` | `string` |
| `blockCreated` | [`BN`](../classes/internal-BN.md) |
| `id` | `string` |
| `maturity` | `number` |
| `owner` | [`AbstractAddress`](../classes/internal-AbstractAddress.md) |
| `status` | [`GqlCoinStatus`](../enums/internal-GqlCoinStatus.md) |

#### Defined in

[packages/providers/src/coin.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin.ts#L9)

___

### CoinQuantity

Ƭ **CoinQuantity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `assetId` | `string` |
| `max?` | [`BN`](../classes/internal-BN.md) |

#### Defined in

[packages/providers/src/coin-quantity.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/coin-quantity.ts#L10)

___

### CoinQuantityLike

Ƭ **CoinQuantityLike**: [amount: BigNumberish, assetId?: BytesLike, max?: BigNumberish] \| { `amount`: [`BigNumberish`](internal.md#bignumberish) ; `assetId?`: `BytesLike` ; `max?`: [`BigNumberish`](internal.md#bignumberish)  }

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
| `maturity?` | `number` | UTXO being spent must have been created at least this many blocks ago |
| `owner` | `BytesLike` | Owning address or script hash |
| `predicate?` | `BytesLike` | Predicate bytecode |
| `predicateData?` | `BytesLike` | Predicate input data (parameters) |
| `txPointer` | `BytesLike` | Points to the TX whose output is being spent. (TxPointer) |
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

### CompareResult

Ƭ **CompareResult**: ``-1`` \| ``0`` \| ``1``

#### Defined in

[packages/math/src/bn.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L7)

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

[packages/providers/src/transaction-request/output.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L40)

___

### ContractIdLike

Ƭ **ContractIdLike**: [`AbstractAddress`](../classes/internal-AbstractAddress.md) \| [`AbstractContract`](../classes/internal-AbstractContract.md)

#### Defined in

[packages/interfaces/src/index.ts:57](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L57)

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

[packages/providers/src/transaction-request/input.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L66)

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

### ExcludeResourcesOption

Ƭ **ExcludeResourcesOption**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `messages?` | `BytesLike`[] |
| `utxos?` | `BytesLike`[] |

#### Defined in

[packages/providers/src/resource.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/resource.ts#L36)

___

### FormatConfig

Ƭ **FormatConfig**: { `units?`: `number`  } & [`ToFixedConfig`](internal.md#tofixedconfig)

#### Defined in

[packages/math/src/types.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L8)

___

### Input

Ƭ **Input**: [`InputCoin`](internal.md#inputcoin) \| [`InputContract`](internal.md#inputcontract) \| [`InputMessage`](internal.md#inputmessage)

#### Defined in

[packages/transactions/src/coders/input.ts:324](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L324)

___

### InputCoin

Ƭ **InputCoin**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) | Amount of coins (u64) |
| `assetId` | `string` | Asset ID of the coins (b256) |
| `maturity` | `number` | UTXO being spent must have been created at least this many blocks ago (u32) |
| `owner` | `string` | Owning address or script hash (b256) |
| `predicate` | `string` | Predicate bytecode (byte[]) |
| `predicateData` | `string` | Predicate input data (parameters) (byte[]) |
| `predicateDataLength` | `number` | Length of predicate input data, in bytes (u16) |
| `predicateLength` | `number` | Length of predicate, in instructions (u16) |
| `txPointer` | [`TxPointer`](internal.md#txpointer) | Points to the TX whose output is being spent. (TxPointer) |
| `type` | [`Coin`](internal.md#coin) | - |
| `utxoID` | [`UtxoId`](internal.md#utxoid) | UTXO ID (UtxoId) |
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
| `txPointer` | [`TxPointer`](internal.md#txpointer) | Points to the TX whose output is being spent. (TxPointer) |
| `type` | [`Contract`](internal.md#contract) | - |
| `utxoID` | [`UtxoId`](internal.md#utxoid) | UTXO ID (UtxoId) |

#### Defined in

[packages/transactions/src/coders/input.ts:131](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L131)

___

### InputMessage

Ƭ **InputMessage**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) | Amount of coins |
| `data` | `string` | data of message |
| `dataLength` | `number` | Length of predicate, in instructions (u16) |
| `nonce` | [`BN`](../classes/internal-BN.md) | Unique nonce of message |
| `predicate` | `string` | Predicate bytecode (byte[]) |
| `predicateData` | `string` | Predicate input data (parameters) (byte[]) |
| `predicateDataLength` | `number` | Length of predicate input data, in bytes (u16) |
| `predicateLength` | `number` | Length of predicate, in instructions (u16) |
| `recipient` | `string` | Address of sender |
| `sender` | `string` | Address of sender |
| `type` | [`Message`](internal.md#message) | - |
| `witnessIndex` | `number` | Index of witness that authorizes message (u8) |

#### Defined in

[packages/transactions/src/coders/input.ts:196](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L196)

___

### InputValue

Ƭ **InputValue**<`T`\>: [`Primitive`](internal.md#primitive) \| [`BN`](../classes/internal-BN.md) \| [`Option`](internal.md#option)<`T`\> \| `BytesLike` \| [`InputValue`](internal.md#inputvalue)[] \| { `[key: string]`: [`InputValue`](internal.md#inputvalue);  } \| `Record`<`string`, [`Primitive`](internal.md#primitive) \| `BytesLike`\>

The type of value you can provide to `Coder.encode`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `void` |

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L15)

___

### JsonAbi

Ƭ **JsonAbi**: `ReadonlyArray`<[`JsonAbiFragment`](../interfaces/internal-JsonAbiFragment.md)\> \| [`JsonFlatAbi`](../interfaces/internal-JsonFlatAbi.md)

A JSON ABI object

#### Defined in

[packages/abi-coder/src/json-abi.ts:78](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/json-abi.ts#L78)

___

### Message

Ƭ **Message**: `Object`

A Fuel message

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `daHeight` | [`BN`](../classes/internal-BN.md) |
| `data` | `BytesLike` |
| `nonce` | [`BN`](../classes/internal-BN.md) |
| `recipient` | [`AbstractAddress`](../classes/internal-AbstractAddress.md) |
| `sender` | [`AbstractAddress`](../classes/internal-AbstractAddress.md) |
| `status` | [`GqlMessageStatus`](../enums/internal-GqlMessageStatus.md) |

#### Defined in

[packages/providers/src/message.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/message.ts#L11)

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

[packages/providers/src/transaction-request/input.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L39)

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

[packages/providers/src/transaction-request/output.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L23)

___

### Option

Ƭ **Option**<`T`\>: `T` \| `undefined`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/abi-coder/src/coders/option.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/option.ts#L6)

___

### Output

Ƭ **Output**: [`OutputCoin`](internal.md#outputcoin) \| [`OutputContract`](internal.md#outputcontract) \| [`OutputMessage`](internal.md#outputmessage) \| [`OutputChange`](internal.md#outputchange) \| [`OutputVariable`](internal.md#outputvariable) \| [`OutputContractCreated`](internal.md#outputcontractcreated)

#### Defined in

[packages/transactions/src/coders/output.ts:294](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L294)

___

### OutputChange

Ƭ **OutputChange**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) | Amount of coins to send (u64) |
| `assetId` | `string` | Asset ID of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Change`](internal.md#change) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:153](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L153)

___

### OutputCoin

Ƭ **OutputCoin**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) | Amount of coins to send (u64) |
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

[packages/transactions/src/coders/output.ts:249](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L249)

___

### OutputMessage

Ƭ **OutputMessage**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) | Amount of coins to send with message (u64) |
| `recipient` | `string` | Receiving address (b256) |
| `type` | [`Message`](internal.md#message-1) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:111](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L111)

___

### OutputVariable

Ƭ **OutputVariable**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) | Amount of coins to send (u64) |
| `assetId` | `string` | Asset ID of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Variable`](internal.md#variable) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:201](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L201)

___

### PossibleTransactions

Ƭ **PossibleTransactions**: [`TransactionScript`](internal.md#transactionscript) \| [`TransactionCreate`](internal.md#transactioncreate) \| [`TransactionMint`](internal.md#transactionmint)

#### Defined in

[packages/transactions/src/coders/transaction.ts:347](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L347)

___

### Primitive

Ƭ **Primitive**: `string` \| `number` \| `boolean`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L10)

___

### ReceiptCall

Ƭ **ReceiptCall**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) | Amount of coins to forward, i.e. $rB (u64) |
| `assetId` | `string` | Asset ID of coins to forward, i.e. MEM[$rC, 32] (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `gas` | [`BN`](../classes/internal-BN.md) | Gas to forward, i.e. $rD (u64) |
| `is` | [`BN`](../classes/internal-BN.md) | Value of register $is (u64) |
| `param1` | [`BN`](../classes/internal-BN.md) | First parameter (u64) |
| `param2` | [`BN`](../classes/internal-BN.md) | Second parameter (u64) |
| `pc` | [`BN`](../classes/internal-BN.md) | Value of register $pc (u64) |
| `to` | `string` | Contract ID of called contract (b256) |
| `type` | [`Call`](internal.md#call) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L23)

___

### ReceiptLog

Ƭ **ReceiptLog**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](../classes/internal-BN.md) | Value of register $is (u64) |
| `pc` | [`BN`](../classes/internal-BN.md) | Value of register $pc (u64) |
| `type` | [`Log`](internal.md#log) | - |
| `val0` | [`BN`](../classes/internal-BN.md) | Value of register $rA (u64) |
| `val1` | [`BN`](../classes/internal-BN.md) | Value of register $rB (u64) |
| `val2` | [`BN`](../classes/internal-BN.md) | Value of register $rC (u64) |
| `val3` | [`BN`](../classes/internal-BN.md) | Value of register $rD (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:341](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L341)

___

### ReceiptLogData

Ƭ **ReceiptLogData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `digest` | `string` | Hash of MEM[$rC, $rD] (b256) |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](../classes/internal-BN.md) | Value of register $is (u64) |
| `len` | [`BN`](../classes/internal-BN.md) | Value of register $rD (u64) |
| `pc` | [`BN`](../classes/internal-BN.md) | Value of register $pc (u64) |
| `ptr` | [`BN`](../classes/internal-BN.md) | Value of register $rC (u64) |
| `type` | [`LogData`](internal.md#logdata) | - |
| `val0` | [`BN`](../classes/internal-BN.md) | Value of register $rA (u64) |
| `val1` | [`BN`](../classes/internal-BN.md) | Value of register $rB (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:413](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L413)

___

### ReceiptMessageOut

Ƭ **ReceiptMessageOut**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) | Hexadecimal string representation of a 64-bit unsigned integer; value of register $rD |
| `data` | `Uint8Array` | Hexadecimal string representation of the value of the memory range MEM[$rA + 32, $rB] |
| `digest` | `string` | Hexadecimal string representation of 256-bit (32-byte), hash of MEM[$rA + 32, $rB] |
| `messageID` | `string` | Hexadecimal string representation of the 256-bit (32-byte) message ID |
| `nonce` | `string` | Hexadecimal string representation of the 256-bit (32-byte) message nonce |
| `recipient` | `string` | Hexadecimal string representation of the 256-bit (32-byte) address of the message recipient: MEM[$rA, 32] |
| `sender` | `string` | Hexadecimal string representation of the 256-bit (32-byte) address of the message sender: MEM[$fp, 32] |
| `type` | [`MessageOut`](internal.md#messageout) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:665](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L665)

___

### ReceiptPanic

Ƭ **ReceiptPanic**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `string` | Value of optional contract ID |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](../classes/internal-BN.md) | Value of register $is (u64) |
| `pc` | [`BN`](../classes/internal-BN.md) | Value of register $pc (u64) |
| `reason` | [`BN`](../classes/internal-BN.md) | Panic reason (u64) |
| `type` | [`Panic`](internal.md#panic) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:227](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L227)

___

### ReceiptReturn

Ƭ **ReceiptReturn**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](../classes/internal-BN.md) | Value of register $is (u64) |
| `pc` | [`BN`](../classes/internal-BN.md) | Value of register $pc (u64) |
| `type` | [`Return`](internal.md#return) | - |
| `val` | [`BN`](../classes/internal-BN.md) | Value of register $rA (u64) |

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
| `is` | [`BN`](../classes/internal-BN.md) | Value of register $is (u64) |
| `len` | [`BN`](../classes/internal-BN.md) | Value of register $rB (u64) |
| `pc` | [`BN`](../classes/internal-BN.md) | Value of register $pc (u64) |
| `ptr` | [`BN`](../classes/internal-BN.md) | Value of register $rA (u64) |
| `type` | [`ReturnData`](internal.md#returndata) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:161](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L161)

___

### ReceiptRevert

Ƭ **ReceiptRevert**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](../classes/internal-BN.md) | Value of register $is (u64) |
| `pc` | [`BN`](../classes/internal-BN.md) | Value of register $pc (u64) |
| `type` | [`Revert`](internal.md#revert) | - |
| `val` | [`BN`](../classes/internal-BN.md) | Value of register $rA (u64) |

#### Defined in

[packages/transactions/src/coders/receipt.ts:287](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L287)

___

### ReceiptScriptResult

Ƭ **ReceiptScriptResult**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `gasUsed` | [`BN`](../classes/internal-BN.md) | Gas consumed by the script (u64) |
| `result` | [`BN`](../classes/internal-BN.md) | Result variant with embedded `PanicReason` in first 8 bits and `instr` (u64) |
| `type` | [`ScriptResult`](internal.md#scriptresult) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:623](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L623)

___

### ReceiptTransfer

Ƭ **ReceiptTransfer**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) | Amount of coins transferred (u64) |
| `assetId` | `string` | Asset ID of coins transferred (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](../classes/internal-BN.md) | Value of register $is (u64) |
| `pc` | [`BN`](../classes/internal-BN.md) | Value of register $pc (u64) |
| `to` | `string` | Contract ID of contract to transfer coins to (b256) |
| `type` | [`Transfer`](internal.md#transfer) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:491](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L491)

___

### ReceiptTransferOut

Ƭ **ReceiptTransferOut**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) | Amount of coins transferred (u64) |
| `assetId` | `string` | Asset ID of coins transferred (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | [`BN`](../classes/internal-BN.md) | Value of register $is (u64) |
| `pc` | [`BN`](../classes/internal-BN.md) | Value of register $pc (u64) |
| `to` | `string` | Address to transfer coins to (b256) |
| `type` | [`TransferOut`](internal.md#transferout) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:557](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L557)

___

### Resource

Ƭ **Resource**: [`Coin`](internal.md#coin-2) \| [`Message`](internal.md#message-2)

#### Defined in

[packages/providers/src/resource.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/resource.ts#L32)

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

Ƭ **Transaction**<`TTransactionType`\>: `TTransactionType` extends [`TransactionType`](../enums/internal-TransactionType.md) ? `Extract`<[`PossibleTransactions`](internal.md#possibletransactions), { `type`: `TTransactionType`  }\> : `Partial`<`Omit`<[`TransactionScript`](internal.md#transactionscript), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionCreate`](internal.md#transactioncreate), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionMint`](internal.md#transactionmint), ``"type"``\>\> & { `type`: [`TransactionType`](../enums/internal-TransactionType.md)  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Defined in

[packages/transactions/src/coders/transaction.ts:348](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L348)

___

### TransactionCreate

Ƭ **TransactionCreate**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytecodeLength` | `number` | Contract bytecode length, in instructions (u16) |
| `bytecodeWitnessIndex` | `number` | Witness index of contract bytecode to create (u8) |
| `gasLimit` | [`BN`](../classes/internal-BN.md) | Gas limit for transaction (u64) |
| `gasPrice` | [`BN`](../classes/internal-BN.md) | Gas price for transaction (u64) |
| `inputs` | [`Input`](internal.md#input)[] | List of inputs (Input[]) |
| `inputsCount` | `number` | Number of inputs (u8) |
| `maturity` | `number` | Block until which tx cannot be included (u32) |
| `outputs` | [`Output`](internal.md#output)[] | List of outputs (Output[]) |
| `outputsCount` | `number` | Number of outputs (u8) |
| `salt` | `string` | Salt (b256) |
| `storageSlots` | [`StorageSlot`](internal.md#storageslot)[] | List of inputs (StorageSlot[]) |
| `storageSlotsCount` | `number` | Number of storage slots to initialize (u16) |
| `type` | [`Create`](internal.md#create) | - |
| `witnesses` | [`Witness`](internal.md#witness)[] | List of witnesses (Witness[]) |
| `witnessesCount` | `number` | Number of witnesses (u8) |

#### Defined in

[packages/transactions/src/coders/transaction.ts:159](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L159)

___

### TransactionMint

Ƭ **TransactionMint**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputs` | [`Output`](internal.md#output)[] | List of outputs (Output[]) |
| `outputsCount` | `number` | Number of outputs (u8) |
| `txPointer` | [`TxPointer`](internal.md#txpointer) | The location of the Mint transaction in the block. |
| `type` | [`Mint`](../enums/internal-TransactionType.md#mint) | - |

#### Defined in

[packages/transactions/src/coders/transaction.ts:297](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L297)

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](../classes/internal-ScriptTransactionRequest.md) \| [`CreateTransactionRequest`](../classes/internal-CreateTransactionRequest.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:576](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L576)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](internal.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](internal.md#contracttransactionrequestinput) \| [`MessageTransactionRequestInput`](internal.md#messagetransactionrequestinput)

#### Defined in

[packages/providers/src/transaction-request/input.ts:75](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/input.ts#L75)

___

### TransactionRequestLike

Ƭ **TransactionRequestLike**: { `type`: [`Script`](internal.md#script)  } & [`ScriptTransactionRequestLike`](../interfaces/internal-ScriptTransactionRequestLike.md) \| { `type`: [`Create`](internal.md#create)  } & [`CreateTransactionRequestLike`](../interfaces/internal-CreateTransactionRequestLike.md)

#### Defined in

[packages/providers/src/transaction-request/transaction-request.ts:577](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/transaction-request.ts#L577)

___

### TransactionRequestOutput

Ƭ **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](internal.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](internal.md#contracttransactionrequestoutput) \| [`MessageTransactionRequestOutput`](internal.md#messagetransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](internal.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](internal.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](internal.md#contractcreatedtransactionrequestoutput)

#### Defined in

[packages/providers/src/transaction-request/output.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L47)

___

### TransactionRequestStorageSlot

Ƭ **TransactionRequestStorageSlot**: { `key`: `BytesLike` ; `value`: `BytesLike`  } \| [key: BytesLike, value: BytesLike]

#### Defined in

[packages/providers/src/transaction-request/storage-slot.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/storage-slot.ts#L5)

___

### TransactionResult

Ƭ **TransactionResult**<`TStatus`, `TTransactionType`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TStatus` | extends ``"success"`` \| ``"failure"`` |
| `TTransactionType` | `void` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockId` | `any` | - |
| `fee` | [`BN`](../classes/internal-BN.md) | - |
| `gasUsed` | [`BN`](../classes/internal-BN.md) | - |
| `receipts` | [`TransactionResultReceipt`](internal.md#transactionresultreceipt)[] | Receipts produced during the execution of the transaction |
| `status` | `TStatus` extends ``"success"`` ? { `programState`: `any` ; `type`: ``"success"``  } : { `reason`: `any` ; `type`: ``"failure"``  } | - |
| `time` | `any` | - |
| `transaction` | [`Transaction`](internal.md#transaction)<`TTransactionType`\> | - |
| `transactionId` | `string` | - |

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:54](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L54)

___

### TransactionResultCallReceipt

Ƭ **TransactionResultCallReceipt**: [`ReceiptCall`](internal.md#receiptcall)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L29)

___

### TransactionResultLogDataReceipt

Ƭ **TransactionResultLogDataReceipt**: [`ReceiptLogData`](internal.md#receiptlogdata) & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L35)

___

### TransactionResultLogReceipt

Ƭ **TransactionResultLogReceipt**: [`ReceiptLog`](internal.md#receiptlog)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L34)

___

### TransactionResultMessageOutReceipt

Ƭ **TransactionResultMessageOutReceipt**: [`ReceiptMessageOut`](internal.md#receiptmessageout)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L39)

___

### TransactionResultPanicReceipt

Ƭ **TransactionResultPanicReceipt**: [`ReceiptPanic`](internal.md#receiptpanic)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L32)

___

### TransactionResultReceipt

Ƭ **TransactionResultReceipt**: [`TransactionResultCallReceipt`](internal.md#transactionresultcallreceipt) \| [`TransactionResultReturnReceipt`](internal.md#transactionresultreturnreceipt) \| [`TransactionResultReturnDataReceipt`](internal.md#transactionresultreturndatareceipt) \| [`TransactionResultPanicReceipt`](internal.md#transactionresultpanicreceipt) \| [`TransactionResultRevertReceipt`](internal.md#transactionresultrevertreceipt) \| [`TransactionResultLogReceipt`](internal.md#transactionresultlogreceipt) \| [`TransactionResultLogDataReceipt`](internal.md#transactionresultlogdatareceipt) \| [`TransactionResultTransferReceipt`](internal.md#transactionresulttransferreceipt) \| [`TransactionResultTransferOutReceipt`](internal.md#transactionresulttransferoutreceipt) \| [`TransactionResultScriptResultReceipt`](internal.md#transactionresultscriptresultreceipt) \| [`TransactionResultMessageOutReceipt`](internal.md#transactionresultmessageoutreceipt)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L41)

___

### TransactionResultReturnDataReceipt

Ƭ **TransactionResultReturnDataReceipt**: [`ReceiptReturnData`](internal.md#receiptreturndata) & { `data`: `string`  }

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L31)

___

### TransactionResultReturnReceipt

Ƭ **TransactionResultReturnReceipt**: [`ReceiptReturn`](internal.md#receiptreturn)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L30)

___

### TransactionResultRevertReceipt

Ƭ **TransactionResultRevertReceipt**: [`ReceiptRevert`](internal.md#receiptrevert)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L33)

___

### TransactionResultScriptResultReceipt

Ƭ **TransactionResultScriptResultReceipt**: [`ReceiptScriptResult`](internal.md#receiptscriptresult)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L38)

___

### TransactionResultTransferOutReceipt

Ƭ **TransactionResultTransferOutReceipt**: [`ReceiptTransferOut`](internal.md#receipttransferout)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L37)

___

### TransactionResultTransferReceipt

Ƭ **TransactionResultTransferReceipt**: [`ReceiptTransfer`](internal.md#receipttransfer)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L36)

___

### TransactionScript

Ƭ **TransactionScript**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `gasLimit` | [`BN`](../classes/internal-BN.md) | Gas limit for transaction (u64) |
| `gasPrice` | [`BN`](../classes/internal-BN.md) | Gas price for transaction (u64) |
| `inputs` | [`Input`](internal.md#input)[] | List of inputs (Input[]) |
| `inputsCount` | `number` | Number of inputs (u8) |
| `maturity` | `number` | Block until which tx cannot be included (u32) |
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

[packages/transactions/src/coders/transaction.ts:25](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L25)

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

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | [`Variable`](internal.md#variable) |

#### Defined in

[packages/providers/src/transaction-request/output.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/output.ts#L37)

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
