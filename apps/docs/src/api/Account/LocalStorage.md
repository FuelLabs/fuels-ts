[**@fuel-ts/account v0.94.3**](../index.md) • **Docs**

***

# Class: LocalStorage

## Implements

- [`StorageAbstract`](StorageAbstract.md)

## Constructors

### new LocalStorage()

> **new LocalStorage**(`localStorage`): [`LocalStorage`](LocalStorage.md)

#### Parameters

• **localStorage**: `Storage`

#### Returns

[`LocalStorage`](LocalStorage.md)

#### Defined in

[packages/account/src/connectors/types/local-storage.ts:7](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/connectors/types/local-storage.ts#L7)

## Methods

### clear()

> **clear**(): `Promise`\&lt;`void`\>

#### Returns

`Promise`\&lt;`void`\>

#### Implementation of

[`StorageAbstract`](StorageAbstract.md).[`clear`](StorageAbstract.md#clear)

#### Defined in

[packages/account/src/connectors/types/local-storage.ts:23](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/connectors/types/local-storage.ts#L23)

***

### getItem()

> **getItem**(`key`): `Promise`\&lt;`undefined` \| `null` \| `string`\>

#### Parameters

• **key**: `string`

#### Returns

`Promise`\&lt;`undefined` \| `null` \| `string`\>

#### Implementation of

[`StorageAbstract`](StorageAbstract.md).[`getItem`](StorageAbstract.md#getitem)

#### Defined in

[packages/account/src/connectors/types/local-storage.ts:15](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/connectors/types/local-storage.ts#L15)

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

[packages/account/src/connectors/types/local-storage.ts:19](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/connectors/types/local-storage.ts#L19)

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

[packages/account/src/connectors/types/local-storage.ts:11](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/account/src/connectors/types/local-storage.ts#L11)
