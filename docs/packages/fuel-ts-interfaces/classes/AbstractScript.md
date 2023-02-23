---
layout: default
title: AbstractScript
parent: "@fuel-ts/interfaces"
nav_order: 1

---

# Class: AbstractScript

[@fuel-ts/interfaces](../index.md).AbstractScript

## Hierarchy

- [`AbstractProgram`](AbstractProgram.md)

  ↳ **`AbstractScript`**

## Constructors

### constructor

• **new AbstractScript**()

#### Inherited from

[AbstractProgram](AbstractProgram.md).[constructor](AbstractProgram.md#constructor)

## Properties

### account

• `Abstract` **account**: ``null`` \| [`AbstractAccount`](AbstractAccount.md)

#### Inherited from

[AbstractProgram](AbstractProgram.md).[account](AbstractProgram.md#account)

#### Defined in

[packages/interfaces/src/index.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L33)

___

### bytes

• `Abstract` **bytes**: `Uint8Array`

#### Defined in

[packages/interfaces/src/index.ts:51](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L51)

___

### interface

• `Abstract` **interface**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `decodeFunctionResult` | (`func`: `any`, `result`: `string` \| `Uint8Array`) => `any` |
| `encodeFunctionData` | (`func`: `any`, `args`: `any`[], `offset`: `number`, `isMainArgs?`: `boolean`) => `any` |
| `loggedTypes` | `any` |
| `updateExternalLoggedTypes` | (`id`: `string`, `loggedTypes`: `any`[]) => `any` |

#### Inherited from

[AbstractProgram](AbstractProgram.md).[interface](AbstractProgram.md#interface)

#### Defined in

[packages/interfaces/src/index.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L34)

___

### provider

• `Abstract` **provider**: ``null`` \| { `sendTransaction`: (`transactionRequest`: `any`) => `any`  }

#### Inherited from

[AbstractProgram](AbstractProgram.md).[provider](AbstractProgram.md#provider)

#### Defined in

[packages/interfaces/src/index.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L41)
