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

• **new Script**&lt;`TInput`, `TOutput`\>(`bytecode`, `abi`, `account`): [`Script`](/api/Script/Script.md)&lt;`TInput`, `TOutput`\>

Create a new instance of the Script class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TInput` | extends `any`[] |
| `TOutput` | `TOutput` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytecode` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The compiled bytecode of the script. |
| `abi` | `JsonAbi` | The ABI interface for the script. |
| `account` | [`Account`](/api/Account/Account.md) | The account associated with the script. |

#### Returns

[`Script`](/api/Script/Script.md)&lt;`TInput`, `TOutput`\>

#### Overrides

AbstractScript.constructor

#### Defined in

[script.ts:70](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/script/src/script.ts#L70)

## Properties

### account

• **account**: [`Account`](/api/Account/Account.md)

The account associated with the script.

#### Overrides

AbstractScript.account

#### Defined in

[script.ts:46](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/script/src/script.ts#L46)

___

### bytes

• **bytes**: `Uint8Array`

The compiled bytecode of the script.

#### Overrides

AbstractScript.bytes

#### Defined in

[script.ts:36](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/script/src/script.ts#L36)

___

### functions

• **functions**: `Object`

Functions that can be invoked within the script.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `main` | `InvokeMain`&lt;`TInput`, `TOutput`\> |

#### Defined in

[script.ts:61](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/script/src/script.ts#L61)

___

### interface

• **interface**: `Interface`

The ABI interface for the script.

#### Overrides

AbstractScript.interface

#### Defined in

[script.ts:41](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/script/src/script.ts#L41)

___

### provider

• **provider**: [`Provider`](/api/Account/Provider.md)

The provider used for interacting with the network.

#### Overrides

AbstractScript.provider

#### Defined in

[script.ts:56](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/script/src/script.ts#L56)

___

### script

• **script**: [`ScriptRequest`](/api/Program/ScriptRequest.md)&lt;`InputValue`&lt;`void`\>[], `Result`&lt;`TOutput`\>\>

The script request object.

#### Defined in

[script.ts:51](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/script/src/script.ts#L51)

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

[script.ts:91](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/script/src/script.ts#L91)
