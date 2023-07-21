# Class: AbstractAccount

[@fuel-ts/interfaces](../modules/fuel_ts_interfaces.md).AbstractAccount

## Constructors

### constructor

• **new AbstractAccount**()

## Properties

### address

• `Abstract` **address**: [`AbstractAddress`](fuel_ts_interfaces-AbstractAddress.md)

#### Defined in

[index.ts:43](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L43)

___

### provider

• `Abstract` **provider**: `unknown`

#### Defined in

[index.ts:44](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L44)

## Methods

### getResourcesToSpend

▸ `Abstract` **getResourcesToSpend**(`quantities`, `options?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `quantities` | `any`[] |
| `options?` | `any` |

#### Returns

`any`

#### Defined in

[index.ts:45](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L45)

___

### sendTransaction

▸ `Abstract` **sendTransaction**(`transactionRequest`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | `any` |

#### Returns

`any`

#### Defined in

[index.ts:46](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L46)

___

### simulateTransaction

▸ `Abstract` **simulateTransaction**(`transactionRequest`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | `any` |

#### Returns

`any`

#### Defined in

[index.ts:47](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L47)
