---
layout: default
title: FunctionInvocationResult
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: FunctionInvocationResult<T, TTransactionType\>

[@fuel-ts/contract](../index.md).[internal](../namespaces/internal.md).FunctionInvocationResult

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |
| `TTransactionType` | `void` |

## Hierarchy

- [`InvocationResult`](internal-InvocationResult.md)<`T`\>

  ↳ **`FunctionInvocationResult`**

## Constructors

### constructor

• **new FunctionInvocationResult**<`T`, `TTransactionType`\>(`funcScopes`, `transactionResponse`, `transactionResult`, `program`, `isMultiCall`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScopes` | [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\> \| [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\>[] |
| `transactionResponse` | [`TransactionResponse`](internal-TransactionResponse.md) |
| `transactionResult` | [`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`, `TTransactionType`\> |
| `program` | [`AbstractProgram`](internal-AbstractProgram.md) |
| `isMultiCall` | `boolean` |

#### Overrides

[InvocationResult](internal-InvocationResult.md).[constructor](internal-InvocationResult.md#constructor)

#### Defined in

packages/program/dist/index.d.ts:26

## Properties

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\>[]

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[functionScopes](internal-InvocationResult.md#functionscopes)

#### Defined in

packages/program/dist/index.d.ts:11

___

### gasUsed

• `Readonly` **gasUsed**: [`BN`](internal-BN.md)

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[gasUsed](internal-InvocationResult.md#gasused)

#### Defined in

packages/program/dist/index.d.ts:13

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[isMultiCall](internal-InvocationResult.md#ismulticall)

#### Defined in

packages/program/dist/index.d.ts:12

___

### logs

• `Readonly` **logs**: `any`[]

#### Defined in

packages/program/dist/index.d.ts:25

___

### program

• `Readonly` **program**: [`AbstractProgram`](internal-AbstractProgram.md)

#### Defined in

packages/program/dist/index.d.ts:24

___

### transactionId

• `Readonly` **transactionId**: `string`

#### Defined in

packages/program/dist/index.d.ts:21

___

### transactionResponse

• `Readonly` **transactionResponse**: [`TransactionResponse`](internal-TransactionResponse.md)

#### Defined in

packages/program/dist/index.d.ts:22

___

### transactionResult

• `Readonly` **transactionResult**: [`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`, `TTransactionType`\>

#### Defined in

packages/program/dist/index.d.ts:23

___

### value

• `Readonly` **value**: `T`

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[value](internal-InvocationResult.md#value)

#### Defined in

packages/program/dist/index.d.ts:14

## Methods

### getDecodedLogs

▸ `Protected` **getDecodedLogs**(`receipts`): `unknown`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](../namespaces/internal.md#transactionresultreceipt)[] |

#### Returns

`unknown`[]

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[getDecodedLogs](internal-InvocationResult.md#getdecodedlogs)

#### Defined in

packages/program/dist/index.d.ts:18

___

### getDecodedValue

▸ `Protected` **getDecodedValue**(`callResult`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callResult` | [`CallResult`](../namespaces/internal.md#callresult) |

#### Returns

`T`

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[getDecodedValue](internal-InvocationResult.md#getdecodedvalue)

#### Defined in

packages/program/dist/index.d.ts:17

___

### build

▸ `Static` **build**<`T`, `TTransactionType`\>(`funcScope`, `transactionResponse`, `isMultiCall`, `program`): `Promise`<[`FunctionInvocationResult`](internal-FunctionInvocationResult.md)<`T`, `TTransactionType`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScope` | [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\> \| [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\>[] |
| `transactionResponse` | [`TransactionResponse`](internal-TransactionResponse.md) |
| `isMultiCall` | `boolean` |
| `program` | [`AbstractProgram`](internal-AbstractProgram.md) |

#### Returns

`Promise`<[`FunctionInvocationResult`](internal-FunctionInvocationResult.md)<`T`, `TTransactionType`\>\>

#### Defined in

packages/program/dist/index.d.ts:27
