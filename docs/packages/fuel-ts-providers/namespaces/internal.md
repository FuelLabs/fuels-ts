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

## Enumeration members

### Call

• **Call**: `Object` = `0`

#### Defined in

transactions/dist/coders/receipt.d.ts:4

___

### Change

• **Change**: `Object` = `3`

#### Defined in

transactions/dist/coders/output.d.ts:7

___

### Contract

• **Contract**: `Object` = `1`

#### Defined in

transactions/dist/coders/input.d.ts:6

___

### ContractCreated

• **ContractCreated**: `Object` = `5`

#### Defined in

transactions/dist/coders/output.d.ts:9

___

### Log

• **Log**: `Object` = `5`

#### Defined in

transactions/dist/coders/receipt.d.ts:9

___

### LogData

• **LogData**: `Object` = `6`

#### Defined in

transactions/dist/coders/receipt.d.ts:10

___

### Panic

• **Panic**: `Object` = `3`

#### Defined in

transactions/dist/coders/receipt.d.ts:7

___

### Return

• **Return**: `Object` = `1`

#### Defined in

transactions/dist/coders/receipt.d.ts:5

___

### ReturnData

• **ReturnData**: `Object` = `2`

#### Defined in

transactions/dist/coders/receipt.d.ts:6

___

### Revert

• **Revert**: `Object` = `4`

#### Defined in

transactions/dist/coders/receipt.d.ts:8

___

### ScriptResult

• **ScriptResult**: `Object` = `9`

#### Defined in

transactions/dist/coders/receipt.d.ts:13

___

### Transfer

• **Transfer**: `Object` = `7`

#### Defined in

transactions/dist/coders/receipt.d.ts:11

___

### TransferOut

• **TransferOut**: `Object` = `8`

#### Defined in

transactions/dist/coders/receipt.d.ts:12

___

### Variable

• **Variable**: `Object` = `4`

#### Defined in

transactions/dist/coders/output.d.ts:8

___

### Withdrawal

• **Withdrawal**: `Object` = `2`

#### Defined in

transactions/dist/coders/output.d.ts:6

## Type aliases

### ChangeTransactionRequestOutput

Ƭ **ChangeTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `BytesLike` | Color of coins |
| `to` | `BytesLike` | Receiving address or script hash |
| `type` | [`Change`](internal.md#change) | - |

#### Defined in

[providers/src/transaction-request/output.ts:31](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/transaction-request/output.ts#L31)

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

[providers/src/transaction-request/input.ts:8](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/transaction-request/input.ts#L8)

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

[providers/src/transaction-request/output.ts:8](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/transaction-request/output.ts#L8)

___

### ContractCreatedTransactionRequestOutput

Ƭ **ContractCreatedTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `type` | [`ContractCreated`](internal.md#contractcreated) | - |

#### Defined in

[providers/src/transaction-request/output.ts:41](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/transaction-request/output.ts#L41)

___

### ContractTransactionRequestInput

Ƭ **ContractTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `BytesLike` | Contract ID |
| `type` | [`Contract`](internal.md#contract) | - |

#### Defined in

[providers/src/transaction-request/input.ts:27](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/transaction-request/input.ts#L27)

___

### ContractTransactionRequestOutput

Ƭ **ContractTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputIndex` | `BigNumberish` | Index of input contract |
| `type` | `OutputType.Contract` | - |

#### Defined in

[providers/src/transaction-request/output.ts:17](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/transaction-request/output.ts#L17)

___

### Exact

Ƭ **Exact**<`T`\>: { [K in keyof T]: T[K] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Defined in

[providers/src/operations.ts:6](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L6)

___

### GqlCoinFilterInput

Ƭ **GqlCoinFilterInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `color?` | [`Maybe`](internal.md#maybe)<[`Scalars`](internal.md#scalars)[``"HexString256"``]\> | color of the coins |
| `owner` | [`Scalars`](internal.md#scalars)[``"HexString256"``] | address of the owner |

#### Defined in

[providers/src/operations.ts:97](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L97)

___

### GqlDryRunMutation

Ƭ **GqlDryRunMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `dryRun` | { `__typename`: ``"Receipt"`` ; `data?`: `string` \| ``null`` ; `id?`: `string` \| ``null`` ; `rawPayload`: `string`  }[] |

#### Defined in

[providers/src/operations.ts:818](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L818)

___

### GqlEndSessionMutation

Ƭ **GqlEndSessionMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `endSession` | `boolean` |

#### Defined in

[providers/src/operations.ts:842](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L842)

___

### GqlExecuteMutation

Ƭ **GqlExecuteMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `execute` | `boolean` |

#### Defined in

[providers/src/operations.ts:849](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L849)

___

### GqlGetBlockQuery

Ƭ **GqlGetBlockQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `block?` | { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string`  }[]  } \| ``null`` |

#### Defined in

[providers/src/operations.ts:665](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L665)

___

### GqlGetBlockWithTransactionsQuery

Ƭ **GqlGetBlockWithTransactionsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `block?` | { `__typename`: ``"Block"`` ; `height`: `string` ; `id`: `string` ; `producer`: `string` ; `time`: `string` ; `transactions`: { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `blockId`: `string` ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `blockId`: `string` ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  }[]  } \| ``null`` |

#### Defined in

[providers/src/operations.ts:685](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L685)

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

[providers/src/operations.ts:733](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L733)

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

[providers/src/operations.ts:462](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L462)

___

### GqlGetCoinQuery

Ƭ **GqlGetCoinQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `coin?` | { `__typename`: ``"Coin"`` ; `amount`: `string` ; `blockCreated`: `string` ; `color`: `string` ; `maturity`: `string` ; `owner`: `string` ; `status`: [`GqlCoinStatus`](../enums/internal-GqlCoinStatus.md) ; `utxoId`: `string`  } \| ``null`` |

#### Defined in

[providers/src/operations.ts:762](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L762)

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

[providers/src/operations.ts:787](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L787)

___

### GqlGetTransactionQuery

Ƭ **GqlGetTransactionQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transaction?` | { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `blockId`: `string` ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `blockId`: `string` ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  } \| ``null`` |

#### Defined in

[providers/src/operations.ts:484](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L484)

___

### GqlGetTransactionWithReceiptsQuery

Ƭ **GqlGetTransactionWithReceiptsQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `transaction?` | { `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: { `__typename`: ``"Receipt"`` ; `data?`: `string` \| ``null`` ; `id?`: `string` \| ``null`` ; `rawPayload`: `string`  }[] \| ``null`` ; `status?`: { `__typename`: ``"FailureStatus"`` ; `blockId`: `string` ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `blockId`: `string` ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } \| ``null``  } \| ``null`` |

#### Defined in

[providers/src/operations.ts:518](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L518)

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

[providers/src/operations.ts:616](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L616)

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

[providers/src/operations.ts:564](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L564)

___

### GqlGetVersionQuery

Ƭ **GqlGetVersionQuery**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Query"`` |
| `version` | `string` |

#### Defined in

[providers/src/operations.ts:458](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L458)

___

### GqlResetMutation

Ƭ **GqlResetMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `reset` | `boolean` |

#### Defined in

[providers/src/operations.ts:855](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L855)

___

### GqlStartSessionMutation

Ƭ **GqlStartSessionMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `startSession` | `string` |

#### Defined in

[providers/src/operations.ts:836](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L836)

___

### GqlSubmitMutation

Ƭ **GqlSubmitMutation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Mutation"`` |
| `submit` | `string` |

#### Defined in

[providers/src/operations.ts:832](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L832)

___

### Input

Ƭ **Input**: [`InputCoin`](internal.md#inputcoin) \| [`InputContract`](internal.md#inputcontract)

#### Defined in

transactions/dist/coders/input.d.ts:52

___

### InputCoin

Ƭ **InputCoin**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumber` | Amount of coins (u64) |
| `color` | `string` | Color of the coins (b256) |
| `maturity` | `BigNumber` | UTXO being spent must have been created at least this many blocks ago (u64) |
| `owner` | `string` | Owning address or script hash (b256) |
| `predicate` | `string` | Predicate bytecode (byte[]) |
| `predicateData` | `string` | Predicate input data (parameters) (byte[]) |
| `predicateDataLength` | `BigNumber` | Length of predicate input data, in bytes (u16) |
| `predicateLength` | `BigNumber` | Length of predicate, in instructions (u16) |
| `type` | [`Coin`](../index.md#coin) | - |
| `utxoID` | [`UtxoId`](internal.md#utxoid) | UTXO ID (UtxoId) |
| `witnessIndex` | `BigNumber` | Index of witness that authorizes spending the coin (u8) |

#### Defined in

transactions/dist/coders/input.d.ts:8

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

transactions/dist/coders/input.d.ts:36

___

### Maybe

Ƭ **Maybe**<`T`\>: `T` \| ``null``

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[providers/src/operations.ts:5](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L5)

___

### Output

Ƭ **Output**: [`OutputCoin`](internal.md#outputcoin) \| [`OutputContract`](internal.md#outputcontract) \| [`OutputWithdrawal`](internal.md#outputwithdrawal) \| [`OutputChange`](internal.md#outputchange) \| [`OutputVariable`](internal.md#outputvariable) \| [`OutputContractCreated`](internal.md#outputcontractcreated)

#### Defined in

transactions/dist/coders/output.d.ts:91

___

### OutputChange

Ƭ **OutputChange**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumber` | Amount of coins to send (u64) |
| `color` | `string` | Color of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Change`](internal.md#change) | - |

#### Defined in

transactions/dist/coders/output.d.ts:53

___

### OutputCoin

Ƭ **OutputCoin**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumber` | Amount of coins to send (u64) |
| `color` | `string` | Color of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Coin`](../index.md#coin) | - |

#### Defined in

transactions/dist/coders/output.d.ts:11

___

### OutputContract

Ƭ **OutputContract**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `balanceRoot` | `string` | Root of amount of coins owned by contract after transaction execution (b256) |
| `inputIndex` | `BigNumber` | Index of input contract (u8) |
| `stateRoot` | `string` | State root of contract after transaction execution (b256) |
| `type` | `OutputType.Contract` | - |

#### Defined in

transactions/dist/coders/output.d.ts:25

___

### OutputContractCreated

Ƭ **OutputContractCreated**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `string` | Contract ID (b256) |
| `type` | [`ContractCreated`](internal.md#contractcreated) | - |

#### Defined in

transactions/dist/coders/output.d.ts:81

___

### OutputVariable

Ƭ **OutputVariable**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumber` | Amount of coins to send (u64) |
| `color` | `string` | Color of coins (b256) |
| `to` | `string` | Receiving address or script hash (b256) |
| `type` | [`Variable`](internal.md#variable) | - |

#### Defined in

transactions/dist/coders/output.d.ts:67

___

### OutputWithdrawal

Ƭ **OutputWithdrawal**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumber` | Amount of coins to withdraw (u64) |
| `color` | `string` | Color of coins (b256) |
| `to` | `string` | Receiving address (b256) |
| `type` | [`Withdrawal`](internal.md#withdrawal) | - |

#### Defined in

transactions/dist/coders/output.d.ts:39

___

### ReceiptCall

Ƭ **ReceiptCall**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumber` | Amount of coins to forward, i.e. $rB (u64) |
| `color` | `string` | Color of coins to forward, i.e. MEM[$rC, 32] (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `gas` | `BigNumber` | Gas to forward, i.e. $rD (u64) |
| `is` | `BigNumber` | Value of register $is (u64) |
| `param1` | `BigNumber` | First parameter (u64) |
| `param2` | `BigNumber` | Second parameter (u64) |
| `pc` | `BigNumber` | Value of register $pc (u64) |
| `to` | `string` | Contract ID of called contract (b256) |
| `type` | [`Call`](internal.md#call) | - |

#### Defined in

transactions/dist/coders/receipt.d.ts:15

___

### ReceiptLog

Ƭ **ReceiptLog**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `BigNumber` | Value of register $is (u64) |
| `pc` | `BigNumber` | Value of register $pc (u64) |
| `type` | [`Log`](internal.md#log) | - |
| `val0` | `BigNumber` | Value of register $rA (u64) |
| `val1` | `BigNumber` | Value of register $rB (u64) |
| `val2` | `BigNumber` | Value of register $rC (u64) |
| `val3` | `BigNumber` | Value of register $rD (u64) |

#### Defined in

transactions/dist/coders/receipt.d.ts:109

___

### ReceiptLogData

Ƭ **ReceiptLogData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `digest` | `string` | Hash of MEM[$rC, $rD] (b256) |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `BigNumber` | Value of register $is (u64) |
| `len` | `BigNumber` | Value of register $rD (u64) |
| `pc` | `BigNumber` | Value of register $pc (u64) |
| `ptr` | `BigNumber` | Value of register $rC (u64) |
| `type` | [`LogData`](internal.md#logdata) | - |
| `val0` | `BigNumber` | Value of register $rA (u64) |
| `val1` | `BigNumber` | Value of register $rB (u64) |

#### Defined in

transactions/dist/coders/receipt.d.ts:131

___

### ReceiptPanic

Ƭ **ReceiptPanic**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `BigNumber` | Value of register $is (u64) |
| `pc` | `BigNumber` | Value of register $pc (u64) |
| `reason` | `BigNumber` | Panic reason (u64) |
| `type` | [`Panic`](internal.md#panic) | - |

#### Defined in

transactions/dist/coders/receipt.d.ts:77

___

### ReceiptReturn

Ƭ **ReceiptReturn**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `BigNumber` | Value of register $is (u64) |
| `pc` | `BigNumber` | Value of register $pc (u64) |
| `type` | [`Return`](internal.md#return) | - |
| `val` | `BigNumber` | Value of register $rA (u64) |

#### Defined in

transactions/dist/coders/receipt.d.ts:41

___

### ReceiptReturnData

Ƭ **ReceiptReturnData**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `digest` | `string` | Hash of MEM[$rA, $rB] (b256) |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `BigNumber` | Value of register $is (u64) |
| `len` | `BigNumber` | Value of register $rB (u64) |
| `pc` | `BigNumber` | Value of register $pc (u64) |
| `ptr` | `BigNumber` | Value of register $rA (u64) |
| `type` | [`ReturnData`](internal.md#returndata) | - |

#### Defined in

transactions/dist/coders/receipt.d.ts:57

___

### ReceiptRevert

Ƭ **ReceiptRevert**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `BigNumber` | Value of register $is (u64) |
| `pc` | `BigNumber` | Value of register $pc (u64) |
| `type` | [`Revert`](internal.md#revert) | - |
| `val` | `BigNumber` | Value of register $rA (u64) |

#### Defined in

transactions/dist/coders/receipt.d.ts:93

___

### ReceiptScriptResult

Ƭ **ReceiptScriptResult**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `gasUsed` | `BigNumber` | Gas consumed by the script (u64) |
| `result` | `BigNumber` | Result variant with embedded `PanicReason` in first 8 bits and `instr` (u64) |
| `type` | [`ScriptResult`](internal.md#scriptresult) | - |

#### Defined in

transactions/dist/coders/receipt.d.ts:195

___

### ReceiptTransfer

Ƭ **ReceiptTransfer**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumber` | Amount of coins transferred (u64) |
| `color` | `string` | Color of coins transferred (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `BigNumber` | Value of register $is (u64) |
| `pc` | `BigNumber` | Value of register $pc (u64) |
| `to` | `string` | Contract ID of contract to transfer coins to (b256) |
| `type` | [`Transfer`](internal.md#transfer) | - |

#### Defined in

transactions/dist/coders/receipt.d.ts:155

___

### ReceiptTransferOut

Ƭ **ReceiptTransferOut**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumber` | Amount of coins transferred (u64) |
| `color` | `string` | Color of coins transferred (b256) |
| `from` | `string` | Contract ID of current context if in an internal context, zero otherwise (b256) |
| `is` | `BigNumber` | Value of register $is (u64) |
| `pc` | `BigNumber` | Value of register $pc (u64) |
| `to` | `string` | Address to transfer coins to (b256) |
| `type` | [`TransferOut`](internal.md#transferout) | - |

#### Defined in

transactions/dist/coders/receipt.d.ts:175

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

[providers/src/operations.ts:10](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/operations.ts#L10)

___

### Transaction

Ƭ **Transaction**: [`TransactionScript`](internal.md#transactionscript) \| [`TransactionCreate`](internal.md#transactioncreate)

#### Defined in

transactions/dist/coders/transaction.d.ts:82

___

### TransactionCreate

Ƭ **TransactionCreate**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytecodeLength` | `BigNumber` | Contract bytecode length, in instructions (u16) |
| `bytecodeWitnessIndex` | `BigNumber` | Witness index of contract bytecode to create (u8) |
| `gasLimit` | `BigNumber` | Gas limit for transaction (u64) |
| `gasPrice` | `BigNumber` | Gas price for transaction (u64) |
| `inputs` | [`Input`](internal.md#input)[] | List of inputs (Input[]) |
| `inputsCount` | `BigNumber` | Number of inputs (u8) |
| `maturity` | `BigNumber` | Block until which tx cannot be included (u32) |
| `outputs` | [`Output`](internal.md#output)[] | List of outputs (Output[]) |
| `outputsCount` | `BigNumber` | Number of outputs (u8) |
| `salt` | `string` | Salt (b256) |
| `staticContracts` | `string`[] | List of static contracts (b256[]) |
| `staticContractsCount` | `BigNumber` | Number of static contracts (u8) |
| `type` | [`Create`](../enums/TransactionType.md#create) | - |
| `witnesses` | [`Witness`](internal.md#witness)[] | List of witnesses (Witness[]) |
| `witnessesCount` | `BigNumber` | Number of witnesses (u8) |

#### Defined in

transactions/dist/coders/transaction.d.ts:46

___

### TransactionRequestWitness

Ƭ **TransactionRequestWitness**: `BytesLike`

#### Defined in

[providers/src/transaction-request/witness.ts:6](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/transaction-request/witness.ts#L6)

___

### TransactionScript

Ƭ **TransactionScript**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `gasLimit` | `BigNumber` | Gas limit for transaction (u64) |
| `gasPrice` | `BigNumber` | Gas price for transaction (u64) |
| `inputs` | [`Input`](internal.md#input)[] | List of inputs (Input[]) |
| `inputsCount` | `BigNumber` | Number of inputs (u8) |
| `maturity` | `BigNumber` | Block until which tx cannot be included (u32) |
| `outputs` | [`Output`](internal.md#output)[] | List of outputs (Output[]) |
| `outputsCount` | `BigNumber` | Number of outputs (u8) |
| `receiptsRoot` | `string` | Merkle root of receipts (b256) |
| `script` | `string` | Script to execute (byte[]) |
| `scriptData` | `string` | Script input data (parameters) (byte[]) |
| `scriptDataLength` | `BigNumber` | Length of script input data, in bytes (u16) |
| `scriptLength` | `BigNumber` | Script length, in instructions (u16) |
| `type` | [`Script`](../enums/TransactionType.md#script) | - |
| `witnesses` | [`Witness`](internal.md#witness)[] | List of witnesses (Witness[]) |
| `witnessesCount` | `BigNumber` | Number of witnesses (u8) |

#### Defined in

transactions/dist/coders/transaction.d.ts:10

___

### UtxoId

Ƭ **UtxoId**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputIndex` | `BigNumber` | Output index (u8) |
| `transactionId` | `string` | Transaction ID (b256) |

#### Defined in

transactions/dist/coders/utxo-id.d.ts:3

___

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | [`Variable`](internal.md#variable) |

#### Defined in

[providers/src/transaction-request/output.ts:38](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/transaction-request/output.ts#L38)

___

### WithdrawalTransactionRequestOutput

Ƭ **WithdrawalTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumberish` | Amount of coins to withdraw |
| `color` | `BytesLike` | Color of coins |
| `to` | `BytesLike` | Receiving address |
| `type` | [`Withdrawal`](internal.md#withdrawal) | - |

#### Defined in

[providers/src/transaction-request/output.ts:22](https://github.com/luizstacio/fuels-ts/blob/756d35d/packages/providers/src/transaction-request/output.ts#L22)

___

### Witness

Ƭ **Witness**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | Witness data (byte[]) |
| `dataLength` | `BigNumber` | Length of witness data, in bytes (u16) |

#### Defined in

transactions/dist/coders/witness.d.ts:3
