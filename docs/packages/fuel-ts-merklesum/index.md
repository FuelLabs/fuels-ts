---
layout: default
title: "@fuel-ts/merklesum"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/merklesum

## Namespaces

- [internal](namespaces/internal.md)

## Functions

### calcRoot

▸ **calcRoot**(`sums`, `data`): [`Node`](classes/internal-Node.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sums` | `string`[] |
| `data` | `string`[] |

#### Returns

[`Node`](classes/internal-Node.md)

___

### constructTree

▸ **constructTree**(`sums`, `data`): [`Node`](classes/internal-Node.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `sums` | `string`[] |
| `data` | `string`[] |

#### Returns

[`Node`](classes/internal-Node.md)[]

___

### getProof

▸ **getProof**(`nodes`, `id`): [`Proof`](classes/internal-Proof.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`Node`](classes/internal-Node.md)[] |
| `id` | `number` |

#### Returns

[`Proof`](classes/internal-Proof.md)

___

### hashLeaf

▸ **hashLeaf**(`value`, `data`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `data` | `string` |

#### Returns

`string`

___

### hashNode

▸ **hashNode**(`leftValue`, `left`, `rightValue`, `right`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `leftValue` | `string` |
| `left` | `string` |
| `rightValue` | `string` |
| `right` | `string` |

#### Returns

`string`
