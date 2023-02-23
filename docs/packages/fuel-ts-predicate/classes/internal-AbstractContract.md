---
layout: default
title: AbstractContract
parent: "@fuel-ts/predicate"
nav_order: 1

---

# Class: AbstractContract

[@fuel-ts/predicate](../index.md).[internal](../namespaces/internal.md).AbstractContract

## Hierarchy

- [`AbstractProgram`](internal-AbstractProgram.md)

  ↳ **`AbstractContract`**

## Constructors

### constructor

• **new AbstractContract**()

#### Inherited from

[AbstractProgram](internal-AbstractProgram.md).[constructor](internal-AbstractProgram.md#constructor)

## Properties

### account

• `Abstract` **account**: ``null`` \| [`AbstractAccount`](internal-AbstractAccount.md)

#### Inherited from

[AbstractProgram](internal-AbstractProgram.md).[account](internal-AbstractProgram.md#account)

#### Defined in

[packages/interfaces/src/index.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L33)

___

### id

• `Abstract` **id**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Defined in

[packages/interfaces/src/index.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L47)

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

[AbstractProgram](internal-AbstractProgram.md).[interface](internal-AbstractProgram.md#interface)

#### Defined in

[packages/interfaces/src/index.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L34)

___

### provider

• `Abstract` **provider**: ``null`` \| { `sendTransaction`: (`transactionRequest`: `any`) => `any`  }

#### Inherited from

[AbstractProgram](internal-AbstractProgram.md).[provider](internal-AbstractProgram.md#provider)

#### Defined in

[packages/interfaces/src/index.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L41)
