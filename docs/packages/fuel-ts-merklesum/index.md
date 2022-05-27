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

▸ **calcRoot**(`sums`, `data`): `Node`

Compute the merkle root

#### Parameters

| Name | Type |
| :------ | :------ |
| `sums` | `bigint`[] |
| `data` | `string`[] |

#### Returns

`Node`

#### Defined in

[packages/merklesum/src/sumMerkleTree.ts:85](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L85)

___

### constructTree

▸ **constructTree**(`sums`, `data`): `Node`[]

Construct tree

#### Parameters

| Name | Type |
| :------ | :------ |
| `sums` | `bigint`[] |
| `data` | `string`[] |

#### Returns

`Node`[]

#### Defined in

[packages/merklesum/src/sumMerkleTree.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L38)

___

### getProof

▸ **getProof**(`nodes`, `id`): [`Proof`](classes/internal-Proof.md)

Get proof for the leaf

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `Node`[] |
| `id` | `number` |

#### Returns

[`Proof`](classes/internal-Proof.md)

#### Defined in

[packages/merklesum/src/sumMerkleTree.ts:125](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L125)

___

### hashLeaf

▸ **hashLeaf**(`value`, `data`): `string`

Slice off the '0x' on each argument to simulate abi.encodePacked
hash(prefix + value + data)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `bigint` |
| `data` | `string` |

#### Returns

`string`

#### Defined in

[packages/merklesum/src/sumMerkleTree.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L12)

___

### hashNode

▸ **hashNode**(`leftValue`, `left`, `rightValue`, `right`): `string`

Slice off the '0x' on each argument to simulate abi.encodePacked
hash (prefix + leftSum + leftHash + rightSum + rightHash)

#### Parameters

| Name | Type |
| :------ | :------ |
| `leftValue` | `bigint` |
| `left` | `string` |
| `rightValue` | `bigint` |
| `right` | `string` |

#### Returns

`string`

#### Defined in

[packages/merklesum/src/sumMerkleTree.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L20)
