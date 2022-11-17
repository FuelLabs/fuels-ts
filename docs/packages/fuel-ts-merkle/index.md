---
layout: default
title: "@fuel-ts/merkle"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/merkle

## Namespaces

- [internal](namespaces/internal.md)

## Functions

### calcRoot

▸ **calcRoot**(`data`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string`[] |

#### Returns

`string`

___

### constructTree

▸ **constructTree**(`data`): [`Node`](classes/internal-Node.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string`[] |

#### Returns

[`Node`](classes/internal-Node.md)[]

___

### getProof

▸ **getProof**(`nodes`, `id`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`Node`](classes/internal-Node.md)[] |
| `id` | `number` |

#### Returns

`string`[]

___

### hashLeaf

▸ **hashLeaf**(`data`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`string`

___

### hashNode

▸ **hashNode**(`left`, `right`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `left` | `string` |
| `right` | `string` |

#### Returns

`string`
