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

[functions/invocation-results.ts:54](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L54)

## Properties

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[]

#### Defined in

[functions/invocation-results.ts:42](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L42)

___

### gasUsed

• `Readonly` **gasUsed**: `BN`

#### Defined in

[functions/invocation-results.ts:44](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L44)

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Defined in

[functions/invocation-results.ts:43](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L43)

___

### value

• `Readonly` **value**: `T`

#### Defined in

[functions/invocation-results.ts:45](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L45)

## Methods

### getAbiFromAllCalls

▸ **getAbiFromAllCalls**(): [`JsonAbisFromAllCalls`](/api/Account/index.md#jsonabisfromallcalls)

Gets the ABI from all calls.

#### Returns

[`JsonAbisFromAllCalls`](/api/Account/index.md#jsonabisfromallcalls)

The ABIs from all calls.

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

#### Defined in

[functions/invocation-results.ts:94](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L94)

___

### getFirstCallConfig

▸ **getFirstCallConfig**(): `undefined` \| [`CallConfig`](/api/Program/index.md#callconfig)

Gets the first call config.

#### Returns

`undefined` \| [`CallConfig`](/api/Program/index.md#callconfig)

The first call config.

#### Defined in

[functions/invocation-results.ts:70](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/functions/invocation-results.ts#L70)
