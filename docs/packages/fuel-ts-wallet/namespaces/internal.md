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
- [GqlMessageStatus](../enums/internal-GqlMessageStatus.md)
- [GqlReturnType](../enums/internal-GqlReturnType.md)
- [TransactionType](../enums/internal-TransactionType.md)

## Classes

- [AbstractAccount](../classes/internal-AbstractAccount.md)
- [AbstractAddress](../classes/internal-AbstractAddress.md)
- [AbstractContract](../classes/internal-AbstractContract.md)
- [AbstractProgram](../classes/internal-AbstractProgram.md)
- [AbstractScriptRequest](../classes/internal-AbstractScriptRequest.md)
- [Address](../classes/internal-Address.md)
- [BN](../classes/internal-BN.md)
- [BaseTransactionRequest](../classes/internal-BaseTransactionRequest.md)
- [CreateTransactionRequest](../classes/internal-CreateTransactionRequest.md)
- [Provider](../classes/internal-Provider.md)
- [ScriptTransactionRequest](../classes/internal-ScriptTransactionRequest.md)
- [Signer](../classes/internal-Signer.md)
- [TransactionResponse](../classes/internal-TransactionResponse.md)

## Interfaces

- [BNHelper](../interfaces/internal-BNHelper.md)
- [BNHiddenTypes](../interfaces/internal-BNHiddenTypes.md)
- [BNInputOverrides](../interfaces/internal-BNInputOverrides.md)
- [BNOverrides](../interfaces/internal-BNOverrides.md)
- [BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md)
- [CreateTransactionRequestLike](../interfaces/internal-CreateTransactionRequestLike.md)
- [GenerateOptions](../interfaces/internal-GenerateOptions.md)
- [ScriptTransactionRequestLike](../interfaces/internal-ScriptTransactionRequestLike.md)

## Enumeration Members

### Call

• **Call**: ``0``

#### Defined in

packages/transactions/dist/index.d.ts:219

___

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

### Log

• **Log**: ``5``

#### Defined in

packages/transactions/dist/index.d.ts:224

___

### LogData

• **LogData**: ``6``

#### Defined in

packages/transactions/dist/index.d.ts:225

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

### MessageOut

• **MessageOut**: ``10``

#### Defined in

packages/transactions/dist/index.d.ts:229

___

### Panic

• **Panic**: ``3``

#### Defined in

packages/transactions/dist/index.d.ts:222

___

### Return

• **Return**: ``1``

#### Defined in

packages/transactions/dist/index.d.ts:220

___

### ReturnData

• **ReturnData**: ``2``

#### Defined in

packages/transactions/dist/index.d.ts:221

___

### Revert

• **Revert**: ``4``

#### Defined in

packages/transactions/dist/index.d.ts:223

___

### Script

• **Script**: ``0``

#### Defined in

packages/transactions/dist/index.d.ts:480

___

### ScriptResult

• **ScriptResult**: ``9``

#### Defined in

packages/transactions/dist/index.d.ts:228

___

### Transfer

• **Transfer**: ``7``

#### Defined in

packages/transactions/dist/index.d.ts:226

___

### TransferOut

• **TransferOut**: ``8``

#### Defined in

packages/transactions/dist/index.d.ts:227

___

### Variable

• **Variable**: ``4``

#### Defined in

packages/transactions/dist/index.d.ts:128

## Type Aliases

### AddressLike

Ƭ **AddressLike**: [`AbstractAddress`](../classes/internal-AbstractAddress.md) \| [`AbstractAccount`](../classes/internal-AbstractAccount.md)

#### Defined in

packages/interfaces/dist/index.d.ts:41

___

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

### Block

Ƭ **Block**: `Object`

A Fuel block

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | [`BN`](../classes/internal-BN.md) |
| `id` | `string` |
| `time` | `string` |
| `transactionIds` | `string`[] |

#### Defined in

packages/providers/dist/index.d.ts:1112

___

### CallResult

Ƭ **CallResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](internal.md#transactionresultreceipt)[] |

#### Defined in

packages/providers/dist/index.d.ts:1106

___

### ChainInfo

Ƭ **ChainInfo**: `Object`

Chain information

#### Type declaration

| Name | Type |
| :------ | :------ |
| `baseChainHeight` | [`BN`](../classes/internal-BN.md) |
| `consensusParameters` | { `contractMaxSize`: [`BN`](../classes/internal-BN.md) ; `gasPerByte`: [`BN`](../classes/internal-BN.md) ; `gasPriceFactor`: [`BN`](../classes/internal-BN.md) ; `maxGasPerTx`: [`BN`](../classes/internal-BN.md) ; `maxInputs`: [`BN`](../classes/internal-BN.md) ; `maxMessageDataLength`: [`BN`](../classes/internal-BN.md) ; `maxOutputs`: [`BN`](../classes/internal-BN.md) ; `maxPredicateDataLength`: [`BN`](../classes/internal-BN.md) ; `maxPredicateLength`: [`BN`](../classes/internal-BN.md) ; `maxScriptDataLength`: [`BN`](../classes/internal-BN.md) ; `maxScriptLength`: [`BN`](../classes/internal-BN.md) ; `maxStorageSlots`: [`BN`](../classes/internal-BN.md) ; `maxWitnesses`: [`BN`](../classes/internal-BN.md)  } |
| `consensusParameters.contractMaxSize` | [`BN`](../classes/internal-BN.md) |
| `consensusParameters.gasPerByte` | [`BN`](../classes/internal-BN.md) |
| `consensusParameters.gasPriceFactor` | [`BN`](../classes/internal-BN.md) |
| `consensusParameters.maxGasPerTx` | [`BN`](../classes/internal-BN.md) |
| `consensusParameters.maxInputs` | [`BN`](../classes/internal-BN.md) |
| `consensusParameters.maxMessageDataLength` | [`BN`](../classes/internal-BN.md) |
| `consensusParameters.maxOutputs` | [`BN`](../classes/internal-BN.md) |
| `consensusParameters.maxPredicateDataLength` | [`BN`](../classes/internal-BN.md) |
| `consensusParameters.maxPredicateLength` | [`BN`](../classes/internal-BN.md) |
| `consensusParameters.maxScriptDataLength` | [`BN`](../classes/internal-BN.md) |
| `consensusParameters.maxScriptLength` | [`BN`](../classes/internal-BN.md) |
| `consensusParameters.maxStorageSlots` | [`BN`](../classes/internal-BN.md) |
| `consensusParameters.maxWitnesses` | [`BN`](../classes/internal-BN.md) |
| `latestBlock` | { `height`: [`BN`](../classes/internal-BN.md) ; `id`: `string` ; `time`: `string` ; `transactions`: { `id`: `string`  }[]  } |
| `latestBlock.height` | [`BN`](../classes/internal-BN.md) |
| `latestBlock.id` | `string` |
| `latestBlock.time` | `string` |
| `latestBlock.transactions` | { `id`: `string`  }[] |
| `name` | `string` |
| `peerCount` | `number` |

#### Defined in

packages/providers/dist/index.d.ts:1128

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

packages/providers/dist/index.d.ts:711

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

packages/providers/dist/index.d.ts:16

___

### CoinQuantityLike

Ƭ **CoinQuantityLike**: [amount: BigNumberish, assetId?: BytesLike, max?: BigNumberish] \| { `amount`: [`BigNumberish`](internal.md#bignumberish) ; `assetId?`: `BytesLike` ; `max?`: [`BigNumberish`](internal.md#bignumberish)  }

#### Defined in

packages/providers/dist/index.d.ts:11

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

### ContractIdLike

Ƭ **ContractIdLike**: [`AbstractAddress`](../classes/internal-AbstractAddress.md) \| [`AbstractContract`](../classes/internal-AbstractContract.md)

#### Defined in

packages/interfaces/dist/index.d.ts:42

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

packages/providers/dist/index.d.ts:1121

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

packages/providers/dist/index.d.ts:1174

___

### Exact

Ƭ **Exact**<`T`\>: { [K in keyof T]: T[K] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Defined in

packages/providers/dist/index.d.ts:25

___

### ExcludeResourcesOption

Ƭ **ExcludeResourcesOption**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `messages?` | `BytesLike`[] |
| `utxos?` | `BytesLike`[] |

#### Defined in

packages/providers/dist/index.d.ts:780

___

### FetchRequestOptions

Ƭ **FetchRequestOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `body` | `string` |
| `headers` | { `[key: string]`: `string`;  } |
| `method` | ``"POST"`` |

#### Defined in

packages/providers/dist/index.d.ts:1187

___

### FormatConfig

Ƭ **FormatConfig**: { `units?`: `number`  } & [`ToFixedConfig`](internal.md#tofixedconfig)

#### Defined in

packages/math/dist/index.d.ts:8

___

### GqlBalanceFilterInput

Ƭ **GqlBalanceFilterInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`Scalars`](internal.md#scalars)[``"Address"``] | Filter coins based on the `owner` field |

#### Defined in

packages/providers/dist/index.d.ts:52

___

### GqlCoinFilterInput

Ƭ **GqlCoinFilterInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId?` | [`InputMaybe`](internal.md#inputmaybe)<[`Scalars`](internal.md#scalars)[``"AssetId"``]\> | Returns coins only with `asset_id`. |
| `owner` | [`Scalars`](internal.md#scalars)[``"Address"``] | Returns coins owned by the `owner`. |

#### Defined in

packages/providers/dist/index.d.ts:56

___

### GqlDryRunMutation

Ƭ **GqlDryRunMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `dryRun` | { `__typename`: ``"Receipt"`` ; `data?`: `string` \| ``null`` ; `rawPayload`: `string`  }[] |

#### Defined in

packages/providers/dist/index.d.ts:632

___

### GqlEndSessionMutation

Ƭ **GqlEndSessionMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `endSession` | `boolean` |

#### Defined in

packages/providers/dist/index.d.ts:660

___

### GqlExcludeInput

Ƭ **GqlExcludeInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `messages` | [`Scalars`](internal.md#scalars)[``"MessageId"``][] | Messages to exclude from the selection. |
| `utxos` | [`Scalars`](internal.md#scalars)[``"UtxoId"``][] | Utxos to exclude from the selection. |

#### Defined in

packages/providers/dist/index.d.ts:66

___

### GqlExecuteMutation

Ƭ **GqlExecuteMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `execute` | `boolean` |

#### Defined in

packages/providers/dist/index.d.ts:668

___

### GqlGetBalanceQuery

Ƭ **GqlGetBalanceQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `balance` | { `__typename`: ``"Balance"`` ; `amount`: `string` ; `assetId`: `string` ; `owner`: `string`  } |
| `balance.__typename` | ``"Balance"`` |
| `balance.amount` | `string` |
| `balance.assetId` | `string` |
| `balance.owner` | `string` |

#### Defined in

packages/providers/dist/index.d.ts:540

___

### GqlGetBalancesQuery

Ƭ **GqlGetBalancesQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `balances` | { `__typename`: ``"BalanceConnection"`` ; `edges`: { `__typename`: ``"BalanceEdge"`` ; `node`: { `__typename`: ``"Balance"`` ; `amount`: `string` ; `assetId`: `string` ; `owner`: `string`  }  }[]  } |
| `balances.__typename` | ``"BalanceConnection"`` |
| `balances.edges` | { `__typename`: ``"BalanceEdge"`` ; `node`: { `__typename`: ``"Balance"`` ; `amount`: `string` ; `assetId`: `string` ; `owner`: `string`  }  }[] |

#### Defined in

packages/providers/dist/index.d.ts:556

___

### GqlGetBlockQuery

Ƭ **GqlGetBlockQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `block?` | { `__typename`: ``"Block"`` ; `header`: { `__typename`: ``"Header"`` ; `height`: `string` ; `time`: `any`  } ; `id`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  } \| ``null`` |

#### Defined in

packages/providers/dist/index.d.ts:347

___

### GqlGetBlockWithTransactionsQuery

Ƭ **GqlGetBlockWithTransactionsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `block?` | { `__typename`: ``"Block"`` ; `header`: { `__typename`: ``"Header"`` ; `height`: `string` ; `time`: `any`  } ; `id`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `gasPrice?`: `string` \| ``null`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } \| ``null`` ; `time`: `any` ; `type`: ``"SuccessStatus"``  } \| ``null``  }[]  } \| ``null`` |

#### Defined in

packages/providers/dist/index.d.ts:367

___

### GqlGetBlocksQuery

Ƭ **GqlGetBlocksQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `blocks` | { `__typename`: ``"BlockConnection"`` ; `edges`: { `__typename`: ``"BlockEdge"`` ; `node`: { `__typename`: ``"Block"`` ; `header`: { `__typename`: ``"Header"`` ; `height`: `string` ; `time`: `any`  } ; `id`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  }  }[]  } |
| `blocks.__typename` | ``"BlockConnection"`` |
| `blocks.edges` | { `__typename`: ``"BlockEdge"`` ; `node`: { `__typename`: ``"Block"`` ; `header`: { `__typename`: ``"Header"`` ; `height`: `string` ; `time`: `any`  } ; `id`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  }  }[] |

#### Defined in

packages/providers/dist/index.d.ts:421

___

### GqlGetChainQuery

Ƭ **GqlGetChainQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `chain` | { `__typename`: ``"ChainInfo"`` ; `baseChainHeight`: `string` ; `consensusParameters`: { `__typename`: ``"ConsensusParameters"`` ; `contractMaxSize`: `string` ; `gasPerByte`: `string` ; `gasPriceFactor`: `string` ; `maxGasPerTx`: `string` ; `maxInputs`: `string` ; `maxMessageDataLength`: `string` ; `maxOutputs`: `string` ; `maxPredicateDataLength`: `string` ; `maxPredicateLength`: `string` ; `maxScriptDataLength`: `string` ; `maxScriptLength`: `string` ; `maxStorageSlots`: `string` ; `maxWitnesses`: `string`  } ; `latestBlock`: { `__typename`: ``"Block"`` ; `header`: { `__typename`: ``"Header"`` ; `height`: `string` ; `time`: `any`  } ; `id`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  } ; `name`: `string` ; `peerCount`: `number`  } |
| `chain.__typename` | ``"ChainInfo"`` |
| `chain.baseChainHeight` | `string` |
| `chain.consensusParameters` | { `__typename`: ``"ConsensusParameters"`` ; `contractMaxSize`: `string` ; `gasPerByte`: `string` ; `gasPriceFactor`: `string` ; `maxGasPerTx`: `string` ; `maxInputs`: `string` ; `maxMessageDataLength`: `string` ; `maxOutputs`: `string` ; `maxPredicateDataLength`: `string` ; `maxPredicateLength`: `string` ; `maxScriptDataLength`: `string` ; `maxScriptLength`: `string` ; `maxStorageSlots`: `string` ; `maxWitnesses`: `string`  } |
| `chain.consensusParameters.__typename` | ``"ConsensusParameters"`` |
| `chain.consensusParameters.contractMaxSize` | `string` |
| `chain.consensusParameters.gasPerByte` | `string` |
| `chain.consensusParameters.gasPriceFactor` | `string` |
| `chain.consensusParameters.maxGasPerTx` | `string` |
| `chain.consensusParameters.maxInputs` | `string` |
| `chain.consensusParameters.maxMessageDataLength` | `string` |
| `chain.consensusParameters.maxOutputs` | `string` |
| `chain.consensusParameters.maxPredicateDataLength` | `string` |
| `chain.consensusParameters.maxPredicateLength` | `string` |
| `chain.consensusParameters.maxScriptDataLength` | `string` |
| `chain.consensusParameters.maxScriptLength` | `string` |
| `chain.consensusParameters.maxStorageSlots` | `string` |
| `chain.consensusParameters.maxWitnesses` | `string` |
| `chain.latestBlock` | { `__typename`: ``"Block"`` ; `header`: { `__typename`: ``"Header"`` ; `height`: `string` ; `time`: `any`  } ; `id`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  } |
| `chain.latestBlock.__typename` | ``"Block"`` |
| `chain.latestBlock.header` | { `__typename`: ``"Header"`` ; `height`: `string` ; `time`: `any`  } |
| `chain.latestBlock.header.__typename` | ``"Header"`` |
| `chain.latestBlock.header.height` | `string` |
| `chain.latestBlock.header.time` | `any` |
| `chain.latestBlock.id` | `string` |
| `chain.latestBlock.transactions` | { `__typename`: ``"Transaction"`` ; `id`: `string`  }[] |
| `chain.name` | `string` |
| `chain.peerCount` | `number` |

#### Defined in

packages/providers/dist/index.d.ts:113

___

### GqlGetCoinQuery

Ƭ **GqlGetCoinQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coin?` | { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `coinStatus`: [`GqlCoinStatus`](../enums/internal-GqlCoinStatus.md) ; `maturity`: `string` ; `owner`: `string` ; `utxoId`: `string`  } \| ``null`` |

#### Defined in

packages/providers/dist/index.d.ts:446

___

### GqlGetCoinsQuery

Ƭ **GqlGetCoinsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coins` | { `__typename`: ``"CoinConnection"`` ; `edges`: { `__typename`: ``"CoinEdge"`` ; `node`: { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `coinStatus`: [`GqlCoinStatus`](../enums/internal-GqlCoinStatus.md) ; `maturity`: `string` ; `owner`: `string` ; `utxoId`: `string`  }  }[]  } |
| `coins.__typename` | ``"CoinConnection"`` |
| `coins.edges` | { `__typename`: ``"CoinEdge"`` ; `node`: { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `coinStatus`: [`GqlCoinStatus`](../enums/internal-GqlCoinStatus.md) ; `maturity`: `string` ; `owner`: `string` ; `utxoId`: `string`  }  }[] |

#### Defined in

packages/providers/dist/index.d.ts:466

___

### GqlGetContractBalanceQuery

Ƭ **GqlGetContractBalanceQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `contractBalance` | { `__typename`: ``"ContractBalance"`` ; `amount`: `string` ; `assetId`: `string` ; `contract`: `string`  } |
| `contractBalance.__typename` | ``"ContractBalance"`` |
| `contractBalance.amount` | `string` |
| `contractBalance.assetId` | `string` |
| `contractBalance.contract` | `string` |

#### Defined in

packages/providers/dist/index.d.ts:527

___

### GqlGetContractQuery

Ƭ **GqlGetContractQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `contract?` | { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string`  } \| ``null`` |

#### Defined in

packages/providers/dist/index.d.ts:515

___

### GqlGetInfoQuery

Ƭ **GqlGetInfoQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `nodeInfo` | { `__typename`: ``"NodeInfo"`` ; `minGasPrice`: `string` ; `nodeVersion`: `string`  } |
| `nodeInfo.__typename` | ``"NodeInfo"`` |
| `nodeInfo.minGasPrice` | `string` |
| `nodeInfo.nodeVersion` | `string` |

#### Defined in

packages/providers/dist/index.d.ts:102

___

### GqlGetMessageProofQuery

Ƭ **GqlGetMessageProofQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `messageProof?` | { `__typename`: ``"MessageProof"`` ; `amount`: `string` ; `data`: `string` ; `header`: { `__typename`: ``"Header"`` ; `applicationHash`: `string` ; `daHeight`: `string` ; `height`: `string` ; `id`: `string` ; `outputMessagesCount`: `string` ; `outputMessagesRoot`: `string` ; `prevRoot`: `string` ; `time`: `any` ; `transactionsCount`: `string` ; `transactionsRoot`: `string`  } ; `nonce`: `string` ; `proofIndex`: `string` ; `proofSet`: `string`[] ; `recipient`: `string` ; `sender`: `string` ; `signature`: `any`  } \| ``null`` |

#### Defined in

packages/providers/dist/index.d.ts:601

___

### GqlGetMessagesQuery

Ƭ **GqlGetMessagesQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `messages` | { `__typename`: ``"MessageConnection"`` ; `edges`: { `__typename`: ``"MessageEdge"`` ; `node`: { `__typename`: ``"Message"`` ; `amount`: `string` ; `daHeight`: `string` ; `data`: `string` ; `messageStatus`: [`GqlMessageStatus`](../enums/internal-GqlMessageStatus.md) ; `nonce`: `string` ; `recipient`: `string` ; `sender`: `string`  }  }[]  } |
| `messages.__typename` | ``"MessageConnection"`` |
| `messages.edges` | { `__typename`: ``"MessageEdge"`` ; `node`: { `__typename`: ``"Message"`` ; `amount`: `string` ; `daHeight`: `string` ; `data`: `string` ; `messageStatus`: [`GqlMessageStatus`](../enums/internal-GqlMessageStatus.md) ; `nonce`: `string` ; `recipient`: `string` ; `sender`: `string`  }  }[] |

#### Defined in

packages/providers/dist/index.d.ts:578

___

### GqlGetResourcesToSpendQuery

Ƭ **GqlGetResourcesToSpendQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `resourcesToSpend` | ({ `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `coinStatus`: [`GqlCoinStatus`](../enums/internal-GqlCoinStatus.md) ; `maturity`: `string` ; `owner`: `string` ; `utxoId`: `string`  } \| { `__typename`: ``"Message"`` ; `amount`: `string` ; `daHeight`: `string` ; `data`: `string` ; `messageStatus`: [`GqlMessageStatus`](../enums/internal-GqlMessageStatus.md) ; `nonce`: `string` ; `recipient`: `string` ; `sender`: `string`  })[][] |

#### Defined in

packages/providers/dist/index.d.ts:490

___

### GqlGetTransactionQuery

Ƭ **GqlGetTransactionQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transaction?` | { `__typename`: ``"Transaction"`` ; `gasPrice?`: `string` \| ``null`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } \| ``null`` ; `time`: `any` ; `type`: ``"SuccessStatus"``  } \| ``null``  } \| ``null`` |

#### Defined in

packages/providers/dist/index.d.ts:154

___

### GqlGetTransactionWithReceiptsQuery

Ƭ **GqlGetTransactionWithReceiptsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transaction?` | { `__typename`: ``"Transaction"`` ; `gasPrice?`: `string` \| ``null`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: { `__typename`: ``"Receipt"`` ; `data?`: `string` \| ``null`` ; `rawPayload`: `string`  }[] \| ``null`` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } \| ``null`` ; `time`: `any` ; `type`: ``"SuccessStatus"``  } \| ``null``  } \| ``null`` |

#### Defined in

packages/providers/dist/index.d.ts:196

___

### GqlGetTransactionsByOwnerQuery

Ƭ **GqlGetTransactionsByOwnerQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transactionsByOwner` | { `__typename`: ``"TransactionConnection"`` ; `edges`: { `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `gasPrice?`: `string` \| ``null`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } \| ``null`` ; `time`: `any` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  }[]  } |
| `transactionsByOwner.__typename` | ``"TransactionConnection"`` |
| `transactionsByOwner.edges` | { `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `gasPrice?`: `string` \| ``null`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } \| ``null`` ; `time`: `any` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  }[] |

#### Defined in

packages/providers/dist/index.d.ts:298

___

### GqlGetTransactionsQuery

Ƭ **GqlGetTransactionsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transactions` | { `__typename`: ``"TransactionConnection"`` ; `edges`: { `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `gasPrice?`: `string` \| ``null`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } \| ``null`` ; `time`: `any` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  }[]  } |
| `transactions.__typename` | ``"TransactionConnection"`` |
| `transactions.edges` | { `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `gasPrice?`: `string` \| ``null`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } \| ``null`` ; `time`: `any` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  }[] |

#### Defined in

packages/providers/dist/index.d.ts:246

___

### GqlGetVersionQuery

Ƭ **GqlGetVersionQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `nodeInfo` | { `__typename`: ``"NodeInfo"`` ; `nodeVersion`: `string`  } |
| `nodeInfo.__typename` | ``"NodeInfo"`` |
| `nodeInfo.nodeVersion` | `string` |

#### Defined in

packages/providers/dist/index.d.ts:92

___

### GqlResetMutation

Ƭ **GqlResetMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `reset` | `boolean` |

#### Defined in

packages/providers/dist/index.d.ts:675

___

### GqlSpendQueryElementInput

Ƭ **GqlSpendQueryElementInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`Scalars`](internal.md#scalars)[``"U64"``] | Target amount for the query. |
| `assetId` | [`Scalars`](internal.md#scalars)[``"AssetId"``] | Identifier of the asset to spend. |
| `max?` | [`InputMaybe`](internal.md#inputmaybe)<[`Scalars`](internal.md#scalars)[``"U64"``]\> | The maximum number of currencies for selection. |

#### Defined in

packages/providers/dist/index.d.ts:81

___

### GqlStartSessionMutation

Ƭ **GqlStartSessionMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `startSession` | `string` |

#### Defined in

packages/providers/dist/index.d.ts:653

___

### GqlSubmitMutation

Ƭ **GqlSubmitMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `submit` | { `__typename`: ``"Transaction"`` ; `id`: `string`  } |
| `submit.__typename` | ``"Transaction"`` |
| `submit.id` | `string` |

#### Defined in

packages/providers/dist/index.d.ts:643

___

### Input

Ƭ **Input**: [`InputCoin`](internal.md#inputcoin) \| [`InputContract`](internal.md#inputcontract) \| [`InputMessage`](internal.md#inputmessage)

#### Defined in

packages/transactions/dist/index.d.ts:116

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

packages/transactions/dist/index.d.ts:36

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

packages/transactions/dist/index.d.ts:66

___

### InputMaybe

Ƭ **InputMaybe**<`T`\>: [`Maybe`](internal.md#maybe)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

packages/providers/dist/index.d.ts:24

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

packages/transactions/dist/index.d.ts:84

___

### Maybe

Ƭ **Maybe**<`T`\>: `T` \| ``null``

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

packages/providers/dist/index.d.ts:23

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

packages/providers/dist/index.d.ts:724

___

### MessageProof

Ƭ **MessageProof**: `Object`

Message Proof

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `data` | `string` |
| `header` | { `applicationHash`: `string` ; `daHeight`: [`BN`](../classes/internal-BN.md) ; `height`: [`BN`](../classes/internal-BN.md) ; `id`: `string` ; `outputMessagesCount`: [`BN`](../classes/internal-BN.md) ; `outputMessagesRoot`: `string` ; `prevRoot`: `string` ; `time`: `string` ; `transactionsCount`: [`BN`](../classes/internal-BN.md) ; `transactionsRoot`: `string`  } |
| `header.applicationHash` | `string` |
| `header.daHeight` | [`BN`](../classes/internal-BN.md) |
| `header.height` | [`BN`](../classes/internal-BN.md) |
| `header.id` | `string` |
| `header.outputMessagesCount` | [`BN`](../classes/internal-BN.md) |
| `header.outputMessagesRoot` | `string` |
| `header.prevRoot` | `string` |
| `header.time` | `string` |
| `header.transactionsCount` | [`BN`](../classes/internal-BN.md) |
| `header.transactionsRoot` | `string` |
| `nonce` | `string` |
| `proofIndex` | [`BN`](../classes/internal-BN.md) |
| `proofSet` | `string`[] |
| `recipient` | [`AbstractAddress`](../classes/internal-AbstractAddress.md) |
| `sender` | [`AbstractAddress`](../classes/internal-AbstractAddress.md) |
| `signature` | `string` |

#### Defined in

packages/providers/dist/index.d.ts:736

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

### NodeInfo

Ƭ **NodeInfo**: `Object`

Node information

#### Type declaration

| Name | Type |
| :------ | :------ |
| `minGasPrice` | [`BN`](../classes/internal-BN.md) |
| `nodeVersion` | `string` |

#### Defined in

packages/providers/dist/index.d.ts:1159

___

### Output

Ƭ **Output**: [`OutputCoin`](internal.md#outputcoin) \| [`OutputContract`](internal.md#outputcontract) \| [`OutputMessage`](internal.md#outputmessage) \| [`OutputChange`](internal.md#outputchange) \| [`OutputVariable`](internal.md#outputvariable) \| [`OutputContractCreated`](internal.md#outputcontractcreated)

#### Defined in

packages/transactions/dist/index.d.ts:211

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

packages/transactions/dist/index.d.ts:171

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

packages/transactions/dist/index.d.ts:131

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

packages/transactions/dist/index.d.ts:145

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

packages/transactions/dist/index.d.ts:199

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

packages/transactions/dist/index.d.ts:159

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

packages/transactions/dist/index.d.ts:185

___

### PossibleTransactions

Ƭ **PossibleTransactions**: [`TransactionScript`](internal.md#transactionscript) \| [`TransactionCreate`](internal.md#transactioncreate) \| [`TransactionMint`](internal.md#transactionmint)

#### Defined in

packages/transactions/dist/index.d.ts:570

___

### ProviderCallParams

Ƭ **ProviderCallParams**: `Object`

Provider Call transaction params

#### Type declaration

| Name | Type |
| :------ | :------ |
| `utxoValidation?` | `boolean` |

#### Defined in

packages/providers/dist/index.d.ts:1200

___

### ProviderOptions

Ƭ **ProviderOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fetch?` | (`url`: `string`, `options`: [`FetchRequestOptions`](internal.md#fetchrequestoptions)) => `Promise`<`any`\> |

#### Defined in

packages/providers/dist/index.d.ts:1194

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

packages/transactions/dist/index.d.ts:231

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

packages/transactions/dist/index.d.ts:327

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

packages/transactions/dist/index.d.ts:349

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

packages/transactions/dist/index.d.ts:425

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

packages/transactions/dist/index.d.ts:293

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

packages/transactions/dist/index.d.ts:257

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

packages/transactions/dist/index.d.ts:273

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

packages/transactions/dist/index.d.ts:311

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

packages/transactions/dist/index.d.ts:413

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

packages/transactions/dist/index.d.ts:373

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

packages/transactions/dist/index.d.ts:393

___

### Resource

Ƭ **Resource**: [`Coin`](internal.md#coin-2) \| [`Message`](internal.md#message-2)

#### Defined in

packages/providers/dist/index.d.ts:778

___

### Scalars

Ƭ **Scalars**: `Object`

All built-in and custom scalars, mapped to their actual values

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Address` | `string` |
| `AssetId` | `string` |
| `BlockId` | `string` |
| `Boolean` | `boolean` |
| `Bytes32` | `string` |
| `ContractId` | `string` |
| `Float` | `number` |
| `HexString` | `string` |
| `ID` | `string` |
| `Int` | `number` |
| `MessageId` | `any` |
| `Salt` | `string` |
| `Signature` | `any` |
| `String` | `string` |
| `Tai64Timestamp` | `any` |
| `TransactionId` | `string` |
| `TxPointer` | `any` |
| `U64` | `string` |
| `UtxoId` | `string` |

#### Defined in

packages/providers/dist/index.d.ts:31

___

### StorageSlot

Ƭ **StorageSlot**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Key (b256) |
| `value` | `string` | Value (b256) |

#### Defined in

packages/transactions/dist/index.d.ts:454

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

### Transaction

Ƭ **Transaction**<`TTransactionType`\>: `TTransactionType` extends [`TransactionType`](../enums/internal-TransactionType.md) ? `Extract`<[`PossibleTransactions`](internal.md#possibletransactions), { `type`: `TTransactionType`  }\> : `Partial`<`Omit`<[`TransactionScript`](internal.md#transactionscript), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionCreate`](internal.md#transactioncreate), ``"type"``\>\> & `Partial`<`Omit`<[`TransactionMint`](internal.md#transactionmint), ``"type"``\>\> & { `type`: [`TransactionType`](../enums/internal-TransactionType.md)  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Defined in

packages/transactions/dist/index.d.ts:571

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

packages/providers/dist/index.d.ts:1163

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

packages/transactions/dist/index.d.ts:520

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

packages/transactions/dist/index.d.ts:556

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](../classes/internal-ScriptTransactionRequest.md) \| [`CreateTransactionRequest`](../classes/internal-CreateTransactionRequest.md)

#### Defined in

packages/providers/dist/index.d.ts:1047

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

packages/providers/dist/index.d.ts:1071

___

### TransactionResultCallReceipt

Ƭ **TransactionResultCallReceipt**: [`ReceiptCall`](internal.md#receiptcall)

#### Defined in

packages/providers/dist/index.d.ts:1055

___

### TransactionResultLogDataReceipt

Ƭ **TransactionResultLogDataReceipt**: [`ReceiptLogData`](internal.md#receiptlogdata) & { `data`: `string`  }

#### Defined in

packages/providers/dist/index.d.ts:1063

___

### TransactionResultLogReceipt

Ƭ **TransactionResultLogReceipt**: [`ReceiptLog`](internal.md#receiptlog)

#### Defined in

packages/providers/dist/index.d.ts:1062

___

### TransactionResultMessageOutReceipt

Ƭ **TransactionResultMessageOutReceipt**: [`ReceiptMessageOut`](internal.md#receiptmessageout)

#### Defined in

packages/providers/dist/index.d.ts:1069

___

### TransactionResultPanicReceipt

Ƭ **TransactionResultPanicReceipt**: [`ReceiptPanic`](internal.md#receiptpanic)

#### Defined in

packages/providers/dist/index.d.ts:1060

___

### TransactionResultReceipt

Ƭ **TransactionResultReceipt**: [`TransactionResultCallReceipt`](internal.md#transactionresultcallreceipt) \| [`TransactionResultReturnReceipt`](internal.md#transactionresultreturnreceipt) \| [`TransactionResultReturnDataReceipt`](internal.md#transactionresultreturndatareceipt) \| [`TransactionResultPanicReceipt`](internal.md#transactionresultpanicreceipt) \| [`TransactionResultRevertReceipt`](internal.md#transactionresultrevertreceipt) \| [`TransactionResultLogReceipt`](internal.md#transactionresultlogreceipt) \| [`TransactionResultLogDataReceipt`](internal.md#transactionresultlogdatareceipt) \| [`TransactionResultTransferReceipt`](internal.md#transactionresulttransferreceipt) \| [`TransactionResultTransferOutReceipt`](internal.md#transactionresulttransferoutreceipt) \| [`TransactionResultScriptResultReceipt`](internal.md#transactionresultscriptresultreceipt) \| [`TransactionResultMessageOutReceipt`](internal.md#transactionresultmessageoutreceipt)

#### Defined in

packages/providers/dist/index.d.ts:1070

___

### TransactionResultReturnDataReceipt

Ƭ **TransactionResultReturnDataReceipt**: [`ReceiptReturnData`](internal.md#receiptreturndata) & { `data`: `string`  }

#### Defined in

packages/providers/dist/index.d.ts:1057

___

### TransactionResultReturnReceipt

Ƭ **TransactionResultReturnReceipt**: [`ReceiptReturn`](internal.md#receiptreturn)

#### Defined in

packages/providers/dist/index.d.ts:1056

___

### TransactionResultRevertReceipt

Ƭ **TransactionResultRevertReceipt**: [`ReceiptRevert`](internal.md#receiptrevert)

#### Defined in

packages/providers/dist/index.d.ts:1061

___

### TransactionResultScriptResultReceipt

Ƭ **TransactionResultScriptResultReceipt**: [`ReceiptScriptResult`](internal.md#receiptscriptresult)

#### Defined in

packages/providers/dist/index.d.ts:1068

___

### TransactionResultTransferOutReceipt

Ƭ **TransactionResultTransferOutReceipt**: [`ReceiptTransferOut`](internal.md#receipttransferout)

#### Defined in

packages/providers/dist/index.d.ts:1067

___

### TransactionResultTransferReceipt

Ƭ **TransactionResultTransferReceipt**: [`ReceiptTransfer`](internal.md#receipttransfer)

#### Defined in

packages/providers/dist/index.d.ts:1066

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

packages/transactions/dist/index.d.ts:484

___

### TxPointer

Ƭ **TxPointer**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockHeight` | `number` | Block height (u32) |
| `txIndex` | `number` | Transaction index (u16) |

#### Defined in

packages/transactions/dist/index.d.ts:5

___

### UtxoId

Ƭ **UtxoId**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputIndex` | `number` | Output index (u8) |
| `transactionId` | `string` | Transaction ID (b256) |

#### Defined in

packages/transactions/dist/index.d.ts:18

___

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | [`Variable`](internal.md#variable) |

#### Defined in

packages/providers/dist/index.d.ts:867

___

### Witness

Ƭ **Witness**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | Witness data (byte[]) |
| `dataLength` | `number` | Length of witness data, in bytes (u32) |

#### Defined in

packages/transactions/dist/index.d.ts:467
