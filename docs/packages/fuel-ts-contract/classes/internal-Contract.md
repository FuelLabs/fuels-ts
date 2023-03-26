---
layout: default
title: Contract
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: Contract

[@fuel-ts/contract](../index.md).[internal](../namespaces/internal.md).Contract

## Implements

- [`AbstractContract`](internal-AbstractContract.md)

## Constructors

### constructor

• **new Contract**(`id`, `abi`, `accountOrProvider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| [`AbstractAddress`](internal-AbstractAddress.md) |
| `abi` | [`Interface`](internal-Interface.md) \| [`JsonAbi`](../namespaces/internal.md#jsonabi) |
| `accountOrProvider` | [`Provider`](internal-Provider.md) \| [`Account`](internal-Account.md) |

#### Defined in

packages/program/dist/index.d.ts:188

## Properties

### account

• **account**: ``null`` \| [`Account`](internal-Account.md)

#### Implementation of

[AbstractContract](internal-AbstractContract.md).[account](internal-AbstractContract.md#account)

#### Defined in

packages/program/dist/index.d.ts:186

___

### functions

• **functions**: [`InvokeFunctions`](../interfaces/internal-InvokeFunctions.md)

#### Defined in

packages/program/dist/index.d.ts:187

___

### id

• **id**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Implementation of

[AbstractContract](internal-AbstractContract.md).[id](internal-AbstractContract.md#id)

#### Defined in

packages/program/dist/index.d.ts:183

___

### interface

• **interface**: [`Interface`](internal-Interface.md)

#### Implementation of

[AbstractContract](internal-AbstractContract.md).[interface](internal-AbstractContract.md#interface)

#### Defined in

packages/program/dist/index.d.ts:185

___

### provider

• **provider**: ``null`` \| [`Provider`](internal-Provider.md)

#### Implementation of

[AbstractContract](internal-AbstractContract.md).[provider](internal-AbstractContract.md#provider)

#### Defined in

packages/program/dist/index.d.ts:184

## Methods

### buildFunction

▸ **buildFunction**(`func`): (...`args`: `unknown`[]) => [`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`unknown`[], `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | [`FunctionFragment`](internal-FunctionFragment.md) |

#### Returns

`fn`

▸ (...`args`): [`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`unknown`[], `any`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `unknown`[] |

##### Returns

[`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`unknown`[], `any`\>

#### Defined in

packages/program/dist/index.d.ts:189

___

### getBalance

▸ **getBalance**(`assetId`): `Promise`<[`BN`](internal-BN.md)\>

Get the balance for a given assset ID for this contract

#### Parameters

| Name | Type |
| :------ | :------ |
| `assetId` | `BytesLike` |

#### Returns

`Promise`<[`BN`](internal-BN.md)\>

#### Defined in

packages/program/dist/index.d.ts:194

___

### multiCall

▸ **multiCall**(`calls`): [`MultiCallInvocationScope`](internal-MultiCallInvocationScope.md)<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | [`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`any`[], `any`\>[] |

#### Returns

[`MultiCallInvocationScope`](internal-MultiCallInvocationScope.md)<`any`\>

#### Defined in

packages/program/dist/index.d.ts:190
