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

[packages/account/src/wallet-manager/types.ts:66](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet-manager/types.ts#L66)

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

[packages/account/src/wallet-manager/types.ts:64](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet-manager/types.ts#L64)

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

[packages/account/src/wallet-manager/types.ts:65](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet-manager/types.ts#L65)

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

[packages/account/src/wallet-manager/types.ts:63](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/account/src/wallet-manager/types.ts#L63)
