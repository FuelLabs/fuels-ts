# Class: AbstractAccount

[@fuel-ts/interfaces](/api/Interfaces/index.md).AbstractAccount

## Hierarchy

- **`AbstractAccount`**

  ↳ [`Account`](/api/Wallet/Account.md)

## Constructors

### constructor

• **new AbstractAccount**()

## Properties

### address

• `Abstract` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

#### Defined in

[index.ts:45](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packag/api/src/index.ts#L45)

___

### provider

• `Abstract` **provider**: `unknown`

#### Defined in

[index.ts:46](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packag/api/src/index.ts#L46)

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

[index.ts:47](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packag/api/src/index.ts#L47)

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

[index.ts:48](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packag/api/src/index.ts#L48)

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

[index.ts:49](https://github.com/FuelLabs/fuels-ts/blob/5bf70bb2/packag/api/src/index.ts#L49)
