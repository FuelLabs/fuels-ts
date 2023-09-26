# Class: Script&lt;TInput, TOutput\>

[@fuel-ts/script](/api/Script/index.md).Script

`Script` provides a typed interface for interacting with the script program type.

## Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | extends `any`[] |
| `TOutput` | `TOutput` |

## Hierarchy

- `AbstractScript`

  ↳ **`Script`**

## Constructors

### constructor

• **new Script**&lt;`TInput`, `TOutput`\>(`bytecode`, `abi`, `account`)

Create a new instance of the Script class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | extends `any`[] |
| `TOutput` | `TOutput` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytecode` | `BytesLike` | The compiled bytecode of the script. |
| `abi` | `JsonAbi` | The ABI interface for the script. |
| `account` | [`Account`](/api/Wallet/Account.md) | The account associated with the script. |

#### Overrides

AbstractScript.constructor

#### Defined in

[script.ts:71](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/script/src/script.ts#L71)

## Properties

### account

• **account**: [`Account`](/api/Wallet/Account.md)

The account associated with the script.

#### Overrides

AbstractScript.account

#### Defined in

[script.ts:47](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/script/src/script.ts#L47)

___

### bytes

• **bytes**: `Uint8Array`

The compiled bytecode of the script.

#### Overrides

AbstractScript.bytes

#### Defined in

[script.ts:37](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/script/src/script.ts#L37)

___

### functions

• **functions**: `Object`

Functions that can be invoked within the script.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `main` | `InvokeMain`&lt;`TInput`, `TOutput`\> |

#### Defined in

[script.ts:62](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/script/src/script.ts#L62)

___

### interface

• **interface**: `Interface`&lt;`JsonAbi`\>

The ABI interface for the script.

#### Overrides

AbstractScript.interface

#### Defined in

[script.ts:42](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/script/src/script.ts#L42)

___

### provider

• **provider**: [`Provider`](/api/Providers/Provider.md)

The provider used for interacting with the network.

#### Overrides

AbstractScript.provider

#### Defined in

[script.ts:57](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/script/src/script.ts#L57)

___

### script

• **script**: [`ScriptRequest`](/api/Program/ScriptRequest.md)&lt;`InputValue`&lt;`void`\>[], `Result`&lt;`TOutput`\>\>

The script request object.

#### Defined in

[script.ts:52](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/script/src/script.ts#L52)

## Methods

### setConfigurableConstants

▸ **setConfigurableConstants**(`configurables`): [`Script`](/api/Script/Script.md)&lt;`TInput`, `TOutput`\>

Set the configurable constants of the script.

**`Throws`**

Will throw an error if the script has no configurable constants to be set or if an invalid constant is provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configurables` | `Object` | An object containing the configurable constants and their values. |

#### Returns

[`Script`](/api/Script/Script.md)&lt;`TInput`, `TOutput`\>

This instance of the `Script`.

#### Defined in

[script.ts:92](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packages/script/src/script.ts#L92)
