---
layout: default
title: TypeChainTarget
parent: "typechain-target-fuels"
nav_order: 1

---

# Class: TypeChainTarget

[typechain-target-fuels](../index.md).[internal](../namespaces/internal.md).TypeChainTarget

## Hierarchy

- **`TypeChainTarget`**

  ↳ [`default`](default.md)

## Constructors

### constructor

• **new TypeChainTarget**(`cfg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cfg` | [`Config`](../interfaces/internal-Config.md) |

#### Defined in

packages/fuelchain/dist/typechain/types.d.ts:36

## Properties

### cfg

• `Readonly` **cfg**: [`Config`](../interfaces/internal-Config.md)

#### Defined in

packages/fuelchain/dist/typechain/types.d.ts:34

___

### name

• `Readonly` `Abstract` **name**: `string`

#### Defined in

packages/fuelchain/dist/typechain/types.d.ts:35

## Methods

### afterRun

▸ **afterRun**(): [`Output`](../namespaces/internal.md#output) \| `Promise`<[`Output`](../namespaces/internal.md#output)\>

#### Returns

[`Output`](../namespaces/internal.md#output) \| `Promise`<[`Output`](../namespaces/internal.md#output)\>

#### Defined in

packages/fuelchain/dist/typechain/types.d.ts:38

___

### beforeRun

▸ **beforeRun**(): [`Output`](../namespaces/internal.md#output) \| `Promise`<[`Output`](../namespaces/internal.md#output)\>

#### Returns

[`Output`](../namespaces/internal.md#output) \| `Promise`<[`Output`](../namespaces/internal.md#output)\>

#### Defined in

packages/fuelchain/dist/typechain/types.d.ts:37

___

### transformFile

▸ `Abstract` **transformFile**(`file`): [`Output`](../namespaces/internal.md#output) \| `Promise`<[`Output`](../namespaces/internal.md#output)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`FileDescription`](../interfaces/internal-FileDescription.md) |

#### Returns

[`Output`](../namespaces/internal.md#output) \| `Promise`<[`Output`](../namespaces/internal.md#output)\>

#### Defined in

packages/fuelchain/dist/typechain/types.d.ts:39
