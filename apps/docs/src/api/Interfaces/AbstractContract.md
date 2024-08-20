# Class: AbstractContract

[@fuel-ts/interfaces](/api/Interfaces/index.md).AbstractContract

## Hierarchy

- `AbstractProgram`

  ↳ **`AbstractContract`**

## Constructors

### constructor

• **new AbstractContract**(): [`AbstractContract`](/api/Interfaces/AbstractContract.md)

#### Returns

[`AbstractContract`](/api/Interfaces/AbstractContract.md)

#### Inherited from

AbstractProgram.constructor

## Properties

### account

• `Abstract` **account**: ``null`` \| [`AbstractAccount`](/api/Interfaces/AbstractAccount.md)

#### Inherited from

AbstractProgram.account

#### Defined in

[index.ts:73](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packag/api/src/index.ts#L73)

___

### id

• `Abstract` **id**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

#### Defined in

[index.ts:85](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packag/api/src/index.ts#L85)

___

### interface

• `Abstract` **interface**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `jsonAbi` | `any` |

#### Inherited from

AbstractProgram.interface

#### Defined in

[index.ts:74](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packag/api/src/index.ts#L74)

___

### provider

• `Abstract` **provider**: ``null`` \| { `getTransactionCost`: (`transactionRequest`: `any`, `options?`: `any`) => `Promise`&lt;`any`\> ; `sendTransaction`: (`transactionRequest`: `any`, `options?`: `any`) => `any`  }

#### Inherited from

AbstractProgram.provider

#### Defined in

[index.ts:78](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packag/api/src/index.ts#L78)
