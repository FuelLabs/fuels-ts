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

[packages/contract/src/contracts/functions/invocation-results.ts:121](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L121)

## Properties

### callResult

• `Readonly` **callResult**: [`CallResult`](../namespaces/internal.md#callresult)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:119](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L119)

___

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[]

#### Inherited from

[InvocationResult](InvocationResult.md).[functionScopes](InvocationResult.md#functionscopes)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L27)

___

### gasUsed

• `Readonly` **gasUsed**: [`BN`](internal-BN.md)

#### Inherited from

[InvocationResult](InvocationResult.md).[gasUsed](InvocationResult.md#gasused)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L29)

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Inherited from

[InvocationResult](InvocationResult.md).[isMultiCall](InvocationResult.md#ismulticall)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L28)

___

### value

• `Readonly` **value**: `T`

#### Inherited from

[InvocationResult](InvocationResult.md).[value](InvocationResult.md#value)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L30)

## Methods

### getDecodedLogs

▸ `Protected` **getDecodedLogs**(`receipts`): `never`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipts` | [`TransactionResultReceipt`](../namespaces/internal.md#transactionresultreceipt)[] |

#### Returns

`never`[]

#### Inherited from

[InvocationResult](InvocationResult.md).[getDecodedLogs](InvocationResult.md#getdecodedlogs)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:53](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L53)

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

[packages/contract/src/contracts/functions/invocation-results.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L43)

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

[packages/contract/src/contracts/functions/invocation-results.ts:130](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L130)
