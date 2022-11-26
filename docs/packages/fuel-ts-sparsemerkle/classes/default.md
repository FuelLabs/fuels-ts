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

#### Defined in

[packages/sparsemerkle/src/sparseMerkleTree.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/sparsemerkle/src/sparseMerkleTree.ts#L17)

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

#### Defined in

[packages/sparsemerkle/src/sparseMerkleTree.ts:257](https://github.com/FuelLabs/fuels-ts/blob/master/packages/sparsemerkle/src/sparseMerkleTree.ts#L257)

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

#### Defined in

[packages/sparsemerkle/src/sparseMerkleTree.ts:90](https://github.com/FuelLabs/fuels-ts/blob/master/packages/sparsemerkle/src/sparseMerkleTree.ts#L90)

___

### get

▸ **get**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Defined in

[packages/sparsemerkle/src/sparseMerkleTree.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/sparsemerkle/src/sparseMerkleTree.ts#L24)

___

### prove

▸ **prove**(`key`): [`SparseMerkleProof`](internal-SparseMerkleProof.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`SparseMerkleProof`](internal-SparseMerkleProof.md)

#### Defined in

[packages/sparsemerkle/src/sparseMerkleTree.ts:261](https://github.com/FuelLabs/fuels-ts/blob/master/packages/sparsemerkle/src/sparseMerkleTree.ts#L261)

___

### proveCompacted

▸ **proveCompacted**(`key`): [`SparseCompactMerkleProof`](internal-SparseCompactMerkleProof.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`SparseCompactMerkleProof`](internal-SparseCompactMerkleProof.md)

#### Defined in

[packages/sparsemerkle/src/sparseMerkleTree.ts:288](https://github.com/FuelLabs/fuels-ts/blob/master/packages/sparsemerkle/src/sparseMerkleTree.ts#L288)

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

#### Defined in

[packages/sparsemerkle/src/sparseMerkleTree.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/sparsemerkle/src/sparseMerkleTree.ts#L28)

___

### setRoot

▸ **setRoot**(`root`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `string` |

#### Returns

`void`

#### Defined in

[packages/sparsemerkle/src/sparseMerkleTree.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/sparsemerkle/src/sparseMerkleTree.ts#L32)

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

#### Defined in

[packages/sparsemerkle/src/sparseMerkleTree.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/sparsemerkle/src/sparseMerkleTree.ts#L36)

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

#### Defined in

[packages/sparsemerkle/src/sparseMerkleTree.ts:244](https://github.com/FuelLabs/fuels-ts/blob/master/packages/sparsemerkle/src/sparseMerkleTree.ts#L244)

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

#### Defined in

[packages/sparsemerkle/src/sparseMerkleTree.ts:168](https://github.com/FuelLabs/fuels-ts/blob/master/packages/sparsemerkle/src/sparseMerkleTree.ts#L168)
