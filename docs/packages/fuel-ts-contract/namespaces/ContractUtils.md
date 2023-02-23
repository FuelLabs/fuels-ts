---
layout: default
title: ContractUtils
parent: "@fuel-ts/contract"
nav_order: 3

---

# Namespace: ContractUtils

[@fuel-ts/contract](../index.md).ContractUtils

## Functions

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

#### Defined in

[packages/contract/src/util.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/util.ts#L30)

___

### getContractRoot

▸ **getContractRoot**(`bytecode`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytecode` | `BytesLike` |

#### Returns

`string`

#### Defined in

[packages/contract/src/util.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/util.ts#L8)

___

### getContractStorageRoot

▸ **getContractStorageRoot**(`storageSlots`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `storageSlots` | [`StorageSlot`](internal.md#storageslot)[] |

#### Returns

`string`

#### Defined in

[packages/contract/src/util.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/util.ts#L22)

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

#### Defined in

[packages/contract/src/util.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/util.ts#L40)
