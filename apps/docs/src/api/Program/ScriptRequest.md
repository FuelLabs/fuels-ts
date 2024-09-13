[**@fuel-ts/program v0.94.6**](../index.md) • **Docs**

***

# Class: ScriptRequest\&lt;TData, TResult\>

`ScriptRequest` provides functionality to encode and decode script data and results.

## Type Parameters

• **TData** = `void`

Type of the script data.

• **TResult** = `void`

Type of the script result.

## Constructors

### new ScriptRequest()

> **new ScriptRequest**\&lt;`TData`, `TResult`\>(`bytes`, `scriptDataEncoder`, `scriptResultDecoder`): [`ScriptRequest`](ScriptRequest.md)\&lt;`TData`, `TResult`\>

Creates an instance of the ScriptRequest class.

#### Parameters

• **bytes**: [`BytesLike`](../Interfaces/index.md#byteslike)

The bytes of the script.

• **scriptDataEncoder**

The script data encoder function.

• **scriptResultDecoder**

The script result decoder function.

#### Returns

[`ScriptRequest`](ScriptRequest.md)\&lt;`TData`, `TResult`\>

#### Defined in

[script-request.ts:205](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/script-request.ts#L205)

## Properties

### bytes

> **bytes**: `Uint8Array`

The bytes of the script.

#### Defined in

[script-request.ts:186](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/script-request.ts#L186)

***

### scriptDataEncoder()

> **scriptDataEncoder**: (`data`) => `EncodedScriptCall`

A function to encode the script data.

#### Parameters

• **data**: `TData`

#### Returns

`EncodedScriptCall`

#### Defined in

[script-request.ts:191](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/script-request.ts#L191)

***

### scriptResultDecoder()

> **scriptResultDecoder**: (`scriptResult`) => `TResult`

A function to decode the script result.

#### Parameters

• **scriptResult**: `ScriptResult`

#### Returns

`TResult`

#### Defined in

[script-request.ts:196](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/script-request.ts#L196)

## Methods

### decodeCallResult()

> **decodeCallResult**(`callResult`, `logs`): `TResult`

Decodes the result of a script call.

#### Parameters

• **callResult**: [`CallResult`](../Account/index.md#callresult)

The CallResult from the script call.

• **logs**: `any`[] = `[]`

Optional logs associated with the decoding.

#### Returns

`TResult`

The decoded result.

#### Defined in

[script-request.ts:262](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/script-request.ts#L262)

***

### encodeScriptData()

> **encodeScriptData**(`data`): `Uint8Array`

Encodes the data for a script call.

#### Parameters

• **data**: `TData`

The script data.

#### Returns

`Uint8Array`

The encoded data.

#### Defined in

[script-request.ts:243](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/script-request.ts#L243)

***

### getScriptDataOffset()

> **getScriptDataOffset**(`maxInputs`): `number`

Gets the script data offset.

#### Parameters

• **maxInputs**: `number`

The maxInputs value from the chain's consensus params.

#### Returns

`number`

The script data offset.

#### Defined in

[script-request.ts:233](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/script-request.ts#L233)

***

### getScriptDataOffsetWithScriptBytes()

> `static` **getScriptDataOffsetWithScriptBytes**(`byteLength`, `maxInputs`): `number`

Gets the script data offset for the given bytes.

#### Parameters

• **byteLength**: `number`

The byte length of the script.

• **maxInputs**: `number`

The maxInputs value from the chain's consensus params.

#### Returns

`number`

The script data offset.

#### Defined in

[script-request.ts:222](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/script-request.ts#L222)
