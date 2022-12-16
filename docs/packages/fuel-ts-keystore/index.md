---
layout: default
title: "@fuel-ts/keystore"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/keystore

## Interfaces

- [Keystore](interfaces/Keystore.md)

## Functions

### bufferFromString

▸ **bufferFromString**(`string`, `encoding?`): `Uint8Array`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `string` | `string` | `undefined` |
| `encoding` | ``"utf-8"`` \| ``"base64"`` | `'base64'` |

#### Returns

`Uint8Array`

#### Defined in

[packages/keystore/src/aes-ctr.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/keystore/src/aes-ctr.ts#L12)

___

### decrypt

▸ **decrypt**<`T`\>(`password`, `keystore`): `Promise`<`T`\>

Given a password and a keystore object, decrypts the text and returns
the resulting value

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `password` | `string` |
| `keystore` | [`Keystore`](interfaces/Keystore.md) |

#### Returns

`Promise`<`T`\>

Promise<T> T object

#### Defined in

[packages/keystore/src/keystore.ts:26](https://github.com/FuelLabs/fuels-ts/blob/master/packages/keystore/src/keystore.ts#L26)

___

### encrypt

▸ **encrypt**<`T`\>(`password`, `data`): `Promise`<[`Keystore`](interfaces/Keystore.md)\>

Encrypts a data object that can be any serializable value using
a provided password.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `password` | `string` |
| `data` | `T` |

#### Returns

`Promise`<[`Keystore`](interfaces/Keystore.md)\>

Promise<Keystore> Keystore object

#### Defined in

[packages/keystore/src/keystore.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/keystore/src/keystore.ts#L16)

___

### keyFromPassword

▸ **keyFromPassword**(`password`, `saltBuffer`): `Uint8Array`

Generate a pbkdf2 key from a password and random salt

#### Parameters

| Name | Type |
| :------ | :------ |
| `password` | `string` |
| `saltBuffer` | `Uint8Array` |

#### Returns

`Uint8Array`

#### Defined in

[packages/keystore/src/aes-ctr.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/keystore/src/aes-ctr.ts#L44)

___

### randomBytes

▸ **randomBytes**(`length`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `length` | `number` |

#### Returns

`Uint8Array`

#### Defined in

[packages/keystore/src/randomBytes.ts:3](https://github.com/FuelLabs/fuels-ts/blob/master/packages/keystore/src/randomBytes.ts#L3)

___

### stringFromBuffer

▸ **stringFromBuffer**(`buffer`, `encoding?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `buffer` | `Uint8Array` | `undefined` |
| `encoding` | ``"utf-8"`` \| ``"base64"`` | `'base64'` |

#### Returns

`string`

#### Defined in

[packages/keystore/src/aes-ctr.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/keystore/src/aes-ctr.ts#L30)
