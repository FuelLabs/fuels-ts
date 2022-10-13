---
layout: default
title: "@fuel-ts/keystore"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/keystore

## Interfaces

- [Keystore](interfaces/Keystore.md)

## Functions

### decrypt

▸ **decrypt**<`T`\>(`password`, `keystore`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `password` | `string` |
| `keystore` | [`Keystore`](interfaces/Keystore.md) |

#### Returns

`Promise`<`T`\>

___

### encrypt

▸ **encrypt**<`T`\>(`password`, `data`): `Promise`<[`Keystore`](interfaces/Keystore.md)\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `password` | `string` |
| `data` | `T` |

#### Returns

`Promise`<[`Keystore`](interfaces/Keystore.md)\>

___

### keyFromPassword

▸ **keyFromPassword**(`password`, `saltBuffer`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `password` | `string` |
| `saltBuffer` | `Uint8Array` |

#### Returns

`Uint8Array`

___

### randomBytes

▸ **randomBytes**(`length`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `length` | `number` |

#### Returns

`Uint8Array`
