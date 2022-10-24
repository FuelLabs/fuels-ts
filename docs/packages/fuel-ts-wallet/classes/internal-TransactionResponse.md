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

• **new TransactionResponse**(`id`, `request`, `provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `request` | [`TransactionRequest`](../namespaces/internal.md#transactionrequest) |
| `provider` | `default` |

## Properties

### gasUsed

• **gasUsed**: [`BN`](internal-BN.md)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:90](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L90)

___

### id

• **id**: `string`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:85](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L85)

___

### provider

• **provider**: `default`

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:88](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L88)

___

### request

• **request**: [`TransactionRequest`](../namespaces/internal.md#transactionrequest)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:87](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L87)

## Methods

### #fetch

▸ `Private` **#fetch**(): `Promise`<{ `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `data?`: ``null`` \| `string` ; `rawPayload`: `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  }  }\>

#### Returns

`Promise`<{ `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `data?`: ``null`` \| `string` ; `rawPayload`: `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  }  }\>

___

### wait

▸ **wait**(): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``\>\>

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<``"success"``\>\>

___

### waitForResult

▸ **waitForResult**(): `Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`\>\>

#### Returns

`Promise`<[`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`\>\>
