---
layout: default
title: internal
parent: "@fuel-ts/abi-coder"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/abi-coder](../index.md).internal

## Interfaces

- [FragmentParams](../interfaces/internal-FragmentParams.md)

## Type aliases

### DecodedValueOf

Ƭ **DecodedValueOf**<`TCoder`\>: [`TypesOfCoder`](../index.md#typesofcoder)<`TCoder`\>[``"Decoded"``][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoder` | extends [`Coder`](../classes/Coder.md) |

#### Defined in

[packages/abi-coder/src/coders/array.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L7)

___

### InputValueOf

Ƭ **InputValueOf**<`TCoder`\>: [`TypesOfCoder`](../index.md#typesofcoder)<`TCoder`\>[``"Input"``][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoder` | extends [`Coder`](../classes/Coder.md) |

#### Defined in

[packages/abi-coder/src/coders/array.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L6)

___

### NumberCoderType

Ƭ **NumberCoderType**: ``"u8"`` \| ``"u16"`` \| ``"u32"`` \| ``"u64"``

#### Defined in

[packages/abi-coder/src/coders/number.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L6)

___

### Primitive

Ƭ **Primitive**: `string` \| `number` \| `boolean` \| `bigint`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L6)

___

### ToDecodedType

Ƭ **ToDecodedType**<`TBaseType`\>: `TBaseType` extends ``"u64"`` ? `bigint` : `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TBaseType` | extends [`NumberCoderType`](internal.md#numbercodertype) |

#### Defined in

[packages/abi-coder/src/coders/number.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L8)
