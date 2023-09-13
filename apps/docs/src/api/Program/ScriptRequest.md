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

[packages/program/src/script-request.ts:206](https://github.com/FuelLabs/fuels-ts/blob/c43bc9c5/packages/program/src/script-request.ts#L206)

## Properties

### bytes

• **bytes**: `Uint8Array`

The bytes of the script.

#### Defined in

[packages/program/src/script-request.ts:187](https://github.com/FuelLabs/fuels-ts/blob/c43bc9c5/packages/program/src/script-request.ts#L187)

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

[packages/program/src/script-request.ts:192](https://github.com/FuelLabs/fuels-ts/blob/c43bc9c5/packages/program/src/script-request.ts#L192)

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

[packages/program/src/script-request.ts:197](https://github.com/FuelLabs/fuels-ts/blob/c43bc9c5/packages/program/src/script-request.ts#L197)

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

[packages/program/src/script-request.ts:260](https://github.com/FuelLabs/fuels-ts/blob/c43bc9c5/packages/program/src/script-request.ts#L260)

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

[packages/program/src/script-request.ts:241](https://github.com/FuelLabs/fuels-ts/blob/c43bc9c5/packages/program/src/script-request.ts#L241)

___

### getScriptDataOffset

▸ **getScriptDataOffset**(): `number`

Gets the script data offset.

#### Returns

`number`

The script data offset.

#### Defined in

[packages/program/src/script-request.ts:231](https://github.com/FuelLabs/fuels-ts/blob/c43bc9c5/packages/program/src/script-request.ts#L231)

___

### getScriptDataOffsetWithScriptBytes

▸ `Static` **getScriptDataOffsetWithScriptBytes**(`byteLength`): `number`

Gets the script data offset for the given bytes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteLength` | `number` |

#### Returns

`number`

The script data offset.

#### Defined in

[packages/program/src/script-request.ts:222](https://github.com/FuelLabs/fuels-ts/blob/c43bc9c5/packages/program/src/script-request.ts#L222)
