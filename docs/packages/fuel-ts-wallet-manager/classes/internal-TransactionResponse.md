---
layout: default
title: TransactionResponse
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: TransactionResponse

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).TransactionResponse

## Constructors

### constructor

• **new TransactionResponse**(`id`, `provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `provider` | [`Provider`](internal-Provider.md) |

#### Defined in

packages/providers/dist/index.d.ts:1097

## Properties

### attempts

• **attempts**: `number`

Number off attempts to get the committed tx

#### Defined in

packages/providers/dist/index.d.ts:1096

___

### gasUsed

• **gasUsed**: [`BN`](internal-BN.md)

Gas used on the transaction

#### Defined in

packages/providers/dist/index.d.ts:1094

___

### id

• **id**: `string`

Transaction ID

#### Defined in

packages/providers/dist/index.d.ts:1090

___

### provider

• **provider**: [`Provider`](internal-Provider.md)

Current provider

#### Defined in

packages/providers/dist/index.d.ts:1092

## Methods

### decodeTransaction

▸ **decodeTransaction**<`TTransactionType`\>(`transactionWithReceipts`): [`Transaction`](../namespaces/internal.md#transaction)<`TTransactionType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionWithReceipts` | `Object` |
| `transactionWithReceipts.__typename` | ``"Transaction"`` |
| `transactionWithReceipts.gasPrice?` | ``null`` \| `string` |
| `transactionWithReceipts.id` | `string` |
| `transactionWithReceipts.rawPayload` | `string` |
| `transactionWithReceipts.receipts?` | ``null`` \| { `__typename`: ``"Receipt"`` ; `data?`: ``null`` \| `string` ; `rawPayload`: `string`  }[] |
| `transactionWithReceipts.status?` | ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `any` ; `type`: ``"SuccessStatus"``  } |

#### Returns

[`Transaction`](../namespaces/internal.md#transaction)<`TTransactionType`\>

#### Defined in

packages/providers/dist/index.d.ts:1099

___

### fetch

▸ **fetch**(): `Promise`<`undefined` \| ``null`` \| { `__typename`: ``"Transaction"`` ; `gasPrice?`: ``null`` \| `string` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `data?`: ``null`` \| `string` ; `rawPayload`: `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `any` ; `type`: ``"SuccessStatus"``  }  }\>

#### Returns

`Promise`<`undefined` \| ``null`` \| { `__typename`: ``"Transaction"`` ; `gasPrice?`: ``null`` \| `string` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `data?`: ``null`` \| `string` ; `rawPayload`: `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `any` ; `type`: ``"SuccessStatus"``  }  }\>

#### Defined in

packages/providers/dist/index.d.ts:1098

___

### wait

▸ **wait**<`TTransactionType`\>(): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``, `TTransactionType`\>\>

Waits for transaction to succeed and returns the result

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``, `TTransactionType`\>\>

#### Defined in

packages/providers/dist/index.d.ts:1103

___

### waitForResult

▸ **waitForResult**<`TTransactionType`\>(): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`, `TTransactionType`\>\>

Waits for transaction to succeed or fail and returns the result

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`, `TTransactionType`\>\>

#### Defined in

packages/providers/dist/index.d.ts:1101
