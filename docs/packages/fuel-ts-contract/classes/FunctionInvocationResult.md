---
layout: default
title: FunctionInvocationResult
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: FunctionInvocationResult<T, TTransactionType\>

[@fuel-ts/contract](../index.md).FunctionInvocationResult

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

• **new FunctionInvocationResult**<`T`, `TTransactionType`\>(`funcScopes`, `transactionResponse`, `transactionResult`, `contract`, `isMultiCall`)

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
| `contract` | [`Contract`](Contract.md) |
| `isMultiCall` | `boolean` |

#### Overrides

[InvocationResult](InvocationResult.md).[constructor](InvocationResult.md#constructor)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:86](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L86)

## Properties

### contract

• `Readonly` **contract**: [`Contract`](Contract.md)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:83](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L83)

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

### logs

• `Readonly` **logs**: `any`[]

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:84](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L84)

___

### transactionId

• `Readonly` **transactionId**: `string`

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:80](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L80)

___

### transactionResponse

• `Readonly` **transactionResponse**: [`TransactionResponse`](internal-TransactionResponse.md)

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:81](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L81)

___

### transactionResult

• `Readonly` **transactionResult**: [`TransactionResult`](../namespaces/internal.md#transactionresult)<`any`, `TTransactionType`\>

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:82](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L82)

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

▸ `Static` **build**<`T`, `TTransactionType`\>(`funcScope`, `transactionResponse`, `isMultiCall`, `contract`): `Promise`<[`FunctionInvocationResult`](FunctionInvocationResult.md)<`T`, `TTransactionType`\>\>

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
| `contract` | [`Contract`](Contract.md) |

#### Returns

`Promise`<[`FunctionInvocationResult`](FunctionInvocationResult.md)<`T`, `TTransactionType`\>\>

#### Defined in

[packages/contract/src/contracts/functions/invocation-results.ts:101](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-results.ts#L101)
