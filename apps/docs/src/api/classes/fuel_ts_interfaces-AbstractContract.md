# Class: AbstractContract

[@fuel-ts/interfaces](../modules/fuel_ts_interfaces.md).AbstractContract

## Hierarchy

- `AbstractProgram`

  ↳ **`AbstractContract`**

## Constructors

### constructor

• **new AbstractContract**()

#### Inherited from

AbstractProgram.constructor

## Properties

### account

• `Abstract` **account**: ``null`` \| [`AbstractAccount`](fuel_ts_interfaces-AbstractAccount.md)

#### Inherited from

AbstractProgram.account

#### Defined in

[index.ts:54](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L54)

___

### id

• `Abstract` **id**: [`AbstractAddress`](fuel_ts_interfaces-AbstractAddress.md)

#### Defined in

[index.ts:67](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L67)

___

### interface

• `Abstract` **interface**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `decodeFunctionResult` | (`func`: `any`, `result`: `string` \| `Uint8Array`) => `any` |
| `encodeFunctionData` | (`func`: `any`, `args`: `any`[], `offset`: `number`) => `any` |
| `updateExternalLoggedTypes` | (`id`: `string`, `abiInterface`: `any`) => `any` |

#### Inherited from

AbstractProgram.interface

#### Defined in

[index.ts:55](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L55)

___

### provider

• `Abstract` **provider**: ``null`` \| { `sendTransaction`: (`transactionRequest`: `any`) => `any`  }

#### Inherited from

AbstractProgram.provider

#### Defined in

[index.ts:61](https://github.com/FuelLabs/fuels-ts/blob/1b744265/packages/interfaces/src/index.ts#L61)
