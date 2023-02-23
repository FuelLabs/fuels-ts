---
layout: default
title: AbstractScriptRequest
parent: "@fuel-ts/interfaces"
nav_order: 1

---

# Class: AbstractScriptRequest<T\>

[@fuel-ts/interfaces](../index.md).AbstractScriptRequest

## Type parameters

| Name |
| :------ |
| `T` |

## Constructors

### constructor

• **new AbstractScriptRequest**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

## Properties

### bytes

• `Abstract` **bytes**: `Uint8Array`

#### Defined in

[packages/interfaces/src/index.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L8)

___

### encodeScriptData

• `Abstract` **encodeScriptData**: (`data`: `T`) => `Uint8Array`

#### Type declaration

▸ (`data`): `Uint8Array`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |

##### Returns

`Uint8Array`

#### Defined in

[packages/interfaces/src/index.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L9)
