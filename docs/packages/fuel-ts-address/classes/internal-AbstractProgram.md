---
layout: default
title: AbstractProgram
parent: "@fuel-ts/address"
nav_order: 1

---

# Class: AbstractProgram

[@fuel-ts/address](../index.md).[internal](../namespaces/internal.md).AbstractProgram

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

packages/interfaces/dist/index.d.ts:24

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

packages/interfaces/dist/index.d.ts:25

___

### provider

• `Abstract` **provider**: ``null`` \| { `sendTransaction`: (`transactionRequest`: `any`) => `any`  }

#### Defined in

packages/interfaces/dist/index.d.ts:31
