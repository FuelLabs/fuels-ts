---
layout: default
title: TransactionResponse
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: TransactionResponse

[@fuel-ts/contract](../index.md).[internal](../namespaces/internal.md).TransactionResponse

## Constructors

### constructor

• **new TransactionResponse**(`id`, `request`, `provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `request` | [`TransactionRequest`](../namespaces/internal.md#transactionrequest) |
| `provider` | `default` |

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:90](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L90)

## Properties

### gasUsed

• **gasUsed**: `bigint`

Gas used on the transaction

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:88](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L88)

___

### id

• **id**: `string`

Transaction ID

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:83](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L83)

___

### provider

• **provider**: `default`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:86](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L86)

___

### request

• **request**: [`TransactionRequest`](../namespaces/internal.md#transactionrequest)

Transaction request

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:85](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L85)

## Methods

### #fetch

▸ `Private` **#fetch**(): `Promise`<{ `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `data?`: ``null`` \| `string` ; `rawPayload`: `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  }  }\>

#### Returns

`Promise`<{ `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `data?`: ``null`` \| `string` ; `rawPayload`: `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  }  }\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:96](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L96)

___

### wait

▸ **wait**(): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``\>\>

Waits for transaction to succeed and returns the result

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``\>\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:144](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L144)

___

### waitForResult

▸ **waitForResult**(): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`\>\>

Waits for transaction to succeed or fail and returns the result

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`\>\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:107](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L107)
