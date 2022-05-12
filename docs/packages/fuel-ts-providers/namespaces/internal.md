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

- [BaseTransactionRequest](../classes/internal-BaseTransactionRequest.md)

## Interfaces

- [BaseTransactionRequestLike](../interfaces/internal-BaseTransactionRequestLike.md)

## Type aliases

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

packages/providers/src/__generated__/operations.ts:133

___

### GqlDryRunMutation

Ƭ **GqlDryRunMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `dryRun` | { `__typename`: ``"Receipt"`` ; `data?`: `string` \| ``null`` ; `rawPayload`: `string`  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:893

___

### GqlEndSessionMutation

Ƭ **GqlEndSessionMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `endSession` | `boolean` |

#### Defined in

packages/providers/src/__generated__/operations.ts:915

___

### GqlExecuteMutation

Ƭ **GqlExecuteMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `execute` | `boolean` |

#### Defined in

packages/providers/src/__generated__/operations.ts:922

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

packages/providers/src/__generated__/operations.ts:865

___

### GqlGetBalancesQuery

Ƭ **GqlGetBalancesQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `balances` | { `__typename`: ``"BalanceConnection"`` ; `edges?`: ({ `__typename`: ``"BalanceEdge"`` ; `node`: { `__typename`: ``"Balance"`` ; `amount`: `string` ; `assetId`: `string` ; `owner`: `string`  }  } \| ``null``)[] \| ``null``  } |
| `balances.__typename` | ``"BalanceConnection"`` |
| `balances.edges?` | ({ `__typename`: ``"BalanceEdge"`` ; `node`: { `__typename`: ``"Balance"`` ; `amount`: `string` ; `assetId`: `string` ; `owner`: `string`  }  } \| ``null``)[] \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:878

___

### GqlGetBlockQuery

Ƭ **GqlGetBlockQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `block?` | { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:710

___

### GqlGetBlockWithTransactionsQuery

Ƭ **GqlGetBlockWithTransactionsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `block?` | { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }[]  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:727

___

### GqlGetBlocksQuery

Ƭ **GqlGetBlocksQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `blocks` | { `__typename`: ``"BlockConnection"`` ; `edges?`: ({ `__typename`: ``"BlockEdge"`` ; `node`: { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  }  } \| ``null``)[] \| ``null``  } |
| `blocks.__typename` | ``"BlockConnection"`` |
| `blocks.edges?` | ({ `__typename`: ``"BlockEdge"`` ; `node`: { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  }  } \| ``null``)[] \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:767

___

### GqlGetChainQuery

Ƭ **GqlGetChainQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `chain` | { `__typename`: ``"ChainInfo"`` ; `baseChainHeight`: `string` ; `latestBlock`: { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  } ; `name`: `string` ; `peerCount`: `number`  } |
| `chain.__typename` | ``"ChainInfo"`` |
| `chain.baseChainHeight` | `string` |
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

packages/providers/src/__generated__/operations.ts:547

___

### GqlGetCoinQuery

Ƭ **GqlGetCoinQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coin?` | { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`CoinStatus`](../enums/CoinStatus.md) ; `utxoId`: `string`  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:789

___

### GqlGetCoinsQuery

Ƭ **GqlGetCoinsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coins` | { `__typename`: ``"CoinConnection"`` ; `edges?`: ({ `__typename`: ``"CoinEdge"`` ; `node`: { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`CoinStatus`](../enums/CoinStatus.md) ; `utxoId`: `string`  }  } \| ``null``)[] \| ``null``  } |
| `coins.__typename` | ``"CoinConnection"`` |
| `coins.edges?` | ({ `__typename`: ``"CoinEdge"`` ; `node`: { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`CoinStatus`](../enums/CoinStatus.md) ; `utxoId`: `string`  }  } \| ``null``)[] \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:811

___

### GqlGetCoinsToSpendQuery

Ƭ **GqlGetCoinsToSpendQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coinsToSpend` | { `__typename`: ``"Coin"`` ; `amount`: `string` ; `assetId`: `string` ; `blockCreated`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`CoinStatus`](../enums/CoinStatus.md) ; `utxoId`: `string`  }[] |

#### Defined in

packages/providers/src/__generated__/operations.ts:837

___

### GqlGetContractQuery

Ƭ **GqlGetContractQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `contract?` | { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string`  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:855

___

### GqlGetTransactionQuery

Ƭ **GqlGetTransactionQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transaction?` | { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:569

___

### GqlGetTransactionWithReceiptsQuery

Ƭ **GqlGetTransactionWithReceiptsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transaction?` | { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: { `__typename`: ``"Receipt"`` ; `data?`: `string` \| ``null`` ; `rawPayload`: `string`  }[] \| ``null`` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  } \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:599

___

### GqlGetTransactionsByOwnerQuery

Ƭ **GqlGetTransactionsByOwnerQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transactionsByOwner` | { `__typename`: ``"TransactionConnection"`` ; `edges?`: ({ `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  } \| ``null``)[] \| ``null``  } |
| `transactionsByOwner.__typename` | ``"TransactionConnection"`` |
| `transactionsByOwner.edges?` | ({ `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  } \| ``null``)[] \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:673

___

### GqlGetTransactionsQuery

Ƭ **GqlGetTransactionsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transactions` | { `__typename`: ``"TransactionConnection"`` ; `edges?`: ({ `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  } \| ``null``)[] \| ``null``  } |
| `transactions.__typename` | ``"TransactionConnection"`` |
| `transactions.edges?` | ({ `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  } \| ``null``)[] \| ``null`` |

#### Defined in

packages/providers/src/__generated__/operations.ts:633

___

### GqlGetVersionQuery

Ƭ **GqlGetVersionQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `version` | `string` |

#### Defined in

packages/providers/src/__generated__/operations.ts:543

___

### GqlResetMutation

Ƭ **GqlResetMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `reset` | `boolean` |

#### Defined in

packages/providers/src/__generated__/operations.ts:928

___

### GqlSpendQueryElementInput

Ƭ **GqlSpendQueryElementInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | [`Scalars`](internal.md#scalars)[``"U64"``] | Address of the owner |
| `assetId` | [`Scalars`](internal.md#scalars)[``"AssetId"``] | Asset ID of the coins |

#### Defined in

packages/providers/src/__generated__/operations.ts:407

___

### GqlStartSessionMutation

Ƭ **GqlStartSessionMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `startSession` | `string` |

#### Defined in

packages/providers/src/__generated__/operations.ts:909

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

packages/providers/src/__generated__/operations.ts:902

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

### Maybe

Ƭ **Maybe**<`T`\>: `T` \| ``null``

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

packages/providers/src/__generated__/operations.ts:5

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

### TransactionRequestStorageSlot

Ƭ **TransactionRequestStorageSlot**: { `key`: `BytesLike` ; `value`: `BytesLike`  } \| [key: BytesLike, value: BytesLike]

#### Defined in

[packages/providers/src/transaction-request/storage-slot.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-request/storage-slot.ts#L5)
