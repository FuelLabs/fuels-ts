# Class: LocalStorage

[@fuel-ts/account](/api/Account/index.md).LocalStorage

## Implements

- [`StorageAbstract`](/api/Account/StorageAbstract.md)

## Constructors

### constructor

• **new LocalStorage**(`localStorage`): [`LocalStorage`](/api/Account/LocalStorage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localStorage` | `Storage` |

#### Returns

[`LocalStorage`](/api/Account/LocalStorage.md)

#### Defined in

[packages/account/src/connectors/types/local-storage.ts:7](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/connectors/types/local-storage.ts#L7)

## Properties

### storage

• `Private` **storage**: `Storage`

#### Defined in

[packages/account/src/connectors/types/local-storage.ts:5](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/connectors/types/local-storage.ts#L5)

## Methods

### clear

▸ **clear**(): `Promise`&lt;`void`\>

#### Returns

`Promise`&lt;`void`\>

#### Implementation of

[StorageAbstract](/api/Account/StorageAbstract.md).[clear](/api/Account/StorageAbstract.md#clear)

#### Defined in

[packages/account/src/connectors/types/local-storage.ts:23](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/connectors/types/local-storage.ts#L23)

___

### getItem

▸ **getItem**(`key`): `Promise`&lt;`undefined` \| ``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`&lt;`undefined` \| ``null`` \| `string`\>

#### Implementation of

[StorageAbstract](/api/Account/StorageAbstract.md).[getItem](/api/Account/StorageAbstract.md#getitem)

#### Defined in

[packages/account/src/connectors/types/local-storage.ts:15](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/connectors/types/local-storage.ts#L15)

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

[packages/account/src/connectors/types/local-storage.ts:19](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/connectors/types/local-storage.ts#L19)

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

[packages/account/src/connectors/types/local-storage.ts:11](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/connectors/types/local-storage.ts#L11)
