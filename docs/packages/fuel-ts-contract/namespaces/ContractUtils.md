---
layout: default
title: ContractUtils
parent: "@fuel-ts/contract"
nav_order: 3

---

# Namespace: ContractUtils

[@fuel-ts/contract](../index.md).ContractUtils

## Functions

### assert

▸ **assert**(`condition`, `message`): asserts condition

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | `unknown` |
| `message` | `string` |

#### Returns

asserts condition

___

### getContractId

▸ **getContractId**(`bytecode`, `salt`, `stateRoot`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytecode` | `BytesLike` |
| `salt` | `BytesLike` |
| `stateRoot` | `BytesLike` |

#### Returns

`string`

___

### getContractRoot

▸ **getContractRoot**(`bytecode`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytecode` | `Uint8Array` |

#### Returns

`string`

___

### getContractStorageRoot

▸ **getContractStorageRoot**(`storageSlots`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `storageSlots` | [`StorageSlot`](internal.md#storageslot)[] |

#### Returns

`string`

___

### includeHexPrefix

▸ **includeHexPrefix**(`value`, `options?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `options?` | `DataOptions` |

#### Returns

`string`
