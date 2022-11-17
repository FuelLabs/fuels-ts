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
| `types?` | readonly [`JsonAbiFragmentType`](../interfaces/internal-JsonAbiFragmentType.md)[] |

#### Overrides

[AbstractPredicate](internal-AbstractPredicate.md).[constructor](internal-AbstractPredicate.md#constructor)

## Properties

### address

• **address**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Overrides

[AbstractPredicate](internal-AbstractPredicate.md).[address](internal-AbstractPredicate.md#address)

#### Defined in

[packages/predicate/src/predicate.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L11)

___

### bytes

• **bytes**: `Uint8Array`

#### Overrides

[AbstractPredicate](internal-AbstractPredicate.md).[bytes](internal-AbstractPredicate.md#bytes)

#### Defined in

[packages/predicate/src/predicate.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L10)

___

### types

• `Optional` **types**: readonly [`JsonAbiFragmentType`](../interfaces/internal-JsonAbiFragmentType.md)[]

#### Overrides

[AbstractPredicate](internal-AbstractPredicate.md).[types](internal-AbstractPredicate.md#types)

#### Defined in

[packages/predicate/src/predicate.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/predicate/src/predicate.ts#L12)
