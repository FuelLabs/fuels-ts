---
layout: default
title: InvocationResult
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: InvocationResult<T\>

[@fuel-ts/contract](../index.md).[internal](../namespaces/internal.md).InvocationResult

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- **`InvocationResult`**

  ↳ [`FunctionInvocationResult`](internal-FunctionInvocationResult.md)

  ↳ [`InvocationCallResult`](internal-InvocationCallResult.md)

## Constructors

### constructor

• **new InvocationResult**<`T`\>(`funcScopes`, `callResult`, `isMultiCall`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScopes` | [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\> \| [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\>[] |
| `callResult` | [`CallResult`](../namespaces/internal.md#callresult) |
| `isMultiCall` | `boolean` |

#### Defined in

packages/program/dist/index.d.ts:15

## Properties

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\>[]

#### Defined in

packages/program/dist/index.d.ts:11

___

### gasUsed

• `Readonly` **gasUsed**: [`BN`](internal-BN.md)

#### Defined in

packages/program/dist/index.d.ts:13

___

### getFirstCallConfig

• `Private` **getFirstCallConfig**: `any`

#### Defined in

packages/program/dist/index.d.ts:16

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Defined in

packages/program/dist/index.d.ts:12

___

### value

• `Readonly` **value**: `T`

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

#### Defined in

packages/program/dist/index.d.ts:17
