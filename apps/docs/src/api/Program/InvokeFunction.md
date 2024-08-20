# Interface: InvokeFunction&lt;TArgs, TReturn\>

[@fuel-ts/program](/api/Program/index.md).InvokeFunction

Represents a function that can be invoked.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TArgs` | extends `any`[] = `any`[] | Type of the function's arguments. |
| `TReturn` | `any` | Type of the function's return value. |

## Callable

### InvokeFunction

▸ **InvokeFunction**(`...args`): [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `TArgs` |

#### Returns

[`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

#### Defined in

[types.ts:71](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/types.ts#L71)

## Properties

### isReadOnly

• **isReadOnly**: () => `boolean`

Checks if the function is read-only i.e. it only reads from storage, does not write to it.

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

#### Defined in

[types.ts:77](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/types.ts#L77)
