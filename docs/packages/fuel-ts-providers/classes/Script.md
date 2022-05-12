---
layout: default
title: Script
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: Script<TScriptData, TScriptResult\>

[@fuel-ts/providers](../index.md).Script

## Type parameters

| Name | Type |
| :------ | :------ |
| `TScriptData` | `void` |
| `TScriptResult` | `void` |

## Constructors

### constructor

• **new Script**<`TScriptData`, `TScriptResult`\>(`bytes`, `encodeScriptData`, `decodeScriptResult`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TScriptData` | `void` |
| `TScriptResult` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytes` | `BytesLike` |
| `encodeScriptData` | (`data`: `TScriptData`) => `Uint8Array` |
| `decodeScriptResult` | (`result`: [`CallResult`](../index.md#callresult)) => `TScriptResult` |

#### Defined in

[packages/providers/src/script.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/script.ts#L20)

## Properties

### bytes

• **bytes**: `Uint8Array`

#### Defined in

[packages/providers/src/script.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/script.ts#L16)

___

### decodeScriptResult

• **decodeScriptResult**: (`result`: [`CallResult`](../index.md#callresult)) => `TScriptResult`

#### Type declaration

▸ (`result`): `TScriptResult`

##### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`CallResult`](../index.md#callresult) |

##### Returns

`TScriptResult`

#### Defined in

[packages/providers/src/script.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/script.ts#L18)

___

### encodeScriptData

• **encodeScriptData**: (`data`: `TScriptData`) => `Uint8Array`

#### Type declaration

▸ (`data`): `Uint8Array`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `TScriptData` |

##### Returns

`Uint8Array`

#### Defined in

[packages/providers/src/script.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/script.ts#L17)

## Methods

### getArgOffset

▸ **getArgOffset**(): `number`

Returns the memory offset for the contract call argument
Used for struct inputs

#### Returns

`number`

#### Defined in

[packages/providers/src/script.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/script.ts#L40)

___

### getScriptDataOffset

▸ **getScriptDataOffset**(): `number`

#### Returns

`number`

#### Defined in

[packages/providers/src/script.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/providers/src/script.ts#L30)
