[**@fuel-ts/account v0.94.9**](../index.md) • **Docs**

***

# Class: MemoryStorage

## Implements

- [`StorageAbstract`](StorageAbstract.md)

## Constructors

### new MemoryStorage()

> **new MemoryStorage**(): [`MemoryStorage`](MemoryStorage.md)

#### Returns

[`MemoryStorage`](MemoryStorage.md)

## Properties

### storage

> **storage**: `Map`\&lt;`string`, `unknown`\>

#### Defined in

[packages/account/src/wallet-manager/storages/memory-storage.ts:4](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet-manager/storages/memory-storage.ts#L4)

## Methods

### clear()

> **clear**(): `Promise`\&lt;`void`\>

#### Returns

`Promise`\&lt;`void`\>

#### Implementation of

[`StorageAbstract`](StorageAbstract.md).[`clear`](StorageAbstract.md#clear)

#### Defined in

[packages/account/src/wallet-manager/storages/memory-storage.ts:19](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet-manager/storages/memory-storage.ts#L19)

***

### getItem()

> **getItem**\&lt;`T`\>(`key`): `Promise`\&lt;`null` \| `T`\>

#### Type Parameters

• **T**

#### Parameters

• **key**: `string`

#### Returns

`Promise`\&lt;`null` \| `T`\>

#### Implementation of

[`StorageAbstract`](StorageAbstract.md).[`getItem`](StorageAbstract.md#getitem)

#### Defined in

[packages/account/src/wallet-manager/storages/memory-storage.ts:6](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet-manager/storages/memory-storage.ts#L6)

***

### removeItem()

> **removeItem**(`key`): `Promise`\&lt;`void`\>

#### Parameters

• **key**: `string`

#### Returns

`Promise`\&lt;`void`\>

#### Implementation of

[`StorageAbstract`](StorageAbstract.md).[`removeItem`](StorageAbstract.md#removeitem)

#### Defined in

[packages/account/src/wallet-manager/storages/memory-storage.ts:15](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet-manager/storages/memory-storage.ts#L15)

***

### setItem()

> **setItem**(`key`, `value`): `Promise`\&lt;`void`\>

#### Parameters

• **key**: `string`

• **value**: `string`

#### Returns

`Promise`\&lt;`void`\>

#### Implementation of

[`StorageAbstract`](StorageAbstract.md).[`setItem`](StorageAbstract.md#setitem)

#### Defined in

[packages/account/src/wallet-manager/storages/memory-storage.ts:11](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/wallet-manager/storages/memory-storage.ts#L11)
