---
layout: default
title: TransactionResponse
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: TransactionResponse

[@fuel-ts/providers](../index.md).TransactionResponse

## Constructors

### constructor

• **new TransactionResponse**(`id`, `request`, `provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `request` | [`TransactionRequest`](../index.md#transactionrequest) |
| `provider` | [`Provider`](Provider.md) |

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:86](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L86)

## Properties

### id

• **id**: `string`

Transaction ID

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:81](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L81)

___

### provider

• **provider**: [`Provider`](Provider.md)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:84](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L84)

___

### request

• **request**: [`TransactionRequest`](../index.md#transactionrequest)

Transaction request

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:83](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L83)

## Methods

### #fetch

▸ `Private` **#fetch**(): `Promise`<{ `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `data?`: ``null`` \| `string` ; `rawPayload`: `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  }  }\>

#### Returns

`Promise`<{ `__typename`: ``"Transaction"`` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `data?`: ``null`` \| `string` ; `rawPayload`: `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState`: { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: [`GqlReturnType`](../enums/internal-GqlReturnType.md)  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  }  }\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:92](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L92)

___

### wait

▸ **wait**(): `Promise`<[`TransactionResult`](../index.md#transactionresult)<``"success"``\>\>

Waits for transaction to succeed and returns the result

#### Returns

`Promise`<[`TransactionResult`](../index.md#transactionresult)<``"success"``\>\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:134](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L134)

___

### waitForResult

▸ **waitForResult**(): `Promise`<[`TransactionResult`](../index.md#transactionresult)<`any`\>\>

Waits for transaction to succeed or fail and returns the result

#### Returns

`Promise`<[`TransactionResult`](../index.md#transactionresult)<`any`\>\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:103](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/transaction-response/transaction-response.ts#L103)
