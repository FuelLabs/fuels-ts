---
layout: default
title: Predicate
parent: "@fuel-ts/predicate"
nav_order: 1

---

# Class: Predicate

[@fuel-ts/predicate](../index.md).Predicate

## Hierarchy

- [`AbstractPredicate`](internal-AbstractPredicate.md)

  ↳ **`Predicate`**

## Constructors

### constructor

• **new Predicate**(`bytes`, `types?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytes` | `BytesLike` |
| `types?` | [`JsonAbi`](../namespaces/internal.md#jsonabi) |

#### Overrides

[AbstractPredicate](internal-AbstractPredicate.md).[constructor](internal-AbstractPredicate.md#constructor)

#### Defined in

[packages/predicate/src/predicate.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L20)

## Properties

### address

• **address**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Overrides

[AbstractPredicate](internal-AbstractPredicate.md).[address](internal-AbstractPredicate.md#address)

#### Defined in

[packages/predicate/src/predicate.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L16)

___

### bytes

• **bytes**: `Uint8Array`

#### Overrides

[AbstractPredicate](internal-AbstractPredicate.md).[bytes](internal-AbstractPredicate.md#bytes)

#### Defined in

[packages/predicate/src/predicate.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L15)

___

### interface

• `Optional` **interface**: `default`

#### Defined in

[packages/predicate/src/predicate.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L18)

___

### types

• `Optional` **types**: readonly [`JsonAbiFragmentType`](../interfaces/internal-JsonAbiFragmentType.md)[]

#### Overrides

[AbstractPredicate](internal-AbstractPredicate.md).[types](internal-AbstractPredicate.md#types)

#### Defined in

[packages/predicate/src/predicate.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L17)
