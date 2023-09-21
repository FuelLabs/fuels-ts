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

• **new ScriptRequest**&lt;`TData`, `TResult`\>(`bytes`, `scriptDataEncoder`, `scriptResultDecoder`)

Creates an instance of the ScriptRequest class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TData` | `void` |
| `TResult` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `BytesLike` | The bytes of the script. |
| `scriptDataEncoder` | (`data`: `TData`) => `EncodedScriptCall` | The script data encoder function. |
| `scriptResultDecoder` | (`scriptResult`: `ScriptResult`) => `TResult` | The script result decoder function. |

#### Defined in

[packages/program/src/script-request.ts:214](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/program/src/script-request.ts#L214)

## Properties

### bytes

• **bytes**: `Uint8Array`

The bytes of the script.

#### Defined in

[packages/program/src/script-request.ts:195](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/program/src/script-request.ts#L195)

___

### scriptDataEncoder

• **scriptDataEncoder**: (`data`: `TData`) => `EncodedScriptCall`

#### Type declaration

▸ (`data`): `EncodedScriptCall`

A function to encode the script data.

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `TData` |

##### Returns

`EncodedScriptCall`

#### Defined in

[packages/program/src/script-request.ts:200](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/program/src/script-request.ts#L200)

___

### scriptResultDecoder

• **scriptResultDecoder**: (`scriptResult`: `ScriptResult`) => `TResult`

#### Type declaration

▸ (`scriptResult`): `TResult`

A function to decode the script result.

##### Parameters

| Name | Type |
| :------ | :------ |
| `scriptResult` | `ScriptResult` |

##### Returns

`TResult`

#### Defined in

[packages/program/src/script-request.ts:205](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/program/src/script-request.ts#L205)

## Methods

### decodeCallResult

▸ **decodeCallResult**(`callResult`, `logs?`): `TResult`

Decodes the result of a script call.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `callResult` | [`CallResult`](/api/Providers/index.md#callresult) | `undefined` | The CallResult from the script call. |
| `logs` | `any`[] | `[]` | Optional logs associated with the decoding. |

#### Returns

`TResult`

The decoded result.

#### Defined in

[packages/program/src/script-request.ts:271](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/program/src/script-request.ts#L271)

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

[packages/program/src/script-request.ts:252](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/program/src/script-request.ts#L252)

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

[packages/program/src/script-request.ts:242](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/program/src/script-request.ts#L242)

___

### getScriptDataOffsetWithScriptBytes

▸ `Static` **getScriptDataOffsetWithScriptBytes**(`byteLength`, `maxInputs`): `number`

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

[packages/program/src/script-request.ts:231](https://github.com/FuelLabs/fuels-ts/blob/8928ad39/packages/program/src/script-request.ts#L231)
