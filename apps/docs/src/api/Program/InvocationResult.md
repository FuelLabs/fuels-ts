# Class: InvocationResult&lt;T\>

[@fuel-ts/program](/api/Program/index.md).InvocationResult

Represents the result of a function invocation, with decoded logs and gas usage.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | The type of the returned value. |

## Hierarchy

- **`InvocationResult`**

  ↳ [`FunctionInvocationResult`](/api/Program/FunctionInvocationResult.md)

  ↳ [`InvocationCallResult`](/api/Program/InvocationCallResult.md)

## Constructors

### constructor

• **new InvocationResult**&lt;`T`\>(`funcScopes`, `callResult`, `isMultiCall`): [`InvocationResult`](/api/Program/InvocationResult.md)&lt;`T`\>

Constructs an instance of InvocationResult.

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

[`InvocationResult`](/api/Program/InvocationResult.md)&lt;`T`\>

#### Defined in

[functions/invocation-results.ts:53](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/invocation-results.ts#L53)

## Properties

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[]

#### Defined in

[functions/invocation-results.ts:41](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/invocation-results.ts#L41)

___

### gasUsed

• `Readonly` **gasUsed**: `BN`

#### Defined in

[functions/invocation-results.ts:43](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/invocation-results.ts#L43)

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Defined in

[functions/invocation-results.ts:42](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/invocation-results.ts#L42)

___

### value

• `Readonly` **value**: `T`

#### Defined in

[functions/invocation-results.ts:44](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/invocation-results.ts#L44)

## Methods

### getAbiFromAllCalls

▸ **getAbiFromAllCalls**(): [`JsonAbisFromAllCalls`](/api/Account/index.md#jsonabisfromallcalls)

Gets the ABI from all calls.

#### Returns

[`JsonAbisFromAllCalls`](/api/Account/index.md#jsonabisfromallcalls)

The ABIs from all calls.

#### Defined in

[functions/invocation-results.ts:83](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/invocation-results.ts#L83)

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

#### Defined in

[functions/invocation-results.ts:119](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/invocation-results.ts#L119)

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

#### Defined in

[functions/invocation-results.ts:93](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/invocation-results.ts#L93)

___

### getFirstCallConfig

▸ **getFirstCallConfig**(): `undefined` \| [`CallConfig`](/api/Program/index.md#callconfig)

Gets the first call config.

#### Returns

`undefined` \| [`CallConfig`](/api/Program/index.md#callconfig)

The first call config.

#### Defined in

[functions/invocation-results.ts:69](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/invocation-results.ts#L69)
