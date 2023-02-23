---
layout: default
title: InvocationCallResult
parent: "@fuel-ts/program"
nav_order: 1

---

# Class: InvocationCallResult<T\>

[@fuel-ts/program](../index.md).[internal](../namespaces/internal.md).InvocationCallResult

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- [`InvocationResult`](InvocationResult.md)<`T`\>

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

[InvocationResult](InvocationResult.md).[constructor](InvocationResult.md#constructor)

#### Defined in

[packages/program/src/functions/invocation-results.ts:125](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L125)

## Properties

### callResult

• `Readonly` **callResult**: [`CallResult`](../namespaces/internal.md#callresult)

#### Defined in

[packages/program/src/functions/invocation-results.ts:123](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L123)

___

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[]

#### Inherited from

[InvocationResult](InvocationResult.md).[functionScopes](InvocationResult.md#functionscopes)

#### Defined in

[packages/program/src/functions/invocation-results.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L29)

___

### gasUsed

• `Readonly` **gasUsed**: [`BN`](internal-BN.md)

#### Inherited from

[InvocationResult](InvocationResult.md).[gasUsed](InvocationResult.md#gasused)

#### Defined in

[packages/program/src/functions/invocation-results.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L31)

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Inherited from

[InvocationResult](InvocationResult.md).[isMultiCall](InvocationResult.md#ismulticall)

#### Defined in

[packages/program/src/functions/invocation-results.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L30)

___

### value

• `Readonly` **value**: `T`

#### Inherited from

[InvocationResult](InvocationResult.md).[value](InvocationResult.md#value)

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

#### Inherited from

[InvocationResult](InvocationResult.md).[getDecodedLogs](InvocationResult.md#getdecodedlogs)

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

#### Inherited from

[InvocationResult](InvocationResult.md).[getDecodedValue](InvocationResult.md#getdecodedvalue)

#### Defined in

[packages/program/src/functions/invocation-results.ts:53](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L53)

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

[packages/program/src/functions/invocation-results.ts:134](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L134)
