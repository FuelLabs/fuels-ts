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

[types.ts:70](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/types.ts#L70)

## Properties

### isReadOnly

• **isReadOnly**: () => `boolean`

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

#### Defined in

[types.ts:71](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/types.ts#L71)
