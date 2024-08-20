# Class: ScriptRequest&lt;TData, TResult\>

[@fuel-ts/program](/api/Program/index.md).ScriptRequest

`ScriptRequest` provides functionality to encode and decode script data and results.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TData` | `void` | Type of the script data. |
| `TResult` | `void` | Type of the script result. |

## Constructors

### constructor

• **new ScriptRequest**&lt;`TData`, `TResult`\>(`bytes`, `scriptDataEncoder`, `scriptResultDecoder`): [`ScriptRequest`](/api/Program/ScriptRequest.md)&lt;`TData`, `TResult`\>

Creates an instance of the ScriptRequest class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TData` | `void` |
| `TResult` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The bytes of the script. |
| `scriptDataEncoder` | (`data`: `TData`) => `EncodedScriptCall` | The script data encoder function. |
| `scriptResultDecoder` | (`scriptResult`: `ScriptResult`) => `TResult` | The script result decoder function. |

#### Returns

[`ScriptRequest`](/api/Program/ScriptRequest.md)&lt;`TData`, `TResult`\>

#### Defined in

[script-request.ts:205](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/script-request.ts#L205)

## Properties

### bytes

• **bytes**: `Uint8Array`

The bytes of the script.

#### Defined in

[script-request.ts:186](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/script-request.ts#L186)

___

### scriptDataEncoder

• **scriptDataEncoder**: (`data`: `TData`) => `EncodedScriptCall`

A function to encode the script data.

#### Type declaration

▸ (`data`): `EncodedScriptCall`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `TData` |

##### Returns

`EncodedScriptCall`

#### Defined in

[script-request.ts:191](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/script-request.ts#L191)

___

### scriptResultDecoder

• **scriptResultDecoder**: (`scriptResult`: `ScriptResult`) => `TResult`

A function to decode the script result.

#### Type declaration

▸ (`scriptResult`): `TResult`

##### Parameters

| Name | Type |
| :------ | :------ |
| `scriptResult` | `ScriptResult` |

##### Returns

`TResult`

#### Defined in

[script-request.ts:196](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/script-request.ts#L196)

## Methods

### decodeCallResult

▸ **decodeCallResult**(`callResult`, `logs?`): `TResult`

Decodes the result of a script call.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `callResult` | [`CallResult`](/api/Account/index.md#callresult) | `undefined` | The CallResult from the script call. |
| `logs` | `any`[] | `[]` | Optional logs associated with the decoding. |

#### Returns

`TResult`

The decoded result.

#### Defined in

[script-request.ts:262](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/script-request.ts#L262)

___

### encodeScriptData

▸ **encodeScriptData**(`data`): `Uint8Array`

Encodes the data for a script call.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `TData` | The script data. |

#### Returns

`Uint8Array`

The encoded data.

#### Defined in

[script-request.ts:243](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/script-request.ts#L243)

___

### getScriptDataOffset

▸ **getScriptDataOffset**(`maxInputs`): `number`

Gets the script data offset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxInputs` | `number` | The maxInputs value from the chain's consensus params. |

#### Returns

`number`

The script data offset.

#### Defined in

[script-request.ts:233](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/script-request.ts#L233)

___

### getScriptDataOffsetWithScriptBytes

▸ **getScriptDataOffsetWithScriptBytes**(`byteLength`, `maxInputs`): `number`

Gets the script data offset for the given bytes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `byteLength` | `number` | The byte length of the script. |
| `maxInputs` | `number` | The maxInputs value from the chain's consensus params. |

#### Returns

`number`

The script data offset.

#### Defined in

[script-request.ts:222](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/script-request.ts#L222)
