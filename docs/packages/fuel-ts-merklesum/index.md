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
| `sums` | `BigNumber`[] |
| `data` | `string`[] |

#### Returns

`Node`

#### Defined in

[packages/merklesum/src/sumMerkleTree.ts:81](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L81)

___

### constructTree

▸ **constructTree**(`sums`, `data`): `Node`[]

Construct tree

#### Parameters

| Name | Type |
| :------ | :------ |
| `sums` | `BigNumber`[] |
| `data` | `string`[] |

#### Returns

`Node`[]

#### Defined in

[packages/merklesum/src/sumMerkleTree.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L34)

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

[packages/merklesum/src/sumMerkleTree.ts:121](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L121)

___

### hashLeaf

▸ **hashLeaf**(`value`, `data`): `string`

Slice off the '0x' on each argument to simulate abi.encodePacked
hash(prefix + value + data)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `BigNumber` |
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
| `leftValue` | `BigNumber` |
| `left` | `string` |
| `rightValue` | `BigNumber` |
| `right` | `string` |

#### Returns

`string`

#### Defined in

[packages/merklesum/src/sumMerkleTree.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merklesum/src/sumMerkleTree.ts#L21)
