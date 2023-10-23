# Class: AbstractContract

[@fuel-ts/interfaces](/api/Interfaces/index.md).AbstractContract

## Hierarchy

- `AbstractProgram`

  ↳ **`AbstractContract`**

## Implemented by

- [`Contract`](/api/Program/Contract.md)

## Constructors

### constructor

• **new AbstractContract**()

#### Inherited from

AbstractProgram.constructor

## Properties

### account

• `Abstract` **account**: ``null`` \| [`AbstractAccount`](/api/Interfaces/AbstractAccount.md)

#### Inherited from

AbstractProgram.account

#### Defined in

[index.ts:58](https://github.com/FuelLabs/fuels-ts/blob/39f48277/packag/api/src/index.ts#L58)

___

### id

• `Abstract` **id**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

#### Defined in

[index.ts:69](https://github.com/FuelLabs/fuels-ts/blob/39f48277/packag/api/src/index.ts#L69)

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

[index.ts:59](https://github.com/FuelLabs/fuels-ts/blob/39f48277/packag/api/src/index.ts#L59)

___

### provider

• `Abstract` **provider**: ``null`` \| { `sendTransaction`: (`transactionRequest`: `any`) => `any`  }

#### Inherited from

AbstractProgram.provider

#### Defined in

[index.ts:63](https://github.com/FuelLabs/fuels-ts/blob/39f48277/packag/api/src/index.ts#L63)
