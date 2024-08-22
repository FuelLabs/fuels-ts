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

[index.ts:61](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packag/api/src/index.ts#L61)

___

### provider

• `Abstract` **provider**: `unknown`

#### Defined in

[index.ts:62](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packag/api/src/index.ts#L62)

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

[index.ts:67](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packag/api/src/index.ts#L67)

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

[index.ts:63](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packag/api/src/index.ts#L63)

___

### getTransactionCost

▸ **getTransactionCost**(`transactionRequest`, `options?`): `Promise`&lt;`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequest` | `any` |
| `options?` | `any` |

#### Returns

`Promise`&lt;`any`\>

#### Defined in

[index.ts:66](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packag/api/src/index.ts#L66)

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

[index.ts:64](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packag/api/src/index.ts#L64)

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

[index.ts:65](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packag/api/src/index.ts#L65)
