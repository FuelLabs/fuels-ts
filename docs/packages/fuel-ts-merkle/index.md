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

Compute the merkle root

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string`[] |

#### Returns

`string`

#### Defined in

[packages/merkle/src/binaryMerkleTree.ts:71](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merkle/src/binaryMerkleTree.ts#L71)

___

### constructTree

▸ **constructTree**(`data`): [`Node`](classes/internal-Node.md)[]

Construct tree

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string`[] |

#### Returns

[`Node`](classes/internal-Node.md)[]

#### Defined in

[packages/merkle/src/binaryMerkleTree.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merkle/src/binaryMerkleTree.ts#L24)

___

### getProof

▸ **getProof**(`nodes`, `id`): `string`[]

Get proof for the leaf

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`Node`](classes/internal-Node.md)[] |
| `id` | `number` |

#### Returns

`string`[]

#### Defined in

[packages/merkle/src/binaryMerkleTree.ts:107](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merkle/src/binaryMerkleTree.ts#L107)

___

### hashLeaf

▸ **hashLeaf**(`data`): `string`

Slice off the '0x' on each argument to simulate abi.encodePacked

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`string`

#### Defined in

[packages/merkle/src/binaryMerkleTree.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merkle/src/binaryMerkleTree.ts#L9)

___

### hashNode

▸ **hashNode**(`left`, `right`): `string`

Slice off the '0x' on each argument to simulate abi.encodePacked
hash(prefix +  left + right)

#### Parameters

| Name | Type |
| :------ | :------ |
| `left` | `string` |
| `right` | `string` |

#### Returns

`string`

#### Defined in

[packages/merkle/src/binaryMerkleTree.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/merkle/src/binaryMerkleTree.ts#L17)
