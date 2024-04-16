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

[types.ts:68](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/types.ts#L68)

## Properties

### isReadOnly

• **isReadOnly**: () => `boolean`

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

#### Defined in

[types.ts:69](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/types.ts#L69)
