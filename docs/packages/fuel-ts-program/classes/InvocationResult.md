---
layout: default
title: InvocationResult
parent: "@fuel-ts/program"
nav_order: 1

---

# Class: InvocationResult<T\>

[@fuel-ts/program](../index.md).InvocationResult

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- **`InvocationResult`**

  ↳ [`FunctionInvocationResult`](FunctionInvocationResult.md)

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
| `funcScopes` | [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\> \| [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[] |
| `callResult` | [`CallResult`](../namespaces/internal.md#callresult) |
| `isMultiCall` | `boolean` |

#### Defined in

[packages/program/src/functions/invocation-results.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L34)

## Properties

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[]

#### Defined in

[packages/program/src/functions/invocation-results.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L29)

___

### gasUsed

• `Readonly` **gasUsed**: [`BN`](internal-BN.md)

#### Defined in

[packages/program/src/functions/invocation-results.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L31)

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Defined in

[packages/program/src/functions/invocation-results.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L30)

___

### value

• `Readonly` **value**: `T`

#### Defined in

[packages/program/src/functions/invocation-results.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L32)

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

[packages/program/src/functions/invocation-results.ts:68](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L68)

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

[packages/program/src/functions/invocation-results.ts:53](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L53)

___

### getFirstCallConfig

▸ `Private` **getFirstCallConfig**(): `undefined` \| [`CallConfig`](../index.md#callconfig)<`unknown`\>

#### Returns

`undefined` \| [`CallConfig`](../index.md#callconfig)<`unknown`\>

#### Defined in

[packages/program/src/functions/invocation-results.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L45)
