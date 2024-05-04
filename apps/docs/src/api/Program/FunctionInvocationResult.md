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
| `transactionResponse` | [`TransactionResponse`](/api/Account/TransactionResponse.md) | The transaction response. |
| `transactionResult` | `TransactionResult`&lt;`TTransactionType`\> | The transaction result. |
| `program` | `AbstractProgram` | The program. |
| `isMultiCall` | `boolean` | Whether it's a multi-call. |

#### Returns

[`FunctionInvocationResult`](/api/Program/FunctionInvocationResult.md)&lt;`T`, `TTransactionType`\>

#### Overrides

[InvocationResult](/api/Program/InvocationResult.md).[constructor](/api/Program/InvocationResult.md#constructor)

#### Defined in

[functions/invocation-results.ts:161](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L161)

## Properties

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[]

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[functionScopes](/api/Program/InvocationResult.md#functionscopes)

#### Defined in

[functions/invocation-results.ts:42](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L42)

___

### gasUsed

• `Readonly` **gasUsed**: `BN`

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[gasUsed](/api/Program/InvocationResult.md#gasused)

#### Defined in

[functions/invocation-results.ts:44](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L44)

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[isMultiCall](/api/Program/InvocationResult.md#ismulticall)

#### Defined in

[functions/invocation-results.ts:43](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L43)

___

### logs

• `Readonly` **logs**: `any`[]

#### Defined in

[functions/invocation-results.ts:150](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L150)

___

### program

• `Readonly` **program**: `AbstractProgram`

#### Defined in

[functions/invocation-results.ts:149](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L149)

___

### transactionId

• `Readonly` **transactionId**: `string`

#### Defined in

[functions/invocation-results.ts:146](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L146)

___

### transactionResponse

• `Readonly` **transactionResponse**: [`TransactionResponse`](/api/Account/TransactionResponse.md)

#### Defined in

[functions/invocation-results.ts:147](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L147)

___

### transactionResult

• `Readonly` **transactionResult**: `TransactionResult`&lt;`TTransactionType`\>

#### Defined in

[functions/invocation-results.ts:148](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L148)

___

### value

• `Readonly` **value**: `T`

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[value](/api/Program/InvocationResult.md#value)

#### Defined in

[functions/invocation-results.ts:45](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L45)

## Methods

### getAbiFromAllCalls

▸ **getAbiFromAllCalls**(): [`JsonAbisFromAllCalls`](/api/Account/index.md#jsonabisfromallcalls)

Gets the ABI from all calls.

#### Returns

[`JsonAbisFromAllCalls`](/api/Account/index.md#jsonabisfromallcalls)

The ABIs from all calls.

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[getAbiFromAllCalls](/api/Program/InvocationResult.md#getabifromallcalls)

#### Defined in

[functions/invocation-results.ts:84](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L84)

___

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

[functions/invocation-results.ts:124](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L124)

___

### getDecodedValue

▸ **getDecodedValue**(`callResult`): `T`

Decodes the value from the call result.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callResult` | [`CallResult`](/api/Account/index.md#callresult) | The call result. |

#### Returns

`T`

The decoded value.

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[getDecodedValue](/api/Program/InvocationResult.md#getdecodedvalue)

#### Defined in

[functions/invocation-results.ts:94](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L94)

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
| `transactionResponse` | [`TransactionResponse`](/api/Account/TransactionResponse.md) | The transaction response. |
| `isMultiCall` | `boolean` | Whether it's a multi-call. |
| `program` | `AbstractProgram` | The program. |

#### Returns

`Promise`&lt;[`FunctionInvocationResult`](/api/Program/FunctionInvocationResult.md)&lt;`T`, `TTransactionType`\>\>

The function invocation result.

#### Defined in

[functions/invocation-results.ts:185](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L185)
