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

[functions/invocation-results.ts:218](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L218)

## Properties

### callResult

• `Readonly` **callResult**: [`CallResult`](/api/Account/index.md#callresult)

#### Defined in

[functions/invocation-results.ts:209](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L209)

___

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

[functions/invocation-results.ts:235](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L235)
