# Class: AbstractAccount

[@fuel-ts/interfaces](/api/Interfaces/index.md).AbstractAccount

## Hierarchy

- **`AbstractAccount`**

## Constructors

### constructor

• **new AbstractAccount**(): [`AbstractAccount`](/api/Interfaces/AbstractAccount.md)

#### Returns

[`AbstractAccount`](/api/Interfaces/AbstractAccount.md)

## Properties

### address

• `Abstract` **address**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

#### Defined in

[index.ts:60](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packag/api/src/index.ts#L60)

___

### provider

• `Abstract` **provider**: `unknown`

#### Defined in

[index.ts:61](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packag/api/src/index.ts#L61)

## Methods

### fund

▸ **fund**(`transactionRequest`, `txCost`): `Promise`&lt;`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | `any` |
| `txCost` | `any` |

#### Returns

`Promise`&lt;`any`\>

#### Defined in

[index.ts:65](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packag/api/src/index.ts#L65)

___

### getResourcesToSpend

▸ **getResourcesToSpend**(`quantities`, `options?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `quantities` | `any`[] |
| `options?` | `any` |

#### Returns

`any`

#### Defined in

[index.ts:62](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packag/api/src/index.ts#L62)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequest`, `options?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | `any` |
| `options?` | `any` |

#### Returns

`any`

#### Defined in

[index.ts:63](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packag/api/src/index.ts#L63)

___

### simulateTransaction

▸ **simulateTransaction**(`transactionRequest`, `options?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | `any` |
| `options?` | `any` |

#### Returns

`any`

#### Defined in

[index.ts:64](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packag/api/src/index.ts#L64)
