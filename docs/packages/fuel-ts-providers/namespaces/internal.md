---
layout: default
title: internal
parent: "@fuel-ts/providers"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/providers](../index.md).internal

## Enumerations

- [GqlCoinStatus](../enums/internal-GqlCoinStatus.md)
- [GqlReturnType](../enums/internal-GqlReturnType.md)

## Type aliases

### ChangeTransactionRequestOutput

Ƭ **ChangeTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `BytesLike` | Color of coins |
| `to` | `BytesLike` | Receiving address or script hash |
| `type` | `OutputType.Change` | - |

#### Defined in

[providers/src/transaction-request/output.ts:31](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/output.ts#L31)

___

### CoinTransactionRequestInput

Ƭ **CoinTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumberish` | Amount of coins |
| `color` | `BytesLike` | Color of the coins |
| `id` | `BytesLike` | UTXO ID |
| `maturity?` | `BigNumberish` | UTXO being spent must have been created at least this many blocks ago |
| `owner` | `BytesLike` | Owning address or script hash |
| `predicate?` | `BytesLike` | Predicate bytecode |
| `predicateData?` | `BytesLike` | Predicate input data (parameters) |
| `type` | [`Coin`](../index.md#coin) | - |
| `witnessIndex` | `BigNumberish` | Index of witness that authorizes spending the coin |

#### Defined in

[providers/src/transaction-request/input.ts:8](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/input.ts#L8)

___

### CoinTransactionRequestOutput

Ƭ **CoinTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumberish` | Amount of coins to send |
| `color` | `BytesLike` | Color of coins |
| `to` | `BytesLike` | Receiving address or script hash |
| `type` | [`Coin`](../index.md#coin) | - |

#### Defined in

[providers/src/transaction-request/output.ts:8](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/output.ts#L8)

___

### ContractCreatedTransactionRequestOutput

Ƭ **ContractCreatedTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `type` | `OutputType.ContractCreated` | - |

#### Defined in

[providers/src/transaction-request/output.ts:41](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/output.ts#L41)

___

### ContractTransactionRequestInput

Ƭ **ContractTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `type` | `InputType.Contract` | - |

#### Defined in

[providers/src/transaction-request/input.ts:27](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/input.ts#L27)

___

### ContractTransactionRequestOutput

Ƭ **ContractTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputIndex` | `BigNumberish` | Index of input contract |
| `type` | `OutputType.Contract` | - |

#### Defined in

[providers/src/transaction-request/output.ts:17](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/output.ts#L17)

___

### Exact

Ƭ **Exact**<`T`\>: { [K in keyof T]: T[K] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Defined in

[providers/src/operations.ts:6](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L6)

___

### GqlCoinFilterInput

Ƭ **GqlCoinFilterInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `color?` | [`Maybe`](internal.md#maybe)<[`Scalars`](internal.md#scalars)[``"HexString256"``]\> | color of the coins |
| `owner` | [`Scalars`](internal.md#scalars)[``"HexString256"``] | address of the owner |

#### Defined in

[providers/src/operations.ts:97](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L97)

___

### GqlDryRunMutation

Ƭ **GqlDryRunMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `dryRun` | { `__typename`: ``"Receipt"`` ; `data?`: `string` \| ``null`` ; `id?`: `string` \| ``null`` ; `rawPayload`: `string`  }[] |

#### Defined in

[providers/src/operations.ts:818](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L818)

___

### GqlEndSessionMutation

Ƭ **GqlEndSessionMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `endSession` | `boolean` |

#### Defined in

[providers/src/operations.ts:842](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L842)

___

### GqlExecuteMutation

Ƭ **GqlExecuteMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `execute` | `boolean` |

#### Defined in

[providers/src/operations.ts:849](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L849)

___

### GqlGetBlockQuery

Ƭ **GqlGetBlockQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `block?` | { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  } \| ``null`` |

#### Defined in

[providers/src/operations.ts:665](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L665)

___

### GqlGetBlockWithTransactionsQuery

Ƭ **GqlGetBlockWithTransactionsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `block?` | { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `blockId`: `string` ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `blockId`: `string` ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }[]  } \| ``null`` |

#### Defined in

[providers/src/operations.ts:685](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L685)

___

### GqlGetBlocksQuery

Ƭ **GqlGetBlocksQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `blocks` | { `__typename`: ``"BlockConnection"`` ; `edges?`: ({ `__typename`: ``"BlockEdge"`` ; `node`: { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  }  } \| ``null`` \| `undefined`)[] \| ``null``  } |
| `blocks.__typename` | ``"BlockConnection"`` |
| `blocks.edges?` | ({ `__typename`: ``"BlockEdge"`` ; `node`: { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  }  } \| ``null`` \| `undefined`)[] \| ``null`` |

#### Defined in

[providers/src/operations.ts:733](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L733)

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

[providers/src/operations.ts:462](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L462)

___

### GqlGetCoinQuery

Ƭ **GqlGetCoinQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coin?` | { `__typename`: ``"Coin"`` ; `amount`: `string` ; `blockCreated`: `string` ; `color`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`GqlCoinStatus`](../enums/internal-GqlCoinStatus.md) ; `utxoId`: `string`  } \| ``null`` |

#### Defined in

[providers/src/operations.ts:762](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L762)

___

### GqlGetCoinsQuery

Ƭ **GqlGetCoinsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coins` | { `__typename`: ``"CoinConnection"`` ; `edges?`: ({ `__typename`: ``"CoinEdge"`` ; `node`: { `__typename`: ``"Coin"`` ; `amount`: `string` ; `blockCreated`: `string` ; `color`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`GqlCoinStatus`](../enums/internal-GqlCoinStatus.md) ; `utxoId`: `string`  }  } \| ``null`` \| `undefined`)[] \| ``null``  } |
| `coins.__typename` | ``"CoinConnection"`` |
| `coins.edges?` | ({ `__typename`: ``"CoinEdge"`` ; `node`: { `__typename`: ``"Coin"`` ; `amount`: `string` ; `blockCreated`: `string` ; `color`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`GqlCoinStatus`](../enums/internal-GqlCoinStatus.md) ; `utxoId`: `string`  }  } \| ``null`` \| `undefined`)[] \| ``null`` |

#### Defined in

[providers/src/operations.ts:787](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L787)

___

### GqlGetTransactionQuery

Ƭ **GqlGetTransactionQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transaction?` | { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `blockId`: `string` ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `blockId`: `string` ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  } \| ``null`` |

#### Defined in

[providers/src/operations.ts:484](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L484)

___

### GqlGetTransactionWithReceiptsQuery

Ƭ **GqlGetTransactionWithReceiptsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transaction?` | { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: { `__typename`: ``"Receipt"`` ; `data?`: `string` \| ``null`` ; `id?`: `string` \| ``null`` ; `rawPayload`: `string`  }[] \| ``null`` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `blockId`: `string` ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `blockId`: `string` ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  } \| ``null`` |

#### Defined in

[providers/src/operations.ts:518](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L518)

___

### GqlGetTransactionsByOwnerQuery

Ƭ **GqlGetTransactionsByOwnerQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transactionsByOwner` | { `__typename`: ``"TransactionConnection"`` ; `edges?`: ({ `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `blockId`: `string` ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `blockId`: `string` ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  } \| ``null`` \| `undefined`)[] \| ``null``  } |
| `transactionsByOwner.__typename` | ``"TransactionConnection"`` |
| `transactionsByOwner.edges?` | ({ `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `blockId`: `string` ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `blockId`: `string` ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  } \| ``null`` \| `undefined`)[] \| ``null`` |

#### Defined in

[providers/src/operations.ts:616](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L616)

___

### GqlGetTransactionsQuery

Ƭ **GqlGetTransactionsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transactions` | { `__typename`: ``"TransactionConnection"`` ; `edges?`: ({ `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `blockId`: `string` ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `blockId`: `string` ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  } \| ``null`` \| `undefined`)[] \| ``null``  } |
| `transactions.__typename` | ``"TransactionConnection"`` |
| `transactions.edges?` | ({ `__typename`: ``"TransactionEdge"`` ; `node`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `blockId`: `string` ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `blockId`: `string` ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }  } \| ``null`` \| `undefined`)[] \| ``null`` |

#### Defined in

[providers/src/operations.ts:564](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L564)

___

### GqlGetVersionQuery

Ƭ **GqlGetVersionQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `version` | `string` |

#### Defined in

[providers/src/operations.ts:458](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L458)

___

### GqlResetMutation

Ƭ **GqlResetMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `reset` | `boolean` |

#### Defined in

[providers/src/operations.ts:855](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L855)

___

### GqlStartSessionMutation

Ƭ **GqlStartSessionMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `startSession` | `string` |

#### Defined in

[providers/src/operations.ts:836](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L836)

___

### GqlSubmitMutation

Ƭ **GqlSubmitMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `submit` | `string` |

#### Defined in

[providers/src/operations.ts:832](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L832)

___

### Maybe

Ƭ **Maybe**<`T`\>: `T` \| ``null``

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[providers/src/operations.ts:5](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L5)

___

### Scalars

Ƭ **Scalars**: `Object`

All built-in and custom scalars, mapped to their actual values

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `Boolean` | `boolean` | - |
| `DateTime` | `string` | Implement the DateTime<Utc> scalar  The input/output is a string in RFC3339 format. |
| `Float` | `number` | - |
| `HexString` | `string` | - |
| `HexString256` | `string` | - |
| `HexStringUtxoId` | `string` | - |
| `ID` | `string` | - |
| `Int` | `number` | - |
| `String` | `string` | - |
| `U64` | `string` | - |

#### Defined in

[providers/src/operations.ts:10](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/operations.ts#L10)

___

### TransactionRequestWitness

Ƭ **TransactionRequestWitness**: `BytesLike`

#### Defined in

[providers/src/transaction-request/witness.ts:6](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/witness.ts#L6)

___

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `OutputType.Variable` |

#### Defined in

[providers/src/transaction-request/output.ts:38](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/output.ts#L38)

___

### WithdrawalTransactionRequestOutput

Ƭ **WithdrawalTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumberish` | Amount of coins to withdraw |
| `color` | `BytesLike` | Color of coins |
| `to` | `BytesLike` | Receiving address |
| `type` | `OutputType.Withdrawal` | - |

#### Defined in

[providers/src/transaction-request/output.ts:22](https://github.com/luizstacio/fuels-ts/blob/0092f5b/packages/providers/src/transaction-request/output.ts#L22)
