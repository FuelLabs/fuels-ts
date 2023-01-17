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

Compute the merkle root

#### Parameters

| Name | Type |
| :------ | :------ |
| `sums` | `string`[] |
| `data` | `string`[] |

#### Returns

[`Node`](classes/internal-Node.md)

#### Defined in

[packages/merklesum/src/sumMerkleTree.ts:88](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L88)

___

### constructTree

▸ **constructTree**(`sums`, `data`): [`Node`](classes/internal-Node.md)[]

Construct tree

#### Parameters

| Name | Type |
| :------ | :------ |
| `sums` | `string`[] |
| `data` | `string`[] |

#### Returns

[`Node`](classes/internal-Node.md)[]

#### Defined in

[packages/merklesum/src/sumMerkleTree.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L39)

___

### getProof

▸ **getProof**(`nodes`, `id`): [`Proof`](classes/internal-Proof.md)

Get proof for the leaf

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`Node`](classes/internal-Node.md)[] |
| `id` | `number` |

#### Returns

[`Proof`](classes/internal-Proof.md)

#### Defined in

[packages/merklesum/src/sumMerkleTree.ts:130](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L130)

___

### hashLeaf

▸ **hashLeaf**(`value`, `data`): `string`

Slice off the '0x' on each argument to simulate abi.encodePacked
hash(prefix + value + data)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `data` | `string` |

#### Returns

`string`

#### Defined in

[packages/merklesum/src/sumMerkleTree.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L13)

___

### hashNode

▸ **hashNode**(`leftValue`, `left`, `rightValue`, `right`): `string`

Slice off the '0x' on each argument to simulate abi.encodePacked
hash (prefix + leftSum + leftHash + rightSum + rightHash)

#### Parameters

| Name | Type |
| :------ | :------ |
| `leftValue` | `string` |
| `left` | `string` |
| `rightValue` | `string` |
| `right` | `string` |

#### Returns

`string`

#### Defined in

[packages/merklesum/src/sumMerkleTree.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L21)
