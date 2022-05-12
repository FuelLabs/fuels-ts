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

#### Defined in

[packages/wallet-manager/src/types.ts:67](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L67)

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

#### Defined in

[packages/wallet-manager/src/types.ts:65](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L65)

___

### removeItem

▸ `Abstract` **removeItem**(`key`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/types.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L66)

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

#### Defined in

[packages/wallet-manager/src/types.ts:64](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L64)
