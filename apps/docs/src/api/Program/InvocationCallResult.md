# Class: InvocationCallResult&lt;T\>

[@fuel-ts/program](/api/Program/index.md).InvocationCallResult

Represents the result of an invocation call.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | The type of the returned value. |

## Hierarchy

- [`InvocationResult`](/api/Program/InvocationResult.md)&lt;`T`\>

  ↳ **`InvocationCallResult`**

## Constructors

### constructor

• **new InvocationCallResult**&lt;`T`\>(`funcScopes`, `callResult`, `isMultiCall`): [`InvocationCallResult`](/api/Program/InvocationCallResult.md)&lt;`T`\>

Constructs an instance of InvocationCallResult.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcScopes` | [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike) \| [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[] | The function scopes. |
| `callResult` | [`CallResult`](/api/Account/index.md#callresult) | The call result. |
| `isMultiCall` | `boolean` | Whether it's a multi-call. |

#### Returns

[`InvocationCallResult`](/api/Program/InvocationCallResult.md)&lt;`T`\>

#### Overrides

[InvocationResult](/api/Program/InvocationResult.md).[constructor](/api/Program/InvocationResult.md#constructor)

#### Defined in

[packages/program/src/functions/invocation-results.ts:201](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L201)

## Properties

### callResult

• `Readonly` **callResult**: [`CallResult`](/api/Account/index.md#callresult)

#### Defined in

[packages/program/src/functions/invocation-results.ts:192](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L192)

___

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[]

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[functionScopes](/api/Program/InvocationResult.md#functionscopes)

#### Defined in

[packages/program/src/functions/invocation-results.ts:40](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L40)

___

### gasUsed

• `Readonly` **gasUsed**: `BN`

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[gasUsed](/api/Program/InvocationResult.md#gasused)

#### Defined in

[packages/program/src/functions/invocation-results.ts:42](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L42)

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[isMultiCall](/api/Program/InvocationResult.md#ismulticall)

#### Defined in

[packages/program/src/functions/invocation-results.ts:41](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L41)

___

### value

• `Readonly` **value**: `T`

#### Inherited from

[InvocationResult](/api/Program/InvocationResult.md).[value](/api/Program/InvocationResult.md#value)

#### Defined in

[packages/program/src/functions/invocation-results.ts:43](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L43)

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

[packages/program/src/functions/invocation-results.ts:108](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L108)

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

[packages/program/src/functions/invocation-results.ts:82](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L82)

___

### build

▸ **build**&lt;`T`\>(`funcScopes`, `callResult`, `isMultiCall`): `Promise`&lt;[`InvocationCallResult`](/api/Program/InvocationCallResult.md)&lt;`T`\>\>

Builds an instance of InvocationCallResult.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcScopes` | [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike) \| [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[] | The function scopes. |
| `callResult` | [`CallResult`](/api/Account/index.md#callresult) | The call result. |
| `isMultiCall` | `boolean` | Whether it's a multi-call. |

#### Returns

`Promise`&lt;[`InvocationCallResult`](/api/Program/InvocationCallResult.md)&lt;`T`\>\>

The invocation call result.

#### Defined in

[packages/program/src/functions/invocation-results.ts:218](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L218)
