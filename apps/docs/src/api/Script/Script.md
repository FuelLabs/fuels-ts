[**@fuel-ts/script v0.96.0**](../index.md) • **Docs**

***

# Class: Script\&lt;TInput, TOutput\>

`Script` provides a typed interface for interacting with the script program type.

## Extends

- `AbstractScript`

## Type Parameters

• **TInput** *extends* `any`[]

• **TOutput**

## Constructors

### new Script()

> **new Script**\&lt;`TInput`, `TOutput`\>(`bytecode`, `abi`, `account`): [`Script`](Script.md)\&lt;`TInput`, `TOutput`\>

Create a new instance of the Script class.

#### Parameters

• **bytecode**: [`BytesLike`](../Interfaces/index.md#byteslike)

The compiled bytecode of the script.

• **abi**: `JsonAbi`

The ABI interface for the script.

• **account**: [`Account`](../Account/Account.md)

The account associated with the script.

#### Returns

[`Script`](Script.md)\&lt;`TInput`, `TOutput`\>

#### Overrides

`AbstractScript.constructor`

#### Defined in

[script.ts:70](https://github.com/FuelLabs/fuels-ts/blob/793ac1bcd1e3f1560372e455e3b77c2d623e78b6/packages/script/src/script.ts#L70)

## Properties

### account

> **account**: [`Account`](../Account/Account.md)

The account associated with the script.

#### Overrides

`AbstractScript.account`

#### Defined in

[script.ts:46](https://github.com/FuelLabs/fuels-ts/blob/793ac1bcd1e3f1560372e455e3b77c2d623e78b6/packages/script/src/script.ts#L46)

***

### bytes

> **bytes**: `Uint8Array`

The compiled bytecode of the script.

#### Overrides

`AbstractScript.bytes`

#### Defined in

[script.ts:36](https://github.com/FuelLabs/fuels-ts/blob/793ac1bcd1e3f1560372e455e3b77c2d623e78b6/packages/script/src/script.ts#L36)

***

### functions

> **functions**: `object`

Functions that can be invoked within the script.

#### main

> **main**: `InvokeMain`\&lt;`TInput`, `TOutput`\>

#### Defined in

[script.ts:61](https://github.com/FuelLabs/fuels-ts/blob/793ac1bcd1e3f1560372e455e3b77c2d623e78b6/packages/script/src/script.ts#L61)

***

### interface

> **interface**: `Interface`

The ABI interface for the script.

#### Overrides

`AbstractScript.interface`

#### Defined in

[script.ts:41](https://github.com/FuelLabs/fuels-ts/blob/793ac1bcd1e3f1560372e455e3b77c2d623e78b6/packages/script/src/script.ts#L41)

***

### provider

> **provider**: [`Provider`](../Account/Provider.md)

The provider used for interacting with the network.

#### Overrides

`AbstractScript.provider`

#### Defined in

[script.ts:56](https://github.com/FuelLabs/fuels-ts/blob/793ac1bcd1e3f1560372e455e3b77c2d623e78b6/packages/script/src/script.ts#L56)

***

### script

> **script**: [`ScriptRequest`](../Program/ScriptRequest.md)\&lt;`InputValue`\&lt;`void`\>[], `Result`\&lt;`TOutput`\>\>

The script request object.

#### Defined in

[script.ts:51](https://github.com/FuelLabs/fuels-ts/blob/793ac1bcd1e3f1560372e455e3b77c2d623e78b6/packages/script/src/script.ts#L51)

## Methods

### setConfigurableConstants()

> **setConfigurableConstants**(`configurables`): [`Script`](Script.md)\&lt;`TInput`, `TOutput`\>

Set the configurable constants of the script.

#### Parameters

• **configurables**

An object containing the configurable constants and their values.

#### Returns

[`Script`](Script.md)\&lt;`TInput`, `TOutput`\>

This instance of the `Script`.

#### Throws

Will throw an error if the script has no configurable constants to be set or if an invalid constant is provided.

#### Defined in

[script.ts:91](https://github.com/FuelLabs/fuels-ts/blob/793ac1bcd1e3f1560372e455e3b77c2d623e78b6/packages/script/src/script.ts#L91)
