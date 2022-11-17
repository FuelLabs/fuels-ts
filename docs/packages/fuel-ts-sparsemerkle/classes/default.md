---
layout: default
title: default
parent: "@fuel-ts/sparsemerkle"
nav_order: 1

---

# Class: default

[@fuel-ts/sparsemerkle](../index.md).default

## Constructors

### constructor

• **new default**()

## Properties

### ms

• **ms**: [`MapStore`](../interfaces/internal-MapStore.md)

#### Defined in

[packages/sparsemerkle/src/sparseMerkleTree.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/sparsemerkle/src/sparseMerkleTree.ts#L13)

___

### root

• **root**: `string`

#### Defined in

[packages/sparsemerkle/src/sparseMerkleTree.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/sparsemerkle/src/sparseMerkleTree.ts#L15)

## Methods

### delete

▸ **delete**(`key`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`void`

___

### deleteWithSideNodes

▸ **deleteWithSideNodes**(`key`, `sideNodes`, `oldLeafHash`, `oldLeafData`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `sideNodes` | `string`[] |
| `oldLeafHash` | `string` |
| `oldLeafData` | `string` |

#### Returns

`string`

___

### get

▸ **get**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

___

### prove

▸ **prove**(`key`): [`SparseMerkleProof`](internal-SparseMerkleProof.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`SparseMerkleProof`](internal-SparseMerkleProof.md)

___

### proveCompacted

▸ **proveCompacted**(`key`): [`SparseCompactMerkleProof`](internal-SparseCompactMerkleProof.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`SparseCompactMerkleProof`](internal-SparseCompactMerkleProof.md)

___

### set

▸ **set**(`key`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`void`

___

### setRoot

▸ **setRoot**(`root`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `string` |

#### Returns

`void`

___

### sideNodesForRoot

▸ **sideNodesForRoot**(`key`, `root`): [`string`[], `string`, `string`, `string`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `root` | `string` |

#### Returns

[`string`[], `string`, `string`, `string`]

___

### update

▸ **update**(`key`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`void`

___

### updateWithSideNodes

▸ **updateWithSideNodes**(`key`, `value`, `sideNodes`, `oldLeafHash`, `oldLeafData`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |
| `sideNodes` | `string`[] |
| `oldLeafHash` | `string` |
| `oldLeafData` | `string` |

#### Returns

`string`
