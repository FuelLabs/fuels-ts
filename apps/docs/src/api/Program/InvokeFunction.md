[**@fuel-ts/program v0.95.0**](../index.md) • **Docs**

***

# Interface: InvokeFunction()\&lt;TArgs, TReturn\>

Represents a function that can be invoked.

## Type Parameters

• **TArgs** *extends* `any`[] = `any`[]

Type of the function's arguments.

• **TReturn** = `any`

Type of the function's return value.

> **InvokeFunction**(...`args`): [`FunctionInvocationScope`](./FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

Represents a function that can be invoked.

## Parameters

• ...**args**: `TArgs`

## Returns

[`FunctionInvocationScope`](./FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

## Defined in

[types.ts:71](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/types.ts#L71)

## Properties

### isReadOnly()

> **isReadOnly**: () => `boolean`

Checks if the function is read-only i.e. it only reads from storage, does not write to it.

#### Returns

`boolean`

True if the function is read-only or pure, false otherwise.

#### Defined in

[types.ts:77](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/types.ts#L77)