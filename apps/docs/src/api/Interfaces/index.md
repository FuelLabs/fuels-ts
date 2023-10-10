# Module: @fuel-ts/interfaces

## Classes

- [AbstractAccount](/api/Interfaces/AbstractAccount.md)
- [AbstractAddress](/api/Interfaces/AbstractAddress.md)
- [AbstractContract](/api/Interfaces/AbstractContract.md)

## Type Aliases

### AddressLike

Ƭ **AddressLike**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) \| [`AbstractAccount`](/api/Interfaces/AbstractAccount.md)

A simple type alias defined using the `type` keyword.

#### Defined in

[index.ts:78](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packag/api/src/index.ts#L78)

___

### B256Address

Ƭ **B256Address**: `string`

#### Defined in

[index.ts:13](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packag/api/src/index.ts#L13)

___

### B256AddressEvm

Ƭ **B256AddressEvm**: \`0x000000000000000000000000${string}\`

#### Defined in

[index.ts:15](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packag/api/src/index.ts#L15)

___

### Bech32Address

Ƭ **Bech32Address**: \`fuel${string}\`

#### Defined in

[index.ts:11](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packag/api/src/index.ts#L11)

___

### ContractIdLike

Ƭ **ContractIdLike**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) \| [`AbstractContract`](/api/Interfaces/AbstractContract.md)

#### Defined in

[index.ts:80](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packag/api/src/index.ts#L80)

___

### EvmAddress

Ƭ **EvmAddress**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `value` | [`B256AddressEvm`](/api/Interfaces/index.md#b256addressevm) |

#### Defined in

[index.ts:20](https://github.com/FuelLabs/fuels-ts/blob/f9c50fca/packag/api/src/index.ts#L20)
