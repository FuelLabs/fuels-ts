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

[packages/providers/src/transaction-response/transaction-response.ts:91](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L91)

## Properties

### gasUsed

• **gasUsed**: `string`

Gas used on the transaction

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:89](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L89)

___

### id

• **id**: `string`

Transaction ID

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:84](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L84)

___

### provider

• **provider**: `default`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:87](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L87)

___

### request

• **request**: [`TransactionRequest`](../namespaces/internal.md#transactionrequest)

Transaction request

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:86](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L86)

## Methods

### #fetch

▸ `Private` **#fetch**(): `Promise`<{ `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `data?`: ``null`` \| `string` ; `rawPayload`: `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  }  }\>

#### Returns

`Promise`<{ `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `data?`: ``null`` \| `string` ; `rawPayload`: `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  }  }\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:97](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L97)

___

### wait

▸ **wait**(): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``\>\>

Waits for transaction to succeed and returns the result

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``\>\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:145](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L145)

___

### waitForResult

▸ **waitForResult**(): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`\>\>

Waits for transaction to succeed or fail and returns the result

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`\>\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:108](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L108)
