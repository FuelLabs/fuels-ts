---
layout: default
title: AbstractScript
parent: "@fuel-ts/providers"
nav_order: 1

---

# Class: AbstractScript<T\>

[@fuel-ts/providers](../index.md).[internal](../namespaces/internal.md).AbstractScript

## Type parameters

| Name |
| :------ |
| `T` |

## Constructors

### constructor

• **new AbstractScript**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

## Properties

### bytes

• `Abstract` **bytes**: `Uint8Array`

#### Defined in

[packages/interfaces/src/index.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L6)

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

[packages/interfaces/src/index.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L7)
