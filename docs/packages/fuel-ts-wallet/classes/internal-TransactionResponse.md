---
layout: default
title: TransactionResponse
parent: "@fuel-ts/wallet"
nav_order: 1

---

# Class: TransactionResponse

[@fuel-ts/wallet](../index.md).[internal](../namespaces/internal.md).TransactionResponse

## Constructors

### constructor

• **new TransactionResponse**(`id`, `provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `provider` | `default` |

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:102](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L102)

## Properties

### attempts

• **attempts**: `number` = `0`

Number off attempts to get the committed tx

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:100](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L100)

___

### gasUsed

• **gasUsed**: [`BN`](internal-BN.md)

Gas used on the transaction

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:98](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L98)

___

### id

• **id**: `string`

Transaction ID

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:94](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L94)

___

### provider

• **provider**: `default`

Current provider

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:96](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L96)

## Methods

### fetch

▸ **fetch**<`TTransactionType`\>(): `Promise`<{ `transaction`: [`Transaction`](../namespaces/internal.md#transaction)<`TTransactionType`\> ; `transactionWithReceipts`: { `__typename`: ``"Transaction"`` ; `gasPrice?`: ``null`` \| `string` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `data?`: ``null`` \| `string` ; `rawPayload`: `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  }  }  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Returns

`Promise`<{ `transaction`: [`Transaction`](../namespaces/internal.md#transaction)<`TTransactionType`\> ; `transactionWithReceipts`: { `__typename`: ``"Transaction"`` ; `gasPrice?`: ``null`` \| `string` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `data?`: ``null`` \| `string` ; `rawPayload`: `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  }  }  }\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:107](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L107)

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

[packages/providers/src/transaction-response/transaction-response.ts:191](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L191)

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

[packages/providers/src/transaction-response/transaction-response.ts:128](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L128)
