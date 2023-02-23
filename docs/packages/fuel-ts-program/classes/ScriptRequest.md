---
layout: default
title: ScriptRequest
parent: "@fuel-ts/program"
nav_order: 1

---

# Class: ScriptRequest<TData, TResult\>

[@fuel-ts/program](../index.md).ScriptRequest

## Type parameters

| Name | Type |
| :------ | :------ |
| `TData` | `void` |
| `TResult` | `void` |

## Constructors

### constructor

• **new ScriptRequest**<`TData`, `TResult`\>(`bytes`, `scriptDataEncoder`, `scriptResultDecoder`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TData` | `void` |
| `TResult` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytes` | `BytesLike` |
| `scriptDataEncoder` | (`data`: `TData`) => `Uint8Array` |
| `scriptResultDecoder` | (`scriptResult`: [`ScriptResult`](../namespaces/internal.md#scriptresult-1)) => `TResult` |

#### Defined in

[packages/program/src/script-request.ts:144](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/script-request.ts#L144)

## Properties

### bytes

• **bytes**: `Uint8Array`

#### Defined in

[packages/program/src/script-request.ts:140](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/script-request.ts#L140)

___

### scriptDataEncoder

• **scriptDataEncoder**: (`data`: `TData`) => `Uint8Array`

#### Type declaration

▸ (`data`): `Uint8Array`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `TData` |

##### Returns

`Uint8Array`

#### Defined in

[packages/program/src/script-request.ts:141](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/script-request.ts#L141)

___

### scriptResultDecoder

• **scriptResultDecoder**: (`scriptResult`: [`ScriptResult`](../namespaces/internal.md#scriptresult-1)) => `TResult`

#### Type declaration

▸ (`scriptResult`): `TResult`

##### Parameters

| Name | Type |
| :------ | :------ |
| `scriptResult` | [`ScriptResult`](../namespaces/internal.md#scriptresult-1) |

##### Returns

`TResult`

#### Defined in

[packages/program/src/script-request.ts:142](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/script-request.ts#L142)

## Methods

### decodeCallResult

▸ **decodeCallResult**(`callResult`, `logs?`): `TResult`

Decodes the result of a script call

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `callResult` | [`CallResult`](../namespaces/internal.md#callresult) | `undefined` |
| `logs` | `any`[] | `[]` |

#### Returns

`TResult`

#### Defined in

[packages/program/src/script-request.ts:181](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/script-request.ts#L181)

___

### encodeScriptData

▸ **encodeScriptData**(`data`): `Uint8Array`

Encodes the data for a script call

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `TData` |

#### Returns

`Uint8Array`

#### Defined in

[packages/program/src/script-request.ts:174](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/script-request.ts#L174)

___

### getArgOffset

▸ **getArgOffset**(): `number`

Returns the memory offset for the contract call argument
Used for struct inputs

#### Returns

`number`

#### Defined in

[packages/program/src/script-request.ts:166](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/script-request.ts#L166)

___

### getScriptDataOffset

▸ **getScriptDataOffset**(): `number`

#### Returns

`number`

#### Defined in

[packages/program/src/script-request.ts:154](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/script-request.ts#L154)
