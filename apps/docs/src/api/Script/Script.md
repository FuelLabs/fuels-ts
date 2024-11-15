[**@fuel-ts/script v0.97.0**](../index.md) • **Docs**

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

[script/src/script.ts:70](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/script/src/script.ts#L70)

## Properties

### account

> **account**: [`Account`](../Account/Account.md)

The account associated with the script.

#### Overrides

`AbstractScript.account`

#### Defined in

[script/src/script.ts:46](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/script/src/script.ts#L46)

***

### bytes

> **bytes**: `Uint8Array`

The compiled bytecode of the script.

#### Overrides

`AbstractScript.bytes`

#### Defined in

[script/src/script.ts:36](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/script/src/script.ts#L36)

***

### functions

> **functions**: `object`

Functions that can be invoked within the script.

#### main

> **main**: `InvokeMain`\&lt;`TInput`, `TOutput`\>

#### Defined in

[script/src/script.ts:61](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/script/src/script.ts#L61)

***

### interface

> **interface**: `Interface`

The ABI interface for the script.

#### Overrides

`AbstractScript.interface`

#### Defined in

[script/src/script.ts:41](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/script/src/script.ts#L41)

***

### provider

> **provider**: [`Provider`](../Account/Provider.md)

The provider used for interacting with the network.

#### Overrides

`AbstractScript.provider`

#### Defined in

[script/src/script.ts:56](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/script/src/script.ts#L56)

***

### script

> **script**: [`ScriptRequest`](../Program/ScriptRequest.md)\&lt;`InputValue`\&lt;`void`\>[], `Result`\&lt;`TOutput`\>\>

The script request object.

#### Defined in

[script/src/script.ts:51](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/script/src/script.ts#L51)

## Methods

### deploy()

> **deploy**\&lt;`T`\>(`account`): `Promise`\&lt;`object`\>

#### Type Parameters

• **T** = [`Script`](Script.md)\&lt;`TInput`, `TOutput`\>

#### Parameters

• **account**: [`Account`](../Account/Account.md)

The account used to pay the deployment costs.

#### Returns

`Promise`\&lt;`object`\>

The _blobId_ and a _waitForResult_ callback that returns the deployed predicate
once the blob deployment transaction finishes.

The returned loader script will have the same configurable constants
as the original script which was used to generate the loader script.

##### blobId

> **blobId**: `string`

##### waitForResult()

> **waitForResult**: () => `Promise`\&lt;`T`\>

###### Returns

`Promise`\&lt;`T`\>

#### Defined in

[script/src/script.ts:133](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/script/src/script.ts#L133)

***

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

[script/src/script.ts:91](https://github.com/FuelLabs/fuels-ts/blob/4c225773d9c890e3b3b178fd875342439d5d1ede/packages/script/src/script.ts#L91)
