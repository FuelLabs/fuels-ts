---
layout: default
title: internal
parent: "@fuel-ts/providers"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/providers](../index.md).internal

## Enumerations

- [GqlReturnType](../enums/internal-GqlReturnType.md)

## Classes

- [AbstractAddress](../classes/internal-AbstractAddress.md)
- [AbstractContract](../classes/internal-AbstractContract.md)
- [AbstractPredicate](../classes/internal-AbstractPredicate.md)
- [AbstractScript](../classes/internal-AbstractScript.md)
- [AbstractWallet](../classes/internal-AbstractWallet.md)
- [BN](../classes/internal-BN.md)
- [BaseTransactionRequest](../classes/internal-BaseTransactionRequest.md)

## Interfaces

- [BNHelper](../interfaces/internal-BNHelper.md)
- [BNHiddenTypes](../interfaces/internal-BNHiddenTypes.md)
- [BNInputOverrides](../interfaces/internal-BNInputOverrides.md)
- [BNOverrides](../interfaces/internal-BNOverrides.md)
- [BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md)

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

### MessageOut

• **MessageOut**: ``10``

#### Defined in

[packages/transactions/src/coders/receipt.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L16)

___

### Variable

• **Variable**: ``4``

#### Defined in

[packages/transactions/src/coders/output.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L11)

___

### Message

• **Message**: ``2``

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

### CompareResult

Ƭ **CompareResult**: ``-1`` \| ``0`` \| ``1``

#### Defined in

[packages/math/src/bn.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L7)

___

### ContractIdLike

Ƭ **ContractIdLike**: [`AbstractAddress`](../classes/internal-AbstractAddress.md) \| [`AbstractContract`](../classes/internal-AbstractContract.md)

#### Defined in

[packages/interfaces/src/index.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L30)

___

### Exact

Ƭ **Exact**<`T`\>: { [K in keyof T]: T[K] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Defined in

packages/providers/src/__generated__/operations.ts:7

___

### FormatConfig

Ƭ **FormatConfig**: { `units?`: `number`  } & [`ToFixedConfig`](internal.md#tofixedconfig)

#### Defined in

[packages/math/src/types.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L8)

___

### GqlBalanceFilterInput

Ƭ **GqlBalanceFilterInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `owner` | [`Scalars`](internal.md#scalars)[``"Address"``] |

#### Defined in

packages/providers/src/__generated__/operations.ts:63

___

### GqlCoinFilterInput

Ƭ **GqlCoinFilterInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assetId?` | [`InputMaybe`](internal.md#inputmaybe)<[`Scalars`](internal.md#scalars)[``"AssetId"``]\> |
| `owner` | [`Scalars`](internal.md#scalars)[``"Address"``] |

#### Defined in

packages/providers/src/__generated__/operations.ts:147

___

### GqlDryRunMutation

Ƭ **GqlDryRunMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `dryRun` | { `__typename`: ``"Receipt"`` ; `data?`: `string` \| ``null`` ; `rawPayload`: `string`  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:1178

___

### GqlEndSessionMutation

Ƭ **GqlEndSessionMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `endSession` | `boolean` |

#### Defined in

packages/providers/src/__generated__/operations.ts:1200

___

### GqlExecuteMutation

Ƭ **GqlExecuteMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `execute` | `boolean` |

#### Defined in

packages/providers/src/__generated__/operations.ts:1207

___

### GqlGetBalanceQuery

Ƭ **GqlGetBalanceQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `balance` | `Object` |
| `balance.__typename` | ``"Balance"`` |
| `balance.amount` | `string` |
| `balance.assetId` | `string` |
| `balance.owner` | `string` |

#### Defined in

packages/providers/src/__generated__/operations.ts:1122

___

### GqlGetBalancesQuery

Ƭ **GqlGetBalancesQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `balances` | `Object` |
| `balances.__typename` | ``"BalanceConnection"`` |
| `balances.edges` | { `__typename`: ``"BalanceEdge"`` ; `node`: { `__typename`: ``"Balance"`` ; `amount`: `string` ; `assetId`: `string` ; `owner`: `string`  }  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:1135

___

### GqlGetBlockQuery

Ƭ **GqlGetBlockQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `block?` | { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:966

___

### GqlGetBlockWithTransactionsQuery

Ƭ **GqlGetBlockWithTransactionsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `block?` | { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }[]  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:983

___

### GqlGetBlocksQuery

Ƭ **GqlGetBlocksQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `blocks` | `Object` |
| `blocks.__typename` | ``"BlockConnection"`` |
| `blocks.edges` | { `__typename`: ``"BlockEdge"`` ; `node`: { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  }  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:1023

___

### GqlGetChainQuery

Ƭ **GqlGetChainQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `chain` | `Object` |
| `chain.__typename` | ``"ChainInfo"`` |
| `chain.baseChainHeight` | `string` |
| `chain.consensusParameters` | `Object` |
| `chain.consensusParameters.__typename` | ``"ConsensusParameters"`` |
| `chain.consensusParameters.gasPriceFactor` | `string` |
| `chain.consensusParameters.maxGasPerTx` | `string` |
| `chain.consensusParameters.maxScriptLength` | `string` |
| `chain.latestBlock` | `Object` |
| `chain.latestBlock.__typename` | ``"Block"`` |
| `chain.latestBlock.height` | `string` |
| `chain.latestBlock.id` | `string` |
| `chain.latestBlock.producer` | `string` |
| `chain.latestBlock.time` | `string` |
| `chain.latestBlock.transactions` | { `__typename`: ``"Transaction"`` ; `id`: `string`  }[] |
| `chain.name` | `string` |
| `chain.peerCount` | `number` |

#### Defined in

packages/providers/src/__generated__/operations.ts:797

___

### GqlGetCoinQuery

Ƭ **GqlGetCoinQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coin?` | { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`CoinStatus`](../enums/CoinStatus.md) ; `utxoId`: `string`  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:1045

___

### GqlGetCoinsQuery

Ƭ **GqlGetCoinsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coins` | `Object` |
| `coins.__typename` | ``"CoinConnection"`` |
| `coins.edges` | { `__typename`: ``"CoinEdge"`` ; `node`: { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`CoinStatus`](../enums/CoinStatus.md) ; `utxoId`: `string`  }  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:1067

___

### GqlGetCoinsToSpendQuery

Ƭ **GqlGetCoinsToSpendQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coinsToSpend` | { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`CoinStatus`](../enums/CoinStatus.md) ; `utxoId`: `string`  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:1094

___

### GqlGetContractQuery

Ƭ **GqlGetContractQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `contract?` | { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string`  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:1112

___

### GqlGetInfoQuery

Ƭ **GqlGetInfoQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `nodeInfo` | `Object` |
| `nodeInfo.__typename` | ``"NodeInfo"`` |
| `nodeInfo.minGasPrice` | `string` |
| `nodeInfo.nodeVersion` | `string` |

#### Defined in

packages/providers/src/__generated__/operations.ts:790

___

### GqlGetMessagesQuery

Ƭ **GqlGetMessagesQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `messages` | `Object` |
| `messages.__typename` | ``"MessageConnection"`` |
| `messages.edges` | { `__typename`: ``"MessageEdge"`` ; `node`: { `__typename`: ``"Message"`` ; `amount`: `string` ; `daHeight`: `string` ; `data`: `number`[] ; `nonce`: `string` ; `recipient`: `string` ; `sender`: `string`  }  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:1154

___

### GqlGetTransactionQuery

Ƭ **GqlGetTransactionQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transaction?` | { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:825

___

### GqlGetTransactionWithReceiptsQuery

Ƭ **GqlGetTransactionWithReceiptsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transaction?` | { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: { `__typename`: ``"Receipt"`` ; `data?`: `string` \| ``null`` ; `rawPayload`: `string`  }[] \| ``null`` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:855

___

### GqlGetTransactionsByOwnerQuery

Ƭ **GqlGetTransactionsByOwnerQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transactionsByOwner` | `Object` |
| `transactionsByOwner.__typename` | ``"TransactionConnection"`` |
| `transactionsByOwner.edges` | { `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:929

___

### GqlGetTransactionsQuery

Ƭ **GqlGetTransactionsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transactions` | `Object` |
| `transactions.__typename` | ``"TransactionConnection"`` |
| `transactions.edges` | { `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:889

___

### GqlGetVersionQuery

Ƭ **GqlGetVersionQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `nodeInfo` | `Object` |
| `nodeInfo.__typename` | ``"NodeInfo"`` |
| `nodeInfo.nodeVersion` | `string` |

#### Defined in

packages/providers/src/__generated__/operations.ts:783

___

### GqlResetMutation

Ƭ **GqlResetMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `reset` | `boolean` |

#### Defined in

packages/providers/src/__generated__/operations.ts:1213

___

### GqlSpendQueryElementInput

Ƭ **GqlSpendQueryElementInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`Scalars`](internal.md#scalars)[``"U64"``] |
| `assetId` | [`Scalars`](internal.md#scalars)[``"AssetId"``] |

#### Defined in

packages/providers/src/__generated__/operations.ts:622

___

### GqlStartSessionMutation

Ƭ **GqlStartSessionMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `startSession` | `string` |

#### Defined in

packages/providers/src/__generated__/operations.ts:1194

___

### GqlSubmitMutation

Ƭ **GqlSubmitMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `submit` | `Object` |
| `submit.__typename` | ``"Transaction"`` |
| `submit.id` | `string` |

#### Defined in

packages/providers/src/__generated__/operations.ts:1187

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

### InputMaybe

Ƭ **InputMaybe**<`T`\>: [`Maybe`](internal.md#maybe)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

packages/providers/src/__generated__/operations.ts:6

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

### InputValue

Ƭ **InputValue**: [`Primitive`](internal.md#primitive) \| [`BN`](../classes/internal-BN.md) \| `BytesLike` \| [`InputValue`](internal.md#inputvalue)[] \| { [key: string]: [`InputValue`](internal.md#inputvalue);  } \| `Record`<`string`, [`Primitive`](internal.md#primitive) \| `BytesLike`\>

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L12)

___

### Maybe

Ƭ **Maybe**<`T`\>: `T` \| ``null``

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

packages/providers/src/__generated__/operations.ts:5

___

### Output

Ƭ **Output**: [`OutputCoin`](internal.md#outputcoin) \| [`OutputContract`](internal.md#outputcontract) \| [`OutputMessage`](internal.md#outputmessage) \| [`OutputChange`](internal.md#outputchange) \| [`OutputVariable`](internal.md#outputvariable) \| [`OutputContractCreated`](internal.md#outputcontractcreated)

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

### OutputMessage

Ƭ **OutputMessage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | [`BN`](../classes/internal-BN.md) |
| `recipient` | `string` |
| `type` | [`Message`](internal.md#message-1) |

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

### Scalars

Ƭ **Scalars**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Address` | `string` |
| `AssetId` | `string` |
| `BlockId` | `string` |
| `Boolean` | `boolean` |
| `Bytes32` | `string` |
| `ContractId` | `string` |
| `DateTime` | `string` |
| `Float` | `number` |
| `HexString` | `string` |
| `ID` | `string` |
| `Int` | `number` |
| `MessageId` | `any` |
| `Salt` | `string` |
| `String` | `string` |
| `TransactionId` | `string` |
| `TxPointer` | `any` |
| `U64` | `string` |
| `UtxoId` | `string` |

#### Defined in

packages/providers/src/__generated__/operations.ts:11

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
| `type` | [`Create`](../enums/TransactionType.md#create) |
| `witnesses` | [`Witness`](internal.md#witness)[] |
| `witnessesCount` | `number` |

#### Defined in

[packages/transactions/src/coders/transaction.ts:156](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L156)

___

### TransactionRequestStorageSlot

Ƭ **TransactionRequestStorageSlot**: { `key`: `BytesLike` ; `value`: `BytesLike`  } \| [key: BytesLike, value: BytesLike]

#### Defined in

[packages/providers/src/transaction-request/storage-slot.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/storage-slot.ts#L5)

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
| `type` | [`Script`](../enums/TransactionType.md#script) |
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

### Witness

Ƭ **Witness**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `dataLength` | `number` |

#### Defined in

[packages/transactions/src/coders/witness.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/witness.ts#L6)
