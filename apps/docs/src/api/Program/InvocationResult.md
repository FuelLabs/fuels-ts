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

[packages/program/src/functions/invocation-results.ts:52](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L52)

## Properties

### functionScopes

• `Readonly` **functionScopes**: [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[]

#### Defined in

[packages/program/src/functions/invocation-results.ts:40](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L40)

___

### gasUsed

• `Readonly` **gasUsed**: `BN`

#### Defined in

[packages/program/src/functions/invocation-results.ts:42](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L42)

___

### isMultiCall

• `Readonly` **isMultiCall**: `boolean`

#### Defined in

[packages/program/src/functions/invocation-results.ts:41](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L41)

___

### value

• `Readonly` **value**: `T`

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

#### Defined in

[packages/program/src/functions/invocation-results.ts:82](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L82)

___

### getFirstCallConfig

▸ **getFirstCallConfig**(): `undefined` \| [`CallConfig`](/api/Program/index.md#callconfig)

Gets the first call config.

#### Returns

`undefined` \| [`CallConfig`](/api/Program/index.md#callconfig)

The first call config.

#### Defined in

[packages/program/src/functions/invocation-results.ts:68](https://github.com/FuelLabs/fuels-ts/blob/e239ba64/packages/program/src/functions/invocation-results.ts#L68)
