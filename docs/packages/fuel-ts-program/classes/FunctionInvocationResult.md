---
layout: default
title: FunctionInvocationResult
parent: "@fuel-ts/program"
nav_order: 1

---

# Class: FunctionInvocationResult<T, TTransactionType\>

[@fuel-ts/program](../index.md).FunctionInvocationResult

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |
| `TTransactionType` | `void` |

## Hierarchy

- [`InvocationResult`](InvocationResult.md)<`T`\>

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
| `funcScopes` | [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\> \| [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[] |
| `transactionResponse` | [`TransactionResponse`](internal-TransactionResponse.md) |
| `transactionResult` | [`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`, `TTransactionType`\> |
| `program` | [`AbstractProgram`](internal-AbstractProgram.md) |
| `isMultiCall` | `boolean` |

#### Overrides

[InvocationResult](InvocationResult.md).[constructor](InvocationResult.md#constructor)

#### Defined in

[packages/program/src/functions/invocation-results.ts:89](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L89)

## Properties

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

### logs

• `Readonly` **logs**: `any`[]

#### Defined in

[packages/program/src/functions/invocation-results.ts:87](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L87)

___

### program

• `Readonly` **program**: [`AbstractProgram`](internal-AbstractProgram.md)

#### Defined in

[packages/program/src/functions/invocation-results.ts:86](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L86)

___

### transactionId

• `Readonly` **transactionId**: `string`

#### Defined in

[packages/program/src/functions/invocation-results.ts:83](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L83)

___

### transactionResponse

• `Readonly` **transactionResponse**: [`TransactionResponse`](internal-TransactionResponse.md)

#### Defined in

[packages/program/src/functions/invocation-results.ts:84](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L84)

___

### transactionResult

• `Readonly` **transactionResult**: [`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`, `TTransactionType`\>

#### Defined in

[packages/program/src/functions/invocation-results.ts:85](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L85)

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

▸ `Static` **build**<`T`, `TTransactionType`\>(`funcScope`, `transactionResponse`, `isMultiCall`, `program`): `Promise`<[`FunctionInvocationResult`](FunctionInvocationResult.md)<`T`, `TTransactionType`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScope` | [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\> \| [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[] |
| `transactionResponse` | [`TransactionResponse`](internal-TransactionResponse.md) |
| `isMultiCall` | `boolean` |
| `program` | [`AbstractProgram`](internal-AbstractProgram.md) |

#### Returns

`Promise`<[`FunctionInvocationResult`](FunctionInvocationResult.md)<`T`, `TTransactionType`\>\>

#### Defined in

[packages/program/src/functions/invocation-results.ts:104](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/invocation-results.ts#L104)
