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
| `funcScopes` | [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\> \| [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[] |
| `callResult` | [`CallResult`](../namespaces/internal.md#callresult) |
| `isMultiCall` | `boolean` |

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L24)

## Properties

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[]

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L19)

___

### gasUsed

• `Readonly` **gasUsed**: `string`

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L21)

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L20)

___

### value

• `Readonly` **value**: `T`

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L22)

## Methods

### getDecodedValue

▸ `Protected` **getDecodedValue**(`callResult`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callResult` | [`CallResult`](../namespaces/internal.md#callresult) |

#### Returns

`T`

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L35)
