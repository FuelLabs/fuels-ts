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
| `funcScopes` | [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\> \| [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[] |
| `callResult` | [`CallResult`](../namespaces/internal.md#callresult) |
| `isMultiCall` | `boolean` |

#### Overrides

[InvocationResult](internal-InvocationResult.md).[constructor](internal-InvocationResult.md#constructor)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:81](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L81)

## Properties

### callResult

• `Readonly` **callResult**: [`CallResult`](../namespaces/internal.md#callresult)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:79](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L79)

___

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[]

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[functionScopes](internal-InvocationResult.md#functionscopes)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L19)

___

### gasUsed

• `Readonly` **gasUsed**: `string`

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[gasUsed](internal-InvocationResult.md#gasused)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L21)

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[isMultiCall](internal-InvocationResult.md#ismulticall)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L20)

___

### value

• `Readonly` **value**: `T`

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[value](internal-InvocationResult.md#value)

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

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[getDecodedValue](internal-InvocationResult.md#getdecodedvalue)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L35)

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
| `funcScopes` | [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\> \| [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[] |
| `callResult` | [`CallResult`](../namespaces/internal.md#callresult) |
| `isMultiCall` | `boolean` |

#### Returns

`Promise`<[`InvocationCallResult`](internal-InvocationCallResult.md)<`T`\>\>

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:90](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L90)
