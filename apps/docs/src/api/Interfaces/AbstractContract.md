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

[index.ts:62](https://github.com/FuelLabs/fuels-ts/blob/c431eaba/packag/api/src/index.ts#L62)

___

### id

• `Abstract` **id**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

#### Defined in

[index.ts:73](https://github.com/FuelLabs/fuels-ts/blob/c431eaba/packag/api/src/index.ts#L73)

___

### interface

• `Abstract` **interface**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `updateExternalLoggedTypes` | (`id`: `string`, `abiInterface`: `any`) => `any` |

#### Inherited from

AbstractProgram.interface

#### Defined in

[index.ts:63](https://github.com/FuelLabs/fuels-ts/blob/c431eaba/packag/api/src/index.ts#L63)

___

### provider

• `Abstract` **provider**: ``null`` \| { `sendTransaction`: (`transactionRequest`: `any`) => `any`  }

#### Inherited from

AbstractProgram.provider

#### Defined in

[index.ts:67](https://github.com/FuelLabs/fuels-ts/blob/c431eaba/packag/api/src/index.ts#L67)
