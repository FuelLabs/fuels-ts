# Module: @fuel-ts/interfaces

## Classes

- [AbstractAccount](../classes/fuel_ts_interfaces-AbstractAccount.md)
- [AbstractAddress](../classes/fuel_ts_interfaces-AbstractAddress.md)
- [AbstractContract](../classes/fuel_ts_interfaces-AbstractContract.md)

## Type Aliases

### AddressLike

Ƭ **AddressLike**: [`AbstractAddress`](../classes/fuel_ts_interfaces-AbstractAddress.md) \| [`AbstractAccount`](../classes/fuel_ts_interfaces-AbstractAccount.md)

A simple type alias defined using the `type` keyword.

#### Defined in

[index.ts:78](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L78)

___

### B256Address

Ƭ **B256Address**: `string`

#### Defined in

[index.ts:11](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L11)

___

### B256AddressEvm

Ƭ **B256AddressEvm**: \`0x000000000000000000000000${string}\`

#### Defined in

[index.ts:13](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L13)

___

### Bech32Address

Ƭ **Bech32Address**: \`fuel${string}\`

TODO: Consider re-distritubing interfaces near their original packages

#### Defined in

[index.ts:9](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L9)

___

### ContractIdLike

Ƭ **ContractIdLike**: [`AbstractAddress`](../classes/fuel_ts_interfaces-AbstractAddress.md) \| [`AbstractContract`](../classes/fuel_ts_interfaces-AbstractContract.md)

#### Defined in

[index.ts:80](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L80)

___

### EvmAddress

Ƭ **EvmAddress**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `value` | [`B256AddressEvm`](fuel_ts_interfaces.md#b256addressevm) |

#### Defined in

[index.ts:18](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L18)
