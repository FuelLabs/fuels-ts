---
layout: default
title: InvocationCallResult
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: InvocationCallResult<T\>

[@fuel-ts/contract](../index.md).[internal](../namespaces/internal.md).InvocationCallResult

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- [`InvocationResult`](internal-InvocationResult.md)<`T`\>

  ↳ **`InvocationCallResult`**

## Constructors

### constructor

• **new InvocationCallResult**<`T`\>(`funcScopes`, `callResult`, `isMultiCall`)

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

#### Overrides

[InvocationResult](internal-InvocationResult.md).[constructor](internal-InvocationResult.md#constructor)

#### Defined in

packages/program/dist/index.d.ts:31

## Properties

### callResult

• `Readonly` **callResult**: [`CallResult`](../namespaces/internal.md#callresult)

#### Defined in

packages/program/dist/index.d.ts:30

___

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

▸ `Static` **build**<`T`\>(`funcScopes`, `callResult`, `isMultiCall`): `Promise`<[`InvocationCallResult`](internal-InvocationCallResult.md)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScopes` | [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\> \| [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\>[] |
| `callResult` | [`CallResult`](../namespaces/internal.md#callresult) |
| `isMultiCall` | `boolean` |

#### Returns

`Promise`<[`InvocationCallResult`](internal-InvocationCallResult.md)<`T`\>\>

#### Defined in

packages/program/dist/index.d.ts:32
