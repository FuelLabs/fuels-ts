---
layout: default
title: "@fuel-ts/merkle-shared"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/merkle-shared

## Variables

### EMPTY

• `Const` **EMPTY**: ``"0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"``

#### Defined in

[packages/merkle-shared/src/common.ts:4](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merkle-shared/src/common.ts#L4)

___

### MAX\_HEIGHT

• `Const` **MAX\_HEIGHT**: ``256``

#### Defined in

[packages/merkle-shared/src/common.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merkle-shared/src/common.ts#L6)

___

### ZERO

• `Const` **ZERO**: ``"0x0000000000000000000000000000000000000000000000000000000000000000"``

#### Defined in

[packages/merkle-shared/src/common.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merkle-shared/src/common.ts#L5)

## Functions

### hash

▸ **hash**(`data`): `string`

The primary hash function for Fuel
SHA-256

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BytesLike` |

#### Returns

`string`

#### Defined in

[packages/merkle-shared/src/cryptography.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merkle-shared/src/cryptography.ts#L8)
