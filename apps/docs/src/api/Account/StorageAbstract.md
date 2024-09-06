[**@fuel-ts/account v0.94.5**](../index.md) • **Docs**

***

# Class: `abstract` StorageAbstract

## Constructors

### new StorageAbstract()

> **new StorageAbstract**(): [`StorageAbstract`](StorageAbstract.md)

#### Returns

[`StorageAbstract`](StorageAbstract.md)

## Methods

### clear()

> `abstract` **clear**(): `Promise`\&lt;`void`\>

#### Returns

`Promise`\&lt;`void`\>

#### Defined in

[packages/account/src/wallet-manager/types.ts:66](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/wallet-manager/types.ts#L66)

***

### getItem()

> `abstract` **getItem**(`key`): `Promise`\&lt;`undefined` \| `null` \| `string`\>

#### Parameters

• **key**: `string`

#### Returns

`Promise`\&lt;`undefined` \| `null` \| `string`\>

#### Defined in

[packages/account/src/wallet-manager/types.ts:64](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/wallet-manager/types.ts#L64)

***

### removeItem()

> `abstract` **removeItem**(`key`): `Promise`\&lt;`void`\>

#### Parameters

• **key**: `string`

#### Returns

`Promise`\&lt;`void`\>

#### Defined in

[packages/account/src/wallet-manager/types.ts:65](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/wallet-manager/types.ts#L65)

***

### setItem()

> `abstract` **setItem**(`key`, `value`): `Promise`\&lt;`void`\>

#### Parameters

• **key**: `string`

• **value**: `string`

#### Returns

`Promise`\&lt;`void`\>

#### Defined in

[packages/account/src/wallet-manager/types.ts:63](https://github.com/FuelLabs/fuels-ts/blob/26e9ebed3aac7c894878eda94559482cc10c369f/packages/account/src/wallet-manager/types.ts#L63)
