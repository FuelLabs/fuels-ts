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
| `bytes` | `BytesLike` | The bytes of the script. |
| `scriptDataEncoder` | (`data`: `TData`) => `EncodedScriptCall` | The script data encoder function. |
| `scriptResultDecoder` | (`scriptResult`: `ScriptResult`) => `TResult` | The script result decoder function. |

#### Returns

[`ScriptRequest`](/api/Program/ScriptRequest.md)&lt;`TData`, `TResult`\>

#### Defined in

[packages/program/src/script-request.ts:209](https://github.com/FuelLabs/fuels-ts/blob/8425f9ae/packages/program/src/script-request.ts#L209)

## Properties

### bytes

• **bytes**: `Uint8Array`

The bytes of the script.

#### Defined in

[packages/program/src/script-request.ts:190](https://github.com/FuelLabs/fuels-ts/blob/8425f9ae/packages/program/src/script-request.ts#L190)

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

[packages/program/src/script-request.ts:195](https://github.com/FuelLabs/fuels-ts/blob/8425f9ae/packages/program/src/script-request.ts#L195)

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

[packages/program/src/script-request.ts:200](https://github.com/FuelLabs/fuels-ts/blob/8425f9ae/packages/program/src/script-request.ts#L200)

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

[packages/program/src/script-request.ts:266](https://github.com/FuelLabs/fuels-ts/blob/8425f9ae/packages/program/src/script-request.ts#L266)

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

[packages/program/src/script-request.ts:247](https://github.com/FuelLabs/fuels-ts/blob/8425f9ae/packages/program/src/script-request.ts#L247)

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

[packages/program/src/script-request.ts:237](https://github.com/FuelLabs/fuels-ts/blob/8425f9ae/packages/program/src/script-request.ts#L237)

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

[packages/program/src/script-request.ts:226](https://github.com/FuelLabs/fuels-ts/blob/8425f9ae/packages/program/src/script-request.ts#L226)
