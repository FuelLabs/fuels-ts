---
layout: default
title: FunctionInvocationResult
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: FunctionInvocationResult<T\>

[@fuel-ts/contract](../index.md).[internal](../namespaces/internal.md).FunctionInvocationResult

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- [`InvocationResult`](internal-InvocationResult.md)<`T`\>

  ↳ **`FunctionInvocationResult`**

## Constructors

### constructor

• **new FunctionInvocationResult**<`T`\>(`funcScopes`, `transactionResponse`, `transactionResult`, `isMultiCall`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScopes` | [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\> \| [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[] |
| `transactionResponse` | [`TransactionResponse`](internal-TransactionResponse.md) |
| `transactionResult` | [`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`\> |
| `isMultiCall` | `boolean` |

#### Overrides

[InvocationResult](internal-InvocationResult.md).[constructor](internal-InvocationResult.md#constructor)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:49](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L49)

## Properties

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[]

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[functionScopes](internal-InvocationResult.md#functionscopes)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L18)

___

### gasUsed

• `Readonly` **gasUsed**: `bigint`

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[gasUsed](internal-InvocationResult.md#gasused)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L20)

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[isMultiCall](internal-InvocationResult.md#ismulticall)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L19)

___

### transactionId

• `Readonly` **transactionId**: `string`

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L45)

___

### transactionResponse

• `Readonly` **transactionResponse**: [`TransactionResponse`](internal-TransactionResponse.md)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:46](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L46)

___

### transactionResult

• `Readonly` **transactionResult**: [`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`\>

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L47)

___

### value

• `Readonly` **value**: `T`

#### Inherited from

[InvocationResult](internal-InvocationResult.md).[value](internal-InvocationResult.md#value)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L21)

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

[packages/contract/src/contracts/functions/invocation-results.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L34)

___

### build

▸ `Static` **build**<`T`\>(`funcScope`, `transactionResponse`, `isMultiCall`): `Promise`<[`FunctionInvocationResult`](internal-FunctionInvocationResult.md)<`T`\>\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScope` | [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\> \| [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[] |
| `transactionResponse` | [`TransactionResponse`](internal-TransactionResponse.md) |
| `isMultiCall` | `boolean` |

#### Returns

`Promise`<[`FunctionInvocationResult`](internal-FunctionInvocationResult.md)<`T`\>\>

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:61](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L61)
