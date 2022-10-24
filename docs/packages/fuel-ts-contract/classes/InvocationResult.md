---
layout: default
title: InvocationResult
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: InvocationResult<T\>

[@fuel-ts/contract](../index.md).InvocationResult

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

## Properties

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[]

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L27)

___

### gasUsed

• `Readonly` **gasUsed**: [`BN`](internal-BN.md)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L29)

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L28)

___

### value

• `Readonly` **value**: `T`

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L30)

## Methods

### getDecodedValue

▸ `Protected` **getDecodedValue**(`callResult`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callResult` | [`CallResult`](../namespaces/internal.md#callresult) |

#### Returns

`T`
