# Class: StorageAbstract

[@fuel-ts/account](/api/Account/index.md).StorageAbstract

## Implemented by

- [`LocalStorage`](/api/Account/LocalStorage.md)
- [`MemoryStorage`](/api/Account/MemoryStorage.md)

## Constructors

### constructor

• **new StorageAbstract**(): [`StorageAbstract`](/api/Account/StorageAbstract.md)

#### Returns

[`StorageAbstract`](/api/Account/StorageAbstract.md)

## Methods

### clear

▸ **clear**(): `Promise`&lt;`void`\>

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/wallet-manager/types.ts:66](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/types.ts#L66)

___

### getItem

▸ **getItem**(`key`): `Promise`&lt;`undefined` \| ``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`&lt;`undefined` \| ``null`` \| `string`\>

#### Defined in

[packages/account/src/wallet-manager/types.ts:64](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/types.ts#L64)

___

### removeItem

▸ **removeItem**(`key`): `Promise`&lt;`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/wallet-manager/types.ts:65](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/types.ts#L65)

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

#### Defined in

[packages/account/src/wallet-manager/types.ts:63](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/wallet-manager/types.ts#L63)
