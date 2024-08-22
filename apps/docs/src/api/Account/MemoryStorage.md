# Class: MemoryStorage

[@fuel-ts/account](/api/Account/index.md).MemoryStorage

## Implements

- [`StorageAbstract`](/api/Account/StorageAbstract.md)

## Constructors

### constructor

• **new MemoryStorage**(): [`MemoryStorage`](/api/Account/MemoryStorage.md)

#### Returns

[`MemoryStorage`](/api/Account/MemoryStorage.md)

## Properties

### storage

• **storage**: `Map`&lt;`string`, `unknown`\>

#### Defined in

[packages/account/src/wallet-manager/storages/memory-storage.ts:4](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/storages/memory-storage.ts#L4)

## Methods

### clear

▸ **clear**(): `Promise`&lt;`void`\>

#### Returns

`Promise`&lt;`void`\>

#### Implementation of

[StorageAbstract](/api/Account/StorageAbstract.md).[clear](/api/Account/StorageAbstract.md#clear)

#### Defined in

[packages/account/src/wallet-manager/storages/memory-storage.ts:19](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/storages/memory-storage.ts#L19)

___

### getItem

▸ **getItem**&lt;`T`\>(`key`): `Promise`&lt;``null`` \| `T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`&lt;``null`` \| `T`\>

#### Implementation of

[StorageAbstract](/api/Account/StorageAbstract.md).[getItem](/api/Account/StorageAbstract.md#getitem)

#### Defined in

[packages/account/src/wallet-manager/storages/memory-storage.ts:6](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/storages/memory-storage.ts#L6)

___

### removeItem

▸ **removeItem**(`key`): `Promise`&lt;`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`&lt;`void`\>

#### Implementation of

[StorageAbstract](/api/Account/StorageAbstract.md).[removeItem](/api/Account/StorageAbstract.md#removeitem)

#### Defined in

[packages/account/src/wallet-manager/storages/memory-storage.ts:15](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/storages/memory-storage.ts#L15)

___

### setItem

▸ **setItem**(`key`, `value`): `Promise`&lt;`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`Promise`&lt;`void`\>

#### Implementation of

[StorageAbstract](/api/Account/StorageAbstract.md).[setItem](/api/Account/StorageAbstract.md#setitem)

#### Defined in

[packages/account/src/wallet-manager/storages/memory-storage.ts:11](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/storages/memory-storage.ts#L11)
