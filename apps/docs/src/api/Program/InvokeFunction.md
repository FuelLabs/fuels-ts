[**@fuel-ts/program v0.94.2**](../index.md) • **Docs**

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

[types.ts:71](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/program/src/types.ts#L71)

## Properties

### isReadOnly()

> **isReadOnly**: () => `boolean`

Checks if the function is read-only i.e. it only reads from storage, does not write to it.

#### Returns

`boolean`

True if the function is read-only or pure, false otherwise.

#### Defined in

[types.ts:77](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/program/src/types.ts#L77)
