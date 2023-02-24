---
layout: default
title: AbstractProgram
parent: "@fuel-ts/predicate"
nav_order: 1

---

# Class: AbstractProgram

[@fuel-ts/predicate](../index.md).[internal](../namespaces/internal.md).AbstractProgram

## Hierarchy

- **`AbstractProgram`**

  ↳ [`AbstractContract`](internal-AbstractContract.md)

## Constructors

### constructor

• **new AbstractProgram**()

## Properties

### account

• `Abstract` **account**: ``null`` \| [`AbstractAccount`](internal-AbstractAccount.md)

#### Defined in

[packages/interfaces/src/index.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L34)

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

#### Defined in

[packages/interfaces/src/index.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L35)

___

### provider

• `Abstract` **provider**: ``null`` \| { `sendTransaction`: (`transactionRequest`: `any`) => `any`  }

#### Defined in

[packages/interfaces/src/index.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/interfaces/src/index.ts#L42)
