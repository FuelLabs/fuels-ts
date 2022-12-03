---
layout: default
title: AbstractScript
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: AbstractScript<T\>

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).AbstractScript

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
