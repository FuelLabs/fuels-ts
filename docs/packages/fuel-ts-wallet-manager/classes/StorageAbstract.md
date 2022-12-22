---
layout: default
title: StorageAbstract
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: StorageAbstract

[@fuel-ts/wallet-manager](../index.md).StorageAbstract

## Constructors

### constructor

• **new StorageAbstract**()

## Methods

### clear

▸ `Abstract` **clear**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/types.ts:64](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L64)

___

### getItem

▸ `Abstract` **getItem**(`key`): `Promise`<`undefined` \| ``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<`undefined` \| ``null`` \| `string`\>

#### Defined in

[packages/wallet-manager/src/types.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L62)

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

[packages/wallet-manager/src/types.ts:63](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L63)

___

### setItem

▸ `Abstract` **setItem**(`key`, `value`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet-manager/src/types.ts:61](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L61)
