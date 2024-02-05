# Class: FunctionInvocationResult&lt;T, TTransactionType\>

[@fuel-ts/program](/api/Program/index.md).FunctionInvocationResult

Represents the result of a function invocation with transaction details.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | The type of the returned value. |
| `TTransactionType` | `void` | The type of the transaction. |

## Hierarchy

- [`InvocationResult`](/api/Program/InvocationResult.md)&lt;`T`\>

  ↳ **`FunctionInvocationResult`**

## Constructors

### constructor

• **new FunctionInvocationResult**&lt;`T`, `TTransactionType`\>(`funcScopes`, `transactionResponse`, `transactionResult`, `program`, `isMultiCall`): [`FunctionInvocationResult`](/api/Program/FunctionInvocationResult.md)&lt;`T`, `TTransactionType`\>

Constructs an instance of FunctionInvocationResult.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcScopes` | [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike) \| [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[] | The function scopes. |
| `transactionResponse` | [`TransactionResponse`](/api/Providers/TransactionResponse.md) | The transaction response. |
| `transactionResult` | `TransactionResult`&lt;`TTransactionType`\> | The transaction result. |
| `program` | `AbstractProgram` | The program. |
| `isMultiCall` | `boolean` | Whether it's a multi-call. |

#### Returns

[`FunctionInvocationResult`](/api/Program/FunctionInvocationResult.md)&lt;`T`, `TTransactionType`\>

#### Overrides

[InvocationResult](/api/Program/InvocationResult.md).[constructor](/api/Program/InvocationResult.md#constructor)

#### Defined in

[packages/program/src/functions/invocation-results.ts:144](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/functions/invocation-results.ts#L144)

## Properties

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[]

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[functionScopes](/api/Program/InvocationResult.md#functionscopes)

#### Defined in

[packages/program/src/functions/invocation-results.ts:40](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/functions/invocation-results.ts#L40)

___

### gasUsed

• `Readonly` **gasUsed**: `BN`

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[gasUsed](/api/Program/InvocationResult.md#gasused)

#### Defined in

[packages/program/src/functions/invocation-results.ts:42](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/functions/invocation-results.ts#L42)

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[isMultiCall](/api/Program/InvocationResult.md#ismulticall)

#### Defined in

[packages/program/src/functions/invocation-results.ts:41](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/functions/invocation-results.ts#L41)

___

### logs

• `Readonly` **logs**: `any`[]

#### Defined in

[packages/program/src/functions/invocation-results.ts:133](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/functions/invocation-results.ts#L133)

___

### program

• `Readonly` **program**: `AbstractProgram`

#### Defined in

[packages/program/src/functions/invocation-results.ts:132](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/functions/invocation-results.ts#L132)

___

### transactionId

• `Readonly` **transactionId**: `string`

#### Defined in

[packages/program/src/functions/invocation-results.ts:129](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/functions/invocation-results.ts#L129)

___

### transactionResponse

• `Readonly` **transactionResponse**: [`TransactionResponse`](/api/Providers/TransactionResponse.md)

#### Defined in

[packages/program/src/functions/invocation-results.ts:130](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/functions/invocation-results.ts#L130)

___

### transactionResult

• `Readonly` **transactionResult**: `TransactionResult`&lt;`TTransactionType`\>

#### Defined in

[packages/program/src/functions/invocation-results.ts:131](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/functions/invocation-results.ts#L131)

___

### value

• `Readonly` **value**: `T`

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[value](/api/Program/InvocationResult.md#value)

#### Defined in

[packages/program/src/functions/invocation-results.ts:43](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/functions/invocation-results.ts#L43)

## Methods

### getDecodedLogs

▸ **getDecodedLogs**(`receipts`): `unknown`[]

Decodes the logs from the receipts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `receipts` | `TransactionResultReceipt`[] | The transaction result receipts. |

#### Returns

`unknown`[]

The decoded logs.

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[getDecodedLogs](/api/Program/InvocationResult.md#getdecodedlogs)

#### Defined in

[packages/program/src/functions/invocation-results.ts:108](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/functions/invocation-results.ts#L108)

___

### getDecodedValue

▸ **getDecodedValue**(`callResult`): `T`

Decodes the value from the call result.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callResult` | [`CallResult`](/api/Providers/index.md#callresult) | The call result. |

#### Returns

`T`

The decoded value.

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[getDecodedValue](/api/Program/InvocationResult.md#getdecodedvalue)

#### Defined in

[packages/program/src/functions/invocation-results.ts:82](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/functions/invocation-results.ts#L82)

___

### build

▸ **build**&lt;`T`, `TTransactionType`\>(`funcScope`, `transactionResponse`, `isMultiCall`, `program`): `Promise`&lt;[`FunctionInvocationResult`](/api/Program/FunctionInvocationResult.md)&lt;`T`, `TTransactionType`\>\>

Builds an instance of FunctionInvocationResult.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcScope` | [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike) \| [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[] | The function scope. |
| `transactionResponse` | [`TransactionResponse`](/api/Providers/TransactionResponse.md) | The transaction response. |
| `isMultiCall` | `boolean` | Whether it's a multi-call. |
| `program` | `AbstractProgram` | The program. |

#### Returns

`Promise`&lt;[`FunctionInvocationResult`](/api/Program/FunctionInvocationResult.md)&lt;`T`, `TTransactionType`\>\>

The function invocation result.

#### Defined in

[packages/program/src/functions/invocation-results.ts:168](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/functions/invocation-results.ts#L168)
