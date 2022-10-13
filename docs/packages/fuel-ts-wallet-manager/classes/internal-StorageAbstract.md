---
layout: default
title: StorageAbstract
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: StorageAbstract

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).StorageAbstract

## Constructors

### constructor

• **new StorageAbstract**()

## Methods

### clear

▸ `Abstract` **clear**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### getItem

▸ `Abstract` **getItem**<`T`\>(`key`): `Promise`<``null`` \| `T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<``null`` \| `T`\>

___

### removeItem

▸ `Abstract` **removeItem**(`key`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<`void`\>

___

### setItem

▸ `Abstract` **setItem**<`T`\>(`key`, `value`): `Promise`<`unknown`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `T` |

#### Returns

`Promise`<`unknown`\>
