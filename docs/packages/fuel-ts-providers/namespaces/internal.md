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
- [BaseTransactionRequest](../classes/internal-BaseTransactionRequest.md)

## Interfaces

- [BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md)

## Enumeration Members

### Call

• **Call**: ``0``

#### Defined in

[packages/transactions/src/coders/receipt.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L7)

___

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

### Log

• **Log**: ``5``

#### Defined in

[packages/transactions/src/coders/receipt.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L12)

___

### LogData

• **LogData**: ``6``

#### Defined in

[packages/transactions/src/coders/receipt.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L13)

___

### Panic

• **Panic**: ``3``

#### Defined in

[packages/transactions/src/coders/receipt.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L10)

___

### Return

• **Return**: ``1``

#### Defined in

[packages/transactions/src/coders/receipt.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L8)

___

### ReturnData

• **ReturnData**: ``2``

#### Defined in

[packages/transactions/src/coders/receipt.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L9)

___

### Revert

• **Revert**: ``4``

#### Defined in

[packages/transactions/src/coders/receipt.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L11)

___

### ScriptResult

• **ScriptResult**: ``9``

#### Defined in

[packages/transactions/src/coders/receipt.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L16)

___

### Transfer

• **Transfer**: ``7``

#### Defined in

[packages/transactions/src/coders/receipt.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L14)

___

### TransferOut

• **TransferOut**: ``8``

#### Defined in

[packages/transactions/src/coders/receipt.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L15)

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

### AddressLike

Ƭ **AddressLike**: [`AbstractAddress`](../classes/internal-AbstractAddress.md) \| [`AbstractWallet`](../classes/internal-AbstractWallet.md)

#### Defined in

[packages/interfaces/src/index.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L26)

___

### BigNumberish

Ƭ **BigNumberish**: `string` \| `number` \| `bigint`

#### Defined in

[packages/math/src/types.ts:1](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L1)

___

### ContractIdLike

Ƭ **ContractIdLike**: [`AbstractAddress`](../classes/internal-AbstractAddress.md) \| [`AbstractContract`](../classes/internal-AbstractContract.md)

#### Defined in

[packages/interfaces/src/index.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L28)

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

### GqlBalanceFilterInput

Ƭ **GqlBalanceFilterInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`Scalars`](internal.md#scalars)[``"Address"``] | Filter coins based on the `owner` field |

#### Defined in

packages/providers/src/__generated__/operations.ts:59

___

### GqlCoinFilterInput

Ƭ **GqlCoinFilterInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId?` | [`InputMaybe`](internal.md#inputmaybe)<[`Scalars`](internal.md#scalars)[``"AssetId"``]\> | Asset ID of the coins |
| `owner` | [`Scalars`](internal.md#scalars)[``"Address"``] | Address of the owner |

#### Defined in

packages/providers/src/__generated__/operations.ts:139

___

### GqlDryRunMutation

Ƭ **GqlDryRunMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `dryRun` | { `__typename`: ``"Receipt"`` ; `data?`: `string` \| ``null`` ; `rawPayload`: `string`  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:1070

___

### GqlEndSessionMutation

Ƭ **GqlEndSessionMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `endSession` | `boolean` |

#### Defined in

packages/providers/src/__generated__/operations.ts:1092

___

### GqlExecuteMutation

Ƭ **GqlExecuteMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `execute` | `boolean` |

#### Defined in

packages/providers/src/__generated__/operations.ts:1099

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

packages/providers/src/__generated__/operations.ts:1041

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

packages/providers/src/__generated__/operations.ts:1054

___

### GqlGetBlockQuery

Ƭ **GqlGetBlockQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `block?` | { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:885

___

### GqlGetBlockWithTransactionsQuery

Ƭ **GqlGetBlockWithTransactionsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `block?` | { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }[]  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:902

___

### GqlGetBlocksQuery

Ƭ **GqlGetBlocksQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `blocks` | { `__typename`: ``"BlockConnection"`` ; `edges`: { `__typename`: ``"BlockEdge"`` ; `node`: { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  }  }[]  } |
| `blocks.__typename` | ``"BlockConnection"`` |
| `blocks.edges` | { `__typename`: ``"BlockEdge"`` ; `node`: { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  }  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:942

___

### GqlGetChainQuery

Ƭ **GqlGetChainQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `chain` | { `__typename`: ``"ChainInfo"`` ; `baseChainHeight`: `string` ; `consensusParameters`: { `__typename`: ``"ConsensusParameters"`` ; `gasPriceFactor`: `string` ; `maxGasPerTx`: `string` ; `maxScriptLength`: `string`  } ; `latestBlock`: { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  } ; `name`: `string` ; `peerCount`: `number`  } |
| `chain.__typename` | ``"ChainInfo"`` |
| `chain.baseChainHeight` | `string` |
| `chain.consensusParameters` | { `__typename`: ``"ConsensusParameters"`` ; `gasPriceFactor`: `string` ; `maxGasPerTx`: `string` ; `maxScriptLength`: `string`  } |
| `chain.consensusParameters.__typename` | ``"ConsensusParameters"`` |
| `chain.consensusParameters.gasPriceFactor` | `string` |
| `chain.consensusParameters.maxGasPerTx` | `string` |
| `chain.consensusParameters.maxScriptLength` | `string` |
| `chain.latestBlock` | { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  } |
| `chain.latestBlock.__typename` | ``"Block"`` |
| `chain.latestBlock.height` | `string` |
| `chain.latestBlock.id` | `string` |
| `chain.latestBlock.producer` | `string` |
| `chain.latestBlock.time` | `string` |
| `chain.latestBlock.transactions` | { `__typename`: ``"Transaction"`` ; `id`: `string`  }[] |
| `chain.name` | `string` |
| `chain.peerCount` | `number` |

#### Defined in

packages/providers/src/__generated__/operations.ts:716

___

### GqlGetCoinQuery

Ƭ **GqlGetCoinQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coin?` | { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`CoinStatus`](../enums/CoinStatus.md) ; `utxoId`: `string`  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:964

___

### GqlGetCoinsQuery

Ƭ **GqlGetCoinsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coins` | { `__typename`: ``"CoinConnection"`` ; `edges`: { `__typename`: ``"CoinEdge"`` ; `node`: { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`CoinStatus`](../enums/CoinStatus.md) ; `utxoId`: `string`  }  }[]  } |
| `coins.__typename` | ``"CoinConnection"`` |
| `coins.edges` | { `__typename`: ``"CoinEdge"`` ; `node`: { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`CoinStatus`](../enums/CoinStatus.md) ; `utxoId`: `string`  }  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:986

___

### GqlGetCoinsToSpendQuery

Ƭ **GqlGetCoinsToSpendQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coinsToSpend` | { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`CoinStatus`](../enums/CoinStatus.md) ; `utxoId`: `string`  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:1013

___

### GqlGetContractQuery

Ƭ **GqlGetContractQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `contract?` | { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string`  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:1031

___

### GqlGetInfoQuery

Ƭ **GqlGetInfoQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `nodeInfo` | { `__typename`: ``"NodeInfo"`` ; `minBytePrice`: `string` ; `minGasPrice`: `string` ; `nodeVersion`: `string`  } |
| `nodeInfo.__typename` | ``"NodeInfo"`` |
| `nodeInfo.minBytePrice` | `string` |
| `nodeInfo.minGasPrice` | `string` |
| `nodeInfo.nodeVersion` | `string` |

#### Defined in

packages/providers/src/__generated__/operations.ts:704

___

### GqlGetTransactionQuery

Ƭ **GqlGetTransactionQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transaction?` | { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:744

___

### GqlGetTransactionWithReceiptsQuery

Ƭ **GqlGetTransactionWithReceiptsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transaction?` | { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: { `__typename`: ``"Receipt"`` ; `data?`: `string` \| ``null`` ; `rawPayload`: `string`  }[] \| ``null`` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:774

___

### GqlGetTransactionsByOwnerQuery

Ƭ **GqlGetTransactionsByOwnerQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transactionsByOwner` | { `__typename`: ``"TransactionConnection"`` ; `edges`: { `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  }[]  } |
| `transactionsByOwner.__typename` | ``"TransactionConnection"`` |
| `transactionsByOwner.edges` | { `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:848

___

### GqlGetTransactionsQuery

Ƭ **GqlGetTransactionsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transactions` | { `__typename`: ``"TransactionConnection"`` ; `edges`: { `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  }[]  } |
| `transactions.__typename` | ``"TransactionConnection"`` |
| `transactions.edges` | { `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:808

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

packages/providers/src/__generated__/operations.ts:697

___

### GqlResetMutation

Ƭ **GqlResetMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `reset` | `boolean` |

#### Defined in

packages/providers/src/__generated__/operations.ts:1105

___

### GqlSpendQueryElementInput

Ƭ **GqlSpendQueryElementInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`Scalars`](internal.md#scalars)[``"U64"``] | Target amount for the query |
| `assetId` | [`Scalars`](internal.md#scalars)[``"AssetId"``] | Asset ID of the coins |

#### Defined in

packages/providers/src/__generated__/operations.ts:539

___

### GqlStartSessionMutation

Ƭ **GqlStartSessionMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `startSession` | `string` |

#### Defined in

packages/providers/src/__generated__/operations.ts:1086

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

packages/providers/src/__generated__/operations.ts:1079

___

### Input

Ƭ **Input**: [`InputCoin`](internal.md#inputcoin) \| [`InputContract`](internal.md#inputcontract)

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
| `type` | [`Coin`](internal.md#coin) | - |
| `utxoID` | [`UtxoId`](internal.md#utxoid) | UTXO ID (UtxoId) |
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
| `type` | [`Contract`](internal.md#contract) | - |
| `utxoID` | [`UtxoId`](internal.md#utxoid) | UTXO ID (UtxoId) |

#### Defined in

[packages/transactions/src/coders/input.ts:109](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/input.ts#L109)

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

### InputValue

Ƭ **InputValue**: [`Primitive`](internal.md#primitive) \| `BytesLike` \| [`InputValue`](internal.md#inputvalue)[] \| { `[key: string]`: [`InputValue`](internal.md#inputvalue);  } \| `Record`<`string`, [`Primitive`](internal.md#primitive) \| `BytesLike`\>

The type of value you can provide to `Coder.encode`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L11)

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

Ƭ **Output**: [`OutputCoin`](internal.md#outputcoin) \| [`OutputContract`](internal.md#outputcontract) \| [`OutputWithdrawal`](internal.md#outputwithdrawal) \| [`OutputChange`](internal.md#outputchange) \| [`OutputVariable`](internal.md#outputvariable) \| [`OutputContractCreated`](internal.md#outputcontractcreated)

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
| `type` | [`Change`](internal.md#change) | - |

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
| `type` | [`Coin`](internal.md#coin-1) | - |

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
| `type` | [`Contract`](internal.md#contract-1) | - |

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
| `type` | [`ContractCreated`](internal.md#contractcreated) | - |

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
| `type` | [`Variable`](internal.md#variable) | - |

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
| `type` | [`Withdrawal`](internal.md#withdrawal) | - |

#### Defined in

[packages/transactions/src/coders/output.ts:110](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/output.ts#L110)

___

### Primitive

Ƭ **Primitive**: `string` \| `number` \| `boolean` \| `bigint`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L6)

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
| `type` | [`Call`](internal.md#call) | - |

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
| `type` | [`Log`](internal.md#log) | - |
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
| `type` | [`LogData`](internal.md#logdata) | - |
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
| `type` | [`Panic`](internal.md#panic) | - |

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
| `type` | [`Return`](internal.md#return) | - |
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
| `type` | [`ReturnData`](internal.md#returndata) | - |

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
| `type` | [`Revert`](internal.md#revert) | - |
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
| `type` | [`ScriptResult`](internal.md#scriptresult) | - |

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
| `type` | [`Transfer`](internal.md#transfer) | - |

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
| `type` | [`TransferOut`](internal.md#transferout) | - |

#### Defined in

[packages/transactions/src/coders/receipt.ts:547](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/receipt.ts#L547)

___

### Scalars

Ƭ **Scalars**: `Object`

All built-in and custom scalars, mapped to their actual values

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `Address` | `string` | - |
| `AssetId` | `string` | - |
| `BlockId` | `string` | - |
| `Boolean` | `boolean` | - |
| `Bytes32` | `string` | - |
| `ContractId` | `string` | - |
| `DateTime` | `string` | Implement the DateTime<Utc> scalar  The input/output is a string in RFC3339 format. |
| `Float` | `number` | - |
| `HexString` | `string` | - |
| `ID` | `string` | - |
| `Int` | `number` | - |
| `Salt` | `string` | - |
| `String` | `string` | - |
| `TransactionId` | `string` | - |
| `U64` | `string` | - |
| `UtxoId` | `string` | - |

#### Defined in

packages/providers/src/__generated__/operations.ts:11

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
| `inputs` | [`Input`](internal.md#input)[] | List of inputs (Input[]) |
| `inputsCount` | `number` | Number of inputs (u8) |
| `maturity` | `bigint` | Block until which tx cannot be included (u64) |
| `outputs` | [`Output`](internal.md#output)[] | List of outputs (Output[]) |
| `outputsCount` | `number` | Number of outputs (u8) |
| `salt` | `string` | Salt (b256) |
| `staticContracts` | `string`[] | List of static contracts (b256[]) |
| `staticContractsCount` | `number` | Number of static contracts (u8) |
| `storageSlots` | [`StorageSlot`](internal.md#storageslot)[] | List of inputs (StorageSlot[]) |
| `storageSlotsCount` | `number` | Number of storage slots to initialize (u16) |
| `type` | [`Create`](../enums/TransactionType.md#create) | - |
| `witnesses` | [`Witness`](internal.md#witness)[] | List of witnesses (Witness[]) |
| `witnessesCount` | `number` | Number of witnesses (u8) |

#### Defined in

[packages/transactions/src/coders/transaction.ts:147](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L147)

___

### TransactionRequestStorageSlot

Ƭ **TransactionRequestStorageSlot**: { `key`: `BytesLike` ; `value`: `BytesLike`  } \| [key: BytesLike, value: BytesLike]

#### Defined in

[packages/providers/src/transaction-request/storage-slot.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/storage-slot.ts#L5)

___

### TransactionScript

Ƭ **TransactionScript**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytePrice` | `bigint` | Price per transaction byte (u64) |
| `gasLimit` | `bigint` | Gas limit for transaction (u64) |
| `gasPrice` | `bigint` | Gas price for transaction (u64) |
| `inputs` | [`Input`](internal.md#input)[] | List of inputs (Input[]) |
| `inputsCount` | `number` | Number of inputs (u8) |
| `maturity` | `bigint` | Block until which tx cannot be included (u64) |
| `outputs` | [`Output`](internal.md#output)[] | List of outputs (Output[]) |
| `outputsCount` | `number` | Number of outputs (u8) |
| `receiptsRoot` | `string` | Merkle root of receipts (b256) |
| `script` | `string` | Script to execute (byte[]) |
| `scriptData` | `string` | Script input data (parameters) (byte[]) |
| `scriptDataLength` | `number` | Length of script input data, in bytes (u16) |
| `scriptLength` | `number` | Script length, in instructions (u16) |
| `type` | [`Script`](../enums/TransactionType.md#script) | - |
| `witnesses` | [`Witness`](internal.md#witness)[] | List of witnesses (Witness[]) |
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
